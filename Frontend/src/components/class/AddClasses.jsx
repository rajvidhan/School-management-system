import React, { useEffect, useState } from "react";
import axios from "axios"
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
const AddClasses = () => {
  const [classData, setClassdata] = useState({
    classname: "",
    fee:"",
    classteacher: "",
    board: "",
  });
  
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

const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post(`http://localhost:3000/auth/add_class`,classData)
    .then(result=>{
      if(result.data.success){              
       toast.success("Class Added");
       navigate("/dashboard/classes")
        }else{
          toast.error("Can't Add Class")
        } 
  })
  .catch(error=>{
      toast.error("Can't Add Class")
  })
  
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      {/* form Section  */}
      <div className="p-3  rounded w-25 border">
        <h2>Add Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="classname">
              <strong>Class:</strong>
            </label>
            <input
              type="text"
              onChange={(e)=>setClassdata({...classData,classname:e.target.value})}
              name="classname"
              placeholder="Enter Class"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fee">
              <strong>Fee:</strong>
            </label>
            <input
              type="text"
              onChange={(e)=>setClassdata({...classData,fee:e.target.value})}
              name="fee"
              placeholder="Enter Fee"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="teachername">
              <strong>Class Teacher:</strong>
            </label>
            <select defaultValue={""}
          onChange={(e)=>setClassdata({...classData,classteacher:e.target.value})}
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
          <select defaultValue={""}
          onChange={(e)=>setClassdata({...classData,board:e.target.value})}
          className="form-select mb-4">
            <option value="" disabled>
              Choose a type
            </option>
            <option value={"board"}>Board</option>
            <option value={"non-board"}>Non-Board</option>
          </select>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClasses;
