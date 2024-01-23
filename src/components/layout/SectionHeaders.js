export default function SectionHeaders({ subHeader, mainHeader }) {
  
  const words = mainHeader.split(" ");
 
  const firstWord = words.shift();
 
  const remainingWords = words.join(" ");

  return (
    <>
      <h3 className="uppercase text-bl font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="font-bold text-6xl uppercase">
        <span
          style={{
            color: "#F1B347",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          {firstWord}
        </span>{" "}
        {remainingWords}
      </h2>
    </>
  );
}
