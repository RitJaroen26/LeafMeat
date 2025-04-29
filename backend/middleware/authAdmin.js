import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.json({ success: false, message: "Not Authorized login again" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};