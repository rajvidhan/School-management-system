import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employes = () => {

  const [Employees,setEmployess] = useState([])

  useEffect(()=>{
    const fetchEmployees = ()=>{
      axios.get("http://localhost:3000/auth/getEmpoyees")
      .then(result=>{
        if(result.data.success){              
          setEmployess(result.data.data);
          }else{
            toast.error("Can't fetch Employee")
          } 
    })
    .catch(error=>{
        toast.error("Can't fetch Employee")
    })
    }

    fetchEmployees();
  },[])







  return (
    <div className="px-5 mt-3 ">
      <div className="d-flex justify-content-center ">
        <h3>Teachers List</h3>
      </div>
      <Link className="btn btn-success" to={"/dashboard/add-Employ"}>
        Add Employee
      </Link>
      <div className='mt-3'>
            <table class="table table-light table-hover">
                <thead>
                    <tr >
                        <th>Profile Image</th>
                        <th>Name</th>                       
                        <th>Email</th>                       
                        <th>Address</th>
                        <th>Salary</th> 
                        <th>Position</th> 
                        <th>Join Date</th> 
                        <th>Higher Qualification</th> 

                        <th>Attendance</th> 

                        <th>Edit</th> 
                        <th>Delete</th>                             
                       
                    </tr>
                </thead>
                <tbody >
                    {
                        Employees.map(E => (
                            <tr className="items-center flex">
                                <td>
                                  <img className="employee_image" src={E.image}  />
                                </td>
                                <td>{E.name}</td>
                                <td>{E.email}</td>
                                <td>{E.address}</td>
                                <td>{E.salary}</td>
                                <td>{E.position}</td>
                                <td>{E.hiringdate}</td>
                                <td>{E.Higherqualification}</td>
                                <td>
                                  <Link to={`/dashboard/Ematendancesheet/${E.id}/${E.name}/${E.position}`} className="btn btn-warning btn-sm me-2">
                                   Attendance
                                  </Link> </td>
                                <td>
                                  <Link to={`/dashboard/edit-employee/${E.id}`} className="btn btn-info btn-sm me-2">
                                    Edit
                                  </Link> </td>
                                  <td> <Link to={`/dashboard/delete-employee/${E.id}`} className="btn btn-danger btn-sm">
                                    Delete
                                  </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        <table class="table table-success table-striped">

</table>

    </div>
  );
};

export default Employes;
