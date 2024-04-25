import { clientOnly } from "@solidjs/start";

const ClientOnlyComp = clientOnly(async () => {
  const { TrentOS } = await import("~/modules/os/sonoma");
  return { default: TrentOS };
});

export default ClientOnlyComp;
