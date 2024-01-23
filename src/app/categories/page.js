"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";

  export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
      fetchCategories();
    }, []);

    function fetchCategories() {
      fetch("/api/categories").then((res) => {
        res.json().then((categories) => {
          setCategories(categories);
        });
      });
    }

   async function handleCategorySubmit(event) {
     event.preventDefault();
     const creationPromise = new Promise(async (resolve, reject) => {
       const data = { name: categoryName };
       if (editedCategory) {
         data._id = editedCategory._id;
       }
       const response = await fetch("/api/categories", {
         method: editedCategory ? "PUT" : "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
       });

       setCategoryName("");
       fetchCategories();
       setEditedCategory(null);
       if (response.ok) resolve();
       else reject();
     });

     await toast.promise(creationPromise, {
       loading: editedCategory
         ? "Updating category..."
         : "Erstellen Sie Ihre neue Kategorie...",
       success: editedCategory ? "Kategorie erstellt" : "Kategorie angelegt",
       error: "Fehler, Das Feld darf nicht leer sein",
     });
   }

    async function handleDeleteClick(_id) {
      const promise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/categories?_id=" + _id, {
          method: "DELETE",
        });
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(promise, {
        loading: "Löschen…",
        success: "Gelöscht",
        error: "Fehler",
      });

      fetchCategories();
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
              Bitte melden Sie sich mit einem Administrator-Konto an, um auf
              diese Seite zuzugreifen.
            </p>
          </div>
        </div>
      );
    }
    return (
      <section className="mt-8 max-w-xl mx-auto">
        <UserTabs isAdmin={true} />
        <form className="mt-8" onSubmit={handleCategorySubmit}>
          <div className="flex gap-4 items-end ">
            <div className="grow ">
              <label className="text-gray-400 px-2">
                {editedCategory
                  ? "Kategorie bearbeiten..."
                  : "Kategorie erstellen:"}
                {editedCategory && (
                  <>
                    : <b className="text-blue"> {editedCategory.name}</b>
                  </>
                )}
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
              />
            </div>
            <div className="pb-2">
              <button type="submit">
                {editedCategory ? "Bearbeiten" : "Erstellen"}
              </button>
            </div>
          </div>
        </form>
        <div>
          <h2 className="mt-8 px-3 text-sm text-gray-400">
            Kategorie bearbeiten:
          </h2>
          {categories?.length > 0 &&
            categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setEditedCategory(c);
                  setCategoryName(c.name);
                }}
                className="mb-2 hover:text-white text-gray-400  flex justify-start items-center gap-2"
              >
                <span className="text-gray-100">{c.name}</span>
              </button>
            ))}
        </div>
      </section>
    );
  }