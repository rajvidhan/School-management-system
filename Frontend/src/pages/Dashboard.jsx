import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { PiStudentFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../slice/authSlice";
import { setUser } from "../slice/profileSlice";
import { toast } from "react-hot-toast";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const handleLogOut = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Log Out Successfully");
    navigate("/");
  };
  const [showbtn,setShowbtn] =  useState(true);
console.log("hey brother ",showbtn)
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        {/* sidebar by bootstrap  */}
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Code With Vidhan
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {user.role == "admin" && (
                   <li className="w-100">
                   <Link
                     to="/dashboard"
                     className="nav-link text-white px-0 align-middle"
                   >
                     <i className="fs-4 bi-speedometer2 ms-2"></i>
                     <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                   </Link>
                 </li>
              )}
              {user.role == "admin" && (
                <li className="w-100">
                <Link
                  to="/dashboard/worker-category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    Worker category
                  </span>
                </Link>
              </li>
              )}
               {user.role == "admin" && (
                <li className="w-100">
                <Link
                  to="/dashboard/accounts"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="bi fs-4 ms-2 bi-wallet2"></i>
                 
                  <span className="ms-1 d-none d-sm-inline">
                    Account's
                  </span>
                </Link>
              </li>
              )}
           
              {user.role == "admin" && (
                <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Employee
                  </span>
                </Link>
              </li>
              )}
              
              {user.role == "admin" && (
                <li className="w-100">
                <Link
                  to="/dashboard/classes"
                  className="nav-link px-0 align-middle text-white"
                >
                  <SiGoogleclassroom className="fs-4 ms-2" />
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Classes
                  </span>
                </Link>
              </li>
              )}
              
              {user.role == "admin" && (
                <li className="w-100">
                  <Link
                    to="/dashboard/students"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <PiStudentFill className="fs-4 ms-2" />
                    <span className="ms-1 d-none d-sm-inline">
                      Manage Students
                    </span>
                  </Link>
                </li>
              )}
            {user.role == "admin" && (
                <li className="w-100">
                  <Link
                    to="/dashboard/notifications"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i class="bi fs-4 ms-2 bi-bell-fill"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Manage Notifications
                    </span>
                  </Link>
                </li>
              )}

              {user.role == "admin" && (
                <li className="w-100">
                  <Link
                    to="/dashboard/category"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-columns ms-2"></i>
                    <span className="ms-1 d-none d-sm-inline">Subjects</span>
                  </Link>
                </li>
              )}
              {user.role == "student" && (
                <li className="w-100">
                  <Link
                    to="/dashboard/category"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-columns ms-2"></i>
                    <span className="ms-1 d-none d-sm-inline">Notifications</span>
                  </Link>
                </li>
              )}
              {user.role == "student" && (
                <li className="w-100">
                  <Link
                    to="/dashboard/category"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-columns ms-2"></i>
                    <span className="ms-1 d-none d-sm-inline">Report Card</span>
                  </Link>
                </li>
              )}
              {user.role == "student" && (
                <li className="w-100">
                  <Link
                    to="/dashboard/category"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-columns ms-2"></i>
                    <span className="ms-1 d-none d-sm-inline">Fee Submission</span>
                  </Link>
                </li>
              )}
           
              <li className="w-100" onClick={handleLogOut}>
                <Link
                  onClick={() => handleLogOut()}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* outlets  */}

        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Emoployee Management System</h4>
          </div>
         {
           user.role === "student" && showbtn && (
            <button onClick={()=>{
              setShowbtn(false)
              navigate("/dashboard");
              
            }} class="btn m-5 btn-warning">Going To Dashboard</button>
          )
         }
         <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
