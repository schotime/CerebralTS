// This action grabs the current "newItemTitle"
// from the state store and putting it at the top of
// the "items" array
import { IContext, TrueFalseActionContext, TrueFalseResult, PathResult } from 'cerebral-ts/chains';
import { IPath as FTreeIPath } from "function-tree";

export interface Output {
  result: boolean
}

interface TruePath<T> {
  true: (value: T) => any,
}

interface FalsePath<T> {
  false: (value: T) => any,
}

type TrueFalsePath<T> = 
  TruePath<T> |
  FalsePath<T>

interface TrueFalsePath1<T>  {
  true?: (value: T) => any,
  false?: (value: T) => any,
}

function truePath<T>(path: any, model: T) : TrueFalsePath<T> {
  return path.true(model);
}

function falsePath<T>(path: any, model: T) : TrueFalsePath<T> {
  return path.false(model);
}

function modifyItem({input, path}:TrueFalseActionContext<{}>) : PathResult<TrueFalseResult<Output>, Output> {
  var pathBuilder = new TrueFalsePathBuilder(path);

  var x = input;
  if (input != "adam") {
    return pathBuilder.true({ result: true });
  }
  else {
    //output.false(startWith(input).with(x => x.result = true).result);
    return pathBuilder.false({ result: false });
  }
}

class TrueFalsePathBuilder<T> {
  private path: any;

  constructor(path: any) {
    this.path = path;
  }

  true(model: T): PathResult<TrueFalseResult<T>, T> {
    return this.path.true(model);
  }

  false(model: T): PathResult<TrueFalseResult<T>, T> {
    return this.path.false(model);
  }  
}

export default modifyItem;
