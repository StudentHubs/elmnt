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
var file_1 = require("./file");
var select_1 = require("./select");
var text_1 = require("./text");
exports.default = utils_1.focusable('setFocusElem', 'onMouseDown')(refluent_1.default
    .transform(function (C) { return (C.displayName = 'Input') && C; })
    .yield(function (_a) {
    var next = _a.next;
    return next(function (props) { return props; }, true);
})
    .do(utils_1.watchFocus)
    .do(utils_1.watchHover)
    .do('value', 'type', 'options', function (value, type, options) { return (__assign({ value: value === undefined ||
        (type.endsWith('list') && Array.isArray(value) && value.length === 0)
        ? null
        : value, isList: type.endsWith('list') }, (type === 'boolean' && !options ? { options: { on: true } } : {}))); })
    .do(utils_1.restyle('invalid', 'isFocused', 'isHovered', function (invalid, isFocused, isHovered, style) {
    return style
        .defaults({
        fontSize: 16,
        lineHeight: 1.5,
        color: 'black',
        layout: 'grid',
    })
        .mergeKeys({ invalid: invalid, focus: isFocused, hover: isHovered });
}))
    .yield(function (props) {
    return React.createElement(props.options ? select_1.default : props.type === 'file' ? file_1.default : text_1.default, props);
}));
