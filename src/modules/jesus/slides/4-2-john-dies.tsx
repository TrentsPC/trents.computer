import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide } from "~/modules/jesus/components/Slideshow";
import img from "../media/dead-john.jpg";

export function SlideJohnDead() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 30,
        }}
        breadcrumbs={["Ministry"]}
        title="Beheading of John the Baptist"
      />
      <Prose>
        <h2>John dead :(</h2>
        <img src={img} />
        <ul>
          <li>King Herod got scared</li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </Prose>
    </Slide>
  );
}
