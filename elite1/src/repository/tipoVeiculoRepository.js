import { conexao } from "./connection.js";

export async function buscarTipoPorId(id)
{
    const comando = 
    `SELECT ds_tipo 
        FROM tb_tipo_veic 
            WHERE id_tipo_veic = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta;
}