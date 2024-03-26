import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {toast} from "react-hot-toast"
const WorkCategory = () => {
    
const [category,setCategory] = useState('');
const navigate = useNavigate();
const [categories , setCategories] = useState([])
useEffect(()=>{
    const fetchCategory =async ()=>{
      await axios.get("http://localhost:3000/admin/getworkercategory")
      .then(result=>{
        if(result.data.success){
           setCategories(result.data.data)
          }else{
            toast.error("Can't fetch Category")
          } 
         
    })
    .catch(error=>{
        toast.error("Can't fetch Category")
    })
    }
    fetchCategory();
},[])

console.log(categories)
const handleSubmit = async (e)=>{
    e.preventDefault();
    await axios.post(`http://localhost:3000/admin/addworkcategory/${category}`)
    .then(result=>{
      if(result.data.success){
          toast.success("Category Added");
          navigate("/dashboard");  
        }else{
          toast.error("Can't Add Category")
        } 
  })
  .catch(error=>{
      toast.error("Can't Add Category")
  })
    }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center h-75'>
    <div className='p-3 rounded w-25 border'>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="category"><strong>Category:</strong></label>
                <input type="text" name='category' placeholder='Enter Category'
                 onChange={(e) => setCategory(e.target.value)} className='form-control rounded-0'/>
            </div>
            <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
        </form>
    </div>
    {
      categories.length > 1 && (
        <table class="table">
  <thead>
    <tr>
      <th scope="col">name</th>
     
      
    </tr>
  </thead>
  <tbody>
    {
      categories.map((c,index)=>(
        <tr key={index}>
          <td>{c.name}</td>
         
        </tr>
      ))
    }
    
    
  </tbody>
</table>
      )
    }
</div>
  )
}

export default WorkCategory
