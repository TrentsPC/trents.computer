import { Action, Modifier, Shortcut } from "./types";

export function addDefaultShortcuts(actions: Action[]): Action[] {
  const next = actions.slice();

  const first = next[0];
  if (first) {
    next[0] = {
      ...first,
      shortcut: {
        key: "Enter",
        modifiers: [],
      },
    };
  }

  const second = next[1];
  if (second && !second.shortcut) {
    next[1] = {
      ...second,
      shortcut: {
        key: "Enter",
        modifiers: ["mod"],
      },
    };
  }

  return next;
}

export function findIntendedAction(
  e: KeyboardEvent,
  actions: Action[]
): Action | undefined {
  return actions.find(
    (action) => action.shortcut && isShortcutPressed(e, action.shortcut)
  );
}

const IS_MAC =
  typeof window != "undefined" &&
  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

export function isShortcutPressed(event: KeyboardEvent, shortcut: Shortcut) {
  if (event.key !== shortcut.key) return false;
  const modifiers: Modifier[] = ["mod", "shift", "option"];
  for (const modifier of modifiers) {
    if (
      shortcut.modifiers.includes(modifier) !==
      isModifierPressed(event, modifier)
    ) {
      return false;
    }
  }
  return true;
}

function isModifierPressed(event: KeyboardEvent, modifier: Modifier) {
  switch (modifier) {
    case "mod":
      return IS_MAC ? event.metaKey : event.ctrlKey;
    case "shift":
      return event.shiftKey;
    case "option":
      return event.altKey;
  }
}
