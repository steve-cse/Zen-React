import React from 'react'
import { Button,Card } from "react-bootstrap";
import { MinimalFooter } from "../../containers";
import SecNavBar from "../../components/SecNavBar/SecNavBar";
import { useNavigate } from "react-router-dom";

import './SelectionLearn.css'
export default function SelectionLearn() {
  const navigate = useNavigate();
  return (
     <>
     <SecNavBar/>
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
