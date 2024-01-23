import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import AboutVideo from "@/components/layout/AboutVideo";


export default function Home() {
  
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"Über Uns"} />
        <AboutVideo />
      </section>
      <section className="text-center my-16">
        <SectionHeaders
          subHeader={"Zögern Sie nicht"}
          mainHeader={"Kontaktieren Sie mit uns"}
        />        
        
      </section>
    </>
  );
}
