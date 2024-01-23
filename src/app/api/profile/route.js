import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "PUT") {
    return handlePUT(req, res);
  } else if (method === "GET") {
    return handleGET(req, res);
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}

async function handlePUT(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.body;
  const { name, image, ...otherUserInfo } = data;
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  // update user name
  await User.updateOne({ email }, { name, image });
  await UserInfo.findOneAndUpdate({ email }, otherUserInfo, {
    upsert: true,
  });

  return res.json(true);
}

async function handleGET(req, res) {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return res.json({});
  }
  const user = await User.findOne({ email }).lean();
  const userInfo = await UserInfo.findOne({ email }).lean();
  return res.json({ ...user, ...userInfo });
}
