// This action grabs the current "newItemTitle"
// from the state store and putting it at the top of
// the "items" array
import {IContext} from 'cerebral-ts/chains';
import {MyModel} from '../model';
import pathFromModel from '../pathHelper';

export interface Input {

}

export interface Output {
  newTitle: string
}

function addItem({input, state}: IContext<Input>) : Output {
  state.unshift(pathFromModel(x => x.items), state.get(pathFromModel(x => x.newItemTitle)));
  return {
    newTitle: state.get(pathFromModel(x => x.newItemTitle))
  }
}

export default addItem
