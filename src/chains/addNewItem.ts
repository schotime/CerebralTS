// You can import any action and make
// it part of the signal execution
import addItem from '../actions/addItem'
import modifyItem from '../actions/modifyItem'
import {set} from 'cerebral/operators'
import { ChainBuilder } from '../chainBuilder';
import pathFromModel from '../pathHelper';

// export default [
//   // You just reference the action and the
//   // signal will handle its execution
//   addItem,

//   // We use an action factory from cerebral-addons
//   // to empty the value of our input
//   set('state:newItemTitle', '')
// ]

export interface ChainInput {
  name: string
}

export interface Output {
  result: boolean;
}

var chain = new ChainBuilder<ChainInput>()
  .when(modifyItem)
  .thenif(x => ({
    true: x.do(z => {console.log('true'); }).BB(),
    false: x.do(z => {console.log('false'); }).BB()
  }))
  .do(
    addItem,
    set(`state:${pathFromModel(x=>x.newItemTitle)}`, '')
  )
  .B();



export default chain;
