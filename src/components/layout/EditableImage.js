import Image from "next/image";
import toast from "react-hot-toast";
export default function EditableImage({ link, setLink }) {
  async function handleFileChange(event) {
    const files = event.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(async (response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Upload fehlgeschlagen");
      });

      await toast.promise(uploadPromise, {
        loading: "Laden...",
        success: "Geladen!",
        error: "Laden fehlgeschlagen",
      });
    }
  }
  return (
    <>
      {link && (
        <Image
          src={link}
          className="rounded-lg w-full h-full mt-2"
          width={150}
          height={150}
          alt="avatar"
        />
      )}
      {!link && (
        <div className="bg-my_blue/30 text-center p-4 mb-1 rounded-lg w-full h-full mt-6">
          Kein Bild
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block rounded-lg p-1 text-center cursor-pointer hover:bg-my_blue avatar__btn">
          Edit
        </span>
      </label>
    </>
  );
}
