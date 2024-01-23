import Image from "next/image";

export default function UpButton() {
  return (
      <Image
          src={"/img/up scroll.svg"}
          fill={true}
          className="object-contain hover:shadow-xl rounded-full hover:shadow-blue"
          alt={"up_scroll"}
      />

  );
}
