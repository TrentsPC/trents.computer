import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide } from "~/modules/jesus/components/Slideshow";
import img from "../media/apostles.jpg";

export function SlideCommission() {
  return (
    <Slide>
      <SlideHeader
        date={{
          era: "AD",
          year: 30,
        }}
        breadcrumbs={["Ministry"]}
        title="Commissioning of the Twelve Apostles"
      />
      <Prose>
        <h2>The boys are back in town</h2>
        <img src={img} />
        <ul>
          <li>
            Peter, James, John, Andrew, Philip, Bartholomew, Matthew, Thomas,
            James 2, Thaddaeus, Simon, Judas
          </li>
        </ul>
      </Prose>
    </Slide>
  );
}
