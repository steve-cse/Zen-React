import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
export default function DropDown({ exercise_pack, currentPose, setCurrentPose }) {

return (<>
      
      <DropdownButton id="dropdown-basic-button" title={currentPose} onSelect={(e)=>{setCurrentPose(e)}}>
          {exercise_pack.map((exercise)=>
          <Dropdown.Item eventKey={exercise.name}>{exercise.name}</Dropdown.Item>
          )}
        
        </DropdownButton>
        {/* <ul class="dropdown-menu dropdown-custom-menu" aria-labelledby="dropdownMenuButton1">
            {poseList.map((pose) => (
                <li onClick={() => setCurrentPose(pose)}>
                    <div class="dropdown-item-container">
                        <p className="dropdown-item-1">{pose}</p>
                        
                    </div>
                </li>
            ))}
            
        </ul> */}
        </>    
          
     
    )
}
 