import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import sendVerification from "@/app/util/emailFunctions/sendVerification"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const password = generatePassword(10);
        body.password = password
        const hashedPassword = await bcrypt.hash(password, 10)
        const role = await prisma.role.findUnique({
            where: {
                name: body.role
            }
        })
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                role: { connect: { id: role?.id } },
                profile: {
                    create: {
                        firstName: body.firstName,
                        lastName: body.lastName
                    }
                }
            }
        })
        sendVerification(user, body)
        return NextResponse.json(user)
    } catch (err: any) {
        return NextResponse.json(err.message)
    }
}

function generatePassword(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomBytes = crypto.randomBytes(length);
    const password = Array.from(new Array(length), (_, i) => chars[randomBytes[i] % chars.length]).join('');
    return password;
}