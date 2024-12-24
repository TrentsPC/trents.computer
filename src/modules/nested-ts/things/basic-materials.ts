import { chooseThing, createThing, maybe } from "../utils";

const diamond = createThing({
  id: "diamond",
  getName: () => "Diamond",
});
diamond.getChildren = () => ["carbon"];

const oil = createThing({
  id: "oil",
  getName: () => "Oil",
});
oil.getChildren = () => ["lipids"];

const magma = createThing({
  id: "magma",
  getName: () => "Magma",
});
magma.getChildren = () => [
  "silica",
  maybe("aluminium", 0.3),
  maybe("iron", 0.2),
  maybe("potassium", 0.2),
  maybe("sodium", 0.5),
  maybe("calcium", 0.5),
];

const rock = createThing({
  id: "rock",
  getName: () => "Rock",
});
rock.getChildren = () => [
  "silica",
  maybe("aluminium", 0.3),
  maybe("iron", 0.2),
  maybe("potassium", 0.2),
  maybe("sodium", 0.5),
  maybe("calcium", 0.5),
];

const silica = createThing({
  id: "silica",
  getName: () => "Silica",
});
silica.getChildren = () => ["silicon", "oxygen"];

const chitin = createThing({
  id: "chitin",
  getName: () => "Chitin",
});
chitin.getChildren = () => ["carbon", "hydrogen", "oxygen", "nitrogen"];

const salt = createThing({
  id: "salt",
  getName: () => "Salt",
});
salt.getChildren = () => ["chlorine", "sodium"];

const water = createThing({
  id: "water",
  getName: () => "Water",
});
water.getChildren = () => ["hydrogen", "oxygen"];

const fire = createThing({
  id: "fire",
  getName: () => "Fire",
});
fire.getChildren = () => ["oxygen", "carbon"];

const ash = createThing({
  id: "ash",
  getName: () => "Ash",
});
ash.getChildren = () => ["organic_matter", "carbon"];

const dew = createThing({
  id: "dew",
  getName: () => "Dew",
});
dew.getChildren = () => ["water"];

const ice = createThing({
  id: "ice",
  getName: () => "Ice",
});
ice.getChildren = () => ["water"];

const snow = createThing({
  id: "snow",
  getName: () => "Snow",
});
snow.getChildren = () => ["snowflakes"];

const snowflakes = createThing({
  id: "snowflakes",
  getName: () => "Snowflakes",
});
snowflakes.getChildren = () => ["water"];

const ammonia = createThing({
  id: "ammonia",
  getName: () => "Ammonia",
});
ammonia.getChildren = () => ["hydrogen", "nitrogen"];

const methane = createThing({
  id: "methane",
  getName: () => "Methane",
});
methane.getChildren = () => ["hydrogen", "carbon"];

const plastic = createThing({
  id: "plastic",
  getName: () => "Plastic",
});
plastic.getChildren = () => ["polymers"];

const rubber = createThing({
  id: "rubber",
  getName: () => "Rubber",
});
rubber.getChildren = () => ["polymers"];

const polymers = createThing({
  id: "polymers",
  getName: () => "Polymers",
});
polymers.getChildren = () => ["carbon", "hydrogen", "oxygen"];

const alcohol = createThing({
  id: "alcohol",
  getName: () => "Alcohol",
});
alcohol.getChildren = () => ["carbon", "hydrogen", "oxygen"];

const steel = createThing({
  id: "steel",
  getName: () => "Steel",
});
steel.getChildren = () => ["iron", "carbon"];

// //alright, I'm not doing the whole periodic table.
const proteins = createThing({
  id: "proteins",
  getName: () => "Proteins",
});
proteins.getChildren = () => ["atom"];

const lipids = createThing({
  id: "lipids",
  getName: () => "Lipids",
});
lipids.getChildren = () => ["atom"];

const organicMatter = createThing({
  id: "organic_matter",
  getName: () => "Organic Matter",
});
organicMatter.getChildren = () => [
  chooseThing(["proteins", "lipids", "glucose"]),
  maybe(chooseThing(["proteins", "lipids", "glucose"]), 0.75),
  maybe("salt", 0.3),
];

const portal = createThing({
  id: "portal",
  getName: () => "Portal",
});
portal.getChildren = () => ["universe"];

const glucose = createThing({
  id: "glucose",
  getName: () => "Glucose",
});
glucose.getChildren = () => ["carbon", "hydrogen", "oxygen"];

export const basicMaterials = [
  diamond,
  oil,
  magma,
  rock,
  silica,
  chitin,
  salt,
  water,
  fire,
  ash,
  dew,
  ice,
  snow,
  snowflakes,
  ammonia,
  methane,
  plastic,
  rubber,
  polymers,
  alcohol,
  steel,
  proteins,
  lipids,
  organicMatter,
  portal,
  glucose,
];
