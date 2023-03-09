import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import sendVerification from "@/app/util/emailFunctions/sendVerification"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const role = await prisma.role.findUnique({
            where: {
                name: body.role
            }
        })

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                role: { connect: { id: role?.id } }
            }
        })
        sendVerification(user)
        return NextResponse.json(user)
    } catch (err: any) {
        return NextResponse.json(err.message)
    }
}
