import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Students = () => {
  const [searchClass, setSearchClass] = useState(null);

  const [Array,SetArray] = useState([])
  let classes = [];

  const [showTemplate, setShowTemplate] = useState(false);

  const [students, setStudents] = useState([]);
  const [avgScore, setAvgScore] = useState(null);

 

  // fetch the classes
  useEffect(() => {
    const fetchClass = async () => {
      await axios
        .get(`http://localhost:3000/auth/getClasses`)
        .then((result) => {
          
          SetArray(result.data.data)        
         
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchClass();
  }, []);
for(let i=0;i<Array.length;i++){
  classes.push(Array[i].name)
}







  //   avg score
  useEffect(() => {
    const avgSc = async () => {
      await axios
        .get(`http://localhost:3000/auth/avgscore/${searchClass}`)
        .then((result) => {
          
          setAvgScore(result.data.data[0].average_score);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    avgSc();
  }, [students]);





  // handle search operation 
  const handleSubmit = async () => {
    if (classes.includes(searchClass)) {
      await axios
        .get(`http://localhost:3000/auth/getStudents/${searchClass}`)
        .then((result) => {
          setStudents(result.data.data);
          setShowTemplate(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("ha bhai class hai",classes);
      toast.error("Sorry,This Class Does Not Exist Brother");
    }
  };




  // get the current date 
  const timestamp = new Date();

  // Getting the date
  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1; // Months are zero-based, so we add 1
  const date = timestamp.getDate();

  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`;






  // find students who are present today 
  const [StudentPT,setStudentsPT] = useState([]);
 let todaypresentStudents = [];
  const presentStudents = async ()=>{
    await axios.get(`http://localhost:3000/auth/Pstudents/${formattedDate}/${searchClass}`)
    .then(result=>{
      console.log("result hai ",result)
        setStudentsPT(result.data.data);
    })
  }
  for(let i=0;i<StudentPT.length;i++){
    todaypresentStudents.push(StudentPT[i].studentname)
  }  
  useEffect(()=>{
    presentStudents();
  },[searchClass])




const navigate = useNavigate();


  return (
    <div className="px-5 mt-3 p-3 ">
      <div className="d-flex justify-content-center ">
        <h3>Student Detail Page</h3>
      </div>

      <h4>Search Students Through Class Number</h4>

      <div className="mt-10 d-flex">
        <input
          type="text"
          className="form-control rounded-0"
          id="inputName"
          placeholder="Enter Name as 'Xth'"
          onChange={(e) => setSearchClass(e.target.value)}
        />
        <button onClick={() => handleSubmit()} className="btn btn-success">
          Search
        </button>
      </div>

      {showTemplate && students.length >= 1 && (
        <div>
          <div class="card mt-5">
            <div class="card-header">
              <Link to={`/dashboard/attendancesheet/${searchClass}`} class="btn btn-light">Attendance Sheet</Link>
            </div>
            <div class="card-body">
              <h5 class="card-title">Class{" "}{searchClass}</h5>
              <h5>Date:-{formattedDate}</h5>
              <h6 class="card-text">Student Name Who's Present marked:- </h6>
              <ol class="list-group list-group-numbered">
              {
                todaypresentStudents.map((S,index)=>(                
                  <li key={index} class="list-group-item">{S}</li>              
                ))
              }
               </ol>
            </div>
          </div>
          <div className="py-5 d-flex justify-content-between mt-3">
            <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
              <div className="text-center pb-1">
                <h4>Total Student's</h4>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h5>Total: </h5>
                <h5>{students.length}</h5>
              </div>
            </div>

            <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
              <div className="text-center pb-1">
                <h4>Total Present Student Today</h4>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
               <h4>{todaypresentStudents.length}</h4>
              </div>
            </div>

            <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
              <div className="text-center pb-1">
                <h4>In Prev. Class Avg Score</h4>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h5>Score: </h5>
                <h5>{avgScore}%</h5>
              </div>
            </div>
          </div>
          <h3 className="m-5">Total Students list of {searchClass} Class:-</h3>
          <table class="table table-light table-hover">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Image</th>
                <th>Mother's Name </th>
                <th>Father's Name</th>
                <th>Contact No.</th>
                <th>Home Address</th>
                <th>Prev. Class Score</th>
                <th>Manage Attendance</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr>
                  <td>{s.name}</td>
                  <td>
                    <img src={s.image} className="employee_image" />
                  </td>
                  <td>{s.MotherName}</td>
                  <td>{s.FatherName}</td>
                  <td>{s.FatherContact}</td>
                  <td>{s.address}</td>
                  <td>{s.PrevScore}%</td>
                  <td>
                   
                      {
                        todaypresentStudents.includes(s.name) ? (
                          <Link onClick={()=>toast.success("Already Marked Sir")}   className="btn btn-success">Marked</Link>
                        ) :(
                          <Link  to={`/dashboard/studenAttendance/${searchClass}/${s.name}`} class="btn btn-light">Mark Attendance</Link>
                        )
                      }
                   
                  </td>
                  <td>
                    <button  onClick={()=>navigate(`/dashboard/edit-student/${s.id}/${s.name}`)} className="btn btn-warning">Edit</button>
                  </td>
                  <td>
                    {" "}
                    <button onClick={()=>navigate(`/dashboard/delete-student/${s.id}/${s.name}`)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showTemplate && students.length == 0 && (
        <div className="d-flex p-3 mt-3 justify-content-center ">
          <h4 className="text-danger">
            Sorry!,No Student's are enrolled in this class yet.
          </h4>
        </div>
      )}
    </div>
  );
};

export default Students;
