import clientPromise from "@/libs/mongoConnect";
import {UserInfo} from "@/models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from '@/models/User';
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@auth/mongodb-adapter"

const adapter = MongoDBAdapter(clientPromise);

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: {label: "Email", type: "email", placeholder: "test@example.com"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({email});
                if (user) {
                    console.log('found user', user);
                }
                const passwordOk = user && bcrypt.compareSync(password, user.password);
                console.log("Результат сравнения пароля:", passwordOk);

                if (passwordOk) {
                    user.name = user.name || "Default Name";
                    user.email = user.email || "default@example.com";
                    user.isAdmin = isAdmin;

                    return user;
                }

                return null
            }
        })
    ],
};

export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
        return false;
    }
    const userInfo = await UserInfo.findOne({email: userEmail});
    if (!userInfo) {
        return false;
    }
    return userInfo.admin;
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}