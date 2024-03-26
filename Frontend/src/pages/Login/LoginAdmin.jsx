import React, { useState } from "react";
import "../style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {setToken} from "../../slice/authSlice"
import {setUser} from "../../slice/profileSlice"

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  axios.defaults.withCredentials = true;
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3000/auth/adminlogin", values)
      .then((result) => {
        if (result.data.success) {
          toast.success("Login Successfull");
         
          dispatch(setToken(result.data.data));
          dispatch(setUser(result.data.user));
          console.log("jhgfhj",result.data.user)
          localStorage.setItem("token", JSON.stringify(result.data.data));
          localStorage.setItem("user", JSON.stringify(result.data.user));
          navigate("/dashboard");
        } else {
          toast.error("Email and Password is incorrect");
        }
      })
      .catch((error) => toast.error(error));
  };

  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3  rounded w-25 border loginForm">
        <h2 className="text-3xl font-bold mb-4">Login Page</h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              type="email"
              name="email"
              autoComplete="off"
              className="form-control rounded-none"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              type="password"
              name="password"
              className="form-control rounded-none"
              placeholder="Enter Your Password"
            />
          </div>
          <button className="btn btn-success w-100 mb-2 rounded-0">
            Log in
          </button>
          <div className="mb-1">
            <input type="checkbox" className="mx-3" name="tick" id="tick" />
            <label htmlFor="password">
              You are agree with terms & conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
