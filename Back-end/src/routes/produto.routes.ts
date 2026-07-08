import { Router } from "express";
import ProdutoController from "../controllers/produto.controller";
import AuthMiddleware from "../middlewares/auth.middlewares";

const produtoController = new ProdutoController();
const authMiddleware = new AuthMiddleware();
const routes = Router();

routes.post(
  "/",
  authMiddleware.validate.bind(authMiddleware),
  produtoController.criarProdutos.bind(produtoController),
);

routes.get("/", produtoController.listarProdutos.bind(produtoController));

routes.patch(
  "/:id",
  authMiddleware.validate.bind(authMiddleware),
  produtoController.atualizarProduto.bind(produtoController),
);
routes.delete(
  "/:id",
  authMiddleware.validate.bind(authMiddleware),
  produtoController.deletarProduto.bind(produtoController),
);

export default routes;
