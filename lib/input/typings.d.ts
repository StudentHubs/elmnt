import { CSSTree } from 'style-transform';
export declare type StyleKeys = 'invalid' | 'focus' | 'hover' | 'active';
export declare type ValueType<T> = {
    value: T | null;
    onChange: (value: T | null) => void;
};
export declare type TextInputBase<T> = ValueType<T> & {
    placeholder?: string;
    style?: CSSTree<StyleKeys | 'placeholder'>;
};
export declare type ToggleInputBase<T> = ValueType<T> & {
    options?: {
        on: T;
        off?: T;
    };
    label: string;
    style?: CSSTree<StyleKeys>;
};
export declare type OptionsInputBase<T> = ValueType<T> & {
    options: T[];
    labels?: string[];
    style?: CSSTree<StyleKeys | 'group' | 'none'> & {
        layout: 'bar' | 'grid' | 'stack';
        spacing?: number | string;
    };
};
export declare type TableInputBase<T> = ValueType<T> & {
    options: T[];
    labels?: string[];
    text: string;
    style?: CSSTree<StyleKeys | 'row' | 'key' | 'none'> & {
        layout: 'table';
        spacing?: number | string;
    };
};
export declare type ModalInputBase<T> = ValueType<T> & {
    options: T[];
    labels?: string[];
    placeholder?: string;
    style?: CSSTree<StyleKeys | 'selected' | 'placeholder' | 'none'> & {
        layout: 'modal';
    };
};
export declare type SelectInputBase<T> = ToggleInputBase<T> | OptionsInputBase<T> | TableInputBase<T> | ModalInputBase<T>;
export declare type BooleanProps = {
    type: 'boolean';
} & SelectInputBase<boolean>;
export declare type IntProps = {
    type: 'int';
} & (TextInputBase<number> | SelectInputBase<number>);
export declare type FloatProps = {
    type: 'float';
} & (TextInputBase<number> | SelectInputBase<number>);
export declare type StringExtraProps = {
    rows?: number;
    password?: boolean;
    tab?: number;
    spellCheck?: boolean;
};
export declare type StringProps = {
    type: 'string';
} & ((TextInputBase<string> & StringExtraProps) | SelectInputBase<string>);
export declare type DateExtraProps = {
    noDay?: boolean;
};
export declare type DateProps = {
    type: 'date';
} & ((TextInputBase<Date> & DateExtraProps) | SelectInputBase<Date>);
export interface FileUploaderGoogle {
    uploader: 'google';
    bucket: string;
    accessId: string;
    serverUrl: string;
}
export declare type FileExtraProps = {
    maxKb?: number;
    fileType?: string | string[];
    config: FileUploaderGoogle;
};
export declare type FileProps = {
    type: 'file';
} & TextInputBase<string> & FileExtraProps;
export declare type StringlistProps = {
    type: 'stringlist';
} & (TextInputBase<(string | null)[]> | SelectInputBase<(string | null)[]>);
export declare type InputProps = {
    invalid?: boolean;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    ref?: string | ((elem: Element | null) => any);
} & (BooleanProps | IntProps | FloatProps | StringProps | DateProps | FileProps | StringlistProps);
