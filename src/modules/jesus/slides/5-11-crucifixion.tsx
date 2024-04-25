import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";

export function SlideCrucifixion() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 4,
          day: 3,
          hour: 9,
        }}
        breadcrumbs={["Passion"]}
        title="Crucifixion"
      />
      <Prose>
        <h2>Crucified lol</h2>
        <ul>
          <li>Listed crime: King of The Jews</li>
        </ul>
      </Prose>
    </Slide>
  );
}
