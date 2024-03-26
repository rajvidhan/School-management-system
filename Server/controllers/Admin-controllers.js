import connection from "../utils/dbConnection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { uploadImageToCloudinary } from "../utils/imageUpload.js";


export const AdminLogin = (req, res) => {
  const sql = "SELECT * FROM admin WHERE email=? and password =? ";

  connection.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.log("result2 is ", err);
      return res.json({
        message: "Login failed",
        success: false,
      });
    }
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign({ role: "admin", email: email }, "vidhan", {
        expiresIn: "1s",
      });
      const user = {
        email: email,
        token: token,
        role: "admin",
      };

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options);

      return res.json({
        data: token,
        user: user,
        message: "Login successfully",
        success: true,
      });
    } else {
      return res.json({
        message: "Wrong Email or password brother",
        success: false,
      });
    }
  });
};

export const studentLogin = (req, res) => {
  const sql = "SELECT * FROM students WHERE email=?";

  connection.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({
        message: "Login failed",
        success: false,
      });
    }
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign({ role: "student", email: email }, "vidhan", {
        expiresIn: "1s",
      });
      const user = {
        email: email,
        token: token,
        role: "student",
      };

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options);

      return res.json({
        data: token,
        user: user,
        message: "Login successfully",
        success: true,
      });
    } else {
      return res.json({
        message: "Wrong Email or password brother",
        success: false,
      });
    }
  });
};
export const employeeLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const Urole = req.body.profession;
 
  const sql1 = `SELECT password FROM employee WHERE email=?`;

  connection.query(sql1, [email], async (err, result1) => {
    if (err) {
      return res.json({
        message: "failed",
        success: false,
      });
    } else {
      const hashpassword = result1[0].password;
 
      const isPasswordValid = await bcrypt.compare(password, hashpassword);
      console.log(isPasswordValid)
      if (isPasswordValid) {
        const token = jwt.sign({ role: Urole, email: email }, "vidhan", {
          expiresIn: "1s",
        });
        const user = {
          email: email,
          token: token,
          role: Urole,
        };

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie("token", token, options);

        return res.json({
          data: token,
          user: user,
          message: "Login successfully",
          success: true,
        });
      }
    }
  });
};

export const CategoryAdd = (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?) ";

  connection.query(sql, [req.body.category], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Query Error",
      });
    } else {
      return res.json({
        success: true,
        message: "Category added successfully",
      });
    }
  });
};

export const getCategories = (req, res) => {
  const sql = "SELECT * FROM category";
  connection.query(sql, null, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Query Error",
      });
    } else {
      return res.json({
        data: result,
        success: true,
        message: "Category fetch successfully",
      });
    }
  });
};



export const UploadImage = async (req, res) => {
  try {
    const imageData = req.files.image;

    const imageUrl = await uploadImageToCloudinary(
      imageData,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    return res.json({
      data: imageUrl.secure_url,
      success: true,
      message: "success",
    });
  } catch (error) {
    return res.json({
      message: "failed",
      success: false,
    });
  }
};

export const getEmployees = async (req, res) => {
  const sql = "SELECT * FROM employee";

  connection.query(sql, null, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Query Error",
      });
    } else {
      return res.json({
        data: result,
        success: true,
        message: "Employee fetch successfully",
      });
    }
  });
};


export const updateClass = async (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE classes 
  SET name= ? ,fee=?, classteacher = ? , boardClass = ?
  WHERE id = ?`;

  const Values = [
    req.body.classname,
    req.body.fee,
    req.body.classteacher,
    req.body.board,
  ];

  connection.query(sql, [...Values, id], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "failed",
      });
    } else {
      return res.json({
        success: true,
        message: "completed",
      });
    }
  });
};
export const EditEmployee = async (req, res) => {
  const id = req.params.id;

  const sql = `UPDATE employee 
  SET name = ?, email = ?, salary = ?, address = ?, category_id = ? , image=?
  WHERE id = ?`;

  const Values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id,
    req.body.image,
  ];

  connection.query(sql, [...Values, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: err,
      });
    } else {
      return res.json({
        success: true,
        message: "Eployee Update successfully",
      });
    }
  });
};
export const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM employee
  WHERE id = ?;`;

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: err,
      });
    } else {
      return res.json({
        success: true,
        message: "Eployee delete successfully",
      });
    }
  });
};

export const Totaladmin = async (req, res) => {
  const sql = `SELECT * FROM admin`;

  connection.query(sql, null, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        msg: err,
      });
    } else {
      return res.json({
        data: result,
        success: true,
        msg: "Successfully fetchd",
      });
    }
  });
};
export const TotalEmployee = async (req, res) => {
  const sql = `SELECT * FROM employee`;

  connection.query(sql, null, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        msg: err,
      });
    } else {
      return res.json({
        data: result,
        success: true,
        msg: "Successfully fetched",
      });
    }
  });
};
export const TotalSalary = async (req, res) => {
  const sql = `SELECT sum(salary) as salary FROM employee`;

  connection.query(sql, null, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        msg: err,
      });
    } else {
      console.log(result);
      return res.json({
        data: result,
        success: true,
        msg: "Successfully fetched",
      });
    }
  });
};

export const CBaseEmployees = async (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM employee WHERE category_id = ?`;

  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: err,
      });
    } else {
      return res.json({
        data: result,
        success: true,
        message: "Eployee fetch successfully",
      });
    }
  });
};

export const EditCategory = async (req, res) => {
  const name = req.params.name;

  const updatedCategory = req.body.updatedname;

  const sql = `UPDATE category 
set name = ?
WHERE name = ?`;

  connection.query(sql, [updatedCategory, name], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: err,
      });
    } else {
      return res.json({
        success: true,
        message: "Category Update successfully",
      });
    }
  });
};

export const DeleteCategory = async (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM category WHERE id = ?`;

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: err,
      });
    } else {
      return res.json({
        success: true,
        message: "Category Deleted successfully",
      });
    }
  });
};

export const AddClass = async (req, res) => {
  const sql = `INSERT INTO classes 
  (name,fee,classteacher,boardClass)
  VALUES (?)`;

  const values = [
    req.body.classname,
    req.body.fee,
    req.body.classteacher,
    req.body.board,
  ];

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "failed",
        success: false,
      });
    } else {
      return res.json({
        message: "success",
        success: true,
      });
    }
  });
};

export const allClasses = async (req, res) => {
  const sql = `SELECT * FROM classes ORDER BY name ASC`;

  connection.query(sql, null, (err, result) => {
    if (err) {
      return res.json({
        message: "failed",
        success: false,
      });
    } else {
      return res.json({
        data: result,
        message: "success",
        success: true,
      });
    }
  });
};

export const getallClasses = async (req, res) => {
  const sql = `SELECT name FROM classes`;

  connection.query(sql, null, (err, result) => {
    if (err) {
      return res.json({
        message: "failed",
        success: true,
      });
    } else {
      return res.json({
        message: "success",
        success: true,
        data: result,
      });
    }
  });
};


export const StudentBaseClass = async (req, res) => {
  const Class = req.params.classname;

  const sql = `SELECT * FROM students WHERE class = ?`;

  connection.query(sql, [Class], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "failed",
        success: false,
      });
    } else {
      return res.json({
        data: result,
        message: "true",
        success: true,
      });
    }
  });
};

export const AvgSBaseClass = async (req, res) => {
  const Class = req.params.classname;

  const sql = `SELECT AVG(PrevScore) AS average_score
  FROM students
  WHERE class =? `;

  connection.query(sql, [Class], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "failed",
        success: false,
      });
    } else {
      return res.json({
        data: result,
        message: "true",
        success: true,
      });
    }
  });
};

export const getStudents = async (req, res) => {
  const sql = `SELECT * FROM students`;

  connection.query(sql, null, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "failed",
        success: false,
      });
    } else {
      return res.json({
        data: result,
        message: "true",
        success: true,
      });
    }
  });
};

export const getClass = async (req, res) => {
  const item = req.params.item;
  const WItem = req.params.witem;
  const Value = req.params.value;

  const sql = `SELECT ${item} FROM classes WHERE ${WItem} = ?`;

  connection.query(sql, [Value], (err, result) => {
    if (err) {
      return res.json({
        message: "fail",
        success: false,
      });
    } else {
      return res.json({
        message: "success",
        success: true,
        data: result,
      });
    }
  });
};



export const todayPresentStudents = async (req, res) => {
  const date = req.params.CurrentDate;
  const Class = req.params.Class;
  const sql = `SELECT * FROM atendancestudent WHERE date=? AND class=?`;
  const values = [date, Class];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "failed",
        success: false,
      });
    } else {
      return res.json({
        message: "success",
        success: true,
        data: result,
      });
    }
  });
};

export const DeleteClass = async (req, res) => {
  const id = req.params.id;
  const classname = req.params.classname;

  const sql1 = `DELETE FROM classes WHERE id = ?`;

  connection.query(sql1, [id], (err, result) => {
    if (result) {
      console.log(result);
    } else {
      console.log(err);
    }
  });

  const sql2 = `DELETE FROM students WHERE class = ?`;

  connection.query(sql2, [classname], (err, result) => {
    if (result) {
      return res.json({
        message: "delete success",
        success: true,
      });
    } else {
      console.log(err);
    }
  });
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;
  const name = req.params.name;

  const sql1 = `DELETE FROM students WHERE id= ?`;
  connection.query(sql1, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({
        message: "delete failed",
        success: false,
      });
    } else {
      console.log(result);
    }
  });

  const sql2 = `DELETE FROM atendancestudent  WHERE studentname=?`;

  connection.query(sql2, [name], (err, result) => {
    if (err) {
      return res.json({
        message: "delete failed",
        success: false,
      });
    } else {
      return res.json({
        success: true,
        message: "Successfully delete the student",
      });
    }
  });
};

export const studentdata = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM students WHERE id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      return res.json({
        message: "success",
        success: true,
        data: result,
      });
    }
  });
};
