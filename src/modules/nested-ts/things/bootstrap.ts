import { choose, collectThings, createThing, repeat } from "../utils";

const universe = createThing({
  id: "universe",
  getName: () => "Universe",
});

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
multiverse.getChildren = () => repeat("universe", 10, 30);

export const bootstrapThings = collectThings([universe, multiverse]);
