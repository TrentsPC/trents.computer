import { basicMaterials } from "./things/basic-materials";
import { elements } from "./things/elements";
import { life } from "./things/life";
import { quantumParticles } from "./things/quantum-particles";
import { universeThings } from "./things/universe";
import { Thing } from "./types";

const everythingAsObject = {
  elements,
  life,
  basicMaterials,
  quantumParticles,
  universeThings,
};

type EverythingAsObject = typeof everythingAsObject;

type ThingIds = EverythingAsObject[keyof EverythingAsObject][number]["id"];

declare module "./types" {
  interface Nested {
    thingIds: ThingIds;
  }
}

const everything = Object.values(everythingAsObject).flat() as Thing<string>[];

export { everything };
