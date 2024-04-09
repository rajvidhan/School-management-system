import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const FeeSubmission = () => {
  const CurrentDate = new Date();
  const currentYear = CurrentDate.getFullYear();
  const { user } = useSelector((state) => state.profile);

  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(
          `http://localhost:3000/admin/feestudentdata/${currentYear}/${user.email}`
        )
        .then((result) => {
          setStudentData(result.data.data[0]);
        });
    };
    fetch();
  }, []);

  console.log(studentData)

  return (
    <div>
      {/* student info card  */}
      <div class="card m-5" >
        <img class="card-img-top employee_image2" src={studentData && studentData.image} alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{studentData && studentData.name}</h5>
          
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Class :- {studentData && studentData.class}</li>
          <li class="list-group-item">Total Fee :-  {studentData && studentData.fee}</li>
       
        </ul>
        <div class="card-body">

         <button class="btn btn-warning">Submit Your Fee</button> 
         
        </div>
      </div>
    </div>
  );
};

export default FeeSubmission;
