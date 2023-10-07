import { alterarCadUsuario, buscarPorNome, deletarUsuario, inserirUsuario, listarUsuario } from "../repository/usuarioRepository.js";

import { Router } from "express";
const server = Router();

server.post('/usuario', async (req, resp) => {
    try {
        const inserir = req.body;
        const usuarioInserido = await inserirUsuario(inserir);
        resp.send(usuarioInserido);
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
        
    }
})

server.get('/usuario', async (req, resp) =>{
    try {
        const dados = await listarUsuario();
        resp.send(dados);
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
        
    }
})

server.get('/usuario/buscar', async (req, resp) => {
    try {
        const nome = req.query.nome;
        const dados = await buscarPorNome(nome);
        resp.send(dados);
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.put('/usuario/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const usuarioAlterado = req.body;
        const resposta = await alterarCadUsuario(id, usuarioAlterado);
        resp.status(200).send(resposta);
    } catch (error) {
        
    }
})


server.delete('/usuario/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarUsuario(id);
        resp.status(200).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        
    }
})

export default server;
