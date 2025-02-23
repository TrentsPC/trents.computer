import { Clicker } from "~/modules/clicker";
import { HistoryRacer } from "~/modules/history-racer";
import { colors, fonts } from "~/theme.styles";
import { HomePageGrid } from "./HomePageGrid";

export function HomePage() {
  return (
    <>
      {/* <Title>Trents PC</Title> */}
      <div
        css={{
          // position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "saturate(180%) blur(20px)",
          display: "flex",
        }}
      >
        <div css={{ flex: 1 }} />
        {/* <SignUpDialog /> */}
      </div>
      <HistoryRacer />
      <main
        css={{
          minH: "90vh",
          d: "flex",
          flexDir: "column",
          alignItems: "center",
          justify: "center",
        }}
      >
        <div css={{ flex: "50 0 0px" }} />
        <div
          css={{
            w: "max-content",
            maxW: "38ch",
            mx: "auto",
            fontFamily: fonts.mono,
            fontWeight: 400,
            lineHeight: 1.5,
            "& h1": {
              fontWeight: 600,
            },
            "& a": {
              fontWeight: 500,
              color: colors.secondaryLabel,
              textDecoration: "underline",
            },
          }}
        >
          <h1>
            <Clicker />
          </h1>
          <br />
          <p>
            Trent was released in late 2002 and software has been better ever
            since.
          </p>
          <br />
          {/* <ul css={{ pl: "2ch", listStyleType: "'- '", spaceY: "0.25lh" }}>
            <li>
              <A href="/boggle">Boogle</A>
            </li>
            <li>
              <A href="/sokoban">Sokoban</A>
            </li>
            <li>
              <A href="/font-explorer">Font Explorer</A>
            </li>
            <li>
              <A href="/calendar">Calendar</A>
            </li>
            <li>
              <A href="/words">Good words</A>
            </li>
            <li>
              <A href="/secret-word">Secret Word</A>
            </li>
            <li>
              <A href="/tic-tac-toe">Tic-Tac-Toc</A>
            </li>
          </ul> */}
        </div>
        <div css={{ flex: "50 0 0px" }} />
      </main>
      <section>
        <HomePageGrid />
      </section>
    </>
  );
}
