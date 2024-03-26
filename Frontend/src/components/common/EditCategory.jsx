import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from "react-hot-toast"
const EditCategory = () => {

    const [category,setCategory] = useState('');
     const {name} = useParams();
     const navigate = useNavigate();

const handleSubmit =async (e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("updatedname",category);
    
 await axios.put(`http://localhost:3000/auth/editCategory/${name}`,formData)
 .then((result) => {
  console.log(result)
    if (result.data.success) {      
      toast.success("Category Updated");
      navigate("/dashboard/category");
    } else {
      toast.error("Can't update category");
    }
  })
  .catch((error) => {
    toast.error(error);
  });
}


  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="category"><strong>Category:</strong></label>
                <input type="text" defaultValue={name} name='category' placeholder='Enter Category'
                 onChange={(e) => setCategory(e.target.value)} className='form-control rounded-0'/>
            </div>
            <button  className='btn btn-success w-100 rounded-0 mb-2'>Edit Category</button>
        </form>
    </div>
</div>
  )
}

export default EditCategory
