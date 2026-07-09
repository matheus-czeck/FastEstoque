"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
const database_1 = require("../repositories/database");
const productService = new product_service_1.default(database_1.prisma);
class ProductController {
    async createProduct(req, res) {
        const { name, price, quantity } = req.body;
        const created_by = req.user.id;
        try {
            const productCreated = await productService.createNewProduct({
                name,
                price,
                quantity,
                created_by,
            });
            res.status(200).json(productCreated);
        }
        catch (error) {
            res.status(400).json({ error: "Ocorreu um erro interno" });
        }
    }
    async listProducts(req, res) {
        try {
            const products = await productService.listProducts();
            res.status(200).json(products);
        }
        catch (error) {
            res.status(400).json({ error: "Ocorreu um erro interno" });
        }
    }
    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const productDeleted = await productService.deleteProduct(id);
            res.status(200).json(productDeleted);
        }
        catch (error) {
            res.status(400).json({ error: "Ocorreu um erro interno" });
        }
    }
    async updateProduct(req, res) {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        try {
            const updateProduct = await productService.updateProduct(id, {
                name,
                price,
                quantity,
            });
            res.status(200).json(updateProduct);
        }
        catch (error) {
            res.status(400).json({ error: "Ocorreu um erro interno" });
        }
    }
}
exports.default = ProductController;
