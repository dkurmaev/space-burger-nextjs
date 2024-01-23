import { useState } from "react";
import CurrencyInput from "react-currency-input";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriseProps from "@/components/layout/MenuItemPriseProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [extras, setExtras] = useState([]);
  const [beilagen, setBeilagen] = useState([]);
  const [drinks, setDrinks] = useState([]);
  

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({ image, name, description, basePrice, extras, beilagen, drinks });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div
        className="grid gap-6 items-start "
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label className="text-gray-400 px-2">Artikel Name</label>
          <input
            className="text-white"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label className="text-gray-400 px-2">Beschreibung</label>
          <input
            className="text-white"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label className="text-gray-400 px-2">Regular Preis €</label>
          <CurrencyInput
            className="text-white"
            prefix="€"
            value={basePrice}
            onChangeEvent={(event, maskedValue, floatValue) =>
              setBasePrice(floatValue)
            }
          />
          <MenuItemPriseProps
            name={"Extras"}
            addLabel={"Extras hinzufügen"}
            props={extras}
            setProps={setExtras}
          />
          <MenuItemPriseProps
            name={"Beilagen"}
            addLabel={"Beilagen hinzufügen"}
            props={beilagen}
            setProps={setBeilagen}
          />
          <MenuItemPriseProps
            name={"Getränke"}
            addLabel={"Getränke hinzufügen"}
            props={drinks}
            setProps={setDrinks}
          />
          <button type="submit">Speichern</button>
        </div>
      </div>
    </form>
  );
}
