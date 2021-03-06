"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.default = (function (setElemName, focusName) { return function (C) {
    return /** @class */ (function (_super) {
        __extends(Focusable, _super);
        function Focusable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.focusElem = null;
            _this.focusWait = false;
            _this.setFocusElem = function (elem) {
                _this.focusElem = elem;
                if (_this.focusElem && _this.focusWait) {
                    _this.focusElem.focus();
                    _this.focusWait = false;
                }
                if (_this.props[setElemName])
                    _this.props[setElemName](elem);
            };
            _this.doFocus = function (event) {
                if (_this.focusElem && (event && event.target) !== _this.focusElem) {
                    _this.focusElem.focus();
                    event && event.preventDefault();
                }
                if (_this.props[focusName])
                    _this.props[focusName](event);
            };
            _this.focus = function () {
                return _this.focusElem ? _this.focusElem.focus() : (_this.focusWait = true);
            };
            _this.blur = function () { return _this.focusElem && _this.focusElem.blur(); };
            return _this;
        }
        Focusable.prototype.render = function () {
            var _a, _b;
            return React.createElement(C, __assign({}, this.props, (_a = {}, _a[setElemName] = this.setFocusElem, _a), (focusName ? (_b = {}, _b[focusName] = this.doFocus, _b) : {})));
        };
        return Focusable;
    }(React.Component));
}; });
