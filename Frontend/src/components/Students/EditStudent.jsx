import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const AddStudent = () => {

const {id,name} = useParams();

  const [Image, setimage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate()
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClass = async () => {
      await axios
      .get(`http://localhost:3000/auth/All_classes`)
        .then((result) => {
          setClasses(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchClass();
  }, []);

  const [student, setStudent] = useState({});

  useEffect(()=>{
  const fetchStudentDetails= async ()=>{
    axios.get(`http://localhost:3000/auth/getstudentData/${id}/${name}`)
    .then((result) => {
        setStudent(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  fetchStudentDetails();
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("email", student.email);
    formData.append("Fathername", student.Fathername);
    formData.append("address", student.homeAddrss);
    formData.append("Mothername", student.Mothername);
    formData.append("class", student.class);
    formData.append("fcontact", student.FatherContactNUmber);
    formData.append("lastClassScore", student.lastClassScore);
    formData.append("mcontact", student.MotherContactNUmber);
    formData.append("image", imageUrl);

    const toastId2 = toast.loading("Student Adding...");
    await axios
      .post("http://localhost:3000/auth/add-student",formData)
      .then((result) => {
        if (result.data.success) {
          toast.dismiss(toastId2);
          toast.success("Student Added");
          navigate("/dashboard/classes")
        } else {
          toast.error("Can't add Student");
        }
      })
      .catch((error) => {
        toast.error("Can't Add Student");
      });
  };

  const [uploadbutton, setbtn] = useState(false);
  const imageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", Image);
      const toastId = toast.loading("Uploading..");
      const response = await axios.post(
        "http://localhost:3000/auth/image-upload",
        formData
      );

      if (response.data.success) {
        toast.dismiss(toastId);
        setbtn(true);
        toast.success("Image Uploaded");
        setImageUrl(response.data.data);
      } else {
        toast.error("Can't Upload Image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };
  return (
    <div className="d-flex justify-content-center  shadow-md align-items-center mt-3">
      <div className="p-3 rounded  w-50 border">
        <h3 className="text-center">Enroll Student</h3>
        <form className="row g-1 " onSubmit={handleSubmit}>
          {/* name  */}
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setStudent({ ...student, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
              Mother Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="motherName"
              placeholder="Enter Mother's Name"
              onChange={(e) =>
                setStudent({ ...student, Mothername: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
              Father Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="FatherName"
              placeholder="Enter Father's Name"
              onChange={(e) =>
                setStudent({ ...student, Fathername: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="FatherContact" className="form-label">
              Father Contact No.
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="FatherContact"
              placeholder="0987654321"
              onChange={(e) =>
                setStudent({ ...student, FatherContactNUmber: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputNumber" className="form-label">
              Mother's PhoneNo.
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputNumber"
              placeholder="0987654321"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, MotherContactNUmber: e.target.value })
              }
            />
          </div>

          {/* email  */}
          <div className="col-12">
            <label for="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="teachername">Class</label>
            <select
              defaultValue={""}
              onChange={(e) =>
                setStudent({ ...student, class: e.target.value })
              }
              className="form-select "
            >
              <option value="" disabled>
                Choose Class
              </option>
              {classes.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="inputScore">Last Class Score in (%)</label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputScore"
              placeholder="XY%"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, lastClassScore: e.target.value })
              }
            />
          </div>

          {/* address  */}
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Home Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, homeAddrss: e.target.value })
              }
            />
          </div>

          {/* image  */}
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile"
              name="image"
              onChange={(e) => setimage(e.target.files[0])}
            />
            {Image && !uploadbutton && (
              <div className="mt-3  items-center">
                <span>You have to upload first the Image</span>
                <button
                  onClick={imageUpload}
                  type="button"
                  className="btn btn-success w-100"
                >
                  Upload Image
                </button>
              </div>
            )}
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Enroll Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
