// tweaked from https://en.wikipedia.org/wiki/ARPABET

const Vowel = {
  /**
   * @example father
   */
  AA: "AA",
  /**
   * @example bet
   */
  EH: "EH",
  /**
   * @example beat
   */
  IY: "IY",
  /**
   * @example bother
   */
  OO: "OO",
  /**
   * @example boot
   */
  UW: "UW",

  /**
   * @example bat
   */
  AE: "AE",
  /**
   * @example butt
   */
  AH: "AH",
  /**
   * @example caught, story
   */
  AO: "AO",
  /**
   * @example bout
   */
  AW: "AW",
  /**
   * @example bite
   */
  AY: "AY",
  /**
   * @example bird, foreword
   */
  ER: "ER",
  /**
   * @example bait
   */
  EY: "EY",
  /**
   * @example bit
   */
  IH: "IH",
  /**
   * @example roses, rabbit
   */
  IX: "IX",
  /**
   * @example boat
   */
  OW: "OW",
  /**
   * @example boy
   */
  OY: "OY",
  /**
   * @example book
   */
  UH: "UH",
} as const;

type Vowel = (typeof Vowel)[keyof typeof Vowel];

const Consonant = {
  /**
   * @example buy
   */
  B: "B",
  /**
   * @example China
   */
  CH: "CH",
  /**
   * @example die
   */
  D: "D",
  /**
   * @example thy
   */
  DH: "DH",
  /**
   * @example butter
   */
  DX: "DX",
  /**
   * @example rhythm
   */
  EM: "EM",
  /**
   * @example button
   */
  EN: "EN",
  /**
   * @example fight
   */
  F: "F",
  /**
   * @example guy
   */
  G: "G",
  /**
   * @example high
   */
  H: "H",
  /**
   * @example jive
   */
  JH: "JH",
  /**
   * @example kite
   */
  K: "K",
  /**
   * @example lie
   */
  L: "L",
  /**
   * @example my
   */
  M: "M",
  /**
   * @example nigh
   */
  N: "N",
  /**
   * @example sing
   */
  NG: "NG",
  /**
   * @example pie
   */
  P: "P",
  /**
   * Glottal stop
   * @example uh-oh
   */
  Q: "Q",
  /**
   * @example rye
   */
  R: "R",
  /**
   * @example sigh
   */
  S: "S",
  /**
   * @example shy
   */
  SH: "SH",
  /**
   * @example tie
   */
  T: "T",
  /**
   * @example thigh
   */
  TH: "TH",
  /**
   * @example vie
   */
  V: "V",
  /**
   * @example wise
   */
  W: "W",
  /**
   * @example yacht
   */
  Y: "Y",
  /**
   * @example zoo
   */
  Z: "Z",
  /**
   * @example pleasure
   */
  ZH: "ZH",
} as const;

type Consonant = (typeof Consonant)[keyof typeof Consonant];
type Phoneme = Vowel | Consonant;

/**
 * Space-separated list of phonemes
 */
type Syllable = string;

type StartingWordPart = [pivotSyllable: Syllable, partExcludingPivot: string, pivot: string];
type EndingWordPart = [pivotSyllable: Syllable, pivot: string, partExcludingPivot: string];

const firstNameStarts: StartingWordPart[] = [
  // Vowel + Consonant
  [`${Vowel.AA} ${Consonant.R}`, "Ch", "ar"],
  [`${Vowel.AE} ${Consonant.N}`, "Fr", "an"],
  [`${Vowel.AE} ${Consonant.N}`, "M", "an"],
  [`${Vowel.AH} ${Consonant.M}`, "Willi", "am"],
  [`${Vowel.AO} ${Consonant.R}`, "Ge", "or"],
  [`${Vowel.EH} ${Consonant.DH}`, "M", "eth"],
  [`${Vowel.EH} ${Consonant.F}`, "Jos", "eph"],
  [`${Vowel.EH} ${Consonant.N}`, "H", "en"],
  [`${Vowel.EY} ${Consonant.M}`, "J", "ame"],
  [`${Vowel.IH} ${Consonant.L}`, "W", "ill"],
  [`${Vowel.IH} ${Consonant.L}`, "B", "ill"],
  [`${Vowel.OO} ${Consonant.N}`, "J", "ohn"],
  [`${Vowel.OO} ${Consonant.B}`, "R", "ob"],
  [`${Vowel.OO} ${Consonant.M}`, "Th", "om"],
  [`${Vowel.AY} ${Consonant.K}`, "M", "ich"],
  [`${Vowel.EY} ${Consonant.V}`, "D", "av"],
  [`${Vowel.IH} ${Consonant.CH}`, "R", "ich"],
];
const firstNameEnds: EndingWordPart[] = [
  // Vowel + Consonant
  [`${Vowel.AE} ${Consonant.N}`, "an", "thony"],
  [`${Vowel.AH} ${Consonant.N}`, "on", "y"],
  [`${Vowel.EH} ${Consonant.DH}`, "eth", "any"],
  [`${Vowel.IH} ${Consonant.L}`, "ill", "iam"],
  [`${Vowel.EY} ${Consonant.M}`, "ame", "s"],
  [`${Vowel.AO} ${Consonant.R}`, "or", "ge"],
  [`${Vowel.AA} ${Consonant.R}`, "ar", "les"],
  [`${Vowel.AE} ${Consonant.N}`, "an", "k"],
  [`${Vowel.EH} ${Consonant.N}`, "en", "ry"],
  [`${Vowel.OO} ${Consonant.B}`, "ob", "ert"],
  [`${Vowel.OO} ${Consonant.M}`, "om", "as"],
  [`${Vowel.EY} ${Consonant.V}`, "av", "e"],
  [`${Vowel.EY} ${Consonant.V}`, "av", "id"],
  [`${Vowel.IH} ${Consonant.CH}`, "ich", "ard"],
];

function randomElement<T>(arr: T[]): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)];
}

const singleSyllableFirstNameOnsets: string[] = [
  "B",
  "Br",
  "Bl",
  "Cr",
  "Dr",
  "Fl",
  "Fr",
  "Gl",
  "Gr",
  "J",
  "N",
  "Pr",
  "Pl",
  "S",
  "Sl",
  "Sp",
  "Sk",
  "Sh",
  "Sw",
  // "Str",
  "Spr",
  "Spl",
  "Scr",
  "Squ",
  "Tr",
  "Th",
  "W",

  // "R",
  // "K",
];
const singleSyllableFirstNameNucleiAndCoda: string[] = [
  "art",
  "eeze",
  "erk",
  "ong",
  "onk",
  "oak",
  "ug",
  "uck",
  "unk",
  "inch",
  "ink",
];

export function generateSingleSyllableFirstName() {
  const onset = randomElement(singleSyllableFirstNameOnsets);
  const nucleusAndCoda = randomElement(singleSyllableFirstNameNucleiAndCoda);
  let result = `${onset}${nucleusAndCoda}`;
  result = result.replace("uu", "u");
  return result;
}

export function generateFirstName() {
  if (Math.random() < 0.3) {
    // Generate a single-syllable first name
    return generateSingleSyllableFirstName();
  } else {
    while (true) {
      const start = randomElement(firstNameStarts)!;

      const pivotSyllable = start[0];

      const potentialEnds = firstNameEnds.filter((end) => end[0] === pivotSyllable);
      const end = randomElement(potentialEnds);
      if (end) {
        return `${start[1]}${start[2]}${end[2]}`;
      }
    }
  }
}
