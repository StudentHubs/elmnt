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
var refluent_1 = require("refluent");
var utils_1 = require("../../utils");
var Label_1 = require("../components/Label");
var parsers_1 = require("./parsers");
exports.default = refluent_1.default
    .do(function (props) { return props; }, function (props) { return ({
    parseText: function (text) { return parsers_1.default[props.type].parse(text, props); },
    formatValue: function (value, config) {
        return parsers_1.default[props.type].format(value, config, props);
    },
}); })
    .do(function (props$, push) {
    var config = {};
    var initial = true;
    props$('onTextChange', 'parseText', 'formatValue', 'value', function (onTextChange, parseText, formatValue, value, commit) {
        if (initial ||
            (commit &&
                (value !== null ||
                    parseText(props$(true).text || '').value !== null))) {
            var newText_1 = formatValue(value, config);
            if (initial)
                push({ text: newText_1 });
            else
                setTimeout(function () { return push({ text: newText_1 }); });
            onTextChange && onTextChange(newText_1);
        }
        if (commit)
            initial = false;
    });
    return {
        onTextChange: function (text) {
            var _a = props$(), type = _a.type, value = _a.value, onChange = _a.onChange, onTextChange = _a.onTextChange, parseText = _a.parseText;
            var parsed = text ? parseText(text) : { value: null };
            config = parsed.config || {};
            var parsedText = parsed.text !== undefined ? parsed.text : text;
            push({ text: parsedText });
            onTextChange && onTextChange(parsedText);
            if (!parsers_1.default[type].equals(value, parsed.value))
                onChange(parsed.value);
        },
    };
})
    .do('type', 'value', 'placeholder', 'password', 'noDay', 'text', function (type, value, placeholder, password, noDay, text) { return (__assign({}, (password ? { iconRight: 'lock' } : {}), (type === 'date'
    ? {
        placeholder: placeholder || (noDay ? 'MM/YY' : 'DD/MM/YY'),
        iconRight: text && (value === null ? 'cross' : 'tick'),
    }
    : {}), (type === 'stringlist'
    ? {
        rows: (value || ['']).length + 1,
        placeholder: __spread([
            'Option 1'
        ], (value || ['']).map(function (_, i) { return "Option " + (i + 2); })).join('\n'),
        prompt: true,
    }
    : {}))); })
    .do(utils_1.restyle('isFocused', function (isFocused, style) { return ({
    div: style.filter('display', 'width', 'height', 'maxWidth', 'maxHeight', 'verticalAlign'),
    label: style
        .mergeKeys({ active: isFocused })
        .merge({ display: 'block', cursor: 'text' }),
}); }))
    .yield(function (_a) {
    var text = _a.text, onTextChange = _a.onTextChange, iconLeft = _a.iconLeft, iconRight = _a.iconRight, placeholder = _a.placeholder, prompt = _a.prompt, rows = _a.rows, password = _a.password, tab = _a.tab, spellCheck = _a.spellCheck, onMouseDown = _a.onMouseDown, onKeyDown = _a.onKeyDown, hoverProps = _a.hoverProps, focusProps = _a.focusProps, setFocusElem = _a.setFocusElem, style = _a.style;
    return (React.createElement("div", __assign({ onMouseDown: onMouseDown, onKeyDown: onKeyDown }, hoverProps, { style: style.div, className: "e5 e6 e7 e8 e9" }),
        React.createElement(Label_1.default, { text: text, onTextChange: onTextChange, iconLeft: iconLeft, iconRight: iconRight, placeholder: placeholder, prompt: prompt, rows: rows, password: password, tab: tab, spellCheck: spellCheck, focusProps: focusProps, setFocusElem: setFocusElem, style: style.label })));
});
