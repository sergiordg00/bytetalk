import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import getCurrentUser from "@/services/getCurrentUser";

export async function POST(req, { params }) {
  try {
    const currentUser = await getCurrentUser(req);
    const { conversationId } = params;

    if(!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", {
        status: 401
      });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        },
        users: true
      }
    });

    if(!conversation) {
      return new NextResponse("Conversation not found", {
        status: 404
      });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if(!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: {
          select: {
            email: true,
            name: true,
            image: true
          }
        },
        seen: {
          select: {
            email: true,
            name: true
          }
        },
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    });

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage]
    });

    if(lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(conversationId, "message:update", updatedMessage);

    return NextResponse.json(updatedMessage);
  } catch(error) {
    return new NextResponse("Internal Server Error", {
      status: 500
    });
  }
}