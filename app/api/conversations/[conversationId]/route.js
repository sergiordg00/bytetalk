import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import getCurrentUser from "@/services/getCurrentUser";

export async function DELETE(req, { params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser(req);

    if(!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if(!conversation) {
      return new NextResponse("Invalid id", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        }
      }
    });

    conversation.users.forEach(user => {
      pusherServer.trigger(user.email, "conversation:remove", conversation);
    });

    return NextResponse.json(deletedConversation);
  } catch(err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}