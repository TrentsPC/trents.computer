import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";
import img from "../media/last-supper.gif";

export function SlideHerod() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 4,
          day: 3,
          hour: 6,
        }}
        breadcrumbs={["Passion"]}
        title="Herod"
      />
      <Prose>
        <h2>Don’t worry, Jesus gets performance anxiety too</h2>
        <ul>
          <li></li>
        </ul>
      </Prose>
    </Slide>
  );
}
