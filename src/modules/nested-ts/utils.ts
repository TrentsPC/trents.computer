import { createSignal } from "solid-js";
import { RegisteredThingIds, Thing } from "./types";

export type CreateThingOptions<ThingId extends string> = {
  id: ThingId;
  getName: () => string;
};

export function createThing<ThingId extends string>(
  thingOpts: CreateThingOptions<ThingId>
) {
  const thing: Thing<ThingId> = {
    id: thingOpts.id,
    getName: thingOpts.getName,
    getChildren: () => [],
  };
  return thing;
}

export function collectThings<ThingId extends string>(
  things: Array<Thing<ThingId>>
) {
  return things.flat();
}

export function thingIds(things: RegisteredThingIds[]) {
  return things as string[];
}

function randomInt(minInclusive: number, maxInclusive: number) {
  return (
    Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive
  );
}

export function choose(strings: string[]) {
  return strings[randomInt(0, strings.length - 1)];
}

const debugModeSignal = createSignal(true);

export function repeatThings(
  thing: RegisteredThingIds,
  min: number,
  max?: number
) {
  const [debugMode] = debugModeSignal;
  if (debugMode()) {
    min = min || 1;
  }
  if (max === undefined) {
    max = min;
  }
  return Array.from({ length: randomInt(min, max) }, () => thing);
}

export function chooseThing(
  things: RegisteredThingIds[] | RegisteredThingIds[][]
): RegisteredThingIds | RegisteredThingIds[] {
  const [debugMode] = debugModeSignal;
  if (debugMode()) {
    return things.flat();
  }
  let chosen = things[randomInt(0, things.length - 1)];
  if (Array.isArray(chosen)) {
    return chosen.flat();
  }
  return chosen;
}

export function maybe(
  thing: RegisteredThingIds | RegisteredThingIds[],
  chance: number
): RegisteredThingIds | RegisteredThingIds[] | undefined {
  const [debugMode] = debugModeSignal;
  if (debugMode()) {
    return thing;
  }
  return Math.random() < chance ? thing : undefined;
}
