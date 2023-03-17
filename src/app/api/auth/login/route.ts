import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    const body = await request.json()
    const user = await prisma.user.findUnique({ where: { email: body.email } })
    if (!user) {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    } else if (user.emailVerified == false) {
        return NextResponse.json({ message: "Please verify your email befor login." }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(body.password, user.password)
    if (!isMatch) {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    const token = jwt.sign({ userId: body.email }, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    })
    try {
        const updatedUser = await prisma.user.update({
            where: {
                email: body.email,
            },
            data: {
                token: token,
            },
        });
        return NextResponse.json({ token });
    } catch (err: any) {
        return NextResponse.json(err.message);
    }
}