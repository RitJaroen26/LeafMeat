import express from 'express';
import { getAdminProfile, loginAdmin, registerAdmin, getAmountDashboardStats } from '../controllers/adminController.js';
import { authenticateAdmin } from '../middleware/authAdmin.js';


const adminRouter = express.Router();

adminRouter.post('/register', registerAdmin);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/profile', authenticateAdmin, getAdminProfile);
adminRouter.get('/stats', getAmountDashboardStats);

export default adminRouter;