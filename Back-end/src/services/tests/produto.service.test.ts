import { describe, it, expect, vi } from "vitest";
import ProductService from "../product.service";

const mockPrisma = {
  produtos: {
    create: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findUnique: vi.fn(),
    count: vi.fn(),
  },
};

const productService = new ProductService(mockPrisma as any);

describe("ProductService", () => {
  it("Deve lancar erro quando nome esta vazio", async () => {
    await expect(
      productService.createNewProduct({
        name: "",
        price: 10,
        quantity: 5,
        created_by: "user-123",
      }),
    ).rejects.toThrow("Nome e obrigatorio.");
  });

  it("Deve lancar erro quando preco e invalido", async () => {
    await expect(
      productService.createNewProduct({
        name: "Produto1",
        price: 0,
        quantity: 3,
        created_by: "user-123",
      }),
    ).rejects.toThrow("Preco deve ser maior que 0");
  });

  it("Deve lancar erro quando a quantidade e invalida", async () => {
    await expect(
      productService.createNewProduct({
        name: "Produto1",
        price: 20,
        quantity: -1,
        created_by: "user-123",
      }),
    ).rejects.toThrow("Quantidade nao pode ser negativa");
  });

  it("Deve criar o produto com sucesso", async () => {
    mockPrisma.produtos.create.mockResolvedValue({
      id: "1",
      name: "Produto1",
      price: 20,
      quantity: 5,
    });
    const result = await productService.createNewProduct({
      name: "Produto1",
      price: 20,
      quantity: 5,
      created_by: "user-123",
    });

    expect(result).toHaveProperty("id");
    expect(result.name).toBe("Produto1");
  });

  it("deve retornar lista vazia quando nao ha produto", async () => {
    mockPrisma.produtos.findMany.mockResolvedValue([]);
    mockPrisma.produtos.count.mockResolvedValue(0);

    const result = await productService.listProducts(1);

    expect(result.products).toHaveLength(0);
    expect(result.total).toBe(0);
  });

  it("deve retornar lista de produtos", async () => {
    mockPrisma.produtos.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Produto1",
        price: 20,
        quantity: 5,
        created_by: "user-123",
      },
    ]);
    mockPrisma.produtos.count.mockResolvedValue(1);

    const result = await productService.listProducts(1);

    expect(result.products).toHaveLength(1);
    expect(result.products[0].name).toBe("Produto1");
    expect(result.total).toBe(1);
  });

  it("deve retornar erro ao deletar produto nao encontrado", async () => {
    mockPrisma.produtos.findUnique.mockResolvedValue(null);

    await expect(
      productService.deleteProduct("id-inexistente"),
    ).rejects.toThrow("Produto nao encontrado");
  });

  it("deve deletar produto com sucesso", async () => {
    mockPrisma.produtos.findUnique.mockResolvedValue({
      id: "1",
      name: "Produto1",
    });
    mockPrisma.produtos.delete.mockResolvedValue({ id: "1", nome: "Produto1" });

    const result = await productService.deleteProduct("1");
    expect(result).toHaveProperty("id");
  });

  it("deve retornar erroi ao atualizar produto nao encontrado", async () => {
    mockPrisma.produtos.findUnique.mockResolvedValue(null);

    await expect(
      productService.updateProduct("id-inexistente", {
        name: "Novo",
        price: 10,
        quantity: 10,
      }),
    ).rejects.toThrow("Produto nao encontrado");
  });

  it("deve atualizar produto com sucesso", async () => {
    mockPrisma.produtos.findUnique.mockResolvedValue({
      id: "1",
      name: "Produto1",
    });
    mockPrisma.produtos.update.mockResolvedValue({
      id: "1",
      name: "Novo",
      price: 10,
      quantity: 15,
    });

    const result = await productService.updateProduct("1", {
      name: "Novo",
      price: 10,
      quantity: 15,
    });

    expect(result).toHaveProperty("id");
    expect(result.name).toBe("Novo");
  });
});
