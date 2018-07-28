"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var refluent_1 = require("refluent");
exports.default = refluent_1.default.do('value', 'label', 'options', 'onChange', function (value, label, _a, onChange) {
    var on = _a.on, _b = _a.off, off = _b === void 0 ? null : _b;
    var selectIndex = function () { return onChange(value === on ? off : on); };
    return {
        activeIndex: 0,
        selected: { 0: value === on },
        isList: true,
        labels: [label],
        labelIndices: [0],
        selectIndex: selectIndex,
        onKeyDown: function (event) {
            if (event.keyCode === 13 || event.keyCode === 32) {
                selectIndex();
                event.preventDefault();
            }
        },
    };
});
