import * as React from 'react';
import {
  compose,
  CSSTree,
  focusable,
  focusOnMouse,
  map,
  omit,
  pure,
  render,
  restyle,
} from 'mishmash';

import css from '../css';

import Autosize from './Autosize';
import Placeholder from './Placeholder';
import cssTransforms from './cssTransforms';

const getMargin = style => {
  const gap = (parseFloat(style.lineHeight) - parseFloat(style.fontSize)) * 0.5;
  return `-${gap + 1}px 0px -${gap + 1}px`;
};

export interface TxtProps extends React.HTMLProps<{}> {
  children?: React.ReactNode;
  onTextChange?: (text: string) => void;
  placeholder?: string;
  prompt?: boolean;
  rows?: number;
  password?: boolean;
  focusRef?: (c: HTMLElement | null) => void;
  style?: CSSTree<'placeholder'>;
}

const createTxt = (input?: boolean) => {
  const base = compose(
    ...(input ? [focusable] : []),
    pure,
    ...(input ? [focusOnMouse] : []),
    map(
      restyle(
        [
          [
            'defaults',
            {
              fontSize: 16,
              lineHeight: 1.5,
              cursor: input ? 'text' : undefined,
            },
          ],
          ['block'],
          ['lineHeightPx'],
        ],
        cssTransforms,
      ),
    ),
    render(
      map(
        restyle(['style.fontSize'], fontSize => ({
          outer: [
            ['filterKeys'],
            ['filter', ...css.groups.box, ...css.groups.other],
          ],
          inner: [
            { padding: '1px 0px', display: 'block', minHeight: fontSize },
          ],
        })),
        omit(
          'placeholder',
          ...(input
            ? [
                'onTextChange',
                'placeholder',
                'prompt',
                'rows',
                'password',
                'tab',
                'tabIndex',
                'onFocus',
                'onBlur',
                'focusElem',
                'setFocusElem',
                'focusRef',
                'spellCheck',
              ]
            : []),
        ),
      )(({ style, next, ...props }) => (
        <span
          style={style.outer}
          {...props}
          className={`${props.className || ''} e5 e6 e7 e8 e9`}
        >
          <span style={style.inner}>{next()}</span>
        </span>
      )),
    ),
    map(
      restyle({
        text: [['filterKeys'], ['filter', ...css.groups.text]],
        placeholder: [
          ['mergeKeys', 'placeholder'],
          ['filter', ...css.groups.text],
        ],
      }),
    ),
  );
  if (!input) {
    return compose(
      base,
      map(({ children, placeholder, style }) => ({
        children: children || placeholder,
        style: children ? style.text : style.placeholder,
      })),
    )(({ style, children }) => (
      <span style={{ ...style, display: 'block', margin: getMargin(style) }}>
        {React.Children.toArray(children).reduce<React.ReactNode[]>(
          (result, child, i) =>
            result.concat(
              typeof child === 'string'
                ? child
                    .split('\n')
                    .reduce<React.ReactNode[]>(
                      (res, line, j) =>
                        res.concat(
                          j === 0 ? line : [<br key={`${i}_${j}`} />, line],
                        ),
                      [],
                    )
                : child,
            ),
          [],
        )}
      </span>
    ));
  }
  return compose(
    base,
    map(
      restyle({
        text: {
          input: [
            [
              'merge',
              {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                resize: 'none',
                overflow: 'hidden',
                background: 'transparent',
                outline: 'none',
                border: 0,
                padding: 0,
                margin: 0,
                display: 'block',
              },
            ],
          ],
        },
      }),
      ({ children, ...props }) => {
        const v = (children || '').toString();
        return { ...props, value: props.rows ? v : v.replace(/\n/g, '') };
      },
      ({
        password,
        tabIndex,
        onFocus,
        onBlur,
        setFocusElem,
        onTextChange,
        spellCheck,
        value,
        ...props
      }) => ({
        ...props,
        value,
        inputProps: {
          value,
          onChange: event => onTextChange(event.target.value),
          type: password ? 'password' : 'text',
          onKeyDown: event => {
            if (event.keyCode === 13 && props.rows) event.stopPropagation();
          },
          tabIndex,
          onFocus,
          onBlur,
          ref: elem => setFocusElem(elem),
          spellCheck,
          size: 1,
          style: props.style.input,
        },
      }),
    ),
  )(({ placeholder, prompt, rows, style, value, inputProps }) => (
    <span
      style={{
        position: 'relative',
        display: 'block',
        margin: getMargin(style.text),
      }}
    >
      <Autosize value={value || placeholder} rows={rows} style={style.text} />
      <Placeholder
        text={placeholder}
        value={value}
        prompt={prompt}
        style={style.placeholder}
      />
      {rows ? <textarea {...inputProps} /> : <input {...inputProps} />}
    </span>
  ));
};

export default createTxt();
export const TxtInput = createTxt(true);
