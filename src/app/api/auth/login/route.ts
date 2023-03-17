import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
    const body = await request.json()
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
        return (NextResponse.json({ token }));
    } catch (err: any) {
        return (NextResponse.json(err.message));
    }
}

