import { PrismaClient } from "../../generated/prisma";

export default class ProdutoService {
  constructor(private prisma: PrismaClient) {}

  async criarNovoProduto({
    nome,
    preco,
    quantidade,
    created_by,
  }: {
    nome: string;
    preco: number;
    quantidade: number;
    created_by: string;
  }) {
    if (!nome) {
      throw new Error("Nome e obrigatorio.");
    }
    if (preco <= 0) {
      throw new Error("Preco deve ser maior que 0");
    }
    if (quantidade < 0) {
      throw new Error("Quantidade nao pode ser negativa");
    }

    return await this.prisma.produtos.create({
      data: { name: nome, price: preco, quantity: quantidade, created_by },
    });
  }

  async listarProdutos() {
    const produtos = await this.prisma.produtos.findMany();

    return produtos;
  }

  async deletarProduto(id: string) {
    const produtoASerDeletado = await this.prisma.produtos.findUnique({
      where: { id },
    });

    if (!produtoASerDeletado) {
      throw new Error("Produto nao encontrado");
    }

    return await this.prisma.produtos.delete({
      where: { id: produtoASerDeletado.id },
    });
  }

  async atualizarProduto(
    id: string,
    dados: { nome: string; preco: number; quantidade: number },
  ) {
    const produtoASerAtualizado = await this.prisma.produtos.findUnique({
      where: { id },
    });

    if (!produtoASerAtualizado) {
      throw new Error("Produto nao encontrado");
    }

    return await this.prisma.produtos.update({
      where: { id },
      data: {
        name: dados.nome,
        price: dados.preco,
        quantity: dados.quantidade,
      },
    });
  }
}
