import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";

export function SlideEntry() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 3,
          day: 29,
        }}
        breadcrumbs={["Passion"]}
        title="Triumphal Entry"
      />
      <Prose>
        <h2>Triumphal n shit</h2>
        <ul>
          <li></li>
        </ul>
      </Prose>
    </Slide>
  );
}
