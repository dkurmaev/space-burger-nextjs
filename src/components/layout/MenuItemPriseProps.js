import { useState } from "react";
import { NumericFormat }from "react-number-format";
import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";

export default function MenuItemPriseProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExtrasChange = (value, index, prop, floatValue) => {
    const newValue = prop === "name" ? value : parseFloat(floatValue);
    setProps((standart) => {
      const newExtras = [...standart];
      newExtras[index][prop] = newValue;
      return newExtras;
    });
  };


  const handleAddExtras = () => {
    setProps((standart) => [...standart, { name: "", price: 0 }]);
  };

  function handleRemoveExtras(indexToRemove) {
    setProps((standart) => standart.filter((_, i) => i !== indexToRemove));
  }

  return (
    <div className="bg-submit p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex p-1 border-0 justify-start items-center hover:shadow-md hover:shadow-white"
        type="button"
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <span className="text-xs text-gray-400">{name}</span>
        <span className="text-xs ml-2 text-gray-200">({props?.length})</span>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((extra, index) => (
            <div className="flex items-end gap-2" key={index}>
              <div>
                <label className="text-gray-200 text-xs">Name</label>
                <input
                  className="text-gray-300"
                  type="text"
                  placeholder="Beilage Name"
                  value={extra.name}
                  onChange={(event) =>
                    handleExtrasChange(event.target.value, index, "name")
                  }
                />
              </div>
              <div>
                <label className="text-gray-200 text-xs">Preis in €</label>
                <NumericFormat
                  className="text-white"
                  value={extra.price}
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    handleExtrasChange(null, index, "price", floatValue);
                  }}
                  thousandSeparator={true}
                  prefix={"€"}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleRemoveExtras(index)}
                  className="mb-3 px-0"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={handleAddExtras}
          className="avatar__btn flex text-sm mx-auto justify-center gap-3 mt-2 items-center hover:text-primary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md px-2 py-1 text-gray-400 bg-submit hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 text-primary" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
