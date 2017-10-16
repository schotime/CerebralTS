import { signal, props, string, state, Tag } from 'cerebral/tags';
import { pathFrom } from './paths';

export function getStateTag<TState, TValue>(getter: (state: TState) => TValue, args: any[]) : Tag<TValue> {
    var pathGetter = pathFrom<TState>()(getter, ...args);
    return state(pathGetter.strings, ...pathGetter.values);
}

export function getSignalTag<TSignals, TSignal>(getter: (signals: TSignals) => TSignal) : Tag<TSignal> {
    var pathGetter = pathFrom<TSignals>()(getter);
    return signal(pathGetter.strings, ...pathGetter.values);
}

export function getPropsTag<TProps, TValue>(getter: (props: TProps) => TValue) : Tag<TValue> {
    var pathGetter = pathFrom<TProps>()(getter);
    return props(pathGetter.strings, ...pathGetter.values);
}

export function getPathString<TState>(getter: (state: TState) => any) : string {
    var pathGetter = pathFrom<TState>()(getter);
    return (string(pathGetter.strings, ...pathGetter.values) as any).pathToString();
}