import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'
import authenticate from '@/libs/middleware/auth'

export async function GET(request: Request) {
    const headers = new Headers(request.headers)
    const token = headers.get('authorization') as string
    const auth = await authenticate(token, ['user', 'admin'])
    if(!auth){
        return NextResponse.json({message: 'Unauthorized'})
    } else {
        return NextResponse.json(auth)
    }
}