import { createFileRoute } from "@tanstack/solid-router";
import { justify } from "justif";
import { hyphenateEnGB } from "justif/hyphenate/en-gb";
import { ComponentProps, JSX, onCleanup, onMount } from "solid-js";
import { createSquircle } from "~/utils/squircle";

import berryHill from "~/assets/berry-hill.png";
import givenwell from "~/assets/givenwell.png";
import stJohn from "~/assets/st-john.png";
import tuia from "~/assets/tuia-ios.png";
import webstack from "~/assets/webstack-macos.png";
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
          <h1 css={{ fontWeight: 600, fontScale: 8, align: "center" }}>
            Trent Mitchell-Borley
          </h1>
          <p
            css={{
              fontWeight: 400,
              fontScale: 4,
              color: colors.secondaryLabel,
              align: "center",
            }}
          >
            trent@trents.computer
          </p>
          <section>
            <div css={{ pt: 32 }}>
              <h2 css={{ fontWeight: 600, fontScale: 4, mb: 16 }}>Summary</h2>
              <ul
                css={{
                  listStyle: "disc",
                  ">::marker": {
                    color: colors.secondaryLabel,
                  },
                  spaceY: 4,
                }}
              >
                <li>
                  Studied Computer Science & Physics at the University of Otago
                </li>
                <li>4+ years experience with TypeScript & React</li>
                <li>3 years experience with PHP, MySQL, PostgreSQL, Express</li>
                <li>2 years experience with AWS & Cloudflare</li>
                <li>
                  Experienced in maintaining multi-hundred-thousand-line
                  codebases
                </li>
                <li>Experienced and comfortable in tiny teams</li>
                <li>Happy to wear many hats in a project</li>
                <li>
                  Can communicate and advocate for the needs of my team with the
                  rest of the business
                </li>

                <li>Deep understanding of design principles</li>
                <li>Enthusiastic and fast learner</li>
                <li>Deeply self-motivated</li>
              </ul>
            </div>
          </section>
          <section>
            <h2 css={{ fontWeight: 600, fontScale: 4, pb: 16 }}>Experience</h2>
            <div css={{ spaceY: 24, "& p": { align: "justify" } }}>
              <Subsection
                squircle={
                  <Squircle>
                    <img src={givenwell} />
                  </Squircle>
                }
                title="Givenwell"
                titleAccessory="Oct 2023 – Present"
                description={<></>}
                list={<ul></ul>}
              />
              <Subsection
                squircle={
                  <Squircle>
                    <img src={berryHill} />
                  </Squircle>
                }
                title="Berry Hill"
                titleAccessory="June 2021 – Oct 2023"
                description={<></>}
                list={<ul></ul>}
              />
              <Subsection
                squircle={
                  <Squircle>
                    <div style={{ padding: "6px" }}>
                      <img src={stJohn} />
                    </div>
                  </Squircle>
                }
                title="St John Elections"
                titleAccessory="2023"
                description={
                  <>
                    <p>
                      Our team collaborated with St John to create an online
                      system to conduct and manage their internal elections,
                      which now serves over 10,000 members.
                    </p>
                    <p>
                      I was brought on as the sole frontend engineer to migrate
                      the system from a PHP monolith to a SolidJS SPA frontend
                      and JSON API. We noticeably improved the performance for
                      users and drastically reduced the time to deploy new
                      features, along with unlocking the ability to implement
                      new deeply interactive features using their election
                      dataset that were previously unfeasible.
                    </p>
                  </>
                }
                list={<ul></ul>}
              />
              <Subsection
                squircle={
                  <Squircle>
                    <img src={webstack} css={{ w: "100%", h: "100%" }} />
                  </Squircle>
                }
                title="Webstack"
                titleAccessory="2022 – 2023"
                description={
                  <>
                    <p>
                      I am the principal frontend engineer for Webstack, a no
                      compromises website builder for small to medium
                      businesses. I am responsible for the entire frontend,
                      including the design system, WYSIWYG drag-and-drop editors
                      for websites and emails, and an advanced rich-text editor.
                    </p>
                    <p>
                      I set up automated testing and deployment pipelines, set a
                      consistent code standard, and kept up-to-date
                      documentation. This meant I could onboard new developers
                      and have them deploying updates within hours of joining
                      the business.
                    </p>
                    <p>
                      I translated business requirements and user feedback into
                      actionable technical tasks for myself and the rest of the
                      team, and made sure everyone knew what needed to be worked
                      on and why.
                    </p>
                  </>
                }
                list={<ul></ul>}
              />
              <Subsection
                squircle={
                  <Squircle>
                    <img src={tuia} css={{ w: "100%", h: "100%" }} />
                  </Squircle>
                }
                title="Tuia"
                titleAccessory="2022"
                description={
                  <>
                    <p>
                      My first project at a new business as a web developer was
                      to single-handedly fix and build on top of a 100k line
                      single-file React Native proof of concept built in 2019
                      for the Anglican Church in Aotearoa, New Zealand and
                      Polynesia. I quickly grew beyond my initial job
                      description and refactored it into a modern, maintainable,
                      well-documented app, keeping up with feature requests
                      along the way.
                    </p>
                  </>
                }
                list={<ul></ul>}
              />
            </div>
          </section>
          <section>
            <h2 css={{ fontWeight: 600, fontScale: 4, mb: 16, mt: 32 }}>
              Extra-curriculars
            </h2>
            <div css={{ spaceY: 32, "& p": { align: "justify" } }}>
              <div>
                <Squircle>
                  <Pixel />
                </Squircle>
                <h3 css={{ fontWeight: 600, mb: 4 }}>Hypergood CSS</h3>
                <p css={{ mb: 4 }}>
                  Frustrated by the current state of bundle-time CSS frameworks,
                  I made another one. Focused on conciseness, readability, and
                  creating the smallest possible CSS bundle. This CV was built
                  with it.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Subsection(props: {
  title: JSX.Element;
  description: JSX.Element;
  list: JSX.Element;
  titleAccessory: JSX.Element;
  squircle?: JSX.Element;
}) {
  return (
    <div>
      {props.squircle}
      <div css={{ display: "flex" }}>
        <h3 css={{ fontWeight: 600, mb: 4, flex: "1 0 0px" }}>{props.title}</h3>
        <p css={{ fontStyle: "italic" }}>{props.titleAccessory}</p>
      </div>
      <div css={{ textAlign: "justify", spaceY: 12 }}>{props.description}</div>
      <div>{props.list}</div>
    </div>
  );
}

function Squircle(props: { children?: JSX.Element }) {
  let ref: HTMLDivElement;

  onMount(() => {
    createSquircle(ref);
  });

  return (
    <div
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
    </div>
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
