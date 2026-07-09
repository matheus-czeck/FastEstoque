"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const supabase_1 = require("../repositories/supabase");
const authService = new auth_service_1.default(supabase_1.supabase);
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const result = await authService.login(email, password);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(401).json({ error: "Credenciais invalidas" });
        }
    }
}
exports.default = AuthController;
