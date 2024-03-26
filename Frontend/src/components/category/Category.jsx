import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const Category = () => {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchedEmployee, setSearchEmployee] = useState([]);

  const [categories, setcategories] = useState([]);
  useEffect(() => {
    const fetchCategory = () => {
      axios
        .get("http://localhost:3000/auth/getCategories")
        .then((result) => {
          if (result.data.success) {
            setcategories(result.data.data);
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

  const searchEmployes = async (e) => {
    e.preventDefault();

    await axios
      .get(`http://localhost:3000/auth/search_cEmployee/${searchCategory}`)
      .then((result) => {
        if (result.data.success) {
          console.log(result.data.data.length);
          if (result.data.data.length > 0) {
            setSearchEmployee(result.data.data);
          } else {
            toast.error("No Eployee exist of this category");
          }
        } else {
          toast.error("Can't fetch Employees");
        }
      })
      .catch((error) => {
        toast.error("Can't fetch Employees");
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center ">
        <h3>Category List</h3>
      </div>
      <Link className="btn btn-success" to={"/dashboard/add-category"}>
        Add Subjects
      </Link>
      <h3 className="mt-4">
        Total subjects :{"  "}
        {categories.length}
      </h3>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr>
                <td>{c.name}</td>
                <td>
                  <Link
                  to={`/dashboard/edit-category/${c.name}`}
                  className="btn btn-info btn-sm me-2">Edit</Link>
                  <Link
                    to={`/dashboard/delete-category/${c.id}`}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* search section  */}

      <div className="w-25">
        <form>
          <div className="mb-3">
            <label htmlFor="category">
              <strong>Subject:</strong>
            </label>
            <select
              name="category"
              defaultValue={""}
              id="category"
              className="form-select"
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value="" disabled>
                Choose a Subject
              </option>
              {categories.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            onClick={(e) => searchEmployes(e)}
            className="btn btn-warning w-100 rounded-0 mb-2"
          >
            Search Teacher
          </button>
        </form>
      </div>
      <div className="w-65 ml-10">
        {searchedEmployee.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {searchedEmployee.map((e) => (
                <tr>
                  <td>
                    <img className="employee_image" src={e.image} />
                  </td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Category;
