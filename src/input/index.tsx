import { branch, compose, pure, renderComponent, withProps } from 'recompose';
import {
  focusable,
  mapStyle,
  memoizeProps,
  withFocus,
  withHover,
} from 'mishmash';

import components from './components';
import createFile from './file';
import createSelect from './select';
import createText from './text';
import { InputProps } from './typings';

export default compose<any, InputProps>(
  focusable,
  memoizeProps('options', 'labels'),
  pure,
  withFocus,
  withHover,
  withProps(({ value, type }) => ({
    value: value === undefined ? null : value,
    isList: type.endsWith('list'),
  })),
  mapStyle(
    ['invalid', 'isFocused', 'isHovered'],
    (invalid, isFocused, isHovered) => [
      [
        'defaults',
        {
          fontSize: 20,
          lineHeight: 1.5,
          color: 'black',
          layout: 'grid',
          background: 'white',
        },
      ],
      ['mergeKeys', { invalid, focus: isFocused, hover: isHovered }],
    ],
  ),
  branch(({ options }) => options, renderComponent(createSelect(components))),
  branch(
    ({ type }) => type === 'file',
    renderComponent(createFile(components)),
  ),
)(createText(components)) as React.ComponentClass<any>;
