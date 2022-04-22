import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fstore } from "../../firebaseconfig/firebaseconfig";
import { query, getDocs, collection, where } from "firebase/firestore";
import PilatesDataTable from "../../components/PilatesDataTable/PilatesDataTable";
import YogaDataTable from "../../components/YogaDataTable/YogaDataTable";
import BarChart from "../../components/BarChart/BarChart";
import { MinimalFooter } from "../../containers";
import ClockLoader from "react-spinners/ClockLoader";
import SecNavBar from "../../components/SecNavBar/SecNavBar";
import "./Dashboard.css";

var returnedData;
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { currentUser} = useAuth();
  const yogaBarData = {
    labels: [
      "Chair",
      "Cobra",
      "Goddess",
      "Triangle",
      "Tree",
      "Camel",
      "Plank",
      "Upward Dog",
      "Warrior 1",
      "Warrior 2",
      "Bound Ankle",
      "Bridge",
      "Down Dog",
      "Gate",
      "Half Moon",
    ],
    datasets: [
      {
        label: "Rounds",
        data: [
          localStorage.getItem("chair"),
          localStorage.getItem("cobra"),
          localStorage.getItem("goddess_pose"),
          localStorage.getItem("triangle"),
          localStorage.getItem("tree"),
          localStorage.getItem("camel"),
          localStorage.getItem("plank"),
          localStorage.getItem("upward_dog"),
          localStorage.getItem("warrior1"),
          localStorage.getItem("warrior2"),
          localStorage.getItem("bound_ankle"),
          localStorage.getItem("bridge"),
          localStorage.getItem("down_dog"),
          localStorage.getItem("gate"),
          localStorage.getItem("half_moon"),
        ],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };
  const pilatesBarData = {
    labels: [
      "Right Curl",
      "Left Curl",
      "Lateral Raise",
      "Lunges",
      "Side Lunge",
      "Squats",
      "Tricep Kickback",
      "Plie Squat",
    ],
    datasets: [
      {
        label: "Repetitions",
        data: [
          localStorage.getItem("Right Curl"),
          localStorage.getItem("Left Curl"),
          localStorage.getItem("Lateral Raise"),
          localStorage.getItem("Lunges"),
          localStorage.getItem("Side Lunge"),
          localStorage.getItem("Squats"),
          localStorage.getItem("Tricep Kickback"),
          localStorage.getItem("Plie Squat"),
        ],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };
  
  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(fstore, "users"),
        where("uid", "==", currentUser.uid)
      );
      const docs = await getDocs(q);
      returnedData = Object.assign(
        docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )[0];
      localStorage.setItem("Left Curl", returnedData["Left Curl"]);
      localStorage.setItem("Squats", returnedData["Squats"]);
      localStorage.setItem("Lateral Raise", returnedData["Lateral Raise"]);
      localStorage.setItem("Right Curl", returnedData["Right Curl"]);
      localStorage.setItem("Lunges", returnedData["Lunges"]);
      localStorage.setItem("Side Lunge", returnedData["Side Lunge"]);
      localStorage.setItem("Plie Squat", returnedData["Plie Squat"]);
      localStorage.setItem("Tricep Kickback", returnedData["Tricep Kickback"]);

      localStorage.setItem("chair", returnedData.chair);
      localStorage.setItem("cobra", returnedData.cobra);
      localStorage.setItem("goddess_pose", returnedData.goddess_pose);
      localStorage.setItem("triangle", returnedData.triangle);
      localStorage.setItem("tree", returnedData.tree);
      localStorage.setItem("camel", returnedData.camel);
      localStorage.setItem("plank", returnedData.plank);
      localStorage.setItem("upward_dog", returnedData.upward_dog);
      localStorage.setItem("warrior1", returnedData.warrior1);
      localStorage.setItem("warrior2", returnedData.warrior2);
      localStorage.setItem("bound_ankle", returnedData.bound_ankle);
      localStorage.setItem("bridge", returnedData.bridge);
      localStorage.setItem("down_dog", returnedData.down_dog);
      localStorage.setItem("gate", returnedData.gate);
      localStorage.setItem("half_moon", returnedData.half_moon);

      localStorage.setItem("id", returnedData.id);
      setLoading(false);
    };

    getData();
  }, []);

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
            <p>Follow the white rabbit.</p>
          </div>
        </>
      ) : (
        <>
          <SecNavBar />

          <h2 className="dashboard_heading">Your Dashboard</h2>
          <p className="dashboard_description">
            &#128200; Visualize your gains here.
          </p>
          <div className="graph_container">
            <div style={{ width: 750 }}>
              <BarChart chartData={yogaBarData} chartTitle="Yoga Overview" />
            </div>
            <div style={{ width: 750 }}>
              <BarChart
                chartData={pilatesBarData}
                chartTitle="Pilates Overview"
              />
            </div>
          </div>
          <p className="dashboard_description"> &#128194; Your data. </p>
          <div className="table_container">
            <div className="yoga_table_style">
              <YogaDataTable />
            </div>
            <div className="pilates_table_style">
              <PilatesDataTable />
            </div>
          </div>
          <MinimalFooter />
        </>
      )}
    </>
  );
}
