import express from "express";

const router = express.Router();

router.get("/status", (req, res) => {
  res.status(200).send({ status: "OK", message: "API Versão 2 está funcionando." });
});

export default router;