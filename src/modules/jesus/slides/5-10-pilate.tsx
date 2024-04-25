import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";
import img from "../media/last-supper.gif";

export function SlidePilate() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 4,
          day: 3,
          hour: 8,
        }}
        breadcrumbs={["Passion"]}
        title="Pilate’s Court"
      />
      <Prose>
        <h2>Pilate kills Jesus, cos he just can’t be bothered</h2>
        <ul>
          <li>
            Jesus's followers get pissed that he didn't do any godly shit for
            Herod, threaten a riot if Pilate doesn’t kill him
          </li>
        </ul>
      </Prose>
    </Slide>
  );
}
