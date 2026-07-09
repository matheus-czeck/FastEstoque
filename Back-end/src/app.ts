import express from "express";
import cors from 'cors'
import AuthRoutes from "./routes/auth.routes";
import ProdutoRoutes from "./routes/produto.routes";

const app = express();
app.use(express.json())
app.use(cors())

app.use("/auth", AuthRoutes)
app.use("/products", ProdutoRoutes)


export default app;
