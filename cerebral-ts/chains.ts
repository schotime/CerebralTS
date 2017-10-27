import { IStateModel } from "cerebral-ts/state";
import { parallel } from "cerebral";
import { Sequence, sequence } from "function-tree";
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
	private sequenceArray: any[];
	tags: ChainTags<TInput, TState>;

	constructor(sequenceArray: any[]) {
		this.sequenceArray = sequenceArray;
		this.tags = new ChainTags<TInput, TState>();
	}
	action<TOutput>(...action: ((input: TContext & IContext<TInput, TActionContext>) => TOutput | Promise<TOutput>)[]) : ChainBuilder<TActionContext, TContext, TInput & TOutput, TState> 
	action<TOutput>(name: string, ...action: ((input: TContext & IContext<TInput, TActionContext>) => TOutput | Promise<TOutput>)[]) : ChainBuilder<TActionContext, TContext, TInput & TOutput, TState> 
	action<TOutput>(...action: any[]) : ChainBuilder<TActionContext, TContext, TInput & TOutput, TState> {
		var typeFirst = typeof action[0] === "string";
		var actions = <any[]> (typeFirst ? action.splice(1) : action);
		actions.forEach(element => {
			typeFirst && Object.defineProperty(element, "name", { value:  action[0] });
		});
		this.sequenceArray.push(...actions);
		return new ChainBuilder<TActionContext, TContext, TInput & TOutput, TState>(this.sequenceArray);
	}
	actionWithPaths<TOutput, TPathModel>(action: ((input: TContext & IContext<TInput, TActionContext, TPathModel>) => TOutput)) {
		this.sequenceArray.push(action);

		return {
			paths: (paths: { [key in keyof TPathModel]: (input: ChainBuilder<TActionContext, TContext, TInput & TPathModel[key], TState>) => ChainBuilder<TActionContext, TContext, TInput & TPathModel[key], TState> }): ChainBuilder<TActionContext, TContext, TInput & TOutput, TState> => {
				let outputSequence: { [key in keyof TPathModel]?: any[] } = {};
				for(let key in paths) {
					let cb = new ChainBuilder<TActionContext, TContext, TInput, TState>([]);
					let chain = paths[key];
					chain(cb as any);
					outputSequence[key] = cb.sequenceArray;
				}
		
				this.sequenceArray.push(outputSequence);
		
				return new ChainBuilder<TActionContext, TContext, TInput & TOutput, TState>(this.sequenceArray);
			}
		};
	}
	parallel<TOutput>(name: string, chain: ((input: ChainBuilder<TActionContext, TContext, TInput, TState>) => ChainBuilder<TActionContext, TContext, TOutput, TState>)) : ChainBuilder<TActionContext, TContext, TInput & TOutput, TState>
	parallel<TOutput>(chain: ((input: ChainBuilder<TActionContext, TContext, TInput, TState>) => ChainBuilder<TActionContext, TContext, TOutput, TState>)) : ChainBuilder<TActionContext, TContext, TInput & TOutput, TState>
	parallel<TOutput>(...args: any[]) : ChainBuilder<TActionContext, TContext, TInput & TOutput, TState> {
		var cb = new ChainBuilder<TActionContext, TContext, TInput, TState>([]);
		var callback = typeof(args[0]) == "string" ? args[1] : args[0];
		var name = typeof(args[0]) == "string" ? args[0] : "";
		var result = callback(cb);
		this.sequenceArray.push(parallel(name, result.sequenceArray));
		return new ChainBuilder<TActionContext, TContext, TInput & TOutput, TState>(this.sequenceArray);
	}
	sequence<TOutput = void>(seq: (input: TInput) => TOutput | (() => TOutput)) {
		this.sequenceArray.push(...(seq as any));
		return new ChainBuilder<TActionContext, TContext, TInput & TOutput, TState>(this.sequenceArray);
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
	return (builder as any).sequenceArray;
}

