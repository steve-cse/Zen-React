import React, { useState, useEffect } from "react";
import { Navbar, Button, Alert, Nav, NavItem,Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { fstore } from "../../firebaseconfig/firebaseconfig";
import { query, getDocs, collection, where } from "firebase/firestore";
import PilatesDataTable from "../../components/PilatesDataTable/PilatesDataTable";
import YogaDataTable from "../../components/YogaDataTable/YogaDataTable";
import logo from "../../assets/logo.png";
import "./Dashboard.css";

var returnedData;
export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
      //setPilates();
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
    };

    getData();
  }, []);

  return (
    <>
      <Navbar className="gradient_navbar">
        <Navbar.Brand >
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

     
        <h3>Pilates Analytics</h3>
        <Container>
        <PilatesDataTable
          curls={localStorage.getItem("Left Curl")}
          squats={localStorage.getItem("Squats")}
          lateral_raise={localStorage.getItem("Lateral Raise")}
        />
        </Container>
        
        <h3>Yoga Analytics</h3>
       
        <Container>
        
        <YogaDataTable />
      
        </Container>
      
      <div className="w-100 text-center mt-2">
        <Button
          variant="link"
          onClick={() => navigate("/pilates-practice-beginner")}
        >
          Practice Pilates
        </Button>
        <Button
          variant="link"
          onClick={() => navigate("/yoga-practice-beginner")}
        >
          Practice Yoga Beginner
        </Button>
        <Button
          variant="link"
          onClick={() => navigate("/yoga-practice-intermediate")}
        >
          Practice Yoga Intermediate
        </Button>
        <Button
          variant="link"
          onClick={() => navigate("/pilates-learn-beginner")}
        >
          Learn Pilates
        </Button>
        <Button variant="link" onClick={() => navigate("/yoga-learn-beginner")}>
          Learn Yoga Beginner
        </Button>
        <Button
          variant="link"
          onClick={() => navigate("/yoga-learn-intermediate")}
        >
          Learn Yoga Intermediate
        </Button>
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
