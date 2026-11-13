import {DeletarFuncionario} from "./services/deletefuncionario"

export async function DeletaFuncionario(req,res) {
    try {
        const dltfuncionario = await DeletarFuncionario(req.body);

        return res.status(200).json({
            message: "Funcionario deletado com sucesso"
        })
    }
    catch(erro) {
        return res.status(400).json({
            erro: erro.message
        })
    }
};