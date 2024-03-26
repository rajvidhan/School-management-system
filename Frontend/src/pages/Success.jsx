import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate= useNavigate();
  return (
    <div class='bg-success  h-100'>
<div class="fd">
  
<div class="cardd">
    <div>
      <i class="checkmark hey">✓</i>
    </div>
      <h1 class="h1">Success</h1> 
      <p class="p">Your Payment is Successfull <br/>brother</p>
      <button onClick={()=>navigate("/dashboard")} class="btn btn-warning">Dashboard</button>
    </div>
</div>
    </div>
    
  )
}

export default Success
