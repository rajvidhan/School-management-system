import express from "express"
import { AddClass, AdminLogin, AvgSBaseClass, CBaseEmployees, CategoryAdd, DeleteCategory, DeleteClass, EditCategory, EditEmployee, StudentBaseClass, TotalEmployee, TotalSalary, Totaladmin, UploadImage, allClasses, deleteEmployee, deleteStudent, employeeLogin, getCategories, getClass, getEmployees, getStudents, getallClasses, studentLogin, studentdata, todayPresentStudents, updateClass } from "../controllers/Admin-controllers.js";

const router = express.Router();

router.post("/adminlogin",AdminLogin);
router.post("/studentlogin",studentLogin)
router.post("/employeelogin",employeeLogin)






router.post("/add-category",CategoryAdd);
router.get("/getCategories",getCategories);

router.post("/image-upload",UploadImage);
router.get("/getEmpoyees",getEmployees);

router.post("/edit_employ/:id",EditEmployee);
router.delete("/deleteEmployee/:id",deleteEmployee);
router.get("/admin_count",Totaladmin);
router.get("/employee_count",TotalEmployee);
router.get("/salary_count",TotalSalary);
router.get("/search_cEmployee/:id",CBaseEmployees);
router.put("/editCategory/:name",EditCategory);
router.delete("/deleteCategory/:id",DeleteCategory);





router.post("/add_class",AddClass);
router.get("/All_classes",allClasses)
router.get("/getClasses",getallClasses)
router.delete("/deleteClass/:id/:classname",DeleteClass)



// student 

router.get("/getStudents/:classname",StudentBaseClass)
router.get("/avgscore/:classname",AvgSBaseClass)
router.get("/students",getStudents);
router.get("/getclass/:item/:witem/:value",getClass);
router.put("/edit_class/:id",updateClass)

router.get("/Pstudents/:CurrentDate/:Class",todayPresentStudents)
router.delete(`/deleteStudent/:id/:name`,deleteStudent)
router.get(`/getstudentData/:id/:name`,studentdata)


























export {router as AdminRouter};