import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/models/User";

export async function POST(req, res) {
  const body = await req.json();
  await mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;

  console.log("Searching for user with email:", body.email);

  const existingUser = await User.findOne({ email: body.email });

  console.log("Query result:", existingUser);

  /* if (!existingUser) {
    mongoose.connection.close();
    throw new Error("Der Benutzer mit dieser E-Mail-Adresse existiert nicht");
  } */

  const isPasswordValid = bcrypt.compareSync(pass, existingUser.password);

  if (!isPasswordValid) {
    mongoose.connection.close();
    throw new Error("Ungültiges Passwort");
  }

  return Response.json(existingUser);
}
