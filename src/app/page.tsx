import { Hero } from "@/components/sections/hero";
import { Reconnais } from "@/components/sections/reconnais";
import { Philosophie } from "@/components/sections/philosophie";
import { Difference } from "@/components/sections/difference";
import { Methode } from "@/components/sections/methode";
import { PertesInvisibles } from "@/components/sections/pertes-invisibles";
import { Pourquoi } from "@/components/sections/pourquoi";
import { Olivier } from "@/components/sections/olivier";
import { Resultats } from "@/components/sections/resultats";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Reconnais />
      <Philosophie />
      <Difference />
      <Methode />
      <PertesInvisibles />
      <Pourquoi />
      <Olivier />
      <Resultats />
      <Faq />
      <Contact />
    </>
  );
}
