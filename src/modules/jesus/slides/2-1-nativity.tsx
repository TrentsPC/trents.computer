import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide } from "~/modules/jesus/components/Slideshow";
import img from "../media/nativity-doors.jpg";

export function SlideNativity() {
  return (
    <Slide>
      <SlideHeader
        breadcrumbs={["Early life"]}
        title="Nativity"
        date={{
          era: "BC",
          year: 4,
          month: 12,
          day: 25,
        }}
      />
      <Prose>
        <img src={img} />
        <h2>Jesus got birthed</h2>
        <ul>
          <li>Christ was born 4 years Before Christ</li>
          <li>25 December is kinda made-up</li>
        </ul>
      </Prose>
    </Slide>
  );
}
