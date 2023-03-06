import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export const getUser = async () => {
  // check the session to make sure someons is logged in
  const session = await getServerSession();
  // if not, return null
  if (!session?.user) return null;

  // if so, check the database to see if the user exists
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
  });

  // if not, create it
  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        email: session.user.email as string,
        name: session.user.name as string,
      },
    });
    return newUser;
  }

  // return the user
  return user;
};
