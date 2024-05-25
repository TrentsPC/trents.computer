import { styled } from "@hypergood/css";
import { useSearchParams } from "@solidjs/router";
import { ExternalLinkIcon } from "solid-radix-icons";
import image from "~/assets/profile-image.png";
import { OS, OSRevealer } from "~/modules/os/OSRevealer";
import { colors } from "~/theme.styles";
import { FooterText } from "./FooterText";

export function HomePageGrid() {
  const [search] = useSearchParams<{ os: string }>();
  return (
    <div
      css={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div css={{ minH: 48 }} />
      <div
        css={{
          flex: "1 0 0px",
          px: 16,
          gap: 16,
          display: "grid",
          gridTemplateAreas: `
            "boggle boggle sokoban sokoban ttt ttt"
            "secret secret secret words words words"
            "css css css css css css"
            "spring spring spring primitives primitives primitives"
            "cv cv cv font font font"
            "title title title title title title"
          `,

          "@media (min-aspect-ratio: 9/64)": {},
          "@media (min-aspect-ratio: 9/32)": {},
          "@media (min-aspect-ratio: 9/21)": {},
          "@media (min-aspect-ratio: 10/16)": {},
          "@media (min-aspect-ratio: 3/4)": {},
          "@media (min-aspect-ratio: 1/1)": {
            gridTemplateAreas: `
          "boggle sokoban font words"
          "secret sokoban font words"
          "secret title title words"
          "secret title title ttt"
          "cv css spring primitives"
        `,
          },
          "@media (min-aspect-ratio: 4/3)": {},
          "@media (min-aspect-ratio: 16/10)": {},
          "@media (min-aspect-ratio: 21/9)": {},
          "@media (min-aspect-ratio: 32/9)": {},
          "@media (min-aspect-ratio: 64/9)": {},
        }}
        // ref={(el) => {
        //   if (el && !isServer) {
        //     setTimeout(() => {
        //       for (const node of el.children) {
        //         useSquircle()(node as HTMLElement);
        //       }
        //     }, 20);
        //   }
        // }}
      >
        <GridItem
          css={{
            gridArea: "title",
            backgroundPosition: "center",
            backgroundSize: "cover",
            color: "white",
          }}
          style={{ "background-image": `url(${image})` }}
        >
          <span css={{ fontScale: 11, fontWeight: 600 }}>Trents.Computer</span>
        </GridItem>
        <GridItem css={{ gridArea: "boggle" }} component="a" href="/boggle">
          Boogle
        </GridItem>
        <GridItem css={{ gridArea: "sokoban" }} component="a" href="/sokoban">
          Sokoban
        </GridItem>
        <GridItem
          css={{ gridArea: "font" }}
          component="a"
          href="/font-explorer"
        >
          Font Explorer
        </GridItem>
        <GridItem css={{ gridArea: "words" }} component="a" href="/words">
          Good Words
        </GridItem>
        <GridItem
          css={{ gridArea: "secret" }}
          component="a"
          href="/secret-word"
        >
          Secret Word
        </GridItem>
        <GridItem css={{ gridArea: "ttt" }} component="a" href="/tic-tac-toe">
          Tic-tac-toc
        </GridItem>
        <GridItem css={{ gridArea: "cv" }} component="a" href="/cv">
          Curriculum Vitae
        </GridItem>
        {/* <GridItem css={{ gridArea: "naming" }}>The Hardest Problem</GridItem> */}
        <GridItem
          css={{ gridArea: "css" }}
          component="a"
          href="https://hypergood.app/css"
        >
          Hypergood CSS
          <ExternalLinkIcon />
        </GridItem>
        <GridItem
          css={{ gridArea: "spring" }}
          component="a"
          href="https://hypergood.app/spring"
        >
          Hypergood Spring
          <ExternalLinkIcon />
        </GridItem>
        <GridItem
          css={{ gridArea: "primitives" }}
          component="a"
          href="https://hypergood.app/primitives"
        >
          Hypergood Primitives
          <ExternalLinkIcon />
        </GridItem>
      </div>
      <div css={{ flexShrink: 0, display: "flex", items: "flex-end" }}>
        <div css={{ padding: 16 }}>
          <FooterText />
        </div>

        <div css={{ flex: "1 0 0px" }} />

        <OSRevealer alreadySeenOS={(search.os || "").split(",") as OS[]} />
      </div>
    </div>
  );
}

const GridItem = styled("div", {
  padding: 12,
  borderRadius: `${(38 / 1920) * 100}dvw`,
  backgroundColor: "#ECECEC",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  align: "center",
  overflow: "hidden",
  ":hover": {
    backgroundColor: colors.slate5,
  },
  fontScale: -1,
  // borderRadius: 15,
  "@sm": {
    fontScale: 1,
    // borderRadius: 30,
  },
});
