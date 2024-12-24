import { createThing, repeatThings } from "../utils";

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
  ...repeatThings("proton", 2),
  ...repeatThings("neutron", 2),
  ...repeatThings("electron", 2),
];

const lithium = createThing({
  id: "lithium",
  getName: () => "Lithium",
});
lithium.getChildren = () => [
  ...repeatThings("proton", 3),
  ...repeatThings("neutron", 3, 4),
  ...repeatThings("electron", 3),
];

const beryllium = createThing({
  id: "beryllium",
  getName: () => "Beryllium",
});
beryllium.getChildren = () => [
  ...repeatThings("proton", 4),
  ...repeatThings("neutron", 4, 5),
  ...repeatThings("electron", 4),
];

const boron = createThing({
  id: "boron",
  getName: () => "Boron",
});
boron.getChildren = () => [
  ...repeatThings("proton", 5),
  ...repeatThings("neutron", 5, 6),
  ...repeatThings("electron", 5),
];

const carbon = createThing({
  id: "carbon",
  getName: () => "Carbon",
});
carbon.getChildren = () => [
  ...repeatThings("proton", 6),
  ...repeatThings("neutron", 6),
  ...repeatThings("electron", 6),
];

const nitrogen = createThing({
  id: "nitrogen",
  getName: () => "Nitrogen",
});
nitrogen.getChildren = () => [
  ...repeatThings("proton", 7),
  ...repeatThings("neutron", 7),
  ...repeatThings("electron", 7),
];

const oxygen = createThing({
  id: "oxygen",
  getName: () => "Oxygen",
});
oxygen.getChildren = () => [
  ...repeatThings("proton", 8),
  ...repeatThings("neutron", 8),
  ...repeatThings("electron", 8),
];

const fluorine = createThing({
  id: "fluorine",
  getName: () => "Fluorine",
});
fluorine.getChildren = () => [
  ...repeatThings("proton", 9),
  ...repeatThings("neutron", 10),
  ...repeatThings("electron", 9),
];

const neon = createThing({
  id: "neon",
  getName: () => "Neon",
});
neon.getChildren = () => [
  ...repeatThings("proton", 10),
  ...repeatThings("neutron", 10),
  ...repeatThings("electron", 10),
];

const sodium = createThing({
  id: "sodium",
  getName: () => "Sodium",
});
sodium.getChildren = () => [
  ...repeatThings("proton", 11),
  ...repeatThings("neutron", 12),
  ...repeatThings("electron", 11),
];

const magnesium = createThing({
  id: "magnesium",
  getName: () => "Magnesium",
});
magnesium.getChildren = () => [
  ...repeatThings("proton", 12),
  ...repeatThings("neutron", 12, 13),
  ...repeatThings("electron", 12),
];

const aluminium = createThing({
  id: "aluminium",
  getName: () => "Aluminium",
});
aluminium.getChildren = () => [
  ...repeatThings("proton", 13),
  ...repeatThings("neutron", 13, 15),
  ...repeatThings("electron", 13),
];

const silicon = createThing({
  id: "silicon",
  getName: () => "Silicon",
});
silicon.getChildren = () => [
  ...repeatThings("proton", 14),
  ...repeatThings("neutron", 14),
  ...repeatThings("electron", 14),
];

const phosphorus = createThing({
  id: "phosphorus",
  getName: () => "Phosphorus",
});
phosphorus.getChildren = () => [
  ...repeatThings("proton", 15),
  ...repeatThings("neutron", 16),
  ...repeatThings("electron", 15),
];

const sulfur = createThing({
  id: "sulfur",
  getName: () => "Sulfur",
});
sulfur.getChildren = () => [
  ...repeatThings("proton", 16),
  ...repeatThings("neutron", 16),
  ...repeatThings("electron", 16),
];

const chlorine = createThing({
  id: "chlorine",
  getName: () => "Chlorine",
});
chlorine.getChildren = () => [
  ...repeatThings("proton", 17),
  ...repeatThings("neutron", 18, 19),
  ...repeatThings("electron", 17),
];

const argon = createThing({
  id: "argon",
  getName: () => "Argon",
});
argon.getChildren = () => [
  ...repeatThings("proton", 18),
  ...repeatThings("neutron", 22),
  ...repeatThings("electron", 18),
];

const potassium = createThing({
  id: "potassium",
  getName: () => "Potassium",
});
potassium.getChildren = () => [
  ...repeatThings("proton", 19),
  ...repeatThings("neutron", 20),
  ...repeatThings("electron", 19),
];

const calcium = createThing({
  id: "calcium",
  getName: () => "Calcium",
});
calcium.getChildren = () => [
  ...repeatThings("proton", 20),
  ...repeatThings("neutron", 20),
  ...repeatThings("electron", 20),
];

const scandium = createThing({
  id: "scandium",
  getName: () => "Scandium",
});
scandium.getChildren = () => [
  ...repeatThings("proton", 21),
  ...repeatThings("neutron", 24),
  ...repeatThings("electron", 21),
];

const titanium = createThing({
  id: "titanium",
  getName: () => "Titanium",
});
titanium.getChildren = () => [
  ...repeatThings("proton", 22),
  ...repeatThings("neutron", 26),
  ...repeatThings("electron", 22),
];

const vanadium = createThing({
  id: "vanadium",
  getName: () => "Vanadium",
});
vanadium.getChildren = () => [
  ...repeatThings("proton", 23),
  ...repeatThings("neutron", 28),
  ...repeatThings("electron", 23),
];

const chromium = createThing({
  id: "chromium",
  getName: () => "Chromium",
});
chromium.getChildren = () => [
  ...repeatThings("proton", 24),
  ...repeatThings("neutron", 28),
  ...repeatThings("electron", 24),
];

const manganese = createThing({
  id: "manganese",
  getName: () => "Manganese",
});
manganese.getChildren = () => [
  ...repeatThings("proton", 25),
  ...repeatThings("neutron", 30),
  ...repeatThings("electron", 25),
];

const iron = createThing({
  id: "iron",
  getName: () => "Iron",
});
iron.getChildren = () => [
  ...repeatThings("proton", 26),
  ...repeatThings("neutron", 30),
  ...repeatThings("electron", 26),
];

const cobalt = createThing({
  id: "cobalt",
  getName: () => "Cobalt",
});
cobalt.getChildren = () => [
  ...repeatThings("proton", 27),
  ...repeatThings("neutron", 32),
  ...repeatThings("electron", 27),
];

const nickel = createThing({
  id: "nickel",
  getName: () => "Nickel",
});
nickel.getChildren = () => [
  ...repeatThings("proton", 28),
  ...repeatThings("neutron", 31),
  ...repeatThings("electron", 28),
];

const copper = createThing({
  id: "copper",
  getName: () => "Copper",
});
copper.getChildren = () => [
  ...repeatThings("proton", 29),
  ...repeatThings("neutron", 35),
  ...repeatThings("electron", 29),
];

const zinc = createThing({
  id: "zinc",
  getName: () => "Zinc",
});
zinc.getChildren = () => [
  ...repeatThings("proton", 30),
  ...repeatThings("neutron", 35),
  ...repeatThings("electron", 30),
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
