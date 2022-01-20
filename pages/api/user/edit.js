import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient()

export default async function handler(req,res){
    console.log('req:',req.data)
    const {username,password}=req.data

    const entity= await prisma.user.findFirst({
        where:{
            userName:username,
            pwd:password
        }
    })

    res.status(200).json(entity?{code:1,msg:""}:{code:0,msg:"登录失败"})
}
