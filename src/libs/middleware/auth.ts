import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../prisma';

export default async function authenticate(token: string, allowedRoles: string[]) {
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
            select: {
                id: true,
                email: true,
                role: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                emailVerified: true,
                profile: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
        })
        if (!user) {
            return null
        }
        if (allowedRoles.includes(user.role.name)) {
            return user
        } else {
            return null
        }
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}