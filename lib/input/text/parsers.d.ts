import Parser from './Parser';
declare const parsers: {
    [key: string]: Parser<any, {}, {}>;
};
export interface FloatConfig {
    point?: boolean;
    zeros?: number;
}
export interface DateConfig {
    padDate?: boolean;
    padMonth?: boolean;
    fullYear?: boolean;
}
export default parsers;
