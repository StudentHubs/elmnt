import * as React from 'react';
import { compose } from 'recompose';
import { mapStyle, withSize } from 'mishmash';

export default compose<any, any>(
  withSize('inner', 'setInnerElem'),
  withSize('screen'),
  mapStyle(
    ['baseBounds', 'inner', 'screen', 'style.fontSize'],
    (baseBounds = { top: 0 }, inner = { height: 0 }, screen, fontSize) => ({
      root: [{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }],
      overlay: [
        {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: screen.width < 500 ? 'rgba(0,0,0,0.5)' : 'none',
        },
      ],
      outer: [
        ['filter', 'borderRadius'],
        [
          'merge',
          {
            position: 'fixed',
            height: Math.min(inner.height, screen.height - fontSize * 0.5),
            boxShadow:
              screen.width < 500
                ? '0 2px 25px rgba(0,0,0,0.5)'
                : '0 2px 20px 5px rgba(0,0,0,0.4)',
            overflow: 'auto',
            ...(inner.height === 0
              ? { visibility: 'hidden' }
              : screen.width < 500
                ? {
                    left: 50,
                    width: screen.width - 100,
                    top: Math.max(
                      fontSize * 0.25,
                      (screen.height - inner.height) * 0.5,
                    ),
                  }
                : {
                    left: baseBounds.left,
                    width: baseBounds.width,
                    top: Math.max(
                      fontSize * 0.25,
                      Math.min(
                        baseBounds.top,
                        screen.height - inner.height - fontSize * 0.25,
                      ),
                    ),
                  }),
          },
        ],
      ],
      inner: [
        ['scale', { padding: { fontSize: 0.5 } }],
        ['filter', 'background', 'paddingTop', 'paddingBottom'],
      ],
    }),
  ),
)(({ closeModal, modalProps, style, setRootElem, setInnerElem, children }) => (
  <div className="e5 e6 e7 e8 e9" style={style.root} ref={setRootElem}>
    <div onClick={closeModal} style={style.overlay} />
    <div {...modalProps} style={style.outer}>
      <div style={style.inner} ref={setInnerElem}>
        {children}
      </div>
    </div>
  </div>
));
