import CurrencyInput from "react-currency-input";
import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";

export default function MenuItemPriseProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const handleExtrasChange = (event, index, prop, floatValue) => {
    const newValue = parseFloat(floatValue);
    setProps((standart) => {
      const newExtras = [...standart];
      newExtras[index][prop] = newValue;
      return newExtras;
    });
  };

  const handleAddExtras = () => {
    setProps((standart) => [...standart, { name: " ", price: " " }]);
  };

  function handleRemoveExtras(indexToRemove) {
    setProps((standart) => standart.filter((_, i) => i !== indexToRemove));
  }

  return (
    <div className="bg-submit p-2 rounded-md mb-2">
      <label>{name}</label>
      {props?.length > 0 &&
        props.map((extra, index) => (
          <div className="flex items-end gap-2 " key={index}>
            <div>
              <label className="text-gray-200 text-xs">Name</label>
              <input
                className="text-gray-300"
                type="text"
                placeholder="Beilage Name"
                value={extra.name}
                onChange={(event) => handleExtrasChange(event, index, "name")}
              />
            </div>
            <div>
              <label className="text-gray-200 text-xs">Preis in €</label>
              <CurrencyInput
                className="text-gray-300"
                prefix="€"
                value={extra.price}
                onChangeEvent={(event, maskedValue, floatValue) =>
                  handleExtrasChange(event, index, "price", floatValue)
                }
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
        className="avatar__btn flex text-sm mx-auto justify-center gap-3 items-center hover:text-primary transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md px-2 py-1 text-gray-400 bg-submit hover:bg-gray-800"
      >
        <Plus className="w-4 h-4 text-primary" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}
