import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide } from "~/modules/jesus/components/Slideshow";

export function SlideDeath() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 4,
          day: 3,
          hour: 15,
        }}
        breadcrumbs={["Passion"]}
        title="Death"
      />
      <Prose>
        <h2>Jesus dead :(</h2>
      </Prose>
    </Slide>
  );
}
