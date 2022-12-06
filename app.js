const path = require("path");
const express = require("express");
const { dirname } = require("path");
const app = express();

// Define a pasta public como pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Definir rotas
app.get("/painelUsuario", (req, res) => {
  return res.sendFile(__dirname + "/views/painelUsuario.html")
})

// Definir rotas
app.get('/login', (req , res)=>{
return res.sendFile(__dirname + '/views/login.html' )
})

//});

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/views/home.html");
});

app.get("/header", (req, res) => {
  return res.sendFile(__dirname + "/views/header.html");
});

app.get("/categorias/:categoria", (req, res) => {
  return res.sendFile(__dirname + "/views/listagemProdutos.html");
});

app.get("/master", (req, res) => {
  return res.sendFile(__dirname + "/views/master.html");
});

app.get("/produto", (req, res) => {
  return res.sendFile(__dirname + "/views/produto.html");
});

app.get("/carrinho", (req, res) => {
  return res.sendFile(__dirname + "/views/carrinho.html");
});

app.get("/painelUsuario", (req, res) => {
  return res.sendFile(__dirname + "/views/painelUsuario.html")
});

app.get('/finalizacao-compra', (req, res) => {
  return res.sendFile(__dirname + '/views/finalizacaoCompra.html')
})

// Servidor rodando
app.listen(3000, () => {
  console.log("Servidor rodando");
});
