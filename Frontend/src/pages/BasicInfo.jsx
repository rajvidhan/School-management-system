import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const BasicInfo = () => {
  const [EmInfo, setEmInfo] = useState(null);

  const { user } = useSelector((state) => state.profile);
  const userEmail = user.email;
  useEffect(() => {
    const fetchUserDetails = async () => {
      await axios
        .get(`http://localhost:3000/admin/emdetails/${userEmail}`)
        .then((result) => {
          setEmInfo(result.data.data[0]);
        });
    };
    fetchUserDetails();
  }, []);

  const timestamp = new Date();

  // Getting the date
  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1; // Months are zero-based, so we add 1
  const date = timestamp.getDate();

  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`;

  let currentyear = formattedDate.split("-");
  let Years = [];
  for (let i = 0; i < 10; i++) {
    Years.push(currentyear[0] - i);
  }
  const [Year, setyear] = useState(null);
  const [salaryData, setSalaryData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/admin/paydetailsem/${Year}/${EmInfo.name}`)
        .then((result) => {
          setSalaryData(result.data.data[0]);
        });
    };
    fetchData();
  }, [Year]);
  console.log("hello bhai", salaryData);
  console.log("hello bhai", Year);
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="m-3">
      <div class="card">
        <img
          class="card-img-top emimage"
          src={EmInfo && EmInfo.image}
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{EmInfo && EmInfo.name}</h5>
          <p class="card-text">{EmInfo && EmInfo.email}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Salary <strong>{EmInfo && EmInfo.salary}</strong>
          </li>
        </ul>
        <div class="card-body p-3 ">
          <button
            onClick={() => setShowInput(!showInput)}
            class="btn m-2 btn-warning"
          >
            Salary Status
          </button>
         
        </div>
        {showInput && (
          <>
          <select
            onChange={(e) => setyear(e.target.value)}
            class="form-select form-select-lg mb-3"
            id="yearInput"
            name="yearInput"
          >
            <option selected>Select Year</option>
            {Years.map((y, index) => {
              return (
                <option value={y} key={index}>
                  {y}
                </option>
              );
            })}
          </select>
       {
        salaryData &&    <table class="table table-bordered">
        <thead>
          <tr>
           
            <th scope="col">Name</th>

            <th scope="col">Total Salary</th>
            <th scope="col">PaymentBy</th>
            <th scope="col">Month</th>
            <th scope="col">Year</th>
            <th scope="col">Total Present</th>
            <th scope="col">Total Payment</th>
            <th scope="col">Payment Status</th>
          </tr>
        </thead>
        <tbody>
      
          <tr>
            
            <td >{salaryData.salaryholder}</td>
            <td >{salaryData.salary}</td>
            <td >{salaryData.salarygivenby}</td>
            <td >{salaryData.month}</td>
            <td >{salaryData.year}</td>
            <td >{salaryData.present}</td>
            <td >{salaryData.howmuch}</td>
            <td >{salaryData.paymentstatus}</td>
           
           
          </tr>
        </tbody>
      </table>
       }
          </>
        )}
      </div>
     
    </div>
  );
};

export default BasicInfo;
