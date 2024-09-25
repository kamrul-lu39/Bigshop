// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import prisma from '../../lib/prisma'; // Assuming you have Prisma set up

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user in the database
    try {
      await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      return res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
