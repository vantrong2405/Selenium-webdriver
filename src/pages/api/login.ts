import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { comparePassword } from '@/utils/hashPassword'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body

        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (!user) {
                res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' })
                return
            }

            const isPasswordValid = comparePassword(password, user.password)

            if (!isPasswordValid) {
                res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' })
                return
            }

            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber
            })
        } catch (error) {
            res.status(500).json({ error: 'Lỗi server' })
        }
    } else if (req.method === 'GET') {
        const { email } = req.query

        try {
            const user = await prisma.user.findFirst({
                where: { email: email as string }
            })

            if (!user) {
                res.status(404).json({ status: false })
                return
            }

            res.status(200).json({
                status: true
            })
        } catch (error) {
            res.status(500).json({ error: 'Lỗi server' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}
