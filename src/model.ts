export interface MyModel {
  items: string[],
  newItemTitle: string
};

const strongModel: MyModel = {
  items: [],
  newItemTitle: ''
};

const model = strongModel;

export default model;
