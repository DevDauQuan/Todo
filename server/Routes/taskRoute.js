import express from "express";
import { createTask, updateTask, getTask, getTasks, deleteTask } from "../controllers/taskCtrl.js";
import { verifyToken } from "../middleware/verify.js";
const Router = express.Router();

Router.post("/create", verifyToken, createTask);
Router.put("/:id", verifyToken, updateTask);
Router.get("/:id", verifyToken, getTask);
Router.delete("/:id", verifyToken, deleteTask);
Router.get("/", verifyToken, getTasks);

export default Router