import Image from "next/image";
export default function Logo() {
  return (
    <Image
      src={"/img/Logo_full.png"}
      width={260}
      height={260}
      style={{ objectFit: "contain" }}
      alt={"logo"}
    />
  );
}
