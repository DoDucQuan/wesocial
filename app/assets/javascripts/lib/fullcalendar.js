! function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "moment"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("moment")) : t(jQuery, moment)
}(function(t, e) {
    function n(t) {
        return V(t, Pt)
    }

    function i(e) {
        var n, i = {
            views: e.views || {}
        };
        return t.each(e, function(e, r) {
            "views" != e && (t.isPlainObject(r) && !/(time|duration|interval)$/i.test(e) && -1 == t.inArray(e, Pt) ? (n = null, t.each(r, function(t, r) {
                /^(month|week|day|default|basic(Week|Day)?|agenda(Week|Day)?)$/.test(t) ? (i.views[t] || (i.views[t] = {}), i.views[t][e] = r) : (n || (n = {}), n[t] = r)
            }), n && (i[e] = n)) : i[e] = r)
        }), i
    }

    function r(t, e) {
        e.left && t.css({
            "border-left-width": 1,
            "margin-left": e.left - 1
        }), e.right && t.css({
            "border-right-width": 1,
            "margin-right": e.right - 1
        })
    }

    function s(t) {
        t.css({
            "margin-left": "",
            "margin-right": "",
            "border-left-width": "",
            "border-right-width": ""
        })
    }

    function o() {
        t("body").addClass("fc-not-allowed")
    }

    function a() {
        t("body").removeClass("fc-not-allowed")
    }

    function l(e, n, i) {
        var r = Math.floor(n / e.length),
            s = Math.floor(n - r * (e.length - 1)),
            o = [],
            a = [],
            l = [],
            c = 0;
        u(e), e.each(function(n, i) {
            var u = n === e.length - 1 ? s : r,
                d = t(i).outerHeight(!0);
            d < u ? (o.push(i), a.push(d), l.push(t(i).height())) : c += d
        }), i && (n -= c, r = Math.floor(n / o.length), s = Math.floor(n - r * (o.length - 1))), t(o).each(function(e, n) {
            var i = e === o.length - 1 ? s : r,
                u = a[e],
                c = i - (u - l[e]);
            u < i && t(n).height(c)
        })
    }

    function u(t) {
        t.height("")
    }

    function c(e) {
        var n = 0;
        return e.find("> span").each(function(e, i) {
            var r = t(i).outerWidth();
            r > n && (n = r)
        }), n++, e.width(n), n
    }

    function d(t, e) {
        return t.height(e).addClass("fc-scroller"), t[0].scrollHeight - 1 > t[0].clientHeight || (h(t), !1)
    }

    function h(t) {
        t.height("").removeClass("fc-scroller")
    }

    function f(e) {
        var n = e.css("position"),
            i = e.parents().filter(function() {
                var e = t(this);
                return /(auto|scroll)/.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
            }).eq(0);
        return "fixed" !== n && i.length ? i : t(e[0].ownerDocument || document)
    }

    function g(t) {
        var e = t.offset();
        return {
            left: e.left,
            right: e.left + t.outerWidth(),
            top: e.top,
            bottom: e.top + t.outerHeight()
        }
    }

    function p(t) {
        var e = t.offset(),
            n = v(t),
            i = e.left + w(t, "border-left-width") + n.left,
            r = e.top + w(t, "border-top-width") + n.top;
        return {
            left: i,
            right: i + t[0].clientWidth,
            top: r,
            bottom: r + t[0].clientHeight
        }
    }

    function v(t) {
        var e = t.innerWidth() - t[0].clientWidth,
            n = {
                left: 0,
                right: 0,
                top: 0,
                bottom: t.innerHeight() - t[0].clientHeight
            };
        return m() && "rtl" == t.css("direction") ? n.left = e : n.right = e, n
    }

    function m() {
        return null === Vt && (Vt = y()), Vt
    }

    function y() {
        var e = t("<div><div/></div>").css({
                position: "absolute",
                top: -1e3,
                left: 0,
                border: 0,
                padding: 0,
                overflow: "scroll",
                direction: "rtl"
            }).appendTo("body"),
            n = e.children().offset().left > e.offset().left;
        return e.remove(), n
    }

    function w(t, e) {
        return parseFloat(t.css(e)) || 0
    }

    function S(t) {
        return 1 == t.which && !t.ctrlKey
    }

    function b(t, e) {
        var n = {
            left: Math.max(t.left, e.left),
            right: Math.min(t.right, e.right),
            top: Math.max(t.top, e.top),
            bottom: Math.min(t.bottom, e.bottom)
        };
        return n.left < n.right && n.top < n.bottom && n
    }

    function E(t, e) {
        return {
            left: Math.min(Math.max(t.left, e.left), e.right),
            top: Math.min(Math.max(t.top, e.top), e.bottom)
        }
    }

    function D(t) {
        return {
            left: (t.left + t.right) / 2,
            top: (t.top + t.bottom) / 2
        }
    }

    function C(t, e) {
        return {
            left: t.left - e.left,
            top: t.top - e.top
        }
    }

    function H(e) {
        var n, i, r = [],
            s = [];
        for ("string" == typeof e ? s = e.split(/\s*,\s*/) : "function" == typeof e ? s = [e] : t.isArray(e) && (s = e), n = 0; n < s.length; n++) "string" == typeof(i = s[n]) ? r.push("-" == i.charAt(0) ? {
            field: i.substring(1),
            order: -1
        } : {
            field: i,
            order: 1
        }) : "function" == typeof i && r.push({
            func: i
        });
        return r
    }

    function T(t, e, n) {
        var i, r;
        for (i = 0; i < n.length; i++)
            if (r = x(t, e, n[i])) return r;
        return 0
    }

    function x(t, e, n) {
        return n.func ? n.func(t, e) : R(t[n.field], e[n.field]) * (n.order || 1)
    }

    function R(e, n) {
        return e || n ? null == n ? -1 : null == e ? 1 : "string" === t.type(e) || "string" === t.type(n) ? String(e).localeCompare(String(n)) : e - n : 0
    }

    function k(t, e) {
        var n, i, r, s, o = t.start,
            a = t.end,
            l = e.start,
            u = e.end;
        if (a > l && o < u) return o >= l ? (n = o.clone(), r = !0) : (n = l.clone(), r = !1), a <= u ? (i = a.clone(), s = !0) : (i = u.clone(), s = !1), {
            start: n,
            end: i,
            isStart: r,
            isEnd: s
        }
    }

    function I(t, n) {
        return e.duration({
            days: t.clone().stripTime().diff(n.clone().stripTime(), "days"),
            ms: t.time() - n.time()
        })
    }

    function F(t, n) {
        return e.duration({
            days: t.clone().stripTime().diff(n.clone().stripTime(), "days")
        })
    }

    function z(t, n, i) {
        return e.duration(Math.round(t.diff(n, i, !0)), i)
    }

    function M(t, e) {
        var n, i, r;
        for (n = 0; n < _t.length && (i = _t[n], !((r = L(i, t, e)) >= 1 && K(r))); n++);
        return i
    }

    function L(t, n, i) {
        return null != i ? i.diff(n, t, !0) : e.isDuration(n) ? n.as(t) : n.end.diff(n.start, t, !0)
    }

    function G(t, e) {
        var n, i;
        return B(t) || B(e) ? t / e : (n = t.asMonths(), i = e.asMonths(), Math.abs(n) >= 1 && K(n) && Math.abs(i) >= 1 && K(i) ? n / i : t.asDays() / e.asDays())
    }

    function B(t) {
        return Boolean(t.hours() || t.minutes() || t.seconds() || t.milliseconds())
    }

    function N(t) {
        return "[object Date]" === Object.prototype.toString.call(t) || t instanceof Date
    }

    function P(t) {
        return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(t)
    }

    function V(t, e) {
        var n, i, r, s, o, a, l = {};
        if (e)
            for (n = 0; n < e.length; n++) {
                for (i = e[n], r = [], s = t.length - 1; s >= 0; s--)
                    if ("object" == typeof(o = t[s][i])) r.unshift(o);
                    else if (void 0 !== o) {
                    l[i] = o;
                    break
                }
                r.length && (l[i] = V(r))
            }
        for (n = t.length - 1; n >= 0; n--) {
            a = t[n];
            for (i in a) i in l || (l[i] = a[i])
        }
        return l
    }

    function O(t) {
        var e = function() {};
        return e.prototype = t, new e
    }

    function _(t, e) {
        for (var n in t) Y(t, n) && (e[n] = t[n])
    }

    function A(t, e) {
        var n, i, r = ["constructor", "toString", "valueOf"];
        for (n = 0; n < r.length; n++) t[i = r[n]] !== Object.prototype[i] && (e[i] = t[i])
    }

    function Y(t, e) {
        return jt.call(t, e)
    }

    function W(e) {
        return /undefined|null|boolean|number|string/.test(t.type(e))
    }

    function j(e, n, i) {
        if (t.isFunction(e) && (e = [e]), e) {
            var r, s;
            for (r = 0; r < e.length; r++) s = e[r].apply(n, i) || s;
            return s
        }
    }

    function Z() {
        for (var t = 0; t < arguments.length; t++)
            if (void 0 !== arguments[t]) return arguments[t]
    }

    function U(t) {
        return (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function q(t) {
        return t.replace(/&.*?;/g, "")
    }

    function $(e) {
        var n = [];
        return t.each(e, function(t, e) {
            null != e && n.push(t + ":" + e)
        }), n.join(";")
    }

    function X(t, e) {
        return t - e
    }

    function K(t) {
        return t % 1 == 0
    }

    function Q(t, e) {
        var n = t[e];
        return function() {
            return n.apply(t, arguments)
        }
    }

    function J(t, e) {
        var n, i, r, s, o = function() {
            var a = +new Date - s;
            a < e && a > 0 ? n = setTimeout(o, e - a) : (n = null, t.apply(r, i), n || (r = i = null))
        };
        return function() {
            r = this, i = arguments, s = +new Date, n || (n = setTimeout(o, e))
        }
    }

    function tt(n, i, r) {
        var s, o, a, l, u = n[0],
            c = 1 == n.length && "string" == typeof u;
        return e.isMoment(u) ? nt(u, l = e.apply(null, n)) : N(u) || void 0 === u ? l = e.apply(null, n) : (s = !1, o = !1, c ? Zt.test(u) ? (n = [u += "-01"], s = !0, o = !0) : (a = Ut.exec(u)) && (s = !a[5], o = !0) : t.isArray(u) && (o = !0), l = i || s ? e.utc.apply(e, n) : e.apply(null, n), s ? (l._ambigTime = !0, l._ambigZone = !0) : r && (o ? l._ambigZone = !0 : c && (l.utcOffset ? l.utcOffset(u) : l.zone(u)))), l._fullCalendar = !0, l
    }

    function et(t, n) {
        var i, r, s = !1,
            o = !1,
            a = t.length,
            l = [];
        for (i = 0; i < a; i++) r = t[i], e.isMoment(r) || (r = Bt.moment.parseZone(r)), s = s || r._ambigTime, o = o || r._ambigZone, l.push(r);
        for (i = 0; i < a; i++) r = l[i], n || !s || r._ambigTime ? o && !r._ambigZone && (l[i] = r.clone().stripZone()) : l[i] = r.clone().stripTime();
        return l
    }

    function nt(t, e) {
        t._ambigTime ? e._ambigTime = !0 : e._ambigTime && (e._ambigTime = !1), t._ambigZone ? e._ambigZone = !0 : e._ambigZone && (e._ambigZone = !1)
    }

    function it(t, e) {
        t.year(e[0] || 0).month(e[1] || 0).date(e[2] || 0).hours(e[3] || 0).minutes(e[4] || 0).seconds(e[5] || 0).milliseconds(e[6] || 0)
    }

    function rt(t, e) {
        return $t.format.call(t, e)
    }

    function st(t, e) {
        return ot(t, dt(e))
    }

    function ot(t, e) {
        var n, i = "";
        for (n = 0; n < e.length; n++) i += at(t, e[n]);
        return i
    }

    function at(t, e) {
        var n, i;
        return "string" == typeof e ? e : (n = e.token) ? Xt[n] ? Xt[n](t) : rt(t, n) : e.maybe && (i = ot(t, e.maybe)).match(/[1-9]/) ? i : ""
    }

    function lt(t, e, n, i, r) {
        var s;
        return t = Bt.moment.parseZone(t), e = Bt.moment.parseZone(e), s = (t.localeData || t.lang).call(t), n = s.longDateFormat(n) || n, i = i || " - ", ut(t, e, dt(n), i, r)
    }

    function ut(t, e, n, i, r) {
        var s, o, a, l, u = t.clone().stripZone(),
            c = e.clone().stripZone(),
            d = "",
            h = "",
            f = "",
            g = "",
            p = "";
        for (o = 0; o < n.length && !1 !== (s = ct(t, e, u, c, n[o])); o++) d += s;
        for (a = n.length - 1; a > o && !1 !== (s = ct(t, e, u, c, n[a])); a--) h = s + h;
        for (l = o; l <= a; l++) f += at(t, n[l]), g += at(e, n[l]);
        return (f || g) && (p = r ? g + i + f : f + i + g), d + p + h
    }

    function ct(t, e, n, i, r) {
        var s, o;
        return "string" == typeof r ? r : !!((s = r.token) && (o = Kt[s.charAt(0)]) && n.isSame(i, o)) && rt(t, s)
    }

    function dt(t) {
        return t in Qt ? Qt[t] : Qt[t] = ht(t)
    }

    function ht(t) {
        for (var e, n = [], i = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; e = i.exec(t);) e[1] ? n.push(e[1]) : e[2] ? n.push({
            maybe: ht(e[2])
        }) : e[3] ? n.push({
            token: e[3]
        }) : e[5] && n.push(e[5]);
        return n
    }

    function ft() {}

    function gt(t, e) {
        var n;
        return Y(e, "constructor") && (n = e.constructor), "function" != typeof n && (n = e.constructor = function() {
            t.apply(this, arguments)
        }), n.prototype = O(t.prototype), _(e, n.prototype), A(e, n.prototype), _(t, n), n
    }

    function pt(t, e) {
        _(e.prototype || e, t.prototype)
    }

    function vt(t, e) {
        return !t && !e || !(!t || !e) && (t.component === e.component && mt(t, e) && mt(e, t))
    }

    function mt(t, e) {
        for (var n in t)
            if (!/^(component|left|right|top|bottom)$/.test(n) && t[n] !== e[n]) return !1;
        return !0
    }

    function yt(t) {
        var e = St(t);
        return "background" === e || "inverse-background" === e
    }

    function wt(t) {
        return "inverse-background" === St(t)
    }

    function St(t) {
        return Z((t.source || {}).rendering, t.rendering)
    }

    function bt(t) {
        var e, n, i = {};
        for (e = 0; e < t.length; e++)(i[(n = t[e])._id] || (i[n._id] = [])).push(n);
        return i
    }

    function Et(t, e) {
        return t.start - e.start
    }

    function Dt(n) {
        var i, r, s, o, a = Bt.dataAttrPrefix;
        return a && (a += "-"), (i = n.data(a + "event") || null) && (null == (r = (i = "object" == typeof i ? t.extend({}, i) : {}).start) && (r = i.time), s = i.duration, o = i.stick, delete i.start, delete i.time, delete i.duration, delete i.stick), null == r && (r = n.data(a + "start")), null == r && (r = n.data(a + "time")), null == s && (s = n.data(a + "duration")), null == o && (o = n.data(a + "stick")), r = null != r ? e.duration(r) : null, s = null != s ? e.duration(s) : null, o = Boolean(o), {
            eventProps: i,
            startTime: r,
            duration: s,
            stick: o
        }
    }

    function Ct(t, e) {
        var n, i;
        for (n = 0; n < e.length; n++)
            if ((i = e[n]).leftCol <= t.rightCol && i.rightCol >= t.leftCol) return !0;
        return !1
    }

    function Ht(t, e) {
        return t.leftCol - e.leftCol
    }

    function Tt(t) {
        var e, n, i, r = [];
        for (e = 0; e < t.length; e++) {
            for (n = t[e], i = 0; i < r.length && kt(n, r[i]).length; i++);
            n.level = i, (r[i] || (r[i] = [])).push(n)
        }
        return r
    }

    function xt(t) {
        var e, n, i, r, s;
        for (e = 0; e < t.length; e++)
            for (n = t[e], i = 0; i < n.length; i++)
                for ((r = n[i]).forwardSegs = [], s = e + 1; s < t.length; s++) kt(r, t[s], r.forwardSegs)
    }

    function Rt(t) {
        var e, n, i = t.forwardSegs,
            r = 0;
        if (void 0 === t.forwardPressure) {
            for (e = 0; e < i.length; e++) Rt(n = i[e]), r = Math.max(r, 1 + n.forwardPressure);
            t.forwardPressure = r
        }
    }

    function kt(t, e, n) {
        n = n || [];
        for (var i = 0; i < e.length; i++) It(t, e[i]) && n.push(e[i]);
        return n
    }

    function It(t, e) {
        return t.bottom > e.top && t.top < e.bottom
    }

    function Ft(e) {
        t.each(ge, function(t, n) {
            null == e[t] && (e[t] = n(e))
        })
    }

    function zt(t) {
        var n = e.localeData || e.langData;
        return n.call(e, t) || n.call(e, "en")
    }

    function Mt(e, n) {
        function i(i) {
            var r = t('<div class="fc-' + i + '"/>'),
                o = n.header[i];
            return o && t.each(o.split(" "), function(i) {
                var o, l = t(),
                    u = !0;
                t.each(this.split(","), function(i, r) {
                    var o, c, d, h, f, g, p, v, m;
                    "title" == r ? (l = l.add(t("<h2>&nbsp;</h2>")), u = !1) : ((o = (e.options.customButtons || {})[r]) ? (d = function(t) {
                        o.click && o.click.call(m[0], t)
                    }, h = "", f = o.text) : (c = e.getViewSpec(r)) ? (d = function() {
                        e.changeView(r)
                    }, a.push(r), h = c.buttonTextOverride, f = c.buttonTextDefault) : e[r] && (d = function() {
                        e[r]()
                    }, h = (e.overrides.buttonText || {})[r], f = n.buttonText[r]), d && (g = o ? o.themeIcon : n.themeButtonIcons[r], p = o ? o.icon : n.buttonIcons[r], v = h ? U(h) : g && n.theme ? "<span class='ui-icon ui-icon-" + g + "'></span>" : p && !n.theme ? "<span class='fc-icon fc-icon-" + p + "'></span>" : U(f), m = t('<button type="button" class="' + ["fc-" + r + "-button", s + "-button", s + "-state-default"].join(" ") + '">' + v + "</button>").click(function(t) {
                        m.hasClass(s + "-state-disabled") || (d(t), (m.hasClass(s + "-state-active") || m.hasClass(s + "-state-disabled")) && m.removeClass(s + "-state-hover"))
                    }).mousedown(function() {
                        m.not("." + s + "-state-active").not("." + s + "-state-disabled").addClass(s + "-state-down")
                    }).mouseup(function() {
                        m.removeClass(s + "-state-down")
                    }).hover(function() {
                        m.not("." + s + "-state-active").not("." + s + "-state-disabled").addClass(s + "-state-hover")
                    }, function() {
                        m.removeClass(s + "-state-hover").removeClass(s + "-state-down")
                    }), l = l.add(m)))
                }), u && l.first().addClass(s + "-corner-left").end().last().addClass(s + "-corner-right").end(), l.length > 1 ? (o = t("<div/>"), u && o.addClass("fc-button-group"), o.append(l), r.append(o)) : r.append(l)
            }), r
        }
        var r = this;
        r.render = function() {
            var e = n.header;
            if (s = n.theme ? "ui" : "fc", e) return o = t("<div class='fc-toolbar'/>").append(i("left")).append(i("right")).append(i("center")).append('<div class="fc-clear"/>')
        }, r.removeElement = function() {
            o.remove(), o = t()
        }, r.updateTitle = function(t) {
            o.find("h2").text(t)
        }, r.activateButton = function(t) {
            o.find(".fc-" + t + "-button").addClass(s + "-state-active")
        }, r.deactivateButton = function(t) {
            o.find(".fc-" + t + "-button").removeClass(s + "-state-active")
        }, r.disableButton = function(t) {
            o.find(".fc-" + t + "-button").attr("disabled", "disabled").addClass(s + "-state-disabled")
        }, r.enableButton = function(t) {
            o.find(".fc-" + t + "-button").removeAttr("disabled").removeClass(s + "-state-disabled")
        }, r.getViewsWithButtons = function() {
            return a
        };
        var s, o = t(),
            a = []
    }

    function Lt(n) {
        function i(e, n) {
            r(e, function(i) {
                var r, s, o, a = t.isArray(e.events);
                if (n == L) {
                    if (i)
                        for (r = 0; r < i.length; r++) s = i[r], (o = a ? s : d(s, e)) && B.push.apply(B, p(o));
                    --G || R(B)
                }
            })
        }

        function r(e, i) {
            var s, o, a = Bt.sourceFetchers;
            for (s = 0; s < a.length; s++) {
                if (!0 === (o = a[s].call(H, e, T.clone(), x.clone(), n.timezone, i))) return;
                if ("object" == typeof o) return void r(o, i)
            }
            var l = e.events;
            if (l) t.isFunction(l) ? (H.pushLoading(), l.call(H, T.clone(), x.clone(), n.timezone, function(t) {
                i(t), H.popLoading()
            })) : t.isArray(l) ? i(l) : i();
            else if (e.url) {
                var u, c = e.success,
                    d = e.error,
                    h = e.complete;
                u = t.isFunction(e.data) ? e.data() : e.data;
                var f = t.extend({}, u || {}),
                    g = Z(e.startParam, n.startParam),
                    p = Z(e.endParam, n.endParam),
                    v = Z(e.timezoneParam, n.timezoneParam);
                g && (f[g] = T.format()), p && (f[p] = x.format()), n.timezone && "local" != n.timezone && (f[v] = n.timezone), H.pushLoading(), t.ajax(t.extend({}, pe, e, {
                    data: f,
                    success: function(e) {
                        e = e || [];
                        var n = j(c, this, arguments);
                        t.isArray(n) && (e = n), i(e)
                    },
                    error: function() {
                        j(d, this, arguments), i()
                    },
                    complete: function() {
                        j(h, this, arguments), H.popLoading()
                    }
                }))
            } else i()
        }

        function s(e) {
            var n, i, r = Bt.sourceNormalizers;
            if (t.isFunction(e) || t.isArray(e) ? n = {
                    events: e
                } : "string" == typeof e ? n = {
                    url: e
                } : "object" == typeof e && (n = t.extend({}, e)), n) {
                for (n.className ? "string" == typeof n.className && (n.className = n.className.split(/\s+/)) : n.className = [], t.isArray(n.events) && (n.origArray = n.events, n.events = t.map(n.events, function(t) {
                        return d(t, n)
                    })), i = 0; i < r.length; i++) r[i].call(H, n);
                return n
            }
        }

        function o(t, e) {
            return t && e && a(t) == a(e)
        }

        function a(t) {
            return ("object" == typeof t ? t.origArray || t.googleCalendarId || t.url || t.events : null) || t
        }

        function l(e) {
            var n = {};
            return t.each(e, function(t, e) {
                u(t) && void 0 !== e && W(e) && (n[t] = e)
            }), n
        }

        function u(t) {
            return !/^_|^(id|allDay|start|end)$/.test(t)
        }

        function c(e) {
            return t.isFunction(e) ? t.grep(B, e) : null != e ? (e += "", t.grep(B, function(t) {
                return t._id == e
            })) : B
        }

        function d(i, r) {
            var s, o, a, l = {};
            if (n.eventDataTransform && (i = n.eventDataTransform(i)), r && r.eventDataTransform && (i = r.eventDataTransform(i)), t.extend(l, i), r && (l.source = r), l._id = i._id || (void 0 === i.id ? "_fc" + ve++ : i.id + ""), i.className ? "string" == typeof i.className ? l.className = i.className.split(/\s+/) : l.className = i.className : l.className = [], s = i.start || i.date, o = i.end, P(s) && (s = e.duration(s)), P(o) && (o = e.duration(o)), i.dow || e.isDuration(s) || e.isDuration(o)) l.start = s ? e.duration(s) : null, l.end = o ? e.duration(o) : null, l._recurring = !0;
            else {
                if (s && !(s = H.moment(s)).isValid()) return !1;
                o && ((o = H.moment(o)).isValid() || (o = null)), void 0 === (a = i.allDay) && (a = Z(r ? r.allDayDefault : void 0, n.allDayDefault)), h(s, o, a, l)
            }
            return l
        }

        function h(t, e, n, i) {
            i.start = t, i.end = e, i.allDay = n, f(i), Gt(i)
        }

        function f(t) {
            g(t), t.end && !t.end.isAfter(t.start) && (t.end = null), t.end || (n.forceEventDuration ? t.end = H.getDefaultEventEnd(t.allDay, t.start) : t.end = null)
        }

        function g(t) {
            null == t.allDay && (t.allDay = !(t.start.hasTime() || t.end && t.end.hasTime())), t.allDay ? (t.start.stripTime(), t.end && t.end.stripTime()) : (t.start.hasTime() || (t.start = H.applyTimezone(t.start.time(0))), t.end && !t.end.hasTime() && (t.end = H.applyTimezone(t.end.time(0))))
        }

        function p(e, n, i) {
            var r, s, o, a, l, u, c, d, f, g = [];
            if (n = n || T, i = i || x, e)
                if (e._recurring) {
                    if (s = e.dow)
                        for (r = {}, o = 0; o < s.length; o++) r[s[o]] = !0;
                    for (a = n.clone().stripTime(); a.isBefore(i);) r && !r[a.day()] || (l = e.start, u = e.end, c = a.clone(), d = null, l && (c = c.time(l)), u && (d = a.clone().time(u)), f = t.extend({}, e), h(c, d, !l && !u, f), g.push(f)), a.add(1, "days")
                } else g.push(e);
            return g
        }

        function v(e, n, i) {
            function r(t, e) {
                return i ? z(t, e, i) : n.allDay ? F(t, e) : I(t, e)
            }
            var s, o, a, l, d, h = {};
            return (n = n || {}).start || (n.start = e.start.clone()), void 0 === n.end && (n.end = e.end ? e.end.clone() : null), null == n.allDay && (n.allDay = e.allDay), f(n), s = {
                start: e._start.clone(),
                end: e._end ? e._end.clone() : H.getDefaultEventEnd(e._allDay, e._start),
                allDay: n.allDay
            }, f(s), o = null !== e._end && null === n.end, a = r(n.start, s.start), l = n.end ? r(n.end, s.end).subtract(a) : null, t.each(n, function(t, e) {
                u(t) && void 0 !== e && (h[t] = e)
            }), d = m(c(e._id), o, n.allDay, a, l, h), {
                dateDelta: a,
                durationDelta: l,
                undo: d
            }
        }

        function m(e, n, i, r, s, o) {
            var a = H.getIsAmbigTimezone(),
                l = [];
            return r && !r.valueOf() && (r = null), s && !s.valueOf() && (s = null), t.each(e, function(e, u) {
                    var c, d;
                    c = {
                        start: u.start.clone(),
                        end: u.end ? u.end.clone() : null,
                        allDay: u.allDay
                    }, t.each(o, function(t) {
                        c[t] = u[t]
                    }), f(d = {
                        start: u._start,
                        end: u._end,
                        allDay: i
                    }), n ? d.end = null : s && !d.end && (d.end = H.getDefaultEventEnd(d.allDay, d.start)), r && (d.start.add(r), d.end && d.end.add(r)), s && d.end.add(s), a && !d.allDay && (r || s) && (d.start.stripZone(), d.end && d.end.stripZone()), t.extend(u, o, d), Gt(u), l.push(function() {
                        t.extend(u, c), Gt(u)
                    })
                }),
                function() {
                    for (var t = 0; t < l.length; t++) l[t]()
                }
        }

        function y(e) {
            var i, r = n.businessHours,
                s = {
                    className: "fc-nonbusiness",
                    start: "09:00",
                    end: "17:00",
                    dow: [1, 2, 3, 4, 5],
                    rendering: "inverse-background"
                },
                o = H.getView();
            return r && (i = t.extend({}, s, "object" == typeof r ? r : {})), i ? (e && (i.start = null, i.end = null), p(d(i), o.start, o.end)) : []
        }

        function w(t, e) {
            var i = e.source || {};
            return b(t, Z(e.constraint, i.constraint, n.eventConstraint), Z(e.overlap, i.overlap, n.eventOverlap), e)
        }

        function S(t) {
            return b(t, n.selectConstraint, n.selectOverlap)
        }

        function b(t, e, n, i) {
            var r, s, o, a, l, u;
            if (null != e) {
                for (r = E(e), s = !1, a = 0; a < r.length; a++)
                    if (D(r[a], t)) {
                        s = !0;
                        break
                    }
                if (!s) return !1
            }
            for (o = H.getPeerEvents(t, i), a = 0; a < o.length; a++)
                if (l = o[a], C(l, t)) {
                    if (!1 === n) return !1;
                    if ("function" == typeof n && !n(l, i)) return !1;
                    if (i) {
                        if (!1 === (u = Z(l.overlap, (l.source || {}).overlap))) return !1;
                        if ("function" == typeof u && !u(i, l)) return !1
                    }
                }
            return !0
        }

        function E(t) {
            return "businessHours" === t ? y() : "object" == typeof t ? p(d(t)) : c(t)
        }

        function D(t, e) {
            var n = t.start.clone().stripZone(),
                i = H.getEventEnd(t).stripZone();
            return e.start >= n && e.end <= i
        }

        function C(t, e) {
            var n = t.start.clone().stripZone(),
                i = H.getEventEnd(t).stripZone();
            return e.start < i && e.end > n
        }
        var H = this;
        H.isFetchNeeded = function(t, e) {
            return !T || t < T || e > x
        }, H.fetchEvents = function(t, e) {
            T = t, x = e, B = [];
            var n = ++L,
                r = M.length;
            G = r;
            for (var s = 0; s < r; s++) i(M[s], n)
        }, H.addEventSource = function(t) {
            var e = s(t);
            e && (M.push(e), G++, i(e, L))
        }, H.removeEventSource = function(e) {
            M = t.grep(M, function(t) {
                return !o(t, e)
            }), B = t.grep(B, function(t) {
                return !o(t.source, e)
            }), R(B)
        }, H.updateEvent = function(t) {
            t.start = H.moment(t.start), t.end ? t.end = H.moment(t.end) : t.end = null, v(t, l(t)), R(B)
        }, H.renderEvent = function(t, e) {
            var n, i, r, s = d(t);
            if (s) {
                for (n = p(s), i = 0; i < n.length; i++)(r = n[i]).source || (e && (k.events.push(r), r.source = k), B.push(r));
                return R(B), n
            }
            return []
        }, H.removeEvents = function(e) {
            var n, i;
            for (null == e ? e = function() {
                    return !0
                } : t.isFunction(e) || (n = e + "", e = function(t) {
                    return t._id == n
                }), B = t.grep(B, e, !0), i = 0; i < M.length; i++) t.isArray(M[i].events) && (M[i].events = t.grep(M[i].events, e, !0));
            R(B)
        }, H.clientEvents = c, H.mutateEvent = v, H.normalizeEventDates = f, H.normalizeEventTimes = g;
        var T, x, R = H.reportEvents,
            k = {
                events: []
            },
            M = [k],
            L = 0,
            G = 0,
            B = [];
        t.each((n.events ? [n.events] : []).concat(n.eventSources || []), function(t, e) {
            var n = s(e);
            n && M.push(n)
        }), H.getBusinessHoursEvents = y, H.isEventSpanAllowed = w, H.isExternalSpanAllowed = function(e, n, i) {
            var r;
            return i && (r = p(d(t.extend({}, i, n)))[0]), r ? w(e, r) : S(e)
        }, H.isSelectionSpanAllowed = S, H.getEventCache = function() {
            return B
        }
    }

    function Gt(t) {
        t._allDay = t.allDay, t._start = t.start.clone(), t._end = t.end ? t.end.clone() : null
    }
    var Bt = t.fullCalendar = {
            version: "2.6.0",
            internalApiVersion: 2
        },
        Nt = Bt.views = {};
    t.fn.fullCalendar = function(e) {
        var n = Array.prototype.slice.call(arguments, 1),
            i = this;
        return this.each(function(r, s) {
            var o, a = t(s),
                l = a.data("fullCalendar");
            "string" == typeof e ? l && t.isFunction(l[e]) && (o = l[e].apply(l, n), r || (i = o), "destroy" === e && a.removeData("fullCalendar")) : l || (l = new ce(a, e), a.data("fullCalendar", l), l.render())
        }), i
    };
    var Pt = ["header", "buttonText", "buttonIcons", "themeButtonIcons"];
    Bt.intersectRanges = k, Bt.applyAll = j, Bt.debounce = J, Bt.isInt = K, Bt.htmlEscape = U, Bt.cssToStr = $, Bt.proxy = Q, Bt.capitaliseFirstLetter = function(t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }, Bt.getOuterRect = g, Bt.getClientRect = p, Bt.getContentRect = function(t) {
        var e = t.offset(),
            n = e.left + w(t, "border-left-width") + w(t, "padding-left"),
            i = e.top + w(t, "border-top-width") + w(t, "padding-top");
        return {
            left: n,
            right: n + t.width(),
            top: i,
            bottom: i + t.height()
        }
    }, Bt.getScrollbarWidths = v;
    var Vt = null;
    Bt.intersectRects = b, Bt.parseFieldSpecs = H, Bt.compareByFieldSpecs = T, Bt.compareByFieldSpec = x, Bt.flexibleCompare = R, Bt.computeIntervalUnit = M, Bt.divideRangeByDuration = function(t, e, n) {
        var i;
        return B(n) ? (e - t) / n : (i = n.asMonths(), Math.abs(i) >= 1 && K(i) ? e.diff(t, "months", !0) / i : e.diff(t, "days", !0) / n.asDays())
    }, Bt.divideDurationByDuration = G, Bt.multiplyDuration = function(t, n) {
        var i;
        return B(t) ? e.duration(t * n) : (i = t.asMonths(), Math.abs(i) >= 1 && K(i) ? e.duration({
            months: i * n
        }) : e.duration({
            days: t.asDays() * n
        }))
    }, Bt.durationHasTime = B;
    var Ot = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        _t = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    Bt.log = function() {
        var t = window.console;
        if (t && t.log) return t.log.apply(t, arguments)
    }, Bt.warn = function() {
        var t = window.console;
        return t && t.warn ? t.warn.apply(t, arguments) : Bt.log.apply(Bt, arguments)
    };
    var At, Yt, Wt, jt = {}.hasOwnProperty,
        Zt = /^\s*\d{4}-\d\d$/,
        Ut = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,
        qt = e.fn,
        $t = t.extend({}, qt);
    Bt.moment = function() {
        return tt(arguments)
    }, Bt.moment.utc = function() {
        var t = tt(arguments, !0);
        return t.hasTime() && t.utc(), t
    }, Bt.moment.parseZone = function() {
        return tt(arguments, !0, !0)
    }, qt.clone = function() {
        var t = $t.clone.apply(this, arguments);
        return nt(this, t), this._fullCalendar && (t._fullCalendar = !0), t
    }, qt.week = qt.weeks = function(t) {
        var e = (this._locale || this._lang)._fullCalendar_weekCalc;
        return null == t && "function" == typeof e ? e(this) : "ISO" === e ? $t.isoWeek.apply(this, arguments) : $t.week.apply(this, arguments)
    }, qt.time = function(t) {
        if (!this._fullCalendar) return $t.time.apply(this, arguments);
        if (null == t) return e.duration({
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds()
        });
        this._ambigTime = !1, e.isDuration(t) || e.isMoment(t) || (t = e.duration(t));
        var n = 0;
        return e.isDuration(t) && (n = 24 * Math.floor(t.asDays())), this.hours(n + t.hours()).minutes(t.minutes()).seconds(t.seconds()).milliseconds(t.milliseconds())
    }, qt.stripTime = function() {
        var t;
        return this._ambigTime || (t = this.toArray(), this.utc(), Yt(this, t.slice(0, 3)), this._ambigTime = !0, this._ambigZone = !0), this
    }, qt.hasTime = function() {
        return !this._ambigTime
    }, qt.stripZone = function() {
        var t, e;
        return this._ambigZone || (t = this.toArray(), e = this._ambigTime, this.utc(), Yt(this, t), this._ambigTime = e || !1, this._ambigZone = !0), this
    }, qt.hasZone = function() {
        return !this._ambigZone
    }, qt.local = function() {
        var t = this.toArray(),
            e = this._ambigZone;
        return $t.local.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, e && Wt(this, t), this
    }, qt.utc = function() {
        return $t.utc.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, this
    }, t.each(["zone", "utcOffset"], function(t, e) {
        $t[e] && (qt[e] = function(t) {
            return null != t && (this._ambigTime = !1, this._ambigZone = !1), $t[e].apply(this, arguments)
        })
    }), qt.format = function() {
        return this._fullCalendar && arguments[0] ? st(this, arguments[0]) : this._ambigTime ? rt(this, "YYYY-MM-DD") : this._ambigZone ? rt(this, "YYYY-MM-DD[T]HH:mm:ss") : $t.format.apply(this, arguments)
    }, qt.toISOString = function() {
        return this._ambigTime ? rt(this, "YYYY-MM-DD") : this._ambigZone ? rt(this, "YYYY-MM-DD[T]HH:mm:ss") : $t.toISOString.apply(this, arguments)
    }, qt.isWithin = function(t, e) {
        var n = et([this, t, e]);
        return n[0] >= n[1] && n[0] < n[2]
    }, qt.isSame = function(t, e) {
        var n;
        return this._fullCalendar ? e ? (n = et([this, t], !0), $t.isSame.call(n[0], n[1], e)) : (t = Bt.moment.parseZone(t), $t.isSame.call(this, t) && Boolean(this._ambigTime) === Boolean(t._ambigTime) && Boolean(this._ambigZone) === Boolean(t._ambigZone)) : $t.isSame.apply(this, arguments)
    }, t.each(["isBefore", "isAfter"], function(t, e) {
        qt[e] = function(t, n) {
            var i;
            return this._fullCalendar ? (i = et([this, t]), $t[e].call(i[0], i[1], n)) : $t[e].apply(this, arguments)
        }
    }), At = "_d" in e() && "updateOffset" in e, Yt = At ? function(t, n) {
        t._d.setTime(Date.UTC.apply(Date, n)), e.updateOffset(t, !1)
    } : it, Wt = At ? function(t, n) {
        t._d.setTime(+new Date(n[0] || 0, n[1] || 0, n[2] || 0, n[3] || 0, n[4] || 0, n[5] || 0, n[6] || 0)), e.updateOffset(t, !1)
    } : it;
    var Xt = {
        t: function(t) {
            return rt(t, "a").charAt(0)
        },
        T: function(t) {
            return rt(t, "A").charAt(0)
        }
    };
    Bt.formatRange = lt;
    var Kt = {
            Y: "year",
            M: "month",
            D: "day",
            d: "day",
            A: "second",
            a: "second",
            T: "second",
            t: "second",
            H: "second",
            h: "second",
            m: "second",
            s: "second"
        },
        Qt = {};
    Bt.Class = ft, ft.extend = function() {
        var t, e, n = arguments.length;
        for (t = 0; t < n; t++) e = arguments[t], t < n - 1 && pt(this, e);
        return gt(this, e || {})
    }, ft.mixin = function(t) {
        pt(this, t)
    };
    var Jt = Bt.Emitter = ft.extend({
            callbackHash: null,
            on: function(t, e) {
                return this.getCallbacks(t).add(e), this
            },
            off: function(t, e) {
                return this.getCallbacks(t).remove(e), this
            },
            trigger: function(t) {
                var e = Array.prototype.slice.call(arguments, 1);
                return this.triggerWith(t, this, e), this
            },
            triggerWith: function(t, e, n) {
                return this.getCallbacks(t).fireWith(e, n), this
            },
            getCallbacks: function(e) {
                var n;
                return this.callbackHash || (this.callbackHash = {}), (n = this.callbackHash[e]) || (n = this.callbackHash[e] = t.Callbacks()), n
            }
        }),
        te = ft.extend({
            isHidden: !0,
            options: null,
            el: null,
            documentMousedownProxy: null,
            margin: 10,
            constructor: function(t) {
                this.options = t || {}
            },
            show: function() {
                this.isHidden && (this.el || this.render(), this.el.show(), this.position(), this.isHidden = !1, this.trigger("show"))
            },
            hide: function() {
                this.isHidden || (this.el.hide(), this.isHidden = !0, this.trigger("hide"))
            },
            render: function() {
                var e = this,
                    n = this.options;
                this.el = t('<div class="fc-popover"/>').addClass(n.className || "").css({
                    top: 0,
                    left: 0
                }).append(n.content).appendTo(n.parentEl), this.el.on("click", ".fc-close", function() {
                    e.hide()
                }), n.autoHide && t(document).on("mousedown", this.documentMousedownProxy = Q(this, "documentMousedown"))
            },
            documentMousedown: function(e) {
                this.el && !t(e.target).closest(this.el).length && this.hide()
            },
            removeElement: function() {
                this.hide(), this.el && (this.el.remove(), this.el = null), t(document).off("mousedown", this.documentMousedownProxy)
            },
            position: function() {
                var e, n, i, r, s, o = this.options,
                    a = this.el.offsetParent().offset(),
                    l = this.el.outerWidth(),
                    u = this.el.outerHeight(),
                    c = t(window),
                    d = f(this.el);
                r = o.top || 0, s = void 0 !== o.left ? o.left : void 0 !== o.right ? o.right - l : 0, d.is(window) || d.is(document) ? (d = c, e = 0, n = 0) : (e = (i = d.offset()).top, n = i.left), e += c.scrollTop(), n += c.scrollLeft(), !1 !== o.viewportConstrain && (r = Math.min(r, e + d.outerHeight() - u - this.margin), r = Math.max(r, e + this.margin), s = Math.min(s, n + d.outerWidth() - l - this.margin), s = Math.max(s, n + this.margin)), this.el.css({
                    top: r - a.top,
                    left: s - a.left
                })
            },
            trigger: function(t) {
                this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        }),
        ee = Bt.CoordCache = ft.extend({
            els: null,
            forcedOffsetParentEl: null,
            origin: null,
            boundingRect: null,
            isHorizontal: !1,
            isVertical: !1,
            lefts: null,
            rights: null,
            tops: null,
            bottoms: null,
            constructor: function(e) {
                this.els = t(e.els), this.isHorizontal = e.isHorizontal, this.isVertical = e.isVertical, this.forcedOffsetParentEl = e.offsetParent ? t(e.offsetParent) : null
            },
            build: function() {
                var t = this.forcedOffsetParentEl || this.els.eq(0).offsetParent();
                this.origin = t.offset(), this.boundingRect = this.queryBoundingRect(), this.isHorizontal && this.buildElHorizontals(), this.isVertical && this.buildElVerticals()
            },
            clear: function() {
                this.origin = null, this.boundingRect = null, this.lefts = null, this.rights = null, this.tops = null, this.bottoms = null
            },
            queryBoundingRect: function() {
                var t = f(this.els.eq(0));
                if (!t.is(document)) return p(t)
            },
            buildElHorizontals: function() {
                var e = [],
                    n = [];
                this.els.each(function(i, r) {
                    var s = t(r),
                        o = s.offset().left,
                        a = s.outerWidth();
                    e.push(o), n.push(o + a)
                }), this.lefts = e, this.rights = n
            },
            buildElVerticals: function() {
                var e = [],
                    n = [];
                this.els.each(function(i, r) {
                    var s = t(r),
                        o = s.offset().top,
                        a = s.outerHeight();
                    e.push(o), n.push(o + a)
                }), this.tops = e, this.bottoms = n
            },
            getHorizontalIndex: function(t) {
                var e, n = this.boundingRect,
                    i = this.lefts,
                    r = this.rights,
                    s = i.length;
                if (!n || t >= n.left && t < n.right)
                    for (e = 0; e < s; e++)
                        if (t >= i[e] && t < r[e]) return e
            },
            getVerticalIndex: function(t) {
                var e, n = this.boundingRect,
                    i = this.tops,
                    r = this.bottoms,
                    s = i.length;
                if (!n || t >= n.top && t < n.bottom)
                    for (e = 0; e < s; e++)
                        if (t >= i[e] && t < r[e]) return e
            },
            getLeftOffset: function(t) {
                return this.lefts[t]
            },
            getLeftPosition: function(t) {
                return this.lefts[t] - this.origin.left
            },
            getRightOffset: function(t) {
                return this.rights[t]
            },
            getRightPosition: function(t) {
                return this.rights[t] - this.origin.left
            },
            getWidth: function(t) {
                return this.rights[t] - this.lefts[t]
            },
            getTopOffset: function(t) {
                return this.tops[t]
            },
            getTopPosition: function(t) {
                return this.tops[t] - this.origin.top
            },
            getBottomOffset: function(t) {
                return this.bottoms[t]
            },
            getBottomPosition: function(t) {
                return this.bottoms[t] - this.origin.top
            },
            getHeight: function(t) {
                return this.bottoms[t] - this.tops[t]
            }
        }),
        ne = Bt.DragListener = ft.extend({
            options: null,
            isListening: !1,
            isDragging: !1,
            originX: null,
            originY: null,
            mousemoveProxy: null,
            mouseupProxy: null,
            subjectEl: null,
            subjectHref: null,
            scrollEl: null,
            scrollBounds: null,
            scrollTopVel: null,
            scrollLeftVel: null,
            scrollIntervalId: null,
            scrollHandlerProxy: null,
            scrollSensitivity: 30,
            scrollSpeed: 200,
            scrollIntervalMs: 50,
            constructor: function(t) {
                t = t || {}, this.options = t, this.subjectEl = t.subjectEl
            },
            mousedown: function(t) {
                S(t) && (t.preventDefault(), this.startListening(t), this.options.distance || this.startDrag(t))
            },
            startListening: function(e) {
                var n;
                this.isListening || (e && this.options.scroll && ((n = f(t(e.target))).is(window) || n.is(document) || (this.scrollEl = n, this.scrollHandlerProxy = J(Q(this, "scrollHandler"), 100), this.scrollEl.on("scroll", this.scrollHandlerProxy))), t(document).on("mousemove", this.mousemoveProxy = Q(this, "mousemove")).on("mouseup", this.mouseupProxy = Q(this, "mouseup")).on("selectstart", this.preventDefault), e ? (this.originX = e.pageX, this.originY = e.pageY) : (this.originX = 0, this.originY = 0), this.isListening = !0, this.listenStart(e))
            },
            listenStart: function(t) {
                this.trigger("listenStart", t)
            },
            mousemove: function(t) {
                var e, n = t.pageX - this.originX,
                    i = t.pageY - this.originY;
                this.isDragging || n * n + i * i >= (e = this.options.distance || 1) * e && this.startDrag(t), this.isDragging && this.drag(n, i, t)
            },
            startDrag: function(t) {
                this.isListening || this.startListening(), this.isDragging || (this.isDragging = !0, this.dragStart(t))
            },
            dragStart: function(t) {
                var e = this.subjectEl;
                this.trigger("dragStart", t), (this.subjectHref = e ? e.attr("href") : null) && e.removeAttr("href")
            },
            drag: function(t, e, n) {
                this.trigger("drag", t, e, n), this.updateScroll(n)
            },
            mouseup: function(t) {
                this.stopListening(t)
            },
            stopDrag: function(t) {
                this.isDragging && (this.stopScrolling(), this.dragStop(t), this.isDragging = !1)
            },
            dragStop: function(t) {
                var e = this;
                this.trigger("dragStop", t), setTimeout(function() {
                    e.subjectHref && e.subjectEl.attr("href", e.subjectHref)
                }, 0)
            },
            stopListening: function(e) {
                this.stopDrag(e), this.isListening && (this.scrollEl && (this.scrollEl.off("scroll", this.scrollHandlerProxy), this.scrollHandlerProxy = null), t(document).off("mousemove", this.mousemoveProxy).off("mouseup", this.mouseupProxy).off("selectstart", this.preventDefault), this.mousemoveProxy = null, this.mouseupProxy = null, this.isListening = !1, this.listenStop(e))
            },
            listenStop: function(t) {
                this.trigger("listenStop", t)
            },
            trigger: function(t) {
                this.options[t] && this.options[t].apply(this, Array.prototype.slice.call(arguments, 1))
            },
            preventDefault: function(t) {
                t.preventDefault()
            },
            computeScrollBounds: function() {
                var t = this.scrollEl;
                this.scrollBounds = t ? g(t) : null
            },
            updateScroll: function(t) {
                var e, n, i, r, s = this.scrollSensitivity,
                    o = this.scrollBounds,
                    a = 0,
                    l = 0;
                o && (e = (s - (t.pageY - o.top)) / s, n = (s - (o.bottom - t.pageY)) / s, i = (s - (t.pageX - o.left)) / s, r = (s - (o.right - t.pageX)) / s, e >= 0 && e <= 1 ? a = e * this.scrollSpeed * -1 : n >= 0 && n <= 1 && (a = n * this.scrollSpeed), i >= 0 && i <= 1 ? l = i * this.scrollSpeed * -1 : r >= 0 && r <= 1 && (l = r * this.scrollSpeed)), this.setScrollVel(a, l)
            },
            setScrollVel: function(t, e) {
                this.scrollTopVel = t, this.scrollLeftVel = e, this.constrainScrollVel(), !this.scrollTopVel && !this.scrollLeftVel || this.scrollIntervalId || (this.scrollIntervalId = setInterval(Q(this, "scrollIntervalFunc"), this.scrollIntervalMs))
            },
            constrainScrollVel: function() {
                var t = this.scrollEl;
                this.scrollTopVel < 0 ? t.scrollTop() <= 0 && (this.scrollTopVel = 0) : this.scrollTopVel > 0 && t.scrollTop() + t[0].clientHeight >= t[0].scrollHeight && (this.scrollTopVel = 0), this.scrollLeftVel < 0 ? t.scrollLeft() <= 0 && (this.scrollLeftVel = 0) : this.scrollLeftVel > 0 && t.scrollLeft() + t[0].clientWidth >= t[0].scrollWidth && (this.scrollLeftVel = 0)
            },
            scrollIntervalFunc: function() {
                var t = this.scrollEl,
                    e = this.scrollIntervalMs / 1e3;
                this.scrollTopVel && t.scrollTop(t.scrollTop() + this.scrollTopVel * e), this.scrollLeftVel && t.scrollLeft(t.scrollLeft() + this.scrollLeftVel * e), this.constrainScrollVel(), this.scrollTopVel || this.scrollLeftVel || this.stopScrolling()
            },
            stopScrolling: function() {
                this.scrollIntervalId && (clearInterval(this.scrollIntervalId), this.scrollIntervalId = null, this.scrollStop())
            },
            scrollHandler: function() {
                this.scrollIntervalId || this.scrollStop()
            },
            scrollStop: function() {}
        }),
        ie = ne.extend({
            component: null,
            origHit: null,
            hit: null,
            coordAdjust: null,
            constructor: function(t, e) {
                ne.call(this, e), this.component = t
            },
            listenStart: function(t) {
                var e, n, i, r = this.subjectEl;
                ne.prototype.listenStart.apply(this, arguments), this.computeCoords(), t ? (i = n = {
                    left: t.pageX,
                    top: t.pageY
                }, r && (i = E(i, e = g(r))), this.origHit = this.queryHit(i.left, i.top), r && this.options.subjectCenter && (this.origHit && (e = b(this.origHit, e) || e), i = D(e)), this.coordAdjust = C(i, n)) : (this.origHit = null, this.coordAdjust = null)
            },
            computeCoords: function() {
                this.component.prepareHits(), this.computeScrollBounds()
            },
            dragStart: function(t) {
                var e;
                ne.prototype.dragStart.apply(this, arguments), (e = this.queryHit(t.pageX, t.pageY)) && this.hitOver(e)
            },
            drag: function(t, e, n) {
                var i;
                ne.prototype.drag.apply(this, arguments), vt(i = this.queryHit(n.pageX, n.pageY), this.hit) || (this.hit && this.hitOut(), i && this.hitOver(i))
            },
            dragStop: function() {
                this.hitDone(), ne.prototype.dragStop.apply(this, arguments)
            },
            hitOver: function(t) {
                var e = vt(t, this.origHit);
                this.hit = t, this.trigger("hitOver", this.hit, e, this.origHit)
            },
            hitOut: function() {
                this.hit && (this.trigger("hitOut", this.hit), this.hitDone(), this.hit = null)
            },
            hitDone: function() {
                this.hit && this.trigger("hitDone", this.hit)
            },
            listenStop: function() {
                ne.prototype.listenStop.apply(this, arguments), this.origHit = null, this.hit = null, this.component.releaseHits()
            },
            scrollStop: function() {
                ne.prototype.scrollStop.apply(this, arguments), this.computeCoords()
            },
            queryHit: function(t, e) {
                return this.coordAdjust && (t += this.coordAdjust.left, e += this.coordAdjust.top), this.component.queryHit(t, e)
            }
        }),
        re = ft.extend({
            options: null,
            sourceEl: null,
            el: null,
            parentEl: null,
            top0: null,
            left0: null,
            mouseY0: null,
            mouseX0: null,
            topDelta: null,
            leftDelta: null,
            mousemoveProxy: null,
            isFollowing: !1,
            isHidden: !1,
            isAnimating: !1,
            constructor: function(e, n) {
                this.options = n = n || {}, this.sourceEl = e, this.parentEl = n.parentEl ? t(n.parentEl) : e.parent()
            },
            start: function(e) {
                this.isFollowing || (this.isFollowing = !0, this.mouseY0 = e.pageY, this.mouseX0 = e.pageX, this.topDelta = 0, this.leftDelta = 0, this.isHidden || this.updatePosition(), t(document).on("mousemove", this.mousemoveProxy = Q(this, "mousemove")))
            },
            stop: function(e, n) {
                function i() {
                    this.isAnimating = !1, r.removeElement(), this.top0 = this.left0 = null, n && n()
                }
                var r = this,
                    s = this.options.revertDuration;
                this.isFollowing && !this.isAnimating && (this.isFollowing = !1, t(document).off("mousemove", this.mousemoveProxy), e && s && !this.isHidden ? (this.isAnimating = !0, this.el.animate({
                    top: this.top0,
                    left: this.left0
                }, {
                    duration: s,
                    complete: i
                })) : i())
            },
            getEl: function() {
                var t = this.el;
                return t || (this.sourceEl.width(), t = this.el = this.sourceEl.clone().css({
                    position: "absolute",
                    visibility: "",
                    display: this.isHidden ? "none" : "",
                    margin: 0,
                    right: "auto",
                    bottom: "auto",
                    width: this.sourceEl.width(),
                    height: this.sourceEl.height(),
                    opacity: this.options.opacity || "",
                    zIndex: this.options.zIndex
                }).appendTo(this.parentEl)), t
            },
            removeElement: function() {
                this.el && (this.el.remove(), this.el = null)
            },
            updatePosition: function() {
                var t, e;
                this.getEl(), null === this.top0 && (this.sourceEl.width(), t = this.sourceEl.offset(), e = this.el.offsetParent().offset(), this.top0 = t.top - e.top, this.left0 = t.left - e.left), this.el.css({
                    top: this.top0 + this.topDelta,
                    left: this.left0 + this.leftDelta
                })
            },
            mousemove: function(t) {
                this.topDelta = t.pageY - this.mouseY0, this.leftDelta = t.pageX - this.mouseX0, this.isHidden || this.updatePosition()
            },
            hide: function() {
                this.isHidden || (this.isHidden = !0, this.el && this.el.hide())
            },
            show: function() {
                this.isHidden && (this.isHidden = !1, this.updatePosition(), this.getEl().show())
            }
        }),
        se = Bt.Grid = ft.extend({
            view: null,
            isRTL: null,
            start: null,
            end: null,
            el: null,
            elsByFill: null,
            externalDragStartProxy: null,
            eventTimeFormat: null,
            displayEventTime: null,
            displayEventEnd: null,
            minResizeDuration: null,
            largeUnit: null,
            constructor: function(t) {
                this.view = t, this.isRTL = t.opt("isRTL"), this.elsByFill = {}, this.externalDragStartProxy = Q(this, "externalDragStart")
            },
            computeEventTimeFormat: function() {
                return this.view.opt("smallTimeFormat")
            },
            computeDisplayEventTime: function() {
                return !0
            },
            computeDisplayEventEnd: function() {
                return !0
            },
            setRange: function(t) {
                this.start = t.start.clone(), this.end = t.end.clone(), this.rangeUpdated(), this.processRangeOptions()
            },
            rangeUpdated: function() {},
            processRangeOptions: function() {
                var t, e, n = this.view;
                this.eventTimeFormat = n.opt("eventTimeFormat") || n.opt("timeFormat") || this.computeEventTimeFormat(), null == (t = n.opt("displayEventTime")) && (t = this.computeDisplayEventTime()), null == (e = n.opt("displayEventEnd")) && (e = this.computeDisplayEventEnd()), this.displayEventTime = t, this.displayEventEnd = e
            },
            spanToSegs: function(t) {},
            diffDates: function(t, e) {
                return this.largeUnit ? z(t, e, this.largeUnit) : I(t, e)
            },
            prepareHits: function() {},
            releaseHits: function() {},
            queryHit: function(t, e) {},
            getHitSpan: function(t) {},
            getHitEl: function(t) {},
            setElement: function(e) {
                var n = this;
                this.el = e, e.on("mousedown", function(e) {
                    t(e.target).is(".fc-event-container *, .fc-more") || t(e.target).closest(".fc-popover").length || n.dayMousedown(e)
                }), this.bindSegHandlers(), this.bindGlobalHandlers()
            },
            removeElement: function() {
                this.unbindGlobalHandlers(), this.el.remove()
            },
            renderSkeleton: function() {},
            renderDates: function() {},
            unrenderDates: function() {},
            bindGlobalHandlers: function() {
                t(document).on("dragstart sortstart", this.externalDragStartProxy)
            },
            unbindGlobalHandlers: function() {
                t(document).off("dragstart sortstart", this.externalDragStartProxy)
            },
            dayMousedown: function(t) {
                var e, n, i = this,
                    r = this.view,
                    s = r.opt("selectable");
                new ie(this, {
                    scroll: r.opt("dragScroll"),
                    dragStart: function() {
                        r.unselect()
                    },
                    hitOver: function(t, r, a) {
                        a && (e = r ? t : null, s && ((n = i.computeSelection(i.getHitSpan(a), i.getHitSpan(t))) ? i.renderSelection(n) : !1 === n && o()))
                    },
                    hitOut: function() {
                        e = null, n = null, i.unrenderSelection(), a()
                    },
                    listenStop: function(t) {
                        e && r.triggerDayClick(i.getHitSpan(e), i.getHitEl(e), t), n && r.reportSelection(n, t), a()
                    }
                }).mousedown(t)
            },
            renderEventLocationHelper: function(t, e) {
                var n = this.fabricateHelperEvent(t, e);
                this.renderHelper(n, e)
            },
            fabricateHelperEvent: function(t, e) {
                var n = e ? O(e.event) : {};
                return n.start = t.start.clone(), n.end = t.end ? t.end.clone() : null, n.allDay = null, this.view.calendar.normalizeEventDates(n), n.className = (n.className || []).concat("fc-helper"), e || (n.editable = !1), n
            },
            renderHelper: function(t, e) {},
            unrenderHelper: function() {},
            renderSelection: function(t) {
                this.renderHighlight(t)
            },
            unrenderSelection: function() {
                this.unrenderHighlight()
            },
            computeSelection: function(t, e) {
                var n = this.computeSelectionSpan(t, e);
                return !(n && !this.view.calendar.isSelectionSpanAllowed(n)) && n
            },
            computeSelectionSpan: function(t, e) {
                var n = [t.start, t.end, e.start, e.end];
                return n.sort(X), {
                    start: n[0].clone(),
                    end: n[3].clone()
                }
            },
            renderHighlight: function(t) {
                this.renderFill("highlight", this.spanToSegs(t))
            },
            unrenderHighlight: function() {
                this.unrenderFill("highlight")
            },
            highlightSegClasses: function() {
                return ["fc-highlight"]
            },
            renderBusinessHours: function() {},
            unrenderBusinessHours: function() {},
            getNowIndicatorUnit: function() {},
            renderNowIndicator: function(t) {},
            unrenderNowIndicator: function() {},
            renderFill: function(t, e) {},
            unrenderFill: function(t) {
                var e = this.elsByFill[t];
                e && (e.remove(), delete this.elsByFill[t])
            },
            renderFillSegEls: function(e, n) {
                var i, r = this,
                    s = this[e + "SegEl"],
                    o = "",
                    a = [];
                if (n.length) {
                    for (i = 0; i < n.length; i++) o += this.fillSegHtml(e, n[i]);
                    t(o).each(function(e, i) {
                        var o = n[e],
                            l = t(i);
                        s && (l = s.call(r, o, l)), l && (l = t(l)).is(r.fillSegTag) && (o.el = l, a.push(o))
                    })
                }
                return a
            },
            fillSegTag: "div",
            fillSegHtml: function(t, e) {
                var n = this[t + "SegClasses"],
                    i = this[t + "SegCss"],
                    r = n ? n.call(this, e) : [],
                    s = $(i ? i.call(this, e) : {});
                return "<" + this.fillSegTag + (r.length ? ' class="' + r.join(" ") + '"' : "") + (s ? ' style="' + s + '"' : "") + " />"
            },
            getDayClasses: function(t) {
                var e = this.view,
                    n = e.calendar.getNow(),
                    i = ["fc-" + Ot[t.day()]];
                return 1 == e.intervalDuration.as("months") && t.month() != e.intervalStart.month() && i.push("fc-other-month"), t.isSame(n, "day") ? i.push("fc-today", e.highlightStateClass) : t < n ? i.push("fc-past") : i.push("fc-future"), i
            }
        });
    se.mixin({
        mousedOverSeg: null,
        isDraggingSeg: !1,
        isResizingSeg: !1,
        isDraggingExternal: !1,
        segs: null,
        renderEvents: function(t) {
            var e, n = [],
                i = [];
            for (e = 0; e < t.length; e++)(yt(t[e]) ? n : i).push(t[e]);
            this.segs = [].concat(this.renderBgEvents(n), this.renderFgEvents(i))
        },
        renderBgEvents: function(t) {
            var e = this.eventsToSegs(t);
            return this.renderBgSegs(e) || e
        },
        renderFgEvents: function(t) {
            var e = this.eventsToSegs(t);
            return this.renderFgSegs(e) || e
        },
        unrenderEvents: function() {
            this.triggerSegMouseout(), this.unrenderFgSegs(), this.unrenderBgSegs(), this.segs = null
        },
        getEventSegs: function() {
            return this.segs || []
        },
        renderFgSegs: function(t) {},
        unrenderFgSegs: function() {},
        renderFgSegEls: function(e, n) {
            var i, r = this.view,
                s = "",
                o = [];
            if (e.length) {
                for (i = 0; i < e.length; i++) s += this.fgSegHtml(e[i], n);
                t(s).each(function(n, i) {
                    var s = e[n],
                        a = r.resolveEventEl(s.event, t(i));
                    a && (a.data("fc-seg", s), s.el = a, o.push(s))
                })
            }
            return o
        },
        fgSegHtml: function(t, e) {},
        renderBgSegs: function(t) {
            return this.renderFill("bgEvent", t)
        },
        unrenderBgSegs: function() {
            this.unrenderFill("bgEvent")
        },
        bgEventSegEl: function(t, e) {
            return this.view.resolveEventEl(t.event, e)
        },
        bgEventSegClasses: function(t) {
            var e = t.event,
                n = e.source || {};
            return ["fc-bgevent"].concat(e.className, n.className || [])
        },
        bgEventSegCss: function(t) {
            var e = this.view,
                n = t.event,
                i = n.source || {};
            return {
                "background-color": n.backgroundColor || n.color || i.backgroundColor || i.color || e.opt("eventBackgroundColor") || e.opt("eventColor")
            }
        },
        businessHoursSegClasses: function(t) {
            return ["fc-nonbusiness", "fc-bgevent"]
        },
        bindSegHandlers: function() {
            var e = this,
                n = this.view;
            t.each({
                mouseenter: function(t, n) {
                    e.triggerSegMouseover(t, n)
                },
                mouseleave: function(t, n) {
                    e.triggerSegMouseout(t, n)
                },
                click: function(t, e) {
                    return n.trigger("eventClick", this, t.event, e)
                },
                mousedown: function(i, r) {
                    t(r.target).is(".fc-resizer") && n.isEventResizable(i.event) ? e.segResizeMousedown(i, r, t(r.target).is(".fc-start-resizer")) : n.isEventDraggable(i.event) && e.segDragMousedown(i, r)
                }
            }, function(n, i) {
                e.el.on(n, ".fc-event-container > *", function(n) {
                    var r = t(this).data("fc-seg");
                    if (r && !e.isDraggingSeg && !e.isResizingSeg) return i.call(this, r, n)
                })
            })
        },
        triggerSegMouseover: function(t, e) {
            this.mousedOverSeg || (this.mousedOverSeg = t, this.view.trigger("eventMouseover", t.el[0], t.event, e))
        },
        triggerSegMouseout: function(t, e) {
            e = e || {}, this.mousedOverSeg && (t = t || this.mousedOverSeg, this.mousedOverSeg = null, this.view.trigger("eventMouseout", t.el[0], t.event, e))
        },
        segDragMousedown: function(t, e) {
            var n, i = this,
                r = this.view,
                s = r.calendar,
                l = t.el,
                u = t.event,
                c = new re(t.el, {
                    parentEl: r.el,
                    opacity: r.opt("dragOpacity"),
                    revertDuration: r.opt("dragRevertDuration"),
                    zIndex: 2
                });
            new ie(r, {
                distance: 5,
                scroll: r.opt("dragScroll"),
                subjectEl: l,
                subjectCenter: !0,
                listenStart: function(t) {
                    c.hide(), c.start(t)
                },
                dragStart: function(e) {
                    i.triggerSegMouseout(t, e), i.segDragStart(t, e), r.hideEvent(u)
                },
                hitOver: function(e, a, l) {
                    t.hit && (l = t.hit), (n = i.computeEventDrop(l.component.getHitSpan(l), e.component.getHitSpan(e), u)) && !s.isEventSpanAllowed(i.eventToSpan(n), u) && (o(), n = null), n && r.renderDrag(n, t) ? c.hide() : c.show(), a && (n = null)
                },
                hitOut: function() {
                    r.unrenderDrag(), c.show(), n = null
                },
                hitDone: function() {
                    a()
                },
                dragStop: function(e) {
                    c.stop(!n, function() {
                        r.unrenderDrag(), r.showEvent(u), i.segDragStop(t, e), n && r.reportEventDrop(u, n, this.largeUnit, l, e)
                    })
                },
                listenStop: function() {
                    c.stop()
                }
            }).mousedown(e)
        },
        segDragStart: function(t, e) {
            this.isDraggingSeg = !0, this.view.trigger("eventDragStart", t.el[0], t.event, e, {})
        },
        segDragStop: function(t, e) {
            this.isDraggingSeg = !1, this.view.trigger("eventDragStop", t.el[0], t.event, e, {})
        },
        computeEventDrop: function(t, e, n) {
            var i, r, s = this.view.calendar,
                o = t.start,
                a = e.start;
            return o.hasTime() === a.hasTime() ? (i = this.diffDates(a, o), n.allDay && B(i) ? (r = {
                start: n.start.clone(),
                end: s.getEventEnd(n),
                allDay: !1
            }, s.normalizeEventTimes(r)) : r = {
                start: n.start.clone(),
                end: n.end ? n.end.clone() : null,
                allDay: n.allDay
            }, r.start.add(i), r.end && r.end.add(i)) : r = {
                start: a.clone(),
                end: null,
                allDay: !a.hasTime()
            }, r
        },
        applyDragOpacity: function(t) {
            var e = this.view.opt("dragOpacity");
            null != e && t.each(function(t, n) {
                n.style.opacity = e
            })
        },
        externalDragStart: function(e, n) {
            var i, r, s = this.view;
            s.opt("droppable") && (i = t((n ? n.item : null) || e.target), r = s.opt("dropAccept"), (t.isFunction(r) ? r.call(i[0], i) : i.is(r)) && (this.isDraggingExternal || this.listenToExternalDrag(i, e, n)))
        },
        listenToExternalDrag: function(t, e, n) {
            var i, r = this,
                s = this.view.calendar,
                l = Dt(t);
            new ie(this, {
                listenStart: function() {
                    r.isDraggingExternal = !0
                },
                hitOver: function(t) {
                    (i = r.computeExternalDrop(t.component.getHitSpan(t), l)) && !s.isExternalSpanAllowed(r.eventToSpan(i), i, l.eventProps) && (o(), i = null), i && r.renderDrag(i)
                },
                hitOut: function() {
                    i = null
                },
                hitDone: function() {
                    a(), r.unrenderDrag()
                },
                dragStop: function() {
                    i && r.view.reportExternalDrop(l, i, t, e, n)
                },
                listenStop: function() {
                    r.isDraggingExternal = !1
                }
            }).startDrag(e)
        },
        computeExternalDrop: function(t, e) {
            var n = {
                start: this.view.calendar.applyTimezone(t.start),
                end: null
            };
            return e.startTime && !n.start.hasTime() && n.start.time(e.startTime), e.duration && (n.end = n.start.clone().add(e.duration)), n
        },
        renderDrag: function(t, e) {},
        unrenderDrag: function() {},
        segResizeMousedown: function(t, e, n) {
            var i, r = this,
                s = this.view,
                l = s.calendar,
                u = t.el,
                c = t.event,
                d = l.getEventEnd(c);
            new ie(this, {
                distance: 5,
                scroll: s.opt("dragScroll"),
                subjectEl: u,
                dragStart: function(e) {
                    r.triggerSegMouseout(t, e), r.segResizeStart(t, e)
                },
                hitOver: function(e, a, u) {
                    var h = r.getHitSpan(u),
                        f = r.getHitSpan(e);
                    (i = n ? r.computeEventStartResize(h, f, c) : r.computeEventEndResize(h, f, c)) && (l.isEventSpanAllowed(r.eventToSpan(i), c) ? i.start.isSame(c.start) && i.end.isSame(d) && (i = null) : (o(), i = null)), i && (s.hideEvent(c), r.renderEventResize(i, t))
                },
                hitOut: function() {
                    i = null
                },
                hitDone: function() {
                    r.unrenderEventResize(), s.showEvent(c), a()
                },
                dragStop: function(e) {
                    r.segResizeStop(t, e), i && s.reportEventResize(c, i, this.largeUnit, u, e)
                }
            }).mousedown(e)
        },
        segResizeStart: function(t, e) {
            this.isResizingSeg = !0, this.view.trigger("eventResizeStart", t.el[0], t.event, e, {})
        },
        segResizeStop: function(t, e) {
            this.isResizingSeg = !1, this.view.trigger("eventResizeStop", t.el[0], t.event, e, {})
        },
        computeEventStartResize: function(t, e, n) {
            return this.computeEventResize("start", t, e, n)
        },
        computeEventEndResize: function(t, e, n) {
            return this.computeEventResize("end", t, e, n)
        },
        computeEventResize: function(t, e, n, i) {
            var r, s, o = this.view.calendar,
                a = this.diffDates(n[t], e[t]);
            return (r = {
                start: i.start.clone(),
                end: o.getEventEnd(i),
                allDay: i.allDay
            }).allDay && B(a) && (r.allDay = !1, o.normalizeEventTimes(r)), r[t].add(a), r.start.isBefore(r.end) || (s = this.minResizeDuration || (i.allDay ? o.defaultAllDayEventDuration : o.defaultTimedEventDuration), "start" == t ? r.start = r.end.clone().subtract(s) : r.end = r.start.clone().add(s)), r
        },
        renderEventResize: function(t, e) {},
        unrenderEventResize: function() {},
        getEventTimeText: function(t, e, n) {
            return null == e && (e = this.eventTimeFormat), null == n && (n = this.displayEventEnd), this.displayEventTime && t.start.hasTime() ? n && t.end ? this.view.formatRange(t, e) : t.start.format(e) : ""
        },
        getSegClasses: function(t, e, n) {
            var i = t.event,
                r = ["fc-event", t.isStart ? "fc-start" : "fc-not-start", t.isEnd ? "fc-end" : "fc-not-end"].concat(i.className, i.source ? i.source.className : []);
            return e && r.push("fc-draggable"), n && r.push("fc-resizable"), r
        },
        getEventSkinCss: function(t) {
            var e = this.view,
                n = t.source || {},
                i = t.color,
                r = n.color,
                s = e.opt("eventColor");
            return {
                "background-color": t.backgroundColor || i || n.backgroundColor || r || e.opt("eventBackgroundColor") || s,
                "border-color": t.borderColor || i || n.borderColor || r || e.opt("eventBorderColor") || s,
                color: t.textColor || n.textColor || e.opt("eventTextColor")
            }
        },
        eventToSegs: function(t) {
            return this.eventsToSegs([t])
        },
        eventToSpan: function(t) {
            return this.eventToSpans(t)[0]
        },
        eventToSpans: function(t) {
            var e = this.eventToRange(t);
            return this.eventRangeToSpans(e, t)
        },
        eventsToSegs: function(e, n) {
            var i = this,
                r = bt(e),
                s = [];
            return t.each(r, function(t, e) {
                var r, o = [];
                for (r = 0; r < e.length; r++) o.push(i.eventToRange(e[r]));
                if (wt(e[0]))
                    for (o = i.invertRanges(o), r = 0; r < o.length; r++) s.push.apply(s, i.eventRangeToSegs(o[r], e[0], n));
                else
                    for (r = 0; r < o.length; r++) s.push.apply(s, i.eventRangeToSegs(o[r], e[r], n))
            }), s
        },
        eventToRange: function(t) {
            return {
                start: t.start.clone().stripZone(),
                end: (t.end ? t.end.clone() : this.view.calendar.getDefaultEventEnd(null != t.allDay ? t.allDay : !t.start.hasTime(), t.start)).stripZone()
            }
        },
        eventRangeToSegs: function(t, e, n) {
            var i, r = this.eventRangeToSpans(t, e),
                s = [];
            for (i = 0; i < r.length; i++) s.push.apply(s, this.eventSpanToSegs(r[i], e, n));
            return s
        },
        eventRangeToSpans: function(e, n) {
            return [t.extend({}, e)]
        },
        eventSpanToSegs: function(t, e, n) {
            var i, r, s = n ? n(t) : this.spanToSegs(t);
            for (i = 0; i < s.length; i++)(r = s[i]).event = e, r.eventStartMS = +t.start, r.eventDurationMS = t.end - t.start;
            return s
        },
        invertRanges: function(t) {
            var e, n, i = this.view,
                r = i.start.clone(),
                s = i.end.clone(),
                o = [],
                a = r;
            for (t.sort(Et), e = 0; e < t.length; e++)(n = t[e]).start > a && o.push({
                start: a,
                end: n.start
            }), a = n.end;
            return a < s && o.push({
                start: a,
                end: s
            }), o
        },
        sortEventSegs: function(t) {
            t.sort(Q(this, "compareEventSegs"))
        },
        compareEventSegs: function(t, e) {
            return t.eventStartMS - e.eventStartMS || e.eventDurationMS - t.eventDurationMS || e.event.allDay - t.event.allDay || T(t.event, e.event, this.view.eventOrderSpecs)
        }
    }), Bt.isBgEvent = yt, Bt.dataAttrPrefix = "";
    var oe = Bt.DayTableMixin = {
            breakOnWeeks: !1,
            dayDates: null,
            dayIndices: null,
            daysPerRow: null,
            rowCnt: null,
            colCnt: null,
            colHeadFormat: null,
            updateDayTable: function() {
                for (var t, e, n, i = this.view, r = this.start.clone(), s = -1, o = [], a = []; r.isBefore(this.end);) i.isHiddenDay(r) ? o.push(s + .5) : (s++, o.push(s), a.push(r.clone())), r.add(1, "days");
                if (this.breakOnWeeks) {
                    for (e = a[0].day(), t = 1; t < a.length && a[t].day() != e; t++);
                    n = Math.ceil(a.length / t)
                } else n = 1, t = a.length;
                this.dayDates = a, this.dayIndices = o, this.daysPerRow = t, this.rowCnt = n, this.updateDayTableCols()
            },
            updateDayTableCols: function() {
                this.colCnt = this.computeColCnt(), this.colHeadFormat = this.view.opt("columnFormat") || this.computeColHeadFormat()
            },
            computeColCnt: function() {
                return this.daysPerRow
            },
            getCellDate: function(t, e) {
                return this.dayDates[this.getCellDayIndex(t, e)].clone()
            },
            getCellRange: function(t, e) {
                var n = this.getCellDate(t, e);
                return {
                    start: n,
                    end: n.clone().add(1, "days")
                }
            },
            getCellDayIndex: function(t, e) {
                return t * this.daysPerRow + this.getColDayIndex(e)
            },
            getColDayIndex: function(t) {
                return this.isRTL ? this.colCnt - 1 - t : t
            },
            getDateDayIndex: function(t) {
                var e = this.dayIndices,
                    n = t.diff(this.start, "days");
                return n < 0 ? e[0] - 1 : n >= e.length ? e[e.length - 1] + 1 : e[n]
            },
            computeColHeadFormat: function() {
                return this.rowCnt > 1 || this.colCnt > 10 ? "ddd" : this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd"
            },
            sliceRangeByRow: function(t) {
                var e, n, i, r, s, o = this.daysPerRow,
                    a = this.view.computeDayRange(t),
                    l = this.getDateDayIndex(a.start),
                    u = this.getDateDayIndex(a.end.clone().subtract(1, "days")),
                    c = [];
                for (e = 0; e < this.rowCnt; e++) i = (n = e * o) + o - 1, r = Math.max(l, n), s = Math.min(u, i), (r = Math.ceil(r)) <= (s = Math.floor(s)) && c.push({
                    row: e,
                    firstRowDayIndex: r - n,
                    lastRowDayIndex: s - n,
                    isStart: r === l,
                    isEnd: s === u
                });
                return c
            },
            sliceRangeByDay: function(t) {
                var e, n, i, r, s, o, a = this.daysPerRow,
                    l = this.view.computeDayRange(t),
                    u = this.getDateDayIndex(l.start),
                    c = this.getDateDayIndex(l.end.clone().subtract(1, "days")),
                    d = [];
                for (e = 0; e < this.rowCnt; e++)
                    for (i = (n = e * a) + a - 1, r = n; r <= i; r++) s = Math.max(u, r), o = Math.min(c, r), (s = Math.ceil(s)) <= (o = Math.floor(o)) && d.push({
                        row: e,
                        firstRowDayIndex: s - n,
                        lastRowDayIndex: o - n,
                        isStart: s === u,
                        isEnd: o === c
                    });
                return d
            },
            renderHeadHtml: function() {
                return '<div class="fc-row ' + this.view.widgetHeaderClass + '"><table><thead>' + this.renderHeadTrHtml() + "</thead></table></div>"
            },
            renderHeadIntroHtml: function() {
                return this.renderIntroHtml()
            },
            renderHeadTrHtml: function() {
                return "<tr>" + (this.isRTL ? "" : this.renderHeadIntroHtml()) + this.renderHeadDateCellsHtml() + (this.isRTL ? this.renderHeadIntroHtml() : "") + "</tr>"
            },
            renderHeadDateCellsHtml: function() {
                var t, e, n = [];
                for (t = 0; t < this.colCnt; t++) e = this.getCellDate(0, t), n.push(this.renderHeadDateCellHtml(e));
                return n.join("")
            },
            renderHeadDateCellHtml: function(t, e, n) {
                return '<th class="fc-day-header ' + this.view.widgetHeaderClass + " fc-" + Ot[t.day()] + '"' + (1 == this.rowCnt ? ' data-date="' + t.format("YYYY-MM-DD") + '"' : "") + (e > 1 ? ' colspan="' + e + '"' : "") + (n ? " " + n : "") + ">" + U(t.format(this.colHeadFormat)) + "</th>"
            },
            renderBgTrHtml: function(t) {
                return "<tr>" + (this.isRTL ? "" : this.renderBgIntroHtml(t)) + this.renderBgCellsHtml(t) + (this.isRTL ? this.renderBgIntroHtml(t) : "") + "</tr>"
            },
            renderBgIntroHtml: function(t) {
                return this.renderIntroHtml()
            },
            renderBgCellsHtml: function(t) {
                var e, n, i = [];
                for (e = 0; e < this.colCnt; e++) n = this.getCellDate(t, e), i.push(this.renderBgCellHtml(n));
                return i.join("")
            },
            renderBgCellHtml: function(t, e) {
                var n = this.view,
                    i = this.getDayClasses(t);
                return i.unshift("fc-day", n.widgetContentClass), '<td class="' + i.join(" ") + '" data-date="' + t.format("YYYY-MM-DD") + '"' + (e ? " " + e : "") + "></td>"
            },
            renderIntroHtml: function() {},
            bookendCells: function(t) {
                var e = this.renderIntroHtml();
                e && (this.isRTL ? t.append(e) : t.prepend(e))
            }
        },
        ae = Bt.DayGrid = se.extend(oe, {
            numbersVisible: !1,
            bottomCoordPadding: 0,
            rowEls: null,
            cellEls: null,
            helperEls: null,
            rowCoordCache: null,
            colCoordCache: null,
            renderDates: function(t) {
                var e, n, i = this.view,
                    r = this.rowCnt,
                    s = this.colCnt,
                    o = "";
                for (e = 0; e < r; e++) o += this.renderDayRowHtml(e, t);
                for (this.el.html(o), this.rowEls = this.el.find(".fc-row"), this.cellEls = this.el.find(".fc-day"), this.rowCoordCache = new ee({
                        els: this.rowEls,
                        isVertical: !0
                    }), this.colCoordCache = new ee({
                        els: this.cellEls.slice(0, this.colCnt),
                        isHorizontal: !0
                    }), e = 0; e < r; e++)
                    for (n = 0; n < s; n++) i.trigger("dayRender", null, this.getCellDate(e, n), this.getCellEl(e, n))
            },
            unrenderDates: function() {
                this.removeSegPopover()
            },
            renderBusinessHours: function() {
                var t = this.view.calendar.getBusinessHoursEvents(!0),
                    e = this.eventsToSegs(t);
                this.renderFill("businessHours", e, "bgevent")
            },
            renderDayRowHtml: function(t, e) {
                var n = ["fc-row", "fc-week", this.view.widgetContentClass];
                return e && n.push("fc-rigid"), '<div class="' + n.join(" ") + '"><div class="fc-bg"><table>' + this.renderBgTrHtml(t) + '</table></div><div class="fc-content-skeleton"><table>' + (this.numbersVisible ? "<thead>" + this.renderNumberTrHtml(t) + "</thead>" : "") + "</table></div></div>"
            },
            renderNumberTrHtml: function(t) {
                return "<tr>" + (this.isRTL ? "" : this.renderNumberIntroHtml(t)) + this.renderNumberCellsHtml(t) + (this.isRTL ? this.renderNumberIntroHtml(t) : "") + "</tr>"
            },
            renderNumberIntroHtml: function(t) {
                return this.renderIntroHtml()
            },
            renderNumberCellsHtml: function(t) {
                var e, n, i = [];
                for (e = 0; e < this.colCnt; e++) n = this.getCellDate(t, e), i.push(this.renderNumberCellHtml(n));
                return i.join("")
            },
            renderNumberCellHtml: function(t) {
                var e;
                return this.view.dayNumbersVisible ? ((e = this.getDayClasses(t)).unshift("fc-day-number"), '<td class="' + e.join(" ") + '" data-date="' + t.format() + '">' + t.date() + "</td>") : "<td/>"
            },
            computeEventTimeFormat: function() {
                return this.view.opt("extraSmallTimeFormat")
            },
            computeDisplayEventEnd: function() {
                return 1 == this.colCnt
            },
            rangeUpdated: function() {
                this.updateDayTable()
            },
            spanToSegs: function(t) {
                var e, n, i = this.sliceRangeByRow(t);
                for (e = 0; e < i.length; e++) n = i[e], this.isRTL ? (n.leftCol = this.daysPerRow - 1 - n.lastRowDayIndex, n.rightCol = this.daysPerRow - 1 - n.firstRowDayIndex) : (n.leftCol = n.firstRowDayIndex, n.rightCol = n.lastRowDayIndex);
                return i
            },
            prepareHits: function() {
                this.colCoordCache.build(), this.rowCoordCache.build(), this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding
            },
            releaseHits: function() {
                this.colCoordCache.clear(), this.rowCoordCache.clear()
            },
            queryHit: function(t, e) {
                var n = this.colCoordCache.getHorizontalIndex(t),
                    i = this.rowCoordCache.getVerticalIndex(e);
                if (null != i && null != n) return this.getCellHit(i, n)
            },
            getHitSpan: function(t) {
                return this.getCellRange(t.row, t.col)
            },
            getHitEl: function(t) {
                return this.getCellEl(t.row, t.col)
            },
            getCellHit: function(t, e) {
                return {
                    row: t,
                    col: e,
                    component: this,
                    left: this.colCoordCache.getLeftOffset(e),
                    right: this.colCoordCache.getRightOffset(e),
                    top: this.rowCoordCache.getTopOffset(t),
                    bottom: this.rowCoordCache.getBottomOffset(t)
                }
            },
            getCellEl: function(t, e) {
                return this.cellEls.eq(t * this.colCnt + e)
            },
            renderDrag: function(t, e) {
                if (this.renderHighlight(this.eventToSpan(t)), e && !e.el.closest(this.el).length) return this.renderEventLocationHelper(t, e), this.applyDragOpacity(this.helperEls), !0
            },
            unrenderDrag: function() {
                this.unrenderHighlight(), this.unrenderHelper()
            },
            renderEventResize: function(t, e) {
                this.renderHighlight(this.eventToSpan(t)), this.renderEventLocationHelper(t, e)
            },
            unrenderEventResize: function() {
                this.unrenderHighlight(), this.unrenderHelper()
            },
            renderHelper: function(e, n) {
                var i, r = [],
                    s = this.eventToSegs(e);
                s = this.renderFgSegEls(s), i = this.renderSegRows(s), this.rowEls.each(function(e, s) {
                    var o, a = t(s),
                        l = t('<div class="fc-helper-skeleton"><table/></div>');
                    o = n && n.row === e ? n.el.position().top : a.find(".fc-content-skeleton tbody").position().top, l.css("top", o).find("table").append(i[e].tbodyEl), a.append(l), r.push(l[0])
                }), this.helperEls = t(r)
            },
            unrenderHelper: function() {
                this.helperEls && (this.helperEls.remove(), this.helperEls = null)
            },
            fillSegTag: "td",
            renderFill: function(e, n, i) {
                var r, s, o, a = [];
                for (n = this.renderFillSegEls(e, n), r = 0; r < n.length; r++) s = n[r], o = this.renderFillRow(e, s, i), this.rowEls.eq(s.row).append(o), a.push(o[0]);
                return this.elsByFill[e] = t(a), n
            },
            renderFillRow: function(e, n, i) {
                var r, s, o = this.colCnt,
                    a = n.leftCol,
                    l = n.rightCol + 1;
                return i = i || e.toLowerCase(), r = t('<div class="fc-' + i + '-skeleton"><table><tr/></table></div>'), s = r.find("tr"), a > 0 && s.append('<td colspan="' + a + '"/>'), s.append(n.el.attr("colspan", l - a)), l < o && s.append('<td colspan="' + (o - l) + '"/>'), this.bookendCells(s), r
            }
        });
    ae.mixin({
        rowStructs: null,
        unrenderEvents: function() {
            this.removeSegPopover(), se.prototype.unrenderEvents.apply(this, arguments)
        },
        getEventSegs: function() {
            return se.prototype.getEventSegs.call(this).concat(this.popoverSegs || [])
        },
        renderBgSegs: function(e) {
            var n = t.grep(e, function(t) {
                return t.event.allDay
            });
            return se.prototype.renderBgSegs.call(this, n)
        },
        renderFgSegs: function(e) {
            var n;
            return e = this.renderFgSegEls(e), n = this.rowStructs = this.renderSegRows(e), this.rowEls.each(function(e, i) {
                t(i).find(".fc-content-skeleton > table").append(n[e].tbodyEl)
            }), e
        },
        unrenderFgSegs: function() {
            for (var t, e = this.rowStructs || []; t = e.pop();) t.tbodyEl.remove();
            this.rowStructs = null
        },
        renderSegRows: function(t) {
            var e, n, i = [];
            for (e = this.groupSegRows(t), n = 0; n < e.length; n++) i.push(this.renderSegRow(n, e[n]));
            return i
        },
        fgSegHtml: function(t, e) {
            var n, i, r = this.view,
                s = t.event,
                o = r.isEventDraggable(s),
                a = !e && s.allDay && t.isStart && r.isEventResizableFromStart(s),
                l = !e && s.allDay && t.isEnd && r.isEventResizableFromEnd(s),
                u = this.getSegClasses(t, o, a || l),
                c = $(this.getEventSkinCss(s)),
                d = "";
            return u.unshift("fc-day-grid-event", "fc-h-event"), t.isStart && (n = this.getEventTimeText(s)) && (d = '<span class="fc-time">' + U(n) + "</span>"), i = '<span class="fc-title">' + (U(s.title || "") || "&nbsp;") + "</span>", '<a class="' + u.join(" ") + '"' + (s.url ? ' href="' + U(s.url) + '"' : "") + (c ? ' style="' + c + '"' : "") + '><div class="fc-content">' + (this.isRTL ? i + " " + d : d + " " + i) + "</div>" + (a ? '<div class="fc-resizer fc-start-resizer" />' : "") + (l ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        },
        renderSegRow: function(e, n) {
            function i(e) {
                for (; o < e;)(c = (m[r - 1] || [])[o]) ? c.attr("rowspan", parseInt(c.attr("rowspan") || 1, 10) + 1) : (c = t("<td/>"), a.append(c)), v[r][o] = c, m[r][o] = c, o++
            }
            var r, s, o, a, l, u, c, d = this.colCnt,
                h = this.buildSegLevels(n),
                f = Math.max(1, h.length),
                g = t("<tbody/>"),
                p = [],
                v = [],
                m = [];
            for (r = 0; r < f; r++) {
                if (s = h[r], o = 0, a = t("<tr/>"), p.push([]), v.push([]), m.push([]), s)
                    for (l = 0; l < s.length; l++) {
                        for (i((u = s[l]).leftCol), c = t('<td class="fc-event-container"/>').append(u.el), u.leftCol != u.rightCol ? c.attr("colspan", u.rightCol - u.leftCol + 1) : m[r][o] = c; o <= u.rightCol;) v[r][o] = c, p[r][o] = u, o++;
                        a.append(c)
                    }
                i(d), this.bookendCells(a), g.append(a)
            }
            return {
                row: e,
                tbodyEl: g,
                cellMatrix: v,
                segMatrix: p,
                segLevels: h,
                segs: n
            }
        },
        buildSegLevels: function(t) {
            var e, n, i, r = [];
            for (this.sortEventSegs(t), e = 0; e < t.length; e++) {
                for (n = t[e], i = 0; i < r.length && Ct(n, r[i]); i++);
                n.level = i, (r[i] || (r[i] = [])).push(n)
            }
            for (i = 0; i < r.length; i++) r[i].sort(Ht);
            return r
        },
        groupSegRows: function(t) {
            var e, n = [];
            for (e = 0; e < this.rowCnt; e++) n.push([]);
            for (e = 0; e < t.length; e++) n[t[e].row].push(t[e]);
            return n
        }
    }), ae.mixin({
        segPopover: null,
        popoverSegs: null,
        removeSegPopover: function() {
            this.segPopover && this.segPopover.hide()
        },
        limitRows: function(t) {
            var e, n, i = this.rowStructs || [];
            for (e = 0; e < i.length; e++) this.unlimitRow(e), !1 !== (n = !!t && ("number" == typeof t ? t : this.computeRowLevelLimit(e))) && this.limitRow(e, n)
        },
        computeRowLevelLimit: function(e) {
            var n, i, r, s = this.rowEls.eq(e).height(),
                o = this.rowStructs[e].tbodyEl.children();
            for (n = 0; n < o.length; n++)
                if (i = o.eq(n).removeClass("fc-limited"), r = 0, i.find("> td > :first-child").each(function(e, n) {
                        r = Math.max(r, t(n).outerHeight())
                    }), i.position().top + r > s) return n;
            return !1
        },
        limitRow: function(e, n) {
            function i(i) {
                for (; E < i;)(u = w.getCellSegs(e, E, n)).length && (h = s[n - 1][E], y = w.renderMoreLink(e, E, u), m = t("<div/>").append(y), h.append(m), b.push(m[0])), E++
            }
            var r, s, o, a, l, u, c, d, h, f, g, p, v, m, y, w = this,
                S = this.rowStructs[e],
                b = [],
                E = 0;
            if (n && n < S.segLevels.length) {
                for (r = S.segLevels[n - 1], s = S.cellMatrix, o = S.tbodyEl.children().slice(n).addClass("fc-limited").get(), a = 0; a < r.length; a++) {
                    for (i((l = r[a]).leftCol), d = [], c = 0; E <= l.rightCol;) u = this.getCellSegs(e, E, n), d.push(u), c += u.length, E++;
                    if (c) {
                        for (f = (h = s[n - 1][l.leftCol]).attr("rowspan") || 1, g = [], p = 0; p < d.length; p++) v = t('<td class="fc-more-cell"/>').attr("rowspan", f), u = d[p], y = this.renderMoreLink(e, l.leftCol + p, [l].concat(u)), m = t("<div/>").append(y), v.append(m), g.push(v[0]), b.push(v[0]);
                        h.addClass("fc-limited").after(t(g)), o.push(h[0])
                    }
                }
                i(this.colCnt), S.moreEls = t(b), S.limitedEls = t(o)
            }
        },
        unlimitRow: function(t) {
            var e = this.rowStructs[t];
            e.moreEls && (e.moreEls.remove(), e.moreEls = null), e.limitedEls && (e.limitedEls.removeClass("fc-limited"), e.limitedEls = null)
        },
        renderMoreLink: function(e, n, i) {
            var r = this,
                s = this.view;
            return t('<a class="fc-more"/>').text(this.getMoreLinkText(i.length)).on("click", function(o) {
                var a = s.opt("eventLimitClick"),
                    l = r.getCellDate(e, n),
                    u = t(this),
                    c = r.getCellEl(e, n),
                    d = r.getCellSegs(e, n),
                    h = r.resliceDaySegs(d, l),
                    f = r.resliceDaySegs(i, l);
                "function" == typeof a && (a = s.trigger("eventLimitClick", null, {
                    date: l,
                    dayEl: c,
                    moreEl: u,
                    segs: h,
                    hiddenSegs: f
                }, o)), "popover" === a ? r.showSegPopover(e, n, u, h) : "string" == typeof a && s.calendar.zoomTo(l, a)
            })
        },
        showSegPopover: function(t, e, n, i) {
            var r, s, o = this,
                a = this.view,
                l = n.parent();
            r = 1 == this.rowCnt ? a.el : this.rowEls.eq(t), s = {
                className: "fc-more-popover",
                content: this.renderSegPopoverContent(t, e, i),
                parentEl: this.el,
                top: r.offset().top,
                autoHide: !0,
                viewportConstrain: a.opt("popoverViewportConstrain"),
                hide: function() {
                    o.segPopover.removeElement(), o.segPopover = null, o.popoverSegs = null
                }
            }, this.isRTL ? s.right = l.offset().left + l.outerWidth() + 1 : s.left = l.offset().left - 1, this.segPopover = new te(s), this.segPopover.show()
        },
        renderSegPopoverContent: function(e, n, i) {
            var r, s = this.view,
                o = s.opt("theme"),
                a = this.getCellDate(e, n).format(s.opt("dayPopoverFormat")),
                l = t('<div class="fc-header ' + s.widgetHeaderClass + '"><span class="fc-close ' + (o ? "ui-icon ui-icon-closethick" : "fc-icon fc-icon-x") + '"></span><span class="fc-title">' + U(a) + '</span><div class="fc-clear"/></div><div class="fc-body ' + s.widgetContentClass + '"><div class="fc-event-container"></div></div>'),
                u = l.find(".fc-event-container");
            for (i = this.renderFgSegEls(i, !0), this.popoverSegs = i, r = 0; r < i.length; r++) this.prepareHits(), i[r].hit = this.getCellHit(e, n), this.releaseHits(), u.append(i[r].el);
            return l
        },
        resliceDaySegs: function(e, n) {
            var i = t.map(e, function(t) {
                    return t.event
                }),
                r = n.clone(),
                s = {
                    start: r,
                    end: r.clone().add(1, "days")
                };
            return e = this.eventsToSegs(i, function(t) {
                var e = k(t, s);
                return e ? [e] : []
            }), this.sortEventSegs(e), e
        },
        getMoreLinkText: function(t) {
            var e = this.view.opt("eventLimitText");
            return "function" == typeof e ? e(t) : "+" + t + " " + e
        },
        getCellSegs: function(t, e, n) {
            for (var i, r = this.rowStructs[t].segMatrix, s = n || 0, o = []; s < r.length;)(i = r[s][e]) && o.push(i), s++;
            return o
        }
    });
    var le = Bt.TimeGrid = se.extend(oe, {
        slotDuration: null,
        snapDuration: null,
        snapsPerSlot: null,
        minTime: null,
        maxTime: null,
        labelFormat: null,
        labelInterval: null,
        colEls: null,
        slatEls: null,
        nowIndicatorEls: null,
        colCoordCache: null,
        slatCoordCache: null,
        constructor: function() {
            se.apply(this, arguments), this.processOptions()
        },
        renderDates: function() {
            this.el.html(this.renderHtml()), this.colEls = this.el.find(".fc-day"), this.slatEls = this.el.find(".fc-slats tr"), this.colCoordCache = new ee({
                els: this.colEls,
                isHorizontal: !0
            }), this.slatCoordCache = new ee({
                els: this.slatEls,
                isVertical: !0
            }), this.renderContentSkeleton()
        },
        renderHtml: function() {
            return '<div class="fc-bg"><table>' + this.renderBgTrHtml(0) + '</table></div><div class="fc-slats"><table>' + this.renderSlatRowHtml() + "</table></div>"
        },
        renderSlatRowHtml: function() {
            for (var t, n, i, r = this.view, s = this.isRTL, o = "", a = e.duration(+this.minTime); a < this.maxTime;) t = this.start.clone().time(a), n = K(G(a, this.labelInterval)), i = '<td class="fc-axis fc-time ' + r.widgetContentClass + '" ' + r.axisStyleAttr() + ">" + (n ? "<span>" + U(t.format(this.labelFormat)) + "</span>" : "") + "</td>", o += '<tr data-time="' + t.format("HH:mm:ss") + '"' + (n ? "" : ' class="fc-minor"') + ">" + (s ? "" : i) + '<td class="' + r.widgetContentClass + '"/>' + (s ? i : "") + "</tr>", a.add(this.slotDuration);
            return o
        },
        processOptions: function() {
            var n, i = this.view,
                r = i.opt("slotDuration"),
                s = i.opt("snapDuration");
            r = e.duration(r), s = s ? e.duration(s) : r, this.slotDuration = r, this.snapDuration = s, this.snapsPerSlot = r / s, this.minResizeDuration = s, this.minTime = e.duration(i.opt("minTime")), this.maxTime = e.duration(i.opt("maxTime")), n = i.opt("slotLabelFormat"), t.isArray(n) && (n = n[n.length - 1]), this.labelFormat = n || i.opt("axisFormat") || i.opt("smallTimeFormat"), n = i.opt("slotLabelInterval"), this.labelInterval = n ? e.duration(n) : this.computeLabelInterval(r)
        },
        computeLabelInterval: function(t) {
            var n, i, r;
            for (n = Ce.length - 1; n >= 0; n--)
                if (i = e.duration(Ce[n]), r = G(i, t), K(r) && r > 1) return i;
            return e.duration(t)
        },
        computeEventTimeFormat: function() {
            return this.view.opt("noMeridiemTimeFormat")
        },
        computeDisplayEventEnd: function() {
            return !0
        },
        prepareHits: function() {
            this.colCoordCache.build(), this.slatCoordCache.build()
        },
        releaseHits: function() {
            this.colCoordCache.clear()
        },
        queryHit: function(t, e) {
            var n = this.snapsPerSlot,
                i = this.colCoordCache,
                r = this.slatCoordCache,
                s = i.getHorizontalIndex(t),
                o = r.getVerticalIndex(e);
            if (null != s && null != o) {
                var a = r.getTopOffset(o),
                    l = r.getHeight(o),
                    u = (e - a) / l,
                    c = Math.floor(u * n),
                    d = a + c / n * l,
                    h = a + (c + 1) / n * l;
                return {
                    col: s,
                    snap: o * n + c,
                    component: this,
                    left: i.getLeftOffset(s),
                    right: i.getRightOffset(s),
                    top: d,
                    bottom: h
                }
            }
        },
        getHitSpan: function(t) {
            var e, n = this.getCellDate(0, t.col),
                i = this.computeSnapTime(t.snap);
            return n.time(i), e = n.clone().add(this.snapDuration), {
                start: n,
                end: e
            }
        },
        getHitEl: function(t) {
            return this.colEls.eq(t.col)
        },
        rangeUpdated: function() {
            this.updateDayTable()
        },
        computeSnapTime: function(t) {
            return e.duration(this.minTime + this.snapDuration * t)
        },
        spanToSegs: function(t) {
            var e, n = this.sliceRangeByTimes(t);
            for (e = 0; e < n.length; e++) this.isRTL ? n[e].col = this.daysPerRow - 1 - n[e].dayIndex : n[e].col = n[e].dayIndex;
            return n
        },
        sliceRangeByTimes: function(t) {
            var e, n, i, r = [];
            for (n = 0; n < this.daysPerRow; n++)(e = k(t, {
                start: (i = this.dayDates[n].clone()).clone().time(this.minTime),
                end: i.clone().time(this.maxTime)
            })) && (e.dayIndex = n, r.push(e));
            return r
        },
        updateSize: function(t) {
            this.slatCoordCache.build(), t && this.updateSegVerticals([].concat(this.fgSegs || [], this.bgSegs || [], this.businessSegs || []))
        },
        computeDateTop: function(t, n) {
            return this.computeTimeTop(e.duration(t - n.clone().stripTime()))
        },
        computeTimeTop: function(t) {
            var e, n, i = this.slatEls.length,
                r = (t - this.minTime) / this.slotDuration;
            return r = Math.max(0, r), r = Math.min(i, r), e = Math.floor(r), e = Math.min(e, i - 1), n = r - e, this.slatCoordCache.getTopPosition(e) + this.slatCoordCache.getHeight(e) * n
        },
        renderDrag: function(t, e) {
            if (e) {
                this.renderEventLocationHelper(t, e);
                for (var n = 0; n < this.helperSegs.length; n++) this.applyDragOpacity(this.helperSegs[n].el);
                return !0
            }
            this.renderHighlight(this.eventToSpan(t))
        },
        unrenderDrag: function() {
            this.unrenderHelper(), this.unrenderHighlight()
        },
        renderEventResize: function(t, e) {
            this.renderEventLocationHelper(t, e)
        },
        unrenderEventResize: function() {
            this.unrenderHelper()
        },
        renderHelper: function(t, e) {
            this.renderHelperSegs(this.eventToSegs(t), e)
        },
        unrenderHelper: function() {
            this.unrenderHelperSegs()
        },
        renderBusinessHours: function() {
            var t = this.view.calendar.getBusinessHoursEvents(),
                e = this.eventsToSegs(t);
            this.renderBusinessSegs(e)
        },
        unrenderBusinessHours: function() {
            this.unrenderBusinessSegs()
        },
        getNowIndicatorUnit: function() {
            return "minute"
        },
        renderNowIndicator: function(e) {
            var n, i = this.spanToSegs({
                    start: e,
                    end: e
                }),
                r = this.computeDateTop(e, e),
                s = [];
            for (n = 0; n < i.length; n++) s.push(t('<div class="fc-now-indicator fc-now-indicator-line"></div>').css("top", r).appendTo(this.colContainerEls.eq(i[n].col))[0]);
            i.length > 0 && s.push(t('<div class="fc-now-indicator fc-now-indicator-arrow"></div>').css("top", r).appendTo(this.el.find(".fc-content-skeleton"))[0]), this.nowIndicatorEls = t(s)
        },
        unrenderNowIndicator: function() {
            this.nowIndicatorEls && (this.nowIndicatorEls.remove(), this.nowIndicatorEls = null)
        },
        renderSelection: function(t) {
            this.view.opt("selectHelper") ? this.renderEventLocationHelper(t) : this.renderHighlight(t)
        },
        unrenderSelection: function() {
            this.unrenderHelper(), this.unrenderHighlight()
        },
        renderHighlight: function(t) {
            this.renderHighlightSegs(this.spanToSegs(t))
        },
        unrenderHighlight: function() {
            this.unrenderHighlightSegs()
        }
    });
    le.mixin({
        colContainerEls: null,
        fgContainerEls: null,
        bgContainerEls: null,
        helperContainerEls: null,
        highlightContainerEls: null,
        businessContainerEls: null,
        fgSegs: null,
        bgSegs: null,
        helperSegs: null,
        highlightSegs: null,
        businessSegs: null,
        renderContentSkeleton: function() {
            var e, n, i = "";
            for (e = 0; e < this.colCnt; e++) i += '<td><div class="fc-content-col"><div class="fc-event-container fc-helper-container"></div><div class="fc-event-container"></div><div class="fc-highlight-container"></div><div class="fc-bgevent-container"></div><div class="fc-business-container"></div></div></td>';
            n = t('<div class="fc-content-skeleton"><table><tr>' + i + "</tr></table></div>"), this.colContainerEls = n.find(".fc-content-col"), this.helperContainerEls = n.find(".fc-helper-container"), this.fgContainerEls = n.find(".fc-event-container:not(.fc-helper-container)"), this.bgContainerEls = n.find(".fc-bgevent-container"), this.highlightContainerEls = n.find(".fc-highlight-container"), this.businessContainerEls = n.find(".fc-business-container"), this.bookendCells(n.find("tr")), this.el.append(n)
        },
        renderFgSegs: function(t) {
            return t = this.renderFgSegsIntoContainers(t, this.fgContainerEls), this.fgSegs = t, t
        },
        unrenderFgSegs: function() {
            this.unrenderNamedSegs("fgSegs")
        },
        renderHelperSegs: function(t, e) {
            var n, i, r;
            for (t = this.renderFgSegsIntoContainers(t, this.helperContainerEls), n = 0; n < t.length; n++) i = t[n], e && e.col === i.col && (r = e.el, i.el.css({
                left: r.css("left"),
                right: r.css("right"),
                "margin-left": r.css("margin-left"),
                "margin-right": r.css("margin-right")
            }));
            this.helperSegs = t
        },
        unrenderHelperSegs: function() {
            this.unrenderNamedSegs("helperSegs")
        },
        renderBgSegs: function(t) {
            return t = this.renderFillSegEls("bgEvent", t), this.updateSegVerticals(t), this.attachSegsByCol(this.groupSegsByCol(t), this.bgContainerEls), this.bgSegs = t, t
        },
        unrenderBgSegs: function() {
            this.unrenderNamedSegs("bgSegs")
        },
        renderHighlightSegs: function(t) {
            t = this.renderFillSegEls("highlight", t), this.updateSegVerticals(t), this.attachSegsByCol(this.groupSegsByCol(t), this.highlightContainerEls), this.highlightSegs = t
        },
        unrenderHighlightSegs: function() {
            this.unrenderNamedSegs("highlightSegs")
        },
        renderBusinessSegs: function(t) {
            t = this.renderFillSegEls("businessHours", t), this.updateSegVerticals(t), this.attachSegsByCol(this.groupSegsByCol(t), this.businessContainerEls), this.businessSegs = t
        },
        unrenderBusinessSegs: function() {
            this.unrenderNamedSegs("businessSegs")
        },
        groupSegsByCol: function(t) {
            var e, n = [];
            for (e = 0; e < this.colCnt; e++) n.push([]);
            for (e = 0; e < t.length; e++) n[t[e].col].push(t[e]);
            return n
        },
        attachSegsByCol: function(t, e) {
            var n, i, r;
            for (n = 0; n < this.colCnt; n++)
                for (i = t[n], r = 0; r < i.length; r++) e.eq(n).append(i[r].el)
        },
        unrenderNamedSegs: function(t) {
            var e, n = this[t];
            if (n) {
                for (e = 0; e < n.length; e++) n[e].el.remove();
                this[t] = null
            }
        },
        renderFgSegsIntoContainers: function(t, e) {
            var n, i;
            for (t = this.renderFgSegEls(t), n = this.groupSegsByCol(t), i = 0; i < this.colCnt; i++) this.updateFgSegCoords(n[i]);
            return this.attachSegsByCol(n, e), t
        },
        fgSegHtml: function(t, e) {
            var n, i, r, s = this.view,
                o = t.event,
                a = s.isEventDraggable(o),
                l = !e && t.isStart && s.isEventResizableFromStart(o),
                u = !e && t.isEnd && s.isEventResizableFromEnd(o),
                c = this.getSegClasses(t, a, l || u),
                d = $(this.getEventSkinCss(o));
            return c.unshift("fc-time-grid-event", "fc-v-event"), s.isMultiDayEvent(o) ? (t.isStart || t.isEnd) && (n = this.getEventTimeText(t), i = this.getEventTimeText(t, "LT"), r = this.getEventTimeText(t, null, !1)) : (n = this.getEventTimeText(o), i = this.getEventTimeText(o, "LT"), r = this.getEventTimeText(o, null, !1)), '<a class="' + c.join(" ") + '"' + (o.url ? ' href="' + U(o.url) + '"' : "") + (d ? ' style="' + d + '"' : "") + '><div class="fc-content">' + (n ? '<div class="fc-time" data-start="' + U(r) + '" data-full="' + U(i) + '"><span>' + U(n) + "</span></div>" : "") + (o.title ? '<div class="fc-title">' + U(o.title) + "</div>" : "") + '</div><div class="fc-bg"/>' + (u ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        },
        updateSegVerticals: function(t) {
            this.computeSegVerticals(t), this.assignSegVerticals(t)
        },
        computeSegVerticals: function(t) {
            var e, n;
            for (e = 0; e < t.length; e++)(n = t[e]).top = this.computeDateTop(n.start, n.start), n.bottom = this.computeDateTop(n.end, n.start)
        },
        assignSegVerticals: function(t) {
            var e, n;
            for (e = 0; e < t.length; e++)(n = t[e]).el.css(this.generateSegVerticalCss(n))
        },
        generateSegVerticalCss: function(t) {
            return {
                top: t.top,
                bottom: -t.bottom
            }
        },
        updateFgSegCoords: function(t) {
            this.computeSegVerticals(t), this.computeFgSegHorizontals(t), this.assignSegVerticals(t), this.assignFgSegHorizontals(t)
        },
        computeFgSegHorizontals: function(t) {
            var e, n, i;
            if (this.sortEventSegs(t), e = Tt(t), xt(e), n = e[0]) {
                for (i = 0; i < n.length; i++) Rt(n[i]);
                for (i = 0; i < n.length; i++) this.computeFgSegForwardBack(n[i], 0, 0)
            }
        },
        computeFgSegForwardBack: function(t, e, n) {
            var i, r = t.forwardSegs;
            if (void 0 === t.forwardCoord)
                for (r.length ? (this.sortForwardSegs(r), this.computeFgSegForwardBack(r[0], e + 1, n), t.forwardCoord = r[0].backwardCoord) : t.forwardCoord = 1, t.backwardCoord = t.forwardCoord - (t.forwardCoord - n) / (e + 1), i = 0; i < r.length; i++) this.computeFgSegForwardBack(r[i], 0, t.forwardCoord)
        },
        sortForwardSegs: function(t) {
            t.sort(Q(this, "compareForwardSegs"))
        },
        compareForwardSegs: function(t, e) {
            return e.forwardPressure - t.forwardPressure || (t.backwardCoord || 0) - (e.backwardCoord || 0) || this.compareEventSegs(t, e)
        },
        assignFgSegHorizontals: function(t) {
            var e, n;
            for (e = 0; e < t.length; e++)(n = t[e]).el.css(this.generateFgSegHorizontalCss(n)), n.bottom - n.top < 30 && n.el.addClass("fc-short")
        },
        generateFgSegHorizontalCss: function(t) {
            var e, n, i = this.view.opt("slotEventOverlap"),
                r = t.backwardCoord,
                s = t.forwardCoord,
                o = this.generateSegVerticalCss(t);
            return i && (s = Math.min(1, r + 2 * (s - r))), this.isRTL ? (e = 1 - s, n = r) : (e = r, n = 1 - s), o.zIndex = t.level + 1, o.left = 100 * e + "%", o.right = 100 * n + "%", i && t.forwardPressure && (o[this.isRTL ? "marginLeft" : "marginRight"] = 20), o
        }
    });
    var ue = Bt.View = ft.extend({
            type: null,
            name: null,
            title: null,
            calendar: null,
            options: null,
            el: null,
            displaying: null,
            isSkeletonRendered: !1,
            isEventsRendered: !1,
            start: null,
            end: null,
            intervalStart: null,
            intervalEnd: null,
            intervalDuration: null,
            intervalUnit: null,
            isRTL: !1,
            isSelected: !1,
            eventOrderSpecs: null,
            scrollerEl: null,
            scrollTop: null,
            widgetHeaderClass: null,
            widgetContentClass: null,
            highlightStateClass: null,
            nextDayThreshold: null,
            isHiddenDayHash: null,
            documentMousedownProxy: null,
            nowIndicatorTimeoutID: null,
            nowIndicatorIntervalID: null,
            constructor: function(t, n, i, r) {
                this.calendar = t, this.type = this.name = n, this.options = i, this.intervalDuration = r || e.duration(1, "day"), this.nextDayThreshold = e.duration(this.opt("nextDayThreshold")), this.initThemingProps(), this.initHiddenDays(), this.isRTL = this.opt("isRTL"), this.eventOrderSpecs = H(this.opt("eventOrder")), this.documentMousedownProxy = Q(this, "documentMousedown"), this.initialize()
            },
            initialize: function() {},
            opt: function(t) {
                return this.options[t]
            },
            trigger: function(t, e) {
                var n = this.calendar;
                return n.trigger.apply(n, [t, e || this].concat(Array.prototype.slice.call(arguments, 2), [this]))
            },
            setDate: function(t) {
                this.setRange(this.computeRange(t))
            },
            setRange: function(e) {
                t.extend(this, e), this.updateTitle()
            },
            computeRange: function(t) {
                var e, n, i = M(this.intervalDuration),
                    r = t.clone().startOf(i),
                    s = r.clone().add(this.intervalDuration);
                return /year|month|week|day/.test(i) ? (r.stripTime(), s.stripTime()) : (r.hasTime() || (r = this.calendar.time(0)), s.hasTime() || (s = this.calendar.time(0))), e = r.clone(), e = this.skipHiddenDays(e), n = s.clone(), n = this.skipHiddenDays(n, -1, !0), {
                    intervalUnit: i,
                    intervalStart: r,
                    intervalEnd: s,
                    start: e,
                    end: n
                }
            },
            computePrevDate: function(t) {
                return this.massageCurrentDate(t.clone().startOf(this.intervalUnit).subtract(this.intervalDuration), -1)
            },
            computeNextDate: function(t) {
                return this.massageCurrentDate(t.clone().startOf(this.intervalUnit).add(this.intervalDuration))
            },
            massageCurrentDate: function(t, e) {
                return this.intervalDuration.as("days") <= 1 && this.isHiddenDay(t) && (t = this.skipHiddenDays(t, e)).startOf("day"), t
            },
            updateTitle: function() {
                this.title = this.computeTitle()
            },
            computeTitle: function() {
                return this.formatRange({
                    start: this.calendar.applyTimezone(this.intervalStart),
                    end: this.calendar.applyTimezone(this.intervalEnd)
                }, this.opt("titleFormat") || this.computeTitleFormat(), this.opt("titleRangeSeparator"))
            },
            computeTitleFormat: function() {
                return "year" == this.intervalUnit ? "YYYY" : "month" == this.intervalUnit ? this.opt("monthYearFormat") : this.intervalDuration.as("days") > 1 ? "ll" : "LL"
            },
            formatRange: function(t, e, n) {
                var i = t.end;
                return i.hasTime() || (i = i.clone().subtract(1)), lt(t.start, i, e, n, this.opt("isRTL"))
            },
            setElement: function(t) {
                this.el = t, this.bindGlobalHandlers()
            },
            removeElement: function() {
                this.clear(), this.isSkeletonRendered && (this.unrenderSkeleton(), this.isSkeletonRendered = !1), this.unbindGlobalHandlers(), this.el.remove()
            },
            display: function(e) {
                var n = this,
                    i = null;
                return this.displaying && (i = this.queryScroll()), this.calendar.freezeContentHeight(), this.clear().then(function() {
                    return n.displaying = t.when(n.displayView(e)).then(function() {
                        n.forceScroll(n.computeInitialScroll(i)), n.calendar.unfreezeContentHeight(), n.triggerRender()
                    })
                })
            },
            clear: function() {
                var e = this,
                    n = this.displaying;
                return n ? n.then(function() {
                    return e.displaying = null, e.clearEvents(), e.clearView()
                }) : t.when()
            },
            redisplay: function() {
                if (this.isSkeletonRendered) {
                    var t = this.isEventsRendered;
                    this.clearEvents(), this.clearView(), this.displayView(), t && this.displayEvents(this.calendar.getEventCache())
                }
            },
            displayView: function(t) {
                this.isSkeletonRendered || (this.renderSkeleton(), this.isSkeletonRendered = !0), t && this.setDate(t), this.render && this.render(), this.renderDates(), this.updateSize(), this.renderBusinessHours(), this.opt("nowIndicator") && this.startNowIndicator()
            },
            clearView: function() {
                this.unselect(), this.stopNowIndicator(), this.triggerUnrender(), this.unrenderBusinessHours(), this.unrenderDates(), this.destroy && this.destroy()
            },
            renderSkeleton: function() {},
            unrenderSkeleton: function() {},
            renderDates: function() {},
            unrenderDates: function() {},
            triggerRender: function() {
                this.trigger("viewRender", this, this, this.el)
            },
            triggerUnrender: function() {
                this.trigger("viewDestroy", this, this, this.el)
            },
            bindGlobalHandlers: function() {
                t(document).on("mousedown", this.documentMousedownProxy)
            },
            unbindGlobalHandlers: function() {
                t(document).off("mousedown", this.documentMousedownProxy)
            },
            initThemingProps: function() {
                var t = this.opt("theme") ? "ui" : "fc";
                this.widgetHeaderClass = t + "-widget-header", this.widgetContentClass = t + "-widget-content", this.highlightStateClass = t + "-state-highlight"
            },
            renderBusinessHours: function() {},
            unrenderBusinessHours: function() {},
            startNowIndicator: function() {
                function t() {
                    s.unrenderNowIndicator(), s.renderNowIndicator(n.clone().add(new Date - i))
                }
                var n, i, r, s = this,
                    o = this.getNowIndicatorUnit();
                o && (n = this.calendar.getNow(), i = +new Date, this.renderNowIndicator(n), r = n.clone().startOf(o).add(1, o) - n, this.nowIndicatorTimeoutID = setTimeout(function() {
                    this.nowIndicatorTimeoutID = null, t(), r = +e.duration(1, o), r = Math.max(100, r), this.nowIndicatorIntervalID = setInterval(t, r)
                }, r))
            },
            stopNowIndicator: function() {
                var t = !1;
                this.nowIndicatorTimeoutID && (clearTimeout(this.nowIndicatorTimeoutID), t = !0), this.nowIndicatorIntervalID && (clearTimeout(this.nowIndicatorIntervalID), t = !0), t && this.unrenderNowIndicator()
            },
            getNowIndicatorUnit: function() {},
            renderNowIndicator: function(t) {},
            unrenderNowIndicator: function() {},
            updateSize: function(t) {
                var e;
                t && (e = this.queryScroll()), this.updateHeight(t), this.updateWidth(t), t && this.setScroll(e)
            },
            updateWidth: function(t) {},
            updateHeight: function(t) {
                var e = this.calendar;
                this.setHeight(e.getSuggestedViewHeight(), e.isHeightAuto())
            },
            setHeight: function(t, e) {},
            computeScrollerHeight: function(t) {
                var e, n, i = this.scrollerEl;
                return (e = this.el.add(i)).css({
                    position: "relative",
                    left: -1
                }), n = this.el.outerHeight() - i.height(), e.css({
                    position: "",
                    left: ""
                }), t - n
            },
            computeInitialScroll: function(t) {
                return 0
            },
            queryScroll: function() {
                if (this.scrollerEl) return this.scrollerEl.scrollTop()
            },
            setScroll: function(t) {
                if (this.scrollerEl) return this.scrollerEl.scrollTop(t)
            },
            forceScroll: function(t) {
                var e = this;
                this.setScroll(t), setTimeout(function() {
                    e.setScroll(t)
                }, 0)
            },
            displayEvents: function(t) {
                var e = this.queryScroll();
                this.clearEvents(), this.renderEvents(t), this.isEventsRendered = !0, this.setScroll(e), this.triggerEventRender()
            },
            clearEvents: function() {
                var t;
                this.isEventsRendered && (t = this.queryScroll(), this.triggerEventUnrender(), this.destroyEvents && this.destroyEvents(), this.unrenderEvents(), this.setScroll(t), this.isEventsRendered = !1)
            },
            renderEvents: function(t) {},
            unrenderEvents: function() {},
            triggerEventRender: function() {
                this.renderedEventSegEach(function(t) {
                    this.trigger("eventAfterRender", t.event, t.event, t.el)
                }), this.trigger("eventAfterAllRender")
            },
            triggerEventUnrender: function() {
                this.renderedEventSegEach(function(t) {
                    this.trigger("eventDestroy", t.event, t.event, t.el)
                })
            },
            resolveEventEl: function(e, n) {
                var i = this.trigger("eventRender", e, e, n);
                return !1 === i ? n = null : i && !0 !== i && (n = t(i)), n
            },
            showEvent: function(t) {
                this.renderedEventSegEach(function(t) {
                    t.el.css("visibility", "")
                }, t)
            },
            hideEvent: function(t) {
                this.renderedEventSegEach(function(t) {
                    t.el.css("visibility", "hidden")
                }, t)
            },
            renderedEventSegEach: function(t, e) {
                var n, i = this.getEventSegs();
                for (n = 0; n < i.length; n++) e && i[n].event._id !== e._id || i[n].el && t.call(this, i[n])
            },
            getEventSegs: function() {
                return []
            },
            isEventDraggable: function(t) {
                var e = t.source || {};
                return Z(t.startEditable, e.startEditable, this.opt("eventStartEditable"), t.editable, e.editable, this.opt("editable"))
            },
            reportEventDrop: function(t, e, n, i, r) {
                var s = this.calendar,
                    o = s.mutateEvent(t, e, n);
                this.triggerEventDrop(t, o.dateDelta, function() {
                    o.undo(), s.reportEventChange()
                }, i, r), s.reportEventChange()
            },
            triggerEventDrop: function(t, e, n, i, r) {
                this.trigger("eventDrop", i[0], t, e, n, r, {})
            },
            reportExternalDrop: function(e, n, i, r, s) {
                var o, a, l = e.eventProps;
                l && (o = t.extend({}, l, n), a = this.calendar.renderEvent(o, e.stick)[0]), this.triggerExternalDrop(a, n, i, r, s)
            },
            triggerExternalDrop: function(t, e, n, i, r) {
                this.trigger("drop", n[0], e.start, i, r), t && this.trigger("eventReceive", null, t)
            },
            renderDrag: function(t, e) {},
            unrenderDrag: function() {},
            isEventResizableFromStart: function(t) {
                return this.opt("eventResizableFromStart") && this.isEventResizable(t)
            },
            isEventResizableFromEnd: function(t) {
                return this.isEventResizable(t)
            },
            isEventResizable: function(t) {
                var e = t.source || {};
                return Z(t.durationEditable, e.durationEditable, this.opt("eventDurationEditable"), t.editable, e.editable, this.opt("editable"))
            },
            reportEventResize: function(t, e, n, i, r) {
                var s = this.calendar,
                    o = s.mutateEvent(t, e, n);
                this.triggerEventResize(t, o.durationDelta, function() {
                    o.undo(), s.reportEventChange()
                }, i, r), s.reportEventChange()
            },
            triggerEventResize: function(t, e, n, i, r) {
                this.trigger("eventResize", i[0], t, e, n, r, {})
            },
            select: function(t, e) {
                this.unselect(e), this.renderSelection(t), this.reportSelection(t, e)
            },
            renderSelection: function(t) {},
            reportSelection: function(t, e) {
                this.isSelected = !0, this.triggerSelect(t, e)
            },
            triggerSelect: function(t, e) {
                this.trigger("select", null, this.calendar.applyTimezone(t.start), this.calendar.applyTimezone(t.end), e)
            },
            unselect: function(t) {
                this.isSelected && (this.isSelected = !1, this.destroySelection && this.destroySelection(), this.unrenderSelection(), this.trigger("unselect", null, t))
            },
            unrenderSelection: function() {},
            documentMousedown: function(e) {
                var n;
                this.isSelected && this.opt("unselectAuto") && S(e) && ((n = this.opt("unselectCancel")) && t(e.target).closest(n).length || this.unselect(e))
            },
            triggerDayClick: function(t, e, n) {
                this.trigger("dayClick", e, this.calendar.applyTimezone(t.start), n)
            },
            initHiddenDays: function() {
                var e, n = this.opt("hiddenDays") || [],
                    i = [],
                    r = 0;
                for (!1 === this.opt("weekends") && n.push(0, 6), e = 0; e < 7; e++)(i[e] = -1 !== t.inArray(e, n)) || r++;
                if (!r) throw "invalid hiddenDays";
                this.isHiddenDayHash = i
            },
            isHiddenDay: function(t) {
                return e.isMoment(t) && (t = t.day()), this.isHiddenDayHash[t]
            },
            skipHiddenDays: function(t, e, n) {
                var i = t.clone();
                for (e = e || 1; this.isHiddenDayHash[(i.day() + (n ? e : 0) + 7) % 7];) i.add(e, "days");
                return i
            },
            computeDayRange: function(t) {
                var e, n = t.start.clone().stripTime(),
                    i = t.end,
                    r = null;
                return i && (r = i.clone().stripTime(), (e = +i.time()) && e >= this.nextDayThreshold && r.add(1, "days")), (!i || r <= n) && (r = n.clone().add(1, "days")), {
                    start: n,
                    end: r
                }
            },
            isMultiDayEvent: function(t) {
                var e = this.computeDayRange(t);
                return e.end.diff(e.start, "days") > 1
            }
        }),
        ce = Bt.Calendar = ft.extend({
            dirDefaults: null,
            langDefaults: null,
            overrides: null,
            options: null,
            viewSpecCache: null,
            view: null,
            header: null,
            loadingLevel: 0,
            constructor: function(n, i) {
                function r() {
                    T = S.theme ? "ui" : "fc", n.addClass("fc"), S.isRTL ? n.addClass("fc-rtl") : n.addClass("fc-ltr"), S.theme ? n.addClass("ui-widget") : n.addClass("fc-unthemed"), H = t("<div class='fc-view-container'/>").prependTo(n), D = w.header = new Mt(w, S), (C = D.render()) && n.prepend(C), o(S.defaultView), S.handleWindowResize && (k = J(c, S.windowResizeDelay), t(window).resize(k))
                }

                function s() {
                    return n.is(":visible")
                }

                function o(e) {
                    G++, x && e && x.type !== e && (D.deactivateButton(x.type), m(), x.removeElement(), x = w.view = null), !x && e && ((x = w.view = L[e] || (L[e] = w.instantiateView(e))).setElement(t("<div class='fc-view fc-" + e + "-view' />").appendTo(H)), D.activateButton(e)), x && (I = x.massageCurrentDate(I), x.displaying && I.isWithin(x.intervalStart, x.intervalEnd) || s() && (x.display(I), y(), p(), v(), f())), y(), G--
                }

                function a(t) {
                    if (s()) return t && u(), G++, x.updateSize(!0), G--, !0
                }

                function l() {
                    s() && u()
                }

                function u() {
                    R = "number" == typeof S.contentHeight ? S.contentHeight : "number" == typeof S.height ? S.height - (C ? C.outerHeight(!0) : 0) : Math.round(H.width() / Math.max(S.aspectRatio, .5))
                }

                function c(t) {
                    !G && t.target === window && x.start && a(!0) && x.trigger("windowResize", M)
                }

                function d() {
                    s() && (m(), x.displayEvents(B), y())
                }

                function h() {
                    m(), x.clearEvents(), y()
                }

                function f() {
                    !S.lazyFetching || F(x.start, x.end) ? g() : d()
                }

                function g() {
                    z(x.start, x.end)
                }

                function p() {
                    D.updateTitle(x.title)
                }

                function v() {
                    w.getNow().isWithin(x.intervalStart, x.intervalEnd) ? D.disableButton("today") : D.enableButton("today")
                }

                function m() {
                    H.css({
                        width: "100%",
                        height: H.height(),
                        overflow: "hidden"
                    })
                }

                function y() {
                    H.css({
                        width: "",
                        height: "",
                        overflow: ""
                    })
                }
                var w = this;
                w.initOptions(i || {});
                var S = this.options;
                w.render = function() {
                    H ? s() && (l(), o()) : r()
                }, w.destroy = function() {
                    x && x.removeElement(), D.removeElement(), H.remove(), n.removeClass("fc fc-ltr fc-rtl fc-unthemed ui-widget"), k && t(window).unbind("resize", k)
                }, w.refetchEvents = function() {
                    h(), g()
                }, w.reportEvents = function(t) {
                    B = t, d()
                }, w.reportEventChange = function() {
                    d()
                }, w.rerenderEvents = d, w.changeView = o, w.select = function(t, e) {
                    x.select(w.buildSelectSpan.apply(w, arguments))
                }, w.unselect = function() {
                    x && x.unselect()
                }, w.prev = function() {
                    I = x.computePrevDate(I), o()
                }, w.next = function() {
                    I = x.computeNextDate(I), o()
                }, w.prevYear = function() {
                    I.add(-1, "years"), o()
                }, w.nextYear = function() {
                    I.add(1, "years"), o()
                }, w.today = function() {
                    I = w.getNow(), o()
                }, w.gotoDate = function(t) {
                    I = w.moment(t).stripZone(), o()
                }, w.incrementDate = function(t) {
                    I.add(e.duration(t)), o()
                }, w.zoomTo = function(t, e) {
                    var n;
                    e = e || "day", n = w.getViewSpec(e) || w.getUnitViewSpec(e), I = t.clone(), o(n ? n.type : null)
                }, w.getDate = function() {
                    return w.applyTimezone(I)
                }, w.getCalendar = function() {
                    return w
                }, w.getView = function() {
                    return x
                }, w.option = function(t, e) {
                    if (void 0 === e) return S[t];
                    "height" != t && "contentHeight" != t && "aspectRatio" != t || (S[t] = e, a(!0))
                }, w.trigger = function(t, e) {
                    var n = Array.prototype.slice.call(arguments, 2);
                    if (e = e || M, this.triggerWith(t, e, n), S[t]) return S[t].apply(e, n)
                };
                var b = O(zt(S.lang));
                if (S.monthNames && (b._months = S.monthNames), S.monthNamesShort && (b._monthsShort = S.monthNamesShort), S.dayNames && (b._weekdays = S.dayNames), S.dayNamesShort && (b._weekdaysShort = S.dayNamesShort), null != S.firstDay) {
                    var E = O(b._week);
                    E.dow = S.firstDay, b._week = E
                }
                b._fullCalendar_weekCalc = function(t) {
                    return "function" == typeof t ? t : "local" === t ? t : "iso" === t || "ISO" === t ? "ISO" : void 0
                }(S.weekNumberCalculation), w.defaultAllDayEventDuration = e.duration(S.defaultAllDayEventDuration), w.defaultTimedEventDuration = e.duration(S.defaultTimedEventDuration), w.moment = function() {
                    var t;
                    return "local" === S.timezone ? (t = Bt.moment.apply(null, arguments)).hasTime() && t.local() : t = "UTC" === S.timezone ? Bt.moment.utc.apply(null, arguments) : Bt.moment.parseZone.apply(null, arguments), "_locale" in t ? t._locale = b : t._lang = b, t
                }, w.getIsAmbigTimezone = function() {
                    return "local" !== S.timezone && "UTC" !== S.timezone
                }, w.applyTimezone = function(t) {
                    if (!t.hasTime()) return t.clone();
                    var e, n = w.moment(t.toArray()),
                        i = t.time() - n.time();
                    return i && (e = n.clone().add(i), t.time() - e.time() == 0 && (n = e)), n
                }, w.getNow = function() {
                    var t = S.now;
                    return "function" == typeof t && (t = t()), w.moment(t).stripZone()
                }, w.getEventEnd = function(t) {
                    return t.end ? t.end.clone() : w.getDefaultEventEnd(t.allDay, t.start)
                }, w.getDefaultEventEnd = function(t, e) {
                    var n = e.clone();
                    return t ? n.stripTime().add(w.defaultAllDayEventDuration) : n.add(w.defaultTimedEventDuration), w.getIsAmbigTimezone() && n.stripZone(), n
                }, w.humanizeDuration = function(t) {
                    return (t.locale || t.lang).call(t, S.lang).humanize()
                }, Lt.call(w, S);
                var D, C, H, T, x, R, k, I, F = w.isFetchNeeded,
                    z = w.fetchEvents,
                    M = n[0],
                    L = {},
                    G = 0,
                    B = [];
                I = null != S.defaultDate ? w.moment(S.defaultDate).stripZone() : w.getNow(), w.getSuggestedViewHeight = function() {
                    return void 0 === R && l(), R
                }, w.isHeightAuto = function() {
                    return "auto" === S.contentHeight || "auto" === S.height
                }, w.freezeContentHeight = m, w.unfreezeContentHeight = y, w.initialize()
            },
            initialize: function() {},
            initOptions: function(t) {
                var e, r, s;
                e = (t = i(t)).lang, (r = de[e]) || (e = ce.defaults.lang, r = de[e] || {}), s = Z(t.isRTL, r.isRTL, ce.defaults.isRTL) ? ce.rtlDefaults : {}, this.dirDefaults = s, this.langDefaults = r, this.overrides = t, this.options = n([ce.defaults, s, r, t]), Ft(this.options), this.viewSpecCache = {}
            },
            getViewSpec: function(t) {
                var e = this.viewSpecCache;
                return e[t] || (e[t] = this.buildViewSpec(t))
            },
            getUnitViewSpec: function(e) {
                var n, i, r;
                if (-1 != t.inArray(e, _t))
                    for (n = this.header.getViewsWithButtons(), t.each(Bt.views, function(t) {
                            n.push(t)
                        }), i = 0; i < n.length; i++)
                        if ((r = this.getViewSpec(n[i])) && r.singleUnit == e) return r
            },
            buildViewSpec: function(t) {
                for (var i, r, s, o, a = this.overrides.views || {}, l = [], u = [], c = [], d = t; d;) i = Nt[d], r = a[d], d = null, "function" == typeof i && (i = {
                    class: i
                }), i && (l.unshift(i), u.unshift(i.defaults || {}), s = s || i.duration, d = d || i.type), r && (c.unshift(r), s = s || r.duration, d = d || r.type);
                return i = V(l), i.type = t, !!i.class && (s && (s = e.duration(s)).valueOf() && (i.duration = s, o = M(s), 1 === s.as(o) && (i.singleUnit = o, c.unshift(a[o] || {}))), i.defaults = n(u), i.overrides = n(c), this.buildViewSpecOptions(i), this.buildViewSpecButtonText(i, t), i)
            },
            buildViewSpecOptions: function(t) {
                t.options = n([ce.defaults, t.defaults, this.dirDefaults, this.langDefaults, this.overrides, t.overrides]), Ft(t.options)
            },
            buildViewSpecButtonText: function(t, e) {
                function n(n) {
                    var i = n.buttonText || {};
                    return i[e] || (t.singleUnit ? i[t.singleUnit] : null)
                }
                t.buttonTextOverride = n(this.overrides) || t.overrides.buttonText, t.buttonTextDefault = n(this.langDefaults) || n(this.dirDefaults) || t.defaults.buttonText || n(ce.defaults) || (t.duration ? this.humanizeDuration(t.duration) : null) || e
            },
            instantiateView: function(t) {
                var e = this.getViewSpec(t);
                return new e.class(this, t, e.options, e.duration)
            },
            isValidViewType: function(t) {
                return Boolean(this.getViewSpec(t))
            },
            pushLoading: function() {
                this.loadingLevel++ || this.trigger("loading", null, !0, this.view)
            },
            popLoading: function() {
                --this.loadingLevel || this.trigger("loading", null, !1, this.view)
            },
            buildSelectSpan: function(t, e) {
                var n, i = this.moment(t).stripZone();
                return n = e ? this.moment(e).stripZone() : i.hasTime() ? i.clone().add(this.defaultTimedEventDuration) : i.clone().add(this.defaultAllDayEventDuration), {
                    start: i,
                    end: n
                }
            }
        });
    ce.mixin(Jt), ce.defaults = {
        titleRangeSeparator: " â€” ",
        monthYearFormat: "MMMM YYYY",
        defaultTimedEventDuration: "02:00:00",
        defaultAllDayEventDuration: {
            days: 1
        },
        forceEventDuration: !1,
        nextDayThreshold: "09:00:00",
        defaultView: "month",
        aspectRatio: 1.35,
        header: {
            left: "title",
            center: "",
            right: "today prev,next"
        },
        weekends: !0,
        weekNumbers: !1,
        weekNumberTitle: "W",
        weekNumberCalculation: "local",
        scrollTime: "06:00:00",
        lazyFetching: !0,
        startParam: "start",
        endParam: "end",
        timezoneParam: "timezone",
        timezone: !1,
        isRTL: !1,
        buttonText: {
            prev: "prev",
            next: "next",
            prevYear: "prev year",
            nextYear: "next year",
            year: "year",
            today: "today",
            month: "month",
            week: "week",
            day: "day"
        },
        buttonIcons: {
            prev: "left-single-arrow",
            next: "right-single-arrow",
            prevYear: "left-double-arrow",
            nextYear: "right-double-arrow"
        },
        theme: !1,
        themeButtonIcons: {
            prev: "circle-triangle-w",
            next: "circle-triangle-e",
            prevYear: "seek-prev",
            nextYear: "seek-next"
        },
        dragOpacity: .75,
        dragRevertDuration: 500,
        dragScroll: !0,
        unselectAuto: !0,
        dropAccept: "*",
        eventOrder: "title",
        eventLimit: !1,
        eventLimitText: "more",
        eventLimitClick: "popover",
        dayPopoverFormat: "LL",
        handleWindowResize: !0,
        windowResizeDelay: 200
    }, ce.englishDefaults = {
        dayPopoverFormat: "dddd, MMMM D"
    }, ce.rtlDefaults = {
        header: {
            left: "next,prev today",
            center: "",
            right: "title"
        },
        buttonIcons: {
            prev: "right-single-arrow",
            next: "left-single-arrow",
            prevYear: "right-double-arrow",
            nextYear: "left-double-arrow"
        },
        themeButtonIcons: {
            prev: "circle-triangle-e",
            next: "circle-triangle-w",
            nextYear: "seek-prev",
            prevYear: "seek-next"
        }
    };
    var de = Bt.langs = {};
    Bt.datepickerLang = function(e, n, i) {
        var r = de[e] || (de[e] = {});
        r.isRTL = i.isRTL, r.weekNumberTitle = i.weekHeader, t.each(he, function(t, e) {
            r[t] = e(i)
        }), t.datepicker && (t.datepicker.regional[n] = t.datepicker.regional[e] = i, t.datepicker.regional.en = t.datepicker.regional[""], t.datepicker.setDefaults(i))
    }, Bt.lang = function(e, i) {
        var r, s;
        r = de[e] || (de[e] = {}), i && (r = de[e] = n([r, i])), s = zt(e), t.each(fe, function(t, e) {
            null == r[t] && (r[t] = e(s, r))
        }), ce.defaults.lang = e
    };
    var he = {
            buttonText: function(t) {
                return {
                    prev: q(t.prevText),
                    next: q(t.nextText),
                    today: q(t.currentText)
                }
            },
            monthYearFormat: function(t) {
                return t.showMonthAfterYear ? "YYYY[" + t.yearSuffix + "] MMMM" : "MMMM YYYY[" + t.yearSuffix + "]"
            }
        },
        fe = {
            dayOfMonthFormat: function(t, e) {
                var n = t.longDateFormat("l");
                return n = n.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ""), e.isRTL ? n += " ddd" : n = "ddd " + n, n
            },
            mediumTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(/\s*a$/i, "a")
            },
            smallTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "a")
            },
            extraSmallTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "t")
            },
            hourFormat: function(t) {
                return t.longDateFormat("LT").replace(":mm", "").replace(/(\Wmm)$/, "").replace(/\s*a$/i, "a")
            },
            noMeridiemTimeFormat: function(t) {
                return t.longDateFormat("LT").replace(/\s*a$/i, "")
            }
        },
        ge = {
            smallDayDateFormat: function(t) {
                return t.isRTL ? "D dd" : "dd D"
            },
            weekFormat: function(t) {
                return t.isRTL ? "w[ " + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + " ]w"
            },
            smallWeekFormat: function(t) {
                return t.isRTL ? "w[" + t.weekNumberTitle + "]" : "[" + t.weekNumberTitle + "]w"
            }
        };
    Bt.lang("en", ce.englishDefaults), Bt.sourceNormalizers = [], Bt.sourceFetchers = [];
    var pe = {
            dataType: "json",
            cache: !1
        },
        ve = 1;
    ce.prototype.getPeerEvents = function(t, e) {
        var n, i, r = this.getEventCache(),
            s = [];
        for (n = 0; n < r.length; n++) i = r[n], e && e._id === i._id || s.push(i);
        return s
    };
    var me = Bt.BasicView = ue.extend({
            dayGridClass: ae,
            dayGrid: null,
            dayNumbersVisible: !1,
            weekNumbersVisible: !1,
            weekNumberWidth: null,
            headContainerEl: null,
            headRowEl: null,
            initialize: function() {
                this.dayGrid = this.instantiateDayGrid()
            },
            instantiateDayGrid: function() {
                return new(this.dayGridClass.extend(ye))(this)
            },
            setRange: function(t) {
                ue.prototype.setRange.call(this, t), this.dayGrid.breakOnWeeks = /year|month|week/.test(this.intervalUnit), this.dayGrid.setRange(t)
            },
            computeRange: function(t) {
                var e = ue.prototype.computeRange.call(this, t);
                return /year|month/.test(e.intervalUnit) && (e.start.startOf("week"), e.start = this.skipHiddenDays(e.start), e.end.weekday() && (e.end.add(1, "week").startOf("week"), e.end = this.skipHiddenDays(e.end, -1, !0))), e
            },
            renderDates: function() {
                this.dayNumbersVisible = this.dayGrid.rowCnt > 1, this.weekNumbersVisible = this.opt("weekNumbers"), this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible, this.el.addClass("fc-basic-view").html(this.renderSkeletonHtml()), this.renderHead(), this.scrollerEl = this.el.find(".fc-day-grid-container"), this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(this.hasRigidRows())
            },
            renderHead: function() {
                this.headContainerEl = this.el.find(".fc-head-container").html(this.dayGrid.renderHeadHtml()), this.headRowEl = this.headContainerEl.find(".fc-row")
            },
            unrenderDates: function() {
                this.dayGrid.unrenderDates(), this.dayGrid.removeElement()
            },
            renderBusinessHours: function() {
                this.dayGrid.renderBusinessHours()
            },
            renderSkeletonHtml: function() {
                return '<table><thead class="fc-head"><tr><td class="fc-head-container ' + this.widgetHeaderClass + '"></td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '"><div class="fc-day-grid-container"><div class="fc-day-grid"/></div></td></tr></tbody></table>'
            },
            weekNumberStyleAttr: function() {
                return null !== this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
            },
            hasRigidRows: function() {
                var t = this.opt("eventLimit");
                return t && "number" != typeof t
            },
            updateWidth: function() {
                this.weekNumbersVisible && (this.weekNumberWidth = c(this.el.find(".fc-week-number")))
            },
            setHeight: function(t, e) {
                var n, i = this.opt("eventLimit");
                h(this.scrollerEl), s(this.headRowEl), this.dayGrid.removeSegPopover(), i && "number" == typeof i && this.dayGrid.limitRows(i), n = this.computeScrollerHeight(t), this.setGridHeight(n, e), i && "number" != typeof i && this.dayGrid.limitRows(i), !e && d(this.scrollerEl, n) && (r(this.headRowEl, v(this.scrollerEl)), n = this.computeScrollerHeight(t), this.scrollerEl.height(n))
            },
            setGridHeight: function(t, e) {
                e ? u(this.dayGrid.rowEls) : l(this.dayGrid.rowEls, t, !0)
            },
            prepareHits: function() {
                this.dayGrid.prepareHits()
            },
            releaseHits: function() {
                this.dayGrid.releaseHits()
            },
            queryHit: function(t, e) {
                return this.dayGrid.queryHit(t, e)
            },
            getHitSpan: function(t) {
                return this.dayGrid.getHitSpan(t)
            },
            getHitEl: function(t) {
                return this.dayGrid.getHitEl(t)
            },
            renderEvents: function(t) {
                this.dayGrid.renderEvents(t), this.updateHeight()
            },
            getEventSegs: function() {
                return this.dayGrid.getEventSegs()
            },
            unrenderEvents: function() {
                this.dayGrid.unrenderEvents()
            },
            renderDrag: function(t, e) {
                return this.dayGrid.renderDrag(t, e)
            },
            unrenderDrag: function() {
                this.dayGrid.unrenderDrag()
            },
            renderSelection: function(t) {
                this.dayGrid.renderSelection(t)
            },
            unrenderSelection: function() {
                this.dayGrid.unrenderSelection()
            }
        }),
        ye = {
            renderHeadIntroHtml: function() {
                var t = this.view;
                return t.weekNumbersVisible ? '<th class="fc-week-number ' + t.widgetHeaderClass + '" ' + t.weekNumberStyleAttr() + "><span>" + U(t.opt("weekNumberTitle")) + "</span></th>" : ""
            },
            renderNumberIntroHtml: function(t) {
                var e = this.view;
                return e.weekNumbersVisible ? '<td class="fc-week-number" ' + e.weekNumberStyleAttr() + "><span>" + this.getCellDate(t, 0).format("w") + "</span></td>" : ""
            },
            renderBgIntroHtml: function() {
                var t = this.view;
                return t.weekNumbersVisible ? '<td class="fc-week-number ' + t.widgetContentClass + '" ' + t.weekNumberStyleAttr() + "></td>" : ""
            },
            renderIntroHtml: function() {
                var t = this.view;
                return t.weekNumbersVisible ? '<td class="fc-week-number" ' + t.weekNumberStyleAttr() + "></td>" : ""
            }
        },
        we = Bt.MonthView = me.extend({
            computeRange: function(t) {
                var e, n = me.prototype.computeRange.call(this, t);
                return this.isFixedWeeks() && (e = Math.ceil(n.end.diff(n.start, "weeks", !0)), n.end.add(6 - e, "weeks")), n
            },
            setGridHeight: function(t, e) {
                (e = e || "variable" === this.opt("weekMode")) && (t *= this.rowCnt / 6), l(this.dayGrid.rowEls, t, !e)
            },
            isFixedWeeks: function() {
                var t = this.opt("weekMode");
                return t ? "fixed" === t : this.opt("fixedWeekCount")
            }
        });
    Nt.basic = {
        class: me
    }, Nt.basicDay = {
        type: "basic",
        duration: {
            days: 1
        }
    }, Nt.basicWeek = {
        type: "basic",
        duration: {
            weeks: 1
        }
    }, Nt.month = {
        class: we,
        duration: {
            months: 1
        },
        defaults: {
            fixedWeekCount: !0
        }
    };
    var Se = Bt.AgendaView = ue.extend({
            timeGridClass: le,
            timeGrid: null,
            dayGridClass: ae,
            dayGrid: null,
            axisWidth: null,
            headContainerEl: null,
            noScrollRowEls: null,
            bottomRuleEl: null,
            bottomRuleHeight: null,
            initialize: function() {
                this.timeGrid = this.instantiateTimeGrid(), this.opt("allDaySlot") && (this.dayGrid = this.instantiateDayGrid())
            },
            instantiateTimeGrid: function() {
                return new(this.timeGridClass.extend(be))(this)
            },
            instantiateDayGrid: function() {
                return new(this.dayGridClass.extend(Ee))(this)
            },
            setRange: function(t) {
                ue.prototype.setRange.call(this, t), this.timeGrid.setRange(t), this.dayGrid && this.dayGrid.setRange(t)
            },
            renderDates: function() {
                this.el.addClass("fc-agenda-view").html(this.renderSkeletonHtml()), this.renderHead(), this.scrollerEl = this.el.find(".fc-time-grid-container"), this.timeGrid.setElement(this.el.find(".fc-time-grid")), this.timeGrid.renderDates(), this.bottomRuleEl = t('<hr class="fc-divider ' + this.widgetHeaderClass + '"/>').appendTo(this.timeGrid.el), this.dayGrid && (this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(), this.dayGrid.bottomCoordPadding = this.dayGrid.el.next("hr").outerHeight()), this.noScrollRowEls = this.el.find(".fc-row:not(.fc-scroller *)")
            },
            renderHead: function() {
                this.headContainerEl = this.el.find(".fc-head-container").html(this.timeGrid.renderHeadHtml())
            },
            unrenderDates: function() {
                this.timeGrid.unrenderDates(), this.timeGrid.removeElement(), this.dayGrid && (this.dayGrid.unrenderDates(), this.dayGrid.removeElement())
            },
            renderSkeletonHtml: function() {
                return '<table><thead class="fc-head"><tr><td class="fc-head-container ' + this.widgetHeaderClass + '"></td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '">' + (this.dayGrid ? '<div class="fc-day-grid"/><hr class="fc-divider ' + this.widgetHeaderClass + '"/>' : "") + '<div class="fc-time-grid-container"><div class="fc-time-grid"/></div></td></tr></tbody></table>'
            },
            axisStyleAttr: function() {
                return null !== this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : ""
            },
            renderBusinessHours: function() {
                this.timeGrid.renderBusinessHours(), this.dayGrid && this.dayGrid.renderBusinessHours()
            },
            unrenderBusinessHours: function() {
                this.timeGrid.unrenderBusinessHours(), this.dayGrid && this.dayGrid.unrenderBusinessHours()
            },
            getNowIndicatorUnit: function() {
                return this.timeGrid.getNowIndicatorUnit()
            },
            renderNowIndicator: function(t) {
                this.timeGrid.renderNowIndicator(t)
            },
            unrenderNowIndicator: function() {
                this.timeGrid.unrenderNowIndicator()
            },
            updateSize: function(t) {
                this.timeGrid.updateSize(t), ue.prototype.updateSize.call(this, t)
            },
            updateWidth: function() {
                this.axisWidth = c(this.el.find(".fc-axis"))
            },
            setHeight: function(t, e) {
                var n, i;
                null === this.bottomRuleHeight && (this.bottomRuleHeight = this.bottomRuleEl.outerHeight()), this.bottomRuleEl.hide(), this.scrollerEl.css("overflow", ""), h(this.scrollerEl), s(this.noScrollRowEls), this.dayGrid && (this.dayGrid.removeSegPopover(), (n = this.opt("eventLimit")) && "number" != typeof n && (n = De), n && this.dayGrid.limitRows(n)), e || (i = this.computeScrollerHeight(t), d(this.scrollerEl, i) ? (r(this.noScrollRowEls, v(this.scrollerEl)), i = this.computeScrollerHeight(t), this.scrollerEl.height(i)) : (this.scrollerEl.height(i).css("overflow", "hidden"), this.bottomRuleEl.show()))
            },
            computeInitialScroll: function() {
                var t = e.duration(this.opt("scrollTime")),
                    n = this.timeGrid.computeTimeTop(t);
                return (n = Math.ceil(n)) && n++, n
            },
            prepareHits: function() {
                this.timeGrid.prepareHits(), this.dayGrid && this.dayGrid.prepareHits()
            },
            releaseHits: function() {
                this.timeGrid.releaseHits(), this.dayGrid && this.dayGrid.releaseHits()
            },
            queryHit: function(t, e) {
                var n = this.timeGrid.queryHit(t, e);
                return !n && this.dayGrid && (n = this.dayGrid.queryHit(t, e)), n
            },
            getHitSpan: function(t) {
                return t.component.getHitSpan(t)
            },
            getHitEl: function(t) {
                return t.component.getHitEl(t)
            },
            renderEvents: function(t) {
                var e, n = [],
                    i = [];
                for (e = 0; e < t.length; e++) t[e].allDay ? n.push(t[e]) : i.push(t[e]);
                this.timeGrid.renderEvents(i), this.dayGrid && this.dayGrid.renderEvents(n), this.updateHeight()
            },
            getEventSegs: function() {
                return this.timeGrid.getEventSegs().concat(this.dayGrid ? this.dayGrid.getEventSegs() : [])
            },
            unrenderEvents: function() {
                this.timeGrid.unrenderEvents(), this.dayGrid && this.dayGrid.unrenderEvents()
            },
            renderDrag: function(t, e) {
                return t.start.hasTime() ? this.timeGrid.renderDrag(t, e) : this.dayGrid ? this.dayGrid.renderDrag(t, e) : void 0
            },
            unrenderDrag: function() {
                this.timeGrid.unrenderDrag(), this.dayGrid && this.dayGrid.unrenderDrag()
            },
            renderSelection: function(t) {
                t.start.hasTime() || t.end.hasTime() ? this.timeGrid.renderSelection(t) : this.dayGrid && this.dayGrid.renderSelection(t)
            },
            unrenderSelection: function() {
                this.timeGrid.unrenderSelection(), this.dayGrid && this.dayGrid.unrenderSelection()
            }
        }),
        be = {
            renderHeadIntroHtml: function() {
                var t, e = this.view;
                return e.opt("weekNumbers") ? (t = this.start.format(e.opt("smallWeekFormat")), '<th class="fc-axis fc-week-number ' + e.widgetHeaderClass + '" ' + e.axisStyleAttr() + "><span>" + U(t) + "</span></th>") : '<th class="fc-axis ' + e.widgetHeaderClass + '" ' + e.axisStyleAttr() + "></th>"
            },
            renderBgIntroHtml: function() {
                var t = this.view;
                return '<td class="fc-axis ' + t.widgetContentClass + '" ' + t.axisStyleAttr() + "></td>"
            },
            renderIntroHtml: function() {
                return '<td class="fc-axis" ' + this.view.axisStyleAttr() + "></td>"
            }
        },
        Ee = {
            renderBgIntroHtml: function() {
                var t = this.view;
                return '<td class="fc-axis ' + t.widgetContentClass + '" ' + t.axisStyleAttr() + "><span>" + (t.opt("allDayHtml") || U(t.opt("allDayText"))) + "</span></td>"
            },
            renderIntroHtml: function() {
                return '<td class="fc-axis" ' + this.view.axisStyleAttr() + "></td>"
            }
        },
        De = 5,
        Ce = [{
            hours: 1
        }, {
            minutes: 30
        }, {
            minutes: 15
        }, {
            seconds: 30
        }, {
            seconds: 15
        }];
    return Nt.agenda = {
        class: Se,
        defaults: {
            allDaySlot: !0,
            allDayText: "all-day",
            slotDuration: "00:30:00",
            minTime: "00:00:00",
            maxTime: "24:00:00",
            slotEventOverlap: !0
        }
    }, Nt.agendaDay = {
        type: "agenda",
        duration: {
            days: 1
        }
    }, Nt.agendaWeek = {
        type: "agenda",
        duration: {
            weeks: 1
        }
    }, Bt
});
