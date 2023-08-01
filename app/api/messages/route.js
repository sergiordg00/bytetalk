import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/services/getCurrentUser";

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser(req);
    const body = await req.json();
    const { message, image, conversationId } = body;

    if(!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!message && !image) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId
          }
        },
        sender: {
          connect: {
            id: currentUser.id
          }
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      },
      include: {
        sender: true,
        seen: true
      }
    });

    const updatedConverstion = await prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    });

    return NextResponse.json(newMessage);
  } catch(error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}