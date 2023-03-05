import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }) {
    try {
        const findOne = await prisma.role.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })
        return NextResponse.json(findOne)
    } catch (err) {
        return NextResponse.json(err.message)
    }
}

export async function PUT(request: Request, { params }) {
    try {
        const updateOne = await prisma.role.update({
            where: {
                id: parseInt(params.id)
            },
            data: await request.json()
        })
        return NextResponse.json(updateOne)
    } catch (err) {
        return NextResponse.json(err.message)
    }
}

export async function DELETE(request: Request, { params }) {
    try {
        const deleteOne = await prisma.role.delete({
            where: {
                id: parseInt(params.id)
            },
        })
        return NextResponse.json(deleteOne)
    } catch (err) {
        return NextResponse.json(err.message)
    }
}