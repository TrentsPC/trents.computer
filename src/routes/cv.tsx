import { JSX, onMount } from "solid-js";
import { createSquircle } from "~/utils/squircle";

import tuia from "~/assets/tuia-ios.png";
import webstack from "~/assets/webstack-macos.png";
import stJohn from "~/assets/st-john.png";
import codeClub from "~/assets/code-club-logo.svg";
import { Title } from "@solidjs/meta";
import { colors } from "~/theme.styles";

export default function Page() {
  return (
    <div
      css={{
        // w: "100vw",
        // h: "100vh",
        // bg: "red",
        // color: "white",
        d: "flex",
        items: "center",
        justify: "center",
        fontScale: 0,
      }}
    >
      <Title>CV</Title>
      <div
        css={{
          r: 5,
          bg: "white",
          w: 96 * 8.3,
          // h: 96 * 11.7,
          boxShadow: `0 0 1.5px rgba(0, 0, 0, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3)`,
          margin: 64,
          padding: 32,

          d: "flex",

          print: {
            w: "100%",
            h: "100%",
            boxShadow: "none",
            margin: 0,
            overflow: "hidden",
          },
        }}
      >
        <div css={{ flex: 1, pr: 32 }}>
          <h1 css={{ fontWeight: 700, fontScale: 8, align: "center" }}>
            Trent
            <br />
            Mitchell-Borley
          </h1>
          <p
            css={{
              fontWeight: 600,
              fontScale: 4,
              color: colors.secondaryLabel,
              align: "center",
            }}
          >
            Software Engineer
          </p>
          <div css={{ pt: 32 }}>
            <h2 css={{ fontWeight: 700, fontScale: 4, mb: 16 }}>Attributes</h2>
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
                Experienced in maintaining multi-hundred-thousand-line codebases
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
          <h2 css={{ fontWeight: 700, fontScale: 4, mb: 16, mt: 32 }}>
            Extra-curriculars
          </h2>
          <div css={{ spaceY: 32 }}>
            <div>
              <Squircle>
                <img css={{ bg: "#393" }} src={codeClub} />
              </Squircle>
              <h3 css={{ fontWeight: 600, mb: 4 }}>Code Club Aotearoa</h3>
              <p css={{ mb: 4 }}>
                I have volunteered as a mentor for Code Club Aotearoa for the
                last 7 years, teaching kids how to code. This has given me many
                opportunities to practice my communication skills and explaining
                technical concepts to students and parents of all abilities.
              </p>
            </div>
            <div>
              <Squircle>{/* <HypergoodPixel /> */}</Squircle>
              <h3 css={{ fontWeight: 600, mb: 4 }}>Hypergood CSS</h3>
              <p css={{ mb: 4 }}>
                Frustrated by the current state of bundle-time CSS frameworks, I
                made another one. Focused on conciseness, readability, and
                creating the smallest possible CSS bundle. This CV was built
                with it.
              </p>
              <p>
                <a href="https://hypergood.app/cv" css={{ color: colors.link }}>
                  hypergood.app/cv
                </a>
              </p>
            </div>
          </div>
        </div>
        <div
          css={{
            flex: 1,
            borderLeft: `var(--hairline) solid ${colors.separator}`,
            pl: 32,
          }}
        >
          <h2 css={{ fontWeight: 700, fontScale: 4, pb: 16 }}>Previous Work</h2>
          <div css={{ spaceY: 32 }}>
            <div>
              <Squircle>
                <div css={{ p: 6 }}>
                  <img src={stJohn} css={{ w: "100%", h: "100%" }} />
                </div>
              </Squircle>
              <h3 css={{ fontWeight: 600, mb: 4 }}>St John Elections (2023)</h3>
              <p css={{ mb: 4 }}>
                Our team collaborated with St John to create an online system to
                conduct and manage their internal elections, which now serves
                over 10,000 members.
              </p>
              <p>
                I was brought on as the sole frontend engineer to migrate the
                system from a PHP monolith to a SolidJS SPA frontend and JSON
                API. We noticeably improved the performance for users and
                drastically reduced the time to deploy new features, along with
                unlocking the ability to implement new deeply interactive
                features using their election dataset that were previously
                unfeasible.
              </p>
            </div>
            <div>
              <Squircle>
                <img src={webstack} css={{ w: "100%", h: "100%" }} />
              </Squircle>
              <h3 css={{ fontWeight: 600, mb: 4 }}>Webstack (2022-present)</h3>
              <p css={{ mb: 4 }}>
                I am the principal frontend engineer for Webstack, a no
                compromises website builder for small to medium businesses. I am
                responsible for the entire frontend, including the design
                system, WYSIWYG drag-and-drop editors for websites and emails,
                and an advanced rich-text editor.
              </p>
              <p css={{ mb: 4 }}>
                I set up automated testing and deployment pipelines, set a
                consistent code standard, and kept up-to-date documentation.
                This meant I could onboard new developers and have them
                deploying updates within hours of joining the business.
              </p>
              <p>
                I translated business requirements and user feedback into
                actionable technical tasks for myself and the rest of the team,
                and made sure everyone knew what needed to be worked on and why.
              </p>
            </div>
            <div>
              <Squircle>
                <img src={tuia} css={{ w: "100%", h: "100%" }} />
              </Squircle>
              <h3 css={{ fontWeight: 600, mb: 4 }}>Tuia (2022)</h3>
              <p>
                My first project at a new business as a web developer was to
                single-handedly fix and build on top of a 100k line single-file
                React Native proof of concept built in 2019 for the Anglican
                Church in Aotearoa, New Zealand and Polynesia. I quickly grew
                beyond my initial job description and refactored it into a
                modern, maintainable, well-documented app, keeping up with
                feature requests along the way.
              </p>
            </div>
          </div>
        </div>
      </div>
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
        filter: "drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.3))",
        mb: 12,
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
