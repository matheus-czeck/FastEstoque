import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { AdminMiddleware } from "../middlewares/admin.middleware";

const routes = Router();
const authController = new AuthController();
const adminMiddleware = new AdminMiddleware();

routes.post("/login", authController.login.bind(authController));
routes.post(
  "/register",
  adminMiddleware.validate.bind(adminMiddleware),
  authController.createEmployee.bind(authController),
);

export default routes;
