import express from "express"
import { AddPresent, AddStudent, AddpresentEm, EmPresentinMonth, EmployAdd, Payments, addworkerCategory, attendsheetEm, attendsheetstudent, download, emdetails, getEmployee, getworkercategory, insetPayDetails, paymentDetails } from "../controllers/admin-Controller.js";

const router = express.Router();

router.post("/addworkcategory/:name",addworkerCategory);
router.get("/getworkercategory",getworkercategory)
router.post("/add-employ",EmployAdd);


// student
router.post("/add-student",AddStudent);
router.get("/attendancesheet/:class/:date",attendsheetstudent);
router.get("/attendancesheetEm/:name/:position/:month/:year",attendsheetEm);
router.get("/export-data/:class/:date",download);
router.get("/employee/:name",getEmployee);
router.get("/EmPresentinMonth/:month/:year/:name/:salary",EmPresentinMonth)
router.post("/addpresent/:className/:studentid/:presentValue/:date",AddPresent)
router.post("/addpresentEm/:name/:position/:present/:formattedDate/:month/:year",AddpresentEm);
router.post("/createpayment",Payments);
router.post("/insertpay",insetPayDetails);
router.get("/getpaydetail/:paymentdetailYear",paymentDetails);
router.get('/emdetails/:email',emdetails)
export {router as adminRouter};