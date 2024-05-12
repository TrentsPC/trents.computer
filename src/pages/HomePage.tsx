import { Title } from "@solidjs/meta";
import { A, useSearchParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { SignUpDialog } from "~/components/SignUpDialog";
import { ChatWidget } from "~/modules/chatbots";
import { Clicker } from "~/modules/clicker";
import { HistoryRacer } from "~/modules/history-racer";
import { OS, OSRevealer } from "~/modules/os/OSRevealer";
import { colors, fonts } from "~/theme.styles";

const IBM_EPOCH = new Date("2023-03-04T00:00:00+13:00").getTime();

const FALAFEL_EPOCH = new Date("2023-04-01T23:00:00+13:00").getTime();

const [now, setNow] = createSignal<Date>(new Date());
function updateDate() {
  setNow(new Date());
  requestAnimationFrame(() => {
    updateDate();
  });
}
!isServer && updateDate();

function getDurationInfo(timestamp: number) {
  let currentDate = now() || new Date();
  let oldDate = new Date(timestamp);
  let workingDate = new Date(oldDate);

  let years = getYearsBetween(workingDate, currentDate);
  workingDate.setFullYear(workingDate.getFullYear() + years);
  let months = getMonthsBetween(workingDate, currentDate);
  workingDate.setMonth(workingDate.getMonth() + months);
  let days = getDaysBetween(workingDate, currentDate);
  workingDate.setDate(workingDate.getDate() + days);
  let hours = getHoursBetween(workingDate, currentDate);
  workingDate.setHours(workingDate.getHours() + hours);
  let minutes = getMinutesBetween(workingDate, currentDate);
  workingDate.setMinutes(workingDate.getMinutes() + minutes);
  let seconds = getSecondsBetween(workingDate, currentDate);
  workingDate.setSeconds(workingDate.getSeconds() + seconds);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}

function getYearsBetween(a: Date, b: Date) {
  let workingDate = new Date(a);
  let years = -1;
  while (workingDate.getTime() < b.getTime()) {
    workingDate.setFullYear(workingDate.getFullYear() + 1);
    years++;
  }
  return years;
}

function getMonthsBetween(a: Date, b: Date) {
  let workingDate = new Date(a);
  let months = -1;
  while (workingDate.getTime() < b.getTime()) {
    workingDate.setMonth(workingDate.getMonth() + 1);
    months++;
  }
  return months;
}

function getDaysBetween(a: Date, b: Date) {
  let workingDate = new Date(a);
  let days = -1;
  while (workingDate.getTime() < b.getTime()) {
    workingDate.setDate(workingDate.getDate() + 1);
    days++;
  }
  return days;
}

function getHoursBetween(a: Date, b: Date) {
  let workingDate = new Date(a);
  let hours = -1;
  while (workingDate.getTime() < b.getTime()) {
    workingDate.setHours(workingDate.getHours() + 1);
    hours++;
  }
  return hours;
}

function getMinutesBetween(a: Date, b: Date) {
  let workingDate = new Date(a);
  let minutes = -1;
  while (workingDate.getTime() < b.getTime()) {
    workingDate.setMinutes(workingDate.getMinutes() + 1);
    minutes++;
  }
  return minutes;
}

function getSecondsBetween(a: Date, b: Date) {
  let workingDate = new Date(a);
  let seconds = -1;
  while (workingDate.getTime() < b.getTime()) {
    workingDate.setSeconds(workingDate.getSeconds() + 1);
    seconds++;
  }
  return seconds;
}

export function HomePage() {
  const [currentEpoch, setCurrentEpoch] = createSignal(IBM_EPOCH);

  const [search] = useSearchParams<{ os: string }>();

  let durationInfo = () => getDurationInfo(currentEpoch());

  const [feeling, setFeeling] = createSignal("love");

  return (
    <>
      <Title>Trents PC</Title>
      <HistoryRacer />
      <Clicker />
      <SignUpDialog />
      <main
        css={{
          minH: "100vh",
          d: "flex",
          flexDir: "column",
          alignItems: "center",
          justify: "center",
        }}
      >
        <div css={{ flex: "45 0 0px" }} />
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
          <h1># Trents.Computer</h1>
          <br />
          <p>
            Trent was released in late 2002 and software has been better ever
            since.
          </p>
          <br />
          <ul css={{ pl: "2ch", listStyleType: "'- '", spaceY: "0.25lh" }}>
            <li>
              <A href="/boggle">Boogle</A>
            </li>
            <li>
              <A href="/sokoban">Sokoban</A>
            </li>
            {/* <li>
              <A href="/calendar">Calendar</A>
            </li> */}
            <li>
              <A href="/words">Good words</A>
            </li>
            <li>
              <A href="/secret-word">Secret Word</A>
            </li>
            <li>
              <A href="/tic-tac-toe">Tic-Tac-Toc</A>
            </li>
          </ul>
        </div>
        <div css={{ flex: "55 0 0px" }} />
      </main>
      <div
        css={{
          position: "fixed",
          bottom: 0,
          left: 0,
          fontFamily: fonts.mono,
          color: colors.secondaryLabel,
          padding: 16,
          align: "left",
          fontScale: -1,
        }}
      >
        Made with{" "}
        <button
          onClick={() => {
            setFeeling(feelings[Math.floor(Math.random() * feelings.length)]);
          }}
        >
          {feeling()}?
        </button>{" "}
        by Trent at{" "}
        <a
          href="mailto:trent@trents.computer"
          css={{ textDecoration: "underline" }}
        >
          trent@trents.computer
        </a>
        <br />
        <Copyright />
        <br />
        <button
          onClick={() =>
            setCurrentEpoch(
              currentEpoch() === IBM_EPOCH ? FALAFEL_EPOCH : IBM_EPOCH
            )
          }
        >
          {durationInfo().years}y {durationInfo().months}m {durationInfo().days}
          d {durationInfo().hours}h {durationInfo().minutes}m{" "}
          {durationInfo().seconds}s
        </button>
      </div>
      <ChatWidget />
      <OSRevealer alreadySeenOS={(search.os || "").split(",") as OS[]} />
    </>
  );
}

function Copyright() {
  const timeFormatter = new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const [show, setShow] = createSignal(false);
  onMount(() => setShow(true));
  const dateStr = () =>
    now().getFullYear() +
    "-" +
    (now().getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now().getDate().toString().padStart(2, "0") +
    " " +
    timeFormatter.format(now()) +
    "." +
    now().getMilliseconds().toString().padStart(3, "0");
  return <>© 2021{show() && ` - ${dateStr()}`}</>;
}

const feelings = [
  "happiness",
  // "blessed",
  "love",
  "sadness",
  // "lovely",
  "thankfulness",
  "excitement",
  // "in love",
  "craziness",
  "gratefulness",
  "bliss",
  // "fantastic",
  "silliness",
  "festivity",
  "wonder",
  "coolness",
  "amusement",
  "relaxation",
  "positivity",
  // "chill",
  "hope",
  "joy",
  // "tired",
  "motivation",
  "pride",
  // "alone",
  "thought",
  // "OK",
  "nostalgia",
  "anger",
  "sickness",
  "delight",
  // "drained",
  // "emotional",
  "confidence",
  // "awesome",
  // "fresh",
  "determination",
  // "exhausted",
  "annoyance",
  // "glad",
  "luck",
  "heartbreak",
  // "bored",
  // "sleepy",
  // "energized",
  "hunger",
  "professionality",
  "pain",
  "peace",
  "disappointment",
  "optimism",
  "coldness",
  "cuteness",
  // "fabulous",
  "greatness",
  // "sorry",
  // "super",
  "worry",
  // "funny",
  // "bad",
  // "down",
  "inspiration",
  "satisfaction",
  // "pumped",
  "calm",
  "confusion",
  // "goofy",
  // "missing",
  "goodness",
  "sarcasm",
  // "lonely",
  "strength",
  // "concerned",
  // "special",
  // "depressed",
  // "jolly",
  "curiosity",
  // "low",
  // "welcome",
  // "broken",
  // "beautiful",
  "amazement",
  "irritation",
  "stress",
  // "incomplete",
  // "hyper",
  // "mischievous",
  // "amazed",
  // "pissed off",
  // "fed up",
  // "puzzled",
  // "furious",
  // "pissed",
  // "refreshed",
  // "accomplished",
  "surprise",
  "perplexity",
  "frustration",
  // "meh",
  // "pretty",
  // "better",
  "guilt",
  "safety",
  "freedom",
  // "lost",
  // "old",
  "laziness",
  // "worse",
  // "horrible",
  "comfort",
  "stupidity",
  // "ashamed",
  // "terrible",
  // "asleep",
  // "well",
  // "alive",
  // "shy",
  // "rough",
  // "weird",
  // "human",
  // "hurt",
  // "awful",
  "normality",
  // "warm",
  "insecurity",
  "weakness",
  "kindness",
  // "fine",
  // "dumb",
  // "nice",
  "importance",
  // "crappy",
  "discomfort",
  // "worthless",
  // "ready",
  // "different",
  "helplessness",
  // "awkward",
  "alcohol",
  // "overwhelmed",
  "hopelessness",
  // "whole",
  // "miserable",
  "madness",
  // "deep",
  // "yucky",
  // "nervous",
  // "blue",
  // "wanted",
  "honor",
  // "light",
  "a hangover",
  "security",
  "no clothes on",
  // "dirty",
  // "unimportant",
  "might",
  "fear",
  "jealousy",
  // "sore",
  // "unwanted",
  "appreciation",
  // "full",
  "business",
  // "small",
  // "unloved",
  "uselessness",
  "qualifications",
  // "blah",
  "impatience",
  "privilege",
  // "trapped",
  // "thirsty",
  // "nauseous",
  // "upset",
  // "offended",
  // "numb",
  "perfection",
  // "challenged",
  // "threatened",
  // "relieved",
  // "stuck",
  // "strange",
  // "embarrassed",
  // "rested",
  // "smart",
  // "cheated",
  // "betrayed",
  // "anxious",
  // "aggravated",
  "evil",
  // "ignored",
  "regret",
  "health",
  "generosity",
  "money",
  "fear",
  // "broke",
  // "invisible",
  "defeat",
  // "homesick",
  "connections",
];
