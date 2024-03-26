import axios from 'axios';
import React from 'react'
import { toast } from "react-hot-toast";

import { useNavigate, useParams } from 'react-router-dom'

const DeleteEmploy = () => {

const navigate = useNavigate(); 

const {id} = useParams();


const handleDelete =async ()=>{
 
    const toastId = toast.loading("Deleting...")

    await axios
    .delete(`http://localhost:3000/auth/deleteEmployee/${id}`)
    .then((result) => {
      if (result.data.success) {
        toast.dismiss(toastId);
        navigate("/dashboard/employee")
        toast.success("Employee Deleted")
      } else {
        toast.error("Can't delete employee");
      }
    })
    .catch((error) => {
      toast.error("Can't delete employee");
    });



}

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <h2>Delete Employee</h2>
        <div>
        <h4>Are you Sure??</h4>
     <div className=" mt-4 d-flex gap-4">
     <button type="button" className="btn btn-primary" onClick={() => {navigate('/dashboard/employee')}}>
            No
    </button>
    <button type="button"  onClick={()=>handleDelete()} className="btn btn-danger" >
            Yes I'am
          </button>
     </div>
        </div>
    </div>
</div>
  )
}

export default DeleteEmploy
