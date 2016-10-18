declare module 'cerebral-view-react' {
    import { SFC, ComponentClass, ClassicComponentClass } from 'react';
    import { IController } from 'cerebral';

    type Components<P> = ComponentClass<P> | ClassicComponentClass<P> | SFC<P>;

    export interface ContainerProps {
        controller: IController;
        [id: string]: any;
    }

    export const Container: Components<ContainerProps>;
    export function connect<ExtProps>(stateMap: ExtProps, component: Components<ExtProps>): ClassicComponentClass<any>;
    export function connect<TPropsIn, ExtProps>(stateMap: (props: TPropsIn) => ExtProps, component: Components<ExtProps>): ClassicComponentClass<TPropsIn>;
}
