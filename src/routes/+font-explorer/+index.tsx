import { createFileRoute, useNavigate } from "@tanstack/solid-router";
import { setFontFile } from "~/modules/font-explorer";

export const Route = createFileRoute("/font-explorer/")({
  component: FontExplorer,
});

export default function FontExplorer() {
  const navigate = useNavigate();
  return (
    <div>
      Upload a font
      <input
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (!files) return;
          const file = files[0];
          if (!file) return;
          setFontFile(file);
          navigate({
            to: "/font-explorer/tables",
          });
        }}
      />
    </div>
  );
}
