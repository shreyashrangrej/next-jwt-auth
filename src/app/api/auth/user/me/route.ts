import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'
import authenticate from '@/libs/middleware/auth'

export async function GET(request: Request) {
    const headers = new Headers(request.headers)
    const token = headers.get('authorization') as string
    const auth = authenticate(token)
    try {
        const findAll = await prisma.user.findMany()
        return NextResponse.json(findAll)
    } catch(err) {
        return NextResponse.json(err)
    }
}