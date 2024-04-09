import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
const Account = () => {
  const AdminName = "Funsuk";
  const [employee, setemployee] = useState(false);
  const [selectedEm, setselectem] = useState(null);
  const [emsdata, setemsdata] = useState([]);
  const [emdata, setemdata] = useState([]);
  const [Month, setmonth] = useState("");
  const [Year, setyear] = useState("");
  const [totalsalary, setTotalsalary] = useState("");
  const [totalpres, setTotalpres] = useState("");
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

  useEffect(() => {
    const fetchEmployees = async () => {
      await axios
        .get("http://localhost:3000/auth/getEmpoyees")
        .then((result) => {
          if (result.data.success) {
            setemsdata(result.data.data);
          } else {
            toast.error("Can't fetch Employee");
          }
        })
        .catch((error) => {
          toast.error("Can't fetch Employee");
        });
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchemdata = async () => {
      await axios
        .get(`http://localhost:3000/admin/employee/${selectedEm}`)
        .then((result) => {
          if (result.data.success) {
            setemdata(result.data.data);
          } else {
            toast.error("Can't fetch Employee");
          }
        })
        .catch((error) => {
          toast.error("Can't fetch Employee");
        });
    };
    fetchemdata();
  }, [selectedEm]);

  const handlesalarysearch = async () => {
    await axios
      .get(
        `http://localhost:3000/admin/EmPresentinMonth/${Month}/${Year}/${emdata[0].name}/${emdata[0].salary}`
      )
      .then((result) => {
        if (result.data.success) {
          setTotalpres(result.data.totalpreset);
          setTotalsalary(result.data.data);
        } else {
          toast.error("Can't fetch salary");
        }
      })
      .catch((error) => {
        toast.error("Can't fetch salary");
      });
  };

  const handlepayments = async (e) => {
    e.preventDefault();

    const stripe = await loadStripe(
      `pk_test_51Ow99DSJsV29GjKsvtVJJN8I9botGn9QD9rJiLebeqcJDZiKMTAYtEE7p0SuN2DOYBkL5t5P8AdCc0m1PB9uqkGH00KlVOHSt1`
    );
    const body = {
      payment: totalsalary,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`http://localhost:3000/admin/createpayment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create payment session");
    }
    insertpaydetails();
    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const [paymentDetails, setPaymentDetails] = useState([]);
  const insertpaydetails = async () => {
    const formData = new FormData();
    formData.append("salaryholder", selectedEm);
    formData.append("salarygivenby", AdminName);
    formData.append("date", formattedDate);
    formData.append("month", Month);
    formData.append("year", Year);
    formData.append("howmuch", totalsalary);
    formData.append("salary", emdata[0].salary);
    formData.append("present", totalpres);
    formData.append("paymentstatus", "Done");
    formData.append("salaryholderemail", emdata[0].email);

    await axios.post("http://localhost:3000/admin/insertpay", formData);
  };

  const [paymentdetailYear, setPaymentdetailYear] = useState(null);

  const fetchdata = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:3000/admin/getpaydetail/${paymentdetailYear}`)
      .then((result) => {
        setPaymentDetails(result.data.data);
      });
  };

  
  return (
    <div>
      <div class="card">
        <div class="card-header">Account's</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <Link onClick={() => setemployee(!employee)} class="btn btn-light">
              Employee
            </Link>
          </li>
          <li class="list-group-item">
            <Link
             to={"/dashboard/studentAccounts"}
              class="btn btn-light"
            >
              Student
            </Link>
          </li>
        </ul>
        {employee && (
          <>
            <select
              onChange={(e) => setselectem(e.target.value)}
              class="form-select form-select-lg mb-3"
              aria-label="Large select example"
            >
              <option selected>Select Employee</option>
              {emsdata.map((e, index) => (
                <option value={e.name} key={index}>
                  {e.name}
                </option>
              ))}
            </select>
          </>
        )}

        {selectedEm && (
          <>
            {emdata.map((e, index) => (
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Position</th>
                    <th scope="col">Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {emdata.map((e, index) => (
                    <tr key={index}>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.gender}</td>
                      <td>{e.position}</td>
                      <td>{e.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}

            <div>
              <div class="card">
                <select
                  onChange={(e) => setmonth(e.target.value)}
                  class="form-select form-select-lg mb-3"
                  aria-label="Large select example"
                >
                  <option selected>Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="Octomber">Octomber</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
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

                <button
                  onClick={() => handlesalarysearch()}
                  class="btn btn-dark"
                >
                  Search
                </button>

                <div class="card text-center">
                  <div class="card-header">Payment's</div>
                  <div class="card-body">
                    <h5 class="card-title">Total Payment: {totalsalary}</h5>
                    <h6 class="card-text">
                      Pay securely. Here, there, anywhere
                    </h6>
                    <button
                      type="submit"
                      class="btn btn-light"
                      onClick={(e) => handlepayments(e)}
                    >
                      Pay
                    </button>

                    {/* {error && <div>{error}</div>} */}
                  </div>
                </div>

                <ul class="list-group mt-3 list-group-flush">
                  <li class="list-group-item">
                    Total Present Days : <strong>{totalpres}</strong>
                  </li>
                  {/* <li class="list-group-item">Decided Salary:- {" "}<strong>{emdata ? emdata[0].salary:null}</strong></li> */}
                  <li class="list-group-item">
                    Paying Salary : <strong>{totalsalary}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

       
       
      </div>
      {!employee && (
        <div class="card mt-5">
          <div class="card-header">
            <h5>Recent Payments Search By Month</h5>
            <select
              onChange={(e) => setPaymentdetailYear(e.target.value)}
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
            <button onClick={(e) => fetchdata(e)} class="btn btn-warning">
              Search
            </button>
          </div>
          <ul class="list-group list-group-flush">
            {paymentDetails.length > 0 && (
              <>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Director</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">FixedSalary</th>
                      <th scope="col">Present</th>
                      <th scope="col">Pay</th>
                      <th scope="col">Month</th>
                      <th scope="col">Year</th>

                      <th scope="col">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentDetails.map((d, i) => (
                      <tr key={i}>
                        <td>{d.salarygivenby}</td>
                        <td>{d.salaryholder}</td>
                        <td>{d.salaryholderemail}</td>
                        <td>{d.salary}</td>
                        <td>{d.present}</td>
                        <td>{d.howmuch}</td>
                        <td>{d.month}</td>
                        <td>{d.year}</td>
                        <td>{d.paymentstatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Account;
