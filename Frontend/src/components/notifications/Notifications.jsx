import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useSelector((state) => state.profile);



  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/admin/notificationsfor/${user.role}`)
        .then((result) => {
          setNotifications(result.data.data);
        });
    };
    fetchData();
  }, []);


  // pdf ka data lao 
   
  const [pdfdata,setpdfData] = useState({
    subject:"",
    description:"",
  });
  const handledownloadclick = (sub,des)=>{
    setpdfData({...pdfdata,subject:sub,description:des});
    pdfdownload();
}


// ab pdf download function ko call kre 

const pdfdownload = async () => {

  try {
    // Sending PDF data to the server
    const response = await axios.post('http://localhost:3000/admin/pdfdownload', pdfdata, {
        responseType: 'blob'
    });

    // Creating a Blob object from the PDF data
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

    // Creating a URL for the Blob object
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Opening the PDF in a new tab for download
    window.open(pdfUrl);
} catch (error) {
    console.error('Error generating PDF:', error);
    // Handle error
}
};


  return (
    <div>
      <div class="card text-center">
        <div class="card-header">Notifications </div>
        <table class="table mt-5 table-bordered">
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Description</th>

              <th scope="col">Download </th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n, i) => (
              <tr key={i}>
                <td>{n.subject}</td>
                <td>{n.description}</td>
                <td>
                  <button onClick={() => handledownloadclick(n.subject,n.description)} class="btn btn-success">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;
