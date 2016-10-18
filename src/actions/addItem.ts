// This action grabs the current "newItemTitle"
// from the state store and putting it at the top of
// the "items" array
import {IContext} from 'cerebral-ts/chains';
import {MyModel} from '../model';
import pathFromModel from '../pathHelper';
import { Output } from '../chains/addNewItem';

function addItem({input, state} : IContext<Output, any, any>) {
  state.unshift(pathFromModel(x => x.items), state.get(pathFromModel(x => x.newItemTitle)))
}

export default addItem
