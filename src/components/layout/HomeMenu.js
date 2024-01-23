import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";


export default function HomeMenu() {

  

    return (
      <section className="ml-3">
        <div className="text-center">
          <SectionHeaders subHeader={"check out"} mainHeader={"space menu"}>
            
          </SectionHeaders>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-16">
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
      </section>
    );
}