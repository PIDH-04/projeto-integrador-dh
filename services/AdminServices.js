const administradores = require("../databases/Administradores.json");
const bcrypt = require("bcrypt");

function buscaAdmin(email) {
  const administrador = administradores.find((adm) => adm.email == email);
  return administrador;
}

function checaSenha(usuario, senha) {
  return bcrypt.compareSync(senha, usuario.senha);
}

module.exports = {
  buscaAdmin,
  checaSenha,
};
