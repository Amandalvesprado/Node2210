const express = require('express');
const { randomUUID } = require('crypto'); 

const app = express();
app.use(express.json()); 

let pessoas = [];

//  GET
app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

//  POST
app.post('/pessoas', (req, res) => {
    const { nome, celular } = req.body;
    const novaPessoa = {
        id: randomUUID(), 
        nome,
        celular
    };
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);

//  PUT
app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, celular } = req.body;

    const pessoaIndex = pessoas.findIndex(pessoa => pessoa.id === id);
    if (pessoaIndex !== -1) {
        // Atualiza os dados da pessoa
        pessoas[pessoaIndex] = { id, nome, celular };
        res.json(pessoas[pessoaIndex]);
    } else {
        res.status(404).json({ message: 'Pessoa não encontrada' });
    }
});

//  DELETE 
app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const pessoaIndex = pessoas.findIndex(pessoa => pessoa.id === id);

    if (pessoaIndex !== -1) {
       
        pessoas.splice(pessoaIndex, 1);
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: 'Pessoa não encontrada' });
    }
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta: 3000');
});
