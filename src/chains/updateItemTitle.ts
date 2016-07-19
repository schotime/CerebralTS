// "copy" is an action factory that creates
// an action based on your arguments
import {copy} from 'cerebral/operators'

export default [
  // copy the title value from the input
  // to the newItemTitle path in our state tree
  copy('input:title', 'state:newItemTitle')
]
