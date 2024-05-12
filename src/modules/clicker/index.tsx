import {
  ComponentProps,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import {
  array,
  fallback,
  finite,
  number,
  object,
  Output,
  parse,
} from "valibot";
import { fonts } from "~/theme.styles";

/**
 * Clicker game
 * Pixels are a float, only show the `Math.floor` of it in the UI
 */

const buildingDataSchema = object({
  amountOwned: fallback(number([finite()]), 0),
  amountBought: fallback(number([finite()]), 0),
  highestAmount: fallback(number([finite()]), 0),
});

const clickerDataSchema = object({
  legacyStart: fallback(number([finite()]), 0),
  clicks: fallback(number([finite()]), 0),
  pixels: fallback(number([finite()]), 0),
  handmadePixels: fallback(number([finite()]), 0),
  mostPixelsInWallet: fallback(number([finite()]), 0),
  pixelsEarned: fallback(number([finite()]), 0),
  buildings: fallback(array(buildingDataSchema), []),
});
type ClickerData = Output<typeof clickerDataSchema>;

let initialClickerData = parse(clickerDataSchema, {});
let initialBuildingData = parse(buildingDataSchema, {});
try {
  initialClickerData = parse(
    clickerDataSchema,
    JSON.parse(localStorage.getItem("clickerData") || "{}")
  );
} catch {}

export function Clicker() {
  const [hasClicked, setHasClicked] = createSignal(false);
  const [data, setData] = createStore(initialClickerData);

  function earn(pixels: number) {
    setData((data) => ({
      ...data,
      pixels: data.pixels + pixels,
      pixelsEarned: data.pixelsEarned + pixels,
      mostPixelsInWallet: Math.max(
        data.pixels + pixels,
        data.mostPixelsInWallet
      ),
    }));
  }

  const pps = createMemo(() => {
    return data.buildings.reduce((acc, building, i) => {
      if (!building) return acc;
      return acc + getInitialPPS(i) * building.amountOwned;
    }, 0);
  });

  function click() {
    setHasClicked(true);
    if (data.legacyStart === 0) {
      setData("legacyStart", Date.now());
    }
    const amount = 1;
    earn(amount);
    setData("handmadePixels", (pixels) => pixels + amount);
  }

  onMount(() => {
    const interval = setInterval(() => {
      if (hasClicked()) {
        localStorage.setItem("clickerData", JSON.stringify(data));
      }
    }, 1000 * 10);
    onCleanup(() => clearInterval(interval));
  });

  useFrame((ms) => {
    const pixelsPerSecond = pps() / 1000;
    earn(pixelsPerSecond * ms);
  });

  return (
    <>
      <div
        css={{
          fontFamily: fonts.sans,
          position: "fixed",
          height: 48,
          items: "center",
          display: "flex",
          fontScale: 0,
        }}
      >
        <button
          css={{
            width: 48,
            height: 48,
            display: "flex",
            items: "center",
            justify: "center",
          }}
          onClick={click}
        >
          <Pixel />
        </button>
        {hasClicked() ? (
          <>
            {formatNumber(data.pixels)} (per second: {formatPPS(pps())})
          </>
        ) : (
          "Trents.Computer"
        )}
      </div>
      {hasClicked() && <BuildingList data={data} setData={setData} />}
    </>
  );
}

function useFrame(cb: (ms: number) => void) {
  let previousTimeStamp = 0;
  let running = true;
  function firstFrame(timeStamp: number) {
    previousTimeStamp = timeStamp;
    animate(timeStamp);
  }
  function animate(timeStamp: number) {
    const ms = timeStamp - previousTimeStamp;
    previousTimeStamp = timeStamp;
    cb(ms);
    if (running) {
      requestAnimationFrame(animate);
    }
  }
  onMount(() => {
    requestAnimationFrame(firstFrame);
  });
  onCleanup(() => {
    running = false;
  });
}

const notations = [
  " thousand",
  " million",
  " billion",
  " trillion",
  " quadrillion",
  " quintillion",
  " sextillion",
  " septillion",
  " octillion",
  " nonillion",
];
const notationPrefixes = [
  "",
  "un",
  "duo",
  "tre",
  "quattuor",
  "quin",
  "sex",
  "septen",
  "octo",
  "novem",
];
const notationSuffixes = [
  "decillion",
  "vigintillion",
  "trigintillion",
  "quadragintillion",
  "quinquagintillion",
  "sexagintillion",
  "septuagintillion",
  "octogintillion",
  "nonagintillion",
];
for (var i in notationSuffixes) {
  for (var ii in notationPrefixes) {
    notations.push(" " + notationPrefixes[ii] + notationSuffixes[i]);
  }
}

function formatNumber(n: number) {
  let base = 0,
    notationValue = "";
  if (!isFinite(n)) return "Infinity";
  if (n < 1_000_000) {
    return Intl.NumberFormat([], {}).format(Math.floor(n));
  }
  if (n >= 1_000_000) {
    n /= 1000;
    while (Math.round(n) >= 1000) {
      n /= 1000;
      base++;
    }
    if (base >= notations.length) {
      return "Infinity";
    } else {
      notationValue = notations[base];
    }
  }
  return Math.round(n * 1000) / 1000 + notationValue;
}

function formatPPS(n: number) {
  if (!isFinite(n)) return "Infinity";
  if (n < 1000)
    return Intl.NumberFormat([], { maximumFractionDigits: 1 }).format(n);
  return formatNumber(n);
}

function Pixel(props: ComponentProps<"span">) {
  return (
    <span
      {...props}
      css={{
        display: "block",
        backgroundColor: "var(--color-brand)",
        w: 24,
        h: 24,
        clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
      }}
    />
  );
}

function BuildingList(props: {
  data: ClickerData;
  setData: SetStoreFunction<ClickerData>;
}) {
  function handleBuyBuilding(index: number) {
    const price = getPriceForNextBuilding(
      index,
      props.data.buildings[index]?.amountOwned ?? 0
    );
    if (props.data.pixels >= price) {
      props.setData("pixels", (pixels) => pixels - price);
      props.setData("buildings", index, (building) => {
        building = building || initialBuildingData;
        return {
          ...building,
          amountOwned: building.amountOwned + 1,
        };
      });
    }
  }
  return (
    <div
      css={{
        position: "fixed",
        top: 0,
        right: 0,
        maxH: "100vh",
        overflowY: "auto",
        padding: 16,
        backdropFilter: "blur(10px)",
        zIndex: 2000,
      }}
    >
      {/* <h2>Shop</h2> */}
      <ul css={{ width: 344, spaceY: 8 }}>
        <li>
          <Building
            title="Cursor"
            description="idk"
            index={0}
            owned={props.data.buildings[0]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(0)}
          />
        </li>
        <li>
          <Building
            title="Grandma"
            description="idk"
            index={1}
            owned={props.data.buildings[1]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(1)}
          />
        </li>
        <li>
          <Building
            title="Farm"
            description="idk"
            index={2}
            owned={props.data.buildings[2]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(2)}
          />
        </li>
        <li>
          <Building
            title="Mine"
            description="idk"
            index={3}
            owned={props.data.buildings[3]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(3)}
          />
        </li>
        <li>
          <Building
            title="Factory"
            description="idk"
            index={4}
            owned={props.data.buildings[4]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(4)}
          />
        </li>
        <li>
          <Building
            title="Bank"
            description="idk"
            index={5}
            owned={props.data.buildings[5]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(5)}
          />
        </li>
        <li>
          <Building
            title="Temple"
            description="idk"
            index={6}
            owned={props.data.buildings[6]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(6)}
          />
        </li>
        <li>
          <Building
            title="Wizard Tower"
            description="idk"
            index={7}
            owned={props.data.buildings[7]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(7)}
          />
        </li>
        <li>
          <Building
            title="Shipment"
            description="idk"
            index={8}
            owned={props.data.buildings[8]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(8)}
          />
        </li>
        <li>
          <Building
            title="Alchemy Lab"
            description="idk"
            index={9}
            owned={props.data.buildings[9]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(9)}
          />
        </li>
        <li>
          <Building
            title="Portal"
            description="idk"
            index={10}
            owned={props.data.buildings[10]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(10)}
          />
        </li>
        <li>
          <Building
            title="Time Machine"
            description="idk"
            index={11}
            owned={props.data.buildings[11]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(11)}
          />
        </li>
        <li>
          <Building
            title="Antimatter Condenser"
            description="idk"
            index={12}
            owned={props.data.buildings[12]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(12)}
          />
        </li>
        <li>
          <Building
            title="Prism"
            description="idk"
            index={13}
            owned={props.data.buildings[13]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(13)}
          />
        </li>
        <li>
          <Building
            title="Chancemaker"
            description="idk"
            index={14}
            owned={props.data.buildings[14]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(14)}
          />
        </li>
        <li>
          <Building
            title="Fractal Engine"
            description="idk"
            index={15}
            owned={props.data.buildings[15]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(15)}
          />
        </li>
        <li>
          <Building
            title="JavaScript Console"
            description="idk"
            index={16}
            owned={props.data.buildings[16]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(16)}
          />
        </li>
        <li>
          <Building
            title="Idleverse"
            description="idk"
            index={17}
            owned={props.data.buildings[17]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(17)}
          />
        </li>
        <li>
          <Building
            title="Cortex Baker"
            description="idk"
            index={18}
            owned={props.data.buildings[18]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(18)}
          />
        </li>
        <li>
          <Building
            title="You"
            description="idk"
            index={19}
            owned={props.data.buildings[19]?.amountOwned ?? 0}
            onClick={() => handleBuyBuilding(19)}
          />
        </li>
      </ul>
    </div>
  );
}

function getInitialBuildingPrice(buildingIndex: number) {
  const n = buildingIndex;
  if (n < 1) return 15;

  let basePrice =
    (n * 1 + 9 + (n < 5 ? 0 : Math.pow(n - 5, 1.75) * 5)) *
    Math.pow(10, n) *
    Math.max(1, n - 14);

  let digits =
    Math.pow(10, Math.ceil(Math.log(Math.ceil(basePrice)) / Math.LN10)) / 100;

  basePrice = Math.round(basePrice / digits) * digits;

  if (n >= 16) basePrice *= 10;
  if (n >= 17) basePrice *= 10;
  if (n >= 18) basePrice *= 10;
  if (n >= 19) basePrice *= 20;
  return basePrice;
}

function getPriceForNextBuilding(buildingIndex: number, amountOwned: number) {
  return Math.ceil(
    getInitialBuildingPrice(buildingIndex) * Math.pow(1.15, amountOwned)
  );
}

function getInitialPPS(buildingIndex: number) {
  const n = buildingIndex;
  if (n < 1) return 0.1;
  let baseCps = Math.ceil(Math.pow(n * 1, n * 0.5 + 2) * 10) / 10; //0.45 used to be 0.5
  const digits =
    Math.pow(10, Math.ceil(Math.log(Math.ceil(baseCps)) / Math.LN10)) / 100;
  baseCps = Math.round(baseCps / digits) * digits;
  return baseCps;
}

function Building(props: {
  index: number;
  title: string;
  description: string;
  owned: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      css={{
        d: "flex",
        justify: "space-between",
        w: "100%",
        align: "left",
        items: "center",
        background: "rgba(246, 246, 246, 0.84)",
        padding: 12,
        gap: 8,
        borderRadius: 16,
        boxShadow:
          "inset 0 0 1px rgba(255, 255, 255, 0.1), 0 0 2px rgba(0,0,0,0.25), 0 0 9px rgba(0,0,0,0.20)",
        fontSize: 13,
        lineHeight: "16px",
      }}
    >
      <div>
        <div css={{ fontWeight: 500 }}>{props.title}</div>
        <div>
          Cost {formatNumber(getPriceForNextBuilding(props.index, props.owned))}
        </div>
      </div>
      <span>{props.owned || null}</span>
    </button>
  );
}
