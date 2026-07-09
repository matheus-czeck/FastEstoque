import { Router } from "express";
import ProductController from "../controllers/product.controller";
import AuthMiddleware from "../middlewares/auth.middlewares";

const productController = new ProductController();
const authMiddleware = new AuthMiddleware();
const routes = Router();

routes.post(
  "/",
  authMiddleware.validate.bind(authMiddleware),
  productController.createProduct.bind(productController),
);

routes.get("/", productController.listProducts.bind(productController));

routes.patch(
  "/:id",
  authMiddleware.validate.bind(authMiddleware),
  productController.updateProduct.bind(productController),
);
routes.delete(
  "/:id",
  authMiddleware.validate.bind(authMiddleware),
  productController.deleteProduct.bind(productController),
);

export default routes;
