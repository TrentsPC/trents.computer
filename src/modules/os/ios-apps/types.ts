import { Component } from "solid-js";

export type FakeIOSApplication = {
  id: string;
  name: string;
  iconSrc: string;
  component: Component<any>;
};
