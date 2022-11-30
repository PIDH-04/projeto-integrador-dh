const path = require('path')
const express = require('express');
const { dirname } = require('path');
const app = express();

// Define a pasta public como pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Definir rotas
app.get('/login', (req , res)=>{
return res.sendFile(__dirname + '/views/login.html' )

});

app.get('/checkoutpagamento', (req , res)=>{
    return res.sendFile(__dirname + '/views/checkoutPagamento.html' )
    
    });


// Servidor rodando
app.listen(3000, () => {
    console.log('Servidor rodando')
})

