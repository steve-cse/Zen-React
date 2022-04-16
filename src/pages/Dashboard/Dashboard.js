import React, { useState, useEffect } from "react";
import { Navbar, Button, Alert, Nav, NavItem } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { fstore } from "../../firebaseconfig/firebaseconfig";
import { query, getDocs, collection, where } from "firebase/firestore";
import PilatesDataTable from "../../components/PilatesDataTable/PilatesDataTable";
import YogaDataTable from "../../components/YogaDataTable/YogaDataTable";
import BarChart from "../../components/BarChart/BarChart";
import logo from "../../assets/logo.png";
import { MinimalFooter } from "../../containers";
import ClockLoader from "react-spinners/ClockLoader";
import "./Dashboard.css";

var returnedData;
export default function Dashboard() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
        ],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };
  const pilatesBarData = {
    labels: ["Curls", "Squats", "Lateral Raise"],
    datasets: [
      {
        label: "Repetitions",
        data: [
          localStorage.getItem("Left Curl"),
          localStorage.getItem("Squats"),
          localStorage.getItem("Lateral Raise"),
        ],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
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
            <p>Stay hungry. Stay foolish.</p>
          </div>
        </>
      ) : (
        <>
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
          {error && <Alert variant="danger">{error}</Alert>}

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
