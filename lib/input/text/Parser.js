"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parser = /** @class */ (function () {
    function Parser(parse, options) {
        var _this = this;
        this.baseFormat = function (value) { return "" + value; };
        this.baseEquals = function (a, b) { return a === b; };
        this.format = function (value, config, props) {
            if (value === null)
                return '';
            return _this.baseFormat(value, config, props);
        };
        this.equals = function (a, b) {
            if (a === null || b === null)
                return a === b;
            return _this.baseEquals(a, b);
        };
        this.parse = parse;
        if (options && options.format)
            this.baseFormat = options.format;
        if (options && options.equals)
            this.baseEquals = options.equals;
    }
    return Parser;
}());
exports.default = Parser;
