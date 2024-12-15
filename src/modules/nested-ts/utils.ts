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

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function repeat(thing: RegisteredThingIds, min: number, max?: number) {
  if (max === undefined) {
    max = min;
  }
  return Array.from({ length: randomInt(min, max) }, () => thing);
}

export function choose(things: string[]) {
  return things[randomInt(0, things.length - 1)];
}
