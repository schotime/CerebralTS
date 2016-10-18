// You can import any action and make
// it part of the signal execution
import addItem from '../actions/addItem'
import modifyItem from '../actions/modifyItem'
import { set } from 'cerebral/operators'
import pathFromModel from '../pathHelper';
import { chain, InputOnlyActionContext, DirectOutputActionContext } from 'cerebral-ts/chains';

// export default [
//   // You just reference the action and the
//   // signal will handle its execution
//   addItem,

//   // We use an action factory from cerebral-addons
//   // to empty the value of our input
//   set('state:newItemTitle', '')
// ]

export interface Output {
  result: boolean;
}

var c = chain(x => x
  // .waitFor(modifyItem, {
  //   true: chain(y => y
  //     .run(() => console.log('true'))
  //   ),
  //   false: chain(y => y
  //     .run(() => console.log('false'))
  //   )
  // })
  .run(addItem)
  .run(({state,input}) => state.set(pathFromModel(x => x.newItemTitle), ''))  
);

//console.log(c);

export default c;
