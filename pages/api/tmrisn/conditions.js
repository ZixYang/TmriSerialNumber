import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export default async function handler(req,res){
    
    let list= await prisma.serialNumber.findMany({
        select:{
            city:true,
            organization:true
        }
    })

    res.json({
        cities: [...new Set(list.map(item=> item.city))],
        orgs:[...new Set(list.map(item=>item.organization))]
    })
}