import Image from "next/image";
import Right from "@/components/icons/Right";

export default function MenuItem() {
  return (
    <div className=" p-8 rounded-lg text-center  transition-all hover:shadow-xl hover:shadow-white/20 card">
      <h4 className="font-semibold text-xl my-2 uppercase">BURGERS</h4>
      <div className="text-center">
        <Image
          src={"/img/burgers__menu.png"}
          width={320}
          height={300}
          className="hover:scale-110  max-h-auto block mx-auto "
          alt={"burgers"}
        />
      </div>
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
          hover:bg-orange-600"
      >
        WAHL&nbsp; AUS DER SPEISEKARTE
        <Right />
      </button>
    </div>
  );
}
