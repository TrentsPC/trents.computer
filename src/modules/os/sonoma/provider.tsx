import {
  createContext,
  createMemo,
  createSignal,
  JSX,
  onCleanup,
  useContext,
} from "solid-js";

export type MenuBarItem = {
  label: string;
  action?: () => void;
  submenu?: MenuBarItem[];
};

export type MenuBarMenu = {
  title: string;
  items: MenuBarItem[];
};

export type Destructor = () => void;

export type OSContextValue = {
  openedApplicationIds: () => string[];
  openApplication: (applicationId: string) => void;
  closeApplication: (applicationId: string) => void;
  bringToFront: (applicationId: string) => void;

  menuBar: () => MenuBarMenu[];
  registerMenuBar: (
    applicationId: string,
    menuBar: () => MenuBarMenu[]
  ) => Destructor;
};

export const OSContext = createContext<OSContextValue>(
  undefined as unknown as OSContextValue
);

export const useOSContext = () => useContext(OSContext);

export function OSContextProvider(props: { children: JSX.Element }) {
  const [openApplicationIds, setOpenApplicationIds] = createSignal<string[]>(
    []
  );
  const [menuBarMap, setMenuBarMap] = createSignal<
    Map<string, () => MenuBarMenu[]>
  >(new Map());

  const menuBar = createMemo(() => {
    const ids = openApplicationIds();
    const reversedIds = [...ids].reverse();

    const map = menuBarMap();
    for (const id of reversedIds) {
      const menus = map.get(id);
      if (menus) {
        return menus();
      }
    }

    return [];
  });

  return (
    <OSContext.Provider
      value={{
        openedApplicationIds: openApplicationIds,
        openApplication: (applicationId) => {
          setOpenApplicationIds((ids) =>
            ids.filter((id) => id !== applicationId).concat(applicationId)
          );
        },
        closeApplication: (applicationId) => {
          setOpenApplicationIds((ids) =>
            ids.filter((id) => id !== applicationId)
          );
        },
        bringToFront: (applicationId) => {
          setOpenApplicationIds((ids) =>
            ids.filter((id) => id !== applicationId).concat(applicationId)
          );
        },

        menuBar,
        registerMenuBar: (applicationId, menuBar) => {
          setMenuBarMap((map) => {
            const newMap = new Map(map);
            newMap.set(applicationId, menuBar);
            return newMap;
          });
          return () => {
            setMenuBarMap((map) => {
              const newMap = new Map(map);
              newMap.delete(applicationId);
              return newMap;
            });
          };
        },
      }}
    >
      {props.children}
    </OSContext.Provider>
  );
}

export function useMenuBar(
  applicationId: string,
  menuBar: () => MenuBarMenu[]
) {
  const { registerMenuBar } = useContext(OSContext);
  const cleanup = registerMenuBar(applicationId, menuBar);
  onCleanup(cleanup);
}
