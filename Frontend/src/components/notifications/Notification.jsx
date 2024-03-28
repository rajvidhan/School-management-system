import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Notification = () => {
  const [notificationData, setNotificationData] = useState({
    sub: "",
    des: "",
    for: "",
  });
  const { user } = useSelector((state) => state.profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("des", notificationData.des);
    formData.append("sub", notificationData.sub);
    formData.append("for", notificationData.for);

    await axios
      .post(`http://localhost:3000/admin/postnotification`, formData)
      .then((result) => {
        if (result.data.success) {
          toast.success("notification posted");
          setNotificationData({
            des: "",
            sub: "",
            for: "",
          });
          location.reload();
        }
      });
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:3000/admin/notifications`)
        .then((result) => {
          setNotifications(result.data.data);
        });
    };
    fetchData();
  }, []);


const handleDelete = async(data)=>{
  
    await axios.delete(`http://localhost:3000/admin/deletenotification/${data}`)
    .then(result=>{
        if(result.data.success){
            toast.success("deleted");
            location.reload();
        }
    })
}


  return (
    <div>
      <div class="card text-center">
        <div class="card-header">Notifications </div>
        <div class="card-body">
          <h5 class="card-title">Create a notification</h5>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="form-group m-3">
              <input
                type="text"
                class="form-control"
                value={notificationData.sub}
                onChange={(e) =>
                  setNotificationData({
                    ...notificationData,
                    sub: e.target.value,
                  })
                }
                id="exampleFormControlInput1"
                placeholder="write the subject of notification"
              />
            </div>
            <select
              onChange={(e) =>
                setNotificationData({
                  ...notificationData,
                  for: e.target.value,
                })
              }
              value={notificationData.for}
              className="form-select mx-3 "
            >
              <option value="" disabled>
                For
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="both">Both</option>
            </select>
            <div class="form-group m-3">
              <textarea
                value={notificationData.des}
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) =>
                  setNotificationData({
                    ...notificationData,
                    des: e.target.value,
                  })
                }
                placeholder="Write the notification detail here"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              Post
            </button>
          </form>
        </div>
      </div>
      {notifications.length > 0 ? (
        <table class="table mt-5 table-bordered">
          <thead>
            <tr>
              <th scope="col">Subject</th>
              <th scope="col">Description</th>
            
              <th scope="col">Delete </th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n, i) => (
              <tr key={i}>
                <td>{n.subject}</td>
                <td>{n.description}</td>
              
                <td>
                  <button onClick={()=>handleDelete(n.description)} class="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No notification publish yet"
      )}
    </div>
  );
};

export default Notification;
