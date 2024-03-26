import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const AttendanceSheetEm = () => {

  
const timestamp = new Date();

// Getting the date
const year = timestamp.getFullYear();
const month = timestamp.getMonth() + 1; // Months are zero-based, so we add 1
const date = timestamp.getDate();

const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
  date < 10 ? "0" + date : date
}`;


 const Ename = useParams().ename;
 const position =useParams().eposition;
 const [Month, setmonth] = useState("");
 const [Year,setyear] = useState('');

 const [sheetData, setSheetData] = useState([]);
let currentyear = formattedDate.split("-");
 let Years = [];
 for(let i=0;i<10;i++){
  Years.push(currentyear[0]-i);
 }




 const fetchsheet = async (e) => {
  e.preventDefault();
  await axios
    .get(`http://localhost:3000/admin/attendancesheetEm/${Ename}/${position}/${Month}/${Year}`)
    .then((result) => {
      if (result.data.success) {
        setSheetData(result.data.data);
      } else {
        toast.error("Can't fetch sheet");
      }
    })
    .catch((error) => {
      toast.error("Can't fetch sheet");
    });
};


   
    
  return (
    <div class="card" >
    <div class="card-body">
      <h5 class="card-title">Attendance mark for today</h5>
      <h6>Employee name:- {Ename}</h6>
      <h6>Employee Role:- {position}</h6>
      <Link to={`/dashboard/eattendance/${Ename}/${position}`}  class="btn mt-4 btn-light">Mark Attendance</Link>
     <h6 className='mt-4'>See Sheet of attendance accourding to month and year</h6>
     <div className='d-flex flex-column'>
     <select onChange={(e) => setyear(e.target.value)} class="form-select form-select-lg mb-3" id="yearInput" name="yearInput">
     <option selected>Select Year</option>
    {
      Years.map((y,index)=>{
       return <option value={y} key={index}>{y}</option>
      })
    }
  
</select>
     <select  onChange={(e) => setmonth(e.target.value)} class="form-select form-select-lg mb-3"
        aria-label="Large select example">
           <option selected>Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="Octomber">Octomber</option>
          <option value="November">November</option>
          <option value="December">December</option>

        </select>
     <button class="btn btn-warning ml-2" onClick={(e) => fetchsheet(e)}>
            Search
        </button>
     </div>
    </div>
    {sheetData.length > 0 ? (
        <div class="card mt-5">
          <div class="card-header">{Ename}</div>
          <div class="card-body">
            <h5>Position {position}</h5>
           
            <h6 class="card-text">{Ename} Attendance- </h6>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">gender</th>
                  <th scope="col">email</th>
                  <th scope="col">status</th>
                  <th scope="col">date</th>
                  <th scope="col">month</th>
                </tr>
              </thead>
              <tbody>
                {sheetData.map((E, index) => (
                  <tr key={index}>
                    <td>{E.name}</td>
                    <td>{E.gender}</td>
                    <td>
                    {E.email}
                    </td>
                    <td>{E.status}</td>
                    <td>{E.date}</td>
                    <td>{E.month}</td>

                  </tr>
                ))}
              </tbody>
              {/* <button onClick={()=>handleDownload()} class="btn btn-dark">Download Sheet</button> */}
            </table>
          </div>
          
        </div>
      ) : (
        <div>select year and month</div>
      )}
  </div>
  )
}

export default AttendanceSheetEm
