import getSession from "@/app/actions/getSession";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  const { socketId, channel } = body;
  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  return NextResponse.json(authResponse);
}
