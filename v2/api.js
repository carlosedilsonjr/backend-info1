import express from "express";
import supabase from "./supabase.js";

const router = express.Router();

router.get("/status", (req, res) => {
  res.status(200).send({ status: "OK", message: "API Versão 2 está funcionando." });
});

router.get("/usuarios", async (req, res) => {
  const { data, error } = await supabase.from('usuarios').select('*');

  if (error) {
    console.error("Erro ao obter usuários da base de dados.");
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
})

export default router;