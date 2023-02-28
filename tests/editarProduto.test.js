const produtosSite = require('../databases/Produtos.json');

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

 // Criar um novo objeto de produto com as informações atualizadas
const novoProduto = {
 nome: 'Produto atualizado',
 categoria: 'Categoria atualizada',
 preco: 12.34
};

// Chamar a função 'editarProduto' passando o ID do produto a ser editado e o novo objeto de produto
const produtoAtualizado = editarProduto(1, novoProduto);

// Imprimir o produto atualizado no console
console.log(produtoAtualizado);