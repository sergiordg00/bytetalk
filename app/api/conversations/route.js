import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
import getCurrentUser from "@/services/getCurrentUser";

export async function POST(req) {
  try {
    const user = await getCurrentUser(req);
    const body = await req.json();
    const { userId, isGroup, members, name } = body;

    if(!user?.id || !user?.email) {
      return new NextResponse("Unauthorized", {
        status: 401
      });
    }

    if(isGroup && (!members || !name || members.length < 1)) {
      return new NextResponse("Invalid data", {
        status: 400
      });
    }

    if(isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map(member => ({
                id: member.value
              })),
              {
                id: user.id
              }
            ]
          }
        },
        include: {
          users: true // This populates the users array
        }
      });

      newConversation.users.forEach((user) => {
        if(user.email) {
          pusherServer.trigger(user.email, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
    } else {
      const existingConversations = await prisma.conversation.findMany({
        where: {
          OR: [
            {
              userIds: {
                equals: [user.id, userId]
              }
            },
            {
              userIds: {
                equals: [userId, user.id]
              }
            }
          ]
        }
      });

      const singleConversation = existingConversations[0];

      if(singleConversation) {
        return NextResponse.json(singleConversation);
      } else {
        const newConversation = await prisma.conversation.create({
          data: {
            users: {
              connect: [
                {
                  id: user.id
                },
                {
                  id: userId
                }
              ]
            }
          },
          include: {
            users: true // This populates the users array
          }
        });

        newConversation.users.forEach((user) => {
          if(user.email) {
            pusherServer.trigger(user.email, "conversation:new", newConversation);
          }
        });

        return NextResponse.json(newConversation);
      }
    }

  } catch(error) {
    return new NextResponse("Internal server error", {
      status: 500
    });
  }
}
