import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide } from "~/modules/jesus/components/Slideshow";

export function SlideBCIntro() {
  return (
    <Slide>
      {/* <SlideHeader
        breadcrumbs={["Early life"]}
        title="Nativity"
        date={{
          era: "BC",
          year: 4,
          month: 12,
          day: 25,
        }}
      /> */}
      <Prose>
        <h1 css={{ align: "center" }}>Before Christ</h1>
      </Prose>
    </Slide>
  );
}
