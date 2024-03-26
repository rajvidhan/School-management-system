import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { PiExportBold } from "react-icons/pi";
const AttendanceSheet = () => {
  const Class = useParams().classname;
  const [date, setdate] = useState("");
  const [sheetData, setSheetData] = useState([]);

 

  const fetchsheet = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:3000/admin/attendancesheet/${Class}/${date}`)
      .then((result) => {
        if (result.data.success) {
          setSheetData(result.data.data);
        } else {
          toast.error("Can't fetch sheet");
        }
      })
      .catch((error) => {
        toast.error("Can't fetch sheet");
      });
  };



   async function handleDownload(){
    await axios.get(`http://localhost:3000/admin/export-data/${Class}/${date}`, { responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attendanceSheet.xlsx');
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [file,setFile] = useState(null);
const handlefilechange = ()=>{
  
}

  return (
    <div>
      <div className="d-flex flex-column justify-content-center ">
        <h5>Choose A Date For Attendance Sheet</h5>
        <div>
          <input
            type="date"
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) => setdate(e.target.value)}
          />
          <button class="btn btn-light" onClick={(e) => fetchsheet(e)}>
            Search
          </button>
        </div>
      </div>
      {sheetData.length > 0 ? (
        <div class="card mt-5">
          <div class="card-header">{Class} Students</div>
         <div className="d-flex gap-5 m-3">
        
          <button onClick={()=>handleDownload()} class="btn btn-dark">Download Sheet<PiExportBold /></button>
          <input onChange={handlefilechange} type="file" />
          <button class="btn btn-warning">Upload Data</button>
         </div>
          <div class="card-body">
            <h5>Date:-{date}</h5>
           
            <h6 class="card-text">Student Attendance- </h6>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">image</th>
                  <th scope="col">attendance</th>
                </tr>
              </thead>
              <tbody>
                {sheetData.map((E, index) => (
                  <tr key={index}>
                    <td>{E.name}</td>
                    <td>
                      <img src={E.image} class="employee_image" />
                    </td>
                    <td>{E.attendance}</td>
                  </tr>
                ))}
              </tbody>
             
            </table>
          
          </div>
          
        </div>
      ) : (
        <div>No present students this date</div>
      )}
    </div>
  );
};

export default AttendanceSheet;
