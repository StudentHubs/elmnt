import r from 'refluent';
import { CSSTree } from 'style-transform';
export interface MarkProps {
    domain?: string;
    style?: CSSTree<'em' | 'st' | 'link' | 'heading' | 'hr'>;
    children?: string;
}
declare const _default: r<MarkProps, MarkProps>;
export default _default;
