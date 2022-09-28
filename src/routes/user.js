const express = require("express")

const user = express.Router()
const {PrismaClient} = require("@prisma/client")
const { response } = require("express")

const prisma = new PrismaClient()

// Criar usuário
user.post("/newuser", async (req, res) => {
    const { user, email, senha} = req.body
    const createUser = await prisma.users.create({data: {
        user,
        email,
        senha,
    },
});
    return res.status(201).json( {
        "status": "sucess",
        "Sucess": "Usuário criado com sucesso!"
    })
})

// Ler usuários
user.get("/listuser", async (req, res) => {
    const allUsers = await prisma.users.findMany()
    return res.status(200).json( {
        "status": "sucess",
        "Sucess": allUsers
    })
})

//Alterar usuário

user.put("/edituser", async (req, res) => {

    const { id, user, email, senha, tenant} = req.body

    if(!id){
        return res.status(400).json(
            {
                "status": "error",
                "Error": "O id é obrigatório"
            }
        )
    }

    const userExiste = await prisma.users.findUnique({
        where: { id }
    })

    if(!userExiste){
        return res.status(404).json(
            {
                "status": "error",
                "Error": "Esse Id não é associado a um usuário cadastrado"
            }
        )
    }

    const users = await prisma.users.update({
        where: {
            id
        },
        data:{
            user,
            email,
            senha,
            tenant
        },
    });

    return res.status(200).json(
        {
            "status": "sucess",
            "Sucess": "Usuário alterado com sucesso!"
        })
})

// Deletar Usuário

user.delete("/deleteuser/:id", async (req, res) => {
    const { id } = req.params;
    const intId = parseInt(id);

    if(!intId){
        return res.status(400).json(
            {
                "status": "error",
                "Error": "O id é obrigatório"
            }
        )
    }

    const userExiste = await prisma.users.findUnique({
        where: { id: intId }
    })

    if(!userExiste){
        return res.status(404).json(
            {
                "status": "error",
                "Error": "Esse Id não é associado a um usuário cadastrado"
            }
        )
    }

    await prisma.users.delete({
        where: { id: intId }
    })

    return res.status(200).json(
        {
            "status": "sucess",
            "Sucess": "Usuário excluido com sucesso!"
        })
})

module.exports = user