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
var hover_1 = require("../../hover");
var txt_1 = require("../../txt");
var utils_1 = require("../../utils");
var Marker_1 = require("./Marker");
exports.default = refluent_1.default
    .do(utils_1.restyle(function (style) {
    var base = style
        .numeric('fontSize')
        .scale({ iconSize: { fontSize: 1 } });
    return {
        div: base.filter.apply(base, __spread(css_1.default.groups.box, css_1.default.groups.other)),
        bar: {
            layout: 'bar',
            spacing: 0,
            width: base.display === 'inline-block' ? 'auto' : '100%',
            cursor: base.cursor || 'pointer',
        },
        icon: base.filter('color').merge({
            fontSize: base.iconSize,
            paddingTop: (base.fontSize - base.iconSize) * 0.5,
            paddingBottom: (base.fontSize - base.iconSize) * 0.5,
        }),
        iconHover: base
            .scale({ padding: 0.5, margin: { padding: -0.5 } })
            .filter('padding', 'margin'),
        iconLeft: base
            .scale({
            paddingRight: { fontSize: 0.4 },
            width: { iconSize: 1, fontSize: 0.4 },
        })
            .filter('paddingRight', 'width'),
        iconRight: base
            .scale({
            paddingLeft: { fontSize: 1 },
            width: { iconSize: 1, fontSize: 1 },
        })
            .filter('paddingLeft', 'width'),
        text: base.filter.apply(base, __spread(css_1.default.groups.text)),
    };
}))
    .yield(function (_a) {
    var text = _a.text, iconLeft = _a.iconLeft, iconRight = _a.iconRight, placeholder = _a.placeholder, prompt = _a.prompt, rows = _a.rows, password = _a.password, tab = _a.tab, spellCheck = _a.spellCheck, onTextChange = _a.onTextChange, onClickLeft = _a.onClickLeft, onClickRight = _a.onClickRight, focusProps = _a.focusProps, setFocusElem = _a.setFocusElem, setBaseElem = _a.setBaseElem, style = _a.style;
    return (React.createElement("div", { style: style.div, ref: setBaseElem },
        React.createElement(div_1.default, { style: style.bar },
            iconLeft &&
                (onClickLeft ? (React.createElement("div", { onMouseDown: onClickLeft, style: style.iconLeft },
                    React.createElement(hover_1.default, { style: style.iconHover, styleKey: "icon" }, function (_a) {
                        var hoverProps = _a.hoverProps, divStyle = _a.style;
                        return (React.createElement("div", __assign({}, hoverProps, { style: divStyle }),
                            React.createElement(Marker_1.default, { type: iconLeft, style: style.icon })));
                    }))) : (React.createElement("div", { style: style.iconLeft },
                    React.createElement(Marker_1.default, { type: iconLeft, style: style.icon })))),
            onTextChange ? (React.createElement(txt_1.TxtInput, __assign({ onTextChange: onTextChange }, focusProps, { setFocusElem: setFocusElem, placeholder: placeholder, prompt: prompt, rows: rows, password: password, tab: tab, spellCheck: spellCheck, style: style.text, children: text }))) : (React.createElement(txt_1.default, { placeholder: placeholder, style: style.text, children: text })),
            iconRight &&
                (onClickRight ? (React.createElement("div", { onMouseDown: onClickRight, style: style.iconRight },
                    React.createElement(hover_1.default, { style: style.iconHover, styleKey: "icon" }, function (_a) {
                        var hoverProps = _a.hoverProps, divStyle = _a.style;
                        return (React.createElement("div", __assign({}, hoverProps, { style: divStyle }),
                            React.createElement(Marker_1.default, { type: iconRight, style: style.icon })));
                    }))) : (React.createElement("div", { style: style.iconRight },
                    React.createElement(Marker_1.default, { type: iconRight, style: style.icon })))))));
});
