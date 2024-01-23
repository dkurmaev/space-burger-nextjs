"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setLoginInProgress(true);
    setError(false);
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setUserLogged(false);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setUserLogged(true);
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          setError(errorData.message);
        } else {
          setError("Der Benutzer mit dieser E-Mail-Adresse existiert nicht");
        }
      }
    } catch (error) {
      setError("An error occurred while logging in");
    } finally {
      setLoginInProgress(false);
    }
  }

  return (
    <section className="mt-16">
      <h1 className="text-center text-primary text-5xl font-bold mb-8">
        Einloggen
      </h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {userLogged && (
        <div className="alert alert-success">
          Du hast dich erfolgreich eingeloggt
        </div>
      )}
      <form
        className="block max-w-sm mx-auto text-white"
        onSubmit={handleFormSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          disabled={loginInProgress}
          onChange={(event) => setEmail(event.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="pr-10"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex justify-end items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=" text-blue "
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <button
          className="hover:shadow-md hover:shadow-white items-center justify-center"
          disabled={loginInProgress}
          onClick={() => signIn("credentials", { callbackUrl: "/" })}
          type="submit"
        >
          Einloggen
        </button>
        <div className="my-4 text-center text-gray-500 uppercase">oder</div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 bg-submit justify-center hover:shadow-md hover:shadow-primary"
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
