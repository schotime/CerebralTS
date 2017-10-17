import { ActionContextHelperProviderFactory, ActionContextHelper } from 'cerebral-ts/controller'
import { chainFactory, ChainBuilder, IContext } from 'cerebral-ts/chains'
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

export function chainWithNoInput(arg: (input: ChainBuilder<MyActionContextHelper, ProviderContext, {}, StateModel>) => ChainBuilder<MyActionContextHelper, ProviderContext, {}, StateModel>): () => void {
    return chainFactory<MyActionContextHelper, ProviderContext, {}, StateModel>(arg) as any;
};

export function chain<TInput>(arg: (input: ChainBuilder<MyActionContextHelper, ProviderContext, TInput, StateModel>) => ChainBuilder<MyActionContextHelper, ProviderContext, TInput, StateModel>): (input: TInput) => void {
    return chainFactory<MyActionContextHelper, ProviderContext, TInput, StateModel>(arg) as any;
};

// create strongly typed tag helpers
const helper = new MyActionContextHelper();
const signal = helper.signalTag;
const state = helper.stateTag;
const tagToPath = helper.tagToPath;

export { signal, state, tagToPath };