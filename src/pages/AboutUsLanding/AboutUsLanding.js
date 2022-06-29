import React from "react";
import { CustomNavBar } from "../../components";
import { Footer } from "../../containers";
import { Image, Card } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import "./AboutUsLanding.css";

export default function AboutUsLanding() {
  return (
    <div className="AboutUsLanding">
      <CustomNavBar />
      <div className="aboutus_heading">
        <h2>The Team</h2>
      </div>
      <div className="image_container">
        <Card className="steve_card" style={{ width: "18rem" }}>
          <center>
            <Image
              src="https://avatars.githubusercontent.com/u/46752437?v=4"
              roundedCircle
              bsPrefix
            />
          </center>
          <Card.Body>
            <Card.Title
              className="steve_card_title"
              style={{ textAlign: "center" }}
            >
              Steve Boby George
            </Card.Title>
            <Card.Text
              className="steve_card_text"
              style={{ textAlign: "center" }}
            >
              Front & Back-End Developer
            </Card.Text>
            <center>
              <SocialIcon
                className="steve_gmail"
                url="mailto:stevebobygeorge@gmail.com"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="steve_github"
                url="https://github.com/Maverick-2000"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="steve_linkedin"
                url="https://linkedin.com/in/"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="steve_discord"
                url="https://discord.com/users/423151091874660354"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="steve_instagram"
                url="https://instagram.com/"
                style={{ height: 40, width: 40 }}
              />
            </center>
          </Card.Body>
        </Card>
        <Card className="sanjay_card" style={{ width: "18rem" }}>
          <center>
            <Image
              src="https://avatars.githubusercontent.com/u/34451677?v=4"
              roundedCircle
              bsPrefix
            />
          </center>
          <Card.Body>
            <Card.Title
              className="sanjay_card_title"
              style={{ textAlign: "center" }}
            >
              Sanjay Jaimy
            </Card.Title>
            <Card.Text
              className="sanjay_card_text"
              style={{ textAlign: "center" }}
            >
              Front-End Developer
            </Card.Text>
            <center>
              <SocialIcon
                className="sanjay_gmail"
                url="mailto:sanjujaimy@gmail.com"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="sanjay_github"
                url="https://github.com/petergade2000"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="sanjay_linkedin"
                url="https://in.linkedin.com/in/sanjayjaimy"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="sanjay_discord"
                url="https://discord.com/"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="sanjay_instagram"
                url="https://www.instagram.com/sanjayjaimy"
                style={{ height: 40, width: 40 }}
              />
            </center>
          </Card.Body>
        </Card>
        <Card className="edwin_card" style={{ width: "18rem" }}>
          <center>
            <Image
              src="https://avatars.githubusercontent.com/u/70021493?v=4"
              roundedCircle
              bsPrefix
            />
          </center>
          <Card.Body>
            <Card.Title
              className="edwin_card_title"
              style={{ textAlign: "center" }}
            >
              Edwin Daji
            </Card.Title>
            <Card.Text
              className="edwin_card_text"
              style={{ textAlign: "center" }}
            >
              AI & ML Specialist
            </Card.Text>
            <center>
              <SocialIcon
                className="edwin_gmail"
                url="mailto:edwin.daji@gmail.com"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="edwin_github"
                url="https://github.com/RisingPhoenix-2000"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="edwin_linkedin"
                url="https://in.linkedin.com/in/edwin-daji-3217771b6"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="edwin_discord"
                url="https://discord.com/"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="edwin_instagram"
                url="https://www.instagram.com"
                style={{ height: 40, width: 40 }}
              />
            </center>
          </Card.Body>
        </Card>
        <Card className="agnel_card" style={{ width: "18rem" }}>
          <center>
            <Image
              src="https://avatars.githubusercontent.com/u/74443619?v=4"
              roundedCircle
              bsPrefix
            />
          </center>
          <Card.Body>
            <Card.Title
              className="agnel_card_title"
              style={{ textAlign: "center" }}
            >
              Agnel Antony
            </Card.Title>
            <Card.Text
              className="agnel_card_text"
              style={{ textAlign: "center" }}
            >
              CSS Developer
            </Card.Text>
            <center>
              <SocialIcon
                className="agnel_gmail"
                url="mailto:agnel.antony2000@gmail.com"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="agnel_github"
                url="https://github.com/imAgnel"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="agnel_linkedin"
                url="https://in.linkedin.com/in/agnel-antony"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="agnel_discord"
                url="https://discord.com/"
                style={{ height: 40, width: 40 }}
              />
              <SocialIcon
                className="agnel_instagram"
                url="https://www.instagram.com"
                style={{ height: 40, width: 40 }}
              />
            </center>
          </Card.Body>
        </Card>
      </div>
      <div className="aboutus_heading">
        <h2>About Zen</h2>
      </div>
      <div className="aboutus_desc">
        <p>
          A computer-assisted training system that can recognize the poses
          performed by the user and assist them in improving their stance by
          delivering relevant feedback. The system evaluates the practitioner's
          posture by extracting feature vectors using computer vision
          techniques.
        </p>
      </div>
      <div className="aboutus_heading">
        <h2>Technologies Used</h2>
      </div>
      <div className="aboutus_desc">
        <ol className="aboutus_list">
          <li>
            <b>React</b>: A free and open-source front-end JavaScript library
            for building user interfaces based on UI components. It is
            maintained by Meta and a community of individual developers and
            companies
          </li>
          <li>
            <b>Movenet</b>: MoveNet is a human pose detection architecture
            developed at Google that is ultra fast and accurate. It was designed
            to detect difficult poses.
          </li>
          <li>
            <b>MediaPipe</b>: MediaPipe Pose is a machine learning solution for
            high-fidelity body pose tracking that utilises BlazePose, a pose
            detection model to infer 33 3D landmarks and a background
            segmentation mask on the entire body from RGB video frames.
          </li>
          <li>
            <b>Firebase</b>: Firebase is a platform developed by Google for
            creating mobile and web applications.
          </li>
          <li>
            <b>Vercel</b>: Vercel is a platform for frontend frameworks and
            static sites, built to integrate with headless content, commerce, or
            database.
          </li>
        </ol>
        <div className="aboutus_heading">
          <h2>Icons courtesy of</h2>
        </div>
        <div className="aboutus_desc">
          <ul className="aboutus_list">
            <li>
              <a
                href="https://www.flaticon.com/free-icons/excercise"
                title="excercise icons"
              >
                Excercise icons created by monkik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/lotus"
                title="lotus icons"
              >
                Lotus icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/resistance-band"
                title="resistance band icons"
              >
                Resistance band icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/rotate"
                title="rotate icons"
              >
                Rotate icons created by Pixel perfect - Flaticon
              </a>
            </li>
            <li>
              <a href="https://www.freepik.com/vectors/no-connection">
                No connection vector created by storyset - www.freepik.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
