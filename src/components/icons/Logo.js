import Image from "next/image";
export default function Logo() {
  return (
    <Image
      src={"/img/Logo_full.png"}
      width={320}
      height={320}
      style={{ objectFit: "contain" }}
      alt={"logo"}
    />
  );
}
