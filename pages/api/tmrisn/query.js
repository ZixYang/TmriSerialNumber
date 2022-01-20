import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export default function handler(req,res){
    let {page,size,city} = req.query
    if(!page){
        page=1
    }
    if(!size){
        size=10
    }

    const list=prisma.serialNumber.findMany({
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

    res.json(list)
}