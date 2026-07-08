import { SupabaseClient } from "@supabase/supabase-js";

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

    return { token: data.session.access_token };

  }
}

