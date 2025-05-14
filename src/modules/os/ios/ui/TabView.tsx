export function TabView() {
  return (
    <div
      css={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "var(--safe-area-inset-bottom)",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div>Tab 1</div>
      <div>Tab 2</div>
      <div>Tab 3</div>
    </div>
  );
}
