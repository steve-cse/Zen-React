import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import React, { useRef, useEffect } from "react";
import useState from "react-usestateref";
import Webcam from "react-webcam";
import { POINTS, keypointConnections } from "../../../utils/data";
import { drawPoint, drawSegment } from "../../../utils/helper";
import { landmarks_to_embedding } from "../../../tflib/FeatureVectorExtractor";

let skeletonColor = "rgb(160, 32, 240)";
let poseList = [
  { name: "chair" },
  { name: "cobra" },
  { name: "goddess_pose" },
  { name: "tree" },
  { name: "triangle" },
  { name: "no_pose" },
];
let flag = false;
let interval;
var currentPoseIndex = 0;
function Yoga() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentPose, setCurrentPose, currentPoseRef] = useState("chair");
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [round, setRound, roundRef] = useState(0);
  const [feedback, setFeedback] = useState(" ");
  function incrementRound() {
    setRound((prevRound) => prevRound + 1);
  }
  function incrementPose() {
    currentPoseIndex = currentPoseIndex + 1;
    if (currentPoseIndex === 5) {
      setCurrentPose(poseList[poseList.length - 1].name);
      console.log(poseList[poseList.length - 1].name);
    } else if (currentPoseIndex < 5) {
      setCurrentPose(poseList[currentPoseIndex].name);
      console.log(poseList[currentPoseIndex].name);
    }
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

      if (roundRef.current === 6) {
        console.log(roundRef.current);
        incrementPose();
      }
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
              !(keypoint.name === "left_eye" || keypoint.name === "right_eye")
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
      <center>
        <Webcam
          width="640px"
          height="480px"
          id="webcam"
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            left: 0,
            right: 0,
            zindex: 9,
            padding: "0px",
          }}
        />
        <canvas
          ref={canvasRef}
          id="my-canvas"
          width="640px"
          height="480px"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            left: 0,
            right: 0,
            zindex: 9,
          }}
        ></canvas>
      </center>

      <h3>Counter: {poseTime}</h3>
      <h3>Rounds: {round}</h3>
      <h3>Pose: {currentPose}</h3>
      <h3>{feedback}</h3>
    </>
  );
}
export default Yoga;
