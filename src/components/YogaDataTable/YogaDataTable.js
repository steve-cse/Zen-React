import React from "react";
import Table from "react-bootstrap/Table";
import "./YogaDataTable.css";
export default function YogaDataTable() {
  return (
    <div className="yoga_table_wrap">
      <Table>
        <thead>
          <tr>
            <th className="bg-warning yoga_table_body" colSpan="3">
              Yoga Overview
            </th>
          </tr>
          <tr className="table-dark">
            <th className="yoga_table_header">Pose</th>
            <th className="yoga_table_header">Difficulty</th>
            <th className="yoga_table_header">Rounds</th>
          </tr>
        </thead>
        <tbody className="yoga_table_body">
          <tr>
            <td>Chair</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("chair")}</td>
          </tr>
          <tr>
            <td>Cobra</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("cobra")}</td>
          </tr>
          <tr>
            <td>Goddess</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("goddess_pose")}</td>
          </tr>
          <tr>
            <td>Triangle</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("triangle")}</td>
          </tr>
          <tr>
            <td>Tree</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("tree")}</td>
          </tr>
          <tr>
            <td>Camel</td>
            <td>Intermediate</td>
            <td>{localStorage.getItem("camel")}</td>
          </tr>
          <tr>
            <td>Plank</td>
            <td>Intermediate</td>
            <td>{localStorage.getItem("plank")}</td>
          </tr>
          <tr>
            <td>Upward Dog</td>
            <td>Intermediate</td>
            <td>{localStorage.getItem("upward_dog")}</td>
          </tr>
          <tr>
            <td>Warrior 1</td>
            <td>Intermediate</td>
            <td>{localStorage.getItem("warrior1")}</td>
          </tr>
          <tr>
            <td>Warrior 2</td>
            <td>Intermediate</td>
            <td>{localStorage.getItem("warrior2")}</td>
          </tr>
          <tr>
            <td>Bound Ankle</td>
            <td>Advanced</td>
            <td>{localStorage.getItem("bound_ankle")}</td>
          </tr><tr>
            <td>Bridge</td>
            <td>Advanced</td>
            <td>{localStorage.getItem("bridge")}</td>
          </tr><tr>
            <td>Down Dog</td>
            <td>Advanced</td>
            <td>{localStorage.getItem("down_dog")}</td>
          </tr><tr>
            <td>Gate</td>
            <td>Advanced</td>
            <td>{localStorage.getItem("gate")}</td>
          </tr><tr>
            <td>Half Moon</td>
            <td>Advanced</td>
            <td>{localStorage.getItem("half_moon")}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
