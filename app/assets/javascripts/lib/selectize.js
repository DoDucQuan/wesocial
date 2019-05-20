! function(e, t) {
    "function" == typeof define && define.amd ? define("sifter", t) : "object" == typeof exports ? module.exports = t() : e.Sifter = t()
}(this, function() {
    var e = function(e, t) {
        this.items = e, this.settings = t || {
            diacritics: !0
        }
    };
    e.prototype.tokenize = function(e) {
        if (!(e = o(String(e || "").toLowerCase())) || !e.length) return [];
        var t, n, i, s, l = [],
            p = e.split(/ +/);
        for (t = 0, n = p.length; t < n; t++) {
            if (i = r(p[t]), this.settings.diacritics)
                for (s in a) a.hasOwnProperty(s) && (i = i.replace(new RegExp(s, "g"), a[s]));
            l.push({
                string: p[t],
                regex: new RegExp(i, "i")
            })
        }
        return l
    }, e.prototype.iterator = function(e, t) {
        (s(e) ? Array.prototype.forEach || function(e) {
            for (var t = 0, n = this.length; t < n; t++) e(this[t], t, this)
        } : function(e) {
            for (var t in this) this.hasOwnProperty(t) && e(this[t], t, this)
        }).apply(e, [t])
    }, e.prototype.getScoreFunction = function(e, t) {
        var n, o, r, s;
        e = this.prepareSearch(e, t), o = e.tokens, n = e.options.fields, r = o.length, s = e.options.nesting;
        var a = function(e, t) {
                var n, i;
                return e ? (e = String(e || ""), -1 === (i = e.search(t.regex)) ? 0 : (n = t.string.length / e.length, 0 === i && (n += .5), n)) : 0
            },
            l = function() {
                var e = n.length;
                return e ? 1 === e ? function(e, t) {
                    return a(i(t, n[0], s), e)
                } : function(t, o) {
                    for (var r = 0, l = 0; r < e; r++) l += a(i(o, n[r], s), t);
                    return l / e
                } : function() {
                    return 0
                }
            }();
        return r ? 1 === r ? function(e) {
            return l(o[0], e)
        } : "and" === e.options.conjunction ? function(e) {
            for (var t, n = 0, i = 0; n < r; n++) {
                if ((t = l(o[n], e)) <= 0) return 0;
                i += t
            }
            return i / r
        } : function(e) {
            for (var t = 0, n = 0; t < r; t++) n += l(o[t], e);
            return n / r
        } : function() {
            return 0
        }
    }, e.prototype.getSortFunction = function(e, n) {
        var o, r, s, a, l, p, u, c, d, h, f;
        if (s = this, e = s.prepareSearch(e, n), f = !e.query && n.sort_empty || n.sort, d = function(e, t) {
                return "$score" === e ? t.score : i(s.items[t.id], e, n.nesting)
            }, l = [], f)
            for (o = 0, r = f.length; o < r; o++)(e.query || "$score" !== f[o].field) && l.push(f[o]);
        if (e.query) {
            for (h = !0, o = 0, r = l.length; o < r; o++)
                if ("$score" === l[o].field) {
                    h = !1;
                    break
                }
            h && l.unshift({
                field: "$score",
                direction: "desc"
            })
        } else
            for (o = 0, r = l.length; o < r; o++)
                if ("$score" === l[o].field) {
                    l.splice(o, 1);
                    break
                } for (c = [], o = 0, r = l.length; o < r; o++) c.push("desc" === l[o].direction ? -1 : 1);
        return (p = l.length) ? 1 === p ? (a = l[0].field, u = c[0], function(e, n) {
            return u * t(d(a, e), d(a, n))
        }) : function(e, n) {
            var i, o, r;
            for (i = 0; i < p; i++)
                if (r = l[i].field, o = c[i] * t(d(r, e), d(r, n))) return o;
            return 0
        } : null
    }, e.prototype.prepareSearch = function(e, t) {
        if ("object" == typeof e) return e;
        var i = (t = n({}, t)).fields,
            o = t.sort,
            r = t.sort_empty;
        return i && !s(i) && (t.fields = [i]), o && !s(o) && (t.sort = [o]), r && !s(r) && (t.sort_empty = [r]), {
            options: t,
            query: String(e || "").toLowerCase(),
            tokens: this.tokenize(e),
            total: 0,
            items: []
        }
    }, e.prototype.search = function(e, t) {
        var n, i, o, r, s = this;
        return i = this.prepareSearch(e, t), t = i.options, e = i.query, r = t.score || s.getScoreFunction(i), e.length ? s.iterator(s.items, function(e, o) {
            n = r(e), (!1 === t.filter || n > 0) && i.items.push({
                score: n,
                id: o
            })
        }) : s.iterator(s.items, function(e, t) {
            i.items.push({
                score: 1,
                id: t
            })
        }), (o = s.getSortFunction(i, t)) && i.items.sort(o), i.total = i.items.length, "number" == typeof t.limit && (i.items = i.items.slice(0, t.limit)), i
    };
    var t = function(e, t) {
            return "number" == typeof e && "number" == typeof t ? e > t ? 1 : e < t ? -1 : 0 : (e = l(String(e || "")), t = l(String(t || "")), e > t ? 1 : t > e ? -1 : 0)
        },
        n = function(e, t) {
            var n, i, o, r;
            for (n = 1, i = arguments.length; n < i; n++)
                if (r = arguments[n])
                    for (o in r) r.hasOwnProperty(o) && (e[o] = r[o]);
            return e
        },
        i = function(e, t, n) {
            if (e && t) {
                if (!n) return e[t];
                for (var i = t.split("."); i.length && (e = e[i.shift()]););
                return e
            }
        },
        o = function(e) {
            return (e + "").replace(/^\s+|\s+$|/g, "")
        },
        r = function(e) {
            return (e + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        },
        s = Array.isArray || "undefined" != typeof $ && $.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        },
        a = {
            a: "[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]",
            b: "[b␢βΒB฿𐌁ᛒ]",
            c: "[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]",
            d: "[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]",
            e: "[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]",
            f: "[fƑƒḞḟ]",
            g: "[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]",
            h: "[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]",
            i: "[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]",
            j: "[jȷĴĵɈɉʝɟʲ]",
            k: "[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]",
            l: "[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]",
            n: "[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]",
            o: "[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]",
            p: "[pṔṕṖṗⱣᵽƤƥᵱ]",
            q: "[qꝖꝗʠɊɋꝘꝙq̃]",
            r: "[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]",
            s: "[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]",
            t: "[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]",
            u: "[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]",
            v: "[vṼṽṾṿƲʋꝞꝟⱱʋ]",
            w: "[wẂẃẀẁŴŵẄẅẆẇẈẉ]",
            x: "[xẌẍẊẋχ]",
            y: "[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]",
            z: "[zŹźẐẑŽžŻżẒẓẔẕƵƶ]"
        },
        l = function() {
            var e, t, n, i, o = "",
                r = {};
            for (n in a)
                if (a.hasOwnProperty(n))
                    for (i = a[n].substring(2, a[n].length - 1), o += i, e = 0, t = i.length; e < t; e++) r[i.charAt(e)] = n;
            var s = new RegExp("[" + o + "]", "g");
            return function(e) {
                return e.replace(s, function(e) {
                    return r[e]
                }).toLowerCase()
            }
        }();
    return e
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("microplugin", t) : "object" == typeof exports ? module.exports = t() : e.MicroPlugin = t()
}(this, function() {
    var e = {};
    e.mixin = function(e) {
        e.plugins = {}, e.prototype.initializePlugins = function(e) {
            var n, i, o, r = this,
                s = [];
            if (r.plugins = {
                    names: [],
                    settings: {},
                    requested: {},
                    loaded: {}
                }, t.isArray(e))
                for (n = 0, i = e.length; n < i; n++) "string" == typeof e[n] ? s.push(e[n]) : (r.plugins.settings[e[n].name] = e[n].options, s.push(e[n].name));
            else if (e)
                for (o in e) e.hasOwnProperty(o) && (r.plugins.settings[o] = e[o], s.push(o));
            for (; s.length;) r.require(s.shift())
        }, e.prototype.loadPlugin = function(t) {
            var n = this,
                i = n.plugins,
                o = e.plugins[t];
            if (!e.plugins.hasOwnProperty(t)) throw new Error('Unable to find "' + t + '" plugin');
            i.requested[t] = !0, i.loaded[t] = o.fn.apply(n, [n.plugins.settings[t] || {}]), i.names.push(t)
        }, e.prototype.require = function(e) {
            var t = this,
                n = t.plugins;
            if (!t.plugins.loaded.hasOwnProperty(e)) {
                if (n.requested[e]) throw new Error('Plugin has circular dependency ("' + e + '")');
                t.loadPlugin(e)
            }
            return n.loaded[e]
        }, e.define = function(t, n) {
            e.plugins[t] = {
                name: t,
                fn: n
            }
        }
    };
    var t = {
        isArray: Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
    };
    return e
}),
function(e, t) {
    "function" == typeof define && define.amd ? define("selectize", ["jquery", "sifter", "microplugin"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("sifter"), require("microplugin")) : e.Selectize = t(e.jQuery, e.Sifter, e.MicroPlugin)
}(this, function(e, t, n) {
    "use strict";
    var i = function(e, t) {
        if ("string" != typeof t || t.length) {
            var n = "string" == typeof t ? new RegExp(t, "i") : t,
                i = function(e) {
                    var t = 0;
                    if (3 === e.nodeType) {
                        var o = e.data.search(n);
                        if (o >= 0 && e.data.length > 0) {
                            var r = e.data.match(n),
                                s = document.createElement("span");
                            s.className = "highlight";
                            var a = e.splitText(o),
                                l = (a.splitText(r[0].length), a.cloneNode(!0));
                            s.appendChild(l), a.parentNode.replaceChild(s, a), t = 1
                        }
                    } else if (1 === e.nodeType && e.childNodes && !/(script|style)/i.test(e.tagName))
                        for (var p = 0; p < e.childNodes.length; ++p) p += i(e.childNodes[p]);
                    return t
                };
            return e.each(function() {
                i(this)
            })
        }
    };
    e.fn.removeHighlight = function() {
        return this.find("span.highlight").each(function() {
            this.parentNode.firstChild.nodeName;
            var e = this.parentNode;
            e.replaceChild(this.firstChild, this), e.normalize()
        }).end()
    };
    var o = function() {};
    o.prototype = {
        on: function(e, t) {
            this._events = this._events || {}, this._events[e] = this._events[e] || [], this._events[e].push(t)
        },
        off: function(e, t) {
            var n = arguments.length;
            return 0 === n ? delete this._events : 1 === n ? delete this._events[e] : (this._events = this._events || {}, void(e in this._events != 0 && this._events[e].splice(this._events[e].indexOf(t), 1)))
        },
        trigger: function(e) {
            if (this._events = this._events || {}, e in this._events != 0)
                for (var t = 0; t < this._events[e].length; t++) this._events[e][t].apply(this, Array.prototype.slice.call(arguments, 1))
        }
    }, o.mixin = function(e) {
        for (var t = ["on", "off", "trigger"], n = 0; n < t.length; n++) e.prototype[t[n]] = o.prototype[t[n]]
    };
    var r = /Mac/.test(navigator.userAgent),
        s = r ? 91 : 17,
        a = r ? 18 : 17,
        l = !/android/i.test(window.navigator.userAgent) && !!document.createElement("input").validity,
        p = function(e) {
            return void 0 !== e
        },
        u = function(e) {
            return void 0 === e || null === e ? null : "boolean" == typeof e ? e ? "1" : "0" : e + ""
        },
        c = function(e) {
            return (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        d = {};
    d.before = function(e, t, n) {
        var i = e[t];
        e[t] = function() {
            return n.apply(e, arguments), i.apply(e, arguments)
        }
    }, d.after = function(e, t, n) {
        var i = e[t];
        e[t] = function() {
            var t = i.apply(e, arguments);
            return n.apply(e, arguments), t
        }
    };
    var h = function(e) {
            var t = !1;
            return function() {
                t || (t = !0, e.apply(this, arguments))
            }
        },
        f = function(e, t) {
            var n;
            return function() {
                var i = this,
                    o = arguments;
                window.clearTimeout(n), n = window.setTimeout(function() {
                    e.apply(i, o)
                }, t)
            }
        },
        g = function(e, t, n) {
            var i, o = e.trigger,
                r = {};
            e.trigger = function() {
                var n = arguments[0];
                return -1 === t.indexOf(n) ? o.apply(e, arguments) : void(r[n] = arguments)
            }, n.apply(e, []), e.trigger = o;
            for (i in r) r.hasOwnProperty(i) && o.apply(e, r[i])
        },
        v = function(e, t, n, i) {
            e.on(t, n, function(t) {
                for (var n = t.target; n && n.parentNode !== e[0];) n = n.parentNode;
                return t.currentTarget = n, i.apply(this, [t])
            })
        },
        m = function(e) {
            var t = {};
            if ("selectionStart" in e) t.start = e.selectionStart, t.length = e.selectionEnd - t.start;
            else if (document.selection) {
                e.focus();
                var n = document.selection.createRange(),
                    i = document.selection.createRange().text.length;
                n.moveStart("character", -e.value.length), t.start = n.text.length - i, t.length = i
            }
            return t
        },
        y = function(e, t, n) {
            var i, o, r = {};
            if (n)
                for (i = 0, o = n.length; i < o; i++) r[n[i]] = e.css(n[i]);
            else r = e.css();
            t.css(r)
        },
        w = function(t, n) {
            if (!t) return 0;
            var i = e("<test>").css({
                position: "absolute",
                top: -99999,
                left: -99999,
                width: "auto",
                padding: 0,
                whiteSpace: "pre"
            }).text(t).appendTo("body");
            y(n, i, ["letterSpacing", "fontSize", "fontFamily", "fontWeight", "textTransform"]);
            var o = i.width();
            return i.remove(), o
        },
        O = function(e) {
            var t = null,
                n = function(n, i) {
                    var o, r, s, a, l, p, u, c;
                    n = n || window.event || {}, i = i || {}, n.metaKey || n.altKey || (i.force || !1 !== e.data("grow")) && (o = e.val(), n.type && "keydown" === n.type.toLowerCase() && (r = n.keyCode, s = r >= 97 && r <= 122 || r >= 65 && r <= 90 || r >= 48 && r <= 57 || 32 === r, 46 === r || 8 === r ? (c = m(e[0])).length ? o = o.substring(0, c.start) + o.substring(c.start + c.length) : 8 === r && c.start ? o = o.substring(0, c.start - 1) + o.substring(c.start + 1) : 46 === r && void 0 !== c.start && (o = o.substring(0, c.start) + o.substring(c.start + 1)) : s && (p = n.shiftKey, u = String.fromCharCode(n.keyCode), u = p ? u.toUpperCase() : u.toLowerCase(), o += u)), a = e.attr("placeholder"), !o && a && (o = a), (l = w(o, e) + 4) !== t && (t = l, e.width(l), e.triggerHandler("resize")))
                };
            e.on("keydown keyup update blur", n), n()
        },
        C = function(e) {
            var t = document.createElement("div");
            return t.appendChild(e.cloneNode(!0)), t.innerHTML
        },
        $ = function(n, i) {
            var o, r, s, a, l = this;
            (a = n[0]).selectize = l;
            var p = window.getComputedStyle && window.getComputedStyle(a, null);
            if (s = p ? p.getPropertyValue("direction") : a.currentStyle && a.currentStyle.direction, s = s || n.parents("[dir]:first").attr("dir") || "", e.extend(l, {
                    order: 0,
                    settings: i,
                    $input: n,
                    tabIndex: n.attr("tabindex") || "",
                    tagType: "select" === a.tagName.toLowerCase() ? 1 : 2,
                    rtl: /rtl/i.test(s),
                    eventNS: ".selectize" + ++$.count,
                    highlightedValue: null,
                    isOpen: !1,
                    isDisabled: !1,
                    isRequired: n.is("[required]"),
                    isInvalid: !1,
                    isLocked: !1,
                    isFocused: !1,
                    isInputHidden: !1,
                    isSetup: !1,
                    isShiftDown: !1,
                    isCmdDown: !1,
                    isCtrlDown: !1,
                    ignoreFocus: !1,
                    ignoreBlur: !1,
                    ignoreHover: !1,
                    hasOptions: !1,
                    currentResults: null,
                    lastValue: "",
                    caretPos: 0,
                    loading: 0,
                    loadedSearches: {},
                    $activeOption: null,
                    $activeItems: [],
                    optgroups: {},
                    options: {},
                    userOptions: {},
                    items: [],
                    renderCache: {},
                    onSearchChange: null === i.loadThrottle ? l.onSearchChange : f(l.onSearchChange, i.loadThrottle)
                }), l.sifter = new t(this.options, {
                    diacritics: i.diacritics
                }), l.settings.options) {
                for (o = 0, r = l.settings.options.length; o < r; o++) l.registerOption(l.settings.options[o]);
                delete l.settings.options
            }
            if (l.settings.optgroups) {
                for (o = 0, r = l.settings.optgroups.length; o < r; o++) l.registerOptionGroup(l.settings.optgroups[o]);
                delete l.settings.optgroups
            }
            l.settings.mode = l.settings.mode || (1 === l.settings.maxItems ? "single" : "multi"), "boolean" != typeof l.settings.hideSelected && (l.settings.hideSelected = "multi" === l.settings.mode), l.initializePlugins(l.settings.plugins), l.setupCallbacks(), l.setupTemplates(), l.setup()
        };
    return o.mixin($), void 0 !== n ? n.mixin($) : function(e, t) {
        t || (t = {});
        console.error("Selectize: " + e), t.explanation && (console.group && console.group(), console.error(t.explanation), console.group && console.groupEnd())
    }("Dependency MicroPlugin is missing", {
        explanation: 'Make sure you either: (1) are using the "standalone" version of Selectize, or (2) require MicroPlugin before you load Selectize.'
    }), e.extend($.prototype, {
        setup: function() {
            var t, n, i, o, p, u, c, d, h, f, g = this,
                m = g.settings,
                y = g.eventNS,
                w = e(window),
                C = e(document),
                $ = g.$input;
            if (c = g.settings.mode, d = $.attr("class") || "", t = e("<div>").addClass(m.wrapperClass).addClass(d).addClass(c), n = e("<div>").addClass(m.inputClass).addClass("items").appendTo(t), i = e('<input type="text" autocomplete="off" />').appendTo(n).attr("tabindex", $.is(":disabled") ? "-1" : g.tabIndex), u = e(m.dropdownParent || t), o = e("<div>").addClass(m.dropdownClass).addClass(c).hide().appendTo(u), p = e("<div>").addClass(m.dropdownContentClass).appendTo(o), (f = $.attr("id")) && (i.attr("id", f + "-selectized"), e("label[for='" + f + "']").attr("for", f + "-selectized")), g.settings.copyClassesToDropdown && o.addClass(d), t.css({
                    width: $[0].style.width
                }), g.plugins.names.length && (h = "plugin-" + g.plugins.names.join(" plugin-"), t.addClass(h), o.addClass(h)), (null === m.maxItems || m.maxItems > 1) && 1 === g.tagType && $.attr("multiple", "multiple"), g.settings.placeholder && i.attr("placeholder", m.placeholder), !g.settings.splitOn && g.settings.delimiter) {
                var b = g.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                g.settings.splitOn = new RegExp("\\s*" + b + "+\\s*")
            }
            $.attr("autocorrect") && i.attr("autocorrect", $.attr("autocorrect")), $.attr("autocapitalize") && i.attr("autocapitalize", $.attr("autocapitalize")), g.$wrapper = t, g.$control = n, g.$control_input = i, g.$dropdown = o, g.$dropdown_content = p, o.on("mouseenter", "[data-selectable]", function() {
                return g.onOptionHover.apply(g, arguments)
            }), o.on("mousedown click", "[data-selectable]", function() {
                return g.onOptionSelect.apply(g, arguments)
            }), v(n, "mousedown", "*:not(input)", function() {
                return g.onItemSelect.apply(g, arguments)
            }), O(i), n.on({
                mousedown: function() {
                    return g.onMouseDown.apply(g, arguments)
                },
                click: function() {
                    return g.onClick.apply(g, arguments)
                }
            }), i.on({
                mousedown: function(e) {
                    e.stopPropagation()
                },
                keydown: function() {
                    return g.onKeyDown.apply(g, arguments)
                },
                keyup: function() {
                    return g.onKeyUp.apply(g, arguments)
                },
                keypress: function() {
                    return g.onKeyPress.apply(g, arguments)
                },
                resize: function() {
                    g.positionDropdown.apply(g, [])
                },
                blur: function() {
                    return g.onBlur.apply(g, arguments)
                },
                focus: function() {
                    return g.ignoreBlur = !1, g.onFocus.apply(g, arguments)
                },
                paste: function() {
                    return g.onPaste.apply(g, arguments)
                }
            }), C.on("keydown" + y, function(e) {
                g.isCmdDown = e[r ? "metaKey" : "ctrlKey"], g.isCtrlDown = e[r ? "altKey" : "ctrlKey"], g.isShiftDown = e.shiftKey
            }), C.on("keyup" + y, function(e) {
                e.keyCode === a && (g.isCtrlDown = !1), 16 === e.keyCode && (g.isShiftDown = !1), e.keyCode === s && (g.isCmdDown = !1)
            }), C.on("mousedown" + y, function(e) {
                if (g.isFocused) {
                    if (e.target === g.$dropdown[0] || e.target.parentNode === g.$dropdown[0]) return !1;
                    g.$control.has(e.target).length || e.target === g.$control[0] || g.blur(e.target)
                }
            }), w.on(["scroll" + y, "resize" + y].join(" "), function() {
                g.isOpen && g.positionDropdown.apply(g, arguments)
            }), w.on("mousemove" + y, function() {
                g.ignoreHover = !1
            }), this.revertSettings = {
                $children: $.children().detach(),
                tabindex: $.attr("tabindex")
            }, $.attr("tabindex", -1).hide().after(g.$wrapper), e.isArray(m.items) && (g.setValue(m.items), delete m.items), l && $.on("invalid" + y, function(e) {
                e.preventDefault(), g.isInvalid = !0, g.refreshState()
            }), g.updateOriginalInput(), g.refreshItems(), g.refreshState(), g.updatePlaceholder(), g.isSetup = !0, $.is(":disabled") && g.disable(), g.on("change", this.onChange), $.data("selectize", g), $.addClass("selectized"), g.trigger("initialize"), !0 === m.preload && g.onSearchChange("")
        },
        setupTemplates: function() {
            var t = this,
                n = t.settings.labelField,
                i = t.settings.optgroupLabelField,
                o = {
                    optgroup: function(e) {
                        return '<div class="optgroup">' + e.html + "</div>"
                    },
                    optgroup_header: function(e, t) {
                        return '<div class="optgroup-header">' + t(e[i]) + "</div>"
                    },
                    option: function(e, t) {
                        return '<div class="option">' + t(e[n]) + "</div>"
                    },
                    item: function(e, t) {
                        return '<div class="item">' + t(e[n]) + "</div>"
                    },
                    option_create: function(e, t) {
                        return '<div class="create">Add <strong>' + t(e.input) + "</strong>&hellip;</div>"
                    }
                };
            t.settings.render = e.extend({}, o, t.settings.render)
        },
        setupCallbacks: function() {
            var e, t, n = {
                initialize: "onInitialize",
                change: "onChange",
                item_add: "onItemAdd",
                item_remove: "onItemRemove",
                clear: "onClear",
                option_add: "onOptionAdd",
                option_remove: "onOptionRemove",
                option_clear: "onOptionClear",
                optgroup_add: "onOptionGroupAdd",
                optgroup_remove: "onOptionGroupRemove",
                optgroup_clear: "onOptionGroupClear",
                dropdown_open: "onDropdownOpen",
                dropdown_close: "onDropdownClose",
                type: "onType",
                load: "onLoad",
                focus: "onFocus",
                blur: "onBlur"
            };
            for (e in n) n.hasOwnProperty(e) && (t = this.settings[n[e]]) && this.on(e, t)
        },
        onClick: function(e) {
            var t = this;
            t.isFocused || (t.focus(), e.preventDefault())
        },
        onMouseDown: function(t) {
            var n = this,
                i = t.isDefaultPrevented();
            if (e(t.target), n.isFocused) {
                if (t.target !== n.$control_input[0]) return "single" === n.settings.mode ? n.isOpen ? n.close() : n.open() : i || n.setActiveItem(null), !1
            } else i || window.setTimeout(function() {
                n.focus()
            }, 0)
        },
        onChange: function() {
            this.$input.trigger("change")
        },
        onPaste: function(t) {
            var n = this;
            return n.isFull() || n.isInputHidden || n.isLocked ? void t.preventDefault() : void(n.settings.splitOn && setTimeout(function() {
                var t = n.$control_input.val();
                if (t.match(n.settings.splitOn))
                    for (var i = e.trim(t).split(n.settings.splitOn), o = 0, r = i.length; o < r; o++) n.createItem(i[o])
            }, 0))
        },
        onKeyPress: function(e) {
            if (this.isLocked) return e && e.preventDefault();
            var t = String.fromCharCode(e.keyCode || e.which);
            return this.settings.create && "multi" === this.settings.mode && t === this.settings.delimiter ? (this.createItem(), e.preventDefault(), !1) : void 0
        },
        onKeyDown: function(e) {
            var t = (e.target, this.$control_input[0], this); {
                if (!t.isLocked) {
                    switch (e.keyCode) {
                        case 65:
                            if (t.isCmdDown) return void t.selectAll();
                            break;
                        case 27:
                            return void(t.isOpen && (e.preventDefault(), e.stopPropagation(), t.close()));
                        case 78:
                            if (!e.ctrlKey || e.altKey) break;
                        case 40:
                            if (!t.isOpen && t.hasOptions) t.open();
                            else if (t.$activeOption) {
                                t.ignoreHover = !0;
                                var n = t.getAdjacentOption(t.$activeOption, 1);
                                n.length && t.setActiveOption(n, !0, !0)
                            }
                            return void e.preventDefault();
                        case 80:
                            if (!e.ctrlKey || e.altKey) break;
                        case 38:
                            if (t.$activeOption) {
                                t.ignoreHover = !0;
                                var i = t.getAdjacentOption(t.$activeOption, -1);
                                i.length && t.setActiveOption(i, !0, !0)
                            }
                            return void e.preventDefault();
                        case 13:
                            return void(t.isOpen && t.$activeOption && (t.onOptionSelect({
                                currentTarget: t.$activeOption
                            }), e.preventDefault()));
                        case 37:
                            return void t.advanceSelection(-1, e);
                        case 39:
                            return void t.advanceSelection(1, e);
                        case 9:
                            return t.settings.selectOnTab && t.isOpen && t.$activeOption && (t.onOptionSelect({
                                currentTarget: t.$activeOption
                            }), t.isFull() || e.preventDefault()), void(t.settings.create && t.createItem() && e.preventDefault());
                        case 8:
                        case 46:
                            return void t.deleteSelection(e)
                    }
                    return !t.isFull() && !t.isInputHidden || (r ? e.metaKey : e.ctrlKey) ? void 0 : void e.preventDefault()
                }
                9 !== e.keyCode && e.preventDefault()
            }
        },
        onKeyUp: function(e) {
            var t = this;
            if (t.isLocked) return e && e.preventDefault();
            var n = t.$control_input.val() || "";
            t.lastValue !== n && (t.lastValue = n, t.onSearchChange(n), t.refreshOptions(), t.trigger("type", n))
        },
        onSearchChange: function(e) {
            var t = this,
                n = t.settings.load;
            n && (t.loadedSearches.hasOwnProperty(e) || (t.loadedSearches[e] = !0, t.load(function(i) {
                n.apply(t, [e, i])
            })))
        },
        onFocus: function(e) {
            var t = this,
                n = t.isFocused;
            return t.isDisabled ? (t.blur(), e && e.preventDefault(), !1) : void(t.ignoreFocus || (t.isFocused = !0, "focus" === t.settings.preload && t.onSearchChange(""), n || t.trigger("focus"), t.$activeItems.length || (t.showInput(), t.setActiveItem(null), t.refreshOptions(!!t.settings.openOnFocus)), t.refreshState()))
        },
        onBlur: function(e, t) {
            var n = this;
            if (n.isFocused && (n.isFocused = !1, !n.ignoreFocus)) {
                if (!n.ignoreBlur && document.activeElement === n.$dropdown_content[0]) return n.ignoreBlur = !0, void n.onFocus(e);
                var i = function() {
                    n.close(), n.setTextboxValue(""), n.setActiveItem(null), n.setActiveOption(null), n.setCaret(n.items.length), n.refreshState(), t && t.focus && t.focus(), n.ignoreFocus = !1, n.trigger("blur")
                };
                n.ignoreFocus = !0, n.settings.create && n.settings.createOnBlur ? n.createItem(null, !1, i) : i()
            }
        },
        onOptionHover: function(e) {
            this.ignoreHover || this.setActiveOption(e.currentTarget, !1)
        },
        onOptionSelect: function(t) {
            var n, i, o = this;
            t.preventDefault && (t.preventDefault(), t.stopPropagation()), (i = e(t.currentTarget)).hasClass("create") ? o.createItem(null, function() {
                o.settings.closeAfterSelect && o.close()
            }) : void 0 !== (n = i.attr("data-value")) && (o.lastQuery = null, o.setTextboxValue(""), o.addItem(n), o.settings.closeAfterSelect ? o.close() : !o.settings.hideSelected && t.type && /mouse/.test(t.type) && o.setActiveOption(o.getOption(n)))
        },
        onItemSelect: function(e) {
            var t = this;
            t.isLocked || "multi" === t.settings.mode && (e.preventDefault(), t.setActiveItem(e.currentTarget, e))
        },
        load: function(e) {
            var t = this,
                n = t.$wrapper.addClass(t.settings.loadingClass);
            t.loading++, e.apply(t, [function(e) {
                t.loading = Math.max(t.loading - 1, 0), e && e.length && (t.addOption(e), t.refreshOptions(t.isFocused && !t.isInputHidden)), t.loading || n.removeClass(t.settings.loadingClass), t.trigger("load", e)
            }])
        },
        setTextboxValue: function(e) {
            var t = this.$control_input;
            t.val() !== e && (t.val(e).triggerHandler("update"), this.lastValue = e)
        },
        getValue: function() {
            return 1 === this.tagType && this.$input.attr("multiple") ? this.items : this.items.join(this.settings.delimiter)
        },
        setValue: function(e, t) {
            g(this, t ? [] : ["change"], function() {
                this.clear(t), this.addItems(e, t)
            })
        },
        setActiveItem: function(t, n) {
            var i, o, r, s, a, l, p, u, c = this;
            if ("single" !== c.settings.mode) {
                if (!(t = e(t)).length) return e(c.$activeItems).removeClass("active"), c.$activeItems = [], void(c.isFocused && c.showInput());
                if ("mousedown" === (i = n && n.type.toLowerCase()) && c.isShiftDown && c.$activeItems.length) {
                    for (u = c.$control.children(".active:last"), (s = Array.prototype.indexOf.apply(c.$control[0].childNodes, [u[0]])) > (a = Array.prototype.indexOf.apply(c.$control[0].childNodes, [t[0]])) && (p = s, s = a, a = p), o = s; o <= a; o++) l = c.$control[0].childNodes[o], -1 === c.$activeItems.indexOf(l) && (e(l).addClass("active"), c.$activeItems.push(l));
                    n.preventDefault()
                } else "mousedown" === i && c.isCtrlDown || "keydown" === i && this.isShiftDown ? t.hasClass("active") ? (r = c.$activeItems.indexOf(t[0]), c.$activeItems.splice(r, 1), t.removeClass("active")) : c.$activeItems.push(t.addClass("active")[0]) : (e(c.$activeItems).removeClass("active"), c.$activeItems = [t.addClass("active")[0]]);
                c.hideInput(), this.isFocused || c.focus()
            }
        },
        setActiveOption: function(t, n, i) {
            var o, r, s, a, l, u = this;
            u.$activeOption && u.$activeOption.removeClass("active"), u.$activeOption = null, (t = e(t)).length && (u.$activeOption = t.addClass("active"), !n && p(n) || (o = u.$dropdown_content.height(), r = u.$activeOption.outerHeight(!0), n = u.$dropdown_content.scrollTop() || 0, s = u.$activeOption.offset().top - u.$dropdown_content.offset().top + n, a = s, l = s - o + r, s + r > o + n ? u.$dropdown_content.stop().animate({
                scrollTop: l
            }, i ? u.settings.scrollDuration : 0) : s < n && u.$dropdown_content.stop().animate({
                scrollTop: a
            }, i ? u.settings.scrollDuration : 0)))
        },
        selectAll: function() {
            var e = this;
            "single" !== e.settings.mode && (e.$activeItems = Array.prototype.slice.apply(e.$control.children(":not(input)").addClass("active")), e.$activeItems.length && (e.hideInput(), e.close()), e.focus())
        },
        hideInput: function() {
            var e = this;
            e.setTextboxValue(""), e.$control_input.css({
                opacity: 0,
                position: "relative",
                left: e.rtl ? 1e4 : -1e4
            }), e.isInputHidden = !0
        },
        showInput: function() {
            this.$control_input.css({
                opacity: 1,
                position: "relative",
                left: 0
            }), this.isInputHidden = !1
        },
        focus: function() {
            var e = this;
            e.isDisabled || (e.ignoreFocus = !0, e.$control_input[0].focus(), window.setTimeout(function() {
                e.ignoreFocus = !1, e.onFocus()
            }, 0))
        },
        blur: function(e) {
            this.$control_input[0].blur(), this.onBlur(null, e)
        },
        getScoreFunction: function(e) {
            return this.sifter.getScoreFunction(e, this.getSearchOptions())
        },
        getSearchOptions: function() {
            var e = this.settings,
                t = e.sortField;
            return "string" == typeof t && (t = [{
                field: t
            }]), {
                fields: e.searchField,
                conjunction: e.searchConjunction,
                sort: t
            }
        },
        search: function(t) {
            var n, i, o, r = this,
                s = r.settings,
                a = this.getSearchOptions();
            if (s.score && "function" != typeof(o = r.settings.score.apply(this, [t]))) throw new Error('Selectize "score" setting must be a function that returns a function');
            if (t !== r.lastQuery ? (r.lastQuery = t, i = r.sifter.search(t, e.extend(a, {
                    score: o
                })), r.currentResults = i) : i = e.extend(!0, {}, r.currentResults), s.hideSelected)
                for (n = i.items.length - 1; n >= 0; n--) - 1 !== r.items.indexOf(u(i.items[n].id)) && i.items.splice(n, 1);
            return i
        },
        refreshOptions: function(t) {
            var n, o, r, s, a, l, p, c, d, h, f, g, v, m, y, w;
            void 0 === t && (t = !0);
            var O = this,
                $ = e.trim(O.$control_input.val()),
                b = O.search($),
                x = O.$dropdown_content,
                S = O.$activeOption && u(O.$activeOption.attr("data-value"));
            for (s = b.items.length, "number" == typeof O.settings.maxOptions && (s = Math.min(s, O.settings.maxOptions)), a = {}, l = [], n = 0; n < s; n++)
                for (p = O.options[b.items[n].id], c = O.render("option", p), d = p[O.settings.optgroupField] || "", h = e.isArray(d) ? d : [d], o = 0, r = h && h.length; o < r; o++) d = h[o], O.optgroups.hasOwnProperty(d) || (d = ""), a.hasOwnProperty(d) || (a[d] = document.createDocumentFragment(), l.push(d)), a[d].appendChild(c);
            for (this.settings.lockOptgroupOrder && l.sort(function(e, t) {
                    return (O.optgroups[e].$order || 0) - (O.optgroups[t].$order || 0)
                }), f = document.createDocumentFragment(), n = 0, s = l.length; n < s; n++) d = l[n], O.optgroups.hasOwnProperty(d) && a[d].childNodes.length ? ((g = document.createDocumentFragment()).appendChild(O.render("optgroup_header", O.optgroups[d])), g.appendChild(a[d]), f.appendChild(O.render("optgroup", e.extend({}, O.optgroups[d], {
                html: C(g),
                dom: g
            })))) : f.appendChild(a[d]);
            if (x.html(f), O.settings.highlight && b.query.length && b.tokens.length)
                for (x.removeHighlight(), n = 0, s = b.tokens.length; n < s; n++) i(x, b.tokens[n].regex);
            if (!O.settings.hideSelected)
                for (n = 0, s = O.items.length; n < s; n++) O.getOption(O.items[n]).addClass("selected");
            (v = O.canCreate($)) && (x.prepend(O.render("option_create", {
                input: $
            })), w = e(x[0].childNodes[0])), O.hasOptions = b.items.length > 0 || v, O.hasOptions ? (b.items.length > 0 ? ((y = S && O.getOption(S)) && y.length ? m = y : "single" === O.settings.mode && O.items.length && (m = O.getOption(O.items[0])), m && m.length || (m = w && !O.settings.addPrecedence ? O.getAdjacentOption(w, 1) : x.find("[data-selectable]:first"))) : m = w, O.setActiveOption(m), t && !O.isOpen && O.open()) : (O.setActiveOption(null), t && O.isOpen && O.close())
        },
        addOption: function(t) {
            var n, i, o, r = this;
            if (e.isArray(t))
                for (n = 0, i = t.length; n < i; n++) r.addOption(t[n]);
            else(o = r.registerOption(t)) && (r.userOptions[o] = !0, r.lastQuery = null, r.trigger("option_add", o, t))
        },
        registerOption: function(e) {
            var t = u(e[this.settings.valueField]);
            return void 0 !== t && null !== t && !this.options.hasOwnProperty(t) && (e.$order = e.$order || ++this.order, this.options[t] = e, t)
        },
        registerOptionGroup: function(e) {
            var t = u(e[this.settings.optgroupValueField]);
            return !!t && (e.$order = e.$order || ++this.order, this.optgroups[t] = e, t)
        },
        addOptionGroup: function(e, t) {
            t[this.settings.optgroupValueField] = e, (e = this.registerOptionGroup(t)) && this.trigger("optgroup_add", e, t)
        },
        removeOptionGroup: function(e) {
            this.optgroups.hasOwnProperty(e) && (delete this.optgroups[e], this.renderCache = {}, this.trigger("optgroup_remove", e))
        },
        clearOptionGroups: function() {
            this.optgroups = {}, this.renderCache = {}, this.trigger("optgroup_clear")
        },
        updateOption: function(t, n) {
            var i, o, r, s, a, l, p, c = this;
            if (t = u(t), r = u(n[c.settings.valueField]), null !== t && c.options.hasOwnProperty(t)) {
                if ("string" != typeof r) throw new Error("Value must be set in option data");
                p = c.options[t].$order, r !== t && (delete c.options[t], -1 !== (s = c.items.indexOf(t)) && c.items.splice(s, 1, r)), n.$order = n.$order || p, c.options[r] = n, a = c.renderCache.item, l = c.renderCache.option, a && (delete a[t], delete a[r]), l && (delete l[t], delete l[r]), -1 !== c.items.indexOf(r) && (i = c.getItem(t), o = e(c.render("item", n)), i.hasClass("active") && o.addClass("active"), i.replaceWith(o)), c.lastQuery = null, c.isOpen && c.refreshOptions(!1)
            }
        },
        removeOption: function(e, t) {
            var n = this;
            e = u(e);
            var i = n.renderCache.item,
                o = n.renderCache.option;
            i && delete i[e], o && delete o[e], delete n.userOptions[e], delete n.options[e], n.lastQuery = null, n.trigger("option_remove", e), n.removeItem(e, t)
        },
        clearOptions: function() {
            var e = this;
            e.loadedSearches = {}, e.userOptions = {}, e.renderCache = {}, e.options = e.sifter.items = {}, e.lastQuery = null, e.trigger("option_clear"), e.clear()
        },
        getOption: function(e) {
            return this.getElementWithValue(e, this.$dropdown_content.find("[data-selectable]"))
        },
        getAdjacentOption: function(t, n) {
            var i = this.$dropdown.find("[data-selectable]"),
                o = i.index(t) + n;
            return o >= 0 && o < i.length ? i.eq(o) : e()
        },
        getElementWithValue: function(t, n) {
            if (void 0 !== (t = u(t)) && null !== t)
                for (var i = 0, o = n.length; i < o; i++)
                    if (n[i].getAttribute("data-value") === t) return e(n[i]);
            return e()
        },
        getItem: function(e) {
            return this.getElementWithValue(e, this.$control.children())
        },
        addItems: function(t, n) {
            for (var i = e.isArray(t) ? t : [t], o = 0, r = i.length; o < r; o++) this.isPending = o < r - 1, this.addItem(i[o], n)
        },
        addItem: function(t, n) {
            g(this, n ? [] : ["change"], function() {
                var i, o, r, s, a, l = this,
                    p = l.settings.mode;
                return t = u(t), -1 !== l.items.indexOf(t) ? void("single" === p && l.close()) : void(l.options.hasOwnProperty(t) && ("single" === p && l.clear(n), "multi" === p && l.isFull() || (i = e(l.render("item", l.options[t])), a = l.isFull(), l.items.splice(l.caretPos, 0, t), l.insertAtCaret(i), (!l.isPending || !a && l.isFull()) && l.refreshState(), l.isSetup && (r = l.$dropdown_content.find("[data-selectable]"), l.isPending || (o = l.getOption(t), s = l.getAdjacentOption(o, 1).attr("data-value"), l.refreshOptions(l.isFocused && "single" !== p), s && l.setActiveOption(l.getOption(s))), !r.length || l.isFull() ? l.close() : l.positionDropdown(), l.updatePlaceholder(), l.trigger("item_add", t, i), l.updateOriginalInput({
                    silent: n
                })))))
            })
        },
        removeItem: function(t, n) {
            var i, o, r, s = this;
            i = t instanceof e ? t : s.getItem(t), t = u(i.attr("data-value")), -1 !== (o = s.items.indexOf(t)) && (i.remove(), i.hasClass("active") && (r = s.$activeItems.indexOf(i[0]), s.$activeItems.splice(r, 1)), s.items.splice(o, 1), s.lastQuery = null, !s.settings.persist && s.userOptions.hasOwnProperty(t) && s.removeOption(t, n), o < s.caretPos && s.setCaret(s.caretPos - 1), s.refreshState(), s.updatePlaceholder(), s.updateOriginalInput({
                silent: n
            }), s.positionDropdown(), s.trigger("item_remove", t, i))
        },
        createItem: function(t, n) {
            var i = this,
                o = i.caretPos;
            t = t || e.trim(i.$control_input.val() || "");
            var r = arguments[arguments.length - 1];
            if ("function" != typeof r && (r = function() {}), "boolean" != typeof n && (n = !0), !i.canCreate(t)) return r(), !1;
            i.lock();
            var s = "function" == typeof i.settings.create ? this.settings.create : function(e) {
                    var t = {};
                    return t[i.settings.labelField] = e, t[i.settings.valueField] = e, t
                },
                a = h(function(e) {
                    if (i.unlock(), !e || "object" != typeof e) return r();
                    var t = u(e[i.settings.valueField]);
                    return "string" != typeof t ? r() : (i.setTextboxValue(""), i.addOption(e), i.setCaret(o), i.addItem(t), i.refreshOptions(n && "single" !== i.settings.mode), void r(e))
                }),
                l = s.apply(this, [t, a]);
            return void 0 !== l && a(l), !0
        },
        refreshItems: function() {
            this.lastQuery = null, this.isSetup && this.addItem(this.items), this.refreshState(), this.updateOriginalInput()
        },
        refreshState: function() {
            this.refreshValidityState(), this.refreshClasses()
        },
        refreshValidityState: function() {
            if (!this.isRequired) return !1;
            var e = !this.items.length;
            this.isInvalid = e, this.$control_input.prop("required", e), this.$input.prop("required", !e)
        },
        refreshClasses: function() {
            var t = this,
                n = t.isFull(),
                i = t.isLocked;
            t.$wrapper.toggleClass("rtl", t.rtl), t.$control.toggleClass("focus", t.isFocused).toggleClass("disabled", t.isDisabled).toggleClass("required", t.isRequired).toggleClass("invalid", t.isInvalid).toggleClass("locked", i).toggleClass("full", n).toggleClass("not-full", !n).toggleClass("input-active", t.isFocused && !t.isInputHidden).toggleClass("dropdown-active", t.isOpen).toggleClass("has-options", !e.isEmptyObject(t.options)).toggleClass("has-items", t.items.length > 0), t.$control_input.data("grow", !n && !i)
        },
        isFull: function() {
            return null !== this.settings.maxItems && this.items.length >= this.settings.maxItems
        },
        updateOriginalInput: function(e) {
            var t, n, i, o, r = this;
            if (e = e || {}, 1 === r.tagType) {
                for (i = [], t = 0, n = r.items.length; t < n; t++) o = r.options[r.items[t]][r.settings.labelField] || "", i.push('<option value="' + c(r.items[t]) + '" selected="selected">' + c(o) + "</option>");
                i.length || this.$input.attr("multiple") || i.push('<option value="" selected="selected"></option>'), r.$input.html(i.join(""))
            } else r.$input.val(r.getValue()), r.$input.attr("value", r.$input.val());
            r.isSetup && (e.silent || r.trigger("change", r.$input.val()))
        },
        updatePlaceholder: function() {
            if (this.settings.placeholder) {
                var e = this.$control_input;
                this.items.length ? e.removeAttr("placeholder") : e.attr("placeholder", this.settings.placeholder), e.triggerHandler("update", {
                    force: !0
                })
            }
        },
        open: function() {
            var e = this;
            e.isLocked || e.isOpen || "multi" === e.settings.mode && e.isFull() || (e.focus(), e.isOpen = !0, e.refreshState(), e.$dropdown.css({
                visibility: "hidden",
                display: "block"
            }), e.positionDropdown(), e.$dropdown.css({
                visibility: "visible"
            }), e.trigger("dropdown_open", e.$dropdown))
        },
        close: function() {
            var e = this,
                t = e.isOpen;
            "single" === e.settings.mode && e.items.length && (e.hideInput(), e.$control_input.blur()), e.isOpen = !1, e.$dropdown.hide(), e.setActiveOption(null), e.refreshState(), t && e.trigger("dropdown_close", e.$dropdown)
        },
        positionDropdown: function() {
            var e = this.$control,
                t = "body" === this.settings.dropdownParent ? e.offset() : e.position();
            t.top += e.outerHeight(!0), this.$dropdown.css({
                width: e.outerWidth(),
                top: t.top,
                left: t.left
            })
        },
        clear: function(e) {
            var t = this;
            t.items.length && (t.$control.children(":not(input)").remove(), t.items = [], t.lastQuery = null, t.setCaret(0), t.setActiveItem(null), t.updatePlaceholder(), t.updateOriginalInput({
                silent: e
            }), t.refreshState(), t.showInput(), t.trigger("clear"))
        },
        insertAtCaret: function(t) {
            var n = Math.min(this.caretPos, this.items.length);
            0 === n ? this.$control.prepend(t) : e(this.$control[0].childNodes[n]).before(t), this.setCaret(n + 1)
        },
        deleteSelection: function(t) {
            var n, i, o, r, s, a, l, p, u, c = this;
            if (o = t && 8 === t.keyCode ? -1 : 1, r = m(c.$control_input[0]), c.$activeOption && !c.settings.hideSelected && (l = c.getAdjacentOption(c.$activeOption, -1).attr("data-value")), s = [], c.$activeItems.length) {
                for (u = c.$control.children(".active:" + (o > 0 ? "last" : "first")), a = c.$control.children(":not(input)").index(u), o > 0 && a++, n = 0, i = c.$activeItems.length; n < i; n++) s.push(e(c.$activeItems[n]).attr("data-value"));
                t && (t.preventDefault(), t.stopPropagation())
            } else(c.isFocused || "single" === c.settings.mode) && c.items.length && (o < 0 && 0 === r.start && 0 === r.length ? s.push(c.items[c.caretPos - 1]) : o > 0 && r.start === c.$control_input.val().length && s.push(c.items[c.caretPos]));
            if (!s.length || "function" == typeof c.settings.onDelete && !1 === c.settings.onDelete.apply(c, [s])) return !1;
            for (void 0 !== a && c.setCaret(a); s.length;) c.removeItem(s.pop());
            return c.showInput(), c.positionDropdown(), c.refreshOptions(!0), l && (p = c.getOption(l)).length && c.setActiveOption(p), !0
        },
        advanceSelection: function(e, t) {
            var n, i, o, r, s, a = this;
            0 !== e && (a.rtl && (e *= -1), n = e > 0 ? "last" : "first", i = m(a.$control_input[0]), a.isFocused && !a.isInputHidden ? (r = a.$control_input.val().length, (e < 0 ? 0 === i.start && 0 === i.length : i.start === r) && !r && a.advanceCaret(e, t)) : (s = a.$control.children(".active:" + n)).length && (o = a.$control.children(":not(input)").index(s), a.setActiveItem(null), a.setCaret(e > 0 ? o + 1 : o)))
        },
        advanceCaret: function(e, t) {
            var n, i, o = this;
            0 !== e && (n = e > 0 ? "next" : "prev", o.isShiftDown ? (i = o.$control_input[n]()).length && (o.hideInput(), o.setActiveItem(i), t && t.preventDefault()) : o.setCaret(o.caretPos + e))
        },
        setCaret: function(t) {
            var n = this;
            if (t = "single" === n.settings.mode ? n.items.length : Math.max(0, Math.min(n.items.length, t)), !n.isPending) {
                var i, o, r, s;
                for (i = 0, o = (r = n.$control.children(":not(input)")).length; i < o; i++) s = e(r[i]).detach(), i < t ? n.$control_input.before(s) : n.$control.append(s)
            }
            n.caretPos = t
        },
        lock: function() {
            this.close(), this.isLocked = !0, this.refreshState()
        },
        unlock: function() {
            this.isLocked = !1, this.refreshState()
        },
        disable: function() {
            var e = this;
            e.$input.prop("disabled", !0), e.$control_input.prop("disabled", !0).prop("tabindex", -1), e.isDisabled = !0, e.lock()
        },
        enable: function() {
            var e = this;
            e.$input.prop("disabled", !1), e.$control_input.prop("disabled", !1).prop("tabindex", e.tabIndex), e.isDisabled = !1, e.unlock()
        },
        destroy: function() {
            var t = this,
                n = t.eventNS,
                i = t.revertSettings;
            t.trigger("destroy"), t.off(), t.$wrapper.remove(), t.$dropdown.remove(), t.$input.html("").append(i.$children).removeAttr("tabindex").removeClass("selectized").attr({
                tabindex: i.tabindex
            }).show(), t.$control_input.removeData("grow"), t.$input.removeData("selectize"), e(window).off(n), e(document).off(n), e(document.body).off(n), delete t.$input[0].selectize
        },
        render: function(t, n) {
            var i, o, r = "",
                s = !1,
                a = this;
            return "option" !== t && "item" !== t || (i = u(n[a.settings.valueField]), s = !!i), s && (p(a.renderCache[t]) || (a.renderCache[t] = {}), a.renderCache[t].hasOwnProperty(i)) ? a.renderCache[t][i] : (r = e(a.settings.render[t].apply(this, [n, c])), "option" === t || "option_create" === t ? r.attr("data-selectable", "") : "optgroup" === t && (o = n[a.settings.optgroupValueField] || "", r.attr("data-group", o)), "option" !== t && "item" !== t || r.attr("data-value", i || ""), s && (a.renderCache[t][i] = r[0]), r[0])
        },
        clearCache: function(e) {
            var t = this;
            void 0 === e ? t.renderCache = {} : delete t.renderCache[e]
        },
        canCreate: function(e) {
            var t = this;
            if (!t.settings.create) return !1;
            var n = t.settings.createFilter;
            return e.length && ("function" != typeof n || n.apply(t, [e])) && ("string" != typeof n || new RegExp(n).test(e)) && (!(n instanceof RegExp) || n.test(e))
        }
    }), $.count = 0, $.defaults = {
        options: [],
        optgroups: [],
        plugins: [],
        delimiter: ",",
        splitOn: null,
        persist: !0,
        diacritics: !0,
        create: !1,
        createOnBlur: !1,
        createFilter: null,
        highlight: !0,
        openOnFocus: !0,
        maxOptions: 1e3,
        maxItems: null,
        hideSelected: null,
        addPrecedence: !1,
        selectOnTab: !1,
        preload: !1,
        allowEmptyOption: !1,
        closeAfterSelect: !1,
        scrollDuration: 60,
        loadThrottle: 300,
        loadingClass: "loading",
        dataAttr: "data-data",
        optgroupField: "optgroup",
        valueField: "value",
        labelField: "text",
        optgroupLabelField: "label",
        optgroupValueField: "value",
        lockOptgroupOrder: !1,
        sortField: "$order",
        searchField: ["text"],
        searchConjunction: "and",
        mode: null,
        wrapperClass: "selectize-control",
        inputClass: "selectize-input",
        dropdownClass: "selectize-dropdown",
        dropdownContentClass: "selectize-dropdown-content",
        dropdownParent: null,
        copyClassesToDropdown: !0,
        render: {}
    }, e.fn.selectize = function(t) {
        var n = e.fn.selectize.defaults,
            i = e.extend({}, n, t),
            o = i.dataAttr,
            r = i.labelField,
            s = i.valueField,
            a = i.optgroupField,
            l = i.optgroupLabelField,
            p = i.optgroupValueField,
            c = function(t, n) {
                var a, l, p, u, c = t.attr(o);
                if (c)
                    for (n.options = JSON.parse(c), a = 0, l = n.options.length; a < l; a++) n.items.push(n.options[a][s]);
                else {
                    var d = e.trim(t.val() || "");
                    if (!i.allowEmptyOption && !d.length) return;
                    for (a = 0, l = (p = d.split(i.delimiter)).length; a < l; a++) u = {}, u[r] = p[a], u[s] = p[a], n.options.push(u);
                    n.items = p
                }
            },
            d = function(t, n) {
                var c, d, h, f, g = n.options,
                    v = {},
                    m = function(e) {
                        var t = o && e.attr(o);
                        return "string" == typeof t && t.length ? JSON.parse(t) : null
                    },
                    y = function(t, o) {
                        t = e(t);
                        var l = u(t.val());
                        if (l || i.allowEmptyOption)
                            if (v.hasOwnProperty(l)) {
                                if (o) {
                                    var p = v[l][a];
                                    p ? e.isArray(p) ? p.push(o) : v[l][a] = [p, o] : v[l][a] = o
                                }
                            } else {
                                var c = m(t) || {};
                                c[r] = c[r] || t.text(), c[s] = c[s] || l, c[a] = c[a] || o, v[l] = c, g.push(c), t.is(":selected") && n.items.push(l)
                            }
                    };
                for (n.maxItems = t.attr("multiple") ? null : 1, c = 0, d = (f = t.children()).length; c < d; c++) "optgroup" === (h = f[c].tagName.toLowerCase()) ? function(t) {
                    var i, o, r, s, a;
                    for ((r = (t = e(t)).attr("label")) && (s = m(t) || {}, s[l] = r, s[p] = r, n.optgroups.push(s)), i = 0, o = (a = e("option", t)).length; i < o; i++) y(a[i], r)
                }(f[c]) : "option" === h && y(f[c])
            };
        return this.each(function() {
            if (!this.selectize) {
                var o = e(this),
                    r = this.tagName.toLowerCase(),
                    s = o.attr("placeholder") || o.attr("data-placeholder");
                s || i.allowEmptyOption || (s = o.children('option[value=""]').text());
                var a = {
                    placeholder: s,
                    options: [],
                    optgroups: [],
                    items: []
                };
                "select" === r ? d(o, a) : c(o, a), new $(o, e.extend(!0, {}, n, a, t))
            }
        })
    }, e.fn.selectize.defaults = $.defaults, e.fn.selectize.support = {
        validity: l
    }, $.define("drag_drop", function(t) {
        if (!e.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
        if ("multi" === this.settings.mode) {
            var n = this;
            n.lock = function() {
                var e = n.lock;
                return function() {
                    var t = n.$control.data("sortable");
                    return t && t.disable(), e.apply(n, arguments)
                }
            }(), n.unlock = function() {
                var e = n.unlock;
                return function() {
                    var t = n.$control.data("sortable");
                    return t && t.enable(), e.apply(n, arguments)
                }
            }(), n.setup = function() {
                var t = n.setup;
                return function() {
                    t.apply(this, arguments);
                    var i = n.$control.sortable({
                        items: "[data-value]",
                        forcePlaceholderSize: !0,
                        disabled: n.isLocked,
                        start: function(e, t) {
                            t.placeholder.css("width", t.helper.css("width")), i.css({
                                overflow: "visible"
                            })
                        },
                        stop: function() {
                            i.css({
                                overflow: "hidden"
                            });
                            var t = n.$activeItems ? n.$activeItems.slice() : null,
                                o = [];
                            i.children("[data-value]").each(function() {
                                o.push(e(this).attr("data-value"))
                            }), n.setValue(o), n.setActiveItem(t)
                        }
                    })
                }
            }()
        }
    }), $.define("dropdown_header", function(t) {
        var n = this;
        t = e.extend({
            title: "Untitled",
            headerClass: "selectize-dropdown-header",
            titleRowClass: "selectize-dropdown-header-title",
            labelClass: "selectize-dropdown-header-label",
            closeClass: "selectize-dropdown-header-close",
            html: function(e) {
                return '<div class="' + e.headerClass + '"><div class="' + e.titleRowClass + '"><span class="' + e.labelClass + '">' + e.title + '</span><a href="javascript:void(0)" class="' + e.closeClass + '">&times;</a></div></div>'
            }
        }, t), n.setup = function() {
            var i = n.setup;
            return function() {
                i.apply(n, arguments), n.$dropdown_header = e(t.html(t)), n.$dropdown.prepend(n.$dropdown_header)
            }
        }()
    }), $.define("optgroup_columns", function(t) {
        var n = this;
        t = e.extend({
            equalizeWidth: !0,
            equalizeHeight: !0
        }, t), this.getAdjacentOption = function(t, n) {
            var i = t.closest("[data-group]").find("[data-selectable]"),
                o = i.index(t) + n;
            return o >= 0 && o < i.length ? i.eq(o) : e()
        }, this.onKeyDown = function() {
            var e = n.onKeyDown;
            return function(t) {
                var i, o, r, s;
                return !this.isOpen || 37 !== t.keyCode && 39 !== t.keyCode ? e.apply(this, arguments) : (n.ignoreHover = !0, s = this.$activeOption.closest("[data-group]"), i = s.find("[data-selectable]").index(this.$activeOption), s = 37 === t.keyCode ? s.prev("[data-group]") : s.next("[data-group]"), r = s.find("[data-selectable]"), void((o = r.eq(Math.min(r.length - 1, i))).length && this.setActiveOption(o)))
            }
        }();
        var i = function() {
                var e, t = i.width,
                    n = document;
                return void 0 === t && (e = n.createElement("div"), e.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>', e = e.firstChild, n.body.appendChild(e), t = i.width = e.offsetWidth - e.clientWidth, n.body.removeChild(e)), t
            },
            o = function() {
                var o, r, s, a, l, p, u;
                if (u = e("[data-group]", n.$dropdown_content), (r = u.length) && n.$dropdown_content.width()) {
                    if (t.equalizeHeight) {
                        for (s = 0, o = 0; o < r; o++) s = Math.max(s, u.eq(o).height());
                        u.css({
                            height: s
                        })
                    }
                    t.equalizeWidth && (p = n.$dropdown_content.innerWidth() - i(), a = Math.round(p / r), u.css({
                        width: a
                    }), r > 1 && (l = p - a * (r - 1), u.eq(r - 1).css({
                        width: l
                    })))
                }
            };
        (t.equalizeHeight || t.equalizeWidth) && (d.after(this, "positionDropdown", o), d.after(this, "refreshOptions", o))
    }), $.define("remove_button", function(t) {
        t = e.extend({
            label: "&times;",
            title: "Remove",
            className: "remove",
            append: !0
        }, t);
        return "single" === this.settings.mode ? void
        function(t, n) {
            n.className = "remove-single";
            var i = t,
                o = '<a href="javascript:void(0)" class="' + n.className + '" tabindex="-1" title="' + c(n.title) + '">' + n.label + "</a>",
                r = function(e, t) {
                    return e + t
                };
            t.setup = function() {
                var s = i.setup;
                return function() {
                    if (n.append) {
                        var a = e(i.$input.context).attr("id"),
                            l = (e("#" + a), i.settings.render.item);
                        i.settings.render.item = function(e) {
                            return r(l.apply(t, arguments), o)
                        }
                    }
                    s.apply(t, arguments), t.$control.on("click", "." + n.className, function(e) {
                        e.preventDefault(), i.isLocked || i.clear()
                    })
                }
            }()
        }(this, t): void
        function(t, n) {
            var i = t,
                o = '<a href="javascript:void(0)" class="' + n.className + '" tabindex="-1" title="' + c(n.title) + '">' + n.label + "</a>",
                r = function(e, t) {
                    var n = e.search(/(<\/[^>]+>\s*)$/);
                    return e.substring(0, n) + t + e.substring(n)
                };
            t.setup = function() {
                var s = i.setup;
                return function() {
                    if (n.append) {
                        var a = i.settings.render.item;
                        i.settings.render.item = function(e) {
                            return r(a.apply(t, arguments), o)
                        }
                    }
                    s.apply(t, arguments), t.$control.on("click", "." + n.className, function(t) {
                        if (t.preventDefault(), !i.isLocked) {
                            var n = e(t.currentTarget).parent();
                            i.setActiveItem(n), i.deleteSelection() && i.setCaret(i.items.length)
                        }
                    })
                }
            }()
        }(this, t)
    }), $.define("restore_on_backspace", function(e) {
        var t = this;
        e.text = e.text || function(e) {
            return e[this.settings.labelField]
        }, this.onKeyDown = function() {
            var n = t.onKeyDown;
            return function(t) {
                var i, o;
                return 8 === t.keyCode && "" === this.$control_input.val() && !this.$activeItems.length && (i = this.caretPos - 1) >= 0 && i < this.items.length ? (o = this.options[this.items[i]], this.deleteSelection(t) && (this.setTextboxValue(e.text.apply(this, [o])), this.refreshOptions(!0)), void t.preventDefault()) : n.apply(this, arguments)
            }
        }()
    }), $
});
