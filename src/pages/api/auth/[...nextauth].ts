import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  //If we want to create our custom LogIn page we need to specify path to it
  pages: {
    signIn: '/auth/signin'
  }

  // //If we want to use standat LogIn page provided by NextAuth
  // theme: {
  //   colorScheme: "auto", // "auto" | "dark" | "light"
  //   brandColor: "#F13287", // Hex color code
  //   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png", // Absolute URL to image
  //   buttonText: "" // Hex color code
  // }
}

export default NextAuth(authOptions)