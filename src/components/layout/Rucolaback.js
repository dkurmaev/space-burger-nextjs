import Image from "next/image";
export default function Rucolaback() {
  return (
    <div className="absolute">
      <div className="h-48 w-48 absolute -left-16 -top-4  ">
        <Image
          src={"img/rucola 1.png"}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          alt={"rucola"}
        />
      </div>
      <div className="h-48 w-48 absolute -right-16 -top-4">
        <Image
          src={"/img/rucola 2.png"}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          alt={"rucola"}
        />
      </div>
    </div>
  );
}
