import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
        <div className="bg-bg rounded-lg p-4 relative">
          <span
            className="absolute   top-0 right-2 text-white cursor-pointer"
            onClick={() => setShowConfirm(false)}
          >
            &times;
          </span>
          <div className="mt-3">Sind Sie sicher, dass Sie löschen möchten?</div>
          <div className="flex gap-4">
            <button
              type="button"
              className="cancel justify-center items-center"
              onClick={() => setShowConfirm(false)}
            >
              Aufheben
            </button>
            <button
            onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="remove justify-center items-center hover:bg-red-600 text-gray-200">
              Ja,&nbsp;löschen!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className="flex justify-center my-auto text-sm items-center"
      type="remove"
      onClick={() => setShowConfirm(true)}
    >
      {label}
    </button>
  );
}
