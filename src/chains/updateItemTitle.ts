// "copy" is an action factory that creates
// an action based on your arguments
//import {copy} from 'cerebral/operators'
import { set } from 'cerebral/operators';
import { sequence } from '../helpers'

interface Input {
  title: string
}

var c = sequence<Input>(x => x
  .action(
    set(x.tags.state(y => y.newItemTitle), x.tags.props(x => x.title)),
  )
);
export default c;
