import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { hashPassword, comparePassword } from '../../utils/hashPassword'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, passwordOld, passwordNew, confirmPasswordNew } = req.body

        if (!email || !passwordOld || !passwordNew || !confirmPasswordNew) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        if (passwordNew !== confirmPasswordNew) {
            return res.status(400).json({ error: 'New passwords do not match' })
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } })

            if (!user) {
                return res.status(404).json({ error: 'User not found' })
            }

            const isPasswordValid = await comparePassword(passwordOld, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Old password is incorrect' })
            }

            const hashedPassword = await hashPassword(passwordNew)

            await prisma.user.update({
                where: { email },
                data: { password: hashedPassword },
            })

            res.status(200).json({ message: 'Password changed successfully' })
        } catch (error) {
            console.error('Error changing password:', error)
            res.status(500).json({ error: 'Internal server error' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
