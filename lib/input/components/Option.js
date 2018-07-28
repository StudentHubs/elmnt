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
var txt_1 = require("../../txt");
var utils_1 = require("../../utils");
var Marker_1 = require("./Marker");
exports.default = refluent_1.default
    .do('isSelected', 'isList', 'style.layout', function (isSelected, isList, layout) { return ({
    icon: isSelected && (isList || layout === 'modal' ? 'tick' : 'disc'),
}); })
    .do(utils_1.restyle('isList', function (isList, style) {
    var _a;
    var base = style
        .merge(!isList ? { borderRadius: 1000 } : {})
        .scale({ iconSize: { fontSize: 0.9 } })
        .numeric('paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft');
    var padded = base.layout !== 'modal'
        ? base.merge({
            padding: Math.round((base.paddingTop +
                base.paddingRight +
                base.paddingBottom +
                base.paddingLeft) *
                0.25),
        })
        : base;
    return {
        div: padded.filter('padding', 'background').merge(__assign({ cursor: 'pointer', userSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none', WebkitUserSelect: 'none' }, (padded.layout !== 'modal' && padded.layout !== 'table'
            ? { background: 'none', padding: 0 }
            : {}), (padded.layout === 'modal' ? { width: '100%' } : {}), (padded.layout === 'table' ? { background: 'none' } : {}))),
        bar: padded
            .scale({
            spacing: padded.layout !== 'modal'
                ? { fontSize: 0.5 }
                : { paddingRight: 1 },
        })
            .filter('spacing')
            .merge({
            layout: 'bar',
            margin: padded.layout === 'table' && '0 auto',
        }),
        icon: (_a = padded
            .scale(__assign({ fontSize: { iconSize: 1 } }, (padded.layout !== 'modal' ? { padding: 0.4 } : {})))
            .scale({
            width: __assign({ iconSize: 1 }, (padded.layout !== 'modal'
                ? {
                    paddingLeft: 1,
                    paddingRight: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                }
                : {})),
        })).filter.apply(_a, __spread(['fontSize',
            'color',
            'background',
            'width'], (padded.layout !== 'modal'
            ? ['padding', 'border', 'borderRadius', 'boxShadow']
            : []))),
        text: padded.filter.apply(padded, __spread(css_1.default.groups.text)),
    };
}))
    .yield(function (_a) {
    var text = _a.text, icon = _a.icon, style = _a.style;
    return (React.createElement("div", { style: style.div },
        React.createElement(div_1.default, { style: style.bar },
            React.createElement(Marker_1.default, { type: icon, style: style.icon }),
            text && React.createElement(txt_1.default, { style: style.text }, text))));
});
