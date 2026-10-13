import { createFileRoute } from "@tanstack/solid-router";
import { justify } from "justif";
import { hyphenateEnGB } from "justif/hyphenate/en-gb";
import { ComponentProps, JSX, onCleanup, onMount, Show } from "solid-js";
import { createSquircle } from "~/utils/squircle";

import berryHill from "~/assets/berry-hill.png";
import givenwell from "~/assets/givenwell.png";
import { colors } from "~/theme.styles";

export const Route = createFileRoute("/cv")({
  component: Page,
});

function Page() {
  let page: HTMLDivElement;

  onMount(() => {
    console.log(
      "Word count:",
      page!.innerText.split(/\s+/).filter(Boolean).length,
    );

    const paragraphs = [...page!.querySelectorAll("p")].filter(
      (p) => getComputedStyle(p).textAlign === "justify",
    );
    const controller = justify(paragraphs, { hyphenate: hyphenateEnGB });
    onCleanup(() => controller.destroy());
  });

  const now = new Date();
  const startOfEmployment = new Date(2020, 9, 1);

  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const YEAR = 365.25 * DAY;

  const yearsOfExperience = Math.floor(
    (now.getTime() - startOfEmployment.getTime()) / YEAR,
  );

  return (
    <div
      css={{
        d: "flex",
        items: "center",
        justify: "center",
        fontScale: 0,
      }}
    >
      <title>Trent Mitchell-Borley</title>
      <div
        ref={page!}
        css={{
          r: 14,
          bg: "white",
          width: "100%",
          maxWidth: 600,
          fontSize: 15,
          lineHeight: 1.5,
          padding: 32,
        }}
      >
        <div css={{}}>
          <h1 css={{ fontWeight: 600, fontScale: 4, align: "center" }}>
            Trent Mitchell-Borley
          </h1>
          <p
            css={{
              fontWeight: 400,
              // color: colors.secondaryLabel,
              align: "center",
            }}
          >
            trent@trents.computer
          </p>
          <div css={{ pt: 32, spaceY: 32 }}>
            <section>
              <div>
                <h2 css={{ fontWeight: 600, fontScale: 3, mb: 12 }}>Summary</h2>
                <p>
                  I have {yearsOfExperience} years of full-stack web and mobile
                  app development experience and am addicted to building big
                  things with tiny teams.
                </p>
              </div>
            </section>
            <section>
              <h2 css={{ fontWeight: 600, fontScale: 3, pb: 12 }}>
                Experience
              </h2>
              <div css={{ spaceY: 24, "& p": { align: "justify" } }}>
                <Subsection
                  href="https://givenwell.com"
                  squircle={
                    <Squircle href="https://givenwell.com">
                      <img src={givenwell} />
                    </Squircle>
                  }
                  title="Givenwell"
                  titleAccessory="Oct 2023 – Present"
                  // description={<>I was brought on September 2024 release.</>}
                  description={<></>}
                  list={
                    <ul>
                      <li>
                        Turned a proof-of-concept desktop-only website into a
                        production-ready responsive PWA.
                      </li>
                      <li>
                        Developed fool-proof (read: agent-proof) design systems.
                      </li>
                      <li>
                        Designed and developed internal tooling for design
                        review, feature flag comparison, analytics.
                      </li>
                    </ul>
                  }
                />
                <Subsection
                  href="https://berryhill.co.nz"
                  squircle={
                    <Squircle href="https://berryhill.co.nz">
                      <img src={berryHill} />
                    </Squircle>
                  }
                  title="Berry Hill"
                  titleAccessory="Oct 2020 – Oct 2023"
                  description={
                    <>
                      <p>
                        I was the first hire of{" "}
                        <a href="https://berryhill.co.nz">Berry Hill</a>, a
                        Mosgiel-based consultancy and software company that
                        primarily worked in web and mobile app development.
                      </p>
                    </>
                  }
                  list={
                    <ul>
                      <li>
                        Built a fully-featured Website builder, with
                        drag-and-drop editors, rich-text editors, and
                        drag-and-drop editors with rich-text editors on them.
                      </li>
                      <li>
                        Migrated the internal election system for{" "}
                        <a href="https://www.stjohn.org.nz/">
                          Hato Hone St John
                        </a>{" "}
                        from a PHP monolith to a Solid frontend & PHP JSON API.
                      </li>
                      <li>
                        Ported MJML from Node.js to runtime agnostic TypeScript.
                      </li>
                      {/* <li>CI/CD something something</li> */}
                      {/* <li>Design system something something</li> */}
                      <li>
                        Turned a 100k-LOC single-file React Native proof of
                        concept into a performant production app for the{" "}
                        <a href="https://www.anglican.org.nz/">
                          Anglican Church in Aotearoa, New Zealand and Polynesia
                        </a>
                        .
                      </li>
                    </ul>
                  }
                />
              </div>
            </section>
            <section>
              <h2 css={{ fontWeight: 600, fontScale: 3, mb: 12 }}>
                Hobby Projects
              </h2>
              <div css={{ spaceY: 32, "& p": { align: "justify" } }}>
                <Subsection
                  href="https://github.com/TrentsPC/weave"
                  title="Hyper CSS"
                  squircle={
                    <Squircle href="https://github.com/TrentsPC/weave">
                      <Pixel />
                    </Squircle>
                  }
                  list={<></>}
                  titleAccessory=""
                  description={
                    <>
                      <p>
                        What if <a href="https://tailwindcss.com/">Tailwind</a>{" "}
                        had good syntax and didn’t break when you apply
                        conditional styles? What if{" "}
                        <a href="https://stitches.dev/">Stitches</a> didn’t do
                        everything at run time? What if Facebook didn’t take 6
                        years to release{" "}
                        <a href="https://stylexjs.com/">StyleX</a>? The answer
                        to all of these questions is Hyper CSS, my bastard child
                        of the three. This CV was built with it.
                      </p>
                    </>
                  }
                />
                <Subsection
                  href="/gb"
                  title="Untitled Game Boy Emulator"
                  squircle={
                    <Squircle href="/gb">
                      <div
                        style={{
                          "background-color": "#A3B334",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          "align-items": "center",
                          "justify-content": "center",
                        }}
                      >
                        <GbPixel />
                      </div>
                    </Squircle>
                  }
                  list={<></>}
                  titleAccessory=""
                  description={
                    <>
                      <p>
                        This emulator has all you could wish for: broken
                        graphics, no framerate cap, poor performance, no timing
                        chip (which makes for a very boring game of Tetris), and
                        best of all it's written in TypeScript, because nothing
                        brings me more joy than using the wrong tool for the
                        job.
                      </p>
                    </>
                  }
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Subsection(props: {
  title: JSX.Element;
  href: string;
  description: JSX.Element;
  list: JSX.Element;
  titleAccessory: JSX.Element;
  squircle?: JSX.Element;
}) {
  return (
    <div>
      {props.squircle}
      <div css={{ display: "flex" }}>
        <h3 css={{ fontWeight: 600, flex: "1 0 0px" }}>
          <a href={props.href}>{props.title}</a>
        </h3>
        <p css={{ fontStyle: "italic" }}>{props.titleAccessory}</p>
      </div>
      <Show when={!!props.description}>
        <div
          css={{
            textAlign: "justify",
            spaceY: 12,
            mt: 4,
            "& a": {
              textDecoration: "underline",
              // textDecorationThickness: "1px",
              textDecorationColor: colors.secondaryLabel,
              // textDecorationColor: "var(--color-brand)",
              // textDecorationThickness: "1px",
            },
          }}
        >
          {props.description}
        </div>
      </Show>
      <Show when={!!props.list}>
        <div
          css={{
            pt: 12,
            "& a": {
              textDecoration: "underline",
              // textDecorationThickness: "1px",
              textDecorationColor: colors.secondaryLabel,
              // textDecorationColor: "var(--color-brand)",
              // textDecorationThickness: "1px",
            },
            "& ul": {
              textAlign: "justify",
              listStyle: "disc",
              paddingLeft: 20,
              ">::marker": {
                color: colors.secondaryLabel,
              },
              spaceY: 4,
            },
          }}
        >
          {props.list}
        </div>
      </Show>
    </div>
  );
}

function Squircle(props: { children?: JSX.Element; href: string }) {
  let ref: HTMLDivElement;

  onMount(() => {
    createSquircle(ref);
  });

  return (
    <a
      href={props.href}
      css={{
        filter: "drop-shadow(0 0px 0.67px rgba(0, 0, 0, 0.3))",
        mb: 12,
        float: "left",
        ml: -48 - 16,
      }}
    >
      <div
        ref={ref!}
        css={{
          w: 48,
          h: 48,
          r: 48 * 0.225,
          overflow: "hidden",
          bg: "white",
          d: "flex",
          items: "center",
          justify: "center",
        }}
      >
        {props.children}
      </div>
    </a>
  );
}

function Pixel(props: ComponentProps<"span">) {
  return (
    <span
      {...props}
      css={{
        display: "block",
        backgroundColor: "var(--color-brand)",
        w: 24,
        h: 24,
        clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
      }}
    />
  );
}

function GbPixel(props: ComponentProps<"span">) {
  return (
    <span
      {...props}
      css={{
        display: "block",
        backgroundColor: "#0F3810",
        w: 24,
        h: 24,
        clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
      }}
    />
  );
}
