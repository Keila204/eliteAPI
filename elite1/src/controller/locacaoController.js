import { alterarVeiculo, buscarPorNMP, deletarVeiculo, inserirVeiculo, listarVeiculo } from '../repository/locacaoRepository.js';
import { buscarTipoPorId } from '../repository/tipoVeiculoRepository.js';


import {Router} from 'express';
const server = Router();

server.post('/veiculo', async (req, resp) =>{
    try {
        const inserir = req.body;

        if(!inserir.modelo)
            throw new Error('Modelo obrigatório.');

        if(!inserir.ano || isNaN(inserir.ano))
           throw new Error('Ano deve ser número.');

        const buscarPlaca = await buscarPorNMP(inserir.placa);
        if(buscarPlaca.length > 0)
            throw new Error('Essa placa já foi cadastrada!');

        const buscarTipoId = await buscarTipoPorId(inserir.id);
        if(buscarTipoId === 0)
            throw new Error('Tipo inválido');
        
        const veiculoInserido = await inserirVeiculo(inserir);
        resp.send(veiculoInserido);
    } catch (error) {
        resp.status(401).send({
            erro: error.message
        })
        
    }
})

server.get('/veiculo', async (req, resp) => {
    try {
        const dados = await listarVeiculo();
        resp.send(dados);
    } catch (error) {
        resp.status(401).send({
            erro: error.message
        })
    }
})

server.put('/veiculo/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const veiculoAlterado = req.body;
        const resposta = await alterarVeiculo(id ,veiculoAlterado);
        resp.send(resposta);
    } catch (error) {
        resp.status(401).send({
            erro: error.message
        })
        
    }
})

server.get('/veiculo/buscar', async (req, resp) => {
    try {
        const {modelo, marca, placa} = req.query;
        const dados = await buscarPorNMP(modelo, marca, placa);
        resp.send(dados);
    } catch (error) {
        resp.status(401).send({
            erro: error.message
        })
    }
})

server.delete('/veiculo/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarVeiculo(id);
        resp.status(201).send();
    } catch (error) {
        resp.status(401).send({
            erro: error.message
        })
    }
})

export default server;