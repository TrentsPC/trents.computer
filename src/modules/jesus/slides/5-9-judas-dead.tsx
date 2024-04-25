import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";
import img from "../media/last-supper.gif";

export function SlideJudasDead() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 4,
          day: 3,
          hour: 7,
        }}
        breadcrumbs={["Passion"]}
        title="Judas"
      />
      <Prose>
        <h2>Judas dead :(</h2>
        <ul>
          <li>Hangs himself on discovering the plan to kill Jesus</li>
        </ul>
      </Prose>
    </Slide>
  );
}
