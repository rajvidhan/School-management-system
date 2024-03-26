import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const Studentsattend = () => {
  const className = useParams().classname;
  const studentName = useParams().studentname;
  
 const navigate = useNavigate()
  const timestamp = new Date();

  // Getting the date
  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1; // Months are zero-based, so we add 1
  const date = timestamp.getDate();

  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`;

  const [present, setpresent] = useState(null);

  const handlesave = async (e) => {
    e.preventDefault();
  console.log("hello i am in save process")
    await axios
      .post(
        `http://localhost:3000/admin/addpresent/${className}/${studentName}/${present}/${formattedDate}`
      )
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          
          toast.success("Attendeance is Marked");
          navigate("/dashboard/students")
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
          <h5 class="card-title">Class {className}</h5>
          <h6 class="card-text">Student Name:- {studentName}</h6>
          <h5>Date:-{formattedDate}</h5>
        </div>
      </div>

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
  );
};

export default Studentsattend;
