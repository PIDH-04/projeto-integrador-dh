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

app.get('/loginEmail', (req , res)=>{
return res.sendFile(__dirname + '/views/loginEmail.html')
});

app.get('/banana', (req , res)=>{ //isso é o que tem estar na url
    return res.sendFile(__dirname + '/views/cadastro.html')
    });





// Servidor rodando
app.listen(3000, () => {
    console.log('Servidor rodando')
})

