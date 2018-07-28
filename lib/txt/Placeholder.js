"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var refluent_1 = require("refluent");
var utils_1 = require("../utils");
exports.default = refluent_1.default
    .yield(function (_a) {
    var text = _a.text, value = _a.value, prompt = _a.prompt, next = _a.next;
    return prompt
        ? next(function (p) { return (__assign({}, p, { text: text
                .split('\n')
                .map(function (l, i) { return (value.split('\n')[i] ? '' : l); })
                .join('\n') })); })
        : text && !value
            ? next()
            : null;
})
    .do(utils_1.restyle(function (style) {
    return style.merge({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: 0,
        display: 'block',
        whiteSpace: 'pre-wrap',
    });
}))
    .yield(function (_a) {
    var text = _a.text, style = _a.style;
    return React.createElement("span", { style: style }, text);
});
