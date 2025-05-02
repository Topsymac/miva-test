import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

// Sample mock database
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    username: 'admin',
    password: 'admin123', 
  },
]

// Handle POST /api/auth/login
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { username, password } = body

  // Match against mock user
  const user = mockUsers.find(
    u => u.username === username && u.password === password
  )

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  // Sign a JWT
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
    },
    process.env.JWT_SECRET!, // must be set in your .env.local
    { expiresIn: '1h' }
  )

  return NextResponse.json({
    message: 'Login successful',
    data: {
      token,
      user,
    },
  })
}
