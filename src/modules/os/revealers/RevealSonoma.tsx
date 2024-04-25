import osWallpaper from "~/modules/os/wallpapers/windows7/harmony.jpg";

export function RevealSonoma() {
  return (
    <div
      css={{
        position: "fixed",
        bottom: 0,
        right: 0,
        padding: 20,
        d: "flex",
        gap: 8,
      }}
      onMouseEnter={preload}
    >
      <button
        onClick={genieMinimise}
        css={{
          w: 12,
          h: 12,
          r: 6,
          bg: "#28C840",
          border: "0.5px solid rgba(0, 0, 0, 0.2)",
        }}
      />
      <button
        onClick={genieMinimise}
        css={{
          w: 12,
          h: 12,
          r: 6,
          bg: "#FEBC2E",
          border: "0.5px solid rgba(0, 0, 0, 0.2)",
        }}
      />
      <button
        onClick={genieMinimise}
        css={{
          w: 12,
          h: 12,
          r: 6,
          bg: "#FF5F57",
          border: "0.5px solid rgba(0, 0, 0, 0.2)",
        }}
      />
    </div>
  );
}

function preload() {
  import("~/modules/os/sonoma");
  import("~/modules/genie");
  preloadImage(osWallpaper);
}

function preloadImage(url: string) {
  var img = new Image();
  img.src = url;
}

function genieMinimise() {
  import("~/modules/genie").then((m) => m.genieMinimise());
}
