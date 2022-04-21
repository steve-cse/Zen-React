import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import React, { useRef, useEffect } from "react";
import useState from "react-usestateref";
import Webcam from "react-webcam";
import { POINTS, keypointConnections } from "../../../utils/data";
import { drawPoint, drawSegment } from "../../../utils/helper";
import DropDown from "../../../components/DropDown/DropDown";
import { Navbar, Button, Alert, Nav, NavItem } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { fstore } from "../../../firebaseconfig/firebaseconfig";
import { updateDoc, doc } from "firebase/firestore";
import { landmarks_to_embedding } from "../../../tflib/FeatureVectorExtractor";
import { YogaImages } from "../../../yogaposedata/YogaImages";
import { YogaInstructions } from "../../../yogaposedata/YogaInstructions";
import ClockLoader from "react-spinners/ClockLoader";
import { MinimalFooter } from "../../../containers";
import "./Yoga-Practice-Beginner.css";
let skeletonColor = "rgb(160, 32, 240)";
let poseList = [
  { name: "chair" },
  { name: "cobra" },
  { name: "goddess_pose" },
  { name: "tree" },
  { name: "triangle" },
];
let flag = false;
let interval;
function Yoga() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [currentPose, setCurrentPose, currentPoseRef] = useState("chair");
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState("Your Pose Feedback");
  const [loading, setLoading] = useState(true);
  const [toggleImage, setToggleImage] = useState(true);
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  const handleUpdate = async () => {
    console.log(parseInt(localStorage.getItem(currentPoseRef.current)) + 1);
    try {
      const dataRef = doc(fstore, "users", localStorage.getItem("id"));

      await updateDoc(dataRef, {
        [currentPoseRef.current]:
          parseInt(localStorage.getItem(currentPoseRef.current)) + 1,
      });
      localStorage.setItem(
        currentPoseRef.current,
        parseInt(localStorage.getItem(currentPoseRef.current)) + 1
      );
    } catch (err) {
      console.log(err);
    }
  };
  function incrementRound() {
    setRound((prevRound) => prevRound + 1);
    handleUpdate();
  }
  useEffect(() => {
    runMovenet();
  }, []);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
    setRound(0);
  }, [currentPose]);

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      setPoseTime(timeDiff);
    }
    if (
      ((currentTime - startingTime) / 1000) % 10 === 0 &&
      (currentTime - startingTime) / 1000 !== 0
    ) {
      incrementRound();
    }
  }, [currentTime]);

  const CLASS_NO = {
    chair: 0,
    cobra: 1,
    goddess_pose: 2,
    no_pose: 3,
    tree: 4,
    triangle: 5,
  };

  const runMovenet = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    const poseClassifier = await tf.loadLayersModel(
      "https://raw.githubusercontent.com/Maverick-2000/Zen-React/master/Movenet%20Files/Beginner/model/model.json"
    );
    setLoading(false);
    interval = setInterval(() => {
      detectPose(detector, poseClassifier);
    }, 100);
  };

  const detectPose = async (detector, poseClassifier) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      let notDetected = 0;
      const video = webcamRef.current.video;
      const pose = await detector.estimatePoses(video);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      try {
        const keypoints = pose[0].keypoints;
        let input = keypoints.map((keypoint) => {
          if (keypoint.score > 0.4) {
            if (
              !(
                keypoint.name === "left_eye" ||
                keypoint.name === "right_eye" ||
                keypoint.name === "nose" ||
                keypoint.name === "right_ear" ||
                keypoint.name === "left_ear"
              )
            ) {
              drawPoint(ctx, keypoint.x, keypoint.y, 8, "rgb(255,255,255)");
              let connections = keypointConnections[keypoint.name];
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase();
                  drawSegment(
                    ctx,
                    [keypoint.x, keypoint.y],
                    [
                      keypoints[POINTS[conName]].x,
                      keypoints[POINTS[conName]].y,
                    ],
                    skeletonColor
                  );
                });
              } catch (err) {}
            }
          } else {
            notDetected += 1;
          }
          return [keypoint.x, keypoint.y];
        });
        if (notDetected > 4) {
          skeletonColor = "rgb(160, 32, 240)";
          return;
        }
        const processedInput = landmarks_to_embedding(input);
        const classification = poseClassifier.predict(processedInput);
        //console.log(classification);
        classification.array().then((data) => {
          const classNo = CLASS_NO[currentPoseRef.current];
          //console.log(data[0][classNo]);
          //console.log(currentPoseRef.current);
          if (data[0][classNo] < 0.75) {
            setFeedback("Correct Your Pose!!!");
          }
          if (data[0][classNo] > 0.75 && data[0][classNo] < 0.85) {
            setFeedback("Little more to Perfection");
          }
          if (data[0][classNo] > 0.97) {
            if (!flag) {
              setStartingTime(new Date(Date()).getTime());
              flag = true;
              setFeedback("PERFECT");
            }
            setCurrentTime(new Date(Date()).getTime());
            skeletonColor = "rgb(0,255,0)";
          } else {
            flag = false;
            skeletonColor = "rgb(160, 32, 240)";
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div className="spinner_style">
            <ClockLoader
              speedMultiplier={1.5}
              color={"#ffc107"}
              loading={loading}
              size={140}
            />
            <p>A jug fills drop by drop.</p>
          </div>
        </>
      ) : (
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
                onClick={() => navigate("/dashboard")}
                style={{ color: "black" }}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                className="navbar_links my-2"
                onClick={() => navigate("/selection-learn")}
                style={{ color: "black" }}
              >
                Learn
              </Nav.Link>
              <Nav.Link
                className="navbar_links my-2"
                onClick={() => navigate("/selection-practice")}
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
          <h2 className="dashboard_heading">Practice Yoga (Beginner)</h2>
          <div className="dropdown_container">
          <div className="dropdown_style">
            <DropDown
              exercise_pack={poseList}
              currentPose={currentPose}
              setCurrentPose={setCurrentPose}
            />
            </div>
          </div>
          <div className="flex_container">
          <Webcam
            className="camera_style"
            width="640px"
            height="480px"
            ref={webcamRef}
          />
          <canvas
            className="canvas_style"
            ref={canvasRef}
            width="640px"
            height="480px"
          ></canvas>
          {toggleImage ? (
            <img
              className="pose_image"
              alt=""
              src={YogaImages[currentPose]}
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
              value={YogaInstructions[currentPose]}
              readOnly={true}
              spellCheck={false}
            ></textarea>
          )}
 </div>
          <div className="scoreboard_container">
            <div className="scoreboard_style">
            <p>Counter: {poseTime}</p>
            <p>Rounds: {round}</p>
            <p>{feedback}</p>
            </div>
          </div>
          <div className="minimalfooter_style">
            <MinimalFooter />
          </div>
         
        </>
      )}
    </>
  );
}
export default Yoga;
