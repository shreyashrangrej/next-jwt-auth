import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../prisma';

export default async function authenticate(token: string) {
    const tokenCode = token.split(' ')[1]
    if (!tokenCode) {
        return null
    }
    try {
        const decoded = jwt.verify(tokenCode, process.env.JWT_SECRET as string) as JwtPayload;
        if (!decoded) {
            return null
        }
        const user = await prisma.user.findUnique({
            where: {
                email: decoded.userId,
            },
        })

        if (!user) {
            return null
        }
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}