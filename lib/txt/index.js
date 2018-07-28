"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
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
var refluent_1 = require("refluent");
var css_1 = require("../css");
var utils_1 = require("../utils");
var Autosize_1 = require("./Autosize");
var Placeholder_1 = require("./Placeholder");
var getMargin = function (style) {
    var gap = (parseFloat(style.lineHeight) - parseFloat(style.fontSize)) * 0.5;
    return "-" + (gap + 1) + "px 0px -" + (gap + 1) + "px";
};
var base = function (input) {
    return refluent_1.default
        .transform(function (C) { return (C.displayName = input ? 'TxtInput' : 'Txt') && C; })
        .yield(function (_a) {
        var next = _a.next;
        return next(function (props) { return props; }, true);
    })
        .do(utils_1.restyle(function (style) {
        return style
            .defaults({
            fontSize: 16,
            lineHeight: 1.5,
            cursor: input ? 'text' : undefined,
        })
            .map(function (s) { return (__assign({}, s, { display: s.display === 'inline' ? 'inline-block' : s.display || 'block' })); })
            .map(function (s) {
            if (!s.fontSize || !s.lineHeight)
                return s;
            var lineHeightNum = !isNaN(s.lineHeight)
                ? parseFloat(s.fontSize) * s.lineHeight
                : parseFloat(s.lineHeight);
            return __assign({}, s, { lineHeight: lineHeightNum + "px" });
        });
    }))
        .yield(refluent_1.default
        .do(function () { return (__assign({ placeholder: undefined }, (input
        ? {
            onTextChange: undefined,
            placeholder: undefined,
            prompt: undefined,
            rows: undefined,
            password: undefined,
            tab: undefined,
            tabIndex: undefined,
            onFocus: undefined,
            onBlur: undefined,
            setFocusElem: undefined,
            spellCheck: undefined,
        }
        : {}))); })
        .do(utils_1.restyle(function (style) { return ({
        outer: style.filter.apply(style, __spread(css_1.default.groups.box, css_1.default.groups.other)),
        inner: {
            padding: '1px 0px',
            display: 'block',
            minHeight: style.fontSize,
        },
    }); }))
        .yield(function (_a) {
        var style = _a.style, next = _a.next, props = __rest(_a, ["style", "next"]);
        return (React.createElement("span", __assign({ style: style.outer }, props, { className: (props.className || '') + " e5 e6 e7 e8 e9" }),
            React.createElement("span", { style: style.inner }, next())));
    }))
        .do(utils_1.restyle(function (style) {
        var _a;
        return ({
            text: style.filter.apply(style, __spread(css_1.default.groups.text)),
            placeholder: (_a = style.mergeKeys('placeholder')).filter.apply(_a, __spread(css_1.default.groups.text)),
        });
    }));
};
exports.default = base().yield(refluent_1.default
    .do('children', 'placeholder', 'style', function (children, placeholder, style) { return ({
    children: children || placeholder,
    style: children ? style.text : style.placeholder,
}); })
    .yield(function (_a) {
    var style = _a.style, children = _a.children;
    return (React.createElement("span", { style: __assign({}, style, { display: 'block', margin: getMargin(style) }) }, React.Children.toArray(children).reduce(function (result, child, i) {
        return result.concat(typeof child === 'string'
            ? child
                .split('\n')
                .reduce(function (res, line, j) {
                return res.concat(j === 0 ? line : [React.createElement("br", { key: i + "_" + j }), line]);
            }, [])
            : child);
    }, [])));
}));
exports.TxtInput = utils_1.focusable('setFocusElem', 'onMouseDown')(base(true).yield(refluent_1.default
    .do(utils_1.restyle(function (style) { return (__assign({}, style, { input: style.text.merge({
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
    }) })); }))
    .do('rows', 'children', function (rows, children) {
    var v = (children || '').toString();
    return {
        children: undefined,
        value: rows === undefined ? v.replace(/\n/g, '') : v,
    };
})
    .do('rows', 'onTextChange', function (rows, onTextChange) { return ({
    onChange: function (event) { return onTextChange(event.target.value); },
    onKeyDown: function (event) {
        if (event.keyCode === 13) {
            if (rows === undefined)
                event.preventDefault();
            else
                event.stopPropagation();
        }
    },
}); })
    .yield(function (_a) {
    var tabIndex = _a.tabIndex, onFocus = _a.onFocus, onBlur = _a.onBlur, setFocusElem = _a.setFocusElem, spellCheck = _a.spellCheck, value = _a.value, placeholder = _a.placeholder, prompt = _a.prompt, rows = _a.rows, password = _a.password, onChange = _a.onChange, onKeyDown = _a.onKeyDown, style = _a.style;
    return (React.createElement("span", { style: {
            position: 'relative',
            display: 'block',
            margin: getMargin(style.text),
        } },
        React.createElement(Autosize_1.default, { value: value || placeholder, rows: rows, style: style.text }),
        React.createElement(Placeholder_1.default, { text: placeholder, value: value, prompt: prompt, style: style.placeholder }),
        React.createElement(password ? 'input' : 'textarea', __assign({}, (password ? { type: 'password' } : {}), { value: value,
            onChange: onChange,
            onKeyDown: onKeyDown,
            tabIndex: tabIndex,
            onFocus: onFocus,
            onBlur: onBlur, ref: setFocusElem, spellCheck: spellCheck, size: 1, style: style.input }))));
})));
