import * as React from 'react';
import r from 'refluent';
export interface AutosizeStyle extends React.CSSProperties {
    lineHeight: string;
}
export interface AutosizeProps {
    value: string;
    rows?: number;
    style: AutosizeStyle;
}
declare const _default: r<AutosizeProps, AutosizeProps>;
export default _default;
