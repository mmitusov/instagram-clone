import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, //I know better that env can not be empty
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],

  //If we want to create our custom LogIn page we need to specify path to it
  pages: {
    signIn: '/auth/signin'
  },

  // //If we want to use standat LogIn page provided by NextAuth
  // theme: {
  //   colorScheme: "auto", // "auto" | "dark" | "light"
  //   brandColor: "#F13287", // Hex color code
  //   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", // Absolute URL to image
  //   buttonText: "" // Hex color code
  // },

  // Where to redirect user after he LogedIn or LogedOut
  callbacks: {
    async redirect() {
      return '/'
    },
    async session({ session, token, user }: any) {
      session.user.username = session.user.name.split(' ').join('').toLowerCase();
      session.user.uid = token.sub; //Unique user ID created by Google from Firebase
      return session
    },
  }
}

export default NextAuth(authOptions)