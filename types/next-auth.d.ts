import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      email: string;
      access_token: string;
      refresh_token: string;

    }
  }
}
