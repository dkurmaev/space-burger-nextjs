"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";


export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] =  useState(null)
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);  
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {      
      fetch("/api/profile")
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
    }
  }, [status, session]);

   

  async function handleProfileInfoUpdate(event, data) {
    event.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve("ok");
      } else {
        reject("error");
      }
    });
    await toast.promise(savingPromise, {
      loading: "Speichern...",
      success: "Gespeichert!",
      error: "Speichern fehlgeschlagen",
    });
  }

  if (status === "loading" || !profileFetched) {
    return (
      <>
        <p className="text-center mt-16">Wird geladen...</p>
        <span className="flex justify-center mx-auto mt-16 loader-profile"></span>
      </>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="mt-16 ">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-16  ">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
