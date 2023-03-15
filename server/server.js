import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import multer from "multer";
import { fileURLToPath } from "url"
import path from "path";
import userRoute from "./Routes/userRoute.js"
import taskRoute from "./Routes/taskRoute.js"
import { register } from "./controllers/userCtrl.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        const picturePath = new Date().toISOString().replace(/:/g, "-") + file.originalname;
        req.body.picturePath = picturePath;
        cb(null, picturePath);
    }
})

const upload = multer({ storage });

app.use("/auth/register", upload.single("picture"), register)
app.use("/auth", userRoute);
app.use("/task", taskRoute);

dotenv.config();

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'Something went wrong'
    return res.status(status).json({ message })
})

const url = process.env.MONGODB_URL;
const port = process.env.PORT;

mongoose.connect(url).then(() => {
    app.listen(port, () => {
        console.log("Server is running on port 5000");
    })
    console.log("Connected to Mongo");
}).catch((err) => {
    console.log(err);
})