const produtosSite = require('../databases/Produtos.json');
const fs = require('fs');

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
    "id": "Cadeira Saarinen- teste",
    "nome":"Cadeira Saarinen",
    "img":["/img/cadeira-saarinen-preta.jpg", "/img/cadeira-saarinen-branca.jfif", "/img/cadeira-saarinen-bege.jfif"],
    "categoria":"Cadeiras",
    "area": "interna",
    "material":["madeira", "acetato"],
    "cores":["branco", "preto", "bege"],
    "preco":100,
    "descricao":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.",
    "medidas": {
        "comprimento": 0.8,
        "largura": 0.8,
        "altura":0.8
    }
}

// Chamar a função 'editarProduto' passando o ID do produto a ser editado e o novo objeto de produto
const produtoAtualizado = editarProduto("Cadeira Saarinen", novoProduto);

// Imprimir o produto atualizado no console
console.log(produtoAtualizado);