// "copy" is an action factory that creates
// an action based on your arguments
//import {copy} from 'cerebral/operators'
import { chain } from 'cerebral-ts/chains';
import { set } from 'cerebral/operators';
import { state, props } from 'cerebral/tags';

export default [
  set(state`newItemTitle`, props`title`)
]


// chain(x => x
//   .run(
//     copy('input:title', 'state:newItemTitle') 
//   )
// );

