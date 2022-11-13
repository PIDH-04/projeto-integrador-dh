const path = require('path')
const express = require('express');
const app = express();

// Define a pasta public como pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Definir rotas



// Servidor rodando
app.listen(3000, () => {
    console.log('Servidor rodando')
})

