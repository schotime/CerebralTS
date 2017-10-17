import { Controller, ControllerClass, Chain } from 'cerebral';
import { Tag, string, state as cerebralState } from 'cerebral/tags';
import { Provider, FunctionTreePrimitive, Payload } from 'function-tree';

import { IStateModel } from 'cerebral-ts/state';

import { IContext } from './chains';
import { pathFrom, cerebralPathFromFunction } from './paths';
import { getStateTag, getSignalTag, getPropsTag } from './tagHelpers';

// ControllerOptions is not exported by cerebral, would be useful to have this for an extends / implements
export interface TSControllerOptions<TStateModel, TSignals> {
    state: TStateModel,
    signals: TSignals,
    [key: string]: any
}

export function TSController<TStateModel, TSignals>(config: TSControllerOptions<TStateModel, TSignals>): ControllerClass {
    return Controller(config as any);
}

export interface IActionContextOptions {}
export function ActionContextHelperProviderFactory<TStateModel, TSignals>(options?: IActionContextOptions): Provider {
    let ActionContextProvider: Provider = (context: any, funcDetails: FunctionTreePrimitive, payload: Payload, next: Payload) => {
        var actionContext = new ActionContextHelper<TStateModel, TSignals>(context);
        context.helper = actionContext;
        return context;
    };

    return ActionContextProvider;
};

export interface Path<T> { ____pathOfT: string };
type StatePropLambda<TStateModel, TValue> = (input: TStateModel) => TValue;

export class ActionContextHelper<TStateModel, TSignals> {
    private context: any;
    private basePath: any;
    private stateHelper: StateHelper<TStateModel>;
    state: <TValue>(getter: StatePropLambda<TStateModel, TValue>, ...args: any[]) => IStateOperationFluent<TValue>;

    constructor(context: any, basePath?: any) {
        this.context = context;
        this.basePath = basePath;
        this.stateHelper = new StateHelper<TStateModel>(context.state, basePath);
        this.state = this.stateHelper.with.bind(this.stateHelper);
    }

    stateFromPath<TValue>(getter: StatePropLambda<TStateModel, TValue> | TValue, ...args: any[]): ActionContextHelper<TValue, TSignals> {
        let basePath = typeof (getter) == typeof (Function)
            ? this.stateHelper.pathFromFunc(getter as StatePropLambda<TStateModel, TValue>, args)
            : getter;

        if(this.basePath != undefined) {
            basePath = `${this.basePath}.${basePath}` as any;
        }

        return new ActionContextHelper<TValue, TSignals>(this.context, basePath);
    }

    stateTag<TValue>(getter: (state: TStateModel) => TValue, ...args: any[]): TValue {
        return getStateTag<TStateModel, TValue>(getter, args) as any as TValue;
    }

    signalTag<TSignal>(getter: (signals: TSignals) => TSignal): TSignal {
        return getSignalTag<TSignals, TSignal>(getter) as any as TSignal;
    }

    tagToPath<T>(tag: T): Path<T> {
        return (tag as any).pathToString();
    }
}

interface IStateOperationFluent<TValue> {
    get(): TValue
    concat(...values: TValue[]): void
    increment(byAmount: TValue): void
    merge(object: any): void
    pop(): void
    push(item: TValue): void
    set(value: TValue): void
    shift(): void
    splice(startIndex: number, count: number): void
    toggle(): void
    unset(): void
    unshift(value: any): void
}

export class StateHelper<TStateModel> {
    state: IStateModel;
    basePath: any;

    constructor(state: IStateModel, basePath?: any) {
        this.state = state;
        this.basePath = basePath;
    }

    with<TValue>(getter: StatePropLambda<TStateModel, TValue>, ...args: any[]): IStateOperationFluent<TValue> {
        var targetPath = this.pathFromFunc(getter, args);
        if (this.basePath != undefined) {
            targetPath = `${this.basePath}.${targetPath as any}` as any as TValue;
        }

        return {
            get: (): TValue => {
                return this.state.get(targetPath);
            },
            concat: (...values: TValue[]): void => {
                this.state.concat(targetPath, values);
            },
            increment: (byAmount: TValue): void => {
                this.state.increment(targetPath, byAmount);
            },
            merge: (object: any): void => {
                this.state.merge(targetPath, object);
            },
            pop: (): void => {
                this.state.pop(targetPath);
            },
            push: (item: TValue): void => {
                this.state.push(targetPath, item);
            },
            set: (value: TValue): void => {
                this.state.set(targetPath, value);
            },
            shift: (): void => {
                this.state.shift(targetPath);
            },
            splice: (startIndex: number, count: number): void => {
                this.state.splice(targetPath, startIndex, count);
            },
            toggle: (): void => {
                this.state.toggle(targetPath);
            },
            unset: (): void => {
                this.state.unset(targetPath);
            },
            unshift: (value: any): void => {
                this.state.unshift(targetPath, value);
            }
        }
    }

    pathFromFunc<TValue>(getter: (input: TStateModel) => TValue, args: any[]) {
        var results = cerebralPathFromFunction<TStateModel, TValue>(getter, args);
        var s = string(results.strings, ...results.values) as any;
        return s.pathToString();
    }   
}