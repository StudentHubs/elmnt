"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var throttle = require("lodash.throttle");
var elementResizeDetector = require("element-resize-detector");
var resizeDetector = typeof document !== 'undefined'
    ? elementResizeDetector({ strategy: 'scroll' })
    : null;
var getSize = function (elem, bounds) {
    if (!elem)
        return {};
    if (!bounds) {
        return (function (_a) {
            var width = _a.width, height = _a.height;
            return ({ width: width, height: height });
        })(elem.getBoundingClientRect());
    }
    return (function (_a) {
        var top = _a.top, height = _a.height, left = _a.left, width = _a.width;
        return ({ top: top, height: height, left: left, width: width });
    })(elem.getBoundingClientRect());
};
exports.default = (function (onChange, bounds) {
    var sizeElem = null;
    var update = throttle(function (e) {
        if (e === sizeElem)
            onChange(getSize(e, bounds));
    }, 50);
    onChange(getSize(null, bounds));
    var ref = Object.assign(function (elem) {
        if (sizeElem) {
            var temp_1 = sizeElem;
            setTimeout(function () { return resizeDetector.removeListener(temp_1, update); });
        }
        sizeElem = elem;
        if (sizeElem)
            resizeDetector.listenTo(sizeElem, update);
    }, { noCache: true });
    if (!bounds)
        return ref;
    return { ref: ref, update: function () { return update(sizeElem); } };
});
