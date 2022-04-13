import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { fstore } from "../../firebaseconfig/firebaseconfig";
import { query, getDocs, collection, where } from "firebase/firestore";
import PilatesDataTable from "../../components/PilatesDataTable/PilatesDataTable";
import YogaDataTable from "../../components/YogaDataTable/YogaDataTable";
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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <div>
            <h3>Pilates Analytics</h3>
            <PilatesDataTable
              curls={localStorage.getItem("Left Curl")}
              squats={localStorage.getItem("Squats")}
              lateral_raise={localStorage.getItem("Lateral Raise")}
            />
            <h3>Yoga Analytics</h3>
            <YogaDataTable />
          </div>
        </Card.Body>
      </Card>

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
        <Button variant="link" onClick={() => navigate("/yoga-learn-intermediate")}>
          Learn Yoga Intermediate
        </Button>
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
