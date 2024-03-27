import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginAdmin from "./pages/Login/LoginAdmin";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "../src/pages/PrivateRoute";
import Home from "./pages/Home";
import Category from "./components/category/Category";
import Employes from "./components/Employee/Employes";
import AddCategory from "./components/category/AddCategory";
import AddEmploy from "./components/Employee/AddEmploy";
import EditEmploy from "./components/Employee/EditEmploy";
import Start from "./pages/Start";
import DeleteEmploy from "./components/Employee/DeleteEmploy";
import DeleteCetagory from "./components/common/DeleteCetagory";
import EditCategory from "./components/common/EditCategory";
import AddClasses from "./components/class/AddClasses";
import Class from "./components/class/Class";
import AddStudent from "./components/Students/AddStudent";
import Students from "./components/Students/Students";
import EditClass from "./components/class/EditClass";
import Studentsattend from "./components/Students/Studentsattend";
import DeleteClass from "./components/class/DeleteClass";
import DeleteStudent from "./components/Students/DeleteStudent";
import EditStudent from "./components/Students/EditStudent";
import LoginEmployee from "./pages/Login/LoginEmployee";
import LoginStudent from "./pages/Login/LoginStudent";
import { useSelector } from "react-redux";

import WorkCategory from "./components/worker/WorkCategory";
import AttendanceSheet from "./components/Students/AttendanceSheet";
import EmployeeAttendance from "./components/Employee/EmployeeAttendance";
import AttendanceSheetEm from "./components/Employee/AttendanceSheetEm";
import Account from "./pages/Account";
import Success from "./pages/Success";
import Cancle from "./pages/Cancle";
import BasicInfo from "./pages/BasicInfo";
import Notification from "./components/notifications/Notification";
const App = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/success" element={<Success />} />
      <Route path="/cancle" element={<Cancle />} />
      {/* login pages  */}
      {!localStorage.getItem("token") ? (
        <Route path="/" element={<Start />} />
      ) : (
       <>
       <Route path="/" element={<Dashboard />}  />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {user && user.role == "teacher" ? (
        <Route path="/dashboard" element={<BasicInfo />} />
      ) : null}
          {user && user.role == "admin" ? (
            <>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/dashboard/employee" element={<Employes />} />
              <Route path="/dashboard/category" element={<Category />} />
              <Route path="/dashboard/notifications" element={<Notification />} />
              <Route path="/dashboard/add-class" element={<AddClasses />} />
              <Route path="/dashboard/classes" element={<Class />} />
              <Route path="/dashboard/edit_class/:id" element={<EditClass />} />

              <Route
                path="/dashboard/studenAttendance/:classname/:studentname"
                element={<Studentsattend />}
              />

              <Route path="/dashboard/students" element={<Students />} />

              <Route path="/dashboard/add-category" element={<AddCategory />} />
              <Route path="/dashboard/add-employ" element={<AddEmploy />} />
              <Route
                path="/dashboard/edit-employee/:id"
                element={<EditEmploy />}
              />
              <Route
                path="/dashboard/delete-employee/:id"
                element={<DeleteEmploy />}
              />
              <Route
                path="/dashboard/delete-class/:id/:classname"
                element={<DeleteClass />}
              />

              <Route
                path="/dashboard/delete-category/:id"
                element={<DeleteCetagory />}
              />
              <Route
                path="/dashboard/edit-category/:name"
                element={<EditCategory />}
              />

              <Route
                path="/dashboard/delete-student/:id/:name"
                element={<DeleteStudent />}
              />
              <Route
                path="/dashboard/edit-student/:id/:name"
                element={<EditStudent />}
              />

              <Route
                path={`/dashboard/eattendance/:ename/:eposition`}
                element={<EmployeeAttendance />}
              />
              <Route
                path={`/dashboard/Ematendancesheet/:eid/:ename/:eposition`}
                element={<AttendanceSheetEm />}
              />
              <Route
                path="/dashboard/attendancesheet/:classname"
                element={<AttendanceSheet />}
              />
              <Route path="/dashboard/accounts" element={<Account />} />
              {/* worker related  */}
              <Route
                path="/dashboard/worker-category"
                element={<WorkCategory />}
              />
            </>
          ) : null}
        </Route>
       </>
      )}



      {!localStorage.getItem("token") ? (
        <>
          <Route path="/adminlogin" element={<LoginAdmin />} />
          <Route path="/employee_login" element={<LoginEmployee />} />
          <Route path="/student_login" element={<LoginStudent />} />
        </>
      ) : null}

      {user && user.role == "admin" ? (
        <Route path="/enroll-student" element={<AddStudent />} />
      ) : null}

      {/* dashboard related routes  */}
    </Routes>
  );
};

export default App;
