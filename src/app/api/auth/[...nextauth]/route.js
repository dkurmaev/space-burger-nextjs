import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import clientPromise from "@/libs/mongoConnect";
import { User } from "@/models/User";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        console.log("Received credentials:", email, password);

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });

        console.log("Found user in database:", user);

        if (user) {
          console.log("User provider:", user.provider);

          if (user.provider !== "credentials") {
            console.error(
              "Error: To confirm your identity, sign in with the same account you used originally."
            );
            throw new Error(
              "To confirm your identity, sign in with the same account you used originally."
            );
          }

          const passwordOk = bcrypt.compareSync(password, user.password);

          console.log("Password comparison result:", passwordOk);

          if (passwordOk) {
            return user;
          }
        }

        console.error("Authentication failed.");
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
