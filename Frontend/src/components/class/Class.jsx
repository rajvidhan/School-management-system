import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const Class = () => {

const [classes,setClasses] = useState([])

useEffect(()=>{

  const fetchClasses = async ()=>{
    await axios.get(`http://localhost:3000/auth/All_classes`)
    .then(result=>{
      if(result.data.success){
        setClasses(result.data.data)
      }
    })
    .catch(err=>{
      console.log(err)
    })    
  }
  fetchClasses();
  
},[])



  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center ">
        <h3>Classes List</h3>
      </div>
     <div className="d-flex  justify-content-evenly">
     <Link className="btn btn-success" to={"/dashboard/add-class"}>
        Add Class
      </Link>
      <Link to={"/enroll-student"} className="btn btn-success">Enroll A Student</Link>
     </div>
      <div className="mt-3">
        <table class="table table-light table-hover">
          <thead>
            <tr>
              <th>Class</th>
             
              <th>Class Teacher</th>
              <th>Board/Non-Board</th>
             
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {
                        classes.map(C => (
                            <tr>
                              <td>{C.name}</td>
                              <td>{C.classteacher}</td>
                              <td>{C.boardClass}</td>
                           
                              <td>
                                <Link to={`/dashboard/edit_class/${C.id}`} className="btn btn-warning">Edit</Link>
                              </td>
                              <td>
                                <Link to={`/dashboard/delete-class/${C.id}/${C.name}`} className="btn btn-danger">Delete</Link>
                              </td>
                             
                            </tr>
                        ))
                    }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Class;
