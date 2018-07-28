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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var getElmntClass = function (className) {
    if (className === void 0) { className = ''; }
    return className + " e0 e1 e2 e3 e4";
};
var getSpacing = function (spacing) {
    if (!spacing)
        return [0, 0];
    if (typeof spacing === 'number')
        return [spacing, spacing];
    var spacingSplit = spacing.split(/\s+/);
    return [spacingSplit[0], spacingSplit[1] || spacingSplit[0]];
};
var mapChildren = function (children, map) {
    var first = true;
    return React.Children.map(children, function (child, i) {
        if (child) {
            var result = map(child, i, first);
            first = false;
            return result;
        }
    });
};
var Div = function (_a) {
    var _b = _a.style, _c = _b === void 0 ? {} : _b, layout = _c.layout, baseSpacing = _c.spacing, style = __rest(_c, ["layout", "spacing"]), children = _a.children, props = __rest(_a, ["style", "children"]);
    if (!layout && !baseSpacing) {
        return (React.createElement("div", __assign({}, props, { style: style, className: getElmntClass(props.className) }),
            children,
            React.createElement("div", { style: { display: 'table', clear: 'both' }, className: getElmntClass() })));
    }
    var spacing = getSpacing(baseSpacing);
    if (layout === 'bar') {
        return (React.createElement("div", __assign({}, props, { style: __assign({}, style, { display: 'table', verticalAlign: undefined }), className: getElmntClass(props.className) }), mapChildren(children, function (child, i, first) { return (React.createElement("div", { style: {
                display: 'table-cell',
                verticalAlign: (style && style.verticalAlign) || 'middle',
                paddingLeft: first ? 0 : spacing[1],
                width: (child.props.style && child.props.style.width) || 'auto',
                boxSizing: 'content-box !important',
            }, className: getElmntClass('e10'), key: i },
            React.createElement("div", { className: getElmntClass() }, child))); })));
    }
    if (layout === 'grid') {
        return (React.createElement(Div, __assign({}, props, { style: style }),
            React.createElement("div", { style: { paddingTop: 1, paddingLeft: 1 }, className: getElmntClass() },
                React.createElement("div", { style: {
                        marginTop: "-" + (parseFloat(spacing[0]) + 1) + "px",
                        marginLeft: "-" + (parseFloat(spacing[1]) + 1) + "px",
                    }, className: getElmntClass() }, mapChildren(children, function (child, i) { return (React.createElement("div", { style: {
                        float: 'left',
                        marginTop: spacing[0],
                        marginLeft: spacing[1],
                        width: (child.props.style && child.props.style.width) || 'auto',
                    }, className: getElmntClass(), key: i }, child)); })))));
    }
    return (React.createElement("div", __assign({}, props, { style: style, className: getElmntClass(props.className) }), mapChildren(children, function (child, i, first) { return (React.createElement(Div, { key: i, style: { paddingTop: first ? 0 : spacing[0] } }, child)); })));
};
exports.default = Div;
