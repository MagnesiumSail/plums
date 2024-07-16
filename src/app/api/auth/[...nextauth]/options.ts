import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

console.log('GITHUB_ID:', process.env.GITHUB_ID);
console.log('GITHUB_SECRET:', process.env.GITHUB_SECRET);
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
