import {prisma} from "../config/prisma.js";
import bcrypt from "bcrypt";

export async function cadastrarFuncionario(dados) {

    // Verificar se o email já existe
    const usuarioExiste = await prisma.usuario.findUnique({
        where: {
            email: dados.email
        }
    });

    if (usuarioExiste) {
        throw new Error("Este email já está cadastrado.");
    }

    // Criptografar senha
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    // Criar usuário e funcionário juntos
    const funcionario = await prisma.usuario.create({
        data: {
            nome: dados.nome,
            email: dados.email,
            senha: senhaHash,
            perfil: dados.perfil || "FUNCIONARIO",

            empresa: {
                connect: {
                    id: dados.empresaId
                }
            },

            funcionario: {
                create: {
                    cpf: dados.cpf,
                    telefone: dados.telefone,
                    endereco: dados.endereco,
                    salario: dados.salario,
                    dataAdmissao: new Date(),
                    
                    cargo: dados.cargoId
                        ? { connect: { id: dados.cargoId } }
                        : undefined,

                    departamento: dados.departamentoId
                        ? { connect: { id: dados.departamentoId } }
                        : undefined
                }
            }
        },
        include: {
            funcionario: true
        }
    });

    // Não devolver a senha
    const { senha, ...usuarioSemSenha } = funcionario;

    return usuarioSemSenha;
}
