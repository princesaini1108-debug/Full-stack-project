import express from "express"
import connectDb from "./Database/mongodb.js";
import cors from "cors"
import mongoose from "mongoose";
// import router from "./Routes/authRouth.js";
import adminroute from "./Routes/adminRoute.js";
import doctorroute from "./Routes/doctorRoute.js";
// import authroute from "./Routes/authRouth.js";
import patientroute from "./Routes/patientRouth.js";
import authroute from "./Routes/authRouth.js";
import dotenv from "dotenv"
dotenv.config()

const app=express()

// const port=5000;
const port=process.env.PORT || 4000


app.use(cors({
    origin:"*",
    methods:["POST","GET","PUT","PATCH","DELETE"]
}))

app.use(express.json());
connectDb()



// app.use("/api/auth", authroute);
app.use("/api/Auth",authroute)
app.use("/api/Admin", adminroute);
app.use("/api/Doctor", doctorroute);
app.use("/api/Patient", patientroute);

app.get("/", (req, res) => {
    res.send("Hospital Management API is running...");
});

app.listen(port,()=>{
    console.log("Server has started on Port:",port)
})