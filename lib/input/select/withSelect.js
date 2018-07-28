"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var refluent_1 = require("refluent");
var undefToNull = function (v) { return (v === undefined ? null : v); };
var mod = function (a, b) { return ((a % b) + b) % b; };
var modMove = function (start, delta, max) {
    if (start >= 0)
        return mod(start + delta, max);
    return mod(delta > 0 ? delta - 1 : delta, max);
};
exports.default = refluent_1.default
    .do(function (props$, push) {
    var isOpening = { value: false, timeout: null };
    var isScrolling = false;
    var scrollElem = null;
    var setIsOpen = function (isOpen) {
        if (isOpen)
            props$().onMouseDown();
        isOpening.value = isOpen;
        if (!isOpen)
            clearTimeout(isOpening.timeout);
        isOpening.timeout = isOpen
            ? setTimeout(function () { return (isOpening.value = false); }, 400)
            : null;
        push({ isOpen: isOpen });
    };
    var setScrollElem = function (elem) {
        var _a = props$(), isList = _a.isList, value = _a.value, options = _a.options, style = _a.style;
        scrollElem = elem;
        if (isList ? value && value.length > 0 : value) {
            var index = options.indexOf(isList ? value[0] : value);
            push({ activeIndex: index });
            scrollToIndex(index, parseFloat(style.fontSize) * 0.5);
        }
    };
    var scrollToIndex = function (index, padding) {
        if (scrollElem) {
            if (!scrollElem.offsetHeight) {
                setTimeout(function () { return scrollToIndex(index, padding); });
            }
            else {
                var item = scrollElem.querySelector("[data-modal-index=\"" + index + "\"]");
                var top_1 = item.offsetTop - padding;
                var bottom = top_1 + item.offsetHeight + padding * 2;
                if (top_1 < scrollElem.scrollTop) {
                    scrollElem.scrollTop = top_1;
                }
                if (bottom > scrollElem.scrollTop + scrollElem.offsetHeight) {
                    scrollElem.scrollTop = bottom - scrollElem.offsetHeight;
                }
            }
        }
    };
    var selectIndex = function (index) {
        var _a = props$(), isList = _a.isList, value = _a.value, onChange = _a.onChange, options = _a.options;
        if (!isOpening.value) {
            push({ activeIndex: index });
            if (!isList) {
                onChange(undefToNull(options[index]));
            }
            else {
                var newValue = options.filter(function (o, i) {
                    return i === index
                        ? !(value || []).includes(o)
                        : (value || []).includes(o);
                });
                onChange(newValue.length > 0 ? newValue : null);
            }
            if (!isList)
                setIsOpen(false);
        }
    };
    var moveActiveIndex = function (move, jumpTo) {
        var _a = props$(), isList = _a.isList, options = _a.options, style = _a.style;
        var activeIndex = props$(true).activeIndex;
        if (move === undefined) {
            selectIndex(activeIndex);
        }
        else {
            if (isScrolling && jumpTo) {
                isScrolling = false;
            }
            else {
                var newActiveIndex = jumpTo
                    ? move
                    : modMove(activeIndex, move, options.length);
                if (!isList && style.layout !== 'modal')
                    selectIndex(newActiveIndex);
                else
                    push({ activeIndex: newActiveIndex });
                if (style.layout === 'modal')
                    isScrolling = true;
                scrollToIndex(newActiveIndex, parseFloat(style.fontSize) * 0.5);
            }
        }
    };
    var onKeyDown = function (event) {
        var _a = props$(), isList = _a.isList, style = _a.style;
        var isOpen = props$(true).isOpen;
        if (style.layout === 'modal' && !isOpen) {
            if (event.keyCode === 13 || event.keyCode === 32) {
                setIsOpen(true);
                event.preventDefault();
            }
        }
        else {
            if (event.keyCode === 13 || event.keyCode === 32) {
                moveActiveIndex();
                if (!isList)
                    setIsOpen(false);
                event.preventDefault();
            }
            else if (event.keyCode === 37 || event.keyCode === 38) {
                moveActiveIndex(-1);
                event.preventDefault();
            }
            else if (event.keyCode === 39 || event.keyCode === 40) {
                moveActiveIndex(1);
                event.preventDefault();
            }
            else if (event.keyCode === 9 || event.keyCode === 27) {
                setIsOpen(false);
            }
        }
        if (event.keyCode === 13) {
            event.stopPropagation();
        }
    };
    return {
        activeIndex: 0,
        isOpen: false,
        selectIndex: selectIndex,
        moveActiveIndex: moveActiveIndex,
        onKeyDown: onKeyDown,
        openModal: function () { return setIsOpen(true); },
        closeModal: function () { return setIsOpen(false); },
        setScrollElem: setScrollElem,
    };
})
    .do('isList', 'value', 'options', 'labels', function (isList, value, options, labels) {
    var newLabels = (labels || options || []).map(function (o) { return (o === null ? '-- None --' : o.toString()); });
    var labelIndices = [];
    var labelIndex = 0;
    var filteredLabels = newLabels.filter(function (l) {
        var group = typeof l === 'string' && l[0] === '~';
        labelIndices.push(group ? -1 : labelIndex);
        if (!group)
            labelIndex++;
        return !group;
    });
    return {
        labels: newLabels,
        labelIndices: labelIndices,
        labelText: !isList
            ? filteredLabels[options.indexOf(value)] || ''
            : filteredLabels
                .filter(function (_, i) { return (value || []).includes(options[i]); })
                .join(', '),
        selected: !isList
            ? options.indexOf(value)
            : (value || []).reduce(function (result, v) {
                var _a;
                return (__assign({}, result, (_a = {}, _a[options.indexOf(v)] = true, _a)));
            }, {}),
    };
});
