import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    details: {
      email: string;
      isActive: string;
      profilePicture: string;
      providerId: string;
      role: string;
      status: string;
      userId: number;
      username: string;
    } & DefaultSession["user"];
  }
}
