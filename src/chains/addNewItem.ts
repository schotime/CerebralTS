// You can import any action and make
// it part of the signal execution
import addItem, { Input, Output } from '../actions/addItem'
import modifyItem, { Output as modOutput } from '../actions/modifyItem'
import { set } from 'cerebral/operators'
import pathFromModel from '../pathHelper';
import { chain, InputOnlyActionContext, DirectOutputActionContext, IContext } from 'cerebral-ts/chains';

// export default [
//   // You just reference the action and the
//   // signal will handle its execution
//   addItem,

//   // We use an action factory from cerebral-addons
//   // to empty the value of our input
//   set('state:newItemTitle', '')
// ]

// export interface Output {
//   result: boolean;
// }

// var c = chain(x => x
//   // .waitFor(modifyItem, {
//   //   true: chain(y => y
//   //     .run(() => console.log('true'))
//   //   ),
//   //   false: chain(y => y
//   //     .run(() => console.log('false'))
//   //   )
//   // })
//   .run(addItem)
//   .run(({state,input}) => state.set(pathFromModel(x => x.newItemTitle), ''))  
// );

interface Par1Result {
  par1: string
}

interface Par2Result {
  par2: number
}

interface PathResult {
  mypath: string
}

function par1(context: IContext<Input>) : Par1Result {
  return { par1: "par1" };
}

async function par2(context: IContext<Output>) : Promise<Par2Result> {
  return await { par2: 2 };
}

function update({state, input}: IContext<Output>) : void {
  state.set(pathFromModel(x => x.newItemTitle), '');
}

function pathAction(context: IContext<modOutput>) : PathResult {
  return {
    mypath: "asdf"
  }
}

var d = chain1<Input>([
  addItem,
  //update
])

var c = chain<Input>(x => x
  .seq(addItem)
  .seq(update)
  .seqPath(modifyItem, r => ({
    true: r.seq(({input}) => input.result),
    false: r.seq(pathAction)
  }))
  .parallel(z => z
    .seq(par1)
    .seq(par2)
  )
  .seq(({state, input}) => { input.newTitle })
)

function chain1<T>(arg: ((input: IContext<T>) => any)[]) {
  return arg;
}

//console.log(c);

export default c;
