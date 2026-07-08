import {Router} from "express";
import AuthController from "../controllers/auth.controller";

const routes = Router();
const authController = new AuthController();

routes.post("/login", authController.login.bind(authController) );

export default routes;
