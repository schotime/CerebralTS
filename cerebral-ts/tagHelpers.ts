import { signal, props, string, state, Tag } from 'cerebral/tags';
import { pathFrom } from './paths';

export function getStateTag<TState, TValue>(getter: (state: TState) => TValue) : Tag<TValue> {
    var pathGetter = pathFrom<TState>();
    return state`${pathGetter<TValue>(getter)}`;
}

export function getSignalTag<TSignals, TSignal>(getter: (signals: TSignals) => TSignal) : Tag<TSignal> {
    var pathGetter = pathFrom<TSignals>();
    return signal`${pathGetter<TSignal>(getter)}`;
}

export function getPropsTag<TProps, TValue>(getter: (props: TProps) => TValue) : Tag<TValue> {
    var pathGetter = pathFrom<TProps>();
    return props`${pathGetter<TValue>(getter)}`;
}

export function getPathString<TState>(getter: (state: TState) => any) : string {
    var pathGetter = pathFrom<TState>();
    return pathGetter<any>(getter) as string;
}