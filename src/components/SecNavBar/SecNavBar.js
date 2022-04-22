import React,{ useState, useEffect } from 'react'
import { Navbar, Button, Alert, Nav, NavItem } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
export default function SecNavBar(props) {
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
  return (
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
                 {...(props.SlowLoad ? {href:'/dashboard'} : {})}
               
                onClick={() => navigate("/dashboard")}   
                
                style={{ color: "black" }}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                className="navbar_links my-2"
                {...(props.SlowLoad ? {href:'/selection-learn'} : {})}
                onClick={() => navigate("/selection-learn")}
                style={{ color: "black" }}
              >
                Learn
              </Nav.Link>
              <Nav.Link
                className="navbar_links my-2"
                {...(props.SlowLoad ? {href:'/selection-practice'} : {})}
                onClick={() => navigate("/selection-practice")}
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
    </>
  )
}
