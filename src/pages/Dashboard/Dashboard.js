import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { fstore } from "../../firebaseconfig/firebaseconfig";
import { query, getDocs, collection, where } from "firebase/firestore";
import PilatesDataTable from "../../components/PilatesDataTable/PilatesDataTable";
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
      localStorage.setItem("id", returnedData.id);
    };

    getData();
    
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <div>
            <PilatesDataTable
              curls={localStorage.getItem("Left Curl")}
              squats={localStorage.getItem("Squats")}
              lateral_raise={localStorage.getItem("Lateral Raise")}
            />
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Button
          variant="link"
          onClick={() => navigate("/pilates-practice-beginner")}
        >
          Pilates
        </Button>
        <Button
          variant="link"
          onClick={() => navigate("/yoga-practice-beginner")}
        >
          Yoga
        </Button>
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
