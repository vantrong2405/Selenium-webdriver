import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../../utils/hashPassword';

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { fullname, email, password, phoneNumber } = req.body

        const hashedPassword = await hashPassword(password)

        try {
            const user = await prisma.user.create({
                data: {
                    name: fullname,
                    email,
                    password: hashedPassword,
                    phoneNumber
                }
            })
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: 'Email đã tồn tại' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
