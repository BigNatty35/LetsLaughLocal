import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/db";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        // console.log("Profile Google:", profile)
        let userRole = "Google User"

        console.log("THIS THE SUB:", profile.sub)
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      })
      // console.log("USER:", user)
      if (dbUser) token.role = dbUser.role;
      // console.log("TOKEN:",token)
      return token
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.googleId = token.sub;
      }
      // console.log("SESSION:", session)
      return session
    }
  }
}