import React from 'react'
import rip from "../../assets/rip.jpg"
import './FourOhFour.css'
export default function FourOhFour() {
  return (
    <div className='FourOhFour'>
     <img src={rip} alt="" />
      
    
    <div className="displaypara">
      <p>Great shot, kid. That was one in a million.</p>
      <p>Let's get you <a href="/dashboard">back.</a>
      </p>
    </div>
    </div>
  )
}
