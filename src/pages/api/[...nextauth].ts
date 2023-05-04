import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { userSignIn } from "@/utils/api/api";

export default NextAuth({
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
        email: {label: "Email", type: "email", placeholder: "Your Email"},
        password: { label: "Password", type: "password", placeholder: "Your Password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      //const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      let loginCredentails = {username : credentials?.email, password : credentials?.password}
      const res = await userSignIn(loginCredentails);
      const user = res.data["user"]

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    }
  })
]

})