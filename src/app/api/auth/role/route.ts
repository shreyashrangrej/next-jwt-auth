import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const findAll = await prisma.role.findMany()
        return NextResponse.json(findAll)
    } catch(err) {
        return NextResponse.json(err)
    }
    
}

export async function POST(request: Request) {
    try {
        const createOne = await prisma.role.create({
            data: await request.json()
        })
        return NextResponse.json(createOne)
    } catch(err) {
        return NextResponse.json(err)
    }
}