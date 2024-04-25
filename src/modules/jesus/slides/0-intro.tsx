import { Prose } from "~/modules/jesus/components/Prose";
import { Slide } from "~/modules/jesus/components/Slideshow";

export function SlideIntro() {
  return (
    <Slide>
      <Prose>
        <h1 css={{ align: "center" }}>JESUS</h1>
        <img
          css={{
            position: "absolute",
            top: "16.7vh",
            right: "4vw",
          }}
          src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Jesus_Christ_-_Hofmann.jpg"
        />
      </Prose>
    </Slide>
  );
}
