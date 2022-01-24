import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export default async function handler(req,res){
    let {page,size,city} = req.query
    if(!page){
        page=1
    }
    if(!size){
        size=10
    }
    try{
        let list= await prisma.serialNumber.findMany({
            skip:(page-1) * size,
            take: size,
            where:{
                city:{
                    contains:city
                }
            },
            orderBy:{
                snType:"asc"
            }
        })
    
        res.json({code:1,msg:"成功",data:list})
    }catch(e){
        res.json({code:0,msg:e.message})
    }
    
}