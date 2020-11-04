//carregar o modulo do express
//quando carregar modulo faca associado a uma
//contante para evitar a alteracao de conteudo
//e assim evitar erros de execucao
const express = require("express");

const app = express();

//o modolu bady-parser nos ajuda a capturar os
//dados que virao no corpo de solicitacao e
//realiza a sua conversao para json
//assim podemos manipular os dados
const bodyParser = require("body-parser");

//para ler o produto de json que contem os
//produtos que desejo exibir. nos iremos
//carregar o modulo de fs(file system).
const fs = require("fs");

//vamos criar uma variavel no formato de arry
//que ira aguardar os produtos do arquivo loja
var dadosprodutos = null;

//realizar a leitura do arquivo de texto
//primeira parte e o nome do arquivo
//segundo parte e o enconding(tipo texto-com acento
//terceira parte e a funcao de casllback
fs.readFile("./loja.json", "utf-8", function (err, texto) {
  if (err) throw err;
  dadosprodutos = JSON.parse(texto);
});

//vamos iniciar os exemplos de utilizacao de
//verbos HTTP

var layout = [
  {
    header: "loja adutos",
    navegacao: "listar,cadastrar,atualizar,deletar",
    main: "pagina do corpo",
    footer: "Av. joao paulo, 45, vila nova - sao paulo - SP",
  },
];

//GET
//quando meu usuario deseja obter algum dados
//do servidor.
app.get("/listar", (req, res) => {
  layout[0].main = dadosprodutos.produtos;
  res.send(layout);
});

//POST
//utilizado quando o meu usuario envia algo ao
//servidor com o intuito de cadastrar ou
//realizar autenticacao
//vamos usar o bady-parser
app.use(bodyParser.json());
app.post("/cadastrar", (req, res) => {
  dadosprodutos.produtos.push(req.body);
  fs.writeFile("./loja.json", JSON.stringify(dadosprodutos), "utr-8", function (
    err
  ) {
    if (err) throw err;
    res.send("dados cadastrados");
  });
});

//PUT
//utilizado quando o usuario deseja realizar uma atualizacao
//nos dados
app.put("/atualizar", (req, res) => {
  var idenviado = req.body.idproduto;

  //pegar a quantidade  de produtos dentro de arquivo json
  var qtd = dadosprodutos.produtos.length;

  for (var i = 0; i < qtd; i++) {
    if (idenviado == dadosprodutos.produtos[i].idproduto) {
      dadosprodutos.produtos[i].nome = req.body.nome;
      dadosprodutos.produtos[i].descricao = req.body.descricao;
      dadosprodutos.produtos[i].preco = req.body.preco;
      dadosprodutos.produtos[i].imagem = req.body.imagem;
      break;
    }
  }

  fs.writeFile("./loja.json", JSON.stringify(dadosprodutos), "utf-8", function (
    err
  ) {
    if (err) throw err;
    res.send("dados atualizadas com susseso!");
  });
});
//DELITE
//utilizado quando o usuario deseja apagar algum dado
app.delete("/apagar", (req, res) => {
  var idenviado = req.body.idproduto;
  var qtd = dadosprodutos.produtos.length;
  for (var i = 0; i < qtd; i++) {
    if (idenviado == dadosprodutos.produtos[i].idproduto) {
      dadosprodutos.produtos.splice(i, 1);

      break;
    }
  }
  fs.writeFile("./loja;json", JSON.stringify(dadosprodutos), "utf-8", function (
    err
  ) {
    if (err) throw err;
    res.send("produtos apagado.");
  });
});

app.listen(3000);
console.log("servidor online...");
