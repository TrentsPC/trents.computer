import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";
import img from "../media/judas.png";

export function SlideJudas() {
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
        title="Judas"
      />
      <Prose>
        <img src={img} />
        <h2>I ain’t gay but 30 silver is 30 silver</h2>
        <ul>
          <li>Helps the pharisees and romans to arrest Jesus</li>
        </ul>
      </Prose>
    </Slide>
  );
}
