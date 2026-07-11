import AuthService from "../services/auth.service";
import { Request, Response } from "express";
import { supabase } from "../repositories/supabase";
import { LoginDto } from "../dtos/auth.dto";

const authService = new AuthService(supabase);

export default class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as LoginDto;

    try {
      const result = await authService.login(email, password);

      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ error: "Credenciais invalidas" });
    }
  }

  async createEmployee(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as LoginDto;

    try {
      const newEmployee = await authService.createEmployee(email, password);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({error: "Erro ao criar funcionario"})
    }
  }
}
