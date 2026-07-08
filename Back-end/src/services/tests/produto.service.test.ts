import { describe, it, expect, vi } from "vitest";
import ProdutoService from "../produto.service";

const mockPrisma = {
  produtos: {
    create: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findUnique: vi.fn(),
  },
};

const produtoService = new ProdutoService(mockPrisma as any);

describe("ProdutoService", () => {
  it("Deve lancar erro quando nome esta vazio", async () => {
    await expect(
      produtoService.criarNovoProduto({
        nome: "",
        preco: 10,
        quantidade: 5,
        created_by: "user-123",
      }),
    ).rejects.toThrow("Nome e obrigatorio.");
  });

  it("Deve lancar erro quando preco e invalido", async () => {
    await expect(
      produtoService.criarNovoProduto({
        nome: "Produto1",
        preco: 0,
        quantidade: 3,
        created_by: "user-123",
      }),
    ).rejects.toThrow("Preco deve ser maior que 0");
  });

  it("Deve lancar erro quando a quantidade e invalida", async () => {
    await expect(
      produtoService.criarNovoProduto({
        nome: "Produto1",
        preco: 20,
        quantidade: -1,
        created_by: "user-123",
      }),
    ).rejects.toThrow("Quantidade nao pode ser negativa");
  });

  it("Deve criar o produto com sucesso", async () => {
    mockPrisma.produtos.create.mockResolvedValue({
      id: "1",
      name: "Produto1",
      preco: 20,
      qauntidade: 5,
    });
    const resultado = await produtoService.criarNovoProduto({
      nome: "Produto1",
      preco: 20,
      quantidade: 5,
      created_by: "user-123",
    });

    expect(resultado).toHaveProperty("id");
    expect(resultado.name).toBe("Produto1");
  });

  it("deve retornar lista vazia quando nao ha produto", async () => {
    mockPrisma.produtos.findMany.mockResolvedValue([]);

    const resultado = await produtoService.listarProdutos();

    expect(resultado).toHaveLength(0);
  });

  it("deve retornar lista de produtos", async () => {
    mockPrisma.produtos.findMany.mockResolvedValue([
      {
        id: "1",
        name: "Produto1",
        preco: 20,
        quantidade: 5,
        created_by: "user-123",
      },
    ]);

    const resultado = await produtoService.listarProdutos();

    expect(resultado).toHaveLength(1);
    expect(resultado[0].name).toBe("Produto1");
  });

  it("deve retornar erro ao deletar produto nao encontrado", async () => {
    mockPrisma.produtos.findUnique.mockResolvedValue(null);

    await expect(
      produtoService.deletarProduto("id-inexistente"),
    ).rejects.toThrow("Produto nao encontrado");
  });

  it("deve deletar produto com sucesso", async () => {
    mockPrisma.produtos.findUnique.mockResolvedValue({
      id: "1",
      nome: "Produto1",
    });
    mockPrisma.produtos.delete.mockResolvedValue({ id: "1", nome: "Produto1" });

    const resutado = await produtoService.deletarProduto("1");
    expect(resutado).toHaveProperty("id");
  });

  it("deve retornar erroi ao atualizar produto nao encontrado", async () => {
    mockPrisma.produtos.findUnique.mockResolvedValue(null);

    await expect(
      produtoService.atualizarProduto("id-inexistente", {
        nome: "Novo",
        preco: 10,
        quantidade: 10,
      }),
    ).rejects.toThrow("Produto nao encontrado");
  });

  it("deve atualizar produto com sucesso", async () => {
    mockPrisma.produtos.findUnique.mockResolvedValue({
      id: "1",
      nome: "Produto1",
    });
    mockPrisma.produtos.update.mockResolvedValue({
      id: "1",
      name: "Novo",
      preco: 10,
      quantidade: 15,
    });

    const resultado = await produtoService.atualizarProduto("1", {
      nome: "Novo",
      preco: 10,
      quantidade: 15,
    });

    expect(resultado).toHaveProperty("id");
    expect(resultado.name).toBe("Novo");
  });
});
