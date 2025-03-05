import { List } from "../components/List";

export function RootSearch() {
  return (
    <List
      content={[
        {
          title: "Option 1",
          actions: [
            {
              title: "Do something",
            },
          ],
        },
        {
          title: "Option 2",
          actions: [
            {
              title: "Do something else",
            },
          ],
        },
        {
          title: "Another Option (3)",
          actions: [
            {
              title: "Do another thing",
            },
          ],
        },
      ]}
    />
  );
}
