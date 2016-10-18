import { IStateModel } from "cerebral";

export interface IContext<TInput, TOutput, TOutputData> {
	input: TInput,
	state: IStateModel,
	output: TOutput,
	services: any
}

type ChainResult<T> = (((x: T) => void) & (() => void));

class ChainBuilder<TInput> {
	signals: any[];
	constructor(signals: any[]) {
		this.signals = signals;
	}
	run<TOutput, TOutputData>(...action: ((input: IContext<TInput, TOutput, TOutputData>) => void)[]) : ChainBuilder<TInput & TOutputData> {
		this.signals.push(...action);
		return this;
	}
	parallel(...chain: ChainResult<TInput>[]) : ChainBuilder<TInput> {
		this.signals.push(chain.map(x => (x as any).signals).reduce((x, y) => x.concat(y), []));
		return this;
	}
	waitFor<TInput, TOutput, TOutputData>(action: ((input: IContext<TInput, TOutput, TOutputData>) => void), continueWith: TOutput) : ChainBuilder<TInput & TOutputData> {
		this.signals.push(action);
		this.signals.push(continueWith);
		return new ChainBuilder<TInput & TOutputData>(this.signals);
	}
}

export function chain<TInput>(arg: (input: ChainBuilder<TInput>) => ChainBuilder<TInput>): ChainResult<TInput> {
	var builder = new ChainBuilder<TInput>([]);
	arg(builder);
	return (builder as any).signals;
}

export function immediate<T>(chain: T) {
	return {
		chain: chain,
		immediate: true
	} as any as T;
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

export type InputOnlyActionContext<TInput> = IContext<TInput, {}, {}> 
export type SuccessErrorActionContext<TInput, TOutput> = IContext<TInput, SuccessErrorOutput<TOutput>, TOutput>;
export type TrueFalseActionContext<TInput, TOutput> = IContext<TInput, TrueFalseOutput<TOutput>, TOutput>;
export type DirectOutputActionContext<TInput, TOutput> = IContext<TInput, DirectOutput<TOutput>, TOutput>;
