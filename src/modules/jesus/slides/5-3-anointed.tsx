import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide } from "~/modules/jesus/components/Slideshow";
import img from "../media/annointing.jpg";

export function SlideAnnointed() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 33,
          month: 4,
          day: 1,
        }}
        breadcrumbs={["Passion"]}
        title="Anointing of Jesus"
      />
      <Prose>
        <img src={img} />
        <h2>Spenny massage</h2>
        <ul>
          <li>Besties chilling in Bethany</li>
          <li>Jesus spends all their money on fancy massage oils</li>
          <li>Judas is not a fan</li>
        </ul>
      </Prose>
    </Slide>
  );
}
