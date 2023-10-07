import { conexao } from "./connection.js";



export async function inserirVeiculo(veiculo) {
    const comando = 
    `INSERT INTO tb_locacao (id_tipo_veic, ds_modelo, ds_marca, nr_ano, ds_placa)
            VALUES (?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [veiculo.tipo, veiculo.modelo, veiculo.marca, veiculo.ano, veiculo.placa]);
    veiculo.id = resposta.insertId;
    return veiculo;
}



export async function listarVeiculo() {
    const comando = 
    `SELECT 	id_veiculo 	as id,
                ds_modelo 	as modelo, 
                ds_marca  	as marca, 
                nr_ano	 	as ano, 
                ds_tipo   	as tipo, 
                ds_placa  	as placa
        FROM tb_locacao
            INNER JOIN tb_tipo_veic ON tb_tipo_veic.id_tipo_veic = tb_locacao.id_tipo_veic`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function alterarVeiculo(id, veiculo) {
    const comando = 
    `UPDATE tb_locacao
        SET ds_modelo 	= ?,
            ds_marca 	= ?,
            nr_ano 		= ?,
            ds_placa 	= ?,
            id_veiculo 	= ?
        WHERE id_veiculo = ?`

        const [resposta] = await conexao.query(comando, [veiculo.modelo, veiculo.marca, veiculo.ano, veiculo.placa, veiculo.id, id]);
        return veiculo;
}

export async function buscarPorNMP(modelo, marca, placa) {
    const comando = 
    `SELECT id_veiculo,
            ds_modelo, 
            ds_marca, 
            nr_ano, 
            ds_tipo, 
            ds_placa  
            FROM tb_locacao
                INNER JOIN tb_tipo_veic ON tb_tipo_veic.id_tipo_veic = tb_locacao.id_tipo_veic
                    WHERE ds_modelo = ? OR ds_marca = ? OR ds_placa = ?`

    const [resposta] = await conexao.query(comando, [modelo, marca, placa]);
    return resposta;
}

export async function deletarVeiculo(id) {
    const comando = 
    `DELETE FROM tb_locacao
	        WHERE id_veiculo = ?`
    
    const [resposta] = await conexao.query(comando, [id]);
    return resposta;
}