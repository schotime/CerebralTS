const pathLambdaRegex = /function\s*\((\w)\)\s*{\s*return\s*\1\.([\w\.\[\]]+);\s*}/g;

function cerebralPathFromFunction<T, T2>(func: (model: T) => T2, args: any[]): T2 {
    pathLambdaRegex.lastIndex = 0;
    const str = func.toString().replace(/"use strict";/, '');
    let m;

    if ((m = pathLambdaRegex.exec(str)) !== null) {
        let output = m[2];

        if (args.length > 0) {
            for (let i = 0; i < args.length; i++) {
                output = output.replace(`[${i}]`, `.${args[i]}`);
            }
        } else {
            output = output.replace(/\[/g, ".").replace(/\]/g, "");
        }

        return output;
    }

    return null;
}

interface ICombinePath<T> {
    with<TProp>(func: (model: T) => TProp, ...args): TProp;
}

export function pathFrom<T>() {
    return function <TProp>(func: (model: T) => TProp, ...args) {
        return cerebralPathFromFunction<T, TProp>(func, args);
    }
}

export function combinePaths<T>() {
    return function <TProp>(input: ((model: T) => TProp) | TProp, ...args) {
        let currentPath = "";

        if (typeof(input) == typeof(Function)) {
            currentPath = cerebralPathFromFunction<T, TProp>(input as any, args) as any;
        } else {
            currentPath = input as any;
        }

        const withProvider: ICombinePath<TProp> = {
            with: function<TInnerProp>(innerInput, ...innerArgs): TInnerProp {
                return `${currentPath}.${cerebralPathFromFunction<TProp, TInnerProp>(innerInput as any, innerArgs)}` as any;
            }
        }

        return withProvider;
    }
}