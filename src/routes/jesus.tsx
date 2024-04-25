import { MetaProvider, Title } from "@solidjs/meta";
import { Suspense } from "solid-js";
import { Slideshow } from "~/modules/jesus/components/Slideshow";
import { SlideIntro } from "~/modules/jesus/slides/0-intro";
import { SlideNativity } from "~/modules/jesus/slides/2-1-nativity";
import { SlideCircumcision } from "~/modules/jesus/slides/2-2-circumcision";
import { SlideTetrarchy } from "~/modules/jesus/slides/2-3-tetrarchy";
import { SlideUnknown } from "~/modules/jesus/slides/3-1-unknown";
import { SlideBaptized } from "~/modules/jesus/slides/4-1-baptized";
import { SlideCrucifixion } from "~/modules/jesus/slides/5-11-crucifixion";
import { SlideDeath } from "~/modules/jesus/slides/5-12-death";
import { SlideBCIntro } from "~/modules/jesus/slides/1-1-bc";
import { SlideHerodKingdom } from "~/modules/jesus/slides/1-2-herodian-kingdom";
import { SlideParents } from "~/modules/jesus/slides/1-3-parents";
import { SlideADIntro } from "~/modules/jesus/slides/2-0-ad";
import { SlidePregnant } from "~/modules/jesus/slides/1-3-pregnant";
import { SlideNazareth } from "~/modules/jesus/slides/2-4-return-to-nazareth";
import { SlideFinding } from "~/modules/jesus/slides/2-5-finding-in-the-temple";
import { SlideMinistryIntro } from "~/modules/jesus/slides/4-0-jesus";
import { SlideJohnDead } from "~/modules/jesus/slides/4-2-john-dies";
import { SlideCommission } from "~/modules/jesus/slides/4-3-commission";
import { SlideEntry } from "~/modules/jesus/slides/5-1-entry";
import { SlideTemple } from "~/modules/jesus/slides/5-2-temple-cleansed";
import { SlideJudas } from "~/modules/jesus/slides/5-4-judas";
import { SlideAnnointed } from "~/modules/jesus/slides/5-3-anointed";
import { SlideLastSupper } from "~/modules/jesus/slides/5-5-last-supper";
import { SlideArrest } from "~/modules/jesus/slides/5-6-arrest";
import { SlideTrial } from "~/modules/jesus/slides/5-7-trial";
import { SlideHerod } from "~/modules/jesus/slides/5-8-herod";
import { SlideJudasDead } from "~/modules/jesus/slides/5-9-judas-dead";
import { SlidePilate } from "~/modules/jesus/slides/5-10-pilate";
import { SlideAfterDeathIntro } from "~/modules/jesus/slides/6-1-ad";
import { SlideAfterDeath } from "~/modules/jesus/slides/6-2-ad";

document.body.style.setProperty("cursor", "none");
let timeout: NodeJS.Timeout;
document.addEventListener("mousemove", () => {
  document.body.style.setProperty("cursor", "crosshair");
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    document.body.style.setProperty("cursor", "none");
  }, 500);
});

export default function App() {
  return (
    <MetaProvider>
      <Title>JESUS</Title>
      <Suspense>
        <Slideshow
          slides={[
            SlideIntro,

            SlideBCIntro,
            SlideHerodKingdom,
            SlideParents,
            SlidePregnant,

            SlideADIntro,
            SlideNativity,
            SlideCircumcision,
            SlideTetrarchy,
            SlideNazareth,
            SlideFinding,

            SlideUnknown,

            // SlideMinistryIntro,
            SlideBaptized,
            SlideJohnDead,
            SlideCommission,

            SlideEntry,
            SlideTemple,
            SlideAnnointed,
            SlideJudas,
            SlideLastSupper,
            SlideArrest,
            SlideTrial,
            SlideHerod,
            SlideJudasDead,
            SlidePilate,
            SlideCrucifixion,
            SlideDeath,

            SlideAfterDeathIntro,
            SlideAfterDeath,
          ]}
        />
      </Suspense>
    </MetaProvider>
  );
}
