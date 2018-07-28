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
var css_1 = require("../../css");
var div_1 = require("../../div");
var modal_1 = require("../../modal");
var txt_1 = require("../../txt");
var utils_1 = require("../../utils");
var Label_1 = require("../components/Label");
var Item_1 = require("./Item");
var withSelect_1 = require("./withSelect");
var withToggle_1 = require("./withToggle");
var isGroup = function (l) { return typeof l === 'string' && l[0] === '~'; };
var userSelect = {
    userSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    WebkitUserSelect: 'none',
};
exports.default = refluent_1.default
    .yield(function (props) {
    return (Array.isArray(props.options) ? withSelect_1.default : withToggle_1.default)(props);
})
    .do(utils_1.restyle(function (style) {
    var _a, _b;
    return ({
        base: style,
        group: (_a = style
            .mergeKeys('group')).filter.apply(_a, __spread(css_1.default.groups.text, ['paddingTop',
            'paddingBottom'], (style.layout === 'modal' ? ['paddingLeft', 'paddingRight'] : []))).merge(__assign({ width: '100%' }, userSelect)),
        keyCell: style
            .mergeKeys('key')
            .scale({ paddingRight: { fontSize: 1 } })
            .filter('padding', 'width')
            .merge({ verticalAlign: 'middle' }),
        keyText: (_b = style.mergeKeys('key')).filter.apply(_b, __spread(css_1.default.groups.text)),
    });
}))
    .yield(refluent_1.default
    .do('next', function (next) { return ({ items: next }); })
    .do(utils_1.restyle(function (style) {
    var _a, _b;
    return (__assign({}, style, { div: (_a = (_b = style.base).filter.apply(_b, __spread((style.base.layout !== 'modal'
            ? css_1.default.groups.other
            : ['maxWidth', 'maxHeight'])))).mergeKeys.apply(_a, __spread((style.base.layout === 'table' ? ['row'] : []))).merge({ outline: 'none' }) }));
}))
    .yield(function (_a) {
    var onMouseDown = _a.onMouseDown, onKeyDown = _a.onKeyDown, hoverProps = _a.hoverProps, focusProps = _a.focusProps, setFocusElem = _a.setFocusElem, style = _a.style, items = _a.items, next = _a.next;
    return React.createElement(style.base.layout === 'table' ? 'tr' : 'div', __assign({ onMouseDown: onMouseDown,
        onKeyDown: onKeyDown }, hoverProps, focusProps, { ref: setFocusElem, style: style.div, className: 'e5 e6 e7 e8 e9' }), style.base.layout === 'modal' ? next() : items());
})
    .yield(function (_a) {
    var isOpen = _a.isOpen, closeModal = _a.closeModal, onMouseDown = _a.onMouseDown, hoverProps = _a.hoverProps, setScrollElem = _a.setScrollElem, style = _a.style, items = _a.items, next = _a.next;
    return (React.createElement(modal_1.default, { isOpen: isOpen, onClose: closeModal, getBase: function (base) { return (__assign({}, base, { width: Math.max(base.width, style.base.fontSize * 20) })); }, modalProps: __assign({ onMouseDown: onMouseDown }, hoverProps, { ref: setScrollElem }), style: style.base, next: next }, items()));
})
    .do(utils_1.restyle('isFocused', function (isFocused, style) {
    return style.base.merge(userSelect).mergeKeys({ active: isFocused });
}))
    .yield(function (_a) {
    var value = _a.value, isList = _a.isList, labelText = _a.labelText, openModal = _a.openModal, setModalBase = _a.setModalBase, placeholder = _a.placeholder, style = _a.style;
    return (React.createElement("div", { onMouseDown: openModal },
        React.createElement(Label_1.default, { text: value && labelText, iconRight: isList ? 'updown' : 'down', placeholder: placeholder || labelText, setBaseElem: setModalBase, style: style })));
}))
    .yield(function (_a) {
    var isList = _a.isList, text = _a.text, selectIndex = _a.selectIndex, options = _a.options, labels = _a.labels, labelIndices = _a.labelIndices, selected = _a.selected, activeIndex = _a.activeIndex, moveActiveIndex = _a.moveActiveIndex, style = _a.style;
    return React.createElement.apply(React, __spread((style.base.layout !== 'table' && style.base.layout !== 'modal'
        ? [div_1.default, { style: style.base.filter('layout', 'spacing') }]
        : [React.Fragment, null]), (style.base.layout === 'table'
        ? [
            React.createElement("td", { style: style.keyCell, key: -1 },
                React.createElement(txt_1.default, { style: style.keyText }, text)),
        ]
        : []), labels.map(function (l, i) {
        return isGroup(l) ? (React.createElement(txt_1.default, { style: style.group, key: i }, l.substring(1))) : (React.createElement(Item_1.default, { text: l, isList: isList, index: labelIndices[i], selectIndex: selectIndex, isSelected: isList
                ? selected[labelIndices[i]]
                : selected === labelIndices[i], isActive: activeIndex === labelIndices[i], isNone: Array.isArray(options) && !options[labelIndices[i]], moveActiveIndex: moveActiveIndex, style: style.base, key: i }));
    })));
});
