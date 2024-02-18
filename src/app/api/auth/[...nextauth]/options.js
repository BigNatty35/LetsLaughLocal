import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google:", profile)
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
      if (user) token.role = user.role;
      console.log("USER-JWT:",user)
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.googleId = token.sub;
      }
      return session
    }

  }
}