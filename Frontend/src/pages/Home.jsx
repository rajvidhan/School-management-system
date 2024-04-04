import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";
import { AdminChart } from "./AdminChart";
const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [adminCount, settotalAdmin] = useState(0);
  const [EmployeeCount, setEmployeeCount] = useState(0);
  const [salaryCount, setSalary] = useState(0);
  const [student, setStudent] = useState([]);
  const [Admins, setAdmins] = useState([]);
  const [Employes, setEmployees] = useState([]);

  useEffect(() => {
    const totalAdmin = async () => {
      await axios
        .get(`http://localhost:3000/auth/admin_count`)
        .then((result) => {
          setAdmins(result.data.data);
          settotalAdmin(result.data.data.length);
        });
    };
    const totalEmployee = async () => {
      await axios
        .get(`http://localhost:3000/auth/employee_count`)
        .then((result) => {
          setEmployees(result.data.data);
          setEmployeeCount(result.data.data.length);
        });
    };
    const totalSalary = async () => {
      await axios
        .get(`http://localhost:3000/auth/salary_count`)
        .then((result) => {
          console.log(result);
          setSalary(result.data.data[0].salary);
        });
    };
    const totalStudent = async () => {
      await axios.get(`http://localhost:3000/auth/students`).then((result) => {
        setStudent(result.data.data);
      });
    };
    totalStudent();
    totalSalary();
    totalEmployee();
    totalAdmin();
  }, []);

  return (
    <div>
      <div className="p-3 d-flex  justify-content-evenly mt-3">
      <AdminChart employees={Employes} />
        <div class="card text-white bg-dark mb-3">
          <div class="card-header">Admin's</div>
          <div class="card-body text-dark">
            <h5 class="card-title text-white">Total</h5>
            <h4 class="text-white">{adminCount}</h4>
          </div>
        </div>
        <div class="card text-white bg-info mb-3">
          <div class=" text-white card-header">Employee</div>
          <div class=" text-white card-body text-dark">
            <h5 class="card-title">Total</h5>
            <h4>{EmployeeCount}</h4>
          </div>
        </div>

        <div class="card text-white bg-danger mb-3">
          <div class=" text-white card-header">Salary</div>
          <div class=" text-white card-body text-dark">
            <h5 class="card-title text-white">Total</h5>
            <h4 class="text-white">{salaryCount}</h4>
          </div>
        </div>

        <div class="card text-white bg-success mb-3">
          <div class="card-header text-white">Student's</div>
          <div class="card-body text-white text-dark">
            <h5 class="card-title">Total</h5>
            <h4>{student.length}</h4>
          </div>
        </div>
      </div>

      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Admins.map((admin) => (
              <tr>
                <td>{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     

      <div className="mt-4 px-5 pt-3">
        <h3>List of Employees</h3>
        <table class="table table-light table-hover">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {Employes.map((e) => (
              <tr>
                <td>
                  <img src={e.image} className="employee_image" />
                </td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.position}</td>
                <td>{e.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
