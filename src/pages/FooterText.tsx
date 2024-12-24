import { createSignal, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { colors, fonts } from "~/theme.styles";

const IBM_EPOCH = new Date("2023-03-04T00:00:00+13:00").getTime();
const FALAFEL_EPOCH = new Date("2023-04-01T23:00:00+13:00").getTime();
const BREAK_EPOCH = 1715509620000; // 10:27pm 2024-05-12 nz time

const [now, setNow] = createSignal<Date>(new Date());
function updateDate() {
  setNow(new Date());
  requestAnimationFrame(() => {
    updateDate();
  });
}
!isServer && updateDate();

export function FooterText() {
  const [feeling, setFeeling] = createSignal("love");

  return (
    <div
      css={{
        fontFamily: fonts.mono,
        color: colors.tertiaryLabel,
        align: "left",
        fontScale: -2,
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
    </div>
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
