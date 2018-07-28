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
var utils_1 = require("../../utils");
var Option_1 = require("../components/Option");
exports.default = refluent_1.default
    .yield(function (_a) {
    var next = _a.next;
    return next(function (props) { return props; });
})
    .do('index', 'selectIndex', 'moveActiveIndex', 'style.layout', function (index, selectIndex, moveActiveIndex, layout) { return (__assign({ selectIndex: undefined, moveActiveIndex: undefined }, (layout === 'modal'
    ? {
        onMouseUp: function () { return selectIndex(index); },
        onMouseMove: function () { return moveActiveIndex(index, true); },
    }
    : {
        onMouseDown: function () { return selectIndex(index); },
    }))); })
    .do(utils_1.restyle('isActive', 'isSelected', 'isNone', function (isActive, isSelected, isNone, style) {
    return style.merge({ display: 'block' }).mergeKeys({
        active: isActive,
        selected: isSelected && style.layout === 'modal',
        none: isNone,
    });
}))
    .yield(function (_a) {
    var index = _a.index, text = _a.text, isList = _a.isList, isSelected = _a.isSelected, onMouseUp = _a.onMouseUp, onMouseDown = _a.onMouseDown, onMouseMove = _a.onMouseMove, style = _a.style;
    return React.createElement(style.layout === 'table' ? 'td' : 'div', {
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        onMouseMove: onMouseMove,
        'data-modal-index': index,
        style: { verticalAlign: 'middle' },
    }, React.createElement(Option_1.default, { text: text, isList: isList, isSelected: isSelected, style: style }));
});
