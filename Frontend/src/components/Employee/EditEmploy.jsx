import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditEmploy = () => {
   
  const {id} = useParams();
  
  const [category, setCategory] = useState([]);
  const [Image, setimage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // fetch the details of category
  useEffect(() => {
    const fetchCategory = () => {
      axios
        .get("http://localhost:3000/auth/getCategories")
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
    category_id: "",
    salary: "",
    image:""
  });



  // fetch the data of employee first 
  useEffect(()=>{
    const fetchEmployees = ()=>{
      axios.get(`http://localhost:3000/auth/employee/${id}`)
      .then(result=>{
        
        if(result.data.success){              
          setEmployee({
            ...employee,
            name: result.data.data[0].name,
            email: result.data.data[0].email,
            address: result.data.data[0].address,
            salary: result.data.data[0].salary,
            category_id: result.data.data[0].category_id,
            image:result.data.data[0].image,
        });

          }else{
            toast.error("Can't fetch Employee")
          } 
    })
    .catch(error=>{
        toast.error("Can't fetch Employee")
    })
    }

    fetchEmployees();
  },[])


// image upload section 
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
      setEmployee({...employee,image:response.data.data});
    } else {
      toast.error("Can't Upload Image");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Error uploading image");
  }
};


const handleSubmit =async (e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", employee.name);
  formData.append("email", employee.email);

  formData.append("address", employee.address);
  formData.append("category_id", employee.category_id);
  formData.append("salary", employee.salary);
  formData.append("image", imageUrl);

  const toastId2 = toast.loading("Updating...");
  await axios
    .post(`http://localhost:3000/auth/edit_employ/${id}`, formData)
    .then((result) => {
      if (result.data.success) {
        toast.dismiss(toastId2);
        toast.success("Update Successfully");
        navigate("/dashboard/employee");
      } else {
        toast.error("Can't add Employee");
      }
    })
    .catch((error) => {
      toast.error("Can't Add Employee");
    });

}
console.log("employee is ", employee)
  return (
    <div className="d-flex justify-content-center  align-items-center mt-3">
    <div className="p-3 rounded  w-50 border">
      <h3 className="text-center">Edit Employee</h3>
      <form className="row g-1 " onSubmit={handleSubmit} >
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
            value={employee.name}
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
            value={employee.email}
            autoComplete="on"
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />
        </div>
        {/* password and salary */}
        <div className="col-12">         
          <label for="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputSalary"
            autoComplete="on"
            value={employee.salary}
            placeholder="Enter Salary"
   
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
            value={employee.address}
            onChange={(e) =>
              setEmployee({ ...employee, address: e.target.value })
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
            value={employee.category_id}
            className="form-select"
            onChange={(e) => {
              setEmployee({ ...employee, category_id: e.target.value });
            }}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {category.map((c) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
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
          {
            employee.image  && (
              <div className="d-flex flex-column mt-4 align-items-center justify-content-center">
                <img className="employee_image1" src={employee.image}  />
                <p  className="mt-1">Profile Picture</p>
              </div>
            )
          }
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditEmploy
