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

router.post("/criarLogin", async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    console.error("Login ou senha não foram informados.");
    return res.status(400).json({ error: 'Login e senha são obrigatórios' });
  }

  const { data: usuarios, error: selectError } = await supabase.from('usuarios').select('*');

  if (selectError) {
    console.error("Erro ao obter usuários da base de dados.");
    console.error(selectError);
    return res.status(500).json({ error: selectError.message });
  }

  const existe = usuarios.find(u => u.login === login)

  if (existe) {
    console.error("Login já cadastrado.");
    return res.status(409).json({ error: 'Login já cadastrado' });
  }

  const { data: novoUsuario, error: insertError } = await supabase.from('usuarios').insert([{ login, senha }]).select();

  if (insertError) {
    console.error("Erro ao criar usuário na base de dados.");
    console.error(insertError);
    return res.status(500).json({ error: insertError.message });
  }

  return res.status(201).json({
    sucesso: true,
    message: 'Usuário criado com sucesso',
    usuario: novoUsuario
  });
})

router.post("/login", async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    console.error("Login ou senha não foram informados.");
    return res.status(400).json({ error: 'Login e senha são obrigatórios' });
  }

  const { data: usuarios, error: selectError } = await supabase.from('usuarios').select('*');

  if (selectError) {
    console.error("Erro ao obter usuários da base de dados.");
    console.error(selectError);
    return res.status(500).json({ error: selectError.message });
  }

  const existe = usuarios.find(u => u.login === login && u.senha === senha)

  if (existe) {
    console.log(`O usuario "${existe.login}" fez login na api! (${new Date().toLocaleString()})`)
    return res.status(200).json({
      sucesso: true,
      message: 'Login realizado com sucesso'
    });
  }

  console.error("Credenciais inválidas.");
  return res.status(401).json({
    sucesso: false,
    error: 'Credenciais inválidas'
  });
})



export default router;