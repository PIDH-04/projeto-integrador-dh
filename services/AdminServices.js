const administradores = require("../databases/Administradores.json");

function buscaAdmin(email) {
  const administrador = administradores.find((adm) => adm.email == email);
  return administrador;
}

function listaUsuariosAdmin(){
  const admins = []
  for(let admin of administradores){
    admins.push({
      id: admin.id,
      nome: admin.nome,
      email: admin.email
    })
  }
  return admins
}

module.exports = {
  buscaAdmin,
  listaUsuariosAdmin
};
