import React from 'react'

export default function DropDown({ exercise_pack, currentPose, setCurrentPose }) {
   const poseList=exercise_pack.map((exercise)=>exercise.name)
return (
        <div
        className='dropdown dropdown-container'
         
      >
        <button 
            className="btn btn-secondary dropdown-toggle"
            type='button'
            data-bs-toggle="dropdown"
            id="pose-dropdown-btn"
            aria-expanded="false"
        >{currentPose}
        </button>
        <ul class="dropdown-menu dropdown-custom-menu" aria-labelledby="dropdownMenuButton1">
            {poseList.map((pose) => (
                <li onClick={() => setCurrentPose(pose)}>
                    <div class="dropdown-item-container">
                        <p className="dropdown-item-1">{pose}</p>
                        
                    </div>
                </li>
            ))}
            
        </ul>
              
          
      </div>
    )
}
 