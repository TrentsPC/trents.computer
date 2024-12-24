import { RegisteredThingIds } from "../types";
import {
  choose,
  collectThings,
  createThing,
  maybe,
  repeatThings,
} from "../utils";

const multiverse = createThing({
  id: "multiverse",
  getName: () =>
    choose([
      "Multiverse",
      "Lasagnaverse",
      "Doughnutverse",
      "Towelverse",
      "Baconverse",
      "Sharkverse",
      "Nestedverse",
      "Tastyverse",
      "Upverse",
      "Downverse",
      "Layerverse",
      "Clusterverse",
      "Metaverse",
      "Quantiverse",
      "Paraverse",
      "Epiverse",
      "Alterverse",
      "Hypoverse",
      "Dimensioverse",
      "Planiverse",
      "Pluriverse",
      "Polyverse",
      "Maniverse",
      "Stackoverse",
      "Antiverse",
      "Superverse",
      "Upperverse",
      "Maxiverse",
      "Megaverse",
      "Babyverse",
      "Tinyverse",
      "Retroverse",
      "Ultraverse",
      "Topoverse",
      "Otherverse",
      "Bubbleverse",
      "Esreverse",
      "Versiverse",
      "'verse",
    ]),
});
multiverse.getChildren = () => repeatThings("universe", 10, 30);

const universe = createThing({
  id: "universe",
  getName: () => "Universe",
});
universe.getChildren = () => repeatThings("supercluster", 10, 30);

const supercluster = createThing({
  id: "supercluster",
  getName: () => "Galactic Supercluster",
});
supercluster.getChildren = () => repeatThings("galaxy", 10, 30);

const galaxy = createThing({
  id: "galaxy",
  getName: () => "Galaxy",
});
galaxy.getChildren = () => [
  "galaxy_center",
  ...repeatThings("galaxy_arm", 2, 6),
];

const galaxyArm = createThing({
  id: "galaxy_arm",
  getName: () => "Arm",
});
galaxyArm.getChildren = () => [
  maybe("galactic_life", 0.05),
  maybe("dyson_sphere", 0.04),
  maybe("dyson_sphere", 0.02),
  repeatThings("star_system", 20, 50),
  repeatThings("nebula", 0, 12),
  maybe("black_hole", 0.2),
  maybe("black_hole", 0.2),
];

const galaxyCenter = createThing({
  id: "galaxy_center",
  getName: () => "Galactic Center",
});
galaxyCenter.getChildren = () => [
  "black_hole",
  maybe("galactic_life", 0.1),
  maybe("dyson_sphere", 0.04),
  maybe("dyson_sphere", 0.02),
  repeatThings("star_system", 20, 50),
  repeatThings("nebula", 0, 12),
];

const nebula = createThing({
  id: "nebula",
  getName: () => "Nebula",
});
nebula.getChildren = () => [
  maybe("galactic_life", 0.15),
  maybe("star", 0.02),
  maybe("star", 0.02),
  maybe("star", 0.02),
  repeatThings("interstellar_cloud", 1, 6),
];

const interstellarCloud = createThing({
  id: "interstellar_cloud",
  getName: () =>
    [
      choose([
        "A Bright pink",
        "A Faint",
        "A Fading",
        "A Pale",
        "A Fluro",
        "A Glowing",
        "A Green",
        "A Bright Green",
        "A Dark Brown",
        "A Brooding",
        "A Magenta",
        "A Bright Red",
        "A Dark Red",
        "A Blueish",
        "A Deep Blue",
        "A Turquoise",
        "A Teal",
        "A Golden",
        "A Multicolored",
        "A Silver",
        "A Dramatic",
        "A Luminous",
        "A Colossal",
        "A Purple",
        "A Gold-trimmed",
        "An Opaline",
        "A Silvery",
        "A Shimmering",
      ]),
      " Interstellar Cloud",
    ].join(""),
});
interstellarCloud.getChildren = () => [
  "helium",
  "hydrogen",
  maybe("carbon", 0.8),
  maybe("water", 0.05),
  maybe("ammonia", 0.05),
  maybe("nitrogen", 0.05),
  maybe("iron", 0.05),
  maybe("sulfur", 0.05),
  maybe("oxygen", 0.15),
];

const starSystem = createThing({
  id: "star_system",
  getName: () => "Star System",
});
starSystem.getChildren = () => [
  "star",
  maybe("star", 0.03),
  maybe("visitor_planet", 0.05),
  maybe("future_planet", 0.1),
  maybe("future_planet", 0.1),
  maybe("terraformed_planet", 0.5),
  maybe("terraformed_planet", 0.2),
  maybe("terraformed_planet", 0.1),
  maybe("medieval_planet", 0.3),
  maybe("medieval_planet", 0.2),
  maybe("ancient_planet", 0.5),
  maybe("ancient_planet", 0.3),
  maybe("ancient_planet", 0.1),
  maybe("barren_planet", 0.6),
  maybe("barren_planet", 0.4),
  maybe("barren_planet", 0.2),
  maybe("gas_giant", 0.6),
  maybe("gas_giant", 0.4),
  maybe("gas_giant", 0.2),
  maybe("gas_giant", 0.1),
  repeatThings("asteroid_belt", 0, 2),
];

const dysonSphere = createThing({
  id: "dyson_sphere",
  getName: () => "Dyson Sphere",
});
dysonSphere.getChildren = () => [
  "star",
  maybe("star", 0.03),
  "dyson_sphere_surface",
  repeatThings("future_planet", 1, 8),
  maybe("barren_planet", 0.6),
  maybe("barren_planet", 0.4),
  maybe("barren_planet", 0.2),
  maybe("gas_giant", 0.6),
  maybe("gas_giant", 0.4),
  maybe("gas_giant", 0.2),
  maybe("gas_giant", 0.1),
  repeatThings("asteroid_belt", 0, 2),
];

const star = createThing({
  id: "star",
  getName: () =>
    choose([
      "White Star",
      "Faint Star",
      "Yellow Star",
      "Red Star",
      "Blue Star",
      "Green Star",
      "Purple Star",
      "Bright Star",
      "Double Star",
      "Twin Star",
      "Triple Star",
      "Old Star",
      "Young Star",
      "Dying Star",
      "Small Star",
      "Giant Star",
      "Large Star",
      "Pale Star",
      "Dark Star",
      "Hell Star",
      "Horrific Star",
      "Twisted Star",
      "Spectral Star",
    ]),
});
star.getChildren = () => [
  maybe("ghost", 0.001),
  maybe("space_monster", 0.002),
  "hydrogen",
  "helium",
];

const planetComposition = createThing({
  id: "planet_composition",
  getName: () => "Planet",
});
planetComposition.getChildren = () => [
  "planet_core",
  maybe("moon", 0.4),
  maybe("moon", 0.2),
  maybe("moon", 0.1),
];

const moon = createThing({
  id: "moon",
  getName: () =>
    choose([
      "Young Moon",
      "Old Moon",
      "Large Moon",
      "Small Moon",
      "Pale Moon",
      "White Moon",
      "Dark Moon",
      "Black Moon",
      "Old Moon",
    ]),
});
moon.getChildren = () => [maybe("ghost", 0.001), "rock", "planet_core"];

const terraformedMoon = createThing({
  id: "terraformed_moon",
  getName: () =>
    choose([
      "Young Moon",
      "Old Moon",
      "Large Moon",
      "Small Moon",
      "Pale Moon",
      "White Moon",
      "Dark Moon",
      "Black Moon",
      "Old Moon",
      "Green Moon",
      "Lush Moon",
      "Blue Moon",
      "City Moon",
      "Colonized Moon",
      "Life Moon",
    ]),
});
terraformedMoon.getChildren = () => [
  ...planetComposition.getChildren(),
  repeatThings("continent", 1, 4),
  repeatThings("ocean", 1, 4),
  "sky",
];

const terraformedPlanet = createThing({
  id: "terraformed_planet",
  getName: () => "Telluric Planet",
});
terraformedPlanet.getChildren = () => [
  repeatThings("continent", 2, 7),
  repeatThings("ocean", 1, 7),
  "terraformed_sky",
  maybe(
    terraformedMoon.getChildren().filter(Boolean) as RegisteredThingIds[],
    0.3
  ),
  ...planetComposition.getChildren(),
];

const planet = createThing({
  id: "planet",
  getName: () => "Telluric Planet",
});
planet.getChildren = () => terraformedPlanet.getChildren();

const barrenPlanet = createThing({
  id: "barren_planet",
  getName: () => "Telluric Planet",
});
barrenPlanet.getChildren = () => [
  maybe("galactic_life", 0.1),
  "rock",
  maybe("ice", 0.5),
  ...planetComposition.getChildren(),
];

const visitorPlanet = createThing({
  id: "visitor_planet",
  getName: () => "Telluric Planet",
});
visitorPlanet.getChildren = () => [
  repeatThings("visitor_city", 1, 8),
  repeatThings("visitor_installation", 2, 6),
  "galactic_life",
  "rock",
  maybe("ice", 0.5),
  ...planetComposition.getChildren(),
];

const futurePlanet = createThing({
  id: "future_planet",
  getName: () => "Telluric Planet",
});
futurePlanet.getChildren = () => [
  repeatThings("future_continent", 2, 7),
  repeatThings("ocean", 1, 7),
  "future_sky",
  ...planetComposition.getChildren(),
];

const medievalPlanet = createThing({
  id: "medieval_planet",
  getName: () => "Telluric Planet",
});
medievalPlanet.getChildren = () => [
  repeatThings("medieval_continent", 2, 4),
  repeatThings("ancient_continent", 0, 3),
  repeatThings("ocean", 1, 7),
  "sky",
  ...planetComposition.getChildren(),
];

const ancientPlanet = createThing({
  id: "ancient_planet",
  getName: () => "Telluric Planet",
});
ancientPlanet.getChildren = () => [
  repeatThings("ancient_continent", 2, 7),
  repeatThings("ocean", 1, 7),
  "sky",
  ...planetComposition.getChildren(),
];

const asteroidBelt = createThing({
  id: "asteroid_belt",
  getName: () => "Asteroid Belt",
});
asteroidBelt.getChildren = () => [
  maybe("galactic_life", 0.2),
  repeatThings("asteroid", 10, 30),
];

const earth = createThing({
  id: "earth",
  getName: () => "Earth",
});
earth.getChildren = () => asteroidBelt.getChildren();

const asteroid = createThing({
  id: "asteroid",
  getName: () => "Asteroid",
});
asteroid.getChildren = () => [
  maybe("space_animal", 0.005),
  "rock",
  maybe("ice", 0.3),
];

const gasGiant = createThing({
  id: "gas_giant",
  getName: () => "Gas Giant",
});
gasGiant.getChildren = () => [
  "gas_giant_atmosphere",
  maybe("planet_core", 0.5),
  repeatThings("moon", 0, 3),
  maybe("terraformed_moon", 0.2),
  maybe("terraformed_moon", 0.1),
];

const gasGiantAtmosphere = createThing({
  id: "gas_giant_atmosphere",
  getName: () => "Atmosphere",
});
gasGiantAtmosphere.getChildren = () => [
  maybe("galactic_life", 0.1),
  "helium",
  "hydrogen",
  maybe("water", 0.5),
  maybe("ammonia", 0.5),
  maybe("methane", 0.5),
];

const planetCore = createThing({
  id: "planet_core",
  getName: () => "Core",
});
planetCore.getChildren = () => [
  maybe("space_monster", 0.005),
  "iron",
  "rock",
  maybe("diamond", 0.02),
  "magma",
];

const blackHole = createThing({
  id: "black_hole",
  getName: () => "Black Hole",
});
blackHole.getChildren = () => ["inside_black_hole"];

const insideBlackHole = createThing({
  id: "inside_black_hole",
  getName: () => "Inside the Black Hole",
});
insideBlackHole.getChildren = () => [
  maybe("end_of_universe_note", 0.005),
  maybe("crustacean", 0.002),
  "white_hole",
];

const whiteHole = createThing({
  id: "white_hole",
  getName: () => "White Hole",
});
whiteHole.getChildren = () => ["universe"];

const everything = createThing({
  id: "everything",
  getName: () => "Everything",
});
everything.getChildren = () => ["universe"];

const endOfUniverseNote = createThing({
  id: "end_of_universe_note",
  getName: () =>
    choose([
      "Help! I'm trapped in a universe factory!",
      "Okay, you can stop clicking now.",
    ]),
});
endOfUniverseNote.getChildren = () => [maybe("pasta", 0.001)];

export const universeThings = collectThings([
  multiverse,
  universe,
  supercluster,
  galaxy,
  galaxyArm,
  galaxyCenter,
  nebula,
  interstellarCloud,
  starSystem,
  dysonSphere,
  star,
  planet,
  barrenPlanet,
  visitorPlanet,
  futurePlanet,
  terraformedPlanet,
  medievalPlanet,
  ancientPlanet,
  planetComposition,
  moon,
  terraformedMoon,
  asteroidBelt,
  earth,
  asteroid,
  gasGiant,
  gasGiantAtmosphere,
  planetCore,
  blackHole,
  insideBlackHole,
  whiteHole,
  everything,
  endOfUniverseNote,
]);
