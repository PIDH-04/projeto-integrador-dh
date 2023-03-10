// Importar express
const express = require("express");
const path = require("path");
const router = require("./router");
const session = require("express-session");
const methodOverride = require('method-override');

// Criar o servidor
const app = express();
app.set("view engine", "ejs");

// Configura o session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Define a pasta public como pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public/script", { type: "application/javascript" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))

// Definir roteador a ser usado
app.use(router);

// Servidor rodando
app.listen(3000, () => {
  console.log("Servidor rodando");
});
