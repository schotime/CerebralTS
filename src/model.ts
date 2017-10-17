interface SomeNestedThing {
  title: string,
  description: string
}

export interface StateModel {
  items: string[],
  newItemTitle: string,
  things: SomeNestedThing[]
};

export default StateModel;