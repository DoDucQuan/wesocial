! function(e) {
    function r(r) {
        return e(r).filter(function() {
            return e(this).is(":appeared")
        })
    }

    function t() {
        a = !1;
        for (var e = 0, t = n.length; e < t; e++) {
            var i = r(n[e]);
            if (i.trigger("appear", [i]), u[e]) {
                var o = u[e].not(i);
                o.trigger("disappear", [o])
            }
            u[e] = i
        }
    }

    function i(e) {
        n.push(e), u.push()
    }
    var n = [],
        o = !1,
        a = !1,
        f = {
            interval: 250,
            force_process: !1
        },
        p = e(window),
        u = [];
    e.expr[":"].appeared = function(r) {
        var t = e(r);
        if (!t.is(":visible")) return !1;
        var i = p.scrollLeft(),
            n = p.scrollTop(),
            o = t.offset(),
            a = o.left,
            f = o.top;
        return f + t.height() >= n && f - (t.data("appear-top-offset") || 0) <= n + p.height() && a + t.width() >= i && a - (t.data("appear-left-offset") || 0) <= i + p.width()
    }, e.fn.extend({
        appear: function(r) {
            var n = e.extend({}, f, r || {}),
                p = this.selector || this;
            if (!o) {
                var u = function() {
                    a || (a = !0, setTimeout(t, n.interval))
                };
                e(window).scroll(u).resize(u), o = !0
            }
            return n.force_process && setTimeout(t, n.interval), i(p), e(p)
        }
    }), e.extend({
        force_appear: function() {
            return !!o && (t(), !0)
        }
    })
}("undefined" != typeof module ? require("jquery") : jQuery);
