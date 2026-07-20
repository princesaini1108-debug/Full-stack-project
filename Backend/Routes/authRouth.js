import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import { changePassword, getMyProfile, login, signup } from "../controllers/authLogic.js"

const authroute = express.Router()

authroute.post("/login", login)
authroute.post("/signup", signup)
authroute.get("/profile", verifyToken, getMyProfile)   // ✅ fix
authroute.put("/changepassword", verifyToken, changePassword)

export default authroute;