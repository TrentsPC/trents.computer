import { THINGS } from "./things";
import { InfiniArray } from "./types";
import { createRNG } from "./utils";

type DiscoveredThing = {
  id: string;
  name: string;
};

export function getChildren(parent: string, path: string) {
  const rng = createRNG(path);

  function repeat<ThingId>(thing: ThingId, number: number, max = number) {
    let length = number;
    if (max > number) {
      length = Math.floor(rng() * (max - number)) + number;
    }
    const repeated = Array.from({ length: length }, () => thing);
    return repeated;
  }

  function maybe<ThingId>(thing: ThingId, chance: number) {
    return rng() < chance ? thing : undefined;
  }

  const childrenIds = flatten(
    THINGS.find((t) => t.id === parent)?.getChildren({
      repeat: repeat,
      random: (things) => things[Math.floor(rng() * things.length)],
      randRange: (min, max) => Math.floor(rng() * (max - min)) + min,
      maybe,
    }) ?? []
  );
  const children = childrenIds
    .map((id) => THINGS.find((t) => t.id === id)!)
    .filter(Boolean);

  const discoveredThings = children.map((t, i) => {
    return {
      id: t.id,
      name: t.getName({
        repeat: repeat,
        random: (things) => things[Math.floor(rng() * things.length)],
        randRange: (min, max) => Math.floor(rng() * (max - min)) + min,
        maybe,
      }),
    };
  });

  return discoveredThings;
}

export function getLeafs(parent: string, path: string) {
  const rng = createRNG(path);

  function repeat<ThingId>(thing: ThingId, number: number, max = number) {
    let length = number;
    if (max > number) {
      length = Math.floor(rng() * (max - number)) + number;
    }
    const repeated = Array.from({ length: length }, () => thing);
    return repeated;
  }

  function maybe<ThingId>(thing: ThingId, chance: number) {
    return rng() < chance ? thing : undefined;
  }

  const childrenIds =
    THINGS.find((t) => t.id === parent)?.getLeafs?.({
      repeat: repeat,
      random: (things) => things[Math.floor(rng() * things.length)],
      randRange: (min, max) => Math.floor(rng() * (max - min)) + min,
      maybe,
    }) ?? [];
  return childrenIds;
}

function flatten<T>(nested: InfiniArray<T>): Array<T> {
  return (nested as any[]).flat(Infinity);
}
