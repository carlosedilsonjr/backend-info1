import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Credenciais válidas
const VALID_LOGIN = "aluno@teste";
const VALID_PASSWORD = "senhateste";

// Rota de health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API está rodando",
    timestamp: new Date().toISOString(),
  });
});

// Rota de login
app.post("/login", (req, res) => {
  const { login, senha } = req.body;

  // Validação: verifica se login e senha foram enviados
  if (!login || !senha) {
    return res.status(400).json({
      success: false,
      message: "Login e senha são obrigatórios",
    });
  }

  // Verifica as credenciais
  if (login === VALID_LOGIN && senha === VALID_PASSWORD) {
    return res.status(200).json({
      success: true,
      message: "Login realizado com sucesso",
      user: {
        login: login,
      },
    });
  }

  // Credenciais inválidas
  return res.status(401).json({
    success: false,
    message: "Login ou senha inválidos",
  });
});

// Rota 404 para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Login: http://localhost:${PORT}/login`);
});
