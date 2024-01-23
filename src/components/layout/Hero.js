import Image from "next/image";
import Right from "@/components/icons/Right";



export default function Hero() {
  return (
      <section className="hero ">
        <div className=" pt-16 pb-1 ">
          <h1 className="text-2xl font-semibold mt-2 text-center leading-normal">
            SAFTIGSTE&nbsp;
            <br />
            <span className="text-primary text-6xl">BURGERS </span>
            <br />
            IN BERNAU BEI BERLIN
          </h1>
          <p className="my-6 text-gray-500 text-center">
            Entdecke den Saftigkeit unserer Burger! Bestelle jetzt und genieße
            erstklassiges Rindfleisch aus Deutschland und der Region Bernau bei
            Berlin. Schnell, frisch und voller Aktionen!
          </p>
          <div className="flex gap-6 ">
            <button
                className="bg-primary flex
          justify-center 
          items-center 
          uppercase 
          gap-2 
          mt-2 
          rounded-full 
          text-white 
          px-4 
          py-2 
          text-sm 
          w-full 
          hover:shadow-md 
          hover:shadow-white"
            >
              WAHL&nbsp; AUS DER SPEISEKARTE
              <Right />
            </button>
          </div>
        </div>
        <div className="relative pt-16 pb-1 hover:scale-110 transform transition-transform duration-300 ease-in-out">
          <Image
              className="animate-gravitation"
              src={"/img/space.png"}
              width={500}
              height={500}
              style={{ objectFit: "contain" }}
              alt={"burger"}
          />
        </div>
      </section>
  );
}