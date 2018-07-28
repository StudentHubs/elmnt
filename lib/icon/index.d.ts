import * as React from 'react';
export interface IconProps extends React.HTMLProps<any> {
    path?: string;
    viewBox?: string;
    style?: React.CSSProperties;
}
declare const _default: ({ viewBox, path, style, ...props }: IconProps) => JSX.Element;
export default _default;
