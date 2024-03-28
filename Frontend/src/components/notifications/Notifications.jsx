import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
const {user} = useSelector((state)=>state.profile)
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
console.log(notifications)
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
                  <button class="btn btn-success">Download</button>
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
