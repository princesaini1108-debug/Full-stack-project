import User from "../Model/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"

const JWT_SECRET = "hospital_super_secret_key_2026";

const signup = async (req, res) => {
    try {
        const { Name, Email, Password, Role, specialization, Age, Gender } = req.body;
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists..."
            });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const user = await User.create({
            Name,
            Email,
            Password: hashedPassword,
            Role,
            specialization,
            Age,
            Gender
        });
        console.log(user);
        return res.status(201).json({
            success: true,
            message: "user registered succesfully...",
            user
        });
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "error occurred",
            error: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log("Received Email:", Email); 
        console.log("Received Password:", Password);

        const user = await User.findOne({ Email });
        console.log("User found in DB:", user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials"
            });
        }

        const token = jsonwebtoken.sign(
            { id: user._id, Role: user.Role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(200).json({
            success: true,
            message: "login succesful...",
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error...",
            error
        });
    }
}

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "profile fetched succesfully...",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "server error..."
        });
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userid = req.user.id;

        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.Password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "old password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { Password: hashedPassword },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "password changed succesfully...",
            updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to change password"
        });
    }
};

export { signup, login, changePassword, getMyProfile };