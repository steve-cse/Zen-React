import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import * as ml5 from "ml5";



export default function Yogabeginner() {
  let pose, skeleton,nn,poseCounter,targetLabel,currentPose,round,errorCounter,iterationCounter;
  let posesArray = ['Mountain', 'Tree', 'Star', 'Chair', 'Goddess'];
  function sketch(p5) {
    let canvas, video, poseNet;
    p5.setup = () => {
      canvas = p5.createCanvas(640, 480); //create canvas
      canvas.position(130, 210);

      video = p5.createCapture(p5.VIDEO); //p5 video capture
      video.hide();

      poseNet = ml5.poseNet(video, posenetLoaded);
      poseNet.on("pose", gotPoses);
      poseCounter = 0;
      targetLabel = 0;
      currentPose = posesArray[poseCounter];
      round = 1;
      errorCounter = 0;
      iterationCounter = 0;

      let options = {
        inputs: 34,
        outputs: 10,
        task: "classification",
        debug: true,
      };

      nn = ml5.neuralNetwork(options);
      const modelInfo = {
        
        model: "./model2.json",
        metadata: "./model_meta2.json",
        weights: "./model.weights2.bin",

        
      };
      nn.load(modelInfo, nnLoaded); //load the neural network
    };

    p5.draw = () => {
      p5.push();
      p5.translate(video.width, 0);
      p5.scale(-1, 1);
      p5.image(video, 0, 0, video.width, video.height);
      if (pose) {
        for (let i = 0; i < skeleton.length; i++) {
          //draw skeleton
          let a = skeleton[i][0];
          let b = skeleton[i][1];
          p5.strokeWeight(7);
          p5.stroke(0);
          p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
        for (let i = 0; i < pose.keypoints.length; i++) {
          //draw key points
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          p5.fill(255, 0, 0);
          p5.strokeWeight(4);
          p5.stroke(0);
          p5.ellipse(x, y, 16, 16);
        }
      }
      p5.pop();
    };

    function posenetLoaded() {
      console.log("poseNet ready");
    }

    function gotPoses(poses) {
      //extract keypoints array and skeleton array
      if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
      }
    }
    function nnLoaded() {
      console.log("neural network ready!");
      classifyPose(); //neural network ready, begin classification process
    }
    function classifyPose() {
      if (pose) {
        //only if pose is found
        let inputs = []; //prepare inputs array for neural network i.e. x,y coordinates from posenet
        for (let i = 0; i < pose.keypoints.length; i++) {
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          inputs.push(x);
          inputs.push(y);
        }
        nn.classify(inputs, gotResult); // begin real time classification, gotResult() as callback
      } else {
        console.log("Pose not found");
        setTimeout(classifyPose, 100); //wait till pose is found
      }
    }
    function gotResult(error, results) {
      console.log("Current Target Label" + targetLabel);
      if (results[0].confidence > 0.45) {
  
  
          console.log("confidence is above 45% checking target label");
          if (results[0].label === targetLabel.toString()) {
              console.log(targetLabel);
              console.log(currentPose);
              iterationCounter = iterationCounter + 1;
  
              console.log(iterationCounter)
  
              if (iterationCounter === 10) {
                  console.log("10 seconds done relax")
                  
                  iterationCounter = 0;
                  round = round + 1;
                  console.log ("Round: "+round);
                  setTimeout(classifyPose, 5000)
                  if (round === 6) {
                      nextPose();
                  }
              }
              else {
                  setTimeout(classifyPose, 1000);
              }
          }
          else {
              errorCounter = errorCounter + 1;
              console.log("error");
              if (errorCounter >= 4) {
                  console.log("four errors");
                  iterationCounter = 0;
                  errorCounter = 0;
                  setTimeout(classifyPose, 100);
              } else {
                  setTimeout(classifyPose, 100);
              }
          }
      }
      else {
          console.log("what we really dont want")
          setTimeout(classifyPose, 100);
      }
  }
  function nextPose() {
      if (poseCounter >= 5) {
          console.log("Well done, you have learnt all poses!"); //hey future steve you gotta test this condition
      } else {
          console.log("Moving on to next pose");
          round = 0;
          errorCounter = 0;
          iterationCounter = 0;
          targetLabel = poseCounter + 1;
          poseCounter = poseCounter + 1;
  
          console.log("next pose target label" + targetLabel);
          currentPose = posesArray[poseCounter];
          console.log("Next pose is " + currentPose);
  
  
          console.log("classifying again");
  
  
          setTimeout(classifyPose, 4000)
      }
  }


  }

  return <ReactP5Wrapper sketch={sketch} />;
}
