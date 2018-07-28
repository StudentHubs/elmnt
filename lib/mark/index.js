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
var commonmark = require("commonmark");
var CommonmarkRenderer = require("commonmark-react-renderer");
var refluent_1 = require("refluent");
var css_1 = require("../css");
var div_1 = require("../div");
var txt_1 = require("../txt");
var utils_1 = require("../utils");
var regex = {
    email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    url: /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/gi,
};
var getLinkProps = function (href, domain) {
    var currentDomain = domain || (typeof window !== 'undefined' && window.location.host) || '';
    var _a = __read((href.match(/https?:\/\/([^\/]+)(.*)/) || []).slice(1), 2), hrefDomain = _a[0], hrefPath = _a[1];
    var isExternal = (hrefDomain && hrefDomain !== currentDomain) || href.startsWith('mailto:');
    return __assign({ href: (!isExternal && hrefPath) || href }, (isExternal ? { target: '_blank' } : {}));
};
var parser = new commonmark.Parser();
exports.default = refluent_1.default
    .transform(function (C) { return (C.displayName = 'Mark') && C; })
    .yield(function (_a) {
    var next = _a.next;
    return next(function (props) { return props; }, true);
})
    .do(utils_1.restyle(function (style) {
    var _a, _b, _c;
    var base = style
        .defaults({ fontSize: 16, lineHeight: 1.5, color: 'black' })
        .numeric('fontSize')
        .scale({ lineGap: { fontSize: -1, lineHeight: 1 } });
    var heading = base
        .filter.apply(base, __spread(css_1.default.groups.text.filter(function (k) { return k !== 'font'; }), ['fontStyle',
        'fontVariant',
        'fontWeight',
        'fontStretch',
        'lineHeight',
        'fontFamily'])).defaults({
        fontSize: base.fontSize * 2,
        fontWeight: 'bold',
    })
        .mergeKeys('heading')
        .numeric('fontSize');
    var headingScale = Math.pow(heading.fontSize / base.fontSize, 1 / 4);
    var getHeadingSize = function (pow) {
        return Math.round(base.fontSize * Math.pow(headingScale, pow));
    };
    return {
        div: base
            .filter.apply(base, __spread(css_1.default.groups.box, css_1.default.groups.other)).merge({ layout: 'stack', spacing: Math.round(base.lineGap * 3) }),
        text: base.filter.apply(base, __spread(css_1.default.groups.text)),
        em: (_a = base
            .defaults({ fontStyle: 'italic' })
            .mergeKeys('em')).filter.apply(_a, __spread(css_1.default.groups.text)).merge({ fontSize: 'inherit' }),
        st: (_b = base
            .defaults({ fontWeight: 'bold' })
            .mergeKeys('st')).filter.apply(_b, __spread(css_1.default.groups.text)).merge({ fontSize: 'inherit' }),
        link: (_c = base
            .defaults({ fontWeight: 'bold', textDecoration: 'underline' })
            .mergeKeys('link')).filter.apply(_c, __spread(css_1.default.groups.text)).merge({ fontSize: 'inherit' }),
        h1: heading,
        h2: heading.merge({ fontSize: getHeadingSize(3) }),
        h3: heading.merge({ fontSize: getHeadingSize(2) }),
        h4: heading.merge({ fontSize: getHeadingSize(1) }),
        item: base
            .filter.apply(base, __spread(css_1.default.groups.text)).merge({ padding: Math.round(base.lineGap * 0.5) + "px 0" }),
        list: base
            .filter.apply(base, __spread(css_1.default.groups.text)).scale({ paddingLeft: { fontSize: 2 } })
            .merge({ margin: Math.round(base.lineGap * -0.5) - 1 + "px 0" }),
        image: base.merge({
            display: 'block',
            margin: Math.round(base.lineGap * 0.5) + "px 0",
        }),
        hr: base
            .defaults({
            height: Math.round(base.fontSize * 0.2),
            background: base.color,
            margin: Math.round(base.lineGap * 1) + "px 0",
        })
            .mergeKeys('hr'),
    };
}))
    .do('domain', 'style', function (domain, style) { return ({
    renderer: new CommonmarkRenderer({
        allowedTypes: [
            'text',
            'softbreak',
            'linebreak',
            'emph',
            'strong',
            'link',
            'paragraph',
            'heading',
            'item',
            'list',
            'image',
            'thematic_break',
            'html_block',
        ],
        renderers: {
            softbreak: function (_a) {
                var nodeKey = _a.nodeKey;
                return React.createElement("br", { key: nodeKey });
            },
            emph: function (_a) {
                var nodeKey = _a.nodeKey, children = _a.children;
                return (React.createElement("span", { style: style.em, key: nodeKey }, children));
            },
            strong: function (_a) {
                var nodeKey = _a.nodeKey, children = _a.children;
                return (React.createElement("span", { style: style.st, key: nodeKey }, children));
            },
            link: function (_a) {
                var href = _a.href, nodeKey = _a.nodeKey, children = _a.children;
                return (React.createElement("a", __assign({}, getLinkProps(href, domain), { style: style.link, key: nodeKey }), children));
            },
            paragraph: function (_a) {
                var nodeKey = _a.nodeKey, children = _a.children;
                return (React.createElement(txt_1.default, { style: style.text, key: nodeKey }, children));
            },
            heading: function (_a) {
                var level = _a.level, nodeKey = _a.nodeKey, children = _a.children;
                return (React.createElement(txt_1.default, { style: style["h" + Math.min(level, 4)], key: nodeKey }, children));
            },
            item: function (_a) {
                var nodeKey = _a.nodeKey, children = _a.children;
                return (React.createElement("li", { key: nodeKey },
                    React.createElement(txt_1.default, { style: style.item }, children)));
            },
            list: function (_a) {
                var type = _a.type, start = _a.start, nodeKey = _a.nodeKey, children = _a.children;
                return (React.createElement("div", { style: { padding: '1px 0' } }, React.createElement(type.toLowerCase() === 'bullet' ? 'ul' : 'ol', {
                    start: start !== null ? start : undefined,
                    style: __assign({}, style.list, { listStyleType: type.toLowerCase() === 'bullet' ? 'disc' : 'decimal' }),
                    key: nodeKey,
                }, children)));
            },
            image: function (_a) {
                var src = _a.src, alt = _a.alt, nodeKey = _a.nodeKey;
                return (React.createElement("img", { src: src, alt: alt, style: style.image, key: nodeKey }));
            },
            thematic_break: function (_a) {
                var nodeKey = _a.nodeKey;
                return React.createElement("div", { style: style.hr, key: nodeKey });
            },
        },
        softBreak: 'br',
    }),
}); })
    .yield(function (_a) {
    var style = _a.style, renderer = _a.renderer, children = _a.children;
    return (React.createElement(div_1.default, { style: style.div }, renderer.render(parser.parse((children || '').replace(regex.url, function (match, i) {
        var end = match.length -
            match
                .split('')
                .reverse()
                .findIndex(function (c) { return !'.,!?\'":;-)]'.includes(c); });
        var m = match.slice(0, end);
        var pre = (children || '').substring(0, i).trim();
        var post = (children || '').substring(i + m.length).trim();
        if ((pre.slice(-2) === '](' && post[0] === ')') ||
            (pre.slice(-1) === '"' && post[0] === '"')) {
            return match;
        }
        return "[" + m + "](" + (regex.email.test(m) ? 'mailto:' : '') + m + ")" + match.slice(end);
    })))));
});
