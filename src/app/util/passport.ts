import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import prisma from '@/libs/prisma'
import bcrypt from 'bcrypt'

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async (email, password, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                })
                if (!user) {
                    return done(null, false, { message: 'Email not found' });
                }
                const passwordsMatch = await bcrypt.compare(password, user.password)

                if (!passwordsMatch) {
                  return done(null, false, { message: 'Incorrect password' })
                }

                return done(null, user)
            } catch (err) {
                done(err)
            }
        }
    )
)

export default passport