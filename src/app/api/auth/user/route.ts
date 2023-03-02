import prisma from '@/libs/prisma'

export async function GET() {
    const findAll = await prisma.user.findMany()
    return new Response(JSON.stringify(findAll))
}