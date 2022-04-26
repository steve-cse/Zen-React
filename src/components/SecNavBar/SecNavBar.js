import React, { useState} from "react";
import {
  Navbar,
  Button,
  Alert,
  Nav,
  NavItem,
  Container,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./SecNavBar.css";
export default function SecNavBar(props) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      // navigate("/login");
      window.open("/login", "_top")
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div className="SecNavBar">
      <Navbar className="gradient_navbar" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <img className="navbar_brand_img"
              alt=""
              src={logo}
              // width="120"
              // height="60"
              // className="d-inline-block align-top mx-3"
            />
          </Navbar.Brand>

          <Navbar.Toggle
            className="ms-auto"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                className="navbar_links my-2"
                {...(props.SlowLoad ? { href: "/dashboard" } : {})}
                onClick={() => navigate("/dashboard")}
                style={{ color: "black" }}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                className="navbar_links my-2"
                {...(props.SlowLoad ? { href: "/selection-learn" } : {})}
                onClick={() => navigate("/selection-learn")}
                style={{ color: "black" }}
              >
                Learn
              </Nav.Link>
              <Nav.Link
                className="navbar_links my-2"
                {...(props.SlowLoad ? { href: "/selection-practice" } : {})}
                onClick={() => navigate("/selection-practice")}
                style={{ color: "black" }}
              >
                Practice
              </Nav.Link>
              <Nav.Link
               className="navbar_links my-2"
               {...(props.SlowLoad ? { href: "/tutorials" } : {})}
               onClick={() => navigate("/tutorials")}
               style={{ color: "black" }}
              >
                Tutorials
              </Nav.Link>
              <Nav.Link
                className="navbar_links my-2"
                href="#pricing"
                style={{ color: "black" }}
              >
                Instructions
              </Nav.Link>
              <Nav.Link
               className="navbar_links my-2"
               {...(props.SlowLoad ? { href: "/about" } : {})}
               onClick={() => navigate("/about")}
               style={{ color: "black" }}
              >
                About
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="current_user" style={{ color: "black", cursor: "default"}}>
                Syncing to: {currentUser.email}
              </Nav.Link>
              <NavItem>
                <Button onClick={handleLogout}>Log Out</Button>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
}
