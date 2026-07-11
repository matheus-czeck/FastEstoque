import ProductService from "../services/product.service";
import { prisma } from "../repositories/database";
import { Request, Response } from "express";

const productService = new ProductService(prisma);

export default class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    const { name, price, quantity } = req.body;
    const created_by = req.user!.id;
    try {
      const productCreated = await productService.createNewProduct({
        name,
        price,
        quantity,
        created_by,
      });

      res.status(200).json(productCreated);
    } catch (error) {
      res.status(400).json({ error: "Ocorreu um erro interno" });
    }
  }

  async listProducts(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    try {
      const products = await productService.listProducts(page);
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: "Ocorreu um erro interno" });
    }
  }
  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    try {
      const productDeleted = await productService.deleteProduct(id);
      res.status(200).json(productDeleted);
    } catch (error) {
      res.status(400).json({ error: "Ocorreu um erro interno" });
    }
  }
  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    const { name, price, quantity } = req.body;
    try {
      const updateProduct = await productService.updateProduct(id, {
        name,
        price,
        quantity,
      });
      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(400).json({ error: "Ocorreu um erro interno" });
    }
  }
}
