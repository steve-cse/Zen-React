import React, { useState } from "react";
import SecNavBar from "../../components/SecNavBar/SecNavBar";
import { MinimalFooter } from "../../containers";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import TUTDATA from "./TutorialData.json";
import { IoIosSearch } from "react-icons/io";
import { IconContext } from "react-icons";
import "./Tutorials.css";
export default function Tutorials() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="Tutorials">
      <SecNavBar />
      <h2 className="tutorials_heading">Tutorials</h2>
      <div className="searchbar_container">
        <Form className="searchbar">
          <InputGroup className="mb-3">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <IconContext.Provider value={{ size: "1.5em" }}>
              <InputGroup.Text id="basic-addon2">
                <IoIosSearch />
              </InputGroup.Text>
            </IconContext.Provider>
          </InputGroup>
        </Form>
      </div>

      <div className="tutorials_container">
        {TUTDATA.filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val;
          }
        }).map((val, key) => {
          return (
            <div className="player_container" key={key}>
              <ReactPlayer
                url={val.url}
                width="300px"
                height="150px"
                controls
                light
              />
            </div>
          );
        })}
      </div>
      <MinimalFooter />
    </div>
  );
}
