import { NextFunction, Request, Response } from "express";
import { supabase } from "../repositories/supabase";

export class AdminMiddleware {
  async validate(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token nao fornecido" });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Token invalido" });
    }

    if (data.user.user_metadata.role !== "admin") {
      return res.status(403).json({ error: "Acesso restrito a adminstrador" });
    }
    next();
  }
}
