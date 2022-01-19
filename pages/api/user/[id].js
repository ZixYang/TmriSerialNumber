import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient()

export default async function login(req,res){
    const {query:{id},method}=req

    const allUsers= await prisma.user.findFirst({
        where:{
            username,
            password
        }
    })

    res.status(200).json(allUsers)
}