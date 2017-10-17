import * as React from 'react';
import { state as cerebralState } from 'cerebral/tags';
import { connect as cerebralConnect } from '@cerebral/react';

import { getPropsTag, getStateTag } from './tagHelpers'; 
import { Path } from './controller';

interface PropsMap<T> {
    props<TValue>(arg: (input: T) => TValue): TValue;
    fromPropsPath<TPathModel>(pathPropGetter: (input: T) => Path<TPathModel>): PropsMapFromPathFluent<TPathModel>;
}

interface PropsMapFromPathFluent<TPathModel> {
    state<TValue>(getter: (input: TPathModel) => TValue, ...args: any[]): TValue;
}

export { Path };

export function connect<P, EP = {}>(
    propsMap: P | ((input: PropsMap<EP>) => P),
    component: React.ComponentClass<P & EP> | React.SFC<P & EP>
): React.ComponentClass<EP> {

    if (typeof (propsMap) == "function") {
        propsMap = propsMap({
            props: <TValue>(input) => {
                return getPropsTag<EP, TValue>(input) as any as TValue;
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
        })
    }

    return cerebralConnect<P, EP>(propsMap as any, component);
}

export function connect2<EP = {}>() {
    return {
        with<P>(propsMap: P | ((input: PropsMap<EP>) => P)) {
            return {
                to(component: (React.ComponentClass<P & EP> | React.SFC<P & EP>)) : React.ComponentClass<EP> {

                    if (typeof (propsMap) == "function") {
                        propsMap = propsMap({
                            props: <TValue>(input) => {
                                return getPropsTag<EP, TValue>(input) as any as TValue;
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
                    }

                    return cerebralConnect<P, EP>(propsMap as any, component);
                }
            }
        }
    }
}