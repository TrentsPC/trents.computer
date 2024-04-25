import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";

export function SlideTemple() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 3,
          day: 30,
        }}
        breadcrumbs={["Passion"]}
        title="Temple Cleansed"
      />
      <Prose>
        <h2>Jesus doesn’t like when you do work for money</h2>
        <ul>
          <li></li>
        </ul>
      </Prose>
    </Slide>
  );
}
