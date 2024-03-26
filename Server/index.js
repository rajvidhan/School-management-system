import express from "express"
import cors from "cors"
import { AdminRouter } from "./Routes/AdminRoute.js";
import {adminRouter} from "./Routes/adminRoutes.js"
import dotenv from "dotenv"
import {connectToCloudinary} from "./utils/cloudinaryconnect.js";
import fileUpload from "express-fileupload";
dotenv.config();
const app = express();


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


// connect to cloudinary 
connectToCloudinary();


app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET',"POST","PUT","DELETE"],
    credentials:true
}));

app.use(express.json());


app.use("/auth",AdminRouter)
app.use("/admin",adminRouter);
app.listen(3000,()=>{
    console.log("Server is running...")
})