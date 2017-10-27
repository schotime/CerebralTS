import { ActionContextHelperProviderFactory, ActionContextHelper } from 'cerebral-ts/controller'
import { chainFactory, ChainBuilder, IContext } from 'cerebral-ts/chains'
import { connectFactory } from 'cerebral-ts/react'
import { HttpModule } from 'cerebral-ts/http';
import { Sequence } from 'function-tree';

import { StateModel } from './model';
import { CoreSignals } from './signals';

export interface ProviderContext { 
    http: HttpModule
};

export type MyContext<TInput, TPathModel = {}> = IContext<TInput, MyActionContextHelper, TPathModel> & ProviderContext;
export class MyActionContextHelper extends ActionContextHelper<StateModel, CoreSignals> {
    constructor(context?: any) {
        super(context || {});
    }
};

export function sequenceWithNoInput<TOutput = void>(arg: (input: ChainBuilder<MyActionContextHelper, ProviderContext, {}, StateModel>) => ChainBuilder<MyActionContextHelper, ProviderContext, TOutput, StateModel>): () => TOutput {
    return chainFactory<MyActionContextHelper, ProviderContext, {}, StateModel>(arg) as any;
};

export function sequence<TInput, TOutput = TInput>(arg: (input: ChainBuilder<MyActionContextHelper, ProviderContext, TInput, StateModel>) => ChainBuilder<MyActionContextHelper, ProviderContext, TOutput, StateModel>): (input: TInput) => TOutput {
    return chainFactory<MyActionContextHelper, ProviderContext, TInput, StateModel>(arg as any) as any;
};

export function connect<EP>() {
    return connectFactory<EP, CoreSignals, StateModel>();
}

// create strongly typed tag helpers
const helper = new MyActionContextHelper();
const signal = helper.signalTag;
const state = helper.stateTag;
const tagToPath = helper.tagToPath;

export { signal, state, tagToPath };