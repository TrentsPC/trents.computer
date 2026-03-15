import { createFileRoute } from "@tanstack/solid-router";
import { createSignal } from "solid-js";
import { faker } from "~/modules/faker";

export const Route = createFileRoute("/faker")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Tester label="First Name" generate={faker.person.firstName} />
    </div>
  );
}

function Tester(props: { generate: () => string; label: string }) {
  function getValues() {
    return Array.from({ length: 100 }).map(props.generate);
  }
  const [values, setValues] = createSignal(getValues());
  return (
    <div>
      <h2>{props.label}</h2>
      <ul css={{ columns: 10 }}>
        {values().map((value) => (
          <li>{value}</li>
        ))}
      </ul>
      <button onClick={() => setValues(getValues())}>Generate</button>
    </div>
  );
}
