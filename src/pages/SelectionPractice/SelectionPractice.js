import React, { useState } from "react";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { MinimalFooter } from "../../containers";
import SecNavBar from "../../components/SecNavBar/SecNavBar";
import { useNavigate } from "react-router-dom";
import lotus from "../../assets/lotus.png";
import resistanceband from "../../assets/resistanceband.png";
import "./SelectionPractice.css";
export default function SelectionPractice() {
  const navigate = useNavigate();
  const [YogaLearnRoute, setYogaLearnRoute] = useState("/yoga-practice-beginner");
  const [PilatesLearnRoute, setPilatesLearnRoute] = useState(
    "/pilates-practice-beginner"
  );
  return (
    <div className="SelectionPractice">
      <SecNavBar />

      <div className="practice_select_container">
        <div className="practice_select_yoga">
          <Card className="yoga_card">
            <Card.Img className="yoga_card_img" variant="top" src={lotus} />
            <Card.Body>
              <Card.Title className="yoga_card_title">Practice Yoga</Card.Title>
              <Card.Text className="yoga_card_text">
                Practice yoga from beginner to advanced.
              </Card.Text>
              <div className="yoga_card_selector">
                <DropdownButton
                  className="yoga_dropdown"
                  title={
                    YogaLearnRoute.substring(15).charAt(0).toUpperCase() +
                    YogaLearnRoute.substring(15).slice(1)
                  }
                  onSelect={(e) => {
                    setYogaLearnRoute(e);
                  }}
                >
                  <Dropdown.Item eventKey="/yoga-practice-beginner">
                    {" "}
                    Beginner
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/yoga-practice-intermediate">
                    {" "}
                    Intermediate
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/yoga-practice-advanced">
                    Advanced
                  </Dropdown.Item>
                </DropdownButton>
                <Button
                  variant="warning"
                  onClick={() => navigate(YogaLearnRoute)}
                >
                  Go
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="pilates_practice_select">
          <Card className="pilates_card">
            <Card.Img
              className="pilates_card_img"
              variant="top"
              src={resistanceband}
            />
            <Card.Body>
              <Card.Title className="pilates_card_title">
                Practice Pilates
              </Card.Title>
              <Card.Text className="pilates_card_text">
                Practice pilates from beginner to advanced.
              </Card.Text>
              <div className="pilates_card_selector">
                <DropdownButton
                  className="pilates_dropdown"
                  title={
                    PilatesLearnRoute.substring(18).charAt(0).toUpperCase() +
                    PilatesLearnRoute.substring(18).slice(1)
                  }
                  onSelect={(e) => {
                    setPilatesLearnRoute(e);
                  }}
                >
                  <Dropdown.Item eventKey="/pilates-practice-beginner">
                    {" "}
                    Beginner
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/pilates-practice-intermediate">
                    {" "}
                    Intermediate
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="/pilates-practice-advanced">
                    Advanced
                  </Dropdown.Item>
                </DropdownButton>
                <Button
                  variant="warning"
                  onClick={() => navigate(PilatesLearnRoute)}
                >
                  Go
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <MinimalFooter />
    </div>
  );
}
