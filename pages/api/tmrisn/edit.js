import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma=new PrismaClient()

export default async function handler(req,res){
    const session = getSession({req})
    if(session){
        const {id,snType,city,organization,sn} = req.body
        try {
            if(id){
                prisma.serialNumber.update({
                    where:{
                        id
                    },
                    data:{
                        snType,
                        city,
                        organization,
                        sn,
                        editTime:new Date(),
                    }
                })
                res.json({code:1,msg:"修改成功"})
            }else{
                const data=req.body;
                const result= prisma.serialNumber.create(data)
                
                console.log(result)
                res.json({code:1,msg:"新增成功"})
            }
        } catch (error) {
            res.json({code:0,msg:error.message})
        }
    }else{
        res.json({code:0,msg:'请登录后执行此操作'})
    }
    
    
    
}