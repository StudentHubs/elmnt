import * as React from 'react';
export interface DivStyle extends React.CSSProperties {
    layout?: 'bar' | 'grid' | 'stack';
    spacing?: number | string;
}
export interface DivProps extends React.HTMLProps<any> {
    style?: DivStyle;
}
declare const Div: ({ style: { layout, spacing: baseSpacing, ...style }, children, ...props }: DivProps) => any;
export default Div;
