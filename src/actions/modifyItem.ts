// This action grabs the current "newItemTitle"
// from the state store and putting it at the top of
// the "items" array
import { IContext, TrueFalseActionContext } from 'cerebral-ts/chains';
import { Output } from '../chains/addNewItem';

function modifyItem({input, output}:TrueFalseActionContext<{}, Output>) {
  var x = input;
  if (input != "adam") {
    output.true({ result: true });
  }
  else {
    //output.false(startWith(input).with(x => x.result = true).result);
    output.false({ result: false });
  }
}

export default modifyItem;
