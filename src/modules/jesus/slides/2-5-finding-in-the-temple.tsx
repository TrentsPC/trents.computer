import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide } from "~/modules/jesus/components/Slideshow";

export function SlideFinding() {
  return (
    <Slide>
      <SlideHeader
        breadcrumbs={["Early life"]}
        title="Finding in the Temple"
        date={{
          era: "AD",
          year: 8,
        }}
      />
      <Prose>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Herodian_Tetrarchy_political_map.svg/1200px-Herodian_Tetrarchy_political_map.svg.png" />
        <h2>Reverse Home Alone, but Jewish</h2>
        <ul>
          <li>The Jesus gang go to Jerusalem for Passover</li>
        </ul>
      </Prose>
    </Slide>
  );
}
