declare global {
  namespace Express {
    interface Request {
      user?: import("@supabase/supabase-js").User;
    }
  }
}

export {};
