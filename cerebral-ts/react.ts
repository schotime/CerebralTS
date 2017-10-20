import * as React from 'react';
import { state as cerebralState } from 'cerebral/tags';
import { connect as cerebralConnect } from '@cerebral/react';

import { getPropsTag, getStateTag, getSignalTag } from './tagHelpers'; 
import { Path } from './controller';

interface PropsMap<T, TSignals, TStateModel> {
    props<TValue>(arg: (input: T) => TValue): TValue;
    signal<TValue>(arg: (input: TSignals) => TValue): TValue;
    state<TValue>(arg: (input: TStateModel) => TValue, ...args: any[]): TValue;
    fromPropsPath<TPathModel>(pathPropGetter: (input: T) => Path<TPathModel>): PropsMapFromPathFluent<TPathModel>;
}

interface PropsMapFromPathFluent<TPathModel> {
    state<TValue>(getter: (input: TPathModel) => TValue, ...args: any[]): TValue;
}

export { Path };


export function connectFactory<EP, TSignals, TStateModel>() {
    return {
        with<P>(propsMap: ((input: PropsMap<EP, TSignals, TStateModel>) => P)) {
            return {
                to(component: (React.ComponentClass<P & EP> | React.SFC<P & EP>)) : React.ComponentClass<EP> {

                    var mapper = propsMap({
                        props: <TValue>(input) => {
                            return getPropsTag<EP, TValue>(input) as any as TValue;
                        },
                        signal: <TValue>(input) => {
                            return getSignalTag<TSignals, TValue>(input) as any as TValue;
                        },
                        state: <TValue>(input, ...args) => {
                            return getStateTag<TStateModel, TValue>(input, args) as any as TValue;
                        },
                        fromPropsPath: <TPathModel>(pathPropGetter): PropsMapFromPathFluent<TPathModel> => {
                            var basePathPropTag = getPropsTag<EP, TPathModel>(pathPropGetter);
            
                            return  {
                                state: <TValue>(getter: (input: TPathModel) => TValue, ...args: any[]): TValue => {
                                    var stateTag = (getStateTag<TPathModel, TValue>(getter, args) as any).pathToString();
                                    return cerebralState`${basePathPropTag}.${stateTag}` as any as TValue;
                                }
                            }
                        }
                    });
                    
                    return cerebralConnect<P, EP>(mapper as any, component);
                }
            }
        }
    }
}