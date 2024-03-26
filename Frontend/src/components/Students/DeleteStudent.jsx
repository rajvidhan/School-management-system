import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from "react-hot-toast"
const DeleteCetagory = () => {
const {id} = useParams();
const {name} = useParams();
const navigate = useNavigate();



const handleDelete=async (e)=>{
  e.preventDefault();
   await axios.delete(`http://localhost:3000/auth/deleteStudent/${id}/${name}`)
   .then((result) => {
    if (result.data.success){      
      toast.success("Student deleted");
      navigate("/dashboard/students");
    } else {     
      toast.error("Can't delete student");
    }
  })
  .catch((error) => {

    toast.error(error);
  });
}



  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <h2>Delete Student</h2>
        <div>
        <h4>Are you Sure??</h4>
        <p>If you delete this student.</p>
     <div className=" mt-4 d-flex gap-4">
     <button type="button" className="btn btn-primary" onClick={() => {navigate('/dashboard/students')}}>
            No
    </button>
    <button type="button" onClick={(e)=>handleDelete(e)}   className="btn btn-danger" >
            Yes I'am
          </button>   
     </div>
        </div>
    </div>
</div>
  )
}

export default DeleteCetagory
