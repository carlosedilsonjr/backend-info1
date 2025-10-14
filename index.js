const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

  if (login === 'aluno@teste' && senha === 'senhateste') {
    return res.status(200).json({ message: 'Login realizado com sucesso' });
  } else {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
