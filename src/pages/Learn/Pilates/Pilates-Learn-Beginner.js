import { Pose } from "@mediapipe/pose";
import React, { useRef, useEffect } from "react";
import * as poseAll from "@mediapipe/pose";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import useState from "react-usestateref";
import { MinimalFooter } from "../../../containers";
import Confetti from "react-confetti";
import { PilatesImages } from "../../../pilatesposedata/PilatesImages";
import { PilatesInstructions } from "../../../pilatesposedata/PilatesInstructions";
import SecNavBar from "../../../components/SecNavBar/SecNavBar";
import RotateDevice from "../../../components/RotateDevice/RotateDevice";
import "./Pilates-Learn-Beginner.css";
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
      name: "Right Curl",
      pose_landmark_1: 12,
      pose_landmark_2: 14,
      pose_landmark_3: 16,
      max_angle: 160,
      min_angle: 30,
    },
    {
      name: "Left Curl",
      pose_landmark_1: 11,
      pose_landmark_2: 13,
      pose_landmark_3: 15,
      max_angle: 160,
      min_angle: 30,
    },
    {
      name: "Lateral Raise",
      pose_landmark_1: 13,
      pose_landmark_2: 11,
      pose_landmark_3: 23,
      max_angle: 77,
      min_angle: 10,
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

  const [sparkles, setSparkles] = useState(false);

  const [toggleImage, setToggleImage] = useState(true);

  function incrementCounter() {
    setCounter((prevCounter) => prevCounter + 1);
  }
  function resetCounter() {
    setCounter(0);
  }
  const [exercise_name_for_display, setexercise_name_for_display] =
    useState("Right Curl");
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
      if (counterRef.current === 12 && current_exercise_index < 2) {
        resetCounter();

        current_exercise_index += 1;
        console.log("Updated current exercise index");

        current_exercise = exercise_pack[current_exercise_index];
        console.log(current_exercise.name);
        changeDisplay();
      }
      if (counterRef.current === 12 && current_exercise_index === 2) {
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
  if (window.innerWidth < 640) {
    return <RotateDevice />;
  } else {
    return (
      <div className="Pilates-Learn-Beginner">
        <SecNavBar SlowLoad />
        <h2 className="pilates_learn_heading">Learn Pilates (Beginner)</h2>
        {sparkles ? (
          <>
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              initialVelocityX={15}
              initialVelocityY={15}
            />
          </>
        ) : null}
        <div className="flexbox_container">
          <div className="pilates_camera_and_canvas">
            <Webcam
              ref={webcamRef}
              width="640px"
              height="480px"
              // style={{ backgroundColor: "black" }}
            />{" "}
            <div className="pilates_canvas_container">
              <canvas
                ref={canvasRef}
                width="640px"
                height="480px"
                // style={{ backgroundColor: "black" }}
              ></canvas>
            </div>
          </div>
          {toggleImage ? (
            <div className="pilates_pose_image_container">
              <img
                alt=""
                src={PilatesImages[exercise_name_for_display]}
                onClick={() => {
                  setToggleImage(false);
                }}
              />
            </div>
          ) : (
            <div className="pilates_pose_text_container">
              <textarea
                onClick={() => {
                  setToggleImage(true);
                }}
                value={PilatesInstructions[exercise_name_for_display]}
                readOnly={true}
                spellCheck={false}
              ></textarea>
            </div>
          )}
        </div>
        <div className="feedback_container">
          <div className="feedback_style">
            <p>Current Exercise: {exercise_name_for_display}</p>
            <p>Repetitions: {counter}/12</p>
          </div>
        </div>
        <MinimalFooter />
      </div>
    );
  }
}
export default Pilates;
