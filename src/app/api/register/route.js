import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/models/User";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;

  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) {
    throw new Error("Der Benutzer mit dieser E-Mail-Adresse existiert bereits");
  }

  if (!pass?.length || pass.length < 5) {
    throw new Error("Das Passwort muss aus mindestens 5 Zeichen bestehen");
  }

  if (!body.email || !/^\S+@\S+[a-zA-Z]\.\S+[a-zA-Z]$/.test(body.email)) {
    throw new Error("Ungültige E-Mail");
  }

  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);

  return Response.json(createdUser);
}
