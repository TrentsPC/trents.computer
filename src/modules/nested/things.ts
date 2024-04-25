import { Thing, thingMap } from "./types";

const THING_MAP = thingMap({
  // ENTRYPOINT
  multiverse: {
    id: "multiverse",
    getChildren: ({ randRange, repeat }) =>
      repeat("universe", randRange(10, 30)),
    getName: ({ random }) =>
      random([
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
  },

  // INTERGALACTIC STUFF
  universe: {
    id: "universe",
    getChildren: ({ randRange, repeat }) => [
      ...repeat("galactic_supercluster", randRange(4, 13)),
      ...repeat("warm_hot_intergalactic_medium", randRange(4, 12)),
      ...repeat("cosmic_void", randRange(8, 25)),
    ],
    getName: () => "Universe",
  },
  cosmic_void: {
    id: "cosmic_void",
    getChildren: () => ["quantum_foam"],
    getName: () => "Cosmic Void",
  },
  quantum_foam: {
    id: "quantum_foam",
    getChildren: () => ["photon", "gluon"],
    getName: () => "Quantum Foam",
  },
  warm_hot_intergalactic_medium: {
    id: "warm_hot_intergalactic_medium",
    getChildren: () => ["quantum_foam"],
    getName: () => "Warm-Hot Intergalactic Medium",
  },
  galactic_supercluster: {
    id: "galactic_supercluster",
    getChildren: ({ repeat, randRange }) => repeat("galaxy", randRange(10, 30)),
    getName: () => "Galactic Supercluster",
  },

  // GALACTIC STUFF
  galaxy: {
    id: "galaxy",
    getChildren: ({ repeat }) => [
      "galactic_center",
      ...repeat("galaxy_arm", 2, 6),
    ],
    getName: () => "Galaxy",
  },
  galactic_center: {
    id: "galactic_center",
    getChildren: ({ repeat, maybe }) => [
      "black_hole",
      ...repeat("star_system", 20, 50),
      ...repeat("nebula", 0, 12),
      maybe("galactic_life", 0.1),

      // [
      //   "dyson sphere,4%",
      //   "dyson sphere,2%",
      // ],
    ],
    getName: () => "Galactic Center",
  },
  galaxy_arm: {
    id: "galaxy_arm",
    getChildren: ({ repeat, maybe }) => [
      ...repeat("star_system", 20, 50),
      ...repeat("nebula", 0, 12),
      maybe("black_hole", 0.2),
      maybe("black_hole", 0.2),
      maybe("galactic_life", 0.05),
      // [
      //   "dyson sphere,4%",
      //   "dyson sphere,2%",
      // ],
    ],
    getName: () => "Arm",
  },
  nebula: {
    id: "nebula",
    getChildren: ({ maybe, repeat }) => [
      maybe("star", 0.02),
      maybe("star", 0.02),
      maybe("star", 0.02),
      ...repeat("interstellar_cloud", 1, 6),
      maybe("galactic_life", 0.15),
    ],
    getName: () => "Nebula",
  },
  interstellar_cloud: {
    id: "interstellar_cloud",
    getChildren: ({ maybe }) => [
      "helium",
      "hydrogen",
      maybe("carbon", 0.8),
      maybe("water", 0.05),
      maybe("ammonia", 0.05),
      maybe("nitrogen", 0.05),
      maybe("iron", 0.05),
      maybe("sulfur", 0.05),
      maybe("oxygen", 0.15),
    ],
    getName: ({ random }) => {
      const adjective = random([
        "A bright pink",
        "A faint",
        "A fading",
        "A pale",
        "A fluo",
        "A glowing",
        "A green",
        "A bright green",
        "A dark brown",
        "A brooding",
        "A magenta",
        "A bright red",
        "A dark red",
        "A blueish",
        "A deep blue",
        "A turquoise",
        "A teal",
        "A golden",
        "A multicolored",
        "A silver",
        "A dramatic",
        "A luminous",
        "A colossal",
        "A purple",
        "A gold-trimmed",
        "An opaline",
        "A silvery",
        "A shimmering",
      ]);
      return `${adjective} interstellar cloud`;
    },
  },
  star_system: {
    id: "star_system",
    getChildren: ({ maybe, repeat }) => [
      "star",
      maybe("star", 0.03),
      // "visitor planet,5%",
      // "future planet,10%",
      // "future planet,10%",
      // "terraformed planet,50%",
      // "terraformed planet,20%",
      // "terraformed planet,10%",
      // "medieval planet,30%",
      // "medieval planet,20%",
      // "ancient planet,50%",
      // "ancient planet,30%",
      // "ancient planet,10%",
      // "barren planet,60%",
      // "barren planet,40%",
      // "barren planet,20%",
      // "gas giant,60%",
      // "gas giant,40%",
      // "gas giant,20%",
      // "gas giant,10%",
      ...repeat("asteroid_belt", 0, 2),
    ],
    getName: () => "Star System",
  },

  // STARS AND HOLES
  star: {
    id: "star",
    getChildren: ({ maybe }) => [
      "hydrogen",
      "helium",
      maybe("space_monster", 0.002),
      // ["ghost,0.1%"],
    ],
    getName: ({ random }) => {
      const adjective = random([
        "White",
        "Faint",
        "Yellow",
        "Red",
        "Blue",
        "Green",
        "Purple",
        "Bright",
        "Double",
        "Twin",
        "Triple",
        "Old",
        "Young",
        "Dying",
        "Small",
        "Giant",
        "Large",
        "Pale",
        "Dark",
        "Hell",
        "Horrific",
        "Twisted",
        "Spectral",
      ]);
      return `${adjective} star`;
    },
  },
  black_hole: {
    id: "black_hole",
    getChildren: () => ["inside_the_black_hole"],
    getName: () => "Black Hole",
  },
  inside_the_black_hole: {
    id: "inside_the_black_hole",
    getChildren: () => ["white_hole"],
    getName: () => "Inside The Black Hole",
  },
  white_hole: {
    id: "white_hole",
    getChildren: () => ["universe"],
    getName: () => "White Hole",
  },

  // SPACE ROCKS
  asteroid_belt: {
    id: "asteroid_belt",
    getChildren: ({ repeat, maybe }) => [
      ...repeat("asteroid", 10, 30),
      maybe("galactic_life", 0.2),
    ],
    getName: () => "Asteroid Belt",
  },
  asteroid: {
    id: "asteroid",
    getChildren: ({ maybe }) => [
      "rock",
      maybe("ice", 0.3),
      maybe("space_animal", 0.005),
    ],
    getName: () => "Asteroid",
  },
  // PLANETS N STUFF

  // LIFEFORMS

  galactic_life: {
    id: "galactic_life",
    getName: () => "Life",
    getChildren: ({ repeat, maybe }) => [
      ...repeat("space_animal", 1, 12),
      maybe("space_monster", 0.01),
    ],
  },
  space_animal: {
    id: "space_animal",
    getName: ({ random }) => {
      const parts = [
        ["e", "a", "o", "", "", "", "", "", ""],
        [
          "sm",
          "cr",
          "shn",
          "sh",
          "sn",
          "gl",
          "g",
          "m",
          "c",
          "x",
          "h",
          "dr",
          "r",
          "l",
        ],
        ["o", "a", "u", "i", "e", "ee"],
        [
          "x",
          "b",
          "rv",
          "z",
          "s",
          "gg",
          "g",
          "k",
          "rf",
          "gl",
          "bl",
          "th",
          "kt",
          "m",
          "sh",
          "l",
          "dr",
          "v",
          "p",
          "nt",
          "nk",
        ],
        ["o", "a", "i", "u", "e"],
        [
          "n",
          "ne",
          "se",
          "b",
          "m",
          "l",
          "s",
          "sh",
          "th",
          "t",
          "sk",
          "zer",
          "bbler",
          "ggler",
          "ddler",
          "ter",
          "nt",
          "r",
          "r",
          "r",
        ],
      ];
      return parts.map(random).join("");
    },
    getChildren: ({ maybe }) => [
      maybe("space_animal_thoughts", 0.85),
      // "space_animal_body",
    ],
  },
  space_animal_thoughts: {
    id: "space_animal_thoughts",
    getName: () => "Thoughts",
    getChildren: () => [],
    getLeafs: ({ random, repeat }) => {
      function getThought() {
        const parts = [
          [
            "sk'",
            "mop",
            "nanu",
            "nug",
            "gmap",
            "shmu",
            "dna",
            "no",
            "xle",
            "doda",
            "daia",
            "de",
            "",
          ],
          [
            "g ",
            "gek ",
            "th ",
            "iap ",
            "glib ",
            "ph ",
            "d't ",
            "neig'",
            "dip ",
            "shna ",
            "sh ",
          ],
          [
            "sk'",
            "mop",
            "nanu",
            "nug",
            "gmap",
            "shmu",
            "dna",
            "no",
            "xle",
            "doda",
            "daia",
            "de",
            "",
          ],
          [
            "g ",
            "gek ",
            "th ",
            "iap ",
            "glib ",
            "ph ",
            "d't ",
            "neig'",
            "dip ",
            "shna ",
            "sh ",
          ],
          ["mi", "di", "glu", "dra", "shwa", "ama", ""],
          ["ben", "ri", "nap", "dap", "top", "gog"],
          [".", ".", ".", ".", "!", "?"],
        ];
        return parts.map(random).join("");
      }
      return repeat("", 1, 3).map(getThought);
    },
  },
  space_monster: {
    id: "space_monster",
    getName: ({ random }) => {
      const parts = [
        [
          "C'",
          "Vr'",
          "Ksh",
          "Zn'",
          "Sh",
          "Hrl",
          "X",
          "O",
          "Yog",
          "Gorg",
          "Morg",
          "Marg",
          "Magg",
        ],
        [
          "",
          "",
          "agn",
          "soth",
          "norgn",
          "ngas",
          "alx",
          "orx",
          "rgl",
          "iirn",
          "egw",
          "thulh",
          "t",
          "g",
          "m",
        ],
        [
          "org",
          "orgon",
          "orgus",
          "orkus",
          "oid",
          "us",
          "u",
          "esth",
          "ath",
          "oth",
          "um",
          "ott",
          "aur",
        ],
        [
          "",
          " the Forgotten",
          " the Entity",
          " the Ancient",
          " the Starchild",
          " the Seeder",
          " the Leech",
          " the Timeless",
          " the Eon",
          " the Many",
          " the Countless",
          " the Boundless",
          " the Prisoner",
          " the Child",
          " the Form",
          " the Shape",
          " the Drifter",
          " the Swarm",
          " the Vicious",
          " the Warden",
          " the Ender",
          " the Unworldly",
          " the Unfriendly",
          " the All-Consumer",
        ],
      ];
      return parts.map(random).join("");
    },
    getChildren: ({ maybe }) => [
      // "space_animal_thoughts",
      // "space_animal_body",
    ],
  },
  // new Thing("space monster",["space monster thoughts", ["tentacle,0-6", "fish fin,0-4", "", ""], "stinger,20%", ["crustacean claw,0-4", ""], ["crustacean leg,0-8", ""], ["crustacean shell", "scales", "fur", "exoskeleton", ""], ["mouth,1-2", "beak,1-2"], "skull,80%", ["eye,1-8", "simple eye,1-8", "", ""], "weird soft organ,0-4", "weird hard organ,0-4"],[["C'", "Vr'", "Ksh", "Zn'", "Sh", "Hrl", "X", "O", "Yog", "Gorg", "Morg", "Marg", "Magg"], ["", "", "agn", "soth", "norgn", "ngas", "alx", "orx", "rgl", "iirn", "egw", "thulh", "t", "g", "m"], ["org", "orgon", "orgus", "orkus", "oid", "us", "u", "esth", "ath", "oth", "um", "ott", "aur"], ["", " the Forgotten", " the Entity", " the Ancient", " the Starchild", " the Seeder", " the Leech", " the Timeless", " the Eon", " the Many", " the Countless", " the Boundless", " the Prisoner", " the Child", " the Form", " the Shape", " the Drifter", " the Swarm", " the Vicious", " the Warden", " the Ender", " the Unworldly", " the Unfriendly", " the All-Consumer"]]);
  // new Thing("space monster thoughts",["space monster thought,1-2"],["thoughts"]);
  // new Thing("space monster thought",[],["WWWWWWWIDER THAN STARRRRRRS", "AWAKENNNN MY CHILDRENNNNNN", "GALAXIESSSSS SHALL FALLLLLLL", "I AMMMMMM INFFFFFINITE", "I SSSSSSSPAN AGESSSS", "WWWWWWEEEEE ARE UNDYINGGGGGG", "WE COMMMMMMMME", "WE ANSSSSSWER THE CALLLLLLL", "I TRAVELLLLLLL SLLLLLLUMBERING", "FROMMMMMM FARRRRRR I COMMMME", "IIIIII MUSSST SCREEEAAAM", "I AMMMM AWAKENED", "ALLLLLL FEAR MEEEEE", "NOOOOONE SHALL LIVE", "I MUSSSSST EATTTTT", "DEEEEEEEEP I SSSSLUMBER", "IIIII SHALL CONSSSSUME", "IIIII SHALL DEVOUUUUURRRRR", "LIFFFFFFE MUSSSSST PERISHHHHH", "NNNNNNNNURISHMENT", "ALL SHALLLLLLL GO INSSSSSSANE", "SSSSSSANITY SHALL YIELDDDDD", "EXXXXXILED I WASSSSS", "EONSSSSS I HAVE SLUMBERED", "EONSSSSS I HAVE WAITED", "MORTALSSSSSS BEHOLDDDDD", "I COMMMMME FROM DEEP", "IMMMMMMOBILE I WATCHHHH", "SSSSSKITTER", "HHHHHHHEY HOW YOU DOIN'", "AWKWAAAAAAAAARD"]);

  // new Thing("space animal body",[["tentacle,0-6", "crustacean leg,0-8", "fish fin,0-4", "mammal leg,1-6", "", ""], ["insect wing,0-6", "", ""], ["crustacean claw,0-4", "", ""], "flesh,40%", "snout,3%", "stinger,10%", "whiskers,3%", ["crustacean shell", "scales", "fur", "exoskeleton", ""], ["mouth,1-4", "beak,1-4", ""], "skull,30%", "brain,50%", ["eye,1-2", "eye,1-6", "simple eye,1-6", ""], "weird soft organ,50%", "weird soft organ,20%", "weird hard organ,50%", "weird hard organ,20%"],["body"]);
  // BODY PARTS

  //
  // ATOMS N STUFF
  qwubble: {
    id: "qwubble",
    getChildren: ({ repeat, randRange }) =>
      repeat("multiverse", randRange(1, 5)),
    getName: () => "Qwubble",
  },
  // Elementary particles
  up_quark: {
    id: "up_quark",
    getChildren: () => ["qwubble"],
    getName: () => "Up Quark",
  },
  down_quark: {
    id: "down_quark",
    getChildren: () => ["qwubble"],
    getName: () => "Down Quark",
  },
  charm_quark: {
    id: "charm_quark",
    getChildren: () => ["qwubble"],
    getName: () => "Charm Quark",
  },
  strange_quark: {
    id: "strange_quark",
    getChildren: () => ["qwubble"],
    getName: () => "Strange Quark",
  },
  top_quark: {
    id: "top_quark",
    getChildren: () => ["qwubble"],
    getName: () => "Top Quark",
  },
  bottom_quark: {
    id: "bottom_quark",
    getChildren: () => ["qwubble"],
    getName: () => "Bottom Quark",
  },
  electron: {
    id: "electron",
    getChildren: () => ["qwubble"],
    getName: () => "Electron",
  },
  muon: {
    id: "muon",
    getChildren: () => ["qwubble"],
    getName: () => "Muon",
  },
  neutrino: {
    id: "neutrino",
    getChildren: () => ["qwubble"],
    getName: () => "Neutrino",
  },
  gluon: {
    id: "gluon",
    getChildren: () => ["qwubble"],
    getName: () => "Gluon",
  },
  photon: {
    id: "photon",
    getChildren: () => ["qwubble"],
    getName: () => "Photon",
  },
  // sub-atomic particles
  proton: {
    id: "proton",
    getChildren: () => ["up_quark", "up_quark", "down_quark"],
    getName: () => "Proton",
  },
  neutron: {
    id: "neutron",
    getChildren: () => ["down_quark", "down_quark", "up_quark"],
    getName: () => "Neutron",
  },
  // Atoms woohoo
  atom: {
    id: "atom",
    getChildren: () => ["proton", "neutron", "electron"],
    getName: () => "Atoms",
  },
  molecule: {
    id: "molecule",
    getChildren: () => ["atom"],
    getName: () => "Molecules",
  },
  // Periodic Table
  hydrogen: {
    id: "hydrogen",
    getChildren: () => ["proton", "neutron", "electron"],
    getName: () => "Hydrogen",
  },
  helium: {
    id: "helium",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 2),
      ...repeat("neutron", 2),
      ...repeat("electron", 2),
    ],
    getName: () => "Helium",
  },
  lithium: {
    id: "lithium",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 3),
      ...repeat("neutron", 3, 4),
      ...repeat("electron", 3),
    ],
    getName: () => "Lithium",
  },
  beryllium: {
    id: "beryllium",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 4),
      ...repeat("neutron", 4, 5),
      ...repeat("electron", 4),
    ],
    getName: () => "Beryllium",
  },
  boron: {
    id: "boron",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 5),
      ...repeat("neutron", 5, 6),
      ...repeat("electron", 5),
    ],
    getName: () => "Boron",
  },
  carbon: {
    id: "carbon",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 6),
      ...repeat("neutron", 6),
      ...repeat("electron", 6),
    ],
    getName: () => "Carbon",
  },
  nitrogen: {
    id: "nitrogen",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 7),
      ...repeat("neutron", 7),
      ...repeat("electron", 7),
    ],
    getName: () => "Nitrogen",
  },
  oxygen: {
    id: "oxygen",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 8),
      ...repeat("neutron", 8),
      ...repeat("electron", 8),
    ],
    getName: () => "Oxygen",
  },
  fluorine: {
    id: "fluorine",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 9),
      ...repeat("neutron", 10),
      ...repeat("electron", 9),
    ],
    getName: () => "Fluorine",
  },
  neon: {
    id: "neon",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 10),
      ...repeat("neutron", 10),
      ...repeat("electron", 10),
    ],
    getName: () => "Neon",
  },
  sodium: {
    id: "sodium",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 11),
      ...repeat("neutron", 12),
      ...repeat("electron", 11),
    ],
    getName: () => "Sodium",
  },
  magnesium: {
    id: "magnesium",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 12),
      ...repeat("neutron", 12, 13),
      ...repeat("electron", 12),
    ],
    getName: () => "Magnesium",
  },
  aluminium: {
    id: "aluminium",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 13),
      ...repeat("neutron", 13, 15),
      ...repeat("electron", 13),
    ],
    getName: () => "Aluminium",
  },
  silicon: {
    id: "silicon",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 14),
      ...repeat("neutron", 14),
      ...repeat("electron", 14),
    ],
    getName: () => "Silicon",
  },
  phosphorus: {
    id: "phosphorus",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 15),
      ...repeat("neutron", 16),
      ...repeat("electron", 15),
    ],
    getName: () => "Phosphorus",
  },
  sulfur: {
    id: "sulfur",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 16),
      ...repeat("neutron", 16),
      ...repeat("electron", 16),
    ],
    getName: () => "Sulfur",
  },
  potassium: {
    id: "potassium",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 19),
      ...repeat("neutron", 20),
      ...repeat("electron", 19),
    ],
    getName: () => "Potassium",
  },
  calcium: {
    id: "calcium",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 20),
      ...repeat("neutron", 20),
      ...repeat("electron", 20),
    ],
    getName: () => "Calcium",
  },
  iron: {
    id: "iron",
    getChildren: ({ repeat }) => [
      ...repeat("proton", 26),
      ...repeat("neutron", 30),
      ...repeat("electron", 26),
    ],
    getName: () => "Iron",
  },

  // BASIC MATERIALS
  water: {
    id: "water",
    getChildren: ({ repeat }) => [
      ...repeat("hydrogen", 2),
      ...repeat("oxygen", 1),
    ],
    getName: () => "Water",
  },
  silica: {
    id: "silica",
    getChildren: ({ repeat }) => ["silicon", "oxygen"],
    getName: () => "Silica",
  },
  ammonia: {
    id: "ammonia",
    getChildren: () => ["hydrogen", "nitrogen"],
    getName: () => "Ammonia",
  },

  ice: {
    id: "ice",
    getChildren: () => ["water"],
    getName: () => "Ice",
  },
  rock: {
    id: "rock",
    getChildren: ({ maybe }) => [
      "silica",
      maybe("aluminium", 0.3),
      maybe("iron", 0.2),
      maybe("potassium", 0.2),
      maybe("sodium", 0.5),
      maybe("calcium", 0.5),
    ],
    getName: () => "Rock",
  },
});

export const THINGS = Object.values(THING_MAP) as Thing<string>[];
