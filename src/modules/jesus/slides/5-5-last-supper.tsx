import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";
import img from "../media/last-supper.gif";

export function SlideLastSupper() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 4,
          day: 2,
        }}
        breadcrumbs={["Passion"]}
        title="Last Supper"
      />
      <Prose>
        <img src={img} />
        <h2>Jesus tells his friends that they hate him</h2>
        <ul>
          <li></li>
        </ul>
      </Prose>
    </Slide>
  );
}
