import {NextResponse} from 'next/server'
import {getToken} from "next-auth/jwt"
//中间件  用户登录鉴权（放到每个需要登录授权的路由文件夹下）
export default async function checkAuth(req) {
    //获取token
    const session = await getToken({
        req,
        secret: process.env.SECRET,
        secureCookie:
            process.env.NEXTAUTH_URL?.startsWith("https://") ??
            !!process.env.VERCEL_URL,
    })
    //未授权，跳转到登录页面
    console.log('current session:',session)
    if (!session) {
        console.log('auth pass!')
        return NextResponse.redirect("/login")
    } else {
        console.log('auth denied!')
        NextResponse.next()
    }
}