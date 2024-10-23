const express = require('express');
//const { v4: uuidv4 } = require('uuid'); // Importar uuid para gerar GUIDs
const { randomUUID } = require('crypto'); 

const app = express();
app.use(express.json()); // Middleware para interpretar JSON

// Array para armazenar as pessoas
let pessoas = [];

// Rota GET: Retorna a lista de pessoas
app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

// Rota POST: Adiciona uma nova pessoa ao array
app.post('/pessoas', (req, res) => {
    const { nome, celular } = req.body;
    const novaPessoa = {
        id: randomUUID(), // Gera um GUID para o ID
        nome,
        celular
    };
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa); // Retorna a pessoa criada com status 201 (Criado)
});

// Rota PUT para atualizar uma pessoa existente (usando o ID)
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

// Rota DELETE para excluir uma pessoa pelo ID
app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const pessoaIndex = pessoas.findIndex(pessoa => pessoa.id === id);

    if (pessoaIndex !== -1) {
        // Remove a pessoa do array
        pessoas.splice(pessoaIndex, 1);
        res.status(204).send(); // 204 No Content para uma exclusão bem-sucedida
    } else {
        res.status(404).json({ message: 'Pessoa não encontrada' });
    }
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta: 3000');
});
