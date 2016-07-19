import Model from 'cerebral-model-immutable';

export interface MyModel {
  items: string[],
  newItemTitle: string
};

const strongModel: MyModel = {
  items: [],
  newItemTitle: ''
};

const model = Model(strongModel);

export default model;
