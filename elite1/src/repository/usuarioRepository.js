import { conexao } from "./connection.js";

export async function inserirUsuario(usuario) {
    const comando =
    `INSERT INTO tb_usuario (nm_usuario, ds_email, ds_telefone, ds_cpf, ds_cnh)
            VALUES (?, ?, ?, ?, ?)`
    
    const [resposta] = await conexao.query(comando, [usuario.nome, usuario.email, usuario.telefone, usuario.cpf, usuario.cnh]);
    return usuario;
}

export async function listarUsuario() {
    const comando =
    `SELECT nm_usuario      as nome,
            ds_email        as email,
            ds_telefone     as telefone,
            ds_cpf          as cpf,
            ds_cnh          as cnh,
            id_usuario      as id
        FROM tb_usuario`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function buscarPorNome(nome) {
    const comando = 
    `SELECT nm_usuario      as nome 
        FROM tb_usuario
            WHERE nm_usuario LIKE ?`
    
    const [resposta] = await conexao.query(comando, [nome]);
    return resposta[0];
}

export async function alterarCadUsuario(id, usuario) {
    const comando = 
    `UPDATE tb_usuario
        SET nm_usuario  = ?,
            ds_email    = ?,
            ds_telefone = ?,
            ds_cpf		= ?,
            ds_cnh		= ?,
            id_usuario  = ?
	    WHERE id_usuario = ?`

    const [resposta] = await conexao.query(comando, [usuario.nome, usuario.email, usuario.telefone, usuario.cpf, usuario.cnh,usuario.id, id]);
    return usuario;
}


export async function deletarUsuario(id) {
    const comando = 
    `DELETE FROM tb_usuario
            WHERE id_usuario = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta;
}