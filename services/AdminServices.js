const administradores = require("../databases/Administradores.json");
const fs = require("fs");

function buscaAdmin(email) {
  const administrador = administradores.find((adm) => adm.email == email);
  return administrador;
}

function buscaAdminId(id) {
  const administrador = administradores.find((adm) => adm.id == id);
  return administrador;
}

function listaUsuariosAdmin() {
  const admins = [];
  for (let admin of administradores) {
    admins.push({
      id: admin.id,
      nome: admin.nome,
      email: admin.email,
    });
  }
  return admins;
}

function salvaAdmin(id, novasInfos) {
  const indexUsuario = administradores.findIndex((admin) => admin.id == id);

  if (indexUsuario !== -1) {
    administradores[indexUsuario] = {
      id: administradores[indexUsuario].id,
      ...novasInfos
    }

    fs.writeFileSync(
      "./databases/Administradores.json",
      JSON.stringify(administradores, null, 4)
    );
    return true;
  } else {
    return false;
  }
}

function removeAdmin(id){

  if(administradores.length == 1){
    return false
  }

  const indexUsuario = administradores.findIndex(admin => admin.id == id)
  if(indexUsuario != -1){
    const usuarioRemovido = administradores.splice(indexUsuario, 1)
    fs.writeFileSync(
      "./databases/Administradores.json",
      JSON.stringify(administradores, null, 4)
    );

    return true

  } else{
    return false
  }

}

module.exports = {
  buscaAdmin,
  buscaAdminId,
  listaUsuariosAdmin,
  salvaAdmin,
  removeAdmin
};
