import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide } from "~/modules/jesus/components/Slideshow";

export function SlideNazareth() {
  return (
    <Slide>
      <SlideHeader
        breadcrumbs={["Early life"]}
        title="Return to Nazareth"
        // date={{
        //   era: "BC",
        //   year: 3,
        //   month: 1,
        //   day: 1,
        // }}
        date={{
          era: "BC",
          year: 3,
          month: 5,
        }}
      />
      <Prose>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Herodian_Tetrarchy_political_map.svg/1200px-Herodian_Tetrarchy_political_map.svg.png" />
        <h2>Back to Nazareth</h2>
        <ul>
          <li>Not a fan of Archelaus</li>
        </ul>
      </Prose>
    </Slide>
  );
}
