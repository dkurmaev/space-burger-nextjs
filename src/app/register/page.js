"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    if (!email || !/^\S+@\S+[a-zA-Z]\.\S+[a-zA-Z]$/.test(email)) {
      setError("Ungültige E-Mail");
      setCreatingUser(false);
      return;
    }

    if (!password || password.length < 5) {
      setError("Das Passwort muss mindestens 5 Zeichen lang sein");
      setCreatingUser(false);
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        setError("Der Benutzer mit dieser E-Mail-Adresse existiert bereits");
      }
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-16">
      <h1 className="text-center text-primary text-5xl font-bold mb-8">
        Register
      </h1>
      {userCreated && (
        <div className="my-4 text-center">
          Benutzer erstellt. <br />
          Jetzt können Sie sich {""}
          <Link className="underline" href={"/login"}>
            anmelden &raquo;{" "}
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          {typeof error === "string"
            ? error
            : "Fehler beim Erstellen des Benutzers. Versuchen Sie es später erneut"}
        </div>
      )}
      <form
        className="block max-w-sm mx-auto text-white"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          placeholder="Name"
          autoComplete="name"
          value={name}
          disabled={creatingUser}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          disabled={creatingUser}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            disabled={creatingUser}
            onChange={(event) => setPassword(event.target.value)}
            className="pr-10"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex justify-end items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" text-blue pr-3 " // Position the button to the right of the input
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <p className=" ml-2 mb-2 text-xs text-gray-600">
          <input
            className="text-submit"
            type="checkbox"
            required
            onChange={(event) => setTermsAccepted(event.target.checked)}
          />
          &nbsp;Indem Sie auf&nbsp;
          <span className="text-primary" href="/#">
            Registrieren
          </span>
          &nbsp; klicken, stimmen Sie unseren&nbsp;
          <a href="#" className="underline text-rose-800">
            Allgemeinen Geschäftsbedingungen zu
          </a>
        </p>
        <button
          className="hover:shadow-md hover:shadow-white text-white bg-primary items-center justify-center"
          type="register"
          disabled={creatingUser || !termsAccepted}
        >
          Registrieren
        </button>

        <div className="my-4 text-center text-gray-500">
          oder beim Anbieter anmelden
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center hover:shadow-md hover:shadow-primary"
        >
          <Image
            src={"/img/google.png"}
            width={32}
            height={32}
            alt={"google"}
          />
          Mit Google anmelden
        </button>
      </form>
    </section>
  );
}
