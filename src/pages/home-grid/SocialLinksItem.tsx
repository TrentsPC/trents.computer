import { styled } from "@hypergood/css";
import { createSignal, JSX, onCleanup, onMount } from "solid-js";
import { createSpring } from "~/modules/spring";
import { useSquircle } from "~/utils/squircle";
import { GridItem } from "./components";
import facebook from "./facebook.webp";
import fetlife from "./fetlife.webp";
import linkedin from "./linkedin.webp";
import mail from "./mail.webp";
import managemyhealth from "./managemyhealth.webp";
import minecraft from "./minecraft.png";
import reddit from "./reddit.webp";
import soundcloud from "./soundcloud.webp";
import steam from "./steam.webp";
import wikipedia from "./wikipedia.webp";

type SocialLink = {
  background: string;
  icon: () => JSX.Element;
};
const SOCIAL_LINKS: SocialLink[] = [
  {
    background: "linear-gradient(to top, #FA233B, #FB5C74)",
    icon: () => <AppleMusicIcon />,
  },
  {
    background: "linear-gradient(to top, #5AB9FF, #0A7AFF)",
    icon: () => <BlueskyLogoIcon />,
  },
  {
    background: "#5765F2",
    icon: () => <DiscordIcon />,
  },
  {
    background: "#24292E",
    icon: () => <img src={facebook} css={{ width: "100%", height: "100%" }} />,
  },
  {
    background: "#24292E",
    icon: () => <img src={fetlife} css={{ width: "100%", height: "100%" }} />,
  },
  {
    background: "#24292E",
    icon: () => <GithubIcon />,
  },
  {
    background: "#24292E",
    icon: () => <img src={mail} css={{ width: "100%", height: "100%" }} />,
  },
  {
    background: "#EB6707",
    icon: () => (
      <img src={managemyhealth} css={{ width: "100%", height: "100%" }} />
    ),
  },
  {
    background: "#24292E",
    icon: () => <img src={minecraft} css={{ width: "100%", height: "100%" }} />,
  },
  {
    background: "#212830",
    icon: () => <LetterboxdLogoIcon />,
  },
  {
    background: "#0B66C2",
    icon: () => <img src={linkedin} />,
  },
  {
    background: "#0B66C2",
    icon: () => <img src={reddit} />,
  },
  {
    background: "#000000",
    icon: () => <img src={soundcloud} />,
  },
  {
    background: "#0A1A40",
    icon: () => <img src={steam} />,
  },
  {
    background: "#1EA1F1",
    icon: () => <TwitterLogoIcon />,
  },
  {
    background: "#07242B",
    icon: () => <VRChatIcon />,
  },
  {
    background: "#fff",
    icon: () => <img src={wikipedia} css={{ width: "100%", height: "100%" }} />,
  },
];

const urls = [
  "https://music.apple.com/profile/TrentsPC",
  "https://bsky.app/profile/trents.computer",
  "https://github.com/TrentsPC",
  "https://crafty.gg/@Amoroc",
  "https://letterboxd.com/TrentsPC/",
  "https://www.linkedin.com/in/trents-pc/",
  "https://twitter.com/TrentsPC",
  "https://vrchat.com/home/user/usr_ad4a7923-ad94-467b-bfd8-0a86f8e23d80",
  "https://en.wikipedia.org/wiki/User_talk:TrentsPC",
];

function createAnimationFrame(callback: (dt: number) => void) {
  let running = true;
  let previousTimeRef: number | undefined = undefined;

  const animate = (time: number) => {
    if (previousTimeRef !== undefined) {
      const deltaTime = time - previousTimeRef;
      callback(deltaTime);
    }
    previousTimeRef = time;
    if (running) requestAnimationFrame(animate);
  };

  onMount(() => {
    requestAnimationFrame(animate);
    onCleanup(() => {
      running = false;
    });
  });
}

export function SocialLinksItem(props: Record<string, unknown>) {
  let scrollPosition = 0;
  const maxScroll = SOCIAL_LINKS.length * 60;
  let element: HTMLDivElement | undefined;
  const [hovered, setHovered] = createSignal(false);
  const scrollSpeed = createSpring(() => ({
    value: hovered() ? 0.8 : 0.03,
    damping: 0.85,
    period: hovered() ? 0.25 : 2,
  }));

  const [urlIdx, setUrlIdx] = createSignal(0);
  const url = () => urls[Math.floor(urlIdx()) % urls.length];

  createAnimationFrame((dt) => {
    if (hovered()) {
      setUrlIdx((urlIdx) => urlIdx + (dt / 1000) * 12);
    }
    scrollPosition += dt * scrollSpeed();
    if (scrollPosition > maxScroll) {
      scrollPosition -= maxScroll;
    }

    element?.scrollTo({
      left: scrollPosition,
      behavior: "instant",
    });
  });

  return (
    <GridItem
      {...props}
      component="div"
      css={{ height: 52, padding: 0, position: "relative" }}
    >
      <div
        ref={element}
        css={{
          width: "100%",
          display: "flex",
          items: "center",
          justify: "flex-start",
          textAlign: "left",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {SOCIAL_LINKS.map((link) => (
          <Square
            target="_blank"
            rel="noopener noreferrer"
            ref={useSquircle()}
            href={url()}
            style={{ background: link.background }}
          >
            {link.icon()}
          </Square>
        ))}
        {SOCIAL_LINKS.map((link) => (
          <Square
            target="_blank"
            rel="noopener noreferrer"
            ref={useSquircle()}
            href={url()}
            style={{ background: link.background }}
          >
            {link.icon()}
          </Square>
        ))}
        {SOCIAL_LINKS.map((link) => (
          <Square
            target="_blank"
            rel="noopener noreferrer"
            ref={useSquircle()}
            href={url()}
            style={{ background: link.background }}
          >
            {link.icon()}
          </Square>
        ))}
        {SOCIAL_LINKS.map((link) => (
          <Square
            target="_blank"
            rel="noopener noreferrer"
            ref={useSquircle()}
            href={url()}
            style={{ background: link.background }}
          >
            {link.icon()}
          </Square>
        ))}
      </div>
      <ProgressiveBlur />
      <ProgressiveBlur2 />
      {/* <div
        css={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          color: "black",
          zIndex: 3,
        }}
      >
        My Links
      </div> */}
    </GridItem>
  );
}

const Square = styled("a", {
  height: 40,
  width: 40,
  mr: 20,
  minW: 40,
  display: "flex",
  items: "center",
  justify: "center",
  borderRadius: 9,
});

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 361 361" css={{ width: "100%", height: "100%" }}>
      <path
        fill="white"
        d="M254.5,55c-0.87,0.08-8.6,1.45-9.53,1.64l-107,21.59l-0.04,0.01c-2.79,0.59-4.98,1.58-6.67,3
			c-2.04,1.71-3.17,4.13-3.6,6.95c-0.09,0.6-0.24,1.82-0.24,3.62c0,0,0,109.32,0,133.92c0,3.13-0.25,6.17-2.37,8.76
			c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01
			c-4.98,1.93-8.71,4.39-11.68,7.51c-5.89,6.17-8.28,14.54-7.46,22.38c0.7,6.69,3.71,13.09,8.88,17.82
			c3.49,3.2,7.85,5.63,12.99,6.66c5.33,1.07,11.01,0.7,19.31-0.98c4.42-0.89,8.56-2.28,12.5-4.61c3.9-2.3,7.24-5.37,9.85-9.11
			c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1.19-8.7,1.19-13.26l0-116.15c0-6.22,1.76-7.86,6.78-9.08c0,0,88.94-17.94,93.09-18.75
			c5.79-1.11,8.52,0.54,8.52,6.61l0,79.29c0,3.14-0.03,6.32-2.17,8.92c-2.12,2.59-4.74,3.37-7.81,3.99
			c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01c-4.98,1.93-8.71,4.39-11.68,7.51
			c-5.89,6.17-8.49,14.54-7.67,22.38c0.7,6.69,3.92,13.09,9.09,17.82c3.49,3.2,7.85,5.56,12.99,6.6c5.33,1.07,11.01,0.69,19.31-0.98
			c4.42-0.89,8.56-2.22,12.5-4.55c3.9-2.3,7.24-5.37,9.85-9.11c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1-8.7,1-13.26V64.46
			C263.54,58.3,260.29,54.5,254.5,55z"
      />
    </svg>
  );
}

function BlueskyLogoIcon() {
  return (
    <svg fill="none" viewBox="0 0 64 57" css={{ width: "67%", height: "67%" }}>
      <path
        fill="#fff"
        d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"
      ></path>
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 127.14 96.36" css={{ width: "67%", height: "67%" }}>
      <path
        fill="#fff"
        d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg css={{ width: "70%", height: "70%" }} viewBox="0 0 98 96">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
        fill="#fff"
      />
    </svg>
  );
}
function LetterboxdLogoIcon() {
  return (
    <svg viewBox="0 0 500 500" css={{ width: "100%", height: "100%" }}>
      <defs>
        <rect
          id="path-1"
          x="0"
          y="0"
          width="129.847328"
          height="141.389313"
        ></rect>
        <rect
          id="path-3"
          x="0"
          y="0"
          width="129.847328"
          height="141.389313"
        ></rect>
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      css={{ width: "70%", height: "70%" }}
      viewBox="0 0 248 204"
    >
      <path
        // fill="#1DA1F2"
        fill="#ffffff"
        d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
      />
    </svg>
  );
}

function VRChatIcon() {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 514.36 224.33"
      css={{
        width: "80%",
        height: "80%",
      }}
    >
      <g id="Logo">
        <path
          fill="white"
          d="M318.91 38.72c-4.08 0-8.04 1.49-8.04 4.95v32.29h-27.83V43.67c0-3.46-3.96-4.95-8.04-4.95s-8.04 1.49-8.04 4.95v80.41c0 3.33 4.08 5.07 8.04 5.07s8.04-1.73 8.04-5.07v-35.5h27.83v35.5c0 3.33 4.08 5.07 8.04 5.07s8.04-1.73 8.04-5.07V43.66c0-3.46-3.96-4.95-8.04-4.95ZM144.82 52.81h-13.61v26.35h13.61c8.04 0 13.24-3.33 13.24-13.11s-5.19-13.24-13.24-13.24Zm236.67-9.39c-1.11-3.71-5.82-5.44-10.39-5.44s-9.15 1.73-10.26 5.44l-23.87 77.8c-.12.5-.25.99-.25 1.24 0 3.96 5.81 6.68 10.14 6.68 2.72 0 4.82-.87 5.44-3.22l4.7-16.46h28.33l4.71 16.46c.62 2.36 2.72 3.22 5.44 3.22 4.32 0 10.14-2.85 10.14-6.68 0-.37-.12-.74-.25-1.24l-23.87-77.8Zm-21.14 53.43 10.76-37.97 10.76 37.97h-21.53ZM225.9 52.8c11.75 0 12.61 8.41 12.86 12.25.12 3.71 3.46 5.07 8.04 5.07 5.44 0 8.04-1.49 8.04-7.92 0-14.35-12.25-23.5-29.44-23.5-15.58 0-28.57 7.68-28.57 28.33v34.51c0 20.66 12.86 28.33 28.44 28.33 17.32 0 29.57-9.52 29.57-24.49 0-6.31-2.6-7.92-8.17-7.92-4.21 0-7.67 1.24-7.92 5.07-.36 5.19-1.36 13.24-12.61 13.24v-.02c-8.54 0-13.24-4.57-13.24-14.22V67.02c0-9.64 4.7-14.22 12.99-14.22Z"
        />
        <path
          fill="white"
          d="M487.19 10.68H27.18c-9.48 0-17.16 7.68-17.16 17.16v112.85c0 9.48 7.67 17.16 17.16 17.16h403.41l39.97 51.44c2.61 3.35 4.97 5.03 6.67 5.03s2.75-1.66 2.76-4.98l-.07-50.82v-.67h7.27c9.47 0 17.16-7.68 17.16-17.16V27.84c0-9.47-7.68-17.16-17.16-17.16ZM105.11 46.63l-23.75 77.8c-1.11 3.71-5.69 5.44-10.39 5.44s-9.15-1.73-10.39-5.44l-23.87-77.8c-.12-.5-.25-.99-.25-1.24 0-3.96 5.82-6.68 10.14-6.68 2.72 0 4.82.86 5.44 3.22l18.93 67.04 18.8-67.04c.62-2.35 2.72-3.22 5.44-3.22 4.33 0 10.14 2.85 10.14 6.68 0 .37-.12.74-.25 1.24Zm59.61 83.13c-2.22 0-4.33-1.36-5.57-3.83l-17.57-34.14h-10.39v32.29c0 3.33-3.96 5.07-8.04 5.07s-8.04-1.73-8.04-5.07V43.66h.01c0-2.6 2.1-4.95 5.19-4.95h24.49c16.21 0 29.32 6.18 29.32 25.86 0 14.22-6.93 21.89-16.21 24.74l16.21 30.05c.5.62.61 1.49.61 1.98 0 4.08-5.32 8.41-10.01 8.41Zm313.18-9.59c0 9.47-7.68 17.16-17.16 17.16H200.73c-9.47 0-17.16-7.68-17.16-17.16V47.68c0-9.47 7.68-17.16 17.16-17.16h260.01c9.47 0 17.16 7.68 17.16 17.16v72.49Z"
        />
        <path
          fill="white"
          d="M459.54 38.72h-52.32c-3.46 0-5.07 3.72-5.07 7.18 0 3.95 1.86 7.29 5.07 7.29h18.18v70.87c0 3.33 4.08 5.07 8.04 5.07s8.04-1.73 8.04-5.07V53.19h18.06c3.21 0 5.07-3.46 5.07-7.29 0-3.47-1.61-7.18-5.07-7.18Z"
        />
        <path
          fill="black"
          d="M487.19 0H27.18C12.2 0 0 12.19 0 27.18v113.51c0 14.99 12.2 27.18 27.18 27.18h398.5l36.98 47.57c4.59 5.9 9.49 8.89 14.57 8.89 3.28 0 6.34-1.27 8.64-3.57 2.74-2.76 4.13-6.61 4.12-11.48l-.05-41.56c13.69-1.39 24.42-12.98 24.42-27.04V27.18c0-15-12.19-27.18-27.17-27.18Zm17.16 140.69c0 9.48-7.69 17.16-17.16 17.16h-7.27v.67l.07 50.82c-.01 3.32-1.06 4.98-2.76 4.98s-4.06-1.68-6.67-5.03l-39.97-51.44H27.18c-9.49 0-17.16-7.68-17.16-17.16V27.84c0-9.48 7.68-17.16 17.16-17.16h460.01c9.48 0 17.16 7.69 17.16 17.16v112.85Z"
        />
        <path
          fill="black"
          d="M95.22 38.72c-2.72 0-4.82.87-5.44 3.22l-18.8 67.04-18.93-67.04c-.62-2.36-2.72-3.22-5.44-3.22-4.32 0-10.14 2.72-10.14 6.68 0 .25.12.74.25 1.24l23.87 77.8c1.24 3.71 5.69 5.44 10.39 5.44s9.28-1.73 10.39-5.44l23.75-77.8c.12-.5.25-.86.25-1.24 0-3.83-5.81-6.68-10.14-6.68Zm62.7 50.59c9.28-2.85 16.21-10.51 16.21-24.74 0-19.68-13.11-25.86-29.32-25.86h-24.49c-3.1 0-5.19 2.35-5.19 4.95h-.01v80.42c0 3.33 3.96 5.07 8.04 5.07s8.04-1.73 8.04-5.07V91.79h10.39l17.57 34.14c1.24 2.47 3.35 3.83 5.57 3.83 4.7 0 10.01-4.33 10.01-8.41 0-.5-.11-1.36-.61-1.98l-16.21-30.05Zm-13.1-10.15h-13.61V52.81h13.61c8.04 0 13.24 3.46 13.24 13.24s-5.19 13.11-13.24 13.11Zm215.53 17.69h21.53l-10.77-37.97-10.76 37.97z"
        />
        <path
          fill="black"
          d="M460.74 30.52H200.73c-9.48 0-17.16 7.69-17.16 17.16v72.49c0 9.48 7.69 17.16 17.16 17.16h260.01c9.48 0 17.16-7.69 17.16-17.16V47.68c0-9.48-7.69-17.16-17.16-17.16Zm-234.59 85.24v.02c11.25 0 12.25-8.04 12.61-13.24.25-3.83 3.71-5.07 7.92-5.07 5.57 0 8.17 1.61 8.17 7.92 0 14.97-12.25 24.49-29.57 24.49-15.58 0-28.44-7.67-28.44-28.33V67.04c0-20.65 12.99-28.33 28.57-28.33 17.19 0 29.44 9.15 29.44 23.5 0 6.43-2.6 7.92-8.04 7.92-4.58 0-7.92-1.36-8.04-5.07-.25-3.83-1.11-12.25-12.86-12.25-8.29 0-12.99 4.58-12.99 14.22v34.51c0 9.65 4.7 14.22 13.24 14.22Zm100.8 8.3c0 3.35-4.08 5.08-8.04 5.08s-8.04-1.73-8.04-5.07v-35.5h-27.83v35.5c0 3.33-4.08 5.07-8.04 5.07s-8.04-1.73-8.04-5.07V43.66c0-3.46 3.96-4.95 8.04-4.95s8.04 1.49 8.04 4.95v32.29h27.83V43.66c0-3.46 3.96-4.95 8.04-4.95s8.04 1.49 8.04 4.95v80.4Zm68.52 5.08c-2.72 0-4.82-.86-5.44-3.22l-4.71-16.46h-28.33l-4.7 16.46c-.62 2.35-2.72 3.22-5.44 3.22-4.33 0-10.14-2.72-10.14-6.68 0-.25.12-.74.25-1.24l23.87-77.8c1.11-3.71 5.69-5.44 10.26-5.44s9.28 1.73 10.39 5.44l23.87 77.8c.12.5.25.86.25 1.24 0 3.83-5.82 6.68-10.14 6.68Zm64.07-75.95h-18.06v70.87c0 3.33-4.08 5.07-8.04 5.07s-8.04-1.73-8.04-5.07V53.19h-18.18c-3.21 0-5.07-3.35-5.07-7.29 0-3.46 1.61-7.18 5.07-7.18h52.32c3.46 0 5.07 3.71 5.07 7.18 0 3.83-1.86 7.29-5.07 7.29Z"
        />
      </g>
    </svg>
  );
}

function ProgressiveBlur() {
  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: 200,
      }}
    >
      <BlurSlice
        style={{
          "backdrop-filter": "blur(1px)",
          mask: `linear-gradient(
          to right,
          rgba(0, 0, 0, 1) 87.5%,
          rgba(0, 0, 0, 0) 100%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(2px)",
          mask: `linear-gradient(
          to right,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 0) 87.5%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(3px)",
          mask: `linear-gradient(
          to right,
          rgba(0, 0, 0, 1) 62.5%,
          rgba(0, 0, 0, 0) 75%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(4px)",
          mask: `linear-gradient(
          to right,
          rgba(0, 0, 0, 1) 50%,
          rgba(0, 0, 0, 0) 62.5%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(5px)",
          mask: `linear-gradient(
          to right,
          rgba(0, 0, 0, 1) 37.5%,
          rgba(0, 0, 0, 0) 50%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(6px)",
          mask: `linear-gradient(
          to right,
          rgba(0, 0, 0, 1) 25%,
          rgba(0, 0, 0, 0) 37.5%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(7px)",
          mask: `linear-gradient(
          to right,
          rgba(0, 0, 0, 1) 12.5%,
          rgba(0, 0, 0, 0) 25%
        )`,
        }}
      />
      <BlurSlice
        style={{
          background: "white",
          mask: `linear-gradient(
          to right,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0) 50%
        )`,
        }}
      />
    </div>
  );
}

function ProgressiveBlur2() {
  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: 200,
      }}
    >
      <BlurSlice
        style={{
          "backdrop-filter": "blur(1px)",
          mask: `linear-gradient(
          to left,
          rgba(0, 0, 0, 1) 87.5%,
          rgba(0, 0, 0, 0) 100%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(2px)",
          mask: `linear-gradient(
          to left,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 0) 87.5%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(3px)",
          mask: `linear-gradient(
          to left,
          rgba(0, 0, 0, 1) 62.5%,
          rgba(0, 0, 0, 0) 75%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(4px)",
          mask: `linear-gradient(
          to left,
          rgba(0, 0, 0, 1) 50%,
          rgba(0, 0, 0, 0) 62.5%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(5px)",
          mask: `linear-gradient(
          to left,
          rgba(0, 0, 0, 1) 37.5%,
          rgba(0, 0, 0, 0) 50%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(6px)",
          mask: `linear-gradient(
          to left,
          rgba(0, 0, 0, 1) 25%,
          rgba(0, 0, 0, 0) 37.5%
        )`,
        }}
      />
      <BlurSlice
        style={{
          "backdrop-filter": "blur(7px)",
          mask: `linear-gradient(
          to left,
          rgba(0, 0, 0, 1) 12.5%,
          rgba(0, 0, 0, 0) 25%
        )`,
        }}
      />
      <BlurSlice
        style={{
          background: "white",
          mask: `linear-gradient(
          to left,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0) 50%
        )`,
        }}
      />
    </div>
  );
}

const BlurSlice = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: 200,
  zIndex: 1,
});
