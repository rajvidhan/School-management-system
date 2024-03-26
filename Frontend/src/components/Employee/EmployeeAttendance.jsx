import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const EmployeeAttendance = () => {
const navigate =useNavigate();
const name = useParams().ename;
const position = useParams().eposition;

const timestamp = new Date();

// Getting the date
const year = timestamp.getFullYear();
const month = timestamp.getMonth() + 1; // Months are zero-based, so we add 1
const date = timestamp.getDate();

const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
  date < 10 ? "0" + date : date
}`;

const [present, setpresent] = useState(null);
const [Month,setmonth]= useState('');
const Year =formattedDate.split("-");


const handlesave = async (e) => {
  e.preventDefault();

  await axios
    .post(
      `http://localhost:3000/admin/addpresentEm/${name}/${position}/${present}/${formattedDate}/${Month}/${Year[0]}`
    )
    .then((result) => {
      console.log(result);
      if (result.data.success) {
        
        toast.success("Attendeance is Marked");
        navigate("/dashboard/employee")
      }
    })
    .catch((err) => {
      toast.error(err);
    });
};

  return (
    <div className="px-5 mt-3">
      <div class="card">
        <div class="card-header">Attendance</div>
        <div class="card-body">
          <h5 class="card-title">Position {position}</h5>
          <h6 class="card-text">Employee Name:- {name}</h6>
          <h5>Date:-{formattedDate}</h5>
        </div>
      </div>
      
      <select  onChange={(e) => setmonth(e.target.value)} class="form-select form-select-lg mb-3"
        aria-label="Large select example">
           <option selected>Select current month</option>
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

      <select
        class="form-select form-select-lg mb-3"
        aria-label="Large select example"
        onChange={(e) => setpresent(e.target.value)}
      >
        <option selected>Open this to mark present and absent</option>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
       
      </select>
      <button
        onClick={handlesave}
        type="button"
        class="btn btn-outline-success"
      >
        Save
      </button>
    </div>
  )
}

export default EmployeeAttendance
