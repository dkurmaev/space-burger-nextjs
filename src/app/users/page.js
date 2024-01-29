"use client";

import { useEffect, useState } from "react";

import UserTabs from "@/components/layout/UserTabs";
import { UseProfile } from "@/components/UseProfile";
import DeleteButton from "@/components/DeleteButton";
import Link from "next/link";


export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading: profileLoading, data: profileData } = UseProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

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
    <section className="mt-16 max-w-3xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-16 ml-14 ">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user.id}
              className="bg-submit rounded-xl p-4 mb-2 flex items-center"
            >
              <div className="text-gray-300 grid grid-cols-2 md:grid-cols-3 grow gap-4">
                <div className="text-gray-300">
                  {!!user.name && <span>{user.name}</span>}
                  {!user.name && <span className="italic">NoName</span>}
                </div>
                <span className="text-my_blue/50 italic text-sm flex items-center">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 my-auto">
                <Link
                  href={"/users/" + user._id}
                  className="cancel w-full rounded-xl bg-submit px-6 py-2 flex text-sm mx-auto justify-center gap-3 items-center hover:shadow-md hover:shadow-white"
                  type="cancel"
                >
                  Bearbeiten
                </Link>
                {/* <DeleteButton label="Löschen" /> */}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
