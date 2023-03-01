const produtosSite = require('../databases/Produtos.json');



function listarProdutos() {
    return produtosSite;


}



function produtoId(id) {
    const produto = produtosSite.find(c => c.id === id);
    if (produto) {
      return produto;
    } else {
      return null;
    }
  }
  
  // Teste: a função retorna o produto correto com base no ID
  const produto = produtoId(5);
  if (produto) {
    console.log(`O produto com ID ${produto.id} é ${produto.nome}`);
  } else {
    console.log("Não foi possível encontrar o produto com o ID fornecido.");
  }










  function criarProduto(produto) {

    // Encontra o último ID dos produtos existentes e adicionar 1 para gerar um novo ID
    const ultimoID = produtosSite.length > 0 ? Math.max(...produtosSite.map(p => p.id)) : 0;
    const id = ultimoID + 1;

    // Adiciona o ID ao objeto de produto
    produto.id = id;

    // Adiciona o produto ao array de produtos
    produtosSite.push(produto);

    // Retorna o produto criado
    return produto;
}

// Criar um novo produto para ser adicionado ao array de produtos existentes
const novoProduto = { nome: "Novo produto", preco: 24.99 };

// Chamar a função criarProduto e passar o novo produto como parâmetro
const produtoCriado = criarProduto(novoProduto);

// Verifica se o produto foi criado e adicionado ao array de produtos
if (produtoCriado && produtosSite.includes(produtoCriado)) {
    console.log(`O produto ${produtoCriado.nome} foi criado e adicionado ao array de produtos.`);
} else {
    console.log("Ocorreu um erro ao criar o produto.");
}






function categoria() {
    const produtosCategorias = produtos.filter(p => p.categoria === categoria);

    return produtosCategorias;

}




function editarProduto(id, novoProduto) {
    
    // Encontrar o índice do produto a ser editado pelo ID
    const index = produtosSite.findIndex(p => p.id === id);
    if (index !== -1) {
       
        // Atualizar o produto com os dados do novo produto
        const produtoAtualizado = {
            ...produtosSite[index],
            ...novoProduto
        };
        
        // Substituir o produto antigo pelo produto atualizado no array de produtos
        produtosSite[index] = produtoAtualizado;
        
        // Escrever os dados atualizados no arquivo JSON
        fs.writeFileSync('./databases/Produtos.json', JSON.stringify(produtosSite));
        
        // Retornar o produto atualizado
        return produtoAtualizado;
    } else {
       
        // Retornar null se não encontrar o produto a ser editado
        return null;
    }
}













function listar() {
    return produtos;

}








module.exports = {
    Produtos: categorias,
    produtosSite
}