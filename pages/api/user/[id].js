import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient()

export default async function handler(req,res){
    const {query:{id},method}=req

    const allUsers= await prisma.user.findFirst({
        where:{
            username,
            pwd:password
        }
    })

    res.status(200).json(allUsers)
}