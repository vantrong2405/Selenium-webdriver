import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phoneNumber: true
                }
            })
            res.status(200).json(users)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Lỗi server' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
