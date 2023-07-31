import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    
    if(!name || !email || !password) {
      return new NextResponse("Missing fields", {
        status: 400
      });
    }
  
    const hashedPassword = await bcrypt.hash(password, 12);
  
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword
      }
    });
  
    return NextResponse.json(user);
  } catch(error) {
    console.log(JSON.stringify(error), 'REGISTRATION_ERROR');

    return new NextResponse(error?.meta?.target === "User_email_key" ? "User already exists!" : "Internal server error", {
      status: 500
    });
  }
}