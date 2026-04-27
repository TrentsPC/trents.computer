import { styled } from "@hypergood/css";
import { getRouteApi } from "@tanstack/solid-router";
import { onMount } from "solid-js";
import { useSquircle } from "~/utils/squircle";
import { GridItem } from "./home-grid/components";
import { FooterTextItem } from "./home-grid/FooterTextItem";
import { MinimizeItem } from "./home-grid/MinimizeItem";
import { SocialLinksItem } from "./home-grid/SocialLinksItem";

const route = getRouteApi("/");

export function HomePageGrid() {
  let ref: HTMLDivElement;
  onMount(() => {
    if (ref) {
      for (const node of ref.children) {
        useSquircle()(node as HTMLElement);
      }
    }
  });
  return (
    <div
      css={{
        width: "100%",
        height: "100lvh",
        minH: "100lvh",
        maxH: "100lvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#E9E9E9",
      }}
    >
      <div css={{ minH: 12 }} />
      <Grid ref={ref!}>
        {/* <GridItem
          component="div"
          css={{
            position: "relative",
          }}
          style={{
            "grid-area": FACE,
          }}
        >
          <img
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={image}
            alt=""
          />
        </GridItem> */}

        <GridItem
          css={{
            backgroundColor: "#F8F4EF",
            ":hover": {
              backgroundColor: "#F8F4EF",
            },
          }}
          href="https://givenwell.com/"
        >
          <GivenwellLogoIcon />
        </GridItem>
        <GridItem href="/gb">Game Boy</GridItem>
        <GridItem href="https://hypergood.app/css">Weave CSS</GridItem>
        <GridItem href="/boggle">Boogle</GridItem>
        <GridItem href="/chadgdp">ChadGDP</GridItem>
        <GridItem href="/sokoban">Sokoban</GridItem>
        <GridItem href="https://hypergood.app/spring">Spring Physics</GridItem>
        <GridItem href="/tic-tac-toe">Tic-tac-tock</GridItem>
        <GridItem href="/secret-word">Secret Word</GridItem>
        <GridItem href="/words">Yummy Words</GridItem>
        {/* <GridItem style={{ "grid-area": NAMING }} href="/two-hard-things">
          Two Hard Things
          </GridItem> */}
        <GridItem href="/#">Trents.Computer</GridItem>
        <GridItem href="/cv">Curriculum Vitae (Old, lol)</GridItem>
        {/* <GridItem style={{ "grid-area": FONTEXPLORER }} href="/font-explorer">
          Font Explorer
        </GridItem> */}
      </Grid>
      <div css={{ p: 12 }}>
        <div
          css={{
            display: "grid",
            flexShrink: 0,
            gap: 12,
            gridTemplateColumns: "1fr auto",
            "@md": {
              height: 52,
              gridTemplateColumns: "auto 1fr auto",
            },
          }}
        >
          <FooterTextItem css={{ order: 1, "@md": { order: 0 } }} />

          <SocialLinksItem
            css={{
              flex: "1 0 0px",
              order: 0,
              colSpan: 2,
              "@md": { order: 1, colSpan: 1 },
            }}
          />

          <MinimizeItem css={{ order: 2 }} />
        </div>
      </div>
    </div>
  );
}

const Grid = styled("div", {
  flex: "1 0 0px",
  px: 12,
  gap: 12,
  display: "grid",
  // grid-auto-columns: minmax(0, 1fr);
  gridAutoRows: "minmax(0, 1fr)",

  "@sm": {
    "@media (min-aspect-ratio: 9/64)": {},
    "@media (min-aspect-ratio: 9/32)": {},
    "@media (min-aspect-ratio: 9/21)": {},
    "@media (min-aspect-ratio: 10/16)": {
      gridCols: 2,
      // gridRows: "repeat(auto, 1fr)",
    },
    "@media (min-aspect-ratio: 3/4)": {
      gridCols: 2,
      // gridRows: "repeat(auto, 1fr)",
    },
    "@media (min-aspect-ratio: 1/1)": {
      gridCols: 3,
      // gridRows: "repeat(auto, 1fr)",
    },
    "@media (min-aspect-ratio: 4/3)": {
      gridCols: 4,
      // gridRows: "repeat(auto, 1fr)",
    },
    "@media (min-aspect-ratio: 16/10)": {
      gridCols: 4,
      // gridRows: "repeat(auto, 1fr)",
    },
    "@media (min-aspect-ratio: 21/9)": {},
    "@media (min-aspect-ratio: 32/9)": {},
    "@media (min-aspect-ratio: 64/9)": {},
  },
});

function BlueskyLogoIcon() {
  return (
    <svg fill="none" viewBox="0 0 64 57" width="64" style="width: 64px; height: 64px;">
      <path
        fill="#0085ff"
        d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"
      ></path>
    </svg>
  );
}

function GithubLogoIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="#fff"
      />
    </svg>
  );
}

function GivenwellLogoIcon() {
  return (
    <svg
      id="Layer_1"
      width="80"
      height="80"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 325.64 390.23"
    >
      <defs>
        <style>
          {".cls-1{fill:#5cc1bf;}.cls-1,.cls-2{stroke-width:0px;}.cls-2{fill:#2e2d75;}"}
        </style>
      </defs>
      <path
        class="cls-1"
        d="M110.21,103.02c-8.01.59-23.38.11-26.96-10.84-4.23-12.85,12.78-23.35,18.36-26.79,26.64-16.43,70.27-28.73,90.42-29.95,6.57-.4,26.41-2.28,30.64,10.57,4.23,12.85-12.71,23.47-18.36,26.79-35.06,20.58-72.74,28.65-94.09,30.22ZM155.15,75.73c23.64-7.84,38.78-17.06,45.9-22.56-8.98-.17-26.66,1.29-50.33,9.11-23.64,7.84-38.59,17.13-45.87,22.76,8.63.13,26.63-1.49,50.29-9.3Z"
      />
      <path
        class="cls-2"
        d="M268.06,154.85c16.85-13.55,19.81-24.32,15.88-29.19-11.48,2.42-20.31,4.44-27.49,6.29-12.35-16.97-32-28.81-61.4-28.81-22.89,0-42.65,9.31-54.54,23.5-16.48,19.68-19.75,52.86-21.87,62.44-9.15,41.21-26.58,75.02-78.48,120.95,69.96,6.39,128.22-26.34,142.84-98.26,1.23-5.76,9.95-4.16,8.95,1.73-9.28,57.84-45.72,94.02-94.5,107.99,6.35,3.1,25.92,9.44,46.45,8.21l.98,9.06c1.05,10.2,9.67,17.9,19.91,17.9l2.45-30.41c4.74-1.19,9.24-2.59,13.47-4.13l1.8,16.64c1.05,10.2,9.67,17.9,19.91,17.9l3.75-46.64c81.52-51.41,70.42-136.02,61.88-155.19ZM209.18,135.6c8.97.02,12.53,8.63,11.86,12.59-5.99,1.22-12.79,4.19-18.41,9.29-3.23-2.13-5.37-5.79-5.37-9.95,0-6.59,5.34-11.94,11.92-11.93Z"
      />
    </svg>
  );
}

function LetterboxdLogoIcon() {
  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 500 500"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <rect id="path-1" x="0" y="0" width="129.847328" height="141.389313"></rect>
        <rect id="path-3" x="0" y="0" width="129.847328" height="141.389313"></rect>
      </defs>
      <g
        id="letterboxd-decal-dots-pos-rgb"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <circle id="Circle" fill="#202830" cx="250" cy="250" r="250"></circle>
        <g id="dots-neg" transform="translate(61.000000, 180.000000)">
          <g id="Dots">
            <ellipse
              id="Green"
              fill="#00E054"
              cx="189"
              cy="69.9732824"
              rx="70.0786517"
              ry="69.9732824"
            ></ellipse>
            <g id="Blue" transform="translate(248.152672, 0.000000)">
              <mask id="mask-2" fill="white">
                <use href="#path-1"></use>
              </mask>
              <g id="Mask"></g>
              <ellipse
                fill="#40BCF4"
                mask="url(#mask-2)"
                cx="59.7686766"
                cy="69.9732824"
                rx="70.0786517"
                ry="69.9732824"
              ></ellipse>
            </g>
            <g id="Orange">
              <mask id="mask-4" fill="white">
                <use href="#path-3"></use>
              </mask>
              <g id="Mask"></g>
              <ellipse
                fill="#FF8000"
                mask="url(#mask-4)"
                cx="70.0786517"
                cy="69.9732824"
                rx="70.0786517"
                ry="69.9732824"
              ></ellipse>
            </g>
            <path
              d="M129.539326,107.022244 C122.810493,96.2781677 118.921348,83.5792213 118.921348,69.9732824 C118.921348,56.3673435 122.810493,43.6683972 129.539326,32.9243209 C136.268159,43.6683972 140.157303,56.3673435 140.157303,69.9732824 C140.157303,83.5792213 136.268159,96.2781677 129.539326,107.022244 Z"
              id="Overlap"
              fill="#FFFFFF"
            ></path>
            <path
              d="M248.460674,32.9243209 C255.189507,43.6683972 259.078652,56.3673435 259.078652,69.9732824 C259.078652,83.5792213 255.189507,96.2781677 248.460674,107.022244 C241.731841,96.2781677 237.842697,83.5792213 237.842697,69.9732824 C237.842697,56.3673435 241.731841,43.6683972 248.460674,32.9243209 Z"
              id="Overlap"
              fill="#FFFFFF"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

function TwitterLogoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 248 204">
      <path
        fill="#1DA1F2"
        // fill="#ffffff"
        d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
      />
    </svg>
  );
}
