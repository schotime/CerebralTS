import { ActionContextHelperProviderFactory, ActionContextHelper } from 'cerebral-ts/controller'
import { chainFactory, ChainBuilder, IContext } from 'cerebral-ts/chains'
import { HttpModule } from 'cerebral-ts/http';
import { Sequence } from 'function-tree';

import { StateModel } from './model';
import { CoreSignals } from './signals';

export class MyActionContextHelper extends ActionContextHelper<StateModel, CoreSignals> {
    constructor(context: any) {
        super(context);
    }
};

export interface ProviderContext { 
    http: HttpModule
};

export type MyContext<TInput, TPathModel = {}> = IContext<TInput, MyActionContextHelper, TPathModel> & ProviderContext;

export function chainEmpty(arg: (input: ChainBuilder<MyActionContextHelper, ProviderContext, {}, StateModel>) => ChainBuilder<MyActionContextHelper, ProviderContext, {}, StateModel>): () => void {
    return chainFactory<MyActionContextHelper, ProviderContext, {}, StateModel>(arg) as any;
};

export function chain<TInput extends {}>(arg: (input: ChainBuilder<MyActionContextHelper, ProviderContext, TInput, StateModel>) => ChainBuilder<MyActionContextHelper, ProviderContext, TInput, StateModel>): (input: TInput) => void {
    return chainFactory<MyActionContextHelper, ProviderContext, TInput, StateModel>(arg) as any;
};

const helper = new MyActionContextHelper({});
const signal = helper.signalTag;
const state = helper.stateTag;
export { signal, state };