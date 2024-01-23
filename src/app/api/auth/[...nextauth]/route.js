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
        console.log("Credentials:", credentials);
        const email = credentials.email;
        console.log("Email:", email);
        const password = credentials.password;
        console.log("Password:", password);

        
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB.");
        const user = await User.findOne({ email });
        console.log("Found user in database:", user);

        if (user) {
          console.log("User provider:", user.provider);          

          const passwordOk = bcrypt.compareSync(password, user.password);
          console.log("Результат сравнения пароля:", passwordOk);

          if (passwordOk) {  
            return user;
          } 
        }

        console.error("Аутентификация не удалась.");
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
