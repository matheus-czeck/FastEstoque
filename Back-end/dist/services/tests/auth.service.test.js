"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const mockSupabase = {
    auth: {
        signInWithPassword: vitest_1.vi.fn(),
    },
};
const authService = new auth_service_1.default(mockSupabase);
(0, vitest_1.describe)("AuthService", () => {
    (0, vitest_1.it)("Deve lancar erro quando email nao existe", async () => {
        mockSupabase.auth.signInWithPassword.mockResolvedValue({
            data: null,
            error: { message: "Invalid login credentials" },
        });
        await (0, vitest_1.expect)(authService.login("naoexiste@gmail.com", "123456")).rejects.toThrow("Credenciais invalidas.");
    });
    (0, vitest_1.it)("Deve lancar erro quando senha nao corresponde", async () => {
        mockSupabase.auth.signInWithPassword.mockResolvedValue({
            data: null,
            error: { message: "Invalid login credentials" },
        });
        await (0, vitest_1.expect)(authService.login("existe@gmail.com", "senha_errada")).rejects.toThrow("Credenciais invalidas.");
    });
    (0, vitest_1.it)("Deve retornar token quando login for correto", async () => {
        mockSupabase.auth.signInWithPassword.mockResolvedValue({
            data: { session: { acess_token: "token_fake_123" } },
            error: null,
        });
        const resultado = await authService.login("existe@gmail.com", "senha_certa");
        (0, vitest_1.expect)(resultado).toHaveProperty("token");
    });
});
