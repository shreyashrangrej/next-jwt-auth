import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const findAll = await prisma.user.findMany()
        return NextResponse.json(findAll)
    } catch(err) {
        return NextResponse.json(err)
    }
}