import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from "react-hot-toast"
const DeleteCetagory = () => {
const {id} = useParams();
const navigate = useNavigate();
const handleDelete=async (e)=>{
  e.preventDefault();
   await axios.delete(`http://localhost:3000/auth/deleteCategory/${id}`)
   .then((result) => {
    if (result.data.success) {
      
      toast.success("Category deleted");
      navigate("/dashboard/category");
    } else {
      
      toast.error("Can't delete category");
    }
  })
  .catch((error) => {

    toast.error(error);
  });
}



  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <h2>Delete category</h2>
        <div>
        <h4>Are you Sure??</h4>
        <p>If you delete this category ,the all employee of this category are also deleted.</p>
     <div className=" mt-4 d-flex gap-4">
     <button type="button" className="btn btn-primary" onClick={() => {navigate('/dashboard/category')}}>
            No
    </button>
    <button type="button"  onClick={(e)=>handleDelete(e)} className="btn btn-danger" >
            Yes I'am
          </button>   
     </div>
        </div>
    </div>
</div>
  )
}

export default DeleteCetagory
