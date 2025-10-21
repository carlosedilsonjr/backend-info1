const express = require('express');
const cors = require("cors");
const {viagens} = require("./consts.js")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const usuarios = [];

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'OK', message: 'API está rodando' });
});

// Rota de login
app.post('/login', (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ error: 'Login e senha são obrigatórios' });
  }

  const usuario = usuarios.find(u => u.login === login && u.senha === senha)

  if (usuario) {
    console.log(`O usuario "${usuario.login}" fez login na api! (${new Date().toLocaleString()})`)
    return res.status(200).json({ 
        sucesso: true,
        message: 'Login realizado com sucesso'
    });
  } else {
    return res.status(401).json({
        sucesso: false,
        error: 'Credenciais inválidas'
    });
  }
});

// Criar Login
app.post("/criarLogin", (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ error: 'Login e senha são obrigatórios' });
  }

  const existe = usuarios.find(u => u.login === login)

  if (existe) {
    return res.status(409).json({ error: 'Login já cadastrado' });
  }

  usuarios.push({ login, senha });
  console.table(usuarios)
  return res.status(201).json({
    sucesso: true,
    message: 'Usuário criado com sucesso'
  });
})

// Listar Viagens
app.get("/viagens", (req, res) => {
  return res.status(200).json(viagens)
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
