"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const auth_middlewares_1 = __importDefault(require("../middlewares/auth.middlewares"));
const productController = new product_controller_1.default();
const authMiddleware = new auth_middlewares_1.default();
const routes = (0, express_1.Router)();
routes.post("/", authMiddleware.validate.bind(authMiddleware), productController.createProduct.bind(productController));
routes.get("/", productController.listProducts.bind(productController));
routes.patch("/:id", authMiddleware.validate.bind(authMiddleware), productController.updateProduct.bind(productController));
routes.delete("/:id", authMiddleware.validate.bind(authMiddleware), productController.deleteProduct.bind(productController));
exports.default = routes;
