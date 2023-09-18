import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

type bodyType= {
    name: string,
    email: string,
    password: string
}

export async function POST(
    request: Request
) {
    const body: bodyType = await request.json();
    const {
        name,
        email,
        password
    } = body;
    console.log("🚀 ~ file: route.ts:5 ~ body:", body)

    // check if all fields are filled in 
    if (!name || !email || !password) {
        return new NextResponse("Missing name, email or password", {status: 400})
    }
    
    // check if user already exists 
    const exist = await prisma?.user.findUnique({
        where: {
            email: email
        }
    })
    if (exist) {
        return new NextResponse("User already exists", {status: 400})        
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma?.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    return NextResponse.json(user)
}