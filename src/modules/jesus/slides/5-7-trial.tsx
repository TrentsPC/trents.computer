import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";
import img from "../media/last-supper.gif";

export function SlideTrial() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 4,
          day: 3,
          hour: 1,
        }}
        breadcrumbs={["Passion"]}
        title="Sanhedrin Trial"
      />
      <Prose>
        <img src={img} />
        <h2>The Jews don’t like Jesus</h2>
        <ul>
          <li></li>
        </ul>
      </Prose>
    </Slide>
  );
}
