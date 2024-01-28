"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [plz, setPlz] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile")
        .then((response) => response.json())
        .then((data) => {
          setPhone(data.phone);
          setStreet(data.street);
          setCity(data.city);
          setPlz(data.plz);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
    }
  }, [status, session]);

   useEffect(() => {    
     const saveButton = document.getElementById("saveButton");
     if (saveButton) {
       saveButton.disabled = !termsAccepted;
     }
   }, [termsAccepted]);

  async function handleProfileInfoUpdate(event) {
    event.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          street,
          city,
          plz,
          country,
          phone,
        }),
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
    <section className="mt-16">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-xl mx-auto mt-8">
        <div className="flex gap-4 ">
          <div>
            <div className=" p-2 rounded-lg relative max-w-[120px]">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow text-white " onSubmit={handleProfileInfoUpdate}>
            <label>Vorname und Nachname</label>
            <input
              className="avatar__btn"
              type="text"
              placeholder="Vorname und Nachname"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <label>Email</label>
            <input
              className="text-my_blue/30 avatar__btn"
              type="email"
              disabled={true}
              value={session.data.user.email}
              placeholder="Email"
            />
            <label>Adresse</label>
            <input
              type="text"
              placeholder="Straße und Hausnummer "
              className="avatar__btn"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />
            <div className="flex gap-4 mx-auto">
              <div>
                <label>Postleitzahl</label>
                <input
                  type="text"
                  placeholder="Postleitzahl"
                  className="avatar__btn mx-auto"
                  value={plz}
                  onChange={(event) => setPlz(event.target.value)}
                />
              </div>
              <div>
                <label>Stadt</label>
                <input
                  type="text"
                  placeholder="Stadt"
                  className="avatar__btn"
                  style={{ width: "auto" }}
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
            </div>
            <label>Land</label>
            <input
              type="text"
              placeholder="Land"
              className="avatar__btn"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
            <label>Telefonnummer</label>
            <div className="text-gray-600 flex justify-between gap-2">
              <select
                value={countryCode}
                onChange={(event) => setCountryCode(event.target.value)}
                className="avatar__btn rounded-xl bg-my_blue mx-auto px-2 h-12  gap-2 text-gray-600"
                defaultValue="+1"
              >
                <option value="+49">+49</option>
                <option value="+1">+1 </option>
                <option value="+7">+7</option>
                <option value="+55">+55</option>
                <option value="+86">+86</option>
                <option value="+39">+39</option>
              </select>

              <input
                type="tel"
                placeholder="Phone Number"
                className="avatar__btn "
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <p className=" ml-2 mt-2 text-xs text-gray-600">
              <input
                className="text-submit"
                type="checkbox"
                required
                onChange={(event) => setTermsAccepted(event.target.checked)}
              />
              &nbsp;Indem Sie auf&nbsp;
              <span className="text-primary" href="/#">
                Speichern
              </span>
              &nbsp; klicken, stimmen Sie unseren&nbsp;
              <a href="#" className="underline text-rose-800">
                Datenschutzerklaerung zu
              </a>
            </p>
            <button
              id="saveButton"
              className=" save bg-primary flex justify-center mx-auto text-gray-900 "
              type="submit"
              disabled={!termsAccepted}
              onClick={handleProfileInfoUpdate}
            >
              Speichern
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
