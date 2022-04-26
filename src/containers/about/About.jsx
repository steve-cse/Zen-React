import React from 'react';
import Feature from '../../components/feature/Feature';
import './about.css';

const About = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="About Zen" text="A computer-assisted training system that can recognize the poses performed by the user and assist them in improving their stance by delivering relevant feedback. The system evaluates the practitioner's posture by extracting feature vectors using computer vision techniques." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">A Computer-Assisted Yoga and Pilates training system</h1>
      <p><a href=''>Know more</a> </p>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Learn" text="The Learn module can be used to learn new poses and exercises for yoga and pilates" />
      <Feature title="Practice" text="The practice module can be utilised to perfect the poses and exercises that have been previously learned." />
      <Feature title="Review" text="The Review module, also known as the Dashboard, is used to visually describe the data from a pose or exercise." />
    </div>
  </div>
);

export default About;