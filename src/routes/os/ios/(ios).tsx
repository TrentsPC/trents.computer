import { clientOnly } from "@solidjs/start";

const ClientOnlyComp = clientOnly(async () => {
  const { FakeIOS } = await import("~/modules/os/ios");
  return { default: FakeIOS };
});

export default ClientOnlyComp;
