import React from "react";
import Table from "react-bootstrap/Table";
import "./PilatesDataTable.css";
export default function PilatesDataTable() {
  return (
    <div className="pilates_table_wrap">
      <Table>
        <thead>
          <tr>
            <th className="bg-warning pilates_table_body" colspan="3">
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
            <td>Curls</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("Left Curl")}</td>
          </tr>
          <tr>
            <td>Squats</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("Squats")}</td>
          </tr>
          <tr>
            <td>Lateral Raise</td>
            <td>Beginner</td>
            <td>{localStorage.getItem("Lateral Raise")}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
