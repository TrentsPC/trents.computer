import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";

export function SlideUnknown() {
  return (
    <Slide>
      <SlideHeader
        minDate={{
          era: "AD",
          year: 8,
        }}
        date={{
          era: "AD",
          year: 28,
        }}
        title="Unknown"
        dateStr="8-28 AD"
      />
      <Prose>
        <h2>Unknown years</h2>
        <ul>
          <li>Probably helped his dad out with carpentry</li>
          <li>Probably did some bible study</li>
        </ul>
      </Prose>
    </Slide>
  );
}
