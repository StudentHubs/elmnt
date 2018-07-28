"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var refluent_1 = require("refluent");
var utils_1 = require("../utils");
var liftsElem;
if (typeof document !== 'undefined') {
    liftsElem = document.createElement('div');
    document.body.appendChild(liftsElem);
}
var counter = 0;
var indices = {};
exports.default = refluent_1.default
    .transform(function (C) { return (C.displayName = 'Modal') && C; })
    .yield(function (_a) {
    var next = _a.next;
    return next(function (props) { return props; }, true);
})
    .do(function (props$, _) { return ({
    setClickElem: utils_1.clickOutsideRef(function () { return props$().onClose && props$().onClose(); }),
}); })
    .do(function (props$, push) {
    var info = {};
    var update = function (newInfo) {
        Object.assign(info, newInfo);
        if (info.screen) {
            var fitSmall = info.screen.width < 500;
            var _a = info.inner || {}, _b = _a.width, width = _b === void 0 ? 0 : _b, _c = _a.height, height = _c === void 0 ? 0 : _c;
            var baseStyle = {
                position: 'fixed',
                overflow: 'auto',
                height: Math.min(height, info.screen.height - (fitSmall ? 30 : info.gap) * 2),
                visibility: height === 0 ? 'hidden' : 'visible',
            };
            if (fitSmall || !info.base) {
                var w = Math.min.apply(Math, __spread([info.screen.width - 100].concat(info.maxWidth || [])));
                push({
                    fitSmall: fitSmall,
                    fitStyle: __assign({}, baseStyle, { left: (info.screen.width - w) * 0.5, width: w, top: Math.max(30, (info.screen.height - height) * 0.5) }),
                });
            }
            else {
                push({
                    fitSmall: fitSmall,
                    fitStyle: __assign({}, baseStyle, { left: Math.max(info.gap, Math.min(info.base.left || 0, info.screen.width - width - info.gap)), width: info.base.width, top: Math.max(info.gap, Math.min(info.base.top || 0, info.screen.height - height - info.gap)) }),
                });
            }
        }
    };
    props$('style.fontSize', 'style.maxWidth', function (fontSize, maxWidth) {
        return update({ gap: fontSize * 0.25, maxWidth: maxWidth });
    });
    push({
        setModalBase: utils_1.resizeRef(function (size) { return props$().getBase && update({ base: props$().getBase(size) }); }, true),
        setInnerElem: utils_1.resizeRef(function (size) { return update({ inner: size }); }),
    });
    if (typeof document !== 'undefined') {
        var updateScreen_1 = function () {
            return update({
                screen: { width: window.innerWidth, height: window.innerHeight },
            });
        };
        updateScreen_1();
        window.addEventListener('resize', updateScreen_1);
        return function () { return window.removeEventListener('resize', updateScreen_1); };
    }
})
    .do(utils_1.restyle('style.fontSize', 'fitStyle', function (_a) {
    var fitSmall = _a.fitSmall, getBase = _a.getBase;
    return fitSmall || !getBase;
}, function (fontSize, fitStyle, small, style) { return ({
    root: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 99999,
    },
    overlay: small
        ? {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(0,0,0,0.5)',
        }
        : {},
    outer: style.filter('borderRadius').merge(__assign({}, fitStyle, { boxShadow: small
            ? '0 2px 25px rgba(0,0,0,0.5)'
            : '0 2px 20px 5px rgba(0,0,0,0.4)' })),
    inner: style
        .merge({ padding: fontSize * 0.5 })
        .filter('background', 'paddingTop', 'paddingBottom'),
}); }))
    .do(function (props$, _) {
    var index = counter++;
    props$('isOpen', function (isOpen, commit) {
        indices[index] = isOpen;
        document.body.style.overflow = Object.keys(indices).some(function (k) { return indices[k]; })
            ? 'hidden'
            : 'auto';
        if (isOpen && commit)
            props$().setModalBase.update();
    });
    return function () { return delete indices[index]; };
})
    .yield(function (_a) {
    var isOpen = _a.isOpen, modalProps = _a.modalProps, style = _a.style, setClickElem = _a.setClickElem, setInnerElem = _a.setInnerElem, children = _a.children, setModalBase = _a.setModalBase, next = _a.next;
    return (React.createElement(React.Fragment, null,
        liftsElem &&
            isOpen &&
            ReactDOM.createPortal(React.createElement("div", { className: "e5 e6 e7 e8 e9", style: style.root },
                React.createElement("div", { style: style.overlay }),
                React.createElement("div", { ref: setClickElem },
                    React.createElement("div", __assign({}, modalProps, { style: style.outer }),
                        React.createElement("div", { style: style.inner, ref: setInnerElem }, children)))), liftsElem),
        next(function (props) { return (__assign({}, props, { setModalBase: setModalBase && setModalBase.ref })); })));
});
