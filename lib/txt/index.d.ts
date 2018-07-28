import * as React from 'react';
import r from 'refluent';
import { CSSTree } from 'style-transform';
export interface TxtProps extends React.HTMLProps<{}> {
    children?: React.ReactNode;
    onTextChange?: (text: string) => void;
    placeholder?: string;
    prompt?: boolean;
    rows?: number;
    password?: boolean;
    setFocusElem?: (c: HTMLElement | null) => void;
    style?: CSSTree<'placeholder'>;
}
declare const _default: r<any, any>;
export default _default;
export declare const TxtInput: React.ComponentClass<any, React.ComponentState>;
