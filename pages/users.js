import { PrismaClient } from "@prisma/client";


const Users = ({users})=>{
    return (
        <ul>
            {
            users.map(u=>{
                    <li key={u.id}>{u.userName}</li>
                })
            }
        </ul>
    )
}

export async function getStaticProps(){
    const prisma=new PrismaClient()
    const users=await prisma.user.findMany()

    return {
        props:{users}
    }
}

export default Users