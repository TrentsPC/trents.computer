import { Prose } from "~/modules/jesus/components/Prose";
import { Slide } from "~/modules/jesus/components/Slideshow";

export function SlideHerodKingdom() {
  return (
    <Slide>
      <Prose>
        <h2>Herodian Kingdom of Judea</h2>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Herodian_Kingdom_political_map.svg" />
        <ul>
          <li>Client state since 63 BC</li>
          <li>Ruled by Herod the Great since 34 BC</li>
        </ul>
      </Prose>
    </Slide>
  );
}
