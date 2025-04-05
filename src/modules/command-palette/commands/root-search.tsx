import {
  linkOptions,
  NavigateOptions,
  useNavigate,
} from "@tanstack/solid-router";
import { useContext } from "solid-js";
import { List } from "../components/List";
import { CmdContext } from "../context";

type Quicklink = {
  title: string;
  link: NavigateOptions;
};

let quicklinks: Quicklink[] = [
  {
    title: "Boogle",
    link: linkOptions({
      to: "/boggle",
    }),
  },
  {
    title: "Calendar",
    link: linkOptions({
      to: "/calendar",
    }),
  },
  {
    title: "ChadGDP",
    link: linkOptions({
      to: "/chadgdp",
    }),
  },
  {
    title: "Game Boy",
    link: linkOptions({
      to: "/gb",
    }),
  },
  {
    title: "ISO 8601",
    link: linkOptions({
      to: "/iso",
    }),
  },
  {
    title: "Fake iOS",
    link: linkOptions({
      to: "/os/ios",
    }),
  },
  {
    title: "Fake Sonoma",
    link: linkOptions({
      to: "/os/sonoma",
    }),
  },
  {
    title: "Fake 98",
    link: linkOptions({
      to: "/os/win98",
    }),
  },
  {
    title: "Secret Word",
    link: linkOptions({
      to: "/secret-word",
    }),
  },
  {
    title: "Sokoban",
    link: linkOptions({
      to: "/sokoban",
    }),
  },
  {
    title: "Tic Tac Toc",
    link: linkOptions({
      to: "/tic-tac-toe",
    }),
  },
  {
    title: "Two Hard Things",
    link: linkOptions({
      to: "/two-hard-things",
    }),
  },
  {
    title: "Words I like",
    link: linkOptions({
      to: "/words",
    }),
  },
];

export function RootSearch() {
  const { close } = useContext(CmdContext);
  const nav = useNavigate();
  return (
    <List
      content={[
        ...quicklinks.map((link) => ({
          title: link.title,
          actions: [
            {
              title: "Go to " + link.title,
              onAction: () => {
                close();
                nav(link.link);
              },
            },
          ],
        })),
      ]}
    />
  );
}
