"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var refluent_1 = require("refluent");
var css_1 = require("../../css");
var div_1 = require("../../div");
var txt_1 = require("../../txt");
var utils_1 = require("../../utils");
var Label_1 = require("../components/Label");
var checkFile_1 = require("./checkFile");
var uploaders_1 = require("./uploaders");
var hiddenStyle = {
    position: 'fixed',
    bottom: '200%',
    right: '200%',
};
var fileIcons = {
    doc: '-txt',
    docx: '-txt',
    txt: '-txt',
    pdf: '-pdf',
    png: '-img',
    jpg: '-img',
    jpeg: '-img',
};
var counter = 0;
exports.default = refluent_1.default
    .do(function (props$, push) {
    var form;
    var input;
    var focusOnReset = false;
    var successful = false;
    var prevValue;
    push({
        fileName: null,
        formInfo: null,
        resetDOM: false,
        uploadIndex: counter++,
    });
    var resetForm = function () {
        focusOnReset = document.activeElement === input;
        push({ fileName: null, formInfo: null, resetDOM: true }, function () {
            return push({ resetDOM: false });
        });
    };
    props$('value', function (value, commit) {
        if (commit) {
            var fileName = props$(true).fileName;
            if (value || !fileName)
                resetForm();
        }
    });
    var setValue = function (newValue) {
        var _a = props$(), value = _a.value, onChange = _a.onChange;
        push({ fileName: null });
        if (newValue !== value)
            onChange(newValue);
        else
            resetForm();
    };
    push({
        onClear: function () { return setValue(null); },
        onClick: function (event) {
            var fileName = props$(true).fileName;
            if (fileName) {
                setValue(prevValue);
                event.preventDefault();
            }
        },
        onChange: function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, value, onChange, config, maxKb, fileType, fileName, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = props$(), value = _a.value, onChange = _a.onChange, config = _a.config, maxKb = _a.maxKb, fileType = _a.fileType;
                        if (!input.value) return [3 /*break*/, 2];
                        if (!checkFile_1.default(input.files, input.value, maxKb, fileType)) return [3 /*break*/, 2];
                        successful = false;
                        prevValue = value;
                        fileName = input.value
                            .split('/')
                            .pop()
                            .split('\\')
                            .pop();
                        push({ fileName: fileName });
                        onChange(null);
                        _b = push;
                        _c = {};
                        return [4 /*yield*/, uploaders_1.default[config.uploader](config, __assign({}, props$(), { uploadIndex: props$(true).uploadIndex }), fileName)];
                    case 1:
                        _b.apply(void 0, [(_c.formInfo = _d.sent(),
                                _c), function () { return form.submit(); }]);
                        _d.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); },
        onFrameLoad: function () {
            var _a = props$(true), fileName = _a.fileName, formInfo = _a.formInfo;
            if (fileName) {
                setTimeout(function () {
                    if (successful) {
                        setValue(formInfo.fileId + ":" + fileName);
                    }
                    else {
                        setValue(prevValue);
                        alert("Upload failed. It's likely that the file you chose is too big, please try again");
                    }
                }, 50);
            }
        },
        onKeyDown: function (event) {
            if (event.keyCode === 13 || event.keyCode === 32) {
                input.click();
                event.preventDefault();
            }
        },
        setFormElem: Object.assign(function (c) { return (form = c); }, { noCache: true }),
        setFocusElem: Object.assign(function (c) {
            var setFocusElem = props$().setFocusElem;
            input = c;
            setFocusElem(c);
            if (input && focusOnReset) {
                input.focus();
                setTimeout(function () { return input && input.focus(); });
                focusOnReset = false;
            }
        }, { noCache: true }),
    });
    var onWindowMessage = function (event) {
        var config = props$().config;
        var uploadIndex = props$(true).uploadIndex;
        if (config.serverUrl.startsWith(event.origin) &&
            event.data === uploadIndex) {
            successful = true;
        }
    };
    if (typeof document !== 'undefined') {
        window.addEventListener('message', onWindowMessage);
        return function () { return window.removeEventListener('message', onWindowMessage); };
    }
})
    .do('value', 'fileName', function (value, fileName) { return ({
    fileName: value ? value.split(/\:(.+)$/)[1] : fileName || '',
    processing: !!fileName,
}); })
    .do(utils_1.restyle('isFocused', 'processing', function (isFocused, processing, style) {
    var _a, _b;
    return ({
        base: style.filter.apply(style, __spread(css_1.default.groups.other)).merge({ cursor: 'pointer' }),
        label: (_a = style
            .mergeKeys({ active: isFocused, processing: processing })).filter.apply(_a, __spread(css_1.default.groups.text, css_1.default.groups.box)).merge({
            borderRightWidth: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
        }),
        button: (_b = style
            .mergeKeys({ active: isFocused, button: true })).filter.apply(_b, __spread(css_1.default.groups.text, css_1.default.groups.box, ['width'])).merge({ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
    });
}))
    .yield(function (_a) {
    var fileName = _a.fileName, processing = _a.processing, uploadIndex = _a.uploadIndex, placeholder = _a.placeholder, formInfo = _a.formInfo, resetDOM = _a.resetDOM, onClear = _a.onClear, onClick = _a.onClick, onChange = _a.onChange, onFrameLoad = _a.onFrameLoad, onKeyDown = _a.onKeyDown, onMouseDown = _a.onMouseDown, setFormElem = _a.setFormElem, setFocusElem = _a.setFocusElem, hoverProps = _a.hoverProps, focusProps = _a.focusProps, style = _a.style;
    return (React.createElement("label", __assign({}, hoverProps, { onMouseDown: onMouseDown, style: style.base, className: "e5 e6 e7 e8 e9" }),
        React.createElement(div_1.default, { style: { layout: 'bar', width: '100%' } },
            React.createElement("div", null,
                React.createElement(Label_1.default, { text: "" + fileName + (processing ? ' (uploading...)' : ''), iconLeft: fileName && "file" + (fileIcons[fileName.split('.').pop()] || ''), iconRight: fileName && !processing && 'cross', onClickRight: onClear, placeholder: placeholder, style: style.label })),
            React.createElement(txt_1.default, { style: style.button }, processing ? 'Cancel' : fileName ? 'Change' : 'Upload')),
        React.createElement("form", { action: formInfo && formInfo.url, method: "POST", encType: "multipart/form-data", target: "iframe:" + uploadIndex, ref: setFormElem },
            formInfo &&
                Object.keys(formInfo.data).map(function (k) { return (React.createElement("input", { type: "hidden", name: k, value: formInfo.data[k], key: k })); }),
            !resetDOM && (React.createElement("input", __assign({ name: "file", type: "file", onChange: onChange, onClick: onClick, onKeyDown: onKeyDown, style: hiddenStyle, id: "file:" + uploadIndex }, focusProps, { ref: setFocusElem })))),
        !resetDOM && (React.createElement("iframe", { style: hiddenStyle, name: "iframe:" + uploadIndex, src: "", onLoad: onFrameLoad, tabIndex: -1 }))));
});
