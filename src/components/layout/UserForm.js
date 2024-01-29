"use client";

import { useState, useEffect } from "react";

import EditableImage from "@/components/layout/EditableImage";
import { UseProfile } from "@/components/UseProfile";

export default function UserForm({user, onSave}) {
    const [userName, setUserName] = useState(user?.name || "");
    const [image, setImage] = useState(user?.image || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [street, setStreet] = useState(user?.street || "");
    const [city, setCity] = useState(user?.city || "");
    const [plz, setPlz] = useState(user?.plz || "");
    const [country, setCountry] = useState(user?.country || "");
    const [countryCode, setCountryCode] = useState("+49");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = UseProfile();

    useEffect(() => {
      const saveButton = document.getElementById("saveButton");
      if (saveButton) {
        saveButton.disabled = !termsAccepted;
      }
    }, [termsAccepted]);

  return (
    <div className="md:flex gap-4">
      <div>
        <div className=" p-2  rounded-lg relative max-w-[320px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
        {loggedInUserData.admin && (
          <div>
            <label
              htmlFor="adminCb"
              className="inline-flex items-center p-2 gap-2 "
            >
              <input
                id="adminCb"
                type="checkbox"
                value={"1"}
                checked={admin}
                onClick={(event) => setAdmin(event.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
      </div>
      <form
        className="grow text-white "
        onSubmit={(event) =>
          onSave(event, {
            admin,
            name: userName,
            image,
            phone,
            street,
            city,
            plz,
            country,
          })
        }
      >
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
          value={user ? user.email : ""}
          placeholder="email"
        />
        <label>Adresse</label>
        <input
          type="text"
          placeholder="Straße und Hausnummer "
          className="avatar__btn"
          value={street}
          onChange={(event) => setStreet(event.target.value)}
        />
        <div className="flex gap-4 ">
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
          <div className="grow">
            <label>Stadt</label>
            <input
              type="text"
              placeholder="Stadt"
              className="avatar__btn"
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
        <div className="text-gray-600 flex justify-start gap-4 ">
          <div>
            <select
              value={countryCode}
              onChange={(event) => setCountryCode(event.target.value)}
              className="avatar__btn rounded-xl bg-my_blue mx-auto px-2 h-12  text-gray-600"
              defaultValue="+49"
            >
              <option value="+49">+49</option>
              <option value="+1">+1 </option>
              <option value="+7">+7</option>
              <option value="+55">+55</option>
              <option value="+86">+86</option>
              <option value="+39">+39</option>
            </select>
          </div>
          <div className="grow">
            <input
              type="tel"
              placeholder="Phone Number"
              className="avatar__btn text-gray-300  "
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
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
            Datenschutzerklaerung
          </a>
          zu
        </p>
        <button
          id="saveButton"
          className=" save bg-primary flex justify-center mx-auto text-gray-900 "
          type="submit"
          disabled={!termsAccepted}
        >
          Speichern
        </button>
      </form>
    </div>
  );
}
