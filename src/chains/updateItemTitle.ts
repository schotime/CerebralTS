// "copy" is an action factory that creates
// an action based on your arguments
import {copy} from 'cerebral/operators'
import { Output } from '../chains/addNewItem';
import { chain } from 'cerebral-ts/chains';

export default chain(x => x
  .run(
    copy('input:title', 'state:newItemTitle') 
  )
);

