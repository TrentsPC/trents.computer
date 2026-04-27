// import { PATRICIA_TAXXON_TRAINING_DATA } from "../training-data/patricia-taxxon";
import { Bot } from "../types";

export type MarkovRecord = {
  [from: string]: {
    [to: string]: number;
  };
};

const START_TOKEN = "<|START|>";
const LINE_BREAK = "<|BR|>";
const END_TOKEN = "<|END|>";

function trainMarkovModel(data: string) {
  const datasets = data.split(/\n{2,}/g);
  const record: MarkovRecord = {};

  for (let dataset of datasets) {
    let words = dataset.replaceAll(/\s*\n+\s*/g, " " + LINE_BREAK + " ").split(/\s+/g);
    words = [START_TOKEN, ...words, END_TOKEN];

    for (let i = 0; i < words.length - 1; i++) {
      let from = words[i];
      let to = words[i + 1];

      if (!record[from]) {
        record[from] = {};
      }

      if (!record[from][to]) {
        record[from][to] = 0;
      }

      record[from][to]++;
    }
  }

  return record;
}

// const model = trainMarkovModel(PATRICIA_TAXXON_TRAINING_DATA);
// console.log(JSON.stringify(model, null, 2));

function generateChain(record: MarkovRecord, initialWords?: string[]) {
  let words = initialWords || [START_TOKEN];

  let lastWord = words[words.length - 1];
  while (lastWord !== END_TOKEN) {
    let optionsEntries = Object.entries(record[lastWord]);
    let totalWeight = sum(optionsEntries.map((e) => e[1]));
    let random = Math.random() * totalWeight;
    let cumWeight = 0;
    let chosenOption = "";

    for (let i = 0; i < optionsEntries.length; i++) {
      let [option, weight] = optionsEntries[i];
      cumWeight += weight;
      if (random < cumWeight) {
        chosenOption = option;
        break;
      }
    }

    words.push(chosenOption);

    lastWord = words[words.length - 1];
  }

  return words.slice(1, -1).join(" ").replaceAll(` ${LINE_BREAK} `, "\n");
}

function sum(nums: number[]) {
  return nums.reduce((prev, curr) => prev + curr, 0);
}

export function createMarkovBot(record: MarkovRecord): Bot {
  return {
    getNextMessage() {
      return generateChain(record);
    },
  };
}
