import { collectThings, createThing } from "../utils";

const qwubble = createThing({
  id: "qwubble",
  getName: () => "Qwubble",
});
qwubble.getChildren = () => ["multiverse"];

const upQuark = createThing({
  id: "up_quark",
  getName: () => "Up Quark",
});
upQuark.getChildren = () => ["qwubble"];

const downQuark = createThing({
  id: "down_quark",
  getName: () => "Down Quark",
});
downQuark.getChildren = () => ["qwubble"];

const charmQuark = createThing({
  id: "charm_quark",
  getName: () => "Charm Quark",
});
charmQuark.getChildren = () => ["qwubble"];

const strangeQuark = createThing({
  id: "strange_quark",
  getName: () => "Strange Quark",
});
strangeQuark.getChildren = () => ["qwubble"];

const topQuark = createThing({
  id: "top_quark",
  getName: () => "Top Quark",
});
topQuark.getChildren = () => ["qwubble"];

const bottomQuark = createThing({
  id: "bottom_quark",
  getName: () => "Bottom Quark",
});
bottomQuark.getChildren = () => ["qwubble"];

const electron = createThing({
  id: "electron",
  getName: () => "Electron",
});
electron.getChildren = () => ["qwubble"];

const muon = createThing({
  id: "muon",
  getName: () => "Muon",
});
muon.getChildren = () => ["qwubble"];

const neutrino = createThing({
  id: "neutrino",
  getName: () => "Neutrino",
});
neutrino.getChildren = () => ["qwubble"];

const gluon = createThing({
  id: "gluon",
  getName: () => "Gluon",
});
gluon.getChildren = () => ["qwubble"];

const photon = createThing({
  id: "photon",
  getName: () => "Photon",
});
photon.getChildren = () => ["qwubble"];

export const quantumParticles = collectThings([
  qwubble,
  upQuark,
  downQuark,
  charmQuark,
  strangeQuark,
  topQuark,
  bottomQuark,
  electron,
  muon,
  neutrino,
  gluon,
  photon,
]);
