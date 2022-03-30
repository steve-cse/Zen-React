import React from 'react'
import Table from 'react-bootstrap/Table'
export default function PilatesDataTable(props) {
  return (
    
    <Table striped bordered size="sm">
    <thead>
      <tr  class="table-dark"> 
        <th>Pose</th>
        <th>Rounds</th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
       
        <td>Chair</td>
        <td>{localStorage.getItem("chair")}</td>
        
      </tr>
      <tr>
        <td>Cobra</td>
        <td>{localStorage.getItem("cobra")}</td>
       
      </tr>
      <tr>
        <td>Goddess</td>
        <td>{localStorage.getItem("goddess_pose")}</td>
        
      </tr>
      <tr>
        <td>Triangle</td>
        <td>{localStorage.getItem("traingle")}</td>
        
      </tr>
      <tr>
        <td>Tree</td>
        <td>{localStorage.getItem("tree")}</td>
        
      </tr>
    </tbody>
  </Table>
  )
}
