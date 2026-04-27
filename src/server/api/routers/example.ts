import { parse, string } from "valibot";
import { createTRPCRouter, publicProcedure } from "../utils";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input({ parse: (input) => parse(string(), input) }).query(({ input }) => {
    return `Hello ${input}!`;
  }),
});
