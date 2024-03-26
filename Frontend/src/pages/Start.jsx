import React from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {
    const navigate = useNavigate();
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3  rounded w-25 border loginForm'>
    <h2 className="text-center">Login As</h2>
    <div className="d-flex justify-content-evenly mt-5 mb-2">
          <button type="button" className="btn btn-primary" onClick={() => {navigate('/employee_login')}}>
            Employee
          </button>
          <button type="button" className="btn btn-success" onClick={() => {navigate('/adminlogin')}}>
            Admin
          </button>
          <button type="button" className="btn btn-warning" onClick={() => {navigate('/student_login')}}>
            Student
          </button>
        </div>
    </div>
  </div>
  )
}

export default Start
