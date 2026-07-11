import { count } from "node:console";
import { PrismaClient } from "../../generated/prisma";

export default class ProductService {
  constructor(private prisma: PrismaClient) {}

  async createNewProduct({
    name,
    price,
    quantity,
    created_by,
  }: {
    name: string;
    price: number;
    quantity: number;
    created_by: string;
  }) {
    if (!name) {
      throw new Error("Nome e obrigatorio.");
    }
    if (price <= 0) {
      throw new Error("Preco deve ser maior que 0");
    }
    if (quantity < 0) {
      throw new Error("Quantidade nao pode ser negativa");
    }

    return await this.prisma.produtos.create({
      data: { name, price, quantity, created_by },
    });
  }

  async listProducts(page: number = 1) {
    const limit = 10;
    const products = await this.prisma.produtos.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.prisma.produtos.count();

    return { products, total };
  }

  async deleteProduct(id: string) {
    const productToBeDeleted = await this.prisma.produtos.findUnique({
      where: { id },
    });

    if (!productToBeDeleted) {
      throw new Error("Produto nao encontrado");
    }

    return await this.prisma.produtos.delete({
      where: { id: productToBeDeleted.id },
    });
  }

  async updateProduct(
    id: string,
    data: { name: string; price: number; quantity: number },
  ) {
    const productToBeUpdated = await this.prisma.produtos.findUnique({
      where: { id },
    });

    if (!productToBeUpdated) {
      throw new Error("Produto nao encontrado");
    }

    return await this.prisma.produtos.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
      },
    });
  }
}
