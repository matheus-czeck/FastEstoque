import "dotenv/config";
import app from "./app";
import { prisma } from "./repositories/database";

const PORT = process.env.PORT || 3000;

async function iniciaServidor() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Banco de dados conectado!`);
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor: ", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

iniciaServidor();
