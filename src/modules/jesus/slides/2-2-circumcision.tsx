import { Prose } from "~/modules/jesus/components/Prose";
import { SlideHeader } from "~/modules/jesus/components/SlideHeader";
import { Slide } from "~/modules/jesus/components/Slideshow";
import img from "../media/circumcision-of-christ.jpg";

export function SlideCircumcision() {
  return (
    <Slide>
      <SlideHeader
        breadcrumbs={["Early life"]}
        title="Circumcision"
        date={{
          era: "BC",
          year: 3,
          month: 1,
          day: 1,
        }}
      />
      <Prose>
        <h2>Jesus got cut</h2>
        <img src={img} />
        <ul>
          <li>Jewish boys must be circumcised 8 days after birth</li>
          <li>“18 different holy foreskins”</li>
        </ul>
      </Prose>
    </Slide>
  );
}
