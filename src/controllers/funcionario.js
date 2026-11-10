
import { cadastrarFuncionario } from "../services/funcionarios.js";

export async function criarFuncionario(req, res) {
    try {

        const funcionario = await cadastrarFuncionario(req.body);

        return res.status(201).json({
            mensagem: "Funcionário cadastrado com sucesso!",
            dados: funcionario
        });

    } catch (error) {

        return res.status(400).json({
            erro: error.message
        });

    }
}
