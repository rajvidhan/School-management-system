import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
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
  },[])

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Ow99DSJsV29GjKsvtVJJN8I9botGn9QD9rJiLebeqcJDZiKMTAYtEE7p0SuN2DOYBkL5t5P8AdCc0m1PB9uqkGH00KlVOHSt1"
    );
    const body = {
      payment: studentData && studentData.fee,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`http://localhost:3000/admin/createpayment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const session = await response.json();

    inserEntryiInDb();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  }

  const inserEntryiInDb = async () => {
    const formData = new FormData();
    formData.append("name", studentData.name);
    formData.append("class", studentData.class);
    formData.append("howmuch", studentData.fee);
    formData.append("fixfee", studentData.fee);
    formData.append("year", currentYear);
    formData.append("date", CurrentDate);
    formData.append("status", "Done");

    const response = await axios.post(
      "http://localhost:3000/admin/insertfeedetails",
      formData
    );
  }

  const [pay, setpay] = useState(false);
  const [recipt, setrecipt] = useState(null);
  console.log("receipt data is ",recipt)
  const PayDoneOrNot = async () => {
    const formData = new FormData();
    formData.append("name", studentData && studentData.name);
    formData.append("class", studentData && studentData.class);
    formData.append("year", currentYear);
    await axios
      .post("http://localhost:3000/admin/chefeeSubmit", formData)
      .then((result)=>{
        setrecipt(result.data.data[0]);
        console.log("hello",result);
        if(result.data.data[0]){
          setpay(true);
        }
      });
  }
  useEffect(() => {
    PayDoneOrNot()
  }, [studentData])

  const reciptDownload = async () => {
    try {
        let formData = new FormData();
        formData.append("name",recipt.name)
        formData.append("image",studentData.image)
        formData.append("howmuch",recipt.howmuch)
        formData.append("Class",recipt.class)
        formData.append("fixfee",recipt.fixfee)
        formData.append("status",recipt.status)
        

      // Sending PDF data to the server
      const response = await axios.post(
        "http://localhost:3000/admin/reciptDowload",
        formData,
        {
          responseType: "blob",
        }
      );

      // Creating a Blob object from the PDF data
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Creating a URL for the Blob object
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Opening the PDF in a new tab for download
      window.open(pdfUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Handle error
    }
  };
  return (
    <div>
      {/* student info card  */}
      <div class="card m-5">
        <img
          class="card-img-top employee_image2"
          src={studentData && studentData.image}
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{studentData && studentData.name}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Class :- {studentData && studentData.class}
          </li>
          <li class="list-group-item">
            Total Fee :- {studentData && studentData.fee}
          </li>
        </ul>
        <div class="card-body">
          {pay ? (
          <button
          onClick={() => toast.success("Fee already submitted")}
          class="btn btn-success"
        >
          Fee Submitted
        </button>
          ) : (
            <button onClick={() => makePayment()} class="btn btn-warning">
            Submit Your Fee
          </button>
            
            
          )}
        </div>
        {recipt && (
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">NAME</th>
                <th scope="col">CLASS</th>
                <th scope="col">FEE</th>
                <th scope="col">PAID AMOUNT</th>
                <th scope="col">STATUS</th>
                <th scope="col">RECIPT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                
                <td>{recipt.name}</td>
                <td>{recipt.class}</td>
                <td>{recipt.fixfee}</td>
                <td>{recipt.howmuch}</td>
                <td>{recipt.status}</td>
                <td>
                  <button onClick={()=>reciptDownload()}  class="btn btn-success">Download</button>
                </td>
                
              </tr>           
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FeeSubmission;
