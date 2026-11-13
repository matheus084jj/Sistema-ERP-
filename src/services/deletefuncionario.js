import {prisma} from "../config/prisma.js";
export default  async function DeletarFuncionario(id) {
    const funcionario =  await prisma.funcionario.delete({
        where: {
            id: id
        }
    })
}