import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        user: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid params", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.user.forEach((u) => {
      if (u.email)
        pusherServer.trigger(
          u.email,
          "conversation:remove",
          existingConversation
        );
    });

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
