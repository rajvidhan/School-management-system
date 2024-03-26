import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from "react-hot-toast"
const DeleteCetagory = () => {
const {id} = useParams();
const {classname} = useParams();
const navigate = useNavigate();



const handleDelete=async (e)=>{
  e.preventDefault();
   await axios.delete(`http://localhost:3000/auth/deleteClass/${id}/${classname}`)
   .then((result) => {
    if (result.data.success){      
      toast.success("Class deleted");
      navigate("/dashboard/classes");
    } else {     
      toast.error("Can't delete class");
    }
  })
  .catch((error) => {

    toast.error(error);
  });
}



  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <h2>Delete Class</h2>
        <div>
        <h4>Are you Sure??</h4>
        <p>If you delete this class,the all teacher and student data of this class are also deleted.</p>
     <div className=" mt-4 d-flex gap-4">
     <button type="button" className="btn btn-primary" onClick={() => {navigate('/dashboard/classes')}}>
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
