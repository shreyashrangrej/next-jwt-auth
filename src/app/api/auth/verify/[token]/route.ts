import jwt, { JwtPayload } from 'jsonwebtoken'
import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"

interface Params {
    token: string
}

export async function GET(request: Request, { params }: { params: Params }) {
    let decoded: JwtPayload | string
    try {
        decoded = jwt.verify(params.token, process.env.JWT_SECRET as string)
    } catch (err) {
        return NextResponse.json({message: 'Invalid token'})
    }

    if (typeof decoded === 'string') {
        return NextResponse.json({message: 'Invalid token'})
    } else {
        const verifyEmail = await prisma.user.update({
            where: {
                id: decoded.userId
            },
            data: {
                emailVerified: true
            },
        })
        if (!verifyEmail) {
            return NextResponse.json({message: 'User not Found'})
        }
        return NextResponse.json({message: 'Email verified successfully'})
    }
}