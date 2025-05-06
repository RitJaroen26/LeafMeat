import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
    "https://leafmeat-food.onrender.com",
    "https://leafmeat-food-admin.onrender.com",
    "http://localhost:5173",
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization", "token"]
  };
  
  // ✅ ใช้กับทุก request รวมถึง preflight
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  

// middleware
app.use(express.json());



// app.use(cors({
//     origin: ["https://leafmeat-food.onrender.com", "https://leafmeat-food-admin.onrender.com/"], 
//     credentials: true
// }));

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});