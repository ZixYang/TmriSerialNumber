import { PrismaClient } from "@prisma/client"

const prisma=new PrismaClient()

export default async function handler(req,res){
    console.log('req:',req)
    const {userName,realName,password,email,phone}=req.body

    const entity= await prisma.user.create({
        data:{
            userName,
            realName,
            pwd:password,
            phone,
            email
        }
    })

    res.status(200).json(entity?{code:1,msg:"成功"}:{code:0,msg:"注册失败"})
}
