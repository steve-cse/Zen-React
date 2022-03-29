import React from 'react'
import Table from 'react-bootstrap/Table'
export default function PilatesDataTable(props) {
  return (
    
    <Table striped bordered size="sm">
    <thead>
      <tr  class="table-dark"> 
        <th>Exercise</th>
        <th>Reps</th>
        <th>Avg. Calories Burned</th>
      </tr>
    </thead>
    <tbody>
      <tr>
       
        <td>Curls</td>
        <td>{props.curls}</td>
        <td>{props.curls*5} Kcal</td>
      </tr>
      <tr>
        <td>Squats</td>
        <td>{props.squats}</td>
        <td>{props.squats*35} Kcal</td>
      </tr>
      <tr>
        <td>Lateral Raise</td>
        <td>{props.lateral_raise}</td>
        <td>{props.lateral_raise*7} Kcal</td>
      </tr>
    </tbody>
  </Table>
  )
}
