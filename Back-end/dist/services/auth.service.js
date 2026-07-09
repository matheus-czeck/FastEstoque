"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthService {
    constructor(supabase) {
        this.supabase = supabase;
    }
    async login(email, password) {
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
exports.default = AuthService;
