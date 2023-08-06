import { NextResponse } from "next/server";

import { openai } from "@/libs/openai";
import getCurrentUser from "@/services/getCurrentUser";

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { message, context } = body;

    if(!user?.id || !user?.email) {
      return new NextResponse("Unauthorized", {
        status: 401
      });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You are GPT Advisor. Your goal is to generate the best fitting replies to a certain message from a conversation in a chat application. Use informal language because normally a conversation is between 2 people that know each other."
        },
        {
          "role": "user",
          "content": `Hello GPT Advisor. I am having a text conversation with a person and sent me this text message:\n\n"${message}"\n\nI don't know exactly what to answer to that text message. That's why i need you to act as if you were the one that had to answer that message and give me the text that you would send as a reply.`
        },
        {
          "role": "assistant",
          "content": "I will help you with that. What were you talking before that text? Could you give me some context so that i can understand the conversation better?"
        },
        {
          "role": "user",
          "content": `Yes, of course. The context of the conversation is that ${context}`
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return NextResponse.json(response);
  } catch(err) {
    return new NextResponse("Internal server error", {
      status: 500
    });
  }
}