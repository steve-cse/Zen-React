import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-exists":
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
          setError("There is no existing user record.");
          break;
        case "auth/wrong-password":
          setError("Wrong password please try again.");
          break;
        default:
          setError("Failed to log in");
      }
      console.log(err.code);
      setLoading(false);
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
              <h2 className="text-center mb-4">Log In</h2>
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
                <Button
                  disabled={loading}
                  className="w-100 container my-3 btn btn-warning"
                  type="submit"
                >
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
