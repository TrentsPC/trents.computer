import { createFileRoute } from "@tanstack/solid-router";
import { fallback, number, object, optional, parse, string } from "valibot";
import { HomePage } from "~/pages/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
  validateSearch: (search) =>
    parse(
      object({
        x: fallback(optional(number()), undefined),
        os: fallback(optional(string()), undefined),
      }),
      search,
    ),
});
