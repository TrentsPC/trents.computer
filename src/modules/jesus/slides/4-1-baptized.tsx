import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide, createSlideData } from "~/modules/jesus/components/Slideshow";
import img from "../media/360px-Depiction_of_Baptism_of_Jesus_by_John_the_Baptist_-_I_Yesus_Church_-_Axum_(Aksum)_-_Ethiopia_(8701132677).jpg";

export function SlideBaptized() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 29,
        }}
        breadcrumbs={["Ministry"]}
        title="Baptism"
      />
      <Prose>
        <h2>Jesus got baptized</h2>
        <img src={img} />
        <ul>
          <li>John the Baptist</li>
          <li>Jesus was “about 30 years old”</li>
          <li>Jesus was baptized in the Jordan river</li>
          <li>Definitely actually happened</li>
        </ul>
      </Prose>
    </Slide>
  );
}
