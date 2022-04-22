import React from "react";
import { Button, Card } from "react-bootstrap";
import { MinimalFooter } from "../../containers";
import SecNavBar from "../../components/SecNavBar/SecNavBar";
import { useNavigate } from "react-router-dom";
import "./SelectionPractice.css";
export default function SelectionLearn() {
  const navigate = useNavigate();
  return (
    <>
      <SecNavBar />
      <div className="card_flex_container">
        <div className="yoga_learn_select">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Yoga Practice (Beginner)</Card.Title>
              <Card.Text>Easy poses for beginners.</Card.Text>
              <center>
                <Button
                  variant="warning"
                  onClick={() => navigate("/yoga-practice-beginner")}
                >
                  Go
                </Button>
              </center>
            </Card.Body>
          </Card>
        </div>
        <div className="yoga_learn_select">
          <Card style={{ width: "20rem" }}>
            <Card.Body>
              <Card.Title>Yoga Practice (Intermediate)</Card.Title>
              <Card.Text>Bit more challenging poses.</Card.Text>
              <center>
                <Button
                  variant="warning"
                  onClick={() => navigate("/yoga-practice-intermediate")}
                >
                  Go
                </Button>
              </center>
            </Card.Body>
          </Card>
        </div>
        <div className="yoga_learn_select">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Yoga Practice (Advanced)</Card.Title>
              <Card.Text>The ultimate challenge.</Card.Text>
              <center>
                <Button
                  variant="warning"
                  onClick={() => navigate("/yoga-practice-advanced")}
                >
                  Go
                </Button>
              </center>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="card_flex_container">
        <div className="yoga_learn_select">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Pilates Practice (Beginner)</Card.Title>
              <Card.Text>Simple exercises for beginners.</Card.Text>
              <center>
                <Button
                  variant="warning"
                  onClick={() => navigate("/pilates-practice-beginner")}
                >
                  Go
                </Button>
              </center>
            </Card.Body>
          </Card>
        </div>
        <div className="yoga_learn_select">
          <Card style={{ width: "20rem" }}>
            <Card.Body>
              <Card.Title>Pilates Practice (Intermediate)</Card.Title>
              <Card.Text>Bit more challenging exercises.</Card.Text>
              <center>
                <Button
                  variant="warning"
                  onClick={() => navigate("/pilates-practice-intermediate")}
                >
                  Go
                </Button>
              </center>
            </Card.Body>
          </Card>
        </div>
        <div className="yoga_learn_select">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Pilates Practice (Advanced)</Card.Title>
              <Card.Text>The hardcore challenge.</Card.Text>
              <center>
                <Button
                  variant="warning"
                  onClick={() => navigate("/pilates-practice-advanced")}
                >
                  Go
                </Button>
              </center>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="minimalfoot_styling">
        <MinimalFooter />
      </div>
    </>
  );
}
