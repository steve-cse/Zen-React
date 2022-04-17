import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './DropDown.css'
export default function DropDown({ exercise_pack, currentPose, setCurrentPose }) {

return (<>
      
      <DropdownButton  id="dropdown-basic-button" title={currentPose} onSelect={(e)=>{setCurrentPose(e)}}>
          {exercise_pack.map((exercise)=>
          <Dropdown.Item eventKey={exercise.name}>{exercise.name}</Dropdown.Item>
          )}
        
        </DropdownButton>
        
        </>    
          
     
    )
}
 