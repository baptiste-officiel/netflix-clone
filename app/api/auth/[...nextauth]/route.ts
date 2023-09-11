import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import { PrismaClient } from '@prisma/client'
import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'

// const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials){

                // Check if email or password is valid 
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                
                // Check if the user exists 
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user) {
                    return null
                }

                // Check to see if password match 
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword as string)

                if (!passwordMatch) {
                    return null;
                }

                // return user if everything is ok 
                return user
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }