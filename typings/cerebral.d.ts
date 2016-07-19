declare module "cerebral" {
    export var Controller: any;
}

declare module "cerebral/operators" {
    export function set(path: string, value: any): any;
    export function copy(dest: string, source: any): any;
    export function toggle(path: string): any;
    export function when(conditionPath: string, then: any): any;
}

declare module "cerebral-model-immutable" {
    export default function (initialState: any): any;
}
