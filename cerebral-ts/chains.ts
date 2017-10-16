import { IStateModel } from "cerebralts/c";
import { parallel } from "cerebral";
import { Sequence } from "function-tree";
import { getPropsTag, getStateTag } from './tagHelpers';

export interface IContextBase {
	state: IStateModel
}

export interface IContext<TInput, TActionContext = {}, TPathModel = {}> extends IContextBase {
	props: TInput,
	helper: TActionContext
	path: { [key in keyof TPathModel]: (input: TPathModel[key]) => TPathModel[key] }
}

export class ChainBuilder<TActionContext, TContext = {}, TInput = {}, TState = {}> {
	sequence: any[];
	tags: ChainTags<TInput, TState>;

	constructor(sequence: any[]) {
		this.sequence = sequence;
		this.tags = new ChainTags<TInput, TState>();
	}
	seq<TOutput>(...action: ((input: TContext & IContext<TInput, TActionContext>) => TOutput | Promise<TOutput>)[]) : ChainBuilder<TActionContext, TContext, TInput & TOutput, TState> {
		this.sequence.push(...action);
		return new ChainBuilder<TActionContext, TContext, TInput & TOutput, TState>(this.sequence);
	}
	seqPath<TOutput, TPathModel>(action: ((input: TContext & IContext<TInput, TActionContext, TPathModel>) => TOutput)) {
		this.sequence.push(action);

		return {
			withPaths: (paths: { [key in keyof TPathModel]: (input: ChainBuilder<TActionContext, TContext, TInput & TPathModel[key], TState>) => ChainBuilder<TActionContext, TContext, TInput & TPathModel[key], TState> }): ChainBuilder<TActionContext, TContext, TInput & TOutput, TState> => {
				let outputSequence: { [key in keyof TPathModel]?: any[] } = {};
				for(let key in paths) {
					let cb = new ChainBuilder<TActionContext, TContext, TInput, TState>([]);
					let chain = paths[key];
					chain(cb as any);
					outputSequence[key] = cb.sequence;
				}
		
				this.sequence.push(outputSequence);
		
				return new ChainBuilder<TActionContext, TContext, TInput & TOutput, TState>(this.sequence);
			}
		};
	}
	parallel<TOutput>(chain: ((input: ChainBuilder<TActionContext, TContext, TInput, TState>) => ChainBuilder<TActionContext, TContext, TOutput, TState>)) : ChainBuilder<TActionContext, TContext, TInput & TOutput, TState> {
		var cb = new ChainBuilder<TActionContext, TContext, TInput, TState>([]);
		var result = chain(cb);
		this.sequence.push(parallel(result.sequence));
		return new ChainBuilder<TActionContext, TContext, TInput & TOutput, TState>(this.sequence);
	}
}

class ChainTags<TInput, TState> {
	props<TValue>(getter: (input: TInput) => TValue): TValue {
		return getPropsTag<TInput, TValue>(getter) as any as TValue;
	}

	state<TValue>(getter: (input: TState) => TValue): TValue {
		return getStateTag<TState, TValue>(getter, []) as any as TValue;
	}
}

export function chainFactory<TActionContext, TContext, TInput, TState>(arg: (input: ChainBuilder<TActionContext, TContext, TInput, TState>) => ChainBuilder<TActionContext, TContext, TInput, TState>): Sequence {
	var builder = new ChainBuilder<TActionContext, TContext, TInput, TState>([]);
	arg(builder);
	return (builder as any).sequence;
}

