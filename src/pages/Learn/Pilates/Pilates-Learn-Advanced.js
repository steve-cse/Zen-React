import { Pose } from "@mediapipe/pose";
import React, { useRef, useEffect } from "react";
import * as poseAll from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import useState from "react-usestateref";
import { Navbar, Button, Alert, Nav, NavItem } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { MinimalFooter } from "../../../containers";
import logo from "../../../assets/logo.png";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";
import { PilatesImages } from "../../../pilatesposedata/PilatesImages";
import { PilatesInstructions } from "../../../pilatesposedata/PilatesInstructions";
import "./Pilates-Learn-Advanced.css";
const radians_to_degrees = (rad) => (rad * 180.0) / Math.PI;
function find_angle(p1, p2, p3) {
  //angle between 3 points
  let angle_radians =
    Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
  let angle_degrees = radians_to_degrees(angle_radians);
  if (angle_degrees > 180.0) {
    angle_degrees = 360 - angle_degrees;
  }
  return angle_degrees;
}

function Pilates() {
  var exercise_pack = [
    {
      name: "Tricep Kickback",
      pose_landmark_1: 11,
      pose_landmark_2: 13,
      pose_landmark_3: 15,
      max_angle: 172,
      min_angle: 82,
    },
    {
      name: "Plie Squat",
      pose_landmark_1: 23,
      pose_landmark_2: 25,
      pose_landmark_3: 27,
      max_angle: 177,
      min_angle: 97,
    },
    {
      name: "No Pose",
      pose_landmark_1: 0,
      pose_landmark_2: 0,
      pose_landmark_3: 0,
      max_angle: 160,
      min_angle: 30,
    },
  ];
  var current_exercise_index = 0;
  var current_exercise = exercise_pack[current_exercise_index];
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  const land = window.drawLandmarks;
  var camera = null;
  var poseResults;

  var stage;
  var angle_deg;

  stage = null;
  const [counter, setCounter, counterRef] = useState(0);
  const [error, setError] = useState("");
  const [sparkles, setSparkles] = useState(false);
  const [win_width, win_height] = useWindowSize()
  const { currentUser, logout } = useAuth();
  const [toggleImage, setToggleImage] = useState(true);
  async function handleLogout() {
    setError("");

    try {
      await logout();
      window.open("/login", "_top");
    } catch {
      setError("Failed to log out");
    }
  }

  function incrementCounter() {
    setCounter((prevCounter) => prevCounter + 1);
  }
  function resetCounter() {
    setCounter(0);
  }
  const [exercise_name_for_display, setexercise_name_for_display] =
    useState("Tricep Kickback");
  function changeDisplay() {
    setexercise_name_for_display(current_exercise.name);
  }

  function onResults(results) {
    // const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    try {
      canvasCtx.save();

      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      // canvasCtx.drawImage(results.segmentationMask, 0, 0,
      //                     canvasElement.width, canvasElement.height);

      // Only overwrite existing pixels.
      canvasCtx.globalCompositeOperation = "source-in";
      canvasCtx.fillStyle = "#ff5500";
      canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

      // Only overwrite missing pixels.
      canvasCtx.globalCompositeOperation = "destination-atop";
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      canvasCtx.globalCompositeOperation = "source-over";
      connect(canvasCtx, results.poseLandmarks, poseAll.POSE_CONNECTIONS, {
        color: "#ff5500",
        lineWidth: 4,
      });
      land(canvasCtx, results.poseLandmarks, {
        color: "#42ff52",
        lineWidth: 2,
      });
      canvasCtx.restore();

      poseResults = results.poseWorldLandmarks;
      angle_deg = find_angle(
        poseResults[current_exercise.pose_landmark_1],
        poseResults[current_exercise.pose_landmark_2],
        poseResults[current_exercise.pose_landmark_3]
      );

      if (angle_deg > current_exercise.max_angle) {
        stage = "down";
      }
      if (angle_deg < current_exercise.min_angle && stage === "down") {
        stage = "up";

        incrementCounter();
      }
      if (counterRef.current === 12 && current_exercise_index < 1) {
        resetCounter();

        current_exercise_index += 1;
        console.log("Updated current exercise index");
        
        current_exercise = exercise_pack[current_exercise_index];
        console.log(current_exercise.name);
        changeDisplay();
      }
      if (counterRef.current === 12 && current_exercise_index === 1) {
        resetCounter();

        current_exercise = exercise_pack[exercise_pack.length - 1];
        console.log(current_exercise.name);
        console.log("Finished");
        setSparkles(true);
        setTimeout(function () {
          setSparkles(false);
      }, 20000);
        changeDisplay();
      }
    } catch (error) {}
  }

  // setInterval(())
  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    pose.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });

      camera.start();
    }
    
  }, []);
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Navbar className="gradient_navbar">
        <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="120"
            height="60"
            className="d-inline-block align-top mx-3"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            className="navbar_links my-2"
            onClick={() => window.open("/dashboard", "_top")}
            style={{ color: "black" }}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="navbar_links my-2"
            href="#pricing"
            style={{ color: "black" }}
          >
            Learn
          </Nav.Link>
          <Nav.Link
            className="navbar_links my-2"
            href="#pricing"
            style={{ color: "black" }}
          >
            Practice
          </Nav.Link>
          <Nav.Link
            className="navbar_links my-2"
            href="#pricing"
            style={{ color: "black" }}
          >
            Tutorials
          </Nav.Link>
          <Nav.Link
            className="navbar_links my-2"
            href="#pricing"
            style={{ color: "black" }}
          >
            Article
          </Nav.Link>
        </Nav>
        <Nav pullright="true">
          <Nav.Link
            className="mx-1"
            style={{ color: "black", cursor: "default" }}
          >
            Syncing to: {currentUser.email}
          </Nav.Link>
          <NavItem className="mx-3" onClick={handleLogout}>
            <Button>Log Out</Button>
          </NavItem>
        </Nav>
      </Navbar>
      <h2 className="dashboard_heading">Learn Pilates (Advanced)</h2>
      {sparkles ? (<><Confetti
          width={win_width}
          height={win_height}
          initialVelocityX={15}
          initialVelocityY={15}
        /></>):(null)}
      <div className="flex_container">
      <Webcam
        className="camera_style"
        ref={webcamRef}
        style={{
          width: 640,
          height: 480,
        }}
      />{" "}
      <canvas
        ref={canvasRef}
        className="canvas_style"
        style={{
          width: 640,
          height: 480,
        }}
      ></canvas>
       {toggleImage ? (
            <img
              className="pose_image"
              alt=""
              src={PilatesImages[exercise_name_for_display]}
              onClick={() => {
                setToggleImage(false);
              }}
            />
          ) : (
            <textarea
              className="pose_image"
              onClick={() => {
                setToggleImage(true);
              }}
              value={PilatesInstructions[exercise_name_for_display]}
              readOnly={true}
              spellCheck={false}
            ></textarea>
          )}
      </div>
      <div className="scoreboard_container">
      <div className="scoreboard_style">
      <p>Current Exercise: {exercise_name_for_display}</p>
      <p>Repetitions: {counter}/12</p>
      </div>
      </div>
      <div className="minimalfooter_style">
            <MinimalFooter />
          </div>
    </>
  );
}
export default Pilates;
