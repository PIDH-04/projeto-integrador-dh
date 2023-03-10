const usuarios = require("../databases/Usuarios.json");
const bcrypt = require("bcrypt");
const fs = require('fs');

function buscaUsuario(email) {
  const usuario = usuarios.find((usuario) => usuario.email == email);
  return usuario;
}
function checaSenha(usuario, senha) {
  return bcrypt.compareSync(senha, usuario.senha);
}

module.exports = {
  buscaUsuario,
  checaSenha
};
