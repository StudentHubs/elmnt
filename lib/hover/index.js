"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var refluent_1 = require("refluent");
var utils_1 = require("../utils");
exports.default = refluent_1.default
    .transform(function (C) { return (C.displayName = 'Hover') && C; })
    .do(utils_1.watchHover)
    .do(utils_1.restyle('isHovered', 'styleKey', function (isHovered, styleKey, style) {
    if (styleKey === void 0) { styleKey = 'hover'; }
    var _a;
    return style.mergeKeys((_a = {}, _a[styleKey] = isHovered, _a));
}));
