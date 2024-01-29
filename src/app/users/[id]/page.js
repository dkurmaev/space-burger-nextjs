"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import UserTabs from "@/components/layout/UserTabs";
import { UseProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";

export default function EditUserPage() {
  const { loading: profileLoading, data: profileData } = UseProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, [id]);
  function handleSaveButtonClick(event, data) {
    event.preventDefault();
    fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _id: id }),
    });
  }

  if (profileLoading) {
    return (
      <>
        <p className="text-center mt-16">Info werden geladen...</p>
        <span className="flex justify-center mx-auto mt-16 loader-profile"></span>
      </>
    );
  }
  if (!profileData.admin) {
    return (
      <div className=" mt-12 flex items-center justify-center">
        <div className="bg-submit p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl text-primary font-bold mb-4 items-center">
            Sie sind kein Administrator!
          </h1>
          <p className="text-gray-400">
            Bitte melden Sie sich mit einem Administrator-Konto an, um auf diese
            Seite zuzugreifen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-16 mx-auto max-w-xl">
      <UserTabs isAdmin={true} />
      <div className="mt-16">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
}
