import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

interface Params {
    id: number
}

export async function GET(request: Request, { params }: { params: Params }) {
    try {
        const findOne = await prisma.role.findUnique({
            where: {
                id: params.id
            }
        })
        return NextResponse.json(findOne)
    } catch (err: any) {
        return NextResponse.json(err.message)
    }
}

export async function PUT(request: Request, { params }: { params: Params }) {
    try {
        const updateOne = await prisma.role.update({
            where: {
                id: params.id
            },
            data: await request.json()
        })
        return NextResponse.json(updateOne)
    } catch (err: any) {
        return NextResponse.json(err.message)
    }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
    try {
        const deleteOne = await prisma.role.delete({
            where: {
                id: params.id
            },
        })
        return NextResponse.json(deleteOne)
    } catch (err: any) {
        return NextResponse.json(err.message)
    }
}