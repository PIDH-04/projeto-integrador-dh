const { buscaAdmin, listaUsuariosAdmin, buscaAdminId, salvaAdmin, removeAdmin, gravaAdmin } = require("../services/AdminServices");
const { listarCategorias, mostrarCategoriaId, editaCategoria, criaCategoria, deletaCategoria } = require("../services/CategoriasServices");
const {
  listarProdutos,
  excluirProdutoId,
  mostrarProdutoId,
  editarProduto,
  criaSlug,
  criarProduto,
} = require("../services/ProdutosServices");
const { checaSenha, listarUsuarios } = require("../services/UsuariosServices");
const bcrypt = require('bcrypt')
const fs = require("fs");
const { validationResult } = require('express-validator')

const AdminController = {
  showLogin: (req, res) => {
    if (req.session.adminLogado == true) {
      return res.redirect("/admin/pedidos");
    } else {
      const target = req.query.target;
      const erro = req.query.erro;
      return res.render("adminLogin", { target: target, erro: erro });
    }
  },
  login: (req, res) => {
    const { email, senha, target } = req.body;
    const verificaoesErros = validationResult(req)
    const queryParamsErro = target ? `target=${target}&erro=true` : "erro=true";
    
    if(verificaoesErros.errors.length > 0) {
      return res.redirect(`/admin?${queryParamsErro}`);
    }

    const admin = buscaAdmin(email);
    if (!admin) {
      return res.redirect(`/admin?${queryParamsErro}`);
    }

    const senhaCorreta = checaSenha(admin, senha);
    if (!senhaCorreta) {
      return res.redirect(`/admin?${queryParamsErro}`);
    }

    req.session.adminLogado = true;
    const enderecoSolicitado = target ? target : "/admin/pedidos";
    res.redirect(enderecoSolicitado);
  },
  showClientes: (req, res) => {
    const clientes = listarUsuarios();
    res.render("adminClientes", { clientes });
  },
  showProdutos: (req, res) => {
    const produtos = listarProdutos();
    const feedbackDelete = req.query.delete
    res.render("adminProdutos", { produtos, feedbackDelete });
  },
  showPedidos: (req, res) => {
    res.render("adminPedidos");
  },
  showCriarProduto: (req, res) => {
    const categorias = listarCategorias()
    res.render("adminAddProduto", { categorias });
  },
  gravaProduto: (req, res) => {
    const produto = req.body
    const imgs = []
    for(let img of req.files){
      const imgNovoNome = `${Date.now()}-${img.originalname}`;
      fs.renameSync(img.path, `${img.destination}/${imgNovoNome}`);
      imgs.push(`/img/produtos/${imgNovoNome}`)
    }
    produto.img = imgs;
    produto.slug = criaSlug(produto.nome)
    produto.preco = parseInt(produto.preco)
    produto.medidas = {
      comprimento: parseInt(produto.comprimento),
      largura: parseInt(produto.largura),
      altura: parseInt(produto.altura),
    }
    
    const produtoSalvo = criarProduto(produto)

    return res.redirect(`/admin/produtos/${produtoSalvo.id}/editar?salvo=true`)
  },
  showEditarProduto: (req, res) => {
    const { id } = req.params;
    const feedbackEdicao = req.query.salvo
    const categorias = listarCategorias();
    const produto = mostrarProdutoId(id);
    res.render("adminEditarProduto", { produto, categorias, feedbackEdicao });
  },
  editarProduto: (req, res) => {
    const { id } = req.params;
    const produto = req.body;
    produto.preco = parseInt(produto.preco);
    produto.slug = criaSlug(produto.nome)
    produto.medidas = {
      comprimento: parseInt(produto.comprimento),
      largura: parseInt(produto.largura),
      altura: parseInt(produto.altura),
    }
    const imgs = []

    if(req.files.length > 0){
      for(let img of req.files){
        const imgNovoNome = `${Date.now()}-${img.originalname}`;
        fs.renameSync(img.path, `${img.destination}/${imgNovoNome}`);
        imgs.push(`/img/produtos/${imgNovoNome}`)
      }
      produto.img = imgs;
    }else{
      const produtoOriginal = mostrarProdutoId(id)
      produto.img = produtoOriginal.img
    }
    
    const produtoAtualizado = editarProduto(id, req.body);

    if (!produtoAtualizado) {
      return res.redirect(`/admin/produtos/${id}/editar?salvo=false`);
    }

    return res.redirect(`/admin/produtos/${id}/editar?salvo=true`);
  },
  removeProduto: (req, res) => {
    const { id } = req.params;
    const produtoDeletado = excluirProdutoId(id);

    if(!produtoDeletado){
      return res.redirect("/admin/produtos?delete=false");
    }
    return res.redirect("/admin/produtos?delete=true");
  },
  showCategorias: (req, res) => {
    const categorias = listarCategorias()
    const feedbackDelete = req.query.delete
    res.render('adminCategorias', { categorias, feedbackDelete })
  },
  showEditarCategoria: (req, res) => {
    const { id } = req.params
    const feedbackEdicao = req.query.salvo
    const categoria = mostrarCategoriaId(parseInt(id));
    res.render("adminEditarCategoria", { categoria, feedbackEdicao })
  },
  editarCategoria: (req, res) => {
    const { id } = req.params
    const infosCategoria = req.body
    // Remover do editaCategoria a manutenção do slug
    // infosCategoria.slug = criaSlug(infosCategoria.nome)
   
    
    if(req.file !== undefined){
      const imgNovoNome = `${Date.now()}-${req.file.originalname}`;
      fs.renameSync(req.file.path, `${req.file.destination}/${imgNovoNome}`);
      infosCategoria.icone = `/img/produtos/${imgNovoNome}`;
    }else{
      const categoriaOriginal = mostrarCategoriaId(parseInt(id))
      infosCategoria.icone = categoriaOriginal.icone
    }
    const categoriaEditada = editaCategoria(id, infosCategoria)

    if(!categoriaEditada){
      return res.redirect(`/admin/categorias/${id}/editar?salvo=false`)
    }
    return res.redirect(`/admin/categorias/${id}/editar?salvo=true`)
  },
  showCriarCategoria: (req, res) => {
    const feedbackEdicao = req.query.salvo
    res.render('adminAddCategoria', {feedbackEdicao})
  },
  gravarCategoria: (req, res) => {
    const categoria = req.body;
    categoria.slug = criaSlug(categoria.nome)

    const imgNovoNome = `${Date.now()}-${req.file.originalname}`;
    fs.renameSync(req.file.path, `${req.file.destination}/${imgNovoNome}`);
    categoria.icone = `/img/produtos/${imgNovoNome}`;

    const categoriaSalva = criaCategoria(categoria)
    return res.redirect(`/admin/categorias/${categoriaSalva.id}/editar?salvo=true`);
  },
  removeCategoria: (req, res) => {
    const { id } = req.params
    const categoriaDeletada = deletaCategoria(id)

    if(!categoriaDeletada){
      return res.redirect('/admin/categorias?delete=false')
    }

    return res.redirect('/admin/categorias?delete=true')
  },
  showUsuarios: (req, res) => {
    const feedbackDelete = req.query.delete
    const usuarios = listaUsuariosAdmin();
    res.render('adminUsuarios', { usuarios, feedbackDelete })
  },
  showEditarUsuario: (req, res) => {
    const feedbackEdicao = req.query.salvo
    const { id } = req.params
    const usuario = buscaAdminId(id)
    res.render('adminEditarUsuario', { usuario, feedbackEdicao })
  },
  editarUsuario: (req, res) => {
    const { id } = req.params
    const novasInformacoes = {
      nome: req.body.nome,
      email: req.body.email,
    }

    if(req.body.senha == ''){
      const usuario = buscaAdminId(id)
      novasInformacoes.senha = usuario.senha
    }else{
      novasInformacoes.senha = bcrypt.hashSync(req.body.senha, 8)
    }

    const usuarioSalvo = salvaAdmin(id, novasInformacoes)

    if(!usuarioSalvo){
      return res.redirect(`/admin/usuarios/${id}/editar?salvo=false`)
    }

    return res.redirect(`/admin/usuarios/${id}/editar?salvo=true`)
  },
  removeUsuario: (req, res) =>{
    const { id } = req.params
    const adminRemovido = removeAdmin(id)

    if(!adminRemovido){
      return res.redirect('/admin/usuarios?delete=false')
    } 

    return res.redirect('/admin/usuarios?delete=true')
  },
  showCriaUsuario: (req, res) =>{
    res.render('adminCriarUsuario', {feedbackEdicao: undefined})
  },
  gravarUsuario: (req, res) => {
    const NovoUsuarioId = gravaAdmin(req.body)

    res.redirect(`/admin/usuarios/${NovoUsuarioId}/editar?salvo=true`)
  }
};

module.exports = AdminController;
