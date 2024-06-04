import { onMount } from "solid-js";
import bootstrap from "~/modules/two-hard-things/bootstrap.png";
import catalyst from "~/modules/two-hard-things/catalyst.png";
import facebook from "~/modules/two-hard-things/facebook.webp";
import fluent from "~/modules/two-hard-things/fluent.jpg";
import github from "~/modules/two-hard-things/github.webp";
import material3 from "~/modules/two-hard-things/material-3.png";
import { colors } from "~/theme.styles";
import { createSquircle } from "~/utils/squircle";

type NamingAuthorityData = {
  name: string;
  src: string;
};

const NAMING_AUTHORITIES = {
  bootstrap: {
    name: "Bootstrap",
    src: bootstrap,
  },
  material: {
    name: "Material",
    src: material3,
  },
  facebook: {
    name: "Facebook",
    src: facebook,
  },
  github: {
    name: "GitHub",
    src: github,
  },
  fluent: {
    name: "Fluent",
    src: fluent,
  },
  catalyst: {
    name: "Catalyst",
    src: catalyst,
  },
} satisfies Record<string, NamingAuthorityData>;

type NamingAuthority = keyof typeof NAMING_AUTHORITIES;

type Names = Record<string, Array<NamingAuthority>>;

export default function Page() {
  return (
    <div
      css={{ spaceY: 64, py: 64, width: "100%", mx: "auto", maxW: 500, px: 16 }}
    >
      <h1>Two hard things</h1>

      <NameBox
        names={{
          "Horizontal Rule": ["bootstrap"],
          Divider: ["material"],
        }}
      />
      <NameBox
        names={{
          "Form Control": ["bootstrap"],
          Field: ["catalyst"],
        }}
      />
      <NameBox
        names={{
          "Form Label": ["bootstrap"],
          Label: ["catalyst"],
        }}
      />
      <NameBox
        names={{
          "Form Text": ["bootstrap"],
          Description: ["catalyst"],
        }}
      />
      <NameBox
        names={{
          Select: ["bootstrap"],
        }}
      />
      <NameBox
        names={{
          Check: ["bootstrap"],
          Checkbox: ["material"],
        }}
      />
      <NameBox
        names={{
          Radio: ["bootstrap"],
          "Radio Button": ["material"],
        }}
      />
      <NameBox
        names={{
          Range: ["bootstrap"],
          Slider: ["material"],
        }}
      />
      <NameBox
        names={{
          Accordion: ["bootstrap"],
        }}
      />
      <NameBox
        names={{
          Alert: ["bootstrap"],
          Flash: ["github"],
        }}
      />
      <NameBox
        names={{
          Badge: ["bootstrap", "material"],
        }}
      />
      <NameBox
        names={{
          Breadcrumbs: ["bootstrap"],
        }}
      />
      <NameBox
        names={{
          Button: ["bootstrap", "material"],
        }}
      />
      <NameBox
        names={{
          "Button Group": ["bootstrap"],
          "Segmented Button": ["material"],
        }}
      />
      <NameBox
        names={{
          Card: ["bootstrap", "material"],
        }}
      />
      <NameBox
        names={{
          Carousel: ["bootstrap", "material"],
        }}
      />
      <NameBox
        names={{
          Collapse: ["bootstrap"],
        }}
      />
      <NameBox
        names={{
          Dropdown: ["bootstrap"],
          Menu: ["material"],
        }}
      />
      <NameBox
        names={{
          Dialog: ["material"],
          Modal: ["bootstrap"],
        }}
      />
      <NameBox
        names={{
          Navbar: ["bootstrap"],
          "Navigation Bar": ["material"],
        }}
      />
      <NameBox
        names={{
          Nav: ["bootstrap"],
        }}
      />
      <NameBox
        names={{
          Tabs: ["bootstrap", "material"],
        }}
      />
      <NameBox
        names={{
          Pagination: ["bootstrap"],
        }}
      />
      <NameBox
        names={{
          Placeholder: ["bootstrap"],
          Shimmer: [],
          Glimmer: ["facebook"],
        }}
      />
      <NameBox
        names={{
          Popover: ["bootstrap"],
        }}
      />
      <NameBox
        names={{
          Progress: ["bootstrap"],
          "Progress Indicator": ["material"],
        }}
      />
      <NameBox
        names={{
          "Progress Indicator": ["material"],
          Spinner: ["fluent", "bootstrap"],
        }}
      />
      <NameBox
        names={{
          Toast: ["bootstrap"],
          Snackbar: ["material"],
        }}
      />
      <NameBox
        names={{
          Tooltip: ["bootstrap", "material"],
        }}
      />
      <NameBox
        names={{
          Token: ["github"],
          Chip: ["material"],
        }}
      />
      <NameBox
        names={{
          Switch: ["material"],
          "Toggle Switch": ["github"],
        }}
      />
      <NameBox
        names={{
          Blankslate: ["github"],
          "Empty State": [],
        }}
      />
      <NameBox
        names={{
          "Text Input": ["github"],
          "Text Field": ["material"],
        }}
      />
      <NameBox
        names={{
          Textarea: ["github"],
        }}
      />
      <NameBox
        names={{
          "Text Input With Tokens": ["github"],
        }}
      />
    </div>
  );
}

function NameBox(props: { names: Names }) {
  return (
    <div
      css={{
        border: `1px solid ${colors.gray6}`,
        borderRadius: 6,
        padding: 16,
      }}
    >
      {Object.entries(props.names).map(([name, authorities]) => (
        <div css={{ display: "flex" }}>
          <h2>{name}</h2>
          <div css={{ flex: 1 }} />
          <ul css={{ display: "flex", spaceX: -8 }}>
            {authorities.map((authorityId) => {
              const authority = NAMING_AUTHORITIES[authorityId];
              return (
                <li>
                  <AuthorityIcon authority={authority} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function AuthorityIcon(props: { authority: NamingAuthorityData }) {
  let ref: HTMLImageElement;
  let ref2: HTMLDivElement;

  onMount(() => {
    createSquircle(ref);
    createSquircle(ref2);
  });
  return (
    <div
      ref={ref2!}
      css={{
        width: 24 + 4,
        height: 24 + 2,
        backgroundColor: "white",
        display: "flex",
        items: "center",
        justifyContent: "center",
        borderRadius: (9 / 40) * (24 + 2),
      }}
    >
      <img
        ref={ref!}
        src={props.authority.src}
        alt={props.authority.name}
        css={{
          width: 24,
          height: 24,
          borderRadius: (9 / 40) * 24,
          boxShadow: "0 0 0 3px white",
        }}
      />
    </div>
  );
}
