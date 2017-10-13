export interface StateModel {
  items: string[],
  newItemTitle: string
};

const strongModel: StateModel = {
  items: [],
  newItemTitle: ''
};

const model = strongModel;

export default model;
