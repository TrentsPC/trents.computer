import { useNavigate } from "@solidjs/router";
import { setFontFile } from "~/modules/font-explorer";

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
          navigate("/font-explorer/tables");
        }}
      />
    </div>
  );
}
