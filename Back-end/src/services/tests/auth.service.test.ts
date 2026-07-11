import { describe, it, expect, vi } from "vitest";
import AuthService from "../../services/auth.service";
import { supabaseAdmin } from "../../repositories/supabase-admin";

vi.mock("../../repositories/supabase-admin.ts", () => ({
  supabaseAdmin: {
    auth: {
      admin: {
        createUser: vi.fn(),
      },
    },
  },
}));

const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
  },
};

const authService = new AuthService(mockSupabase as any);

describe("AuthService", () => {
  it("Deve lancar erro quando email nao existe", async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: "Invalid login credentials" },
    });

    await expect(
      authService.login("naoexiste@gmail.com", "123456"),
    ).rejects.toThrow("Credenciais invalidas.");
  });

  it("Deve lancar erro quando senha nao corresponde", async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: null,
      error: { message: "Invalid login credentials" },
    });

    await expect(
      authService.login("existe@gmail.com", "senha_errada"),
    ).rejects.toThrow("Credenciais invalidas.");
  });

  it("Deve retornar token quando login for correto", async () => {
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: {
        session: { acess_token: "token_fake_123" },
        user: { user_metadata: { role: "admin" } },
      },
      error: null,
    });

    const resultado = await authService.login(
      "existe@gmail.com",
      "senha_certa",
    );

    expect(resultado).toHaveProperty("token");
  });
});
