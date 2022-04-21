import React from 'react'
import { Navbar, Button, Alert, Nav, NavItem,Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useState from "react-usestateref";
import { MinimalFooter } from "../../containers";

import './SelectionLearn.css'
export default function SelectionLearn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
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
      {error && <Alert variant="danger">{error}</Alert>}
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
                onClick={() => navigate("/selection-learn")}
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
      <div className='card_flex_container'>
          <div className='yoga_learn_select'>
    <Card style={{ width: '18rem' }}>
  
  <Card.Body>
    <Card.Title>Yoga Learn (Beginner)</Card.Title>
    <Card.Text>
      Easy poses for beginners.
    </Card.Text>
    <center><Button variant="warning" onClick={() => navigate("/yoga-learn-beginner")}>Go</Button></center>
  </Card.Body>
</Card>
</div>
<div className='yoga_learn_select'>
 <Card style={{ width: '18rem' }}>
  
 <Card.Body>
   <Card.Title>Yoga Learn (Intermediate)</Card.Title>
   <Card.Text>
     Bit more challenging poses. 
   </Card.Text>
   <center><Button variant="warning" onClick={() => navigate("/yoga-learn-intermediate")}>Go</Button></center>
 </Card.Body>
</Card>
</div>
<div className='yoga_learn_select'>

<Card style={{ width: '18rem' }}>
  
 <Card.Body>
   <Card.Title>Yoga Learn (Advanced)</Card.Title>
   <Card.Text>
     The ultimate challenge. 
   </Card.Text>
   <center><Button variant="warning" onClick={() => navigate("/yoga-learn-advanced")}>Go</Button></center>
 </Card.Body>
</Card>
</div>
</div>
<div className='card_flex_container'>
          <div className='yoga_learn_select'>
    <Card style={{ width: '18rem' }}>
  
  <Card.Body>
    <Card.Title>Pilates Learn (Beginner)</Card.Title>
    <Card.Text>
      Simple exercises for beginners.
    </Card.Text>
    <center><Button variant="warning" onClick={() => navigate("/pilates-learn-beginner")}>Go</Button></center>
  </Card.Body>
</Card>
</div>
<div className='yoga_learn_select'>
 <Card style={{ width: '18rem' }}>
  
 <Card.Body>
   <Card.Title>Pilates Learn (Intermediate)</Card.Title>
   <Card.Text>
     Bit more challenging exercises. 
   </Card.Text>
   <center><Button variant="warning" onClick={() => navigate("/pilates-learn-intermediate")}>Go</Button></center>
 </Card.Body>
</Card>
</div>
<div className='yoga_learn_select'>

<Card style={{ width: '18rem' }}>
  
 <Card.Body>
   <Card.Title>Pilates Learn (Advanced)</Card.Title>
   <Card.Text>
     The hardcore challenge. 
   </Card.Text>
   <center><Button variant="warning" onClick={() => navigate("/pilates-learn-advanced")}>Go</Button></center>
 </Card.Body>
</Card>
</div>
</div>
<div className="minimalfoot_styling">
            <MinimalFooter />
          </div>
</>
  )
}
