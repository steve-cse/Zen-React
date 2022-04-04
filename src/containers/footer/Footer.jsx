import React from 'react';
import logo from '../../assets/logo.png';
import './footer.css';
import {useNavigate} from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();
  return (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-heading">
      <h1 className="gradient__text">Get OnBoard Right Now !</h1>
    </div>

    <div className="gpt3__footer-btn" onClick={() => navigate('/signup')}>
     
      <strong > Login / Register</strong>
    </div>

    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={logo} alt="gpt3_logo" />
        <p>Z E N ™<br /> All Rights Reserved</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Links</h4>
        <p>Instagram</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Write to Us</h4>
        <p>Meston Gardens</p>
        <p>085-132567</p>
        <p>zenyoga@gmail.com</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2022 ZEN. All rights reserved.</p>
    </div>
  </div> );
};

export default Footer;