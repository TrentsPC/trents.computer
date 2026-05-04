import { Link } from "@tanstack/solid-router";
import { HistoryRacer } from "~/modules/history-racer";
import { colors, fonts } from "~/theme.styles";
import { HomePageGrid } from "./HomePageGrid";

export function HomePage() {
  return (
    <>
      {/* <Title>Trents PC</Title> */}
      {/* <div
        css={{
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "saturate(180%) blur(20px)",
          display: "flex",
        }}
      > */}
      {/* <div css={{ flex: 1 }} /> */}
      {/* <SignUpDialog /> */}
      {/* </div> */}
      <HistoryRacer />
      <main
        css={{
          minH: "calc(100vh - 52px)",
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
            maxW: "60ch",
            mx: "auto",
            fontFamily: fonts.mono,
            fontWeight: 400,
            lineHeight: 1.5,
            "& h1": {
              fontWeight: 600,
            },
            "& li": {
              "&::before": {
                content: "'- '",
                color: colors.secondaryLabel,
              },
            },
            "& a": {
              fontWeight: 500,
              color: colors.secondaryLabel,

              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
              // textDecoration: "underline",
            },
          }}
        >
          {/* <h1>
            <Clicker />
          </h1> */}
          <br />
          <p
            css={{
              maxW: "38ch",
            }}
          >
            Trent was released in late 2002 and software has been better ever
            since.
          </p>
          <br />
          <div css={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <h2>For humans:</h2>
              <ul>
                <li>
                  <Link to="/boggle">Boogle</Link>
                </li>
                <li>
                  <Link to="/sokoban">Sokoban</Link>
                </li>
                <li>
                  <Link to="/chadgdp">ChadGDP</Link>
                </li>
                <li>
                  <Link to="/gb">Game Boy</Link>
                </li>
                <li>
                  <Link to="/minesweeper">Minesweeper</Link>
                </li>
                <li>
                  <Link to="/tic-tac-toe">Tic-tac-tok</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2>For developers:</h2>
              <ul>
                <li>
                  <a href="https://hypergood.app/css">Weave CSS</a>
                </li>
                <li>
                  <a href="https://hypergood.app/spring">Spring Physics</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div css={{ flex: "50 0 0px" }} />
      </main>
      <section>
        <HomePageGrid />
      </section>
    </>
  );
}
