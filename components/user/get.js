import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export const getUserByName = (userName)=>{
    const user=prisma.user.findFirst({
        where:{
            userName
        }
    })
    return user;
}