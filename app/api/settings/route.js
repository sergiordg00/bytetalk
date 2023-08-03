import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/services/getCurrentUser";

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { name, image } = body;

    if(!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { name: name, image: image }
    });

    return NextResponse.json(updatedUser);
  } catch(err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}