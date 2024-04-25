export type GetChildrenOpts<ThingId> = {
  random: (things: ThingId[]) => ThingId;
  randRange: (min: number, max: number) => number;
  repeat: (thing: ThingId, number: number, max?: number) => ThingId[];
  maybe: (thing: ThingId, chance: number) => ThingId | undefined;
};

export type InfiniArray<T> = Array<T | InfiniArray<T>>;

export type Thing<ThingId, ThisThingId extends ThingId = ThingId> = {
  id: ThisThingId;
  getChildren: (
    opts: GetChildrenOpts<ThingId>
  ) => InfiniArray<ThingId | undefined>;
  getName: (opts: GetChildrenOpts<string>) => string;
  getLeafs?: (opts: GetChildrenOpts<string>) => string[];
};

export type ThingMap<TThingId> = {
  [K in keyof TThingId]: Thing<keyof TThingId, K>;
};

export function thingMap<TThingId>(x: ThingMap<TThingId>) {
  return x;
}
