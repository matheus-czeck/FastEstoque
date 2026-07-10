import cors from "cors";
import express from "express";
import AuthRoutes from "./routes/auth.routes";
import ProdutoRoutes from "./routes/produto.routes";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:4200",
    ],
  }),
);

app.use("/auth", AuthRoutes);
app.use("/products", ProdutoRoutes);

export default app;
