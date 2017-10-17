// "copy" is an action factory that creates
// an action based on your arguments
//import {copy} from 'cerebral/operators'
import { set } from 'cerebral/operators';
import { chain } from '../helpers'

interface Input {
  title: string
}

var c = chain<Input>(x => x.
  seq(
    set(x.tags.state(y => y.newItemTitle), x.tags.props(x => x.title)),
  )
);
export default c;
