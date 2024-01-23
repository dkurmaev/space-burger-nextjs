"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import  {userProfile} from "@/components/UserProfile";
import UserTabs from "@/components/layout/UserTabs";
import Right from "@/components/icons/Right";

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading: profileLoading, data: profileData } = userProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        setMenuItems(menuItems);
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
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link
          className="button hover:text-white text-gray-400 flex justify-center items-center gap-2"
          href={"/menu-items/new"}
        >
          Neuen Artikel erstellen
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="mt-8 px-3 text-sm text-gray-400 ">
          Artikel bearbeiten:
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="rounded-lg text-gray-400 p-4 transition-all hover:shadow-xl hover:shadow-white/20 card"
                key={item.id}
              >
                <div className="relative w-full">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
