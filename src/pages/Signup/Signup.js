import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { fstore } from "../../firebaseconfig/firebaseconfig";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      const res = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );

      const q = query(
        collection(fstore, "users"),
        where("uid", "==", res.user.uid)
      );
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(fstore, "users"), {
          uid: res.user.uid,
          // Initialize pilates data
          "Left Curl": 0,
          Squats: 0,
          "Lateral Raise": 0,
          "Right Curl": 0,
          Lunges: 0,
          "Side Lunge": 0,
          "Plie Squat": 0,
          "Tricep Kickback": 0,
          // Initialize yoga data
          chair: 0,
          cobra: 0,
          goddess_pose: 0,
          triangle: 0,
          tree: 0,
          camel: 0,
          plank: 0,
          upward_dog: 0,
          warrior1: 0,
          warrior2: 0,
          bound_ankle: 0,
          bridge: 0,
          down_dog: 0,
          gate: 0,
          half_moon: 0,
        });
      }
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError(
            "The provided email is already in use by an existing user. "
          );
          break;
        case "auth/internal-error":
          setError(
            "The Authentication server encountered an unexpected error."
          );
          break;
        case "auth/insufficient-permission":
          setError("Insufficient permission to access the requested resource.");
          break;
        case "auth/id-token-expired":
          setError("Firebase ID token is expired.");
          break;
        case "auth/id-token-revoked":
          setError("The Firebase ID token has been revoked.");
          break;
        case "auth/invalid-email":
          setError("Invalid email please try again.");
          break;
        case "auth/invalid-password":
          setError("Invalid password please try again.");
          break;
        case "auth/user-not-found":
          setError("There is no existing user record ");
          break;
        default:
          setError("Failed to create an account");
      }
      setLoading(false);
      console.log(error.code);
    }
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100 container my-3 btn btn-warning"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
