import Image from "next/image";

export default function Planet({planet}) {
  return (
    <Image
      src={"/img/planet.png"}
      /* sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" */
      fill={true}
      /* width={230}
      height={230} */
      style={{ objectFit: "contain" }}
      alt={"planet"}      
    />
  );
}
