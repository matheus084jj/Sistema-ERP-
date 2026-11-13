import express from "express";
import cors from 'cors';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import  "dotenv/config";
import funcionarioRoute from "./src/routes/funcionario.js";



const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Janela de 15 minutos
  max: 100, // Limita cada IP a 100 requisições por janela
  message: 'Muitas requisições, tente novamente mais tarde.'
});


app.use(limiter);
app.use(cors())
app.use(express.json());

app.use("/funcionario", funcionarioRoute);
app.use("/delete_func", funcionarioRoute);

app.get("/", (req,res) => {
    res.json({message: "Este servidor do ERP esta funcionando!!"});
})

import { prisma } from "./src/config/prisma.js";

app.get("/banco", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ banco: "conectado" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ banco: "erro na conexão" });
  }
});

app.listen(process.env.PORT, (req,res) => {
    console.log("Servidor rodando.");
})