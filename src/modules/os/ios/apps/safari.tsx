import safari from "../icons/safari.png";
import { FakeIOSApplication } from "../types";

export const SAFARI: FakeIOSApplication = {
  id: "com.apple.Safari",
  name: "Safari",
  iconSrc: safari,
  component: () => (
    <div
      css={{
        pt: "var(--safe-area-inset-top)",
        pb: "var(--safe-area-inset-bottom)",
        width: "100%",
        height: "100%",
      }}
    >
      <iframe
        css={{
          width: "100%",
          height: "100%",
        }}
        src="/?os=sonoma"
      />
    </div>
  ),
  // component: <div></div>,
};
