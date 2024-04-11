import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {toast } from "react-hot-toast"
const StudentAccount = () => {

    // students section code

    const date = new Date();
    const currentYear = date.getFullYear();
    let Years = [];
    for (let i = 0; i < 10; i++) {
      Years.push(currentYear - i);
    }


    const [year,setyear] = useState(null);

  
  const [classesdata, setClassData] = useState(null);
  const [searchedClass,setSearchClass] = useState(null)
  const fetchClassData = async () => {
    await axios.get("http://localhost:3000/auth/All_classes").then((result) => {     
      setClassData(result.data.data);
    });
  };

  const [data,setData] = useState(null)
  const fetchData = async ()=>{


    // validation 

    if(year === null || searchedClass === null){
      return  toast.error("All fields are required..")
    }



    const formData = new FormData();  
    formData.append("class",searchedClass);
    formData.append("year",year);
    await axios
      .post("http://localhost:3000/admin/FeesubData", formData)
      .then((result) => {
        setData(result.data.data);          
      });
  }
  const [feenotsdata,setfeenotdata] = useState(null);
  const  datafetch =async ()=>{
    if(year === null || searchedClass === null){
      return  toast.error("All fields are required..")
    }
    const formData = new FormData();  
    formData.append("class",searchedClass);
    formData.append("year",year);
    await axios
      .post("http://localhost:3000/admin/feetnotsub", formData)
      .then((result) => {
        setfeenotdata(result.data.data)});
  }
 
  useEffect(()=>{
    fetchClassData()
  },[])
  

  

  return (
    <div>
    
        
            <select
              onChange={(e)=>setSearchClass(e.target.value)}
              class="form-select d-flex form-select-lg "
              aria-label="Large select example"
            >
              <option selected>Select A Class For Seen The Fee Status</option>
              {classesdata && classesdata.map((c, i) => (
                <option key={i} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

           <div className='d-flex flex-column m-5 '>
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

                <button onClick={()=>{
                  datafetch();
                  fetchData();
                }} class="btn  btn-primary">Search</button>
           </div>
        
        {
          data &&data.length>0 ? (
            <>
            <h4 className='text-success'>Students who submitted fee</h4>
            <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Fix Fee</th>
      <th scope="col">Paid Amount</th>
      <th scope="col">Payment Date</th>
      <th scope="col">Pay Status</th>
    </tr>
  </thead>
  <tbody>
   
    {
      data.map((data,i)=>(
        <tr key={i}>
      
      <td>{data.name}</td>
      <td>{data.fixfee}</td>
      <td>{data.howmuch}</td>
      <td>{data.date}</td>
      <td>{data.status}</td>
    </tr>
      ))
    }
  </tbody>
</table>
<h4 className='text-warning'>Students who not submit fee yet (3joins)</h4>
<table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Father Contact</th>
      <th scope="col">Total Fee</th>
      <th scope="col">Paid Amount </th>
      <th scope="col">Fee Status </th>
    </tr>
  </thead>
  <tbody>
   
    {
      feenotsdata.map((data,i)=>(
        <tr key={i}>
      
      <td>{data.name}</td>
      <td>{data.email}</td>
       <td>{data.FatherContact}</td>
       <td>{data.fee}</td>
       <td>0</td>
       <td>Not Paid</td>
    </tr>
      ))
    }
  </tbody>
</table>
            </>
          ) : (
            <div>
              <h3 class="text-danger">No Student Enrolled In That Class</h3>

              </div>
          )
        }
      
    </div>
  )
}

export default StudentAccount
