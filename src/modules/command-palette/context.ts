import { Accessor, createContext } from "solid-js";
import { Command } from "./types";

type CmdContextValue = {
  pop: () => void;
  push: (command: Command) => void;
  popToRoot: () => void;
  close: () => void;
  command: Accessor<Command | undefined>;
  canGoBack: Accessor<boolean>;
};

export const CmdContext = createContext<CmdContextValue>({} as CmdContextValue);
