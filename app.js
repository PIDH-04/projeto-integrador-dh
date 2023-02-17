// Importar express
const express = require("express");
const path = require("path");
const router = require('./router');

// Criar o servidor
const app = express();
app.set("view engine","ejs");

// Define a pasta public como pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public"), ));
app.use(express.static('public/script', { type: 'application/javascript' }));


// Definir roteador a ser usado
app.use(router);

// Servidor rodando
app.listen(3000, () => {
  console.log("Servidor rodando");
});

