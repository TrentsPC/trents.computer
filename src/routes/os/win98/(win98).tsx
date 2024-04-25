import { clientOnly } from "@solidjs/start";

const ClientOnlyComp = clientOnly(async () => {
  const { TrentOS } = await import("~/modules/os/win98");
  return { default: TrentOS };
});

export default ClientOnlyComp;
