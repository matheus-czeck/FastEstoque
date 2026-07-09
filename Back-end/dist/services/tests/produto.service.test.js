"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const product_service_1 = __importDefault(require("../product.service"));
const mockPrisma = {
    produtos: {
        create: vitest_1.vi.fn(),
        findMany: vitest_1.vi.fn(),
        update: vitest_1.vi.fn(),
        delete: vitest_1.vi.fn(),
        findUnique: vitest_1.vi.fn(),
    },
};
const productService = new product_service_1.default(mockPrisma);
(0, vitest_1.describe)("ProductService", () => {
    (0, vitest_1.it)("Deve lancar erro quando nome esta vazio", async () => {
        await (0, vitest_1.expect)(productService.createNewProduct({
            name: "",
            price: 10,
            quantity: 5,
            created_by: "user-123",
        })).rejects.toThrow("Nome e obrigatorio.");
    });
    (0, vitest_1.it)("Deve lancar erro quando preco e invalido", async () => {
        await (0, vitest_1.expect)(productService.createNewProduct({
            name: "Produto1",
            price: 0,
            quantity: 3,
            created_by: "user-123",
        })).rejects.toThrow("Preco deve ser maior que 0");
    });
    (0, vitest_1.it)("Deve lancar erro quando a quantidade e invalida", async () => {
        await (0, vitest_1.expect)(productService.createNewProduct({
            name: "Produto1",
            price: 20,
            quantity: -1,
            created_by: "user-123",
        })).rejects.toThrow("Quantidade nao pode ser negativa");
    });
    (0, vitest_1.it)("Deve criar o produto com sucesso", async () => {
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
        (0, vitest_1.expect)(result).toHaveProperty("id");
        (0, vitest_1.expect)(result.name).toBe("Produto1");
    });
    (0, vitest_1.it)("deve retornar lista vazia quando nao ha produto", async () => {
        mockPrisma.produtos.findMany.mockResolvedValue([]);
        const result = await productService.listProducts();
        (0, vitest_1.expect)(result).toHaveLength(0);
    });
    (0, vitest_1.it)("deve retornar lista de produtos", async () => {
        mockPrisma.produtos.findMany.mockResolvedValue([
            {
                id: "1",
                name: "Produto1",
                price: 20,
                quantity: 5,
                created_by: "user-123",
            },
        ]);
        const result = await productService.listProducts();
        (0, vitest_1.expect)(result).toHaveLength(1);
        (0, vitest_1.expect)(result[0].name).toBe("Produto1");
    });
    (0, vitest_1.it)("deve retornar erro ao deletar produto nao encontrado", async () => {
        mockPrisma.produtos.findUnique.mockResolvedValue(null);
        await (0, vitest_1.expect)(productService.deleteProduct("id-inexistente")).rejects.toThrow("Produto nao encontrado");
    });
    (0, vitest_1.it)("deve deletar produto com sucesso", async () => {
        mockPrisma.produtos.findUnique.mockResolvedValue({
            id: "1",
            name: "Produto1",
        });
        mockPrisma.produtos.delete.mockResolvedValue({ id: "1", nome: "Produto1" });
        const result = await productService.deleteProduct("1");
        (0, vitest_1.expect)(result).toHaveProperty("id");
    });
    (0, vitest_1.it)("deve retornar erroi ao atualizar produto nao encontrado", async () => {
        mockPrisma.produtos.findUnique.mockResolvedValue(null);
        await (0, vitest_1.expect)(productService.updateProduct("id-inexistente", {
            name: "Novo",
            price: 10,
            quantity: 10,
        })).rejects.toThrow("Produto nao encontrado");
    });
    (0, vitest_1.it)("deve atualizar produto com sucesso", async () => {
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
        (0, vitest_1.expect)(result).toHaveProperty("id");
        (0, vitest_1.expect)(result.name).toBe("Novo");
    });
});
