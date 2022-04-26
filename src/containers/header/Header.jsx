import React from "react";
import "./header.css";
import yoga from "../../assets/5184243.jpg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">Zen : Yoga and Pilates</h1>
        <strong>
          Computer Assisted Yoga and Pilates training system. Users get real
          time feedback on their posture, performance and correction needed.
          Helps diminish the need for a yoga or pilates coach
        </strong>

        <div className="gpt3__header-content__input">
          <input type="email" placeholder="Your Email Address" />
          <button type="button" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        </div>

        {/* <div className="gpt3__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div> */}
      </div>

      <div className="gpt3__header-image">
        <img src={yoga} alt="" />
      </div>
    </div>
  );
};
export default Header;
