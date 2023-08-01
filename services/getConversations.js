import prisma from "@/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getConversations() {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc"
      },
      where: {
        userIds: {
          has: currentUser.id // We handle single and group conversations in this query!
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          },
        }
      }
    });

    return conversations;
  } catch(err) {
    return [];
  }
}