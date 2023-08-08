import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import getCurrentUser from "@/services/getCurrentUser";

export async function POST(req) {
  try {
    const currentUser = await getCurrentUser(req);
    const body = await req.json();
    const { message, image, conversationId, reply } = body;
    const replyData = reply ? JSON.stringify({
      id: reply.id,
      body: reply.body,
      image: reply.image,
      sender: {
        email: reply.sender.email,
        name: reply.sender.name
      },
    }) : undefined;

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
        reply: replyData,
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      },
      include: {
        sender: {
          select: {
            email: true,
            name: true,
            image: true
          }
        },
        seen: true,
      }
    });

    const updatedConversation = await prisma.conversation.update({
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

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.forEach((user) => {
      pusherServer.trigger(user.email, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
        type: "new"
      });
    });

    return NextResponse.json(newMessage);
  } catch(error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}