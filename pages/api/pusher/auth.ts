import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pusherServer } from "@/app/libs/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
}
