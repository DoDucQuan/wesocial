! function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return t(e)
    }) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(0, function(e) {
    ! function(e) {
        "use strict";

        function t(t) {
            var i = [{
                re: /[\xC0-\xC6]/g,
                ch: "A"
            }, {
                re: /[\xE0-\xE6]/g,
                ch: "a"
            }, {
                re: /[\xC8-\xCB]/g,
                ch: "E"
            }, {
                re: /[\xE8-\xEB]/g,
                ch: "e"
            }, {
                re: /[\xCC-\xCF]/g,
                ch: "I"
            }, {
                re: /[\xEC-\xEF]/g,
                ch: "i"
            }, {
                re: /[\xD2-\xD6]/g,
                ch: "O"
            }, {
                re: /[\xF2-\xF6]/g,
                ch: "o"
            }, {
                re: /[\xD9-\xDC]/g,
                ch: "U"
            }, {
                re: /[\xF9-\xFC]/g,
                ch: "u"
            }, {
                re: /[\xC7-\xE7]/g,
                ch: "c"
            }, {
                re: /[\xD1]/g,
                ch: "N"
            }, {
                re: /[\xF1]/g,
                ch: "n"
            }];
            return e.each(i, function() {
                t = t.replace(this.re, this.ch)
            }), t
        }

        function i(e) {
            var t = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                i = "(?:" + Object.keys(t).join("|") + ")",
                n = new RegExp(i),
                s = new RegExp(i, "g"),
                o = null == e ? "" : "" + e;
            return n.test(o) ? o.replace(s, function(e) {
                return t[e]
            }) : o
        }

        function n(t, i) {
            var n = arguments,
                s = t,
                o = i;
            [].shift.apply(n);
            var l, r = this.each(function() {
                var t = e(this);
                if (t.is("select")) {
                    var i = t.data("selectpicker"),
                        r = "object" == typeof s && s;
                    if (i) {
                        if (r)
                            for (var d in r) r.hasOwnProperty(d) && (i.options[d] = r[d])
                    } else {
                        var h = e.extend({}, a.DEFAULTS, e.fn.selectpicker.defaults || {}, t.data(), r);
                        h.template = e.extend({}, a.DEFAULTS.template, e.fn.selectpicker.defaults ? e.fn.selectpicker.defaults.template : {}, t.data().template, r.template), t.data("selectpicker", i = new a(this, h, o))
                    }
                    "string" == typeof s && (l = i[s] instanceof Function ? i[s].apply(i, n) : i.options[s])
                }
            });
            return void 0 !== l ? l : r
        }
        String.prototype.includes || function() {
            var e = {}.toString,
                t = function() {
                    try {
                        var e = {},
                            t = Object.defineProperty,
                            i = t(e, e, e) && t
                    } catch (e) {}
                    return i
                }(),
                i = "".indexOf,
                n = function(t) {
                    if (null == this) throw new TypeError;
                    var n = String(this);
                    if (t && "[object RegExp]" == e.call(t)) throw new TypeError;
                    var s = n.length,
                        o = String(t),
                        a = o.length,
                        l = arguments.length > 1 ? arguments[1] : void 0,
                        r = l ? Number(l) : 0;
                    return r != r && (r = 0), !(a + Math.min(Math.max(r, 0), s) > s) && -1 != i.call(n, o, r)
                };
            t ? t(String.prototype, "includes", {
                value: n,
                configurable: !0,
                writable: !0
            }) : String.prototype.includes = n
        }(), String.prototype.startsWith || function() {
            var e = function() {
                    try {
                        var e = {},
                            t = Object.defineProperty,
                            i = t(e, e, e) && t
                    } catch (e) {}
                    return i
                }(),
                t = {}.toString,
                i = function(e) {
                    if (null == this) throw new TypeError;
                    var i = String(this);
                    if (e && "[object RegExp]" == t.call(e)) throw new TypeError;
                    var n = i.length,
                        s = String(e),
                        o = s.length,
                        a = arguments.length > 1 ? arguments[1] : void 0,
                        l = a ? Number(a) : 0;
                    l != l && (l = 0);
                    var r = Math.min(Math.max(l, 0), n);
                    if (o + r > n) return !1;
                    for (var d = -1; ++d < o;)
                        if (i.charCodeAt(r + d) != s.charCodeAt(d)) return !1;
                    return !0
                };
            e ? e(String.prototype, "startsWith", {
                value: i,
                configurable: !0,
                writable: !0
            }) : String.prototype.startsWith = i
        }(), Object.keys || (Object.keys = function(e, t, i) {
            i = [];
            for (t in e) i.hasOwnProperty.call(e, t) && i.push(t);
            return i
        });
        var s = {
            useDefault: !1,
            _set: e.valHooks.select.set
        };
        e.valHooks.select.set = function(t, i) {
            return i && !s.useDefault && e(t).data("selected", !0), s._set.apply(this, arguments)
        };
        var o = null;
        e.fn.triggerNative = function(e) {
            var t, i = this[0];
            i.dispatchEvent ? ("function" == typeof Event ? t = new Event(e, {
                bubbles: !0
            }) : (t = document.createEvent("Event")).initEvent(e, !0, !1), i.dispatchEvent(t)) : i.fireEvent ? (t = document.createEventObject(), t.eventType = e, i.fireEvent("on" + e, t)) : this.trigger(e)
        }, e.expr.pseudos.icontains = function(t, i, n) {
            var s = e(t);
            return (s.data("tokens") || s.text()).toString().toUpperCase().includes(n[3].toUpperCase())
        }, e.expr.pseudos.ibegins = function(t, i, n) {
            var s = e(t);
            return (s.data("tokens") || s.text()).toString().toUpperCase().startsWith(n[3].toUpperCase())
        }, e.expr.pseudos.aicontains = function(t, i, n) {
            var s = e(t);
            return (s.data("tokens") || s.data("normalizedText") || s.text()).toString().toUpperCase().includes(n[3].toUpperCase())
        }, e.expr.pseudos.aibegins = function(t, i, n) {
            var s = e(t);
            return (s.data("tokens") || s.data("normalizedText") || s.text()).toString().toUpperCase().startsWith(n[3].toUpperCase())
        };
        var a = function(t, i, n) {
            s.useDefault || (e.valHooks.select.set = s._set, s.useDefault = !0), n && (n.stopPropagation(), n.preventDefault()), this.$element = e(t), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = i, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = a.prototype.val, this.render = a.prototype.render, this.refresh = a.prototype.refresh, this.setStyle = a.prototype.setStyle, this.selectAll = a.prototype.selectAll, this.deselectAll = a.prototype.deselectAll, this.destroy = a.prototype.destroy, this.remove = a.prototype.remove, this.show = a.prototype.show, this.hide = a.prototype.hide, this.init()
        };
        a.VERSION = "1.11.0", a.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function(e, t) {
                return 1 == e ? "{0} item selected" : "{0} items selected"
            },
            maxOptionsText: function(e, t) {
                return [1 == e ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == t ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: !1,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: "btn-secondary",
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: !1,
            container: !1,
            hideDisabled: !1,
            showSubtext: !1,
            showIcon: !0,
            showContent: !0,
            dropupAuto: !0,
            header: !1,
            liveSearch: !1,
            liveSearchPlaceholder: null,
            liveSearchNormalize: !1,
            liveSearchStyle: "contains",
            actionsBox: !1,
            iconBase: "glyphicon",
            tickIcon: "glyphicon-ok",
            showTick: !1,
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: !1,
            mobile: !1,
            selectOnTab: !1,
            dropdownAlignRight: !1
        }, a.prototype = {
            constructor: a,
            init: function() {
                var t = this,
                    i = this.$element.attr("id");
                this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement).appendTo(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.$element.removeClass("bs-select-hidden"), !0 === this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), void 0 !== i && (this.$button.attr("data-id", i), e('label[for="' + i + '"]').click(function(e) {
                    e.preventDefault(), t.$button.focus()
                })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
                    "hide.bs.dropdown": function(e) {
                        t.$menuInner.attr("aria-expanded", !1), t.$element.trigger("hide.bs.select", e)
                    },
                    "hidden.bs.dropdown": function(e) {
                        t.$element.trigger("hidden.bs.select", e)
                    },
                    "show.bs.dropdown": function(e) {
                        t.$menuInner.attr("aria-expanded", !0), t.$element.trigger("show.bs.select", e)
                    },
                    "shown.bs.dropdown": function(e) {
                        t.$element.trigger("shown.bs.select", e)
                    }
                }), t.$element[0].hasAttribute("required") && this.$element.on("invalid", function() {
                    t.$button.addClass("bs-invalid").focus(), t.$element.on({
                        "focus.bs.select": function() {
                            t.$button.focus(), t.$element.off("focus.bs.select")
                        },
                        "shown.bs.select": function() {
                            t.$element.val(t.$element.val()).off("shown.bs.select")
                        },
                        "rendered.bs.select": function() {
                            this.validity.valid && t.$button.removeClass("bs-invalid"), t.$element.off("rendered.bs.select")
                        }
                    })
                }), setTimeout(function() {
                    t.$element.trigger("loaded.bs.select")
                })
            },
            createDropdown: function() {
                var t = this.multiple || this.options.showTick ? " show-tick" : "",
                    n = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                    s = this.autofocus ? " autofocus" : "",
                    o = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                    a = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + i(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search"></div>' : "",
                    l = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                    r = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
                    d = '<div class="btn-group bootstrap-select' + t + n + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + s + ' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open" role="combobox">' + o + a + l + '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>' + r + "</div></div>";
                return e(d)
            },
            createView: function() {
                var e = this.createDropdown(),
                    t = this.createLi();
                return e.find("ul")[0].innerHTML = t, e
            },
            reloadLi: function() {
                this.destroyLi();
                var e = this.createLi();
                this.$menuInner[0].innerHTML = e
            },
            destroyLi: function() {
                this.$menu.find("li").remove()
            },
            createLi: function() {
                var n = this,
                    s = [],
                    o = 0,
                    a = document.createElement("option"),
                    l = -1,
                    r = function(e, t, i, n) {
                        return "<li" + (void 0 !== i & "" !== i ? ' class="' + i + '"' : "") + (void 0 !== t & null !== t ? ' data-original-index="' + t + '"' : "") + (void 0 !== n & null !== n ? 'data-optgroup="' + n + '"' : "") + ">" + e + "</li>"
                    },
                    d = function(e, s, o, a) {
                        return '<a tabindex="0"' + (void 0 !== (s += " dropdown-item") ? ' class="' + s + '"' : "") + (void 0 !== o ? ' style="' + o + '"' : "") + (n.options.liveSearchNormalize ? ' data-normalized-text="' + t(i(e)) + '"' : "") + (void 0 !== a || null !== a ? ' data-tokens="' + a + '"' : "") + ' role="option">' + e + '<span class="' + n.options.iconBase + " " + n.options.tickIcon + ' check-mark"></span></a>'
                    };
                if (this.options.title && !this.multiple && (l--, !this.$element.find(".bs-title-option").length)) {
                    var h = this.$element[0];
                    a.className = "bs-title-option", a.appendChild(document.createTextNode(this.options.title)), a.value = "", h.insertBefore(a, h.firstChild), void 0 === e(h.options[h.selectedIndex]).attr("selected") && void 0 === this.$element.data("selected") && (a.selected = !0)
                }
                return this.$element.find("option").each(function(t) {
                    var i = e(this);
                    if (l++, !i.hasClass("bs-title-option")) {
                        var a = this.className || "",
                            h = this.style.cssText,
                            c = i.data("content") ? i.data("content") : i.html(),
                            p = i.data("tokens") ? i.data("tokens") : null,
                            u = void 0 !== i.data("subtext") ? '<small class="text-muted">' + i.data("subtext") + "</small>" : "",
                            f = void 0 !== i.data("icon") ? '<span class="' + n.options.iconBase + " " + i.data("icon") + '"></span> ' : "",
                            m = i.parent(),
                            v = "OPTGROUP" === m[0].tagName,
                            b = v && m[0].disabled,
                            g = this.disabled || b;
                        if ("" !== f && g && (f = "<span>" + f + "</span>"), n.options.hideDisabled && (g && !v || b)) return void l--;
                        if (i.data("content") || (c = f + '<span class="text">' + c + u + "</span>"), v && !0 !== i.data("divider")) {
                            if (n.options.hideDisabled && g) {
                                if (void 0 === m.data("allOptionsDisabled")) {
                                    var $ = m.children();
                                    m.data("allOptionsDisabled", $.filter(":disabled").length === $.length)
                                }
                                if (m.data("allOptionsDisabled")) return void l--
                            }
                            var x = " " + m[0].className || "";
                            if (0 === i.index()) {
                                o += 1;
                                var w = m[0].label,
                                    C = void 0 !== m.data("subtext") ? '<small class="text-muted">' + m.data("subtext") + "</small>" : "";
                                w = (m.data("icon") ? '<span class="' + n.options.iconBase + " " + m.data("icon") + '"></span> ' : "") + '<span class="text">' + w + C + "</span>", 0 !== t && s.length > 0 && (l++, s.push(r("", null, "divider", o + "div"))), l++, s.push(r(w, null, "dropdown-header" + x, o))
                            }
                            if (n.options.hideDisabled && g) return void l--;
                            s.push(r(d(c, "opt " + a + x, h, p), t, "", o))
                        } else if (!0 === i.data("divider")) s.push(r("", t, "divider"));
                        else if (!0 === i.data("hidden")) s.push(r(d(c, a, h, p), t, "hidden is-hidden"));
                        else {
                            var y = this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName;
                            if (!y && n.options.hideDisabled)
                                for (var S = e(this).prevAll(), k = 0; k < S.length; k++)
                                    if ("OPTGROUP" === S[k].tagName) {
                                        for (var E = 0, T = 0; T < k; T++) {
                                            var I = S[T];
                                            (I.disabled || !0 === e(I).data("hidden")) && E++
                                        }
                                        E === k && (y = !0);
                                        break
                                    }
                            y && (l++, s.push(r("", null, "divider", o + "div"))), s.push(r(d(c, a, h, p), t))
                        }
                        n.liObj[t] = l
                    }
                }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), s.join("")
            },
            findLis: function() {
                return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
            },
            render: function(t) {
                var i, n = this;
                !1 !== t && this.$element.find("option").each(function(e) {
                    var t = n.findLis().eq(n.liObj[e]);
                    n.setDisabled(e, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, t), n.setSelected(e, this.selected, t)
                }), this.togglePlaceholder(), this.tabIndex();
                var s = this.$element.find("option").map(function() {
                        if (this.selected) {
                            if (n.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
                            var t, i = e(this),
                                s = i.data("icon") && n.options.showIcon ? '<i class="' + n.options.iconBase + " " + i.data("icon") + '"></i> ' : "";
                            return t = n.options.showSubtext && i.data("subtext") && !n.multiple ? ' <small class="text-muted">' + i.data("subtext") + "</small>" : "", void 0 !== i.attr("title") ? i.attr("title") : i.data("content") && n.options.showContent ? i.data("content") : s + i.html() + t
                        }
                    }).toArray(),
                    o = this.multiple ? s.join(this.options.multipleSeparator) : s[0];
                if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                    var a = this.options.selectedTextFormat.split(">");
                    if (a.length > 1 && s.length > a[1] || 1 == a.length && s.length >= 2) {
                        i = this.options.hideDisabled ? ", [disabled]" : "";
                        var l = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + i).length;
                        o = ("function" == typeof this.options.countSelectedText ? this.options.countSelectedText(s.length, l) : this.options.countSelectedText).replace("{0}", s.length.toString()).replace("{1}", l.toString())
                    }
                }
                void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (o = this.options.title), o || (o = void 0 !== this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", e.trim(o.replace(/<[^>]*>?/g, ""))), this.$button.children(".filter-option").html(o), this.$element.trigger("rendered.bs.select")
            },
            setStyle: function(e, t) {
                this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                var i = e || this.options.style;
                "add" == t ? this.$button.addClass(i) : "remove" == t ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style), this.$button.addClass(i))
            },
            liHeight: function(t) {
                if (t || !1 !== this.options.size && !this.sizeInfo) {
                    var i = document.createElement("div"),
                        n = document.createElement("div"),
                        s = document.createElement("ul"),
                        o = document.createElement("li"),
                        a = document.createElement("li"),
                        l = document.createElement("a"),
                        r = document.createElement("span"),
                        d = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
                        h = this.options.liveSearch ? document.createElement("div") : null,
                        c = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                        p = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                    if (r.className = "text", i.className = this.$menu[0].parentNode.className + " open", n.className = "dropdown-menu open", s.className = "dropdown-menu inner", o.className = "divider", r.appendChild(document.createTextNode("Inner text")), l.appendChild(r), a.appendChild(l), s.appendChild(a), s.appendChild(o), d && n.appendChild(d), h) {
                        var u = document.createElement("span");
                        h.className = "bs-searchbox", u.className = "form-control", h.appendChild(u), n.appendChild(h)
                    }
                    c && n.appendChild(c), n.appendChild(s), p && n.appendChild(p), i.appendChild(n), document.body.appendChild(i);
                    var f = l.offsetHeight,
                        m = d ? d.offsetHeight : 0,
                        v = h ? h.offsetHeight : 0,
                        b = c ? c.offsetHeight : 0,
                        g = p ? p.offsetHeight : 0,
                        $ = e(o).outerHeight(!0),
                        x = "function" == typeof getComputedStyle && getComputedStyle(n),
                        w = x ? null : e(n),
                        C = {
                            vert: parseInt(x ? x.paddingTop : w.css("paddingTop")) + parseInt(x ? x.paddingBottom : w.css("paddingBottom")) + parseInt(x ? x.borderTopWidth : w.css("borderTopWidth")) + parseInt(x ? x.borderBottomWidth : w.css("borderBottomWidth")),
                            horiz: parseInt(x ? x.paddingLeft : w.css("paddingLeft")) + parseInt(x ? x.paddingRight : w.css("paddingRight")) + parseInt(x ? x.borderLeftWidth : w.css("borderLeftWidth")) + parseInt(x ? x.borderRightWidth : w.css("borderRightWidth"))
                        },
                        y = {
                            vert: C.vert + parseInt(x ? x.marginTop : w.css("marginTop")) + parseInt(x ? x.marginBottom : w.css("marginBottom")) + 2,
                            horiz: C.horiz + parseInt(x ? x.marginLeft : w.css("marginLeft")) + parseInt(x ? x.marginRight : w.css("marginRight")) + 2
                        };
                    document.body.removeChild(i), this.sizeInfo = {
                        liHeight: f,
                        headerHeight: m,
                        searchHeight: v,
                        actionsHeight: b,
                        doneButtonHeight: g,
                        dividerHeight: $,
                        menuPadding: C,
                        menuExtras: y
                    }
                }
            },
            setSize: function() {
                if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), !1 !== this.options.size) {
                    var t, i, n, s, o, a, l, r, d = this,
                        h = this.$menu,
                        c = this.$menuInner,
                        p = e(window),
                        u = this.$newElement[0].offsetHeight,
                        f = this.$newElement[0].offsetWidth,
                        m = this.sizeInfo.liHeight,
                        v = this.sizeInfo.headerHeight,
                        b = this.sizeInfo.searchHeight,
                        g = this.sizeInfo.actionsHeight,
                        $ = this.sizeInfo.doneButtonHeight,
                        x = this.sizeInfo.dividerHeight,
                        w = this.sizeInfo.menuPadding,
                        C = this.sizeInfo.menuExtras,
                        y = this.options.hideDisabled ? ".disabled" : "",
                        S = function() {
                            var t, i = d.$newElement.offset(),
                                n = e(d.options.container);
                            d.options.container && !n.is("body") ? (t = n.offset(), t.top += parseInt(n.css("borderTopWidth")), t.left += parseInt(n.css("borderLeftWidth"))) : t = {
                                top: 0,
                                left: 0
                            }, o = i.top - t.top - p.scrollTop(), a = p.height() - o - u - t.top, l = i.left - t.left - p.scrollLeft(), r = p.width() - l - f - t.left
                        };
                    if (S(), "auto" === this.options.size) {
                        var k = function() {
                            var p, u = function(t, i) {
                                    return function(n) {
                                        return i ? n.classList ? n.classList.contains(t) : e(n).hasClass(t) : !(n.classList ? n.classList.contains(t) : e(n).hasClass(t))
                                    }
                                },
                                x = d.$menuInner[0].getElementsByTagName("li"),
                                y = Array.prototype.filter ? Array.prototype.filter.call(x, u("hidden", !1)) : d.$lis.not(".hidden"),
                                k = Array.prototype.filter ? Array.prototype.filter.call(y, u("dropdown-header", !0)) : y.filter(".dropdown-header");
                            S(), t = a - C.vert, i = r - C.horiz, d.options.container ? (h.data("height") || h.data("height", h.height()), n = h.data("height"), h.data("width") || h.data("width", h.width()), s = h.data("width")) : (n = h.height(), s = h.width()), d.options.dropupAuto && d.$newElement.toggleClass("dropup", o > a && t - C.vert < n), d.$newElement.hasClass("dropup") && (t = o - C.vert), "auto" === d.options.dropdownAlignRight && h.toggleClass("dropdown-menu-right", l > r && i - C.horiz < s - f), p = y.length + k.length > 3 ? 3 * m + C.vert - 2 : 0, h.css({
                                "max-height": t + "px",
                                overflow: "hidden",
                                "min-height": p + v + b + g + $ + "px"
                            });
                            var E = t - v - b - g - $;
                            E -= 16, c.css({
                                "max-height": E - w.vert + "px",
                                "overflow-y": "auto",
                                "min-height": Math.max(p - w.vert, 0) + "px"
                            })
                        };
                        k(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", k), p.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", k)
                    } else if (this.options.size && "auto" != this.options.size && this.$lis.not(y).length > this.options.size) {
                        var E = this.$lis.not(".divider").not(y).children().slice(0, this.options.size).last().parent().index(),
                            T = this.$lis.slice(0, E + 1).filter(".divider").length;
                        t = m * this.options.size + T * x + w.vert, d.options.container ? (h.data("height") || h.data("height", h.height()), n = h.data("height")) : n = h.height(), d.options.dropupAuto && this.$newElement.toggleClass("dropup", o > a && t - C.vert < n), h.css({
                            "max-height": t + v + b + g + $ + "px",
                            overflow: "hidden",
                            "min-height": ""
                        }), c.css({
                            "max-height": t - w.vert + "px",
                            "overflow-y": "auto",
                            "min-height": ""
                        })
                    }
                }
            },
            setWidth: function() {
                if ("auto" === this.options.width) {
                    this.$menu.css("min-width", "0");
                    var e = this.$menu.parent().clone().appendTo("body"),
                        t = this.options.container ? this.$newElement.clone().appendTo("body") : e,
                        i = e.children(".dropdown-menu").outerWidth(),
                        n = t.css("width", "auto").children("button").outerWidth();
                    e.remove(), t.remove(), this.$newElement.css("width", Math.max(i, n) + "px")
                } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
                this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
            },
            selectPosition: function() {
                this.$bsContainer = e('<div class="bs-container" />');
                var t, i, n, s = this,
                    o = e(this.options.container),
                    a = function(e) {
                        s.$bsContainer.addClass(e.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", e.hasClass("dropup")), t = e.offset(), o.is("body") ? i = {
                            top: 0,
                            left: 0
                        } : (i = o.offset(), i.top += parseInt(o.css("borderTopWidth")) - o.scrollTop(), i.left += parseInt(o.css("borderLeftWidth")) - o.scrollLeft()), n = e.hasClass("dropup") ? 0 : e[0].offsetHeight, s.$bsContainer.css({
                            top: t.top - i.top + n,
                            left: t.left - i.left,
                            width: e[0].offsetWidth
                        })
                    };
                this.$button.on("click", function() {
                    var t = e(this);
                    s.isDisabled() || (a(s.$newElement), s.$bsContainer.appendTo(s.options.container).toggleClass("open", !t.hasClass("open")).append(s.$menu))
                }), e(window).on("resize scroll", function() {
                    a(s.$newElement)
                }), this.$element.on("hide.bs.select", function() {
                    s.$menu.data("height", s.$menu.height()), s.$bsContainer.detach()
                })
            },
            setSelected: function(e, t, i) {
                i || (this.togglePlaceholder(), i = this.findLis().eq(this.liObj[e])), i.toggleClass("selected", t).find("a").attr("aria-selected", t)
            },
            setDisabled: function(e, t, i) {
                i || (i = this.findLis().eq(this.liObj[e])), t ? i.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1).attr("aria-disabled", !0) : i.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0).attr("aria-disabled", !1)
            },
            isDisabled: function() {
                return this.$element[0].disabled
            },
            checkDisabled: function() {
                var e = this;
                this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled")), -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function() {
                    return !e.isDisabled()
                })
            },
            togglePlaceholder: function() {
                var e = this.$element.val();
                this.$button.toggleClass("bs-placeholder", null === e || "" === e)
            },
            tabIndex: function() {
                this.$element.data("tabindex") !== this.$element.attr("tabindex") && -98 !== this.$element.attr("tabindex") && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98)
            },
            clickListener: function() {
                var t = this,
                    i = e(document);
                this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(e) {
                    e.stopPropagation()
                }), i.data("spaceSelect", !1), this.$button.on("keyup", function(e) {
                    /(32)/.test(e.keyCode.toString(10)) && i.data("spaceSelect") && (e.preventDefault(), i.data("spaceSelect", !1))
                }), this.$button.on("click", function() {
                    t.setSize()
                }), this.$element.on("shown.bs.select", function() {
                    if (t.options.liveSearch || t.multiple) {
                        if (!t.multiple) {
                            var e = t.liObj[t.$element[0].selectedIndex];
                            if ("number" != typeof e || !1 === t.options.size) return;
                            var i = t.$lis.eq(e)[0].offsetTop - t.$menuInner[0].offsetTop;
                            i = i - t.$menuInner[0].offsetHeight / 2 + t.sizeInfo.liHeight / 2, t.$menuInner[0].scrollTop = i
                        }
                    } else t.$menuInner.find(".selected a").focus()
                }), this.$menuInner.on("click", "li a", function(i) {
                    var n = e(this),
                        s = n.parent().data("originalIndex"),
                        a = t.$element.val(),
                        l = t.$element.prop("selectedIndex"),
                        r = !0;
                    if (t.multiple && 1 !== t.options.maxOptions && i.stopPropagation(), i.preventDefault(), !t.isDisabled() && !n.parent().hasClass("disabled")) {
                        var d = t.$element.find("option"),
                            h = d.eq(s),
                            c = h.prop("selected"),
                            p = h.parent("optgroup"),
                            u = t.options.maxOptions,
                            f = p.data("maxOptions") || !1;
                        if (t.multiple) {
                            if (h.prop("selected", !c), t.setSelected(s, !c), n.blur(), !1 !== u || !1 !== f) {
                                var m = u < d.filter(":selected").length,
                                    v = f < p.find("option:selected").length;
                                if (u && m || f && v)
                                    if (u && 1 == u) d.prop("selected", !1), h.prop("selected", !0), t.$menuInner.find(".selected").removeClass("selected"), t.setSelected(s, !0);
                                    else if (f && 1 == f) {
                                    p.find("option:selected").prop("selected", !1), h.prop("selected", !0);
                                    var b = n.parent().data("optgroup");
                                    t.$menuInner.find('[data-optgroup="' + b + '"]').removeClass("selected"), t.setSelected(s, !0)
                                } else {
                                    var g = "string" == typeof t.options.maxOptionsText ? [t.options.maxOptionsText, t.options.maxOptionsText] : t.options.maxOptionsText,
                                        $ = "function" == typeof g ? g(u, f) : g,
                                        x = $[0].replace("{n}", u),
                                        w = $[1].replace("{n}", f),
                                        C = e('<div class="notify"></div>');
                                    $[2] && (x = x.replace("{var}", $[2][u > 1 ? 0 : 1]), w = w.replace("{var}", $[2][f > 1 ? 0 : 1])), h.prop("selected", !1), t.$menu.append(C), u && m && (C.append(e("<div>" + x + "</div>")), r = !1, t.$element.trigger("maxReached.bs.select")), f && v && (C.append(e("<div>" + w + "</div>")), r = !1, t.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                                        t.setSelected(s, !1)
                                    }, 10), C.delay(750).fadeOut(300, function() {
                                        e(this).remove()
                                    })
                                }
                            }
                        } else d.prop("selected", !1), h.prop("selected", !0), t.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected", !1), t.setSelected(s, !0);
                        !t.multiple || t.multiple && 1 === t.options.maxOptions ? t.$button.focus() : t.options.liveSearch && t.$searchbox.focus(), r && (a != t.$element.val() && t.multiple || l != t.$element.prop("selectedIndex") && !t.multiple) && (o = [s, h.prop("selected"), c], t.$element.triggerNative("change"))
                    }
                }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(i) {
                    i.currentTarget == this && (i.preventDefault(), i.stopPropagation(), t.options.liveSearch && !e(i.target).hasClass("close") ? t.$searchbox.focus() : t.$button.focus())
                }), this.$menuInner.on("click", ".divider, .dropdown-header", function(e) {
                    e.preventDefault(), e.stopPropagation(), t.options.liveSearch ? t.$searchbox.focus() : t.$button.focus()
                }), this.$menu.on("click", ".popover-title .close", function() {
                    t.$button.click()
                }), this.$searchbox.on("click", function(e) {
                    e.stopPropagation()
                }), this.$menu.on("click", ".actions-btn", function(i) {
                    t.options.liveSearch ? t.$searchbox.focus() : t.$button.focus(), i.preventDefault(), i.stopPropagation(), e(this).hasClass("bs-select-all") ? t.selectAll() : t.deselectAll()
                }), this.$element.change(function() {
                    t.render(!1), t.$element.trigger("changed.bs.select", o), o = null
                })
            },
            liveSearchListener: function() {
                var n = this,
                    s = e('<li class="no-results"></li>');
                this.$button.on("click.dropdown.data-api touchstart.dropdown.data-api", function() {
                    n.$menuInner.find(".active").removeClass("active"), n.$searchbox.val() && (n.$searchbox.val(""), n.$lis.not(".is-hidden").removeClass("hidden"), s.parent().length && s.remove()), n.multiple || n.$menuInner.find(".selected").addClass("active"), setTimeout(function() {
                        n.$searchbox.focus()
                    }, 10)
                }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(e) {
                    e.stopPropagation()
                }), this.$searchbox.on("input propertychange", function() {
                    if (n.$searchbox.val()) {
                        var o = n.$lis.not(".is-hidden").removeClass("hidden").children("a");
                        (o = n.options.liveSearchNormalize ? o.not(":a" + n._searchStyle() + '("' + t(n.$searchbox.val()) + '")') : o.not(":" + n._searchStyle() + '("' + n.$searchbox.val() + '")')).parent().addClass("hidden"), n.$lis.filter(".dropdown-header").each(function() {
                            var t = e(this),
                                i = t.data("optgroup");
                            0 === n.$lis.filter("[data-optgroup=" + i + "]").not(t).not(".hidden").length && (t.addClass("hidden"), n.$lis.filter("[data-optgroup=" + i + "div]").addClass("hidden"))
                        });
                        var a = n.$lis.not(".hidden");
                        a.each(function(t) {
                            var i = e(this);
                            i.hasClass("divider") && (i.index() === a.first().index() || i.index() === a.last().index() || a.eq(t + 1).hasClass("divider")) && i.addClass("hidden")
                        }), n.$lis.not(".hidden, .no-results").length ? s.parent().length && s.remove() : (s.parent().length && s.remove(), s.html(n.options.noneResultsText.replace("{0}", '"' + i(n.$searchbox.val()) + '"')).show(), n.$menuInner.append(s))
                    } else n.$lis.not(".is-hidden").removeClass("hidden"), s.parent().length && s.remove();
                    n.$lis.filter(".active").removeClass("active"), n.$searchbox.val() && n.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(), e(this).focus()
                })
            },
            _searchStyle: function() {
                return {
                    begins: "ibegins",
                    startsWith: "ibegins"
                }[this.options.liveSearchStyle] || "icontains"
            },
            val: function(e) {
                return void 0 !== e ? (this.$element.val(e), this.render(), this.$element) : this.$element.val()
            },
            changeAll: function(t) {
                if (this.multiple) {
                    void 0 === t && (t = !0), this.findLis();
                    var i = this.$element.find("option"),
                        n = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"),
                        s = n.length,
                        o = [];
                    if (t) {
                        if (n.filter(".selected").length === n.length) return
                    } else if (0 === n.filter(".selected").length) return;
                    n.toggleClass("selected", t);
                    for (var a = 0; a < s; a++) {
                        var l = n[a].getAttribute("data-original-index");
                        o[o.length] = i.eq(l)[0]
                    }
                    e(o).prop("selected", t), this.render(!1), this.togglePlaceholder(), this.$element.triggerNative("change")
                }
            },
            selectAll: function() {
                return this.changeAll(!0)
            },
            deselectAll: function() {
                return this.changeAll(!1)
            },
            toggle: function(e) {
                (e = e || window.event) && e.stopPropagation(), this.$button.trigger("click")
            },
            keydown: function(i) {
                var n, s, o, a, l, r, d, h, c, p = e(this),
                    u = p.is("input") ? p.parent().parent() : p.parent(),
                    f = u.data("this"),
                    m = ":not(.disabled, .hidden, .dropdown-header, .divider)",
                    v = {
                        32: " ",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        96: "0",
                        97: "1",
                        98: "2",
                        99: "3",
                        100: "4",
                        101: "5",
                        102: "6",
                        103: "7",
                        104: "8",
                        105: "9"
                    };
                if (f.options.liveSearch && (u = p.parent().parent()), f.options.container && (u = f.$menu), n = e('[role="listbox"] li', u), !(c = f.$newElement.hasClass("open")) && (i.keyCode >= 48 && i.keyCode <= 57 || i.keyCode >= 96 && i.keyCode <= 105 || i.keyCode >= 65 && i.keyCode <= 90)) return f.options.container ? f.$button.trigger("click") : (f.setSize(), f.$menu.parent().addClass("open"), c = !0), void f.$searchbox.focus();
                if (f.options.liveSearch && (/(^9$|27)/.test(i.keyCode.toString(10)) && c && 0 === f.$menu.find(".active").length && (i.preventDefault(), f.$menu.parent().removeClass("open"), f.options.container && f.$newElement.removeClass("open"), f.$button.focus()), n = e('[role="listbox"] li' + m, u), p.val() || /(38|40)/.test(i.keyCode.toString(10)) || 0 === n.filter(".active").length && (n = f.$menuInner.find("li"), n = f.options.liveSearchNormalize ? n.filter(":a" + f._searchStyle() + "(" + t(v[i.keyCode]) + ")") : n.filter(":" + f._searchStyle() + "(" + v[i.keyCode] + ")"))), n.length) {
                    if (/(38|40)/.test(i.keyCode.toString(10))) s = n.index(n.find("a").filter(":focus").parent()), a = n.filter(m).first().index(), l = n.filter(m).last().index(), o = n.eq(s).nextAll(m).eq(0).index(), r = n.eq(s).prevAll(m).eq(0).index(), d = n.eq(o).prevAll(m).eq(0).index(), f.options.liveSearch && (n.each(function(t) {
                        e(this).hasClass("disabled") || e(this).data("index", t)
                    }), s = n.index(n.filter(".active")), a = n.first().data("index"), l = n.last().data("index"), o = n.eq(s).nextAll().eq(0).data("index"), r = n.eq(s).prevAll().eq(0).data("index"), d = n.eq(o).prevAll().eq(0).data("index")), h = p.data("prevIndex"), 38 == i.keyCode ? (f.options.liveSearch && s--, s != d && s > r && (s = r), s < a && (s = a), s == h && (s = l)) : 40 == i.keyCode && (f.options.liveSearch && s++, -1 == s && (s = 0), s != d && s < o && (s = o), s > l && (s = l), s == h && (s = a)), p.data("prevIndex", s), f.options.liveSearch ? (i.preventDefault(), p.hasClass("dropdown-toggle") || (n.removeClass("active").eq(s).addClass("active").children("a").focus(), p.focus())) : n.eq(s).children("a").focus();
                    else if (!p.is("input")) {
                        var b, g = [];
                        n.each(function() {
                            e(this).hasClass("disabled") || e.trim(e(this).children("a").text().toLowerCase()).substring(0, 1) == v[i.keyCode] && g.push(e(this).index())
                        }), b = e(document).data("keycount"), b++, e(document).data("keycount", b), e.trim(e(":focus").text().toLowerCase()).substring(0, 1) != v[i.keyCode] ? (b = 1, e(document).data("keycount", b)) : b >= g.length && (e(document).data("keycount", 0), b > g.length && (b = 1)), n.eq(g[b - 1]).children("a").focus()
                    }
                    if ((/(13|32)/.test(i.keyCode.toString(10)) || /(^9$)/.test(i.keyCode.toString(10)) && f.options.selectOnTab) && c) {
                        if (/(32)/.test(i.keyCode.toString(10)) || i.preventDefault(), f.options.liveSearch) /(32)/.test(i.keyCode.toString(10)) || (f.$menuInner.find(".active a").click(), p.focus());
                        else {
                            var $ = e(":focus");
                            $.click(), $.focus(), i.preventDefault(), e(document).data("spaceSelect", !0)
                        }
                        e(document).data("keycount", 0)
                    }(/(^9$|27)/.test(i.keyCode.toString(10)) && c && (f.multiple || f.options.liveSearch) || /(27)/.test(i.keyCode.toString(10)) && !c) && (f.$menu.parent().removeClass("open"), f.options.container && f.$newElement.removeClass("open"), f.$button.focus())
                }
            },
            mobile: function() {
                this.$element.addClass("mobile-device")
            },
            refresh: function() {
                this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
            },
            hide: function() {
                this.$newElement.hide()
            },
            show: function() {
                this.$newElement.show()
            },
            remove: function() {
                this.$newElement.remove(), this.$element.remove()
            },
            destroy: function() {
                this.$newElement.before(this.$element).remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
            }
        };
        var l = e.fn.selectpicker;
        e.fn.selectpicker = n, e.fn.selectpicker.Constructor = a, e.fn.selectpicker.noConflict = function() {
            return e.fn.selectpicker = l, this
        }, e(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', a.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function(e) {
            e.stopPropagation()
        }), e(window).on("load.bs.select.data-api", function() {
            e(".selectpicker").each(function() {
                var t = e(this);
                n.call(t, t.data())
            })
        })
    }(e)
});
