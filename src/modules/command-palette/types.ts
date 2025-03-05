import { Component } from "solid-js";

export type CommandProps = {
  fallbackText?: string;
};

export type Command = {
  id: string;
  title: string;
  component: Component<CommandProps>;
};

export type Action = {
  title: string;
  onAction?: () => void;
  shortcut?: Shortcut;
};

export type Shortcut = {
  key: string;
  modifiers: Modifier[];
};

export type Modifier = "mod" | "shift" | "option";
