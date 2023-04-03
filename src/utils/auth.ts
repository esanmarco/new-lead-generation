import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";

export const auth = async (): Promise<Session | NextResponse> => {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({
      status: 401,
      body: "Unauthorized",
    });
  }
  return session;
};
