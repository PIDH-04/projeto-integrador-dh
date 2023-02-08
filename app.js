const path = require("path");
const express = require("express");

const app = express();
const router = require('./router');

// Define a pasta public como pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.use(router);

// Servidor rodando
app.listen(3000, () => {
  console.log("Servidor rodando");
});

