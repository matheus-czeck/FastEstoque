import ProdutoService from "../services/produto.service";
import { prisma } from "../repositories/database";
import { Request, Response } from "express";

const produtoService = new ProdutoService(prisma);

export default class ProdutoController {
  async criarProdutos(req: Request, res: Response): Promise<void> {
    const { nome, preco, quantidade } = req.body;
    const created_by = req.user!.id;
    try {
      const produtoCriado = await produtoService.criarNovoProduto({
        nome,
        preco,
        quantidade,
        created_by,
      });

      res.status(200).json(produtoCriado);
    } catch (error) {
      res.status(400).json({ error: "Ocorreu um erro interno" });
    }
  }

  async listarProdutos(req: Request, res: Response): Promise<void> {
    try {
      const produtos = await produtoService.listarProdutos();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(400).json({ error: "Ocorreu um erro interno" });
    }
  }
  async deletarProduto(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    try {
      const produtoDeletado = await produtoService.deletarProduto(id);
      res.status(200).json(produtoDeletado);
    } catch (error) {
      res.status(400).json({ error: "Ocorreu um erro interno" });
    }
  }
  async atualizarProduto(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    const { nome, preco, quantidade } = req.body;
    try {
      const produtoAtualizado = await produtoService.atualizarProduto(id, {
        nome,
        preco,
        quantidade,
      });
      res.status(200).json(produtoAtualizado);
    } catch (error) {
      res.status(400).json({ error: "Ocorreu um erro interno" });
    }
  }
}
