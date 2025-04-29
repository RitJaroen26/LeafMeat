import adminModel from "../models/adminModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({email});

        if (!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(admin._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const registerAdmin = async (req, res) => {
    const { name, email, password } =  req.body;

    try {
        const existingAdmin = await adminModel.findOne({email});

        if (existingAdmin) {
            return res.json({ success: false, message: "Admin already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter your email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const adminHashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new adminModel({
            name: name,
            email: email,
            password: adminHashedPassword,
        })

        const admin = await newAdmin.save();
        const token = createToken(admin._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const getAdminProfile = async (req, res) => {
    const { name } = req.body;
    
    try {
        const admin = await adminModel.findById(req.adminId).select("name");

        if (!admin) {
            res.json({ success: false, message: "Admin not found" });
        }

        res.json({ success: true, name: admin.name });
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch admin profile", error: error.message });
    }
}

const getAmountDashboardStats = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const totalOrders = await orderModel.countDocuments();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayOrders = await orderModel.countDocuments({
            date: { $gte: today, $lt: tomorrow }
        });

        const totalFoods = await foodModel.countDocuments();

        res.json({
            success: true,
            data: {
                totalUsers,
                totalOrders,
                todayOrders,
                totalFoods,
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching dashboard stats" });
    }
}

export { registerAdmin, loginAdmin, getAdminProfile, getAmountDashboardStats };