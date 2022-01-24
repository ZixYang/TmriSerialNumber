import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import {getUserByName} from "../../../components/user/get"

//配置next-auth，参考https://next-auth.js.org/configuration/options
export default NextAuth({
    // provider配置凭证登录
    providers: [
        CredentialsProvider({
            name: 'login',
            async authorize(credentials, req) {//具体授权逻辑
                const user = await getUserByName(credentials.userName)
                console.log(user)
                if(user?.pwd===credentials.password){
                    return {name:user.userName}
                }
                return {status:'reject'}
            }
        })
    ],
    secret: process.env.SECRET,

    session: {
        strategy: "jwt",
    },
    jwt: {},
    pages: {//自定义界面 ，可配置signIn，signOut，error，verifyRequest，newUser
        signIn: '/login',
    },
    callbacks: {//回调函数
        async signIn({ user, account, profile, email, credentials }) {
            
            //登录回调，如果authorize不成功，重定向到login界面，并附带错误信息参数
            if(user?.status==='reject'){
                return '/login/?msg=invalid'
            }
            return '/tmrisn'
        },
        // async redirect({ url, baseUrl }) {//不设置回调，直接默认使用url
        // url一般为被中间件拦截之前的目标url，例如：localhost:3000/management/index，baseurl为localhost:3000，如果url不包含baseUrl，大概率是signIn回调函数重定向页面
        //   if (url.startsWith(baseUrl)) return url
        //   else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
        // },
        // async session({session, token, user}) {
        //     return session
        // },
        // async jwt({token, user, account, profile, isNewUser}) {
        //     return token
        // }
    },
    events: {},
    theme: {colorScheme: "light"},
    debug: false,
})