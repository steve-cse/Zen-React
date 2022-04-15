import React from 'react'
import Table from 'react-bootstrap/Table'
import './YogaDataTable.css'
export default function PilatesDataTable(props) {
  return (
   <div className='table-wrapper'>
    <Table className="yoga_table" responsive>
    <thead>
      <tr  className="table-dark"> 
        <th className='yoga_table_header'>Pose</th>
        <th className='yoga_table_header'>Rounds</th>
        <th className='yoga_table_header'>Difficulty</th>
      </tr>
    </thead>
    <tbody className='yoga_table_body'>
      <tr>
       
        <td>Chair</td>
        <td>{localStorage.getItem("chair")}</td>
        <td>Beginner</td>
      </tr>
      <tr>
        <td>Cobra</td>
        <td>{localStorage.getItem("cobra")}</td>
        <td>Beginner</td>
      </tr>
      <tr>
        <td>Goddess</td>
        <td>{localStorage.getItem("goddess_pose")}</td>
        <td>Beginner</td>
      </tr>
      <tr>
        <td>Triangle</td>
        <td>{localStorage.getItem("triangle")}</td>
        <td>Beginner</td>
      </tr>
      <tr>
        <td>Tree</td>
        <td>{localStorage.getItem("tree")}</td>
        <td>Beginner</td>
      </tr>
      <tr>
        <td>Camel</td>
        <td>{localStorage.getItem("camel")}</td> 
        <td>Intermediate</td> 
      </tr>
      <tr>
        <td>Plank</td>
        <td>{localStorage.getItem("plank")}</td>  
        <td>Intermediate</td>
      </tr>
      <tr>
        <td>Upward Dog</td>
        <td>{localStorage.getItem("upward_dog")}</td>  
        <td>Intermediate</td>
      </tr>
      <tr>
        <td>Warrior 1</td>
        <td>{localStorage.getItem("warrior1")}</td>  
        <td>Intermediate</td>
      </tr>
      <tr>
        <td>Warrior 2</td>
        <td>{localStorage.getItem("warrior2")}</td>  
        <td>Intermediate</td>
      </tr>
    </tbody>
  </Table>
  </div>
  )
}
