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
exports.default = (function (_a) {
    var viewBox = _a.viewBox, path = _a.path, style = _a.style, props = __rest(_a, ["viewBox", "path", "style"]);
    var size = (style && (style.width || style.fontSize)) || 16;
    if (!path) {
        return (React.createElement("span", __assign({ style: __assign({}, style, { display: 'block', width: 'auto', height: 'auto' }), className: "e5 e6 e7 e8 e9" }, props),
            React.createElement("span", { style: { display: 'block', width: size, height: size } })));
    }
    return (React.createElement("span", __assign({ style: __assign({}, style, { display: 'block', width: 'auto', height: 'auto' }), className: "e5 e6 e7 e8 e9" }, props),
        React.createElement("svg", { width: size, height: size, style: { display: 'block', width: size, height: size }, viewBox: viewBox },
            React.createElement("path", { style: { fill: (style && style.color) || 'black' }, d: path }))));
});
