const produtosSite = require("../databases/Produtos.json"); 
const fs = require('fs');

// Definir a função 'alterarProduto', que recebe o ID do produto a ser alterado e o novo objeto de produto
function alterarProduto(id, novoProduto) {

// Percorrer o array de produtos em busca do produto com o ID informado
for (let i = 0; i < produtosSite.length; i++) {
if (produtosSite[i].id === id) {

// Produto encontrado, fazer a alteração substituindo o objeto antigo pelo novo
produtosSite[i] = novoProduto;
break;
}
}

// Escrever os dados atualizados no arquivo 'Produtos.json'
 fs.writeFileSync("./databases/Produtos.json", JSON.stringify(produtosSite));
}

// Definir um novo objeto de produto com as informações atualizadas
const novoProduto = {
    "id": "Cadeira Saarinen",
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

// Chamar a função 'alterarProduto' passando o ID do produto a ser alterado e o novo objeto de produto
alterarProduto("Cadeira Saarinen-teste", novoProduto);

// Testar se a alteração foi realizada corretamente imprimindo o conteúdo do arquivo 'Produtos.json' no console

const dadosAtualizados = require("../databases/Produtos.json");
console.log(dadosAtualizados); // Exibe o conteúdo do arquivo Produtos.json atualizado no console.