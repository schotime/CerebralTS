import { IStateModel } from "cerebralts/c";
import { parallel } from "cerebral";
import { Sequence } from "function-tree";

export interface IContext<TInput> {
	input: TInput,
	state: IStateModel,
	services: any,
	path: any
}

//type ChainResult<T> = (((x: T) => void) & (() => void));

class ChainBuilder<TInput> {
	signals: any[];
	constructor(signals: any[]) {
		this.signals = signals;
	}
	seq<TOutput>(action: ((input: IContext<TInput>) => TOutput)) : ChainBuilder<TInput & TOutput> {
		this.signals.push(action);
		return new ChainBuilder<TInput & TOutput>(this.signals);
	}
	seqPath<TOutput, TOutputData>(action: ((input: IContext<TInput>) => PathResult<TOutput, TOutputData>), arg: ((input: ChainBuilder<TOutputData>) => TOutput)) : ChainBuilder<TInput & TOutputData> {
		this.signals.push(action);
		this.signals.push(arg);
		return new ChainBuilder<TInput & TOutputData>(this.signals);
	}
	parallel<TOutput>(chain: ((input: ChainBuilder<TInput>) => ChainBuilder<TOutput>)) : ChainBuilder<TOutput> {

		var cb = new ChainBuilder<TInput>([]);
		var result = chain(cb);
		this.signals.push(parallel(result.signals));
		return result;		
	}
	// waitFor<TInput>(action: ((input: IContext<TInput>) => void), continueWith: TOutput) : ChainBuilder<TInput & TOutputData> {
	// 	this.signals.push(action);
	// 	this.signals.push(continueWith);
	// 	return new ChainBuilder<TInput & TOutputData>(this.signals);
	// }
}

export interface PathResult<T, U> {
	
}

export interface TrueFalseResult<T> {
	true: ChainBuilder<T>,
	false: ChainBuilder<T>
}

export function chain<TInput>(arg: (input: ChainBuilder<TInput>) => ChainBuilder<TInput>): Sequence {
	var builder = new ChainBuilder<TInput>([]);
	arg(builder);
	return (builder as any).signals;
}

interface DirectOutput<T> {
	(input: T): void;
}

interface TrueFalseOutput<T> {
  	true(input: T): void,
  	false(input: T): void
}

interface SuccessErrorOutput<T> {
  	success(input: T) : void,
  	error(input: T) : void
}

export type InputOnlyActionContext<TInput> = IContext<TInput> 
export type SuccessErrorActionContext<TInput> = IContext<TInput>;
export type TrueFalseActionContext<TInput> = IContext<TInput>;
export type DirectOutputActionContext<TInput> = IContext<TInput>;
