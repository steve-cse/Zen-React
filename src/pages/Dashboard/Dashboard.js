import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { fstore } from "../../firebaseconfig/firebaseconfig";
import { query, getDocs, collection, where } from "firebase/firestore";
import PilatesDataTable from "../../components/PilatesDataTable/PilatesDataTable";
import YogaDataTable from "../../components/YogaDataTable/YogaDataTable";
import BarChart from "../../components/BarChart/BarChart";
import RadarChart from "../../components/RadarChart/RadarChart";
import { MinimalFooter } from "../../containers";
import ClipLoader from "react-spinners/ClipLoader";
import SecNavBar from "../../components/SecNavBar/SecNavBar";
import "./Dashboard.css";

var returnedData;
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
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
  if (window.innerWidth < 480) {
    return (
      <>
        {loading ? (
          <div
            className="dash_loader"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ClipLoader size={"150"} color={"#ffc107"} loading={loading} />
          </div>
        ) : (
          <div className="dashboard">
            <SecNavBar />
            <div className="dashboard_header">
              <h2>Your Dashboard</h2>
            </div>
            <div className="dashboard_desc">
              <p>&#128200; Visualize your gains here.</p>
            </div>
            <div className="graph_container">
              <div className="yoga_graph">
                <RadarChart
                  chartData={yogaBarData}
                  chartTitle="Yoga Overview"
                />
              </div>

              <div className="pilates_graph">
                <RadarChart
                  chartData={pilatesBarData}
                  chartTitle="Pilates Overview"
                />
              </div>
            </div>
            <div className="dashboard_desc">
              <p> &#128194; Your data. </p>
            </div>

            <div className="table_container">
              <div className="yoga_table_style">
                <YogaDataTable />
              </div>
              <div className="pilates_table_style">
                <PilatesDataTable />
              </div>
            </div>
            <MinimalFooter />
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {loading ? (
          <div
            className="dash_loader"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ClipLoader size={"150"} color={"#ffc107"} loading={loading} />
          </div>
        ) : (
          <div className="dashboard">
            <SecNavBar />
            <div className="dashboard_header">
              <h2>Your Dashboard</h2>
            </div>
            <div className="dashboard_desc">
              <p>&#128200; Visualize your gains here.</p>
            </div>
            <div className="graph_container">
              <div className="yoga_graph">
                <BarChart chartData={yogaBarData} chartTitle="Yoga Overview" />
              </div>

              <div className="pilates_graph">
                <BarChart
                  chartData={pilatesBarData}
                  chartTitle="Pilates Overview"
                />
              </div>
            </div>
            <div className="dashboard_desc">
              <p> &#128194; Your data. </p>
            </div>

            <div className="table_container">
              <div className="yoga_table_style">
                <YogaDataTable />
              </div>
              <div className="pilates_table_style">
                <PilatesDataTable />
              </div>
            </div>
            <MinimalFooter />
          </div>
        )}
      </>
    );
  }
}
