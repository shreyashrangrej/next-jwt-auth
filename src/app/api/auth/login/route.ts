import prisma from "@/libs/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { use } from "next-api-middleware"
import passport from "../../../util/passport"

interface Login {
    email: string,
    password: string
}

export const config = {
    api: {
        bodyParser: false,
    },
}

export async function POST(request: Request) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', { session: false }, async (err: any, user: any, info: any) => {
            if (err) {
                reject(err)
            } else if (!user) {
                resolve(NextResponse.json({ message: info.message }, { status: 401 }))
            } else {
                const body = await request.json()
                const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET as string, {
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
                    resolve(NextResponse.json({ token }));
                } catch (err: any) {
                    resolve(NextResponse.json(err.message));
                }
            }
        })(request)
    })
}