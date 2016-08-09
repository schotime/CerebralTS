// This action grabs the current "newItemTitle"
// from the state store and putting it at the top of
// the "items" array
import { IContext, TrueFalseOutput, startWith } from '../chainBuilder';
import { ChainInput, Output } from '../chains/addNewItem';

type TrueResultContext<TInput, TOutput> = IContext<ChainInput, TrueFalseOutput<TOutput>, TOutput>;

function modifyItem({input, output}: TrueResultContext<ChainInput, Output>) {
  var x = input;
  if (input.name != "adam") {
    output.true({ result: true });
  }
  else {
    //output.false(startWith(input).with(x => x.result = true).result);
    output.false({ result: false });
  }
}

export default modifyItem;
