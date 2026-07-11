import { SupabaseClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "../repositories/supabase-admin";

export default class AuthService {
  constructor(private supabase: SupabaseClient) {}

  async login(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      throw new Error("Credenciais invalidas.");
    }

    return {
      token: data.session.access_token,
      role: data.user.user_metadata.role ?? "employee",
    };
  }

  async createEmployee(email: string, password: string) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error || !data.user) {
      throw new Error("Erro ao criar funcionario");
    }
    return { id: data.user.id, email: data.user.email };
  }
}
