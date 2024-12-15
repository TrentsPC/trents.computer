import { bootstrapThings } from "./things/bootstrap";
import { elements } from "./things/elements";
import { quantumParticles } from "./things/quantum-particles";
import { Thing } from "./types";

const everythingAsObject = {
  bootstrapThings,
  elements,
  quantumParticles,
};

type EverythingAsObject = typeof everythingAsObject;

type ThingIds = EverythingAsObject[keyof EverythingAsObject][number]["id"];

declare module "./types" {
  interface Nested {
    thingIds: ThingIds;
  }
}

const everything = Object.values(everythingAsObject).flat() as Thing<string>[];

export default everything;
