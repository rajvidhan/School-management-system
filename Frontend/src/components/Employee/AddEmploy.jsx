import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEmploy = () => {
  const [category, setCategory] = useState([]);
  const [Image, setimage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // fetch the details of category
  useEffect(() => {
    const fetchCategory = () => {
      axios
        .get("http://localhost:3000/admin/getworkercategory")
        .then((result) => {
          if (result.data.success) {
            setCategory(result.data.data);
          } else {
            toast.error("Can't fetch Categories");
          }
        })
        .catch((error) => {
          toast.error("Can't fetch Categories");
        });
    };
    fetchCategory();
  }, []);

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    position: "",
    gender:"",
    higherQualification:"",
    experience:"",
    joindate:"",
    
    salary: "",
  });
  console.log(employee)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("address", employee.address);
    formData.append("gender", employee.gender);
    formData.append("position", employee.position);
    formData.append("salary", employee.salary);
    formData.append("image", imageUrl);
    formData.append("experience", employee.experience);
    formData.append("higherQualification", employee.higherQualification);
    formData.append("joindate", employee.joindate);

    const toastId2 = toast.loading("Employee Adding...");
    await axios
      .post("http://localhost:3000/admin/add-employ",formData)
      .then((result) => {
        if (result.data.success) {
          toast.dismiss(toastId2);
          
          toast.success("Employee Added");
          navigate("/dashboard/employee");
        } else {
          toast.error("Can't add Employee");
        }
      })
      .catch((error) => {
        toast.error("Can't Add Employee");
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
    <div className="d-flex justify-content-center  align-items-center mt-3">
      <div className="p-3 rounded  w-50 border">
        <h3 className="text-center">Add Employee</h3>
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
                setEmployee({ ...employee, name: e.target.value })
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
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          {/* gender */}
          <div className="col-12">
            <label for="inputEmail" className="form-label">
              Gender
            </label>
            <select defaultValue={""} onChange={(e) => {
                setEmployee({ ...employee, gender: e.target.value });
              }}   className="form-select" name="gender" id="gender">
                  <option value="" >
                Choose a Category
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="trans">Trans</option>

            </select>
          </div>
          {/* password and salary */}
          <div className="col-12">
            <label for="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          {/* address  */}
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          {/* hirind date  */}
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Hire Date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputAddress"
             
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, joindate: e.target.value })
              }
            />
          </div>
        
          {/* category  */}
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              defaultValue={""}
              id="category"
              className="form-select"
              onChange={(e) => {
                setEmployee({ ...employee, position: e.target.value });
              }}
            >
              <option value="" disabled>
                Choose a Category
              </option>
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Experience In Year
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter employee work experience"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, experience: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
             Higher Qualification
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter employee higher qualification"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, higherQualification: e.target.value })
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
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmploy;
