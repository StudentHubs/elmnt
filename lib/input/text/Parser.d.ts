export interface ParserResult<T, Config> {
    value: T | null;
    config?: Config;
    text?: string;
}
export default class Parser<T, Config = {}, Props = {}> {
    private baseFormat;
    private baseEquals;
    constructor(parse: (text: string, props: Props) => ParserResult<T, Config>, options?: {
        format?: (value: T, config: Config, props: Props) => string;
        equals?: (a: T, b: T) => boolean;
    });
    parse: (text: string, props: Props) => ParserResult<T, Config>;
    format: (value: T | null, config: Config, props: Props) => string;
    equals: (a: T | null, b: T | null) => boolean;
}
