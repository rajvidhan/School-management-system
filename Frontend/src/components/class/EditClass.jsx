import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {toast} from "react-hot-toast"



const EditClass = () => {
    const navigate = useNavigate();
const id = useParams().id;
 const [updateData, setupdateData] = useState({
        classname: "",
        classteacher: "",
        board: "",
        fee:""
      });

const handleSubmit = async(e)=>{
    e.preventDefault();
   
     const toastID = toast.loading("Updating...");
     await axios.put(`http://localhost:3000/auth/edit_class/${id}`,updateData)
     .then(result=>{
      toast.dismiss(toastID)
      toast.success("Update Successfully");
      navigate("/dashboard/classes");    
     })
     .catch(err=>{
      console.log(err);
      toast.error("Edit Failed")
     })

    
}


    const [teachers,setTeachers] = useState([])
    useEffect(()=>{
      const fetchEmployees = ()=>{
        axios.get("http://localhost:3000/auth/getEmpoyees")
        .then(result=>{
          if(result.data.success){  
                     
            setTeachers(result.data.data);
  
            }else{
              toast.error("Can't fetch Teachers")
            } 
      })
      .catch(error=>{
          toast.error("Can't fetch Teachers")
      })
      }
  
      fetchEmployees();
    },[])




useEffect(()=>{
    const fetchclass = async()=>{
        await axios.get(`http://localhost:3000/auth/getclass/${"*"}/${"id"}/${id}`,)
        .then(result=>{
          console.log("the result",result)
          setupdateData({
            ...updateData,
            classname:result.data.data[0].name,
            fee:result.data.data[0].fee,
            classteacher:result.data.data[0].classteacher,
            board:result.data.data[0].boardClass
          })
        })
    }
    fetchclass();
},[]);




  return (
    <>
    <div className="d-flex justify-content-center align-items-center h-75">
      {/* form Section  */}
      <div className="p-3  rounded w-25 border">
        <h2>Edit Class</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="classname">
              <strong>Class:</strong>
            </label>
            <input
              type="text"
              value={updateData.classname}
              onChange={(e)=>setupdateData({...updateData,classname:e.target.value})}
              name="classname"
              placeholder="Enter Class"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="classname">
              <strong>Fee:</strong>
            </label>
            <input
              type="text"
              value={updateData.fee}
              onChange={(e)=>setupdateData({...updateData,fee:e.target.value})}
              name="fee"
              placeholder="Enter Fee"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="teachername">
              <strong>Class Teacher:</strong>
            </label>
            <select value={updateData.classteacher}
          onChange={(e)=>setupdateData({...updateData,classteacher:e.target.value})}
          className="form-select mb-4">
            <option value="" disabled>
              Choose a teacher
            </option>
            {
              teachers.map((t)=>(
                <option key={t.id} value={t.name}>{t.name}</option>
              ))
            }
          </select>
          </div>
          <select value={updateData.board}
          onChange={(e)=>setupdateData({...updateData,board:e.target.value})}
          className="form-select mb-4">
            <option value="" disabled>
              Choose a type
            </option>
            <option value={"board"}>Board</option>
            <option value={"non-board"}>Non-Board</option>
          </select>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Edit Class
          </button>
        </form>
      </div>
    </div>
    </>)

}

export default EditClass
