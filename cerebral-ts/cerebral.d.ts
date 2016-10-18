declare module "cerebral" {
    interface ICommonModule {
        addModules(modules: any): void;
        addSignals<T>(signals: T): void;
        addServices(services: any): void;
        addContextProvider(contextProvider: any): void;
    }

    export interface IModule<TState> extends ICommonModule {
        addState(state: TState): void;
    }

    export interface IController extends ICommonModule {
        (model?: any): IController;

        get(path?: string): any;
        getSignals(path?: string): any;
        getModules(path?: string): any;
        getServices(path?: string): any;

        on(eventName: string, callback: Function): void;
    }

    export const Controller: IController;

    export interface IStateModel {
        get(): any;
        get<T>(path: T): T;
        computed(input: any): any;
        findWhere<T>(path: T, whereCondition: Object): any;
        set<T>(path: T, value: T): void;
        unset<T>(path: T): void;
        unset<T>(path: T, value: T[]): void;
        merge<T>(path: T, value: any): void;
        push<T>(path: T, value: any): void;
        unshift<T>(path: T, value: any): void;
        pop<T>(path: T): void;
        shift<T>(path: T): void;
        concat<T>(path: T, value: any[]): void;
        splice<T>(path: T, startIndex: number, amount: number): void;
    }
}

declare module "cerebral/operators" {
    export function unset(path: string): any;
    export function set<T>(path: T, value: T): any;
    export function copy<T>(sourcePath: T, destPath: T): any;
    export function toggle(path: string): any;
    export function when(conditionPath: string, then: any): any;
    export function delay(timeoutMilliseconds: number, chain: any[]): any[];

    export function throttle(throttleTimeMilliseconds: number): any;
    export function throttle(throttleTimeMilliseconds: number, chain: any[]): any[];

    export function debounce(debounceTimeMilliseconds: number): any;
    export function debounce(debounceTimeMilliseconds: number, chain: any[]): any[];

    export function filter(path: string, filter: (value: any) => boolean): any;
    export function filter(path: string, filter: (value: any) => boolean, chain: any[]): any[];
}

declare module "cerebral-model-immutable" {
    export default function (initialState: any, options?: any): any;
}