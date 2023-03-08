const administradores = require("../databases/Administradores.json");

function buscaAdmin(email) {
  const administrador = administradores.find((adm) => adm.email == email);
  return administrador;
}

module.exports = {
  buscaAdmin,
};
