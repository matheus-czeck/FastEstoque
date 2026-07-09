"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = require("../repositories/supabase");
class AuthMiddleware {
    async validate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token nao fornecido" });
        }
        const { data, error } = await supabase_1.supabase.auth.getUser(token);
        if (error || !data.user) {
            return res.status(401).json({ error: "Token invalido" });
        }
        req.user = data.user;
        next();
    }
}
exports.default = AuthMiddleware;
