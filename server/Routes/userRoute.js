import express from "express";
import { login } from "../controllers/userCtrl.js";
const Router = express.Router();

Router.post("/login", login);


export default Router
