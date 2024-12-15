import { createThing, repeat } from "../utils";

const proton = createThing({
  id: "proton",
  getName: () => "Proton",
});
proton.getChildren = () => ["up_quark", "up_quark", "down_quark"];

const neutron = createThing({
  id: "neutron",
  getName: () => "Neutron",
});
neutron.getChildren = () => ["down_quark", "down_quark", "up_quark"];

// Generics
const atom = createThing({
  id: "atom",
  getName: () => "Atoms",
});
atom.getChildren = () => ["proton", "neutron", "electron"];

const molecule = createThing({
  id: "molecule",
  getName: () => "Molecules",
});
molecule.getChildren = () => ["atom"];

// Periodic Table

const hydrogen = createThing({
  id: "hydrogen",
  getName: () => "Hydrogen",
});
hydrogen.getChildren = () => ["proton", "neutron", "electron"];

const helium = createThing({
  id: "helium",
  getName: () => "Helium",
});
helium.getChildren = () => [
  ...repeat("proton", 2),
  ...repeat("neutron", 2),
  ...repeat("electron", 2),
];

const lithium = createThing({
  id: "lithium",
  getName: () => "Lithium",
});
lithium.getChildren = () => [
  ...repeat("proton", 3),
  ...repeat("neutron", 3, 4),
  ...repeat("electron", 3),
];

const beryllium = createThing({
  id: "beryllium",
  getName: () => "Beryllium",
});
beryllium.getChildren = () => [
  ...repeat("proton", 4),
  ...repeat("neutron", 4, 5),
  ...repeat("electron", 4),
];

const boron = createThing({
  id: "boron",
  getName: () => "Boron",
});
boron.getChildren = () => [
  ...repeat("proton", 5),
  ...repeat("neutron", 5, 6),
  ...repeat("electron", 5),
];

const carbon = createThing({
  id: "carbon",
  getName: () => "Carbon",
});
carbon.getChildren = () => [
  ...repeat("proton", 6),
  ...repeat("neutron", 6),
  ...repeat("electron", 6),
];

const nitrogen = createThing({
  id: "nitrogen",
  getName: () => "Nitrogen",
});
nitrogen.getChildren = () => [
  ...repeat("proton", 7),
  ...repeat("neutron", 7),
  ...repeat("electron", 7),
];

const oxygen = createThing({
  id: "oxygen",
  getName: () => "Oxygen",
});
oxygen.getChildren = () => [
  ...repeat("proton", 8),
  ...repeat("neutron", 8),
  ...repeat("electron", 8),
];

const fluorine = createThing({
  id: "fluorine",
  getName: () => "Fluorine",
});
fluorine.getChildren = () => [
  ...repeat("proton", 9),
  ...repeat("neutron", 10),
  ...repeat("electron", 9),
];

const neon = createThing({
  id: "neon",
  getName: () => "Neon",
});
neon.getChildren = () => [
  ...repeat("proton", 10),
  ...repeat("neutron", 10),
  ...repeat("electron", 10),
];

const sodium = createThing({
  id: "sodium",
  getName: () => "Sodium",
});
sodium.getChildren = () => [
  ...repeat("proton", 11),
  ...repeat("neutron", 12),
  ...repeat("electron", 11),
];

const magnesium = createThing({
  id: "magnesium",
  getName: () => "Magnesium",
});
magnesium.getChildren = () => [
  ...repeat("proton", 12),
  ...repeat("neutron", 12, 13),
  ...repeat("electron", 12),
];

const aluminium = createThing({
  id: "aluminium",
  getName: () => "Aluminium",
});
aluminium.getChildren = () => [
  ...repeat("proton", 13),
  ...repeat("neutron", 13, 15),
  ...repeat("electron", 13),
];

const silicon = createThing({
  id: "silicon",
  getName: () => "Silicon",
});
silicon.getChildren = () => [
  ...repeat("proton", 14),
  ...repeat("neutron", 14),
  ...repeat("electron", 14),
];

const phosphorus = createThing({
  id: "phosphorus",
  getName: () => "Phosphorus",
});
phosphorus.getChildren = () => [
  ...repeat("proton", 15),
  ...repeat("neutron", 16),
  ...repeat("electron", 15),
];

const sulfur = createThing({
  id: "sulfur",
  getName: () => "Sulfur",
});
sulfur.getChildren = () => [
  ...repeat("proton", 16),
  ...repeat("neutron", 16),
  ...repeat("electron", 16),
];

const chlorine = createThing({
  id: "chlorine",
  getName: () => "Chlorine",
});
chlorine.getChildren = () => [
  ...repeat("proton", 17),
  ...repeat("neutron", 18, 19),
  ...repeat("electron", 17),
];

const argon = createThing({
  id: "argon",
  getName: () => "Argon",
});
argon.getChildren = () => [
  ...repeat("proton", 18),
  ...repeat("neutron", 22),
  ...repeat("electron", 18),
];

const potassium = createThing({
  id: "potassium",
  getName: () => "Potassium",
});
potassium.getChildren = () => [
  ...repeat("proton", 19),
  ...repeat("neutron", 20),
  ...repeat("electron", 19),
];

const calcium = createThing({
  id: "calcium",
  getName: () => "Calcium",
});
calcium.getChildren = () => [
  ...repeat("proton", 20),
  ...repeat("neutron", 20),
  ...repeat("electron", 20),
];

const scandium = createThing({
  id: "scandium",
  getName: () => "Scandium",
});
scandium.getChildren = () => [
  ...repeat("proton", 21),
  ...repeat("neutron", 24),
  ...repeat("electron", 21),
];

const titanium = createThing({
  id: "titanium",
  getName: () => "Titanium",
});
titanium.getChildren = () => [
  ...repeat("proton", 22),
  ...repeat("neutron", 26),
  ...repeat("electron", 22),
];

const vanadium = createThing({
  id: "vanadium",
  getName: () => "Vanadium",
});
vanadium.getChildren = () => [
  ...repeat("proton", 23),
  ...repeat("neutron", 28),
  ...repeat("electron", 23),
];

const chromium = createThing({
  id: "chromium",
  getName: () => "Chromium",
});
chromium.getChildren = () => [
  ...repeat("proton", 24),
  ...repeat("neutron", 28),
  ...repeat("electron", 24),
];

const manganese = createThing({
  id: "manganese",
  getName: () => "Manganese",
});
manganese.getChildren = () => [
  ...repeat("proton", 25),
  ...repeat("neutron", 30),
  ...repeat("electron", 25),
];

const iron = createThing({
  id: "iron",
  getName: () => "Iron",
});
iron.getChildren = () => [
  ...repeat("proton", 26),
  ...repeat("neutron", 30),
  ...repeat("electron", 26),
];

const cobalt = createThing({
  id: "cobalt",
  getName: () => "Cobalt",
});
cobalt.getChildren = () => [
  ...repeat("proton", 27),
  ...repeat("neutron", 32),
  ...repeat("electron", 27),
];

const nickel = createThing({
  id: "nickel",
  getName: () => "Nickel",
});
nickel.getChildren = () => [
  ...repeat("proton", 28),
  ...repeat("neutron", 31),
  ...repeat("electron", 28),
];

const copper = createThing({
  id: "copper",
  getName: () => "Copper",
});
copper.getChildren = () => [
  ...repeat("proton", 29),
  ...repeat("neutron", 35),
  ...repeat("electron", 29),
];

const zinc = createThing({
  id: "zinc",
  getName: () => "Zinc",
});
zinc.getChildren = () => [
  ...repeat("proton", 30),
  ...repeat("neutron", 35),
  ...repeat("electron", 30),
];

export const elements = [
  proton,
  neutron,
  atom,
  molecule,

  hydrogen,
  helium,
  lithium,
  beryllium,
  boron,
  carbon,
  nitrogen,
  oxygen,
  fluorine,
  neon,

  sodium,
  magnesium,
  aluminium,
  silicon,
  phosphorus,
  sulfur,
  chlorine,
  argon,
  potassium,

  calcium,
  scandium,
  titanium,
  vanadium,
  chromium,
  manganese,
  iron,
  cobalt,
  nickel,
  copper,
  zinc,
];
