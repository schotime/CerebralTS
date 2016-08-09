
export interface IContext<TInput, TOutput, TOutputData> {
	input: TInput,
	state: any,
	output: TOutput,
	services: any
}

export class ChainBuilder<TInput> {
	private signals: any[] = [];
	do(...func: ((input: IContext<TInput, NoDecision<TInput>, TInput>) => void)[]): ChainBuilder<TInput>;
	do<TOutput, TOutputData>(...func: ((input: IContext<TInput, TOutput, TOutputData>) => void)[]): ChainBuilder<TInput> {
		for (let item of func) {
			 this.signals.push(item);
		}
		return this;
	}
	when<TOutput, TOutputData>(func: (input: IContext<TInput, TOutput, TOutputData>) => void) : SignalBuilderResult<TInput, TOutput, TOutputData> {
		this.signals.push(func);
		return new SignalBuilderResult(this, this.signals);
	}
	B() : any[] {
		var s = this.signals;
		this.signals = [];
		return s;
	}
	BB() : ((x: any) => any) {
		var s = this.signals as any as (x: any) => any;
		this.signals = [];
		return s;
	}
}

class SignalBuilderResult<TInput, TResult, TOutput> {
	private signalBuilder: ChainBuilder<TInput>;
	private signals: any[];
	constructor(signalBuilder: ChainBuilder<TInput>, signals: any[]) {
		this.signalBuilder = signalBuilder;
		this.signals = signals;
	}
	do(input: (sb: ChainBuilder<TInput>) => TResult) : ChainBuilder<TInput & TOutput> {
		this.signals.push(input(new ChainBuilder<TInput>()));
		var newCB = new ChainBuilder<TInput & TOutput>();
		newCB.when(this.signals as any);
		return newCB;
	}
}

export interface NoDecision<T> {
	(input: T): void;
}

export interface TrueFalseOutput<T> {
  true(input: T): void,
  false(input: T): void
}

export interface ISuccessError<T> {
	success(input: T) : void,
  error(input: T) : void
}

interface IInput {
  name: string
}

interface IState {
	success: any[]
}

type Context = IContext<IInput, ISuccessError<IInput>, IInput>;

function action1(context: Context): void {
  context.output.success({ name: "success" });
	context.output.error({ name: "error" });
}

function action2({output}: Context): void {

}

function action3(context: IContext<IInput, TrueFalseOutput<IInput>, IInput>): void {
	context.output.true({name: "asdfs"});
}

//var signals2 = new ChainBuilder()
	// .dor(action1).then(x => ({
	// 	success: x
	// 	  .dor(action1)
	// 		.then(y => ({
	// 			success: y.do(action2).BB(),
	// 		 	error: y.do(action2).BB()
	// 		}))
	// 		.do(action2).BB(),
	// 	error: x.do(action3).BB()
	// }))
	// .do(action2)
	// .dor(action3)
	// .then(x => ({
	// 	yes: x.do().BB(),
	// 	no: x.do().BB(),
	// 	maybe: x.do().BB()
	// })).B();

export type Signal<T, T2> = ((context: IContext<T, T2, any>) => void)[]

function steal(result: any, data: any): any {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            result[key] = data[key];
        }
    }
    return result;
}

class SameAs<a> {
    constructor(public result: a) { }
    public with(input: (additions: a) => void): SameAs<a> {
       input(this.result)
       return new SameAs<a>(this.result);
    }
}
export function startWith<a>(value: a): SameAs<a> {
    return new SameAs(steal({}, value));
}

//alert(signals[0] == action1)
