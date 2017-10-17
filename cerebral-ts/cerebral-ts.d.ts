declare module "cerebral-ts/state" {
    export interface IStateModel {
        get(): any;
        get<T>(path: T): T;
        computed(input: any): any;
        findWhere<T>(path: T, whereCondition: Object): any;
        set<T>(path: T, value: T): void;
        unset<T>(path: T): void;
        unset<T>(path: T, value: T[]): void;
        merge<T>(path: T, value: any): void;
        push<T>(path: T, value: any): void;
        unshift<T>(path: T, value: any): void;
        pop<T>(path: T): void;
        shift<T>(path: T): void;
        concat<T>(path: T, value: any[]): void;
        splice<T>(path: T, startIndex: number, amount: number): void;
        increment<T>(path: T, amount: T);
        toggle<T = boolean>(path: T);
    }
}

declare module "cerebral/operators" {
    export function unset(path: string): any;
    export function set<T>(path: T, value: T): any;
    export function copy<T>(sourcePath: T, destPath: T): any;
    export function toggle(path: string): any;
    export function when(conditionPath: string, then: any): any;
    export function delay(timeoutMilliseconds: number, chain: any[]): any[];

    export function throttle(throttleTimeMilliseconds: number): any;
    export function throttle(throttleTimeMilliseconds: number, chain: any[]): any[];

    export function debounce(debounceTimeMilliseconds: number): any;
    export function debounce(debounceTimeMilliseconds: number, chain: any[]): any[];

    export function filter(path: string, filter: (value: any) => boolean): any;
    export function filter(path: string, filter: (value: any) => boolean, chain: any[]): any[];
}

declare module "cerebral-ts/http" {
    interface HttpModuleOptions {
        method?: string,
        baseUrl?: string,
        headers?: { [id: string]: string },
        onRequest?: (xhr: XMLHttpRequest, options: HttpResponseOptions) => void;
        onResponse?: (response: XMLHttpRequest, resolve: Function, reject: Function) => void;
    }

    interface HttpRequestOptions {
        query?: { [id: string]: any },
        headers?: { [id: string]: string },
    }

    interface HttpResponseOptions extends HttpRequestOptions, HttpModuleOptions {
        body: string
    }

    interface HttpRequestReponse<T> {
        result: T,
        status: string
    }

    interface HttpModule {
        request: any,
        get<T>(url: string, passedQuery?: { [id: string]: any }, options?: HttpRequestOptions): Promise<HttpRequestReponse<T>>,
        post<T>(url: string, body: any, options?: HttpRequestOptions): Promise<HttpRequestReponse<T>>,
        put<T>(url: string, body: any, options?: HttpRequestOptions): Promise<HttpRequestReponse<T>>,
        patch<T>(url: string, body: any, options?: HttpRequestOptions): Promise<HttpRequestReponse<T>>,
        delete<T>(url: string, passedQuery: { [id: string]: any }, options?: HttpRequestOptions): Promise<HttpRequestReponse<T>>,
        uploadFile<T>(url: string, files: FileList | File, options?: FileUploadOptions): FileUpload<T>,
        updateOptions(newOptions: HttpModuleOptions): void;
        abort(regexp: string): boolean;
    }

    export default function (moduleOptions: HttpModuleOptions): HttpModule;

    interface FileUploadProgress {
        progress: number
    }
    
    interface FileUploadOptions {
        name?: string,
        data?: { [id: string]: any },
        headers?: { [id: string]: string },
        onProgress?: (progress: FileUploadProgress) => void | string
    }

    interface FileUploadResult<T> {
        result?: T,
        status: string
    }

    class FileUpload<TResponse> {
        constructor(options: FileUploadOptions);
        xhr: XMLHttpRequest;
        isAborted: boolean;
        send: (files: FileList | File[]) => Promise<FileUploadResult<TResponse>>;
        abort: () => void;
    }
}
