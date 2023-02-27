import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
};

export default NextAuth(authOptions);
