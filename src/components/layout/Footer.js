import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section className="grid place-items-center">
        <div className="container flex flex-col items-center">
          <div className="text-center mt-8 text-gray-400 footer-info">
            <span>DIE BESTEN BURGER IN DER STADT</span>
            <br />
            Unsere besten Burger in der Stadt zeichnen sich durch die höchste
            Qualität und den einzigartigen Geschmack aus. Mit handverlesenen
            Zutaten und raffinierten Rezepten bieten wir nicht nur einen Burger,
            sondern ein unvergleichliches kulinarisches Erlebnis. Jeder Bissen
            ist eine Fusion aus Aromen, die die Sinne ansprechen und ein
            unvergessliches Genusserlebnis schaffen. Probieren Sie unsere Besten
            und überzeugen Sie sich selbst!
          </div>
          <div className="relative max-h-auto mt-10 mx-auto w-full h-[160px] border-t border-orange-600 items-center ">
            <div className="flex justify-between mt-12 items-center">
              <Link href="/">
                <Image
                  src="/img/Logo_full.png"
                  width={350}
                  height={350}
                  className="mt-6 object-contain cursor-pointer"
                  alt="footer_logo"
                />
              </Link>
              <div className="flex mx-auto gap-8 text-gray-400 justify-evenly items-center ">
                <div>
                   <Link href={"https://www.google.com/maps/place/Schönfelder+Weg+28-31,+16321+Bernau+bei+Berlin"}
                    target="_blank"
                    rel="noopener noreferrer">
                   <h3 className="text-primary text-xl">Adresse: </h3>
                    
                  </Link>  
                    <ul>Schönfelder Weg 28 - 31 </ul>
                    <ul>16321 Bernau bei Berlin </ul>
                  
                </div>
                <div>
                  <h3 className="text-primary text-xl">Öffnungszeiten: </h3>
                  <ul>11:00 - 22.00 MO - SA </ul>
                  <ul>12:00 - 22:00 SO </ul>
                </div>
                <div>
                  <Link href={"/"}>
                    <h3 className="text-primary text-xl">Kontakt: </h3>
                  </Link>
                  <ul>+49 (0) 176-22-99-77-56 </ul>
                  <ul>+49 (0) 176-22-99-77-56 </ul>
                </div>
              </div>
            </div>
          </div> 
        </div>       
      </section>
      <footer className="border-t p-5 text-xs text-center text-gray-500 mt-16 border-orange-600">
        &copy; 2024&nbsp;
        <span className="bg-grey-500 text-grey-400 p-2 rounded-md">
          Im Projekt waren&nbsp;
          <a href="#" className="text-primary hover:underline">
            Danil Kurmayev
          </a>
          &nbsp;als Full-Stack-Entwickler,&nbsp;
          <a href="#" className="text-primary hover:underline">
            Roman Popov &nbsp;
          </a>
          und &nbsp;
          <a href="#" className="text-primary hover:underline">
            Eduard Frank
          </a>
          &nbsp;als QA beteiligt.
        </span>
        Alle Rechte vorbehalten.
      </footer>
    </>
  );
}
