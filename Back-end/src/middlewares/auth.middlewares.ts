import { NextFunction, Request, Response } from "express";
import { supabase } from "../repositories/supabase";

class AuthMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token nao fornecido" });
    }
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Token invalido" });
    }

    req.user = data.user
    next();
  }
}

export default AuthMiddleware;
