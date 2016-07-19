declare module "cerebral-view-react" {
    export var Container: any;

    import * as React from "react";
    export function connect<TModel>(path: TModel, view: new () => React.Component<TModel, {}>): any;
    export function connect<TModel>(path: TModel, view: new (props: TModel) => React.Component<TModel, {}>): any;
    export function connect<TModel>(path: TModel, view: new (props: TModel, context: any) => React.Component<TModel, {}>): any;
    export function connect<TModel>(path: TModel, view: (props: TModel) => any): any;
    export function connect<TPropsIn, TModel>(path: (props: TPropsIn) => TModel, view: (props: TModel) => any): any;
}
