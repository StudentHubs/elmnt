"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var refluent_1 = require("refluent");
var utils_1 = require("../utils");
exports.default = refluent_1.default
    .do(utils_1.restyle('rows', function (rows, style) {
    return style.merge({
        visibility: 'hidden',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        minHeight: parseFloat(style.lineHeight) * (rows || 1),
        display: 'block',
        overflow: 'hidden',
    });
}))
    .yield(function (_a) {
    var value = _a.value, rows = _a.rows, style = _a.style;
    return (React.createElement("span", { style: style },
        value || '',
        rows ? '\n' : '',
        "."));
});
