"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = require("./Parser");
var parsers = {};
parsers.string = new Parser_1.default(function (text) { return ({ value: text }); });
parsers.stringlist = new Parser_1.default(function (text) { return ({ value: text.split('\n').map(function (s) { return s || null; }) }); }, { format: function (value) { return value.map(function (s) { return s || ''; }).join('\n'); } });
parsers.int = new Parser_1.default(function (text) {
    var t = text.replace(/[^\d]/g, '');
    return { value: t ? parseInt(t, 10) : null, text: t };
});
var formatFloat = function (value, _a) {
    var _b = _a.point, point = _b === void 0 ? false : _b, _c = _a.zeros, zeros = _c === void 0 ? 0 : _c;
    return "" + (value === null ? '' : "" + value) + (point ? '.' : '') + Array(zeros + 1).join('0');
};
parsers.float = new Parser_1.default(function (text) {
    var cleanValue = (text || '')
        .replace(/[^\d\.]/g, '')
        .replace(/\.+/g, '.');
    if (cleanValue) {
        var config = {};
        var pointPosition = cleanValue.indexOf('.');
        if (pointPosition === cleanValue.length - 1) {
            config.point = true;
        }
        else if (pointPosition !== -1) {
            config.point = !!cleanValue.match(/\.0+\.?$/);
            config.zeros = ((cleanValue.match(/(0+)\.?$/) || [])[1] || []).length;
        }
        var value = parseFloat("0" + cleanValue);
        return { value: value, config: config, text: formatFloat(value, config) };
    }
    return { value: null, text: '' };
}, {
    format: formatFloat,
});
var padString = function (s, pad) { return (pad && !s[1] ? "0" + s : s); };
parsers.date = new Parser_1.default(function (text, _a) {
    var noDay = _a.noDay;
    var v = text.replace(/[^\d\/]/g, '');
    var dateSplit = v.split('/');
    if (dateSplit.length === (noDay ? 2 : 3)) {
        var _b = __read(noDay
            ? ['01', dateSplit[0], dateSplit[1]]
            : dateSplit, 3), dStr = _b[0], mStr = _b[1], yStr = _b[2];
        var dd = +dStr;
        var mm = +mStr - 1;
        var yy = +yStr;
        if (yStr.length === 2)
            yy += yy < 30 ? 2000 : 1900;
        var config = {
            padDate: dStr.length >= 2,
            padMonth: mStr.length >= 2,
            fullYear: yStr.length >= 4,
        };
        var date = new Date(yy, mm, dd);
        if (date.getDate() === dd &&
            date.getMonth() === mm &&
            date.getFullYear() === yy &&
            yy > 999 &&
            yy < 2100) {
            return { value: date, config: config, text: v };
        }
    }
    return { value: null, text: v };
}, {
    format: function (value, _a, _b) {
        var _c = _a.padDate, padDate = _c === void 0 ? true : _c, _d = _a.padMonth, padMonth = _d === void 0 ? true : _d, _e = _a.fullYear, fullYear = _e === void 0 ? false : _e;
        var noDay = _b.noDay;
        var dd = padString(value.getDate().toString(), padDate);
        var mm = padString((value.getMonth() + 1).toString(), padMonth);
        var yy = value.getFullYear().toString();
        if (!fullYear) {
            yy = yy.substring(2);
        }
        return noDay ? mm + "/" + yy : dd + "/" + mm + "/" + yy;
    },
    equals: function (a, b) { return a.getTime() === b.getTime(); },
});
exports.default = parsers;
