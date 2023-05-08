const {
  buscaAdmin,
  listaUsuariosAdmin,
  buscaAdminId,
  salvaAdmin,
  removeAdmin,
  gravaAdmin,
  salvaBanner,
  listaBanners,
  removeBanner,
  detalhaBanner,
  editaBanner,
} = require("../services/AdminServices");
const {
  listarCategorias,
  mostrarCategoriaId,
  editaCategoria,
  criaCategoria,
  deletaCategoria,
} = require("../services/CategoriasServices");
const {
  listarProdutos,
  excluirProdutoId,
  mostrarProdutoId,
  editarProduto,
  criaSlug,
  criarProduto,
} = require("../services/ProdutosServices");
const { checaSenha, listarUsuarios } = require("../services/UsuariosServices");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { validationResult } = require("express-validator");
const { Administradores } = require("../databases/models");

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
  login: async (req, res) => {
    const { email, senha, target } = req.body;
    const verificaoesErros = validationResult(req);
    const queryParamsErro = target ? `target=${target}&erro=true` : "erro=true";

    if (verificaoesErros.errors.length > 0) {
      return res.redirect(`/admin?${queryParamsErro}`);
    }

    const admin = await Administradores.findOne({ where: { email: email } });
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
    const feedbackDelete = req.query.delete;
    res.render("adminProdutos", { produtos, feedbackDelete });
  },
  showPedidos: (req, res) => {
    res.render("adminPedidos");
  },
  showCriarProduto: (req, res) => {
    const categorias = listarCategorias();
    res.render("adminAddProduto", { categorias });
  },
  gravaProduto: (req, res) => {
    const produto = req.body;
    const imgs = [];

    const erros = validationResult(req);
    if (erros.errors.length > 0) {
      const categorias = listarCategorias();
      return res.render("adminAddProduto", {
        categorias,
        erros: validationResult(req).mapped(),
        produto,
      });
    }

    for (let img of req.files) {
      const imgNovoNome = `${Date.now()}-${img.originalname}`;
      fs.renameSync(img.path, `${img.destination}/${imgNovoNome}`);
      imgs.push(`/img/produtos/${imgNovoNome}`);
    }
    produto.img = imgs;
    produto.slug = criaSlug(produto.nome);
    produto.preco = parseInt(produto.preco);
    produto.medidas = {
      comprimento: parseInt(produto.comprimento),
      largura: parseInt(produto.largura),
      altura: parseInt(produto.altura),
    };

    const produtoSalvo = criarProduto(produto);

    return res.redirect(`/admin/produtos/${produtoSalvo.id}/editar?salvo=true`);
  },
  showEditarProduto: (req, res) => {
    const { id } = req.params;
    const feedbackEdicao = req.query.salvo;
    const categorias = listarCategorias();
    const produto = mostrarProdutoId(id);
    res.render("adminEditarProduto", { produto, categorias, feedbackEdicao });
  },
  editarProduto: (req, res) => {
    const { id } = req.params;
    const produto = req.body;
    produto.preco = parseInt(produto.preco);
    produto.slug = criaSlug(produto.nome);
    produto.medidas = {
      comprimento: parseInt(produto.comprimento),
      largura: parseInt(produto.largura),
      altura: parseInt(produto.altura),
    };
    const imgs = [];

    if (req.files.length > 0) {
      for (let img of req.files) {
        const imgNovoNome = `${Date.now()}-${img.originalname}`;
        fs.renameSync(img.path, `${img.destination}/${imgNovoNome}`);
        imgs.push(`/img/produtos/${imgNovoNome}`);
      }
      produto.img = imgs;
    } else {
      const produtoOriginal = mostrarProdutoId(id);
      produto.img = produtoOriginal.img;
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

    if (!produtoDeletado) {
      return res.redirect("/admin/produtos?delete=false");
    }
    return res.redirect("/admin/produtos?delete=true");
  },
  showCategorias: (req, res) => {
    const categorias = listarCategorias();
    const feedbackDelete = req.query.delete;
    res.render("adminCategorias", { categorias, feedbackDelete });
  },
  showEditarCategoria: (req, res) => {
    const { id } = req.params;
    const feedbackEdicao = req.query.salvo;
    const categoria = mostrarCategoriaId(parseInt(id));
    res.render("adminEditarCategoria", { categoria, feedbackEdicao });
  },
  editarCategoria: (req, res) => {
    const { id } = req.params;
    const infosCategoria = req.body;
    // Remover do editaCategoria a manutenção do slug
    // infosCategoria.slug = criaSlug(infosCategoria.nome)

    if (req.file !== undefined) {
      const imgNovoNome = `${Date.now()}-${req.file.originalname}`;
      fs.renameSync(req.file.path, `${req.file.destination}/${imgNovoNome}`);
      infosCategoria.icone = `/img/produtos/${imgNovoNome}`;
    } else {
      const categoriaOriginal = mostrarCategoriaId(parseInt(id));
      infosCategoria.icone = categoriaOriginal.icone;
    }
    const categoriaEditada = editaCategoria(id, infosCategoria);

    if (!categoriaEditada) {
      return res.redirect(`/admin/categorias/${id}/editar?salvo=false`);
    }
    return res.redirect(`/admin/categorias/${id}/editar?salvo=true`);
  },
  showCriarCategoria: (req, res) => {
    const feedbackEdicao = req.query.salvo;
    res.render("adminAddCategoria", { feedbackEdicao });
  },
  gravarCategoria: (req, res) => {
    const categoria = req.body;
    categoria.slug = criaSlug(categoria.nome);

    const imgNovoNome = `${Date.now()}-${req.file.originalname}`;
    fs.renameSync(req.file.path, `${req.file.destination}/${imgNovoNome}`);
    categoria.icone = `/img/produtos/${imgNovoNome}`;

    const categoriaSalva = criaCategoria(categoria);
    return res.redirect(
      `/admin/categorias/${categoriaSalva.id}/editar?salvo=true`
    );
  },
  removeCategoria: (req, res) => {
    const { id } = req.params;
    const categoriaDeletada = deletaCategoria(id);

    if (!categoriaDeletada) {
      return res.redirect("/admin/categorias?delete=false");
    }

    return res.redirect("/admin/categorias?delete=true");
  },
  showUsuarios: async (req, res) => {
    const feedbackDelete = req.query.delete;
    const feedbackCriacao = req.query.criacao
    const usuarios = await Administradores.findAll();
    res.render("adminUsuarios", { usuarios, feedbackDelete, feedbackCriacao });
  },
  showEditarUsuario: async (req, res) => {
    const feedbackEdicao = req.query.salvo;
    const { id } = req.params;
    const usuario = await Administradores.findByPk(id);
    res.render("adminEditarUsuario", { usuario, feedbackEdicao });
  },
  editarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const novasInformacoes = {
        nome: req.body.nome,
        email: req.body.email,
      };

      if (req.body.senha !== "") {
        novasInformacoes.senha = bcrypt.hashSync(req.body.senha, 8);
      }

      const usuarioSalvo = await Administradores.update(novasInformacoes, {
        where: { id: id },
      });

      if (usuarioSalvo[0] == 0) {
        throw new Error("Usuário não encontrado");
      }

      return res.redirect(`/admin/usuarios/${id}/editar?salvo=true`);
    } catch (e) {
      return res.redirect(`/admin/usuarios/${id}/editar?salvo=false`);
    }
  },
  removeUsuario: (req, res) => {
    const { id } = req.params;
    const adminRemovido = removeAdmin(id);

    if (!adminRemovido) {
      return res.redirect("/admin/usuarios?delete=false");
    }

    return res.redirect("/admin/usuarios?delete=true");
  },
  showCriaUsuario: (req, res) => {
    res.render("adminCriarUsuario", { feedbackEdicao: undefined });
  },
  gravarUsuario: async (req, res) => {
    try{
      const NovoUsuarioId = await gravaAdmin(req.body);
      return res.redirect(`/admin/usuarios/${NovoUsuarioId}/editar?salvo=true`);

    }catch(e){
      if(e.message == 'email must be unique'){
        return res.render('adminCriarUsuario', { uniqueEmailError: true, infoPassada: req.body })
      }else{
        return res.redirect((`/admin/usuarios/?criacao=false`));
      }
    }

  },
  showBanners: async (req, res) => {
    const feedbackDelete = req.query.delete;
    const banners = await listaBanners();
    return res.render("adminBanners", { feedbackDelete, banners });
  },
  showCriarBanner: (req, res) => {
    return res.render("adminAddBanner");
  },
  gravarBanner: async (req, res) => {
    const resultados = validationResult(req);
    const infosBanner = req.body;

    if (req.file) {
      const imgNovoNome = `${Date.now()}-${req.file.originalname}`;
      fs.renameSync(req.file.path, `${req.file.destination}/${imgNovoNome}`);
      infosBanner.img = `/img/banners/${imgNovoNome}`;
    }

    if (resultados.errors.length > 0) {
      return res.render("adminAddBanner", {
        erros: validationResult(req).mapped(),
        infosBanner,
      });
    }

    const bannerSalvo = await salvaBanner(infosBanner);
    return res.redirect(`/admin/banners/${bannerSalvo.id}/editar?salvo=true`);
  },
  removerBanner: async (req, res) => {
    try {
      const { id } = req.params;
      await removeBanner(id);
      return res.redirect("/admin/banners?delete=true");
    } catch (e) {
      return res.redirect("/admin/banners?delete=false");
    }
  },
  showEditarBanner: async (req, res) => {
    try {
      const { id } = req.params;
      const feedbackEdicao = req.query.salvo;
      const banner = await detalhaBanner(id);
      return res.render("adminEditarBanner", {
        infosBanner: banner,
        feedbackEdicao,
      });
    } catch (e) {
      return res.redirect("/admin/banners");
    }
  },
  editarBanner: async (req, res) => {
    try {
      const { id } = req.params;
      const infosBanner = req.body;

      if (req.file) {
        const imgNovoNome = `${Date.now()}-${req.file.originalname}`;
        fs.renameSync(req.file.path, `${req.file.destination}/${imgNovoNome}`);
        infosBanner.caminho = `/img/banners/${imgNovoNome}`;
      }

      await editaBanner(id, infosBanner);
      return res.redirect(`/admin/banners/${id}/editar?salvo=true`);
    } catch (e) {
      return res.redirect(`/admin/banners/${id}/editar?salvo=false`);
    }
  },
};

module.exports = AdminController;
