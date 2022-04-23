import React from "react";
import Table from "react-bootstrap/Table";
import "./PilatesDataTable.css";
export default function PilatesDataTable() {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th className="bg-warning pilates_table_body" colSpan="3">
              Pilates Overview
            </th>
          </tr>
          <tr className="table-dark">
            <th className="pilates_table_header">Exercise</th>
            <th className="pilates_table_header">Difficulty</th>
            <th className="pilates_table_header">Repetitions</th>
          </tr>
        </thead>
        <tbody className="pilates_table_body">
          <tr>
            <td>Right Curl</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("Right Curl")}</td>
          </tr>
          <tr>
            <td>Left Curl</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("Left Curl")}</td>
          </tr>
          <tr>
            <td>Lateral Raise</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("Lateral Raise")}</td>
          </tr>
          <tr>
            <td>Lunges</td>
            <td>Intermediate</td>
            <td>{localStorage.getItem("Lunges")}</td>
          </tr>
          <tr>
            <td>Side Lunge</td>
            <td>Intermediate</td>
            <td>{localStorage.getItem("Side Lunge")}</td>
          </tr>
          <tr>
            <td>Squats</td>
            <td>Intermediate</td>
            <td>{localStorage.getItem("Squats")}</td>
          </tr>
          <tr>
            <td>Tricep Kickback</td>
            <td>Advanced</td>
            <td>{localStorage.getItem("Tricep Kickback")}</td>
          </tr>
          <tr>
            <td>Plie Squat</td>
            <td>Advanced</td>
            <td>{localStorage.getItem("Plie Squat")}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
