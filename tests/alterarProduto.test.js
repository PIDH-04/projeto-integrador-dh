const produtosSite = require("../databases/Produtos.json"); // importar o arquivo JSON com os produtos existentes

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
fs.writeFileSync('../databases/Produtos.json', JSON.stringify(produtosSite));
}

// Definir um novo objeto de produto com as informações atualizadas
const novoProduto = {
id: 3,
nome: 'Produto atualizado',
preco: 12.34,
};

// Chamar a função 'alterarProduto' passando o ID do produto a ser alterado e o novo objeto de produto
alterarProduto(3, novoProduto);

// Testar se a alteração foi realizada corretamente imprimindo o conteúdo do arquivo 'Produtos.json' no console

const dadosAtualizados = require("../databases/Produtos.json");
console.log(dadosAtualizados); // Exibe o conteúdo do arquivo Produtos.json atualizado no console.