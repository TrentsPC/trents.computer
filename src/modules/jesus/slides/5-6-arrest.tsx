import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";
import img from "../media/last-supper.gif";

export function SlideArrest() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 4,
          day: 3,
          hour: 0,
        }}
        breadcrumbs={["Passion"]}
        title="The Arrest"
      />
      <Prose>
        <img src={img} />
        <h2>Jesus and Judas make out sloppy-style</h2>
        <ul>
          <li></li>
        </ul>
      </Prose>
    </Slide>
  );
}
