import {MyModel} from './model';

const re = /function\s*\((\w)\)\s*{\s*return\s*\1\.([\w\.\[\]]+);\s*}/g;

function dataFrom<T, T2>(func: (model: T) => T2, args: any[]): T2 {
    re.lastIndex = 0;
    const str = func.toString();
    let m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }

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

export const pathFromModel = function <T>() {
    return function <TProp>(func: (model: T) => TProp, ...args) {
        return dataFrom<T, TProp>(func, args);
    }
}

export default pathFromModel<MyModel>();
