const { Administradores} = require('../databases/models');
const administradores = require("../databases/Administradores.json");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { Administradores, Banners } = require("../databases/models");

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
      ...novasInfos,
    };

    fs.writeFileSync(
      "./databases/Administradores.json",
      JSON.stringify(administradores, null, 4)
    );
    return true;
  } else {
    return false;
  }
}

async function removeAdmin(id) {
  const usuarioDeletado = await Administradores.destroy({ where: { id: id } });

  if (usuarioDeletado) {
  }
}

async function gravaAdmin(informacoes) {
  try{
    const senha = bcrypt.hashSync(informacoes.senha, 8);
    const novoAdmin = await Administradores.create({
      nome: informacoes.nome,
      email: informacoes.email,
      senha,
    });
    
    return novoAdmin.id

  }catch(e){
    console.log(e)
    throw new Error(e.errors[0].message)
  }
}

async function listaBanners() {
  const banners = await Banners.findAll();
  return banners;
}

async function salvaBanner(infosBanner) {
  const descricao = infosBanner.descricao !== "" ? infosBanner.descricao : null;
  const link = infosBanner.link !== "" ? infosBanner.link : null;

  const novoBanner = await Banners.create({
    nome: infosBanner.nome,
    caminho: infosBanner.img,
    descricao,
    link,
  });

  return novoBanner;
}

async function removeBanner(id) {
  try {
    await Banners.destroy({ where: { id: id } });
    return true;
  } catch (e) {
    throw new Error("Não foi possível remover o banner");
  }
}

async function detalhaBanner(id) {
  try {
    const banner = await Banners.findByPk(id);
    if (!banner) {
      throw new Error("Não foi possível encontrar o banner");
    }

    return banner;
  } catch (e) {
    throw new Error("Não foi possível encontrar o banner");
  }
}

async function editaBanner(id, novasInfos) {
  try {
    const bannerEditado = await Banners.update(novasInfos, { where: { id: id } });
    return bannerEditado;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  buscaAdmin,
  buscaAdminId,
  listaUsuariosAdmin,
  salvaAdmin,
  removeAdmin,
  gravaAdmin,
  salvaBanner,
  listaBanners,
  removeBanner,
  detalhaBanner,
  editaBanner,
};
