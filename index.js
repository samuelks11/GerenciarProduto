//carregar o modulo do express
//quando carregar modulo faca associado a uma
//contante para evitar a alteracaode conteudo
//e assim evitar erros de execucao
const express = require("express");

const app = express();

//vamos iniciar os exemplos de utilizacao de
//verbos HTTP

//GET
//quando meu usuario deseja obter algum dados
//do servidor.
app.get("/dados", (req, res) => {
  res.send("voce esta no verbo GET");
});

//POST
//utilizado quando o meu usuario envia algo ao
//servidor com o intuito de cadastrar ou
//realizar autenticacao
app.post("dados", (req, res) => {
  res.send("voce esta no verbo POST");
});

//PUT
//utilizado quando o usuario deseja realizar uma atualizacao
//nos dados
app.put("dados", (req, res) => {
  res.send("voce esta no verbo PUT");
});
//DELITE
//utilizado quando o usuario deseja apagar algum dado
app.delete("/dados", (req.res) => {
  res.send("voce esta no verbo DELETE");
});

app.listen(3000);
console.log("servodor online...");
