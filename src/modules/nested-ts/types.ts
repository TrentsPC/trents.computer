export interface Nested {}

type AnyThingIds = string;

export type RegisteredThingIds = Nested extends {
  thingIds: infer TConfig extends AnyThingIds;
}
  ? TConfig
  : AnyThingIds;

export type Thing<ThingId extends string> = {
  id: ThingId;
  getName: () => string;
  getChildren: () => Array<
    RegisteredThingIds[] | RegisteredThingIds | null | undefined
  >;
};

export type InferThingIds<Things extends Thing<string>[]> =
  Things[number]["id"];
