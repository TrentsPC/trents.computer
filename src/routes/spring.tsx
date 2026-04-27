import { createFileRoute } from "@tanstack/solid-router";
import { createSignal, For } from "solid-js";
import { createSpring } from "~/modules/spring";

export const Route = createFileRoute("/spring")({
  component: RouteComponent,
});

const calculatorCode = `
function getSpringParameters(period: number, dampingRatio: number) {
  const mass = 1;

  const stiffness = (4 * Math.PI * Math.PI) / (period * period);

  let damping = 0;
  if (stiffness > 0) {
    damping = dampingRatio * 2 * Math.sqrt(stiffness);
  }

  return { mass, stiffness, damping };
}
`.trim();

function RouteComponent() {
  return (
    <div css={{ padding: 20 }}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <SpringEditor />

        <pre css={{ backgroundColor: "#222", color: "#eee", padding: 16 }}>
          <code>{calculatorCode}</code>
        </pre>
      </div>
    </div>
  );
}

function SpringEditor() {
  const [period, setPeriod] = createSignal(0.45);
  const [dampingRatio, setDampingRatio] = createSignal(0.6);
  const [value, setValue] = createSignal(0);

  const exampleSpring = createSpring(() => ({
    value: value(),
    period: period(),
    damping: dampingRatio(),
  }));

  return (
    <div
      css={{
        border: `1px solid rgba(0,0,0,0.15)`,
        padding: 16,
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div css={{ display: "flex", gap: 30 }}>
        <label css={{ display: "block", width: 256 }}>
          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <span>Period:</span>
            <span>{period()}</span>
          </div>
          <input
            type="range"
            css={{
              width: 256,
            }}
            min="0.01"
            max="2"
            step="0.01"
            value={period()}
            onInput={(e) => setPeriod(Number(e.currentTarget.value))}
            list="response"
          />

          {/* <datalist id="response">
            <option value="0"></option>
            <option value="1"></option>
            <option value="2"></option>
          </datalist> */}
        </label>
        <br />
        <label css={{ display: "block", width: 256 }}>
          <div css={{ display: "flex", justifyContent: "space-between" }}>
            <span>Damping Ratio:</span>
            <span>{dampingRatio()}</span>
          </div>
          <input
            css={{
              width: 256,
            }}
            type="range"
            width="256"
            min="0.01"
            max="1"
            step="0.01"
            value={dampingRatio()}
            onInput={(e) => setDampingRatio(Number(e.currentTarget.value))}
            list="damping"
          />
          {/* <datalist id="damping">
            <option value="0"></option>
            <option value="1"></option>
            <option value="2"></option>
          </datalist> */}
        </label>
      </div>
      <SpringChart response={period()} dampingRatio={dampingRatio()} />
      <div
        css={{
          width: 300,
          height: 100,
          border: `3px solid black`,
          borderRadius: 6,
          position: "relative",
        }}
      >
        <div
          css={{
            width: 64,
            height: 100,
            position: "absolute",
            top: -3,
            left: -3,
            padding: 8,
          }}
          style={{
            transform: `translateX(${exampleSpring()}px)`,
          }}
        >
          <div
            css={{
              width: "100%",
              height: "100%",
              backgroundColor: "#ff1a55",
              borderRadius: 3,
            }}
          ></div>
        </div>
      </div>
      <button
        onClick={() => {
          setValue(value() ? 0 : 300 - 64);
        }}
        css={{
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: 6,
          width: 300,
          height: 40,
        }}
      >
        Animate
      </button>
    </div>
  );
}

function SpringChart(props: { response: number; dampingRatio: number }) {
  const stiffness = () => getSpringConstant(props.response);
  const damping = () => getDampingConstant(props.dampingRatio, stiffness());
  const mass = 1;

  const points = () => getSpringChart(stiffness(), damping(), mass, 2);

  return (
    <div
      css={{
        width: 300,
        height: 300,
        border: "3px solid black",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 200 200" width="284" height="284" overflow="visible">
        <For each={[20, 40, 60, 80, 100, 120, 140, 160, 180]}>
          {(y) => (
            <For each={[20, 40, 60, 80, 100, 120, 140, 160, 180]}>
              {(x) => <circle cx={x} cy={y} r="1" fill="rgba(0,0,0,0.1)" />}
            </For>
          )}
        </For>
        <polyline
          fill="none"
          stroke="black"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          points={points()
            .map(([x, y]) => `${x * 100},${200 - y * 100}`)
            .join(" ")}
        />
      </svg>
    </div>
  );
}

const STEP_SIZE = 5;

function getSpringChart(stiffness: number, damping: number, mass: number, duration = 2) {
  let value = 0;
  let velocity = 0;
  let equilibrium = 1;
  let points: Array<[seconds: number, y: number]> = [];

  function step(millis: number) {
    const k = stiffness;
    const c = damping;
    const x0 = equilibrium;

    const stepSizeMillis = 1;
    const steps = millis / stepSizeMillis;
    let dt = stepSizeMillis / 1000;

    let x = value;
    let v = velocity;

    for (let i = 0; i < steps; i++) {
      const F = -k * (x - x0) - c * v;
      const a = F / mass;

      const dx = v * dt;
      const dv = a * dt;

      x = x + dx;
      v = v + dv;
    }

    value = x;
    velocity = v;
  }

  const steps = (duration * 1000) / STEP_SIZE;

  for (let i = 0; i <= steps; i++) {
    step(STEP_SIZE);
    points.push([(STEP_SIZE * i) / 1000, value]);
  }

  return points;
}

function getSpringConstant(duration: number) {
  return (4 * Math.PI * Math.PI) / (duration * duration);
}

function getDampingConstant(damping: number, springConstant: number) {
  if (springConstant === 0) return 0;
  return damping * 2 * Math.sqrt(springConstant);
}
