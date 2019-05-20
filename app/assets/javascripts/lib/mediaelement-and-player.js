var mejs = mejs || {};
mejs.version = "2.22.0", mejs.meIndex = 0, mejs.plugins = {
        silverlight: [{
            version: [3, 0],
            types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
        }],
        flash: [{
            version: [9, 0, 124],
            types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/dailymotion", "video/x-dailymotion", "application/x-mpegURL"]
        }],
        youtube: [{
            version: null,
            types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
        }],
        vimeo: [{
            version: null,
            types: ["video/vimeo", "video/x-vimeo"]
        }]
    }, mejs.Utility = {
        encodeUrl: function(e) {
            return encodeURIComponent(e)
        },
        escapeHTML: function(e) {
            return e.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;")
        },
        absolutizeUrl: function(e) {
            var t = document.createElement("div");
            return t.innerHTML = '<a href="' + this.escapeHTML(e) + '">x</a>', t.firstChild.href
        },
        getScriptPath: function(e) {
            for (var t, i, n, s, o, a = 0, r = "", l = "", u = document.getElementsByTagName("script"), d = u.length, c = e.length; a < d; a++) {
                for ((i = (n = u[a].src).lastIndexOf("/")) > -1 ? (o = n.substring(i + 1), s = n.substring(0, i + 1)) : (o = n, s = ""), t = 0; t < c; t++)
                    if (l = e[t], o.indexOf(l) > -1) {
                        r = s;
                        break
                    }
                if ("" !== r) break
            }
            return r
        },
        calculateTimeFormat: function(e, t, i) {
            e < 0 && (e = 0), void 0 === i && (i = 25);
            var n = t.timeFormat,
                s = n[0],
                o = n[1] == n[0],
                a = o ? 2 : 1,
                r = ":",
                l = Math.floor(e / 3600) % 24,
                u = Math.floor(e / 60) % 60,
                d = Math.floor(e % 60),
                c = [
                    [Math.floor((e % 1 * i).toFixed(3)), "f"],
                    [d, "s"],
                    [u, "m"],
                    [l, "h"]
                ];
            n.length < a && (r = n[a]);
            for (var m = !1, p = 0, h = c.length; p < h; p++)
                if (-1 !== n.indexOf(c[p][1])) m = !0;
                else if (m) {
                for (var f = !1, v = p; v < h; v++)
                    if (c[v][0] > 0) {
                        f = !0;
                        break
                    }
                if (!f) break;
                o || (n = s + n), n = c[p][1] + r + n, o && (n = c[p][1] + n), s = c[p][1]
            }
            t.currentTimeFormat = n
        },
        twoDigitsString: function(e) {
            return e < 10 ? "0" + e : String(e)
        },
        secondsToTimeCode: function(e, t) {
            if (e < 0 && (e = 0), "object" != typeof t) {
                s = "m:ss";
                s = arguments[1] ? "hh:mm:ss" : s, t = {
                    currentTimeFormat: s = arguments[2] ? s + ":ff" : s,
                    framesPerSecond: arguments[3] || 25
                }
            }
            var n = t.framesPerSecond;
            void 0 === n && (n = 25);
            var s = t.currentTimeFormat,
                o = Math.floor(e / 3600) % 24,
                a = Math.floor(e / 60) % 60,
                r = Math.floor(e % 60),
                l = Math.floor((e % 1 * n).toFixed(3));
            lis = [
                [l, "f"],
                [r, "s"],
                [a, "m"],
                [o, "h"]
            ];
            var u = s;
            for (i = 0, len = lis.length; i < len; i++) u = (u = u.replace(lis[i][1] + lis[i][1], this.twoDigitsString(lis[i][0]))).replace(lis[i][1], lis[i][0]);
            return u
        },
        timeCodeToSeconds: function(e, t, i, n) {
            void 0 === i ? i = !1 : void 0 === n && (n = 25);
            var s = e.split(":"),
                o = parseInt(s[0], 10),
                a = parseInt(s[1], 10),
                r = parseInt(s[2], 10),
                l = 0;
            return i && (l = parseInt(s[3]) / n), 3600 * o + 60 * a + r + l
        },
        convertSMPTEtoSeconds: function(e) {
            if ("string" != typeof e) return !1;
            var t = 0,
                i = -1 != (e = e.replace(",", ".")).indexOf(".") ? e.split(".")[1].length : 0,
                n = 1;
            e = e.split(":").reverse();
            for (var s = 0; s < e.length; s++) n = 1, s > 0 && (n = Math.pow(60, s)), t += Number(e[s]) * n;
            return Number(t.toFixed(i))
        },
        removeSwf: function(e) {
            var t = document.getElementById(e);
            t && /object|embed/i.test(t.nodeName) && (mejs.MediaFeatures.isIE ? (t.style.display = "none", function() {
                4 == t.readyState ? mejs.Utility.removeObjectInIE(e) : setTimeout(arguments.callee, 10)
            }()) : t.parentNode.removeChild(t))
        },
        removeObjectInIE: function(e) {
            var t = document.getElementById(e);
            if (t) {
                for (var i in t) "function" == typeof t[i] && (t[i] = null);
                t.parentNode.removeChild(t)
            }
        },
        determineScheme: function(e) {
            return e && -1 != e.indexOf("://") ? e.substr(0, e.indexOf("://") + 3) : "//"
        }
    }, mejs.PluginDetector = {
        hasPluginVersion: function(e, t) {
            var i = this.plugins[e];
            return t[1] = t[1] || 0, t[2] = t[2] || 0, i[0] > t[0] || i[0] == t[0] && i[1] > t[1] || i[0] == t[0] && i[1] == t[1] && i[2] >= t[2]
        },
        nav: window.navigator,
        ua: window.navigator.userAgent.toLowerCase(),
        plugins: [],
        addPlugin: function(e, t, i, n, s) {
            this.plugins[e] = this.detectPlugin(t, i, n, s)
        },
        detectPlugin: function(e, t, i, n) {
            var s, o, a, r = [0, 0, 0];
            if (void 0 !== this.nav.plugins && "object" == typeof this.nav.plugins[e]) {
                if ((s = this.nav.plugins[e].description) && (void 0 === this.nav.mimeTypes || !this.nav.mimeTypes[t] || this.nav.mimeTypes[t].enabledPlugin))
                    for (r = s.replace(e, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."), o = 0; o < r.length; o++) r[o] = parseInt(r[o].match(/\d+/), 10)
            } else if (void 0 !== window.ActiveXObject) try {
                (a = new ActiveXObject(i)) && (r = n(a))
            } catch (e) {}
            return r
        }
    }, mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(e) {
        var t = [],
            i = e.GetVariable("$version");
        return i && (i = i.split(" ")[1].split(","), t = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)]), t
    }), mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(e) {
        var t = [0, 0, 0, 0],
            i = function(e, t, i, n) {
                for (; e.isVersionSupported(t[0] + "." + t[1] + "." + t[2] + "." + t[3]);) t[i] += n;
                t[i] -= n
            };
        return i(e, t, 0, 1), i(e, t, 1, 1), i(e, t, 2, 1e4), i(e, t, 2, 1e3), i(e, t, 2, 100), i(e, t, 2, 10), i(e, t, 2, 1), i(e, t, 3, 1), t
    }), mejs.MediaFeatures = {
        init: function() {
            var e, t, i = this,
                n = document,
                s = mejs.PluginDetector.nav,
                o = mejs.PluginDetector.ua.toLowerCase(),
                a = ["source", "track", "audio", "video"];
            i.isiPad = null !== o.match(/ipad/i), i.isiPhone = null !== o.match(/iphone/i), i.isiOS = i.isiPhone || i.isiPad, i.isAndroid = null !== o.match(/android/i), i.isBustedAndroid = null !== o.match(/android 2\.[12]/), i.isBustedNativeHTTPS = "https:" === location.protocol && (null !== o.match(/android [12]\./) || null !== o.match(/macintosh.* version.* safari/)), i.isIE = -1 != s.appName.toLowerCase().indexOf("microsoft") || null !== s.appName.toLowerCase().match(/trident/gi), i.isChrome = null !== o.match(/chrome/gi), i.isChromium = null !== o.match(/chromium/gi), i.isFirefox = null !== o.match(/firefox/gi), i.isWebkit = null !== o.match(/webkit/gi), i.isGecko = null !== o.match(/gecko/gi) && !i.isWebkit && !i.isIE, i.isOpera = null !== o.match(/opera/gi), i.hasTouch = "ontouchstart" in window, i.svgAsImg = !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
            for (e = 0; e < a.length; e++) t = document.createElement(a[e]);
            i.supportsMediaTag = void 0 !== t.canPlayType || i.isBustedAndroid;
            try {
                t.canPlayType("video/mp4")
            } catch (e) {
                i.supportsMediaTag = !1
            }
            i.supportsPointerEvents = function() {
                var e, t = document.createElement("x"),
                    i = document.documentElement,
                    n = window.getComputedStyle;
                return "pointerEvents" in t.style && (t.style.pointerEvents = "auto", t.style.pointerEvents = "x", i.appendChild(t), e = n && "auto" === n(t, "").pointerEvents, i.removeChild(t), !!e)
            }(), i.hasFirefoxPluginMovingProblem = !1, i.hasiOSFullScreen = void 0 !== t.webkitEnterFullscreen, i.hasNativeFullscreen = void 0 !== t.requestFullscreen, i.hasWebkitNativeFullScreen = void 0 !== t.webkitRequestFullScreen, i.hasMozNativeFullScreen = void 0 !== t.mozRequestFullScreen, i.hasMsNativeFullScreen = void 0 !== t.msRequestFullscreen, i.hasTrueNativeFullScreen = i.hasWebkitNativeFullScreen || i.hasMozNativeFullScreen || i.hasMsNativeFullScreen, i.nativeFullScreenEnabled = i.hasTrueNativeFullScreen, i.hasMozNativeFullScreen ? i.nativeFullScreenEnabled = document.mozFullScreenEnabled : i.hasMsNativeFullScreen && (i.nativeFullScreenEnabled = document.msFullscreenEnabled), i.isChrome && (i.hasiOSFullScreen = !1), i.hasTrueNativeFullScreen && (i.fullScreenEventName = "", i.hasWebkitNativeFullScreen ? i.fullScreenEventName = "webkitfullscreenchange" : i.hasMozNativeFullScreen ? i.fullScreenEventName = "mozfullscreenchange" : i.hasMsNativeFullScreen && (i.fullScreenEventName = "MSFullscreenChange"), i.isFullScreen = function() {
                return i.hasMozNativeFullScreen ? n.mozFullScreen : i.hasWebkitNativeFullScreen ? n.webkitIsFullScreen : i.hasMsNativeFullScreen ? null !== n.msFullscreenElement : void 0
            }, i.requestFullScreen = function(e) {
                i.hasWebkitNativeFullScreen ? e.webkitRequestFullScreen() : i.hasMozNativeFullScreen ? e.mozRequestFullScreen() : i.hasMsNativeFullScreen && e.msRequestFullscreen()
            }, i.cancelFullScreen = function() {
                i.hasWebkitNativeFullScreen ? document.webkitCancelFullScreen() : i.hasMozNativeFullScreen ? document.mozCancelFullScreen() : i.hasMsNativeFullScreen && document.msExitFullscreen()
            }), i.hasiOSFullScreen && o.match(/mac os x 10_5/i) && (i.hasNativeFullScreen = !1, i.hasiOSFullScreen = !1)
        }
    }, mejs.MediaFeatures.init(), mejs.HtmlMediaElement = {
        pluginType: "native",
        isFullScreen: !1,
        setCurrentTime: function(e) {
            this.currentTime = e
        },
        setMuted: function(e) {
            this.muted = e
        },
        setVolume: function(e) {
            this.volume = e
        },
        stop: function() {
            this.pause()
        },
        setSrc: function(e) {
            for (var t = this.getElementsByTagName("source"); t.length > 0;) this.removeChild(t[0]);
            if ("string" == typeof e) this.src = e;
            else {
                var i, n;
                for (i = 0; i < e.length; i++)
                    if (n = e[i], this.canPlayType(n.type)) {
                        this.src = n.src;
                        break
                    }
            }
        },
        setVideoSize: function(e, t) {
            this.width = e, this.height = t
        }
    }, mejs.PluginMediaElement = function(e, t, i) {
        this.id = e, this.pluginType = t, this.src = i, this.events = {}, this.attributes = {}
    }, mejs.PluginMediaElement.prototype = {
        pluginElement: null,
        pluginType: "",
        isFullScreen: !1,
        playbackRate: -1,
        defaultPlaybackRate: -1,
        seekable: [],
        played: [],
        paused: !0,
        ended: !1,
        seeking: !1,
        duration: 0,
        error: null,
        tagName: "",
        muted: !1,
        volume: 1,
        currentTime: 0,
        play: function() {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.playVideo() : this.pluginApi.playMedia(), this.paused = !1)
        },
        load: function() {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType || this.pluginApi.loadMedia(), this.paused = !1)
        },
        pause: function() {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? 1 == this.pluginApi.getPlayerState() && this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(), this.paused = !0)
        },
        stop: function() {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(), this.paused = !0)
        },
        canPlayType: function(e) {
            var t, i, n, s = mejs.plugins[this.pluginType];
            for (t = 0; t < s.length; t++)
                if (n = s[t], mejs.PluginDetector.hasPluginVersion(this.pluginType, n.version))
                    for (i = 0; i < n.types.length; i++)
                        if (e == n.types[i]) return "probably";
            return ""
        },
        positionFullscreenButton: function(e, t, i) {
            null != this.pluginApi && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(Math.floor(e), Math.floor(t), i)
        },
        hideFullscreenButton: function() {
            null != this.pluginApi && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton()
        },
        setSrc: function(e) {
            if ("string" == typeof e) this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(e)), this.src = mejs.Utility.absolutizeUrl(e);
            else {
                var t, i;
                for (t = 0; t < e.length; t++)
                    if (i = e[t], this.canPlayType(i.type)) {
                        this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(i.src)), this.src = mejs.Utility.absolutizeUrl(i.src);
                        break
                    }
            }
        },
        setCurrentTime: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType || "vimeo" == this.pluginType ? this.pluginApi.seekTo(e) : this.pluginApi.setCurrentTime(e), this.currentTime = e)
        },
        setVolume: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType ? this.pluginApi.setVolume(100 * e) : this.pluginApi.setVolume(e), this.volume = e)
        },
        setMuted: function(e) {
            null != this.pluginApi && ("youtube" == this.pluginType ? (e ? this.pluginApi.mute() : this.pluginApi.unMute(), this.muted = e, this.dispatchEvent({
                type: "volumechange"
            })) : this.pluginApi.setMuted(e), this.muted = e)
        },
        setVideoSize: function(e, t) {
            this.pluginElement && this.pluginElement.style && (this.pluginElement.style.width = e + "px", this.pluginElement.style.height = t + "px"), null != this.pluginApi && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(e, t)
        },
        setFullscreen: function(e) {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(e)
        },
        enterFullScreen: function() {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!0)
        },
        exitFullScreen: function() {
            null != this.pluginApi && this.pluginApi.setFullscreen && this.setFullscreen(!1)
        },
        addEventListener: function(e, t, i) {
            this.events[e] = this.events[e] || [], this.events[e].push(t)
        },
        removeEventListener: function(e, t) {
            if (!e) return this.events = {}, !0;
            var i = this.events[e];
            if (!i) return !0;
            if (!t) return this.events[e] = [], !0;
            for (var n = 0; n < i.length; n++)
                if (i[n] === t) return this.events[e].splice(n, 1), !0;
            return !1
        },
        dispatchEvent: function(e) {
            var t, i = this.events[e.type];
            if (i)
                for (t = 0; t < i.length; t++) i[t].apply(this, [e])
        },
        hasAttribute: function(e) {
            return e in this.attributes
        },
        removeAttribute: function(e) {
            delete this.attributes[e]
        },
        getAttribute: function(e) {
            return this.hasAttribute(e) ? this.attributes[e] : ""
        },
        setAttribute: function(e, t) {
            this.attributes[e] = t
        },
        remove: function() {
            mejs.Utility.removeSwf(this.pluginElement.id)
        }
    }, mejs.MediaElementDefaults = {
        mode: "auto",
        plugins: ["flash", "silverlight", "youtube", "vimeo"],
        enablePluginDebug: !1,
        httpsBasicAuthSite: !1,
        type: "",
        pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
        flashName: "flashmediaelement.swf",
        flashStreamer: "",
        flashScriptAccess: "sameDomain",
        enablePluginSmoothing: !1,
        enablePseudoStreaming: !1,
        pseudoStreamingStartQueryParam: "start",
        silverlightName: "silverlightmediaelement.xap",
        defaultVideoWidth: 480,
        defaultVideoHeight: 270,
        pluginWidth: -1,
        pluginHeight: -1,
        pluginVars: [],
        timerRate: 250,
        startVolume: .8,
        success: function() {},
        error: function() {}
    }, mejs.MediaElement = function(e, t) {
        return mejs.HtmlMediaElementShim.create(e, t)
    }, mejs.HtmlMediaElementShim = {
        create: function(e, t) {
            var i, n, s = {},
                o = "string" == typeof e ? document.getElementById(e) : e,
                a = o.tagName.toLowerCase(),
                r = "audio" === a || "video" === a,
                l = r ? o.getAttribute("src") : o.getAttribute("href"),
                u = o.getAttribute("poster"),
                d = o.getAttribute("autoplay"),
                c = o.getAttribute("preload"),
                m = o.getAttribute("controls");
            for (n in mejs.MediaElementDefaults) s[n] = mejs.MediaElementDefaults[n];
            for (n in t) s[n] = t[n];
            return l = void 0 === l || null === l || "" == l ? null : l, u = void 0 === u || null === u ? "" : u, c = void 0 === c || null === c || "false" === c ? "none" : c, d = !(void 0 === d || null === d || "false" === d), m = !(void 0 === m || null === m || "false" === m), i = this.determinePlayback(o, s, mejs.MediaFeatures.supportsMediaTag, r, l), i.url = null !== i.url ? mejs.Utility.absolutizeUrl(i.url) : "", i.scheme = mejs.Utility.determineScheme(i.url), "native" == i.method ? (mejs.MediaFeatures.isBustedAndroid && (o.src = i.url, o.addEventListener("click", function() {
                o.play()
            }, !1)), this.updateNative(i, s, d, c)) : "" !== i.method ? this.createPlugin(i, s, u, d, c, m) : (this.createErrorMessage(i, s, u), this)
        },
        determinePlayback: function(e, t, i, n, s) {
            var o, a, r, l, u, d, c, m, p, h, f, v = [],
                g = {
                    method: "",
                    url: "",
                    htmlMediaElement: e,
                    isVideo: "audio" != e.tagName.toLowerCase(),
                    scheme: ""
                };
            if (void 0 !== t.type && "" !== t.type)
                if ("string" == typeof t.type) v.push({
                    type: t.type,
                    url: s
                });
                else
                    for (o = 0; o < t.type.length; o++) v.push({
                        type: t.type[o],
                        url: s
                    });
            else if (null !== s) d = this.formatType(s, e.getAttribute("type")), v.push({
                type: d,
                url: s
            });
            else
                for (o = 0; o < e.childNodes.length; o++) 1 == (u = e.childNodes[o]).nodeType && "source" == u.tagName.toLowerCase() && (s = u.getAttribute("src"), d = this.formatType(s, u.getAttribute("type")), (!(f = u.getAttribute("media")) || !window.matchMedia || window.matchMedia && window.matchMedia(f).matches) && v.push({
                    type: d,
                    url: s
                }));
            if (!n && v.length > 0 && null !== v[0].url && this.getTypeFromFile(v[0].url).indexOf("audio") > -1 && (g.isVideo = !1), mejs.MediaFeatures.isBustedAndroid && (e.canPlayType = function(e) {
                    return null !== e.match(/video\/(mp4|m4v)/gi) ? "maybe" : ""
                }), mejs.MediaFeatures.isChromium && (e.canPlayType = function(e) {
                    return null !== e.match(/video\/(webm|ogv|ogg)/gi) ? "maybe" : ""
                }), i && ("auto" === t.mode || "auto_plugin" === t.mode || "native" === t.mode) && (!mejs.MediaFeatures.isBustedNativeHTTPS || !0 !== t.httpsBasicAuthSite)) {
                for (n || (h = document.createElement(g.isVideo ? "video" : "audio"), e.parentNode.insertBefore(h, e), e.style.display = "none", g.htmlMediaElement = e = h), o = 0; o < v.length; o++)
                    if ("video/m3u8" == v[o].type || "" !== e.canPlayType(v[o].type).replace(/no/, "") || "" !== e.canPlayType(v[o].type.replace(/mp3/, "mpeg")).replace(/no/, "") || "" !== e.canPlayType(v[o].type.replace(/m4a/, "mp4")).replace(/no/, "")) {
                        g.method = "native", g.url = v[o].url;
                        break
                    }
                if ("native" === g.method && (null !== g.url && (e.src = g.url), "auto_plugin" !== t.mode)) return g
            }
            if ("auto" === t.mode || "auto_plugin" === t.mode || "shim" === t.mode)
                for (o = 0; o < v.length; o++)
                    for (d = v[o].type, a = 0; a < t.plugins.length; a++)
                        for (c = t.plugins[a], m = mejs.plugins[c], r = 0; r < m.length; r++)
                            if (null == (p = m[r]).version || mejs.PluginDetector.hasPluginVersion(c, p.version))
                                for (l = 0; l < p.types.length; l++)
                                    if (d.toLowerCase() == p.types[l].toLowerCase()) return g.method = c, g.url = v[o].url, g;
            return "auto_plugin" === t.mode && "native" === g.method ? g : ("" === g.method && v.length > 0 && (g.url = v[0].url), g)
        },
        formatType: function(e, t) {
            return e && !t ? this.getTypeFromFile(e) : t && ~t.indexOf(";") ? t.substr(0, t.indexOf(";")) : t
        },
        getTypeFromFile: function(e) {
            var t = (e = e.split("?")[0]).substring(e.lastIndexOf(".") + 1).toLowerCase(),
                i = /(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(t) ? "video/" : "audio/";
            return this.getTypeFromExtension(t, i)
        },
        getTypeFromExtension: function(e, t) {
            switch (t = t || "", e) {
                case "mp4":
                case "m4v":
                case "m4a":
                case "f4v":
                case "f4a":
                    return t + "mp4";
                case "flv":
                    return t + "x-flv";
                case "webm":
                case "webma":
                case "webmv":
                    return t + "webm";
                case "ogg":
                case "oga":
                case "ogv":
                    return t + "ogg";
                case "m3u8":
                    return "application/x-mpegurl";
                case "ts":
                    return t + "mp2t";
                default:
                    return t + e
            }
        },
        createErrorMessage: function(e, t, i) {
            var n = e.htmlMediaElement,
                s = document.createElement("div"),
                o = t.customError;
            s.className = "me-cannotplay";
            try {
                s.style.width = n.width + "px", s.style.height = n.height + "px"
            } catch (e) {}
            o || (o = '<a href="' + e.url + '">', "" !== i && (o += '<img src="' + i + '" width="100%" height="100%" alt="" />'), o += "<span>" + mejs.i18n.t("Download File") + "</span></a>"), s.innerHTML = o, n.parentNode.insertBefore(s, n), n.style.display = "none", t.error(n)
        },
        createPlugin: function(e, t, i, n, s, o) {
            var a, r, l, u = e.htmlMediaElement,
                d = 1,
                c = 1,
                m = "me_" + e.method + "_" + mejs.meIndex++,
                p = new mejs.PluginMediaElement(m, e.method, e.url),
                h = document.createElement("div");
            p.tagName = u.tagName;
            for (var f = 0; f < u.attributes.length; f++) {
                var v = u.attributes[f];
                v.specified && p.setAttribute(v.name, v.value)
            }
            for (r = u.parentNode; null !== r && null != r.tagName && "body" !== r.tagName.toLowerCase() && null != r.parentNode && null != r.parentNode.tagName && null != r.parentNode.constructor && "ShadowRoot" === r.parentNode.constructor.name;) {
                if ("p" === r.parentNode.tagName.toLowerCase()) {
                    r.parentNode.parentNode.insertBefore(r, r.parentNode);
                    break
                }
                r = r.parentNode
            }
            switch (e.isVideo ? (d = t.pluginWidth > 0 ? t.pluginWidth : t.videoWidth > 0 ? t.videoWidth : null !== u.getAttribute("width") ? u.getAttribute("width") : t.defaultVideoWidth, c = t.pluginHeight > 0 ? t.pluginHeight : t.videoHeight > 0 ? t.videoHeight : null !== u.getAttribute("height") ? u.getAttribute("height") : t.defaultVideoHeight, d = mejs.Utility.encodeUrl(d), c = mejs.Utility.encodeUrl(c)) : t.enablePluginDebug && (d = 320, c = 240), p.success = t.success, h.className = "me-plugin", h.id = m + "_container", e.isVideo ? u.parentNode.insertBefore(h, u) : document.body.insertBefore(h, document.body.childNodes[0]), "flash" !== e.method && "silverlight" !== e.method || (l = ["id=" + m, "isvideo=" + (e.isVideo ? "true" : "false"), "autoplay=" + (n ? "true" : "false"), "preload=" + s, "width=" + d, "startvolume=" + t.startVolume, "timerrate=" + t.timerRate, "flashstreamer=" + t.flashStreamer, "height=" + c, "pseudostreamstart=" + t.pseudoStreamingStartQueryParam], null !== e.url && ("flash" == e.method ? l.push("file=" + mejs.Utility.encodeUrl(e.url)) : l.push("file=" + e.url)), t.enablePluginDebug && l.push("debug=true"), t.enablePluginSmoothing && l.push("smoothing=true"), t.enablePseudoStreaming && l.push("pseudostreaming=true"), o && l.push("controls=true"), t.pluginVars && (l = l.concat(t.pluginVars)), window[m + "_init"] = function() {
                switch (p.pluginType) {
                    case "flash":
                        p.pluginElement = p.pluginApi = document.getElementById(m);
                        break;
                    case "silverlight":
                        p.pluginElement = document.getElementById(p.id), p.pluginApi = p.pluginElement.Content.MediaElementJS
                }
                null != p.pluginApi && p.success && p.success(p, u)
            }, window[m + "_event"] = function(e, t) {
                var i, n, s;
                i = {
                    type: e,
                    target: p
                };
                for (n in t) p[n] = t[n], i[n] = t[n];
                s = t.bufferedTime || 0, i.target.buffered = i.buffered = {
                    start: function(e) {
                        return 0
                    },
                    end: function(e) {
                        return s
                    },
                    length: 1
                }, p.dispatchEvent(i)
            }), e.method) {
                case "silverlight":
                    h.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + m + '" name="' + m + '" width="' + d + '" height="' + c + '" class="mejs-shim"><param name="initParams" value="' + l.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + t.pluginPath + t.silverlightName + '" /></object>';
                    break;
                case "flash":
                    mejs.MediaFeatures.isIE ? (a = document.createElement("div"), h.appendChild(a), a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + m + '" width="' + d + '" height="' + c + '" class="mejs-shim"><param name="movie" value="' + t.pluginPath + t.flashName + "?" + (new Date).getTime() + '" /><param name="flashvars" value="' + l.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' + t.flashScriptAccess + '" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>') : h.innerHTML = '<embed id="' + m + '" name="' + m + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="' + t.flashScriptAccess + '" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + t.pluginPath + t.flashName + '" flashvars="' + l.join("&") + '" width="' + d + '" height="' + c + '" scale="default"class="mejs-shim"></embed>';
                    break;
                case "youtube":
                    var g;
                    if (-1 != e.url.lastIndexOf("youtu.be")) - 1 != (g = e.url.substr(e.url.lastIndexOf("/") + 1)).indexOf("?") && (g = g.substr(0, g.indexOf("?")));
                    else {
                        var y = e.url.match(/[?&]v=([^&#]+)|&|#|$/);
                        y && (g = y[1])
                    }
                    youtubeSettings = {
                        container: h,
                        containerId: h.id,
                        pluginMediaElement: p,
                        pluginId: m,
                        videoId: g,
                        height: c,
                        width: d,
                        scheme: e.scheme
                    }, window.postMessage ? mejs.YouTubeApi.enqueueIframe(youtubeSettings) : mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) && mejs.YouTubeApi.createFlash(youtubeSettings, t);
                    break;
                case "vimeo":
                    var b = m + "_player";
                    if (p.vimeoid = e.url.substr(e.url.lastIndexOf("/") + 1), h.innerHTML = '<iframe src="' + e.scheme + "player.vimeo.com/video/" + p.vimeoid + "?api=1&portrait=0&byline=0&title=0&player_id=" + b + '" width="' + d + '" height="' + c + '" frameborder="0" class="mejs-shim" id="' + b + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', "function" == typeof $f) {
                        var j = $f(h.childNodes[0]),
                            w = -1;
                        j.addEvent("ready", function() {
                            function e(e, t, i, n) {
                                var s = {
                                    type: i,
                                    target: t
                                };
                                "timeupdate" == i && (t.currentTime = s.currentTime = n.seconds, t.duration = s.duration = n.duration), t.dispatchEvent(s)
                            }
                            j.playVideo = function() {
                                j.api("play")
                            }, j.stopVideo = function() {
                                j.api("unload")
                            }, j.pauseVideo = function() {
                                j.api("pause")
                            }, j.seekTo = function(e) {
                                j.api("seekTo", e)
                            }, j.setVolume = function(e) {
                                j.api("setVolume", e)
                            }, j.setMuted = function(e) {
                                e ? (j.lastVolume = j.api("getVolume"), j.api("setVolume", 0)) : (j.api("setVolume", j.lastVolume), delete j.lastVolume)
                            }, j.getPlayerState = function() {
                                return w
                            }, j.addEvent("play", function() {
                                w = 1, e(0, p, "play"), e(0, p, "playing")
                            }), j.addEvent("pause", function() {
                                w = 2, e(0, p, "pause")
                            }), j.addEvent("finish", function() {
                                w = 0, e(0, p, "ended")
                            }), j.addEvent("playProgress", function(t) {
                                e(0, p, "timeupdate", t)
                            }), j.addEvent("seek", function(t) {
                                w = 3, e(0, p, "seeked", t)
                            }), j.addEvent("loadProgress", function(t) {
                                w = 3, e(0, p, "progress", t)
                            }), p.pluginElement = h, p.pluginApi = j, p.success(p, p.pluginElement)
                        })
                    } else console.warn("You need to include froogaloop for vimeo to work")
            }
            return u.style.display = "none", u.removeAttribute("autoplay"), p
        },
        updateNative: function(e, t, i, n) {
            var s, o = e.htmlMediaElement;
            for (s in mejs.HtmlMediaElement) o[s] = mejs.HtmlMediaElement[s];
            return t.success(o, o), o
        }
    }, mejs.YouTubeApi = {
        isIframeStarted: !1,
        isIframeLoaded: !1,
        loadIframeApi: function(e) {
            if (!this.isIframeStarted) {
                var t = document.createElement("script");
                t.src = e.scheme + "www.youtube.com/player_api";
                var i = document.getElementsByTagName("script")[0];
                i.parentNode.insertBefore(t, i), this.isIframeStarted = !0
            }
        },
        iframeQueue: [],
        enqueueIframe: function(e) {
            this.isLoaded ? this.createIframe(e) : (this.loadIframeApi(e), this.iframeQueue.push(e))
        },
        createIframe: function(e) {
            var t = e.pluginMediaElement,
                i = new YT.Player(e.containerId, {
                    height: e.height,
                    width: e.width,
                    videoId: e.videoId,
                    playerVars: {
                        controls: 0,
                        wmode: "transparent"
                    },
                    events: {
                        onReady: function() {
                            i.setVideoSize = function(e, t) {
                                i.setSize(e, t)
                            }, e.pluginMediaElement.pluginApi = i, e.pluginMediaElement.pluginElement = document.getElementById(e.containerId), t.success(t, t.pluginElement), setInterval(function() {
                                mejs.YouTubeApi.createEvent(i, t, "timeupdate")
                            }, 250)
                        },
                        onStateChange: function(e) {
                            mejs.YouTubeApi.handleStateChange(e.data, i, t)
                        }
                    }
                })
        },
        createEvent: function(e, t, i) {
            var n = {
                type: i,
                target: t
            };
            if (e && e.getDuration) {
                t.currentTime = n.currentTime = e.getCurrentTime(), t.duration = n.duration = e.getDuration(), n.paused = t.paused, n.ended = t.ended, n.muted = e.isMuted(), n.volume = e.getVolume() / 100, n.bytesTotal = e.getVideoBytesTotal(), n.bufferedBytes = e.getVideoBytesLoaded();
                var s = n.bufferedBytes / n.bytesTotal * n.duration;
                n.target.buffered = n.buffered = {
                    start: function(e) {
                        return 0
                    },
                    end: function(e) {
                        return s
                    },
                    length: 1
                }
            }
            t.dispatchEvent(n)
        },
        iFrameReady: function() {
            for (this.isLoaded = !0, this.isIframeLoaded = !0; this.iframeQueue.length > 0;) {
                var e = this.iframeQueue.pop();
                this.createIframe(e)
            }
        },
        flashPlayers: {},
        createFlash: function(e) {
            this.flashPlayers[e.pluginId] = e;
            var t, i = e.scheme + "www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + e.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
            mejs.MediaFeatures.isIE ? (t = document.createElement("div"), e.container.appendChild(t), t.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + e.scheme + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + e.pluginId + '" width="' + e.width + '" height="' + e.height + '" class="mejs-shim"><param name="movie" value="' + i + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' + options.flashScriptAccess + '" /><param name="allowFullScreen" value="true" /></object>') : e.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + e.pluginId + '" data="' + i + '" width="' + e.width + '" height="' + e.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="' + options.flashScriptAccess + '"><param name="wmode" value="transparent"></object>'
        },
        flashReady: function(e) {
            var t = this.flashPlayers[e],
                i = document.getElementById(e),
                n = t.pluginMediaElement;
            n.pluginApi = n.pluginElement = i, t.success(n, n.pluginElement), i.cueVideoById(t.videoId);
            var s = t.containerId + "_callback";
            window[s] = function(e) {
                mejs.YouTubeApi.handleStateChange(e, i, n)
            }, i.addEventListener("onStateChange", s), setInterval(function() {
                mejs.YouTubeApi.createEvent(i, n, "timeupdate")
            }, 250), mejs.YouTubeApi.createEvent(i, n, "canplay")
        },
        handleStateChange: function(e, t, i) {
            switch (e) {
                case -1:
                    i.paused = !0, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "loadedmetadata");
                    break;
                case 0:
                    i.paused = !1, i.ended = !0, mejs.YouTubeApi.createEvent(t, i, "ended");
                    break;
                case 1:
                    i.paused = !1, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "play"), mejs.YouTubeApi.createEvent(t, i, "playing");
                    break;
                case 2:
                    i.paused = !0, i.ended = !1, mejs.YouTubeApi.createEvent(t, i, "pause");
                    break;
                case 3:
                    mejs.YouTubeApi.createEvent(t, i, "progress")
            }
        }
    }, window.onYouTubePlayerAPIReady = function() {
        mejs.YouTubeApi.iFrameReady()
    }, window.onYouTubePlayerReady = function(e) {
        mejs.YouTubeApi.flashReady(e)
    }, window.mejs = mejs, window.MediaElement = mejs.MediaElement,
    function(e, t, i) {
        "use strict";
        var n = {
            locale: {
                language: t.i18n && t.i18n.locale.language || "",
                strings: t.i18n && t.i18n.locale.strings || {}
            },
            ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
            methods: {}
        };
        n.getLanguage = function() {
            var e = n.locale.language || window.navigator.userLanguage || window.navigator.language;
            return n.ietf_lang_regex.exec(e) ? e : null
        }, "undefined" != typeof mejsL10n && (n.locale.language = mejsL10n.language), n.methods.checkPlain = function(e) {
            var t, i, n = {
                "&": "&amp;",
                '"': "&quot;",
                "<": "&lt;",
                ">": "&gt;"
            };
            e = String(e);
            for (t in n) n.hasOwnProperty(t) && (i = new RegExp(t, "g"), e = e.replace(i, n[t]));
            return e
        }, n.methods.t = function(e, t) {
            return n.locale.strings && n.locale.strings[t.context] && n.locale.strings[t.context][e] && (e = n.locale.strings[t.context][e]), n.methods.checkPlain(e)
        }, n.t = function(e, t) {
            if ("string" == typeof e && e.length > 0) {
                var i = n.getLanguage();
                return t = t || {
                    context: i
                }, n.methods.t(e, t)
            }
            throw {
                name: "InvalidArgumentException",
                message: "First argument is either not a string or empty."
            }
        }, t.i18n = n
    }(document, mejs),
    function(e, t) {
        "use strict";
        "undefined" != typeof mejsL10n && (e[mejsL10n.language] = mejsL10n.strings)
    }(mejs.i18n.locale.strings), "undefined" != typeof jQuery ? mejs.$ = jQuery : "undefined" != typeof Zepto ? (mejs.$ = Zepto, Zepto.fn.outerWidth = function(e) {
        var t = $(this).width();
        return e && (t += parseInt($(this).css("margin-right"), 10), t += parseInt($(this).css("margin-left"), 10)), t
    }) : "undefined" != typeof ender && (mejs.$ = ender),
    function(e) {
        mejs.MepDefaults = {
                poster: "",
                showPosterWhenEnded: !1,
                defaultVideoWidth: 480,
                defaultVideoHeight: 270,
                videoWidth: -1,
                videoHeight: -1,
                defaultAudioWidth: 400,
                defaultAudioHeight: 30,
                defaultSeekBackwardInterval: function(e) {
                    return .05 * e.duration
                },
                defaultSeekForwardInterval: function(e) {
                    return .05 * e.duration
                },
                setDimensions: !0,
                audioWidth: -1,
                audioHeight: -1,
                startVolume: .8,
                loop: !1,
                autoRewind: !0,
                enableAutosize: !0,
                timeFormat: "",
                alwaysShowHours: !1,
                showTimecodeFrameCount: !1,
                framesPerSecond: 25,
                autosizeProgress: !0,
                alwaysShowControls: !1,
                hideVideoControlsOnLoad: !1,
                clickToPlayPause: !0,
                iPadUseNativeControls: !1,
                iPhoneUseNativeControls: !1,
                AndroidUseNativeControls: !1,
                features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
                isVideo: !0,
                stretching: "auto",
                enableKeyboard: !0,
                pauseOtherPlayers: !0,
                keyActions: [{
                    keys: [32, 179],
                    action: function(e, t) {
                        t.paused || t.ended ? t.play() : t.pause()
                    }
                }, {
                    keys: [38],
                    action: function(e, t) {
                        e.container.find(".mejs-volume-slider").css("display", "block"), e.isVideo && (e.showControls(), e.startControlsTimer());
                        var i = Math.min(t.volume + .1, 1);
                        t.setVolume(i)
                    }
                }, {
                    keys: [40],
                    action: function(e, t) {
                        e.container.find(".mejs-volume-slider").css("display", "block"), e.isVideo && (e.showControls(), e.startControlsTimer());
                        var i = Math.max(t.volume - .1, 0);
                        t.setVolume(i)
                    }
                }, {
                    keys: [37, 227],
                    action: function(e, t) {
                        if (!isNaN(t.duration) && t.duration > 0) {
                            e.isVideo && (e.showControls(), e.startControlsTimer());
                            var i = Math.max(t.currentTime - e.options.defaultSeekBackwardInterval(t), 0);
                            t.setCurrentTime(i)
                        }
                    }
                }, {
                    keys: [39, 228],
                    action: function(e, t) {
                        if (!isNaN(t.duration) && t.duration > 0) {
                            e.isVideo && (e.showControls(), e.startControlsTimer());
                            var i = Math.min(t.currentTime + e.options.defaultSeekForwardInterval(t), t.duration);
                            t.setCurrentTime(i)
                        }
                    }
                }, {
                    keys: [70],
                    action: function(e, t) {
                        void 0 !== e.enterFullScreen && (e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen())
                    }
                }, {
                    keys: [77],
                    action: function(e, t) {
                        e.container.find(".mejs-volume-slider").css("display", "block"), e.isVideo && (e.showControls(), e.startControlsTimer()), e.media.muted ? e.setMuted(!1) : e.setMuted(!0)
                    }
                }]
            }, mejs.mepIndex = 0, mejs.players = {}, mejs.MediaElementPlayer = function(t, i) {
                if (!(this instanceof mejs.MediaElementPlayer)) return new mejs.MediaElementPlayer(t, i);
                var n = this;
                return n.$media = n.$node = e(t), n.node = n.media = n.$media[0], n.node ? void 0 !== n.node.player ? n.node.player : (void 0 === i && (i = n.$node.data("mejsoptions")), n.options = e.extend({}, mejs.MepDefaults, i), n.options.timeFormat || (n.options.timeFormat = "mm:ss", n.options.alwaysShowHours && (n.options.timeFormat = "hh:mm:ss"), n.options.showTimecodeFrameCount && (n.options.timeFormat += ":ff")), mejs.Utility.calculateTimeFormat(0, n.options, n.options.framesPerSecond || 25), n.id = "mep_" + mejs.mepIndex++, mejs.players[n.id] = n, n.init(), n) : void 0
            }, mejs.MediaElementPlayer.prototype = {
                hasFocus: !1,
                controlsAreVisible: !0,
                init: function() {
                    var t = this,
                        i = mejs.MediaFeatures,
                        n = e.extend(!0, {}, t.options, {
                            success: function(e, i) {
                                t.meReady(e, i)
                            },
                            error: function(e) {
                                t.handleError(e)
                            }
                        }),
                        s = t.media.tagName.toLowerCase();
                    if (t.isDynamic = "audio" !== s && "video" !== s, t.isDynamic ? t.isVideo = t.options.isVideo : t.isVideo = "audio" !== s && t.options.isVideo, i.isiPad && t.options.iPadUseNativeControls || i.isiPhone && t.options.iPhoneUseNativeControls) t.$media.attr("controls", "controls"), i.isiPad && null !== t.media.getAttribute("autoplay") && t.play();
                    else if (i.isAndroid && t.options.AndroidUseNativeControls);
                    else {
                        t.$media.removeAttr("controls");
                        var o = t.isVideo ? mejs.i18n.t("Video Player") : mejs.i18n.t("Audio Player");
                        e('<span class="mejs-offscreen">' + o + "</span>").insertBefore(t.$media), t.container = e('<div id="' + t.id + '" class="mejs-container ' + (mejs.MediaFeatures.svgAsImg ? "svg" : "no-svg") + '" tabindex="0" role="application" aria-label="' + o + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(t.$media[0].className).insertBefore(t.$media).focus(function(e) {
                            t.controlsAreVisible || t.hasFocus || !t.controlsEnabled || (t.showControls(!0), t.hasMsNativeFullScreen || t.container.find(".mejs-playpause-button > button").focus())
                        }), "fill" !== t.options.stretching || t.container.parent("mejs-fill-container").length || (t.outerContainer = t.$media.parent(), t.container.wrap('<div class="mejs-fill-container"/>')), t.container.addClass((i.isAndroid ? "mejs-android " : "") + (i.isiOS ? "mejs-ios " : "") + (i.isiPad ? "mejs-ipad " : "") + (i.isiPhone ? "mejs-iphone " : "") + (t.isVideo ? "mejs-video " : "mejs-audio ")), t.container.find(".mejs-mediaelement").append(t.$media), t.node.player = t, t.controls = t.container.find(".mejs-controls"), t.layers = t.container.find(".mejs-layers");
                        var a = t.isVideo ? "video" : "audio",
                            r = a.substring(0, 1).toUpperCase() + a.substring(1);
                        t.options[a + "Width"] > 0 || t.options[a + "Width"].toString().indexOf("%") > -1 ? t.width = t.options[a + "Width"] : "" !== t.media.style.width && null !== t.media.style.width ? t.width = t.media.style.width : null !== t.media.getAttribute("width") ? t.width = t.$media.attr("width") : t.width = t.options["default" + r + "Width"], t.options[a + "Height"] > 0 || t.options[a + "Height"].toString().indexOf("%") > -1 ? t.height = t.options[a + "Height"] : "" !== t.media.style.height && null !== t.media.style.height ? t.height = t.media.style.height : null !== t.$media[0].getAttribute("height") ? t.height = t.$media.attr("height") : t.height = t.options["default" + r + "Height"], t.setPlayerSize(t.width, t.height), n.pluginWidth = t.width, n.pluginHeight = t.height
                    }
                    mejs.MediaElement(t.$media[0], n), void 0 !== t.container && t.controlsAreVisible && t.container.trigger("controlsshown")
                },
                showControls: function(e) {
                    var t = this;
                    e = void 0 === e || e, t.controlsAreVisible || (e ? (t.controls.removeClass("mejs-offscreen").stop(!0, !0).fadeIn(200, function() {
                        t.controlsAreVisible = !0, t.container.trigger("controlsshown")
                    }), t.container.find(".mejs-control").removeClass("mejs-offscreen").stop(!0, !0).fadeIn(200, function() {
                        t.controlsAreVisible = !0
                    })) : (t.controls.removeClass("mejs-offscreen").css("display", "block"), t.container.find(".mejs-control").removeClass("mejs-offscreen").css("display", "block"), t.controlsAreVisible = !0, t.container.trigger("controlsshown")), t.setControlsSize())
                },
                hideControls: function(t) {
                    var i = this;
                    t = void 0 === t || t, !i.controlsAreVisible || i.options.alwaysShowControls || i.keyboardAction || (t ? (i.controls.stop(!0, !0).fadeOut(200, function() {
                        e(this).addClass("mejs-offscreen").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")
                    }), i.container.find(".mejs-control").stop(!0, !0).fadeOut(200, function() {
                        e(this).addClass("mejs-offscreen").css("display", "block")
                    })) : (i.controls.addClass("mejs-offscreen").css("display", "block"), i.container.find(".mejs-control").addClass("mejs-offscreen").css("display", "block"), i.controlsAreVisible = !1, i.container.trigger("controlshidden")))
                },
                controlsTimer: null,
                startControlsTimer: function(e) {
                    var t = this;
                    e = void 0 !== e ? e : 1500, t.killControlsTimer("start"), t.controlsTimer = setTimeout(function() {
                        t.hideControls(), t.killControlsTimer("hide")
                    }, e)
                },
                killControlsTimer: function(e) {
                    var t = this;
                    null !== t.controlsTimer && (clearTimeout(t.controlsTimer), delete t.controlsTimer, t.controlsTimer = null)
                },
                controlsEnabled: !0,
                disableControls: function() {
                    var e = this;
                    e.killControlsTimer(), e.hideControls(!1), this.controlsEnabled = !1
                },
                enableControls: function() {
                    var e = this;
                    e.showControls(!1), e.controlsEnabled = !0
                },
                meReady: function(t, i) {
                    var n, s, o = this,
                        a = mejs.MediaFeatures,
                        r = i.getAttribute("autoplay"),
                        l = !(void 0 === r || null === r || "false" === r);
                    if (!o.created) {
                        if (o.created = !0, o.media = t, o.domNode = i, !(a.isAndroid && o.options.AndroidUseNativeControls || a.isiPad && o.options.iPadUseNativeControls || a.isiPhone && o.options.iPhoneUseNativeControls)) {
                            o.buildposter(o, o.controls, o.layers, o.media), o.buildkeyboard(o, o.controls, o.layers, o.media), o.buildoverlays(o, o.controls, o.layers, o.media), o.findTracks();
                            for (n in o.options.features)
                                if (s = o.options.features[n], o["build" + s]) try {
                                    o["build" + s](o, o.controls, o.layers, o.media)
                                } catch (e) {}
                                o.container.trigger("controlsready"), o.setPlayerSize(o.width, o.height), o.setControlsSize(), o.isVideo && (mejs.MediaFeatures.hasTouch ? o.$media.bind("touchstart", function() {
                                o.controlsAreVisible ? o.hideControls(!1) : o.controlsEnabled && o.showControls(!1)
                            }) : (o.clickToPlayPauseCallback = function() {
                                if (o.options.clickToPlayPause) {
                                    o.media.paused ? o.play() : o.pause();
                                    var e = o.$media.closest(".mejs-container").find(".mejs-overlay-button"),
                                        t = e.attr("aria-pressed");
                                    e.attr("aria-pressed", !t)
                                }
                            }, o.media.addEventListener("click", o.clickToPlayPauseCallback, !1), o.container.bind("mouseenter", function() {
                                o.controlsEnabled && (o.options.alwaysShowControls || (o.killControlsTimer("enter"), o.showControls(), o.startControlsTimer(2500)))
                            }).bind("mousemove", function() {
                                o.controlsEnabled && (o.controlsAreVisible || o.showControls(), o.options.alwaysShowControls || o.startControlsTimer(2500))
                            }).bind("mouseleave", function() {
                                o.controlsEnabled && (o.media.paused || o.options.alwaysShowControls || o.startControlsTimer(1e3))
                            })), o.options.hideVideoControlsOnLoad && o.hideControls(!1), l && !o.options.alwaysShowControls && o.hideControls(), o.options.enableAutosize && o.media.addEventListener("loadedmetadata", function(e) {
                                o.options.videoHeight <= 0 && null === o.domNode.getAttribute("height") && !isNaN(e.target.videoHeight) && (o.setPlayerSize(e.target.videoWidth, e.target.videoHeight), o.setControlsSize(), o.media.setVideoSize(e.target.videoWidth, e.target.videoHeight))
                            }, !1)), o.media.addEventListener("play", function() {
                                var e;
                                for (e in mejs.players) {
                                    var t = mejs.players[e];
                                    t.id == o.id || !o.options.pauseOtherPlayers || t.paused || t.ended || t.pause(), t.hasFocus = !1
                                }
                                o.hasFocus = !0
                            }, !1), o.media.addEventListener("ended", function(t) {
                                if (o.options.autoRewind) try {
                                    o.media.setCurrentTime(0), window.setTimeout(function() {
                                        e(o.container).find(".mejs-overlay-loading").parent().hide()
                                    }, 20)
                                } catch (e) {}
                                o.media.pause(), o.setProgressRail && o.setProgressRail(), o.setCurrentRail && o.setCurrentRail(), o.options.loop ? o.play() : !o.options.alwaysShowControls && o.controlsEnabled && o.showControls()
                            }, !1), o.media.addEventListener("loadedmetadata", function(e) {
                                o.updateDuration && o.updateDuration(), o.updateCurrent && o.updateCurrent(), o.isFullScreen || (o.setPlayerSize(o.width, o.height), o.setControlsSize())
                            }, !1);
                            var u = null;
                            o.media.addEventListener("timeupdate", function() {
                                u !== this.duration && (u = this.duration, mejs.Utility.calculateTimeFormat(u, o.options, o.options.framesPerSecond || 25), o.updateDuration && o.updateDuration(), o.updateCurrent && o.updateCurrent(), o.setControlsSize())
                            }, !1), o.container.focusout(function(t) {
                                if (t.relatedTarget) {
                                    var i = e(t.relatedTarget);
                                    o.keyboardAction && 0 === i.parents(".mejs-container").length && (o.keyboardAction = !1, o.isVideo && !o.options.alwaysShowControls && o.hideControls(!0))
                                }
                            }), setTimeout(function() {
                                o.setPlayerSize(o.width, o.height), o.setControlsSize()
                            }, 50), o.globalBind("resize", function() {
                                o.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || o.setPlayerSize(o.width, o.height), o.setControlsSize()
                            }), "youtube" == o.media.pluginType && (a.isiOS || a.isAndroid) && (o.container.find(".mejs-overlay-play").hide(), o.container.find(".mejs-poster").hide())
                        }
                        l && "native" == t.pluginType && o.play(), o.options.success && ("string" == typeof o.options.success ? window[o.options.success](o.media, o.domNode, o) : o.options.success(o.media, o.domNode, o))
                    }
                },
                handleError: function(e) {
                    var t = this;
                    t.controls && t.controls.hide(), t.options.error && t.options.error(e)
                },
                setPlayerSize: function(e, t) {
                    var i = this;
                    if (!i.options.setDimensions) return !1;
                    switch (void 0 !== e && (i.width = e), void 0 !== t && (i.height = t), i.options.stretching) {
                        case "fill":
                            i.isVideo ? this.setFillMode() : this.setDimensions(i.width, i.height);
                            break;
                        case "responsive":
                            this.setResponsiveMode();
                            break;
                        case "none":
                            this.setDimensions(i.width, i.height);
                            break;
                        default:
                            !0 === this.hasFluidMode() ? this.setResponsiveMode() : this.setDimensions(i.width, i.height)
                    }
                },
                hasFluidMode: function() {
                    var e = this;
                    return e.height.toString().indexOf("%") > 0 || "none" !== e.$node.css("max-width") && "t.width" !== e.$node.css("max-width") || e.$node[0].currentStyle && "100%" === e.$node[0].currentStyle.maxWidth
                },
                setResponsiveMode: function() {
                    var t = this,
                        i = t.isVideo ? t.media.videoWidth && t.media.videoWidth > 0 ? t.media.videoWidth : null !== t.media.getAttribute("width") ? t.media.getAttribute("width") : t.options.defaultVideoWidth : t.options.defaultAudioWidth,
                        n = t.isVideo ? t.media.videoHeight && t.media.videoHeight > 0 ? t.media.videoHeight : null !== t.media.getAttribute("height") ? t.media.getAttribute("height") : t.options.defaultVideoHeight : t.options.defaultAudioHeight,
                        s = t.container.parent().closest(":visible").width(),
                        o = t.container.parent().closest(":visible").height(),
                        a = t.isVideo || !t.options.autosizeProgress ? parseInt(s * n / i, 10) : n;
                    (isNaN(a) || 0 !== o && a > o && o > n) && (a = o), t.container.parent().length > 0 && "body" === t.container.parent()[0].tagName.toLowerCase() && (s = e(window).width(), a = e(window).height()), a && s && (t.container.width(s).height(a), t.$media.add(t.container.find(".mejs-shim")).width("100%").height("100%"), t.isVideo && t.media.setVideoSize && t.media.setVideoSize(s, a), t.layers.children(".mejs-layer").width("100%").height("100%"))
                },
                setFillMode: function() {
                    var e = this,
                        t = e.outerContainer;
                    t.width() || t.height(e.$media.width()), t.height() || t.height(e.$media.height());
                    var i = t.width(),
                        n = t.height();
                    e.setDimensions("100%", "100%"), e.container.find(".mejs-poster img").css("display", "block"), targetElement = e.container.find("object, embed, iframe, video");
                    var s = e.height,
                        o = e.width,
                        a = i,
                        r = s * i / o,
                        l = o * n / s,
                        u = n,
                        d = !(l > i),
                        c = d ? Math.floor(a) : Math.floor(l),
                        m = d ? Math.floor(r) : Math.floor(u);
                    d ? (targetElement.height(m).width(i), e.media.setVideoSize && e.media.setVideoSize(i, m)) : (targetElement.height(n).width(c), e.media.setVideoSize && e.media.setVideoSize(c, n)), targetElement.css({
                        "margin-left": Math.floor((i - c) / 2),
                        "margin-top": 0
                    })
                },
                setDimensions: function(e, t) {
                    var i = this;
                    i.container.width(e).height(t), i.layers.children(".mejs-layer").width(e).height(t)
                },
                setControlsSize: function() {
                    var t = this,
                        i = 0,
                        n = 0,
                        s = t.controls.find(".mejs-time-rail"),
                        o = t.controls.find(".mejs-time-total"),
                        a = s.siblings(),
                        r = a.last(),
                        l = null;
                    if (t.container.is(":visible") && s.length && s.is(":visible")) {
                        t.options && !t.options.autosizeProgress && (n = parseInt(s.css("width"), 10)), 0 !== n && n || (a.each(function() {
                            var t = e(this);
                            "absolute" != t.css("position") && t.is(":visible") && (i += e(this).outerWidth(!0))
                        }), n = t.controls.width() - i - (s.outerWidth(!0) - s.width()));
                        do {
                            s.width(n), o.width(n - (o.outerWidth(!0) - o.width())), "absolute" != r.css("position") && (l = r.length ? r.position() : null, n--)
                        } while (null !== l && l.top.toFixed(2) > 0 && n > 0);
                        t.container.trigger("controlsresize")
                    }
                },
                buildposter: function(t, i, n, s) {
                    var o = this,
                        a = e('<div class="mejs-poster mejs-layer"></div>').appendTo(n),
                        r = t.$media.attr("poster");
                    "" !== t.options.poster && (r = t.options.poster), r ? o.setPoster(r) : a.hide(), s.addEventListener("play", function() {
                        a.hide()
                    }, !1), t.options.showPosterWhenEnded && t.options.autoRewind && s.addEventListener("ended", function() {
                        a.show()
                    }, !1)
                },
                setPoster: function(t) {
                    var i = this.container.find(".mejs-poster"),
                        n = i.find("img");
                    0 === n.length && (n = e('<img width="100%" height="100%" alt="" />').appendTo(i)), n.attr("src", t), i.css({
                        "background-image": "url(" + t + ")"
                    })
                },
                buildoverlays: function(t, i, n, s) {
                    var o = this;
                    if (t.isVideo) {
                        var a = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(n),
                            r = e('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(n),
                            l = e('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button" role="button" aria-label="' + mejs.i18n.t("Play") + '" aria-pressed="false"></div></div>').appendTo(n).bind("click", function() {
                                if (o.options.clickToPlayPause) {
                                    s.paused && s.play();
                                    var t = e(this).find(".mejs-overlay-button"),
                                        i = t.attr("aria-pressed");
                                    t.attr("aria-pressed", !!i)
                                }
                            });
                        s.addEventListener("play", function() {
                            l.hide(), a.hide(), i.find(".mejs-time-buffering").hide(), r.hide()
                        }, !1), s.addEventListener("playing", function() {
                            l.hide(), a.hide(), i.find(".mejs-time-buffering").hide(), r.hide()
                        }, !1), s.addEventListener("seeking", function() {
                            a.show(), i.find(".mejs-time-buffering").show()
                        }, !1), s.addEventListener("seeked", function() {
                            a.hide(), i.find(".mejs-time-buffering").hide()
                        }, !1), s.addEventListener("pause", function() {
                            mejs.MediaFeatures.isiPhone || l.show()
                        }, !1), s.addEventListener("waiting", function() {
                            a.show(), i.find(".mejs-time-buffering").show()
                        }, !1), s.addEventListener("loadeddata", function() {
                            a.show(), i.find(".mejs-time-buffering").show(), mejs.MediaFeatures.isAndroid && (s.canplayTimeout = window.setTimeout(function() {
                                if (document.createEvent) {
                                    var e = document.createEvent("HTMLEvents");
                                    return e.initEvent("canplay", !0, !0), s.dispatchEvent(e)
                                }
                            }, 300))
                        }, !1), s.addEventListener("canplay", function() {
                            a.hide(), i.find(".mejs-time-buffering").hide(), clearTimeout(s.canplayTimeout)
                        }, !1), s.addEventListener("error", function(e) {
                            o.handleError(e), a.hide(), l.hide(), r.show(), r.find(".mejs-overlay-error").html("Error loading this resource")
                        }, !1), s.addEventListener("keydown", function(e) {
                            o.onkeydown(t, s, e)
                        }, !1)
                    }
                },
                buildkeyboard: function(t, i, n, s) {
                    var o = this;
                    o.container.keydown(function() {
                        o.keyboardAction = !0
                    }), o.globalBind("keydown", function(i) {
                        return t.hasFocus = 0 !== e(i.target).closest(".mejs-container").length && e(i.target).closest(".mejs-container").attr("id") === t.$media.closest(".mejs-container").attr("id"), o.onkeydown(t, s, i)
                    }), o.globalBind("click", function(i) {
                        t.hasFocus = 0 !== e(i.target).closest(".mejs-container").length
                    })
                },
                onkeydown: function(e, t, i) {
                    if (e.hasFocus && e.options.enableKeyboard)
                        for (var n = 0, s = e.options.keyActions.length; n < s; n++)
                            for (var o = e.options.keyActions[n], a = 0, r = o.keys.length; a < r; a++)
                                if (i.keyCode == o.keys[a]) return "function" == typeof i.preventDefault && i.preventDefault(), o.action(e, t, i.keyCode, i), !1;
                    return !0
                },
                findTracks: function() {
                    var t = this,
                        i = t.$media.find("track");
                    t.tracks = [], i.each(function(i, n) {
                        n = e(n), t.tracks.push({
                            srclang: n.attr("srclang") ? n.attr("srclang").toLowerCase() : "",
                            src: n.attr("src"),
                            kind: n.attr("kind"),
                            label: n.attr("label") || "",
                            entries: [],
                            isLoaded: !1
                        })
                    })
                },
                changeSkin: function(e) {
                    this.container[0].className = "mejs-container " + e, this.setPlayerSize(this.width, this.height), this.setControlsSize()
                },
                play: function() {
                    this.load(), this.media.play()
                },
                pause: function() {
                    try {
                        this.media.pause()
                    } catch (e) {}
                },
                load: function() {
                    this.isLoaded || this.media.load(), this.isLoaded = !0
                },
                setMuted: function(e) {
                    this.media.setMuted(e)
                },
                setCurrentTime: function(e) {
                    this.media.setCurrentTime(e)
                },
                getCurrentTime: function() {
                    return this.media.currentTime
                },
                setVolume: function(e) {
                    this.media.setVolume(e)
                },
                getVolume: function() {
                    return this.media.volume
                },
                setSrc: function(e) {
                    this.media.setSrc(e)
                },
                remove: function() {
                    var e, t, i = this;
                    i.container.prev(".mejs-offscreen").remove();
                    for (e in i.options.features)
                        if (t = i.options.features[e], i["clean" + t]) try {
                            i["clean" + t](i)
                        } catch (e) {}
                        i.isDynamic ? i.$node.insertBefore(i.container) : (i.$media.prop("controls", !0), i.$node.clone().insertBefore(i.container).show(), i.$node.remove()), "native" !== i.media.pluginType && i.media.remove(), delete mejs.players[i.id], "object" == typeof i.container && i.container.remove(), i.globalUnbind(), delete i.node.player
                },
                rebuildtracks: function() {
                    var e = this;
                    e.findTracks(), e.buildtracks(e, e.controls, e.layers, e.media)
                },
                resetSize: function() {
                    var e = this;
                    setTimeout(function() {
                        e.setPlayerSize(e.width, e.height), e.setControlsSize()
                    }, 50)
                }
            },
            function() {
                function t(t, n) {
                    var s = {
                        d: [],
                        w: []
                    };
                    return e.each((t || "").split(" "), function(e, t) {
                        var o = t + "." + n;
                        0 === o.indexOf(".") ? (s.d.push(o), s.w.push(o)) : s[i.test(t) ? "w" : "d"].push(o)
                    }), s.d = s.d.join(" "), s.w = s.w.join(" "), s
                }
                var i = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
                mejs.MediaElementPlayer.prototype.globalBind = function(i, n, s) {
                    var o = this,
                        a = o.node ? o.node.ownerDocument : document;
                    (i = t(i, o.id)).d && e(a).bind(i.d, n, s), i.w && e(window).bind(i.w, n, s)
                }, mejs.MediaElementPlayer.prototype.globalUnbind = function(i, n) {
                    var s = this,
                        o = s.node ? s.node.ownerDocument : document;
                    (i = t(i, s.id)).d && e(o).unbind(i.d, n), i.w && e(window).unbind(i.w, n)
                }
            }(), void 0 !== e && (e.fn.mediaelementplayer = function(t) {
                return !1 === t ? this.each(function() {
                    var t = e(this).data("mediaelementplayer");
                    t && t.remove(), e(this).removeData("mediaelementplayer")
                }) : this.each(function() {
                    e(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, t))
                }), this
            }, e(document).ready(function() {
                e(".mejs-player").mediaelementplayer()
            })), window.MediaElementPlayer = mejs.MediaElementPlayer
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            playText: mejs.i18n.t("Play"),
            pauseText: mejs.i18n.t("Pause")
        }), e.extend(MediaElementPlayer.prototype, {
            buildplaypause: function(t, i, n, s) {
                function o(e) {
                    "play" === e ? (l.removeClass("mejs-play").addClass("mejs-pause"), u.attr({
                        title: r.pauseText,
                        "aria-label": r.pauseText
                    })) : (l.removeClass("mejs-pause").addClass("mejs-play"), u.attr({
                        title: r.playText,
                        "aria-label": r.playText
                    }))
                }
                var a = this,
                    r = a.options,
                    l = e('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + a.id + '" title="' + r.playText + '" aria-label="' + r.playText + '"></button></div>').appendTo(i).click(function(e) {
                        return e.preventDefault(), s.paused ? s.play() : s.pause(), !1
                    }),
                    u = l.find("button");
                o("pse"), s.addEventListener("play", function() {
                    o("play")
                }, !1), s.addEventListener("playing", function() {
                    o("play")
                }, !1), s.addEventListener("pause", function() {
                    o("pse")
                }, !1), s.addEventListener("paused", function() {
                    o("pse")
                }, !1)
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            stopText: "Stop"
        }), e.extend(MediaElementPlayer.prototype, {
            buildstop: function(t, i, n, s) {
                var o = this;
                e('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + o.id + '" title="' + o.options.stopText + '" aria-label="' + o.options.stopText + '"></button></div>').appendTo(i).click(function() {
                    s.paused || s.pause(), s.currentTime > 0 && (s.setCurrentTime(0), s.pause(), i.find(".mejs-time-current").width("0px"), i.find(".mejs-time-handle").css("left", "0px"), i.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0, t.options)), i.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0, t.options)), n.find(".mejs-poster").show())
                })
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            progessHelpText: mejs.i18n.t("Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.")
        }), e.extend(MediaElementPlayer.prototype, {
            buildprogress: function(t, i, n, s) {
                e('<div class="mejs-time-rail"><span  class="mejs-time-total mejs-time-slider"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(i), i.find(".mejs-time-buffering").hide();
                var o = this,
                    a = i.find(".mejs-time-total"),
                    r = i.find(".mejs-time-loaded"),
                    l = i.find(".mejs-time-current"),
                    u = i.find(".mejs-time-handle"),
                    d = i.find(".mejs-time-float"),
                    c = i.find(".mejs-time-float-current"),
                    m = i.find(".mejs-time-slider"),
                    p = function(e) {
                        var i, n = a.offset(),
                            o = a.width(),
                            r = 0,
                            l = 0,
                            u = 0;
                        i = e.originalEvent && e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.changedTouches ? e.changedTouches[0].pageX : e.pageX, s.duration && (i < n.left ? i = n.left : i > o + n.left && (i = o + n.left), l = (r = (u = i - n.left) / o) <= .02 ? 0 : r * s.duration, h && l !== s.currentTime && s.setCurrentTime(l), mejs.MediaFeatures.hasTouch || (d.css("left", u), c.html(mejs.Utility.secondsToTimeCode(l, t.options)), d.show()))
                    },
                    h = !1,
                    f = !1,
                    v = 0,
                    g = !1,
                    y = t.options.autoRewind,
                    b = function(e) {
                        var i = s.currentTime,
                            n = mejs.i18n.t("Time Slider"),
                            o = mejs.Utility.secondsToTimeCode(i, t.options),
                            a = s.duration;
                        m.attr({
                            "aria-label": n,
                            "aria-valuemin": 0,
                            "aria-valuemax": a,
                            "aria-valuenow": i,
                            "aria-valuetext": o,
                            role: "slider",
                            tabindex: 0
                        })
                    },
                    j = function() {
                        new Date - v >= 1e3 && s.play()
                    };
                m.bind("focus", function(e) {
                    t.options.autoRewind = !1
                }), m.bind("blur", function(e) {
                    t.options.autoRewind = y
                }), m.bind("keydown", function(e) {
                    new Date - v >= 1e3 && (g = s.paused);
                    var i = e.keyCode,
                        n = s.duration,
                        o = s.currentTime,
                        a = t.options.defaultSeekForwardInterval(s),
                        r = t.options.defaultSeekBackwardInterval(s);
                    switch (i) {
                        case 37:
                        case 40:
                            o -= r;
                            break;
                        case 39:
                        case 38:
                            o += a;
                            break;
                        case 36:
                            o = 0;
                            break;
                        case 35:
                            o = n;
                            break;
                        case 32:
                        case 13:
                            return void(s.paused ? s.play() : s.pause());
                        default:
                            return
                    }
                    return o = o < 0 ? 0 : o >= n ? n : Math.floor(o), v = new Date, g || s.pause(), o < s.duration && !g && setTimeout(j, 1100), s.setCurrentTime(o), e.preventDefault(), e.stopPropagation(), !1
                }), a.bind("mousedown touchstart", function(e) {
                    1 !== e.which && 0 !== e.which || (h = !0, p(e), o.globalBind("mousemove.dur touchmove.dur", function(e) {
                        p(e)
                    }), o.globalBind("mouseup.dur touchend.dur", function(e) {
                        h = !1, d.hide(), o.globalUnbind(".dur")
                    }))
                }).bind("mouseenter", function(e) {
                    f = !0, o.globalBind("mousemove.dur", function(e) {
                        p(e)
                    }), mejs.MediaFeatures.hasTouch || d.show()
                }).bind("mouseleave", function(e) {
                    f = !1, h || (o.globalUnbind(".dur"), d.hide())
                }), s.addEventListener("progress", function(e) {
                    t.setProgressRail(e), t.setCurrentRail(e)
                }, !1), s.addEventListener("timeupdate", function(e) {
                    t.setProgressRail(e), t.setCurrentRail(e), b()
                }, !1), o.container.on("controlsresize", function() {
                    t.setProgressRail(), t.setCurrentRail()
                }), o.loaded = r, o.total = a, o.current = l, o.handle = u
            },
            setProgressRail: function(e) {
                var t = this,
                    i = void 0 !== e ? e.target : t.media,
                    n = null;
                i && i.buffered && i.buffered.length > 0 && i.buffered.end && i.duration ? n = i.buffered.end(i.buffered.length - 1) / i.duration : i && void 0 !== i.bytesTotal && i.bytesTotal > 0 && void 0 !== i.bufferedBytes ? n = i.bufferedBytes / i.bytesTotal : e && e.lengthComputable && 0 !== e.total && (n = e.loaded / e.total), null !== n && (n = Math.min(1, Math.max(0, n)), t.loaded && t.total && t.loaded.width(t.total.width() * n))
            },
            setCurrentRail: function() {
                var e = this;
                if (void 0 !== e.media.currentTime && e.media.duration && e.total && e.handle) {
                    var t = Math.round(e.total.width() * e.media.currentTime / e.media.duration),
                        i = t - Math.round(e.handle.outerWidth(!0) / 2);
                    e.current.width(t), e.handle.css("left", i)
                }
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            duration: -1,
            timeAndDurationSeparator: "<span> | </span>"
        }), e.extend(MediaElementPlayer.prototype, {
            buildcurrent: function(t, i, n, s) {
                var o = this;
                e('<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">' + mejs.Utility.secondsToTimeCode(0, t.options) + "</span></div>").appendTo(i), o.currenttime = o.controls.find(".mejs-currenttime"), s.addEventListener("timeupdate", function() {
                    o.controlsAreVisible && t.updateCurrent()
                }, !1)
            },
            buildduration: function(t, i, n, s) {
                var o = this;
                i.children().last().find(".mejs-currenttime").length > 0 ? e(o.options.timeAndDurationSeparator + '<span class="mejs-duration">' + mejs.Utility.secondsToTimeCode(o.options.duration, o.options) + "</span>").appendTo(i.find(".mejs-time")) : (i.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container"), e('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + mejs.Utility.secondsToTimeCode(o.options.duration, o.options) + "</span></div>").appendTo(i)), o.durationD = o.controls.find(".mejs-duration"), s.addEventListener("timeupdate", function() {
                    o.controlsAreVisible && t.updateDuration()
                }, !1)
            },
            updateCurrent: function() {
                var e = this,
                    t = e.media.currentTime;
                isNaN(t) && (t = 0), e.currenttime && e.currenttime.html(mejs.Utility.secondsToTimeCode(t, e.options))
            },
            updateDuration: function() {
                var e = this,
                    t = e.media.duration;
                e.options.duration > 0 && (t = e.options.duration), isNaN(t) && (t = 0), e.container.toggleClass("mejs-long-video", t > 3600), e.durationD && t > 0 && e.durationD.html(mejs.Utility.secondsToTimeCode(t, e.options))
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            muteText: mejs.i18n.t("Mute Toggle"),
            allyVolumeControlText: mejs.i18n.t("Use Up/Down Arrow keys to increase or decrease volume."),
            hideVolumeOnTouchDevices: !0,
            audioVolume: "horizontal",
            videoVolume: "vertical"
        }), e.extend(MediaElementPlayer.prototype, {
            buildvolume: function(t, i, n, s) {
                if (!mejs.MediaFeatures.isAndroid && !mejs.MediaFeatures.isiOS || !this.options.hideVolumeOnTouchDevices) {
                    var o = this,
                        a = o.isVideo ? o.options.videoVolume : o.options.audioVolume,
                        r = "horizontal" == a ? e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + o.id + '" title="' + o.options.muteText + '" aria-label="' + o.options.muteText + '"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">' + o.options.allyVolumeControlText + '</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>').appendTo(i) : e('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + o.id + '" title="' + o.options.muteText + '" aria-label="' + o.options.muteText + '"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">' + o.options.allyVolumeControlText + '</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>').appendTo(i),
                        l = o.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
                        u = o.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
                        d = o.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
                        c = o.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
                        m = function(e, t) {
                            if (!l.is(":visible") && void 0 === t) return l.show(), m(e, !0), void l.hide();
                            e = Math.max(0, e), 0 === (e = Math.min(e, 1)) ? (r.removeClass("mejs-mute").addClass("mejs-unmute"), r.children("button").attr("title", mejs.i18n.t("Unmute")).attr("aria-label", mejs.i18n.t("Unmute"))) : (r.removeClass("mejs-unmute").addClass("mejs-mute"), r.children("button").attr("title", mejs.i18n.t("Mute")).attr("aria-label", mejs.i18n.t("Mute")));
                            var i = u.position();
                            if ("vertical" == a) {
                                var n = u.height(),
                                    s = n - n * e;
                                c.css("top", Math.round(i.top + s - c.height() / 2)), d.height(n - s), d.css("top", i.top + s)
                            } else {
                                var o = u.width() * e;
                                c.css("left", Math.round(i.left + o - c.width() / 2)), d.width(Math.round(o))
                            }
                        },
                        p = function(e) {
                            var t = null,
                                i = u.offset();
                            if ("vertical" === a) {
                                var n = u.height();
                                if (t = (n - (e.pageY - i.top)) / n, 0 === i.top || 0 === i.left) return
                            } else {
                                var o = u.width();
                                t = (e.pageX - i.left) / o
                            }
                            t = Math.max(0, t), t = Math.min(t, 1), m(t), 0 === t ? s.setMuted(!0) : s.setMuted(!1), s.setVolume(t)
                        },
                        h = !1,
                        f = !1;
                    r.hover(function() {
                        l.show(), f = !0
                    }, function() {
                        f = !1, h || "vertical" != a || l.hide()
                    });
                    var v = function(e) {
                        var t = Math.floor(100 * s.volume);
                        l.attr({
                            "aria-label": mejs.i18n.t("Volume Slider"),
                            "aria-valuemin": 0,
                            "aria-valuemax": 100,
                            "aria-valuenow": t,
                            "aria-valuetext": t + "%",
                            role: "slider",
                            tabindex: 0
                        })
                    };
                    l.bind("mouseover", function() {
                        f = !0
                    }).bind("mousedown", function(e) {
                        return p(e), o.globalBind("mousemove.vol", function(e) {
                            p(e)
                        }), o.globalBind("mouseup.vol", function() {
                            h = !1, o.globalUnbind(".vol"), f || "vertical" != a || l.hide()
                        }), h = !0, !1
                    }).bind("keydown", function(e) {
                        var t = e.keyCode,
                            i = s.volume;
                        switch (t) {
                            case 38:
                                i = Math.min(i + .1, 1);
                                break;
                            case 40:
                                i = Math.max(0, i - .1);
                                break;
                            default:
                                return !0
                        }
                        return h = !1, m(i), s.setVolume(i), !1
                    }), r.find("button").click(function() {
                        s.setMuted(!s.muted)
                    }), r.find("button").bind("focus", function() {
                        l.show()
                    }), s.addEventListener("volumechange", function(e) {
                        h || (s.muted ? (m(0), r.removeClass("mejs-mute").addClass("mejs-unmute")) : (m(s.volume), r.removeClass("mejs-unmute").addClass("mejs-mute"))), v()
                    }, !1), 0 === t.options.startVolume && s.setMuted(!0), "native" === s.pluginType && s.setVolume(t.options.startVolume), o.container.on("controlsresize", function() {
                        m(s.volume)
                    })
                }
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            usePluginFullScreen: !0,
            newWindowCallback: function() {
                return ""
            },
            fullscreenText: mejs.i18n.t("Fullscreen")
        }), e.extend(MediaElementPlayer.prototype, {
            isFullScreen: !1,
            isNativeFullScreen: !1,
            isInIframe: !1,
            fullscreenMode: "",
            buildfullscreen: function(t, i, n, s) {
                if (t.isVideo) {
                    t.isInIframe = window.location != window.parent.location, s.addEventListener("play", function() {
                        t.detectFullscreenMode()
                    });
                    var o = this,
                        a = null,
                        r = e('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + o.id + '" title="' + o.options.fullscreenText + '" aria-label="' + o.options.fullscreenText + '"></button></div>').appendTo(i).on("click", function() {
                            mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || t.isFullScreen ? t.exitFullScreen() : t.enterFullScreen()
                        }).on("mouseover", function() {
                            if ("plugin-hover" == o.fullscreenMode) {
                                null !== a && (clearTimeout(a), delete a);
                                var e = r.offset(),
                                    i = t.container.offset();
                                s.positionFullscreenButton(e.left - i.left, e.top - i.top, !0)
                            }
                        }).on("mouseout", function() {
                            "plugin-hover" == o.fullscreenMode && (null !== a && (clearTimeout(a), delete a), a = setTimeout(function() {
                                s.hideFullscreenButton()
                            }, 1500))
                        });
                    if (t.fullscreenBtn = r, o.globalBind("keydown", function(e) {
                            27 == e.keyCode && (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || o.isFullScreen) && t.exitFullScreen()
                        }), o.normalHeight = 0, o.normalWidth = 0, mejs.MediaFeatures.hasTrueNativeFullScreen) {
                        t.globalBind(mejs.MediaFeatures.fullScreenEventName, function(e) {
                            t.isFullScreen && (mejs.MediaFeatures.isFullScreen() ? (t.isNativeFullScreen = !0, t.setControlsSize()) : (t.isNativeFullScreen = !1, t.exitFullScreen()))
                        })
                    }
                }
            },
            detectFullscreenMode: function() {
                var e = this,
                    t = "",
                    i = mejs.MediaFeatures;
                return i.hasTrueNativeFullScreen && "native" === e.media.pluginType ? t = "native-native" : i.hasTrueNativeFullScreen && "native" !== e.media.pluginType && !i.hasFirefoxPluginMovingProblem ? t = "plugin-native" : e.usePluginFullScreen ? mejs.MediaFeatures.supportsPointerEvents ? (t = "plugin-click", e.createPluginClickThrough()) : t = "plugin-hover" : t = "fullwindow", e.fullscreenMode = t, t
            },
            isPluginClickThroughCreated: !1,
            createPluginClickThrough: function() {
                var t = this;
                if (!t.isPluginClickThroughCreated) {
                    var i, n, s = !1,
                        o = function() {
                            if (s) {
                                for (var e in a) a[e].hide();
                                t.fullscreenBtn.css("pointer-events", ""), t.controls.css("pointer-events", ""), t.media.removeEventListener("click", t.clickToPlayPauseCallback), s = !1
                            }
                        },
                        a = {},
                        r = ["top", "left", "right", "bottom"],
                        l = function() {
                            var e = fullscreenBtn.offset().left - t.container.offset().left,
                                n = fullscreenBtn.offset().top - t.container.offset().top,
                                s = fullscreenBtn.outerWidth(!0),
                                o = fullscreenBtn.outerHeight(!0),
                                r = t.container.width(),
                                l = t.container.height();
                            for (i in a) a[i].css({
                                position: "absolute",
                                top: 0,
                                left: 0
                            });
                            a.top.width(r).height(n), a.left.width(e).height(o).css({
                                top: n
                            }), a.right.width(r - e - s).height(o).css({
                                top: n,
                                left: e + s
                            }), a.bottom.width(r).height(l - o - n).css({
                                top: n + o
                            })
                        };
                    for (t.globalBind("resize", function() {
                            l()
                        }), i = 0, n = r.length; i < n; i++) a[r[i]] = e('<div class="mejs-fullscreen-hover" />').appendTo(t.container).mouseover(o).hide();
                    fullscreenBtn.on("mouseover", function() {
                        if (!t.isFullScreen) {
                            var e = fullscreenBtn.offset(),
                                n = player.container.offset();
                            media.positionFullscreenButton(e.left - n.left, e.top - n.top, !1), t.fullscreenBtn.css("pointer-events", "none"), t.controls.css("pointer-events", "none"), t.media.addEventListener("click", t.clickToPlayPauseCallback);
                            for (i in a) a[i].show();
                            l(), s = !0
                        }
                    }), media.addEventListener("fullscreenchange", function(e) {
                        t.isFullScreen = !t.isFullScreen, t.isFullScreen ? t.media.removeEventListener("click", t.clickToPlayPauseCallback) : t.media.addEventListener("click", t.clickToPlayPauseCallback), o()
                    }), t.globalBind("mousemove", function(e) {
                        if (s) {
                            var i = fullscreenBtn.offset();
                            (e.pageY < i.top || e.pageY > i.top + fullscreenBtn.outerHeight(!0) || e.pageX < i.left || e.pageX > i.left + fullscreenBtn.outerWidth(!0)) && (fullscreenBtn.css("pointer-events", ""), t.controls.css("pointer-events", ""), s = !1)
                        }
                    }), t.isPluginClickThroughCreated = !0
                }
            },
            cleanfullscreen: function(e) {
                e.exitFullScreen()
            },
            containerSizeTimeout: null,
            enterFullScreen: function() {
                var t = this;
                mejs.MediaFeatures.isiOS && mejs.MediaFeatures.hasiOSFullScreen && "function" == typeof t.media.webkitEnterFullscreen ? t.media.webkitEnterFullscreen() : (e(document.documentElement).addClass("mejs-fullscreen"), t.normalHeight = t.container.height(), t.normalWidth = t.container.width(), "native-native" === t.fullscreenMode || "plugin-native" === t.fullscreenMode ? (mejs.MediaFeatures.requestFullScreen(t.container[0]), t.isInIframe && setTimeout(function i() {
                    if (t.isNativeFullScreen) {
                        var n = e(window).width(),
                            s = screen.width;
                        Math.abs(s - n) > .002 * s ? t.exitFullScreen() : setTimeout(i, 500)
                    }
                }, 1e3)) : t.fullscreeMode, t.container.addClass("mejs-container-fullscreen").width("100%").height("100%"), t.containerSizeTimeout = setTimeout(function() {
                    t.container.css({
                        width: "100%",
                        height: "100%"
                    }), t.setControlsSize()
                }, 500), "native" === t.media.pluginType ? t.$media.width("100%").height("100%") : (t.container.find(".mejs-shim").width("100%").height("100%"), setTimeout(function() {
                    var i = e(window),
                        n = i.width(),
                        s = i.height();
                    t.media.setVideoSize(n, s)
                }, 500)), t.layers.children("div").width("100%").height("100%"), t.fullscreenBtn && t.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"), t.setControlsSize(), t.isFullScreen = !0, t.container.find(".mejs-captions-text").css("font-size", screen.width / t.width * 1 * 100 + "%"), t.container.find(".mejs-captions-position").css("bottom", "45px"), t.container.trigger("enteredfullscreen"))
            },
            exitFullScreen: function() {
                var t = this;
                clearTimeout(t.containerSizeTimeout), mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || t.isFullScreen) && mejs.MediaFeatures.cancelFullScreen(), e(document.documentElement).removeClass("mejs-fullscreen"), t.container.removeClass("mejs-container-fullscreen").width(t.normalWidth).height(t.normalHeight), "native" === t.media.pluginType ? t.$media.width(t.normalWidth).height(t.normalHeight) : (t.container.find(".mejs-shim").width(t.normalWidth).height(t.normalHeight), t.media.setVideoSize(t.normalWidth, t.normalHeight)), t.layers.children("div").width(t.normalWidth).height(t.normalHeight), t.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"), t.setControlsSize(), t.isFullScreen = !1, t.container.find(".mejs-captions-text").css("font-size", ""), t.container.find(".mejs-captions-position").css("bottom", ""), t.container.trigger("exitedfullscreen")
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            speeds: ["2.00", "1.50", "1.25", "1.00", "0.75"],
            defaultSpeed: "1.00",
            speedChar: "x"
        }), e.extend(MediaElementPlayer.prototype, {
            buildspeed: function(t, i, n, s) {
                var o = this;
                if ("native" == o.media.pluginType) {
                    for (var a = null, r = null, l = null, u = null, d = [], c = !1, m = 0, p = o.options.speeds.length; m < p; m++) {
                        var h = o.options.speeds[m];
                        "string" == typeof h ? (d.push({
                            name: h + o.options.speedChar,
                            value: h
                        }), h === o.options.defaultSpeed && (c = !0)) : (d.push(h), h.value === o.options.defaultSpeed && (c = !0))
                    }
                    c || d.push({
                        name: o.options.defaultSpeed + o.options.speedChar,
                        value: o.options.defaultSpeed
                    }), d.sort(function(e, t) {
                        return parseFloat(t.value) - parseFloat(e.value)
                    });
                    var f = function(e) {
                            for (m = 0, p = d.length; m < p; m++)
                                if (d[m].value === e) return d[m].name
                        },
                        v = '<div class="mejs-button mejs-speed-button"><button type="button">' + f(o.options.defaultSpeed) + '</button><div class="mejs-speed-selector"><ul>';
                    for (m = 0, il = d.length; m < il; m++) u = o.id + "-speed-" + d[m].value, v += '<li><input type="radio" name="speed" value="' + d[m].value + '" id="' + u + '" ' + (d[m].value === o.options.defaultSpeed ? " checked" : "") + ' /><label for="' + u + '" ' + (d[m].value === o.options.defaultSpeed ? ' class="mejs-speed-selected"' : "") + ">" + d[m].name + "</label></li>";
                    a = e(v += "</ul></div></div>").appendTo(i), r = a.find(".mejs-speed-selector"), l = o.options.defaultSpeed, s.addEventListener("loadedmetadata", function(e) {
                        l && (s.playbackRate = parseFloat(l))
                    }, !0), r.on("click", 'input[type="radio"]', function() {
                        var t = e(this).attr("value");
                        l = t, s.playbackRate = parseFloat(t), a.find("button").html(f(t)), a.find(".mejs-speed-selected").removeClass("mejs-speed-selected"), a.find('input[type="radio"]:checked').next().addClass("mejs-speed-selected")
                    }), a.one("mouseenter focusin", function() {
                        r.height(a.find(".mejs-speed-selector ul").outerHeight(!0) + a.find(".mejs-speed-translations").outerHeight(!0)).css("top", -1 * r.height() + "px")
                    })
                }
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            startLanguage: "",
            tracksText: mejs.i18n.t("Captions/Subtitles"),
            tracksAriaLive: !1,
            hideCaptionsButtonWhenEmpty: !0,
            toggleCaptionsButtonWhenOnlyOne: !1,
            slidesSelector: ""
        }), e.extend(MediaElementPlayer.prototype, {
            hasChapters: !1,
            cleartracks: function(e, t, i, n) {
                e && (e.captions && e.captions.remove(), e.chapters && e.chapters.remove(), e.captionsText && e.captionsText.remove(), e.captionsButton && e.captionsButton.remove())
            },
            buildtracks: function(t, i, n, s) {
                if (0 !== t.tracks.length) {
                    var o, a = this,
                        r = a.options.tracksAriaLive ? 'role="log" aria-live="assertive" aria-atomic="false"' : "";
                    if (a.domNode.textTracks)
                        for (o = a.domNode.textTracks.length - 1; o >= 0; o--) a.domNode.textTracks[o].mode = "hidden";
                    a.cleartracks(t, i, n, s), t.chapters = e('<div class="mejs-chapters mejs-layer"></div>').prependTo(n).hide(), t.captions = e('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" ' + r + '><span class="mejs-captions-text"></span></div></div>').prependTo(n).hide(), t.captionsText = t.captions.find(".mejs-captions-text"), t.captionsButton = e('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + a.id + '" title="' + a.options.tracksText + '" aria-label="' + a.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_none" value="none" checked="checked" /><label for="' + t.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(i);
                    var l = 0;
                    for (o = 0; o < t.tracks.length; o++) "subtitles" == t.tracks[o].kind && l++;
                    for (a.options.toggleCaptionsButtonWhenOnlyOne && 1 == l ? t.captionsButton.on("click", function() {
                            null === t.selectedTrack ? lang = t.tracks[0].srclang : lang = "none", t.setTrack(lang)
                        }) : (t.captionsButton.on("mouseenter focusin", function() {
                            e(this).find(".mejs-captions-selector").removeClass("mejs-offscreen")
                        }).on("click", "input[type=radio]", function() {
                            lang = this.value, t.setTrack(lang)
                        }), t.captionsButton.on("mouseleave focusout", function() {
                            e(this).find(".mejs-captions-selector").addClass("mejs-offscreen")
                        })), t.options.alwaysShowControls ? t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") : t.container.bind("controlsshown", function() {
                            t.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover")
                        }).bind("controlshidden", function() {
                            s.paused || t.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover")
                        }), t.trackToLoad = -1, t.selectedTrack = null, t.isLoadingTrack = !1, o = 0; o < t.tracks.length; o++) "subtitles" == t.tracks[o].kind && t.addTrackButton(t.tracks[o].srclang, t.tracks[o].label);
                    t.loadNextTrack(), s.addEventListener("timeupdate", function(e) {
                        t.displayCaptions()
                    }, !1), "" !== t.options.slidesSelector && (t.slidesContainer = e(t.options.slidesSelector), s.addEventListener("timeupdate", function(e) {
                        t.displaySlides()
                    }, !1)), s.addEventListener("loadedmetadata", function(e) {
                        t.displayChapters()
                    }, !1), t.container.hover(function() {
                        t.hasChapters && (t.chapters.removeClass("mejs-offscreen"), t.chapters.fadeIn(200).height(t.chapters.find(".mejs-chapter").outerHeight()))
                    }, function() {
                        t.hasChapters && !s.paused && t.chapters.fadeOut(200, function() {
                            e(this).addClass("mejs-offscreen"), e(this).css("display", "block")
                        })
                    }), a.container.on("controlsresize", function() {
                        a.adjustLanguageBox()
                    }), null !== t.node.getAttribute("autoplay") && t.chapters.addClass("mejs-offscreen")
                }
            },
            setTrack: function(e) {
                var t, i = this;
                if ("none" == e) i.selectedTrack = null, i.captionsButton.removeClass("mejs-captions-enabled");
                else
                    for (t = 0; t < i.tracks.length; t++)
                        if (i.tracks[t].srclang == e) {
                            null === i.selectedTrack && i.captionsButton.addClass("mejs-captions-enabled"), i.selectedTrack = i.tracks[t], i.captions.attr("lang", i.selectedTrack.srclang), i.displayCaptions();
                            break
                        }
            },
            loadNextTrack: function() {
                var e = this;
                e.trackToLoad++, e.trackToLoad < e.tracks.length ? (e.isLoadingTrack = !0, e.loadTrack(e.trackToLoad)) : (e.isLoadingTrack = !1, e.checkForTracks())
            },
            loadTrack: function(t) {
                var i = this,
                    n = i.tracks[t],
                    s = function() {
                        n.isLoaded = !0, i.enableTrackButton(n.srclang, n.label), i.loadNextTrack()
                    };
                e.ajax({
                    url: n.src,
                    dataType: "text",
                    success: function(e) {
                        "string" == typeof e && /<tt\s+xml/gi.exec(e) ? n.entries = mejs.TrackFormatParser.dfxp.parse(e) : n.entries = mejs.TrackFormatParser.webvtt.parse(e), s(), "chapters" == n.kind && i.media.addEventListener("play", function(e) {
                            i.media.duration > 0 && i.displayChapters(n)
                        }, !1), "slides" == n.kind && i.setupSlides(n)
                    },
                    error: function() {
                        i.removeTrackButton(n.srclang), i.loadNextTrack()
                    }
                })
            },
            enableTrackButton: function(t, i) {
                var n = this;
                "" === i && (i = mejs.language.codes[t] || t), n.captionsButton.find("input[value=" + t + "]").prop("disabled", !1).siblings("label").html(i), n.options.startLanguage == t && e("#" + n.id + "_captions_" + t).prop("checked", !0).trigger("click"), n.adjustLanguageBox()
            },
            removeTrackButton: function(e) {
                var t = this;
                t.captionsButton.find("input[value=" + e + "]").closest("li").remove(), t.adjustLanguageBox()
            },
            addTrackButton: function(t, i) {
                var n = this;
                "" === i && (i = mejs.language.codes[t] || t), n.captionsButton.find("ul").append(e('<li><input type="radio" name="' + n.id + '_captions" id="' + n.id + "_captions_" + t + '" value="' + t + '" disabled="disabled" /><label for="' + n.id + "_captions_" + t + '">' + i + " (loading)</label></li>")), n.adjustLanguageBox(), n.container.find(".mejs-captions-translations option[value=" + t + "]").remove()
            },
            adjustLanguageBox: function() {
                var e = this;
                e.captionsButton.find(".mejs-captions-selector").height(e.captionsButton.find(".mejs-captions-selector ul").outerHeight(!0) + e.captionsButton.find(".mejs-captions-translations").outerHeight(!0))
            },
            checkForTracks: function() {
                var e = this,
                    t = !1;
                if (e.options.hideCaptionsButtonWhenEmpty) {
                    for (i = 0; i < e.tracks.length; i++)
                        if ("subtitles" == e.tracks[i].kind && e.tracks[i].isLoaded) {
                            t = !0;
                            break
                        }
                    t || (e.captionsButton.hide(), e.setControlsSize())
                }
            },
            displayCaptions: function() {
                if (void 0 !== this.tracks) {
                    var e, t = this,
                        i = t.selectedTrack;
                    if (null !== i && i.isLoaded) {
                        for (e = 0; e < i.entries.times.length; e++)
                            if (t.media.currentTime >= i.entries.times[e].start && t.media.currentTime <= i.entries.times[e].stop) return t.captionsText.html(i.entries.text[e]).attr("class", "mejs-captions-text " + (i.entries.times[e].identifier || "")), void t.captions.show().height(0);
                        t.captions.hide()
                    } else t.captions.hide()
                }
            },
            setupSlides: function(e) {
                var t = this;
                t.slides = e, t.slides.entries.imgs = [t.slides.entries.text.length], t.showSlide(0)
            },
            showSlide: function(t) {
                if (void 0 !== this.tracks && void 0 !== this.slidesContainer) {
                    var i = this,
                        n = i.slides.entries.text[t],
                        s = i.slides.entries.imgs[t];
                    void 0 === s || void 0 === s.fadeIn ? i.slides.entries.imgs[t] = s = e('<img src="' + n + '">').on("load", function() {
                        s.appendTo(i.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut()
                    }) : s.is(":visible") || s.is(":animated") || s.fadeIn().siblings(":visible").fadeOut()
                }
            },
            displaySlides: function() {
                if (void 0 !== this.slides) {
                    var e, t = this,
                        i = t.slides;
                    for (e = 0; e < i.entries.times.length; e++)
                        if (t.media.currentTime >= i.entries.times[e].start && t.media.currentTime <= i.entries.times[e].stop) return void t.showSlide(e)
                }
            },
            displayChapters: function() {
                var e, t = this;
                for (e = 0; e < t.tracks.length; e++)
                    if ("chapters" == t.tracks[e].kind && t.tracks[e].isLoaded) {
                        t.drawChapters(t.tracks[e]), t.hasChapters = !0;
                        break
                    }
            },
            drawChapters: function(t) {
                var i, n, s = this,
                    o = 0,
                    a = 0;
                for (s.chapters.empty(), i = 0; i < t.entries.times.length; i++) n = t.entries.times[i].stop - t.entries.times[i].start, ((o = Math.floor(n / s.media.duration * 100)) + a > 100 || i == t.entries.times.length - 1 && o + a < 100) && (o = 100 - a), s.chapters.append(e('<div class="mejs-chapter" rel="' + t.entries.times[i].start + '" style="left: ' + a.toString() + "%;width: " + o.toString() + '%;"><div class="mejs-chapter-block' + (i == t.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + t.entries.text[i] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(t.entries.times[i].start, s.options) + "&ndash;" + mejs.Utility.secondsToTimeCode(t.entries.times[i].stop, s.options) + "</span></div></div>")), a += o;
                s.chapters.find("div.mejs-chapter").click(function() {
                    s.media.setCurrentTime(parseFloat(e(this).attr("rel"))), s.media.paused && s.media.play()
                }), s.chapters.show()
            }
        }), mejs.language = {
            codes: {
                af: "Afrikaans",
                sq: "Albanian",
                ar: "Arabic",
                be: "Belarusian",
                bg: "Bulgarian",
                ca: "Catalan",
                zh: "Chinese",
                "zh-cn": "Chinese Simplified",
                "zh-tw": "Chinese Traditional",
                hr: "Croatian",
                cs: "Czech",
                da: "Danish",
                nl: "Dutch",
                en: "English",
                et: "Estonian",
                fl: "Filipino",
                fi: "Finnish",
                fr: "French",
                gl: "Galician",
                de: "German",
                el: "Greek",
                ht: "Haitian Creole",
                iw: "Hebrew",
                hi: "Hindi",
                hu: "Hungarian",
                is: "Icelandic",
                id: "Indonesian",
                ga: "Irish",
                it: "Italian",
                ja: "Japanese",
                ko: "Korean",
                lv: "Latvian",
                lt: "Lithuanian",
                mk: "Macedonian",
                ms: "Malay",
                mt: "Maltese",
                no: "Norwegian",
                fa: "Persian",
                pl: "Polish",
                pt: "Portuguese",
                ro: "Romanian",
                ru: "Russian",
                sr: "Serbian",
                sk: "Slovak",
                sl: "Slovenian",
                es: "Spanish",
                sw: "Swahili",
                sv: "Swedish",
                tl: "Tagalog",
                th: "Thai",
                tr: "Turkish",
                uk: "Ukrainian",
                vi: "Vietnamese",
                cy: "Welsh",
                yi: "Yiddish"
            }
        }, mejs.TrackFormatParser = {
            webvtt: {
                pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
                parse: function(t) {
                    for (var i, n, s, o = 0, a = mejs.TrackFormatParser.split2(t, /\r?\n/), r = {
                            text: [],
                            times: []
                        }; o < a.length; o++) {
                        if ((i = this.pattern_timecode.exec(a[o])) && o < a.length) {
                            for (o - 1 >= 0 && "" !== a[o - 1] && (s = a[o - 1]), n = a[++o], o++;
                                "" !== a[o] && o < a.length;) n = n + "\n" + a[o], o++;
                            n = e.trim(n).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), r.text.push(n), r.times.push({
                                identifier: s,
                                start: 0 === mejs.Utility.convertSMPTEtoSeconds(i[1]) ? .2 : mejs.Utility.convertSMPTEtoSeconds(i[1]),
                                stop: mejs.Utility.convertSMPTEtoSeconds(i[3]),
                                settings: i[5]
                            })
                        }
                        s = ""
                    }
                    return r
                }
            },
            dfxp: {
                parse: function(t) {
                    var i, n, s = 0,
                        o = (t = e(t).filter("tt")).children("div").eq(0),
                        a = o.find("p"),
                        r = t.find("#" + o.attr("style")),
                        l = {
                            text: [],
                            times: []
                        };
                    if (r.length) {
                        var u = r.removeAttr("id").get(0).attributes;
                        if (u.length)
                            for (i = {}, s = 0; s < u.length; s++) i[u[s].name.split(":")[1]] = u[s].value
                    }
                    for (s = 0; s < a.length; s++) {
                        var d, c = {
                            start: null,
                            stop: null,
                            style: null
                        };
                        if (a.eq(s).attr("begin") && (c.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(s).attr("begin"))), !c.start && a.eq(s - 1).attr("end") && (c.start = mejs.Utility.convertSMPTEtoSeconds(a.eq(s - 1).attr("end"))), a.eq(s).attr("end") && (c.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(s).attr("end"))), !c.stop && a.eq(s + 1).attr("begin") && (c.stop = mejs.Utility.convertSMPTEtoSeconds(a.eq(s + 1).attr("begin"))), i) {
                            d = "";
                            for (var m in i) d += m + ":" + i[m] + ";"
                        }
                        d && (c.style = d), 0 === c.start && (c.start = .2), l.times.push(c), n = e.trim(a.eq(s).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, "<a href='$1' target='_blank'>$1</a>"), l.text.push(n), 0 === l.times.start && (l.times.start = 2)
                    }
                    return l
                }
            },
            split2: function(e, t) {
                return e.split(t)
            }
        }, 3 != "x\n\ny".split(/\n/gi).length && (mejs.TrackFormatParser.split2 = function(e, t) {
            var i, n = [],
                s = "";
            for (i = 0; i < e.length; i++) s += e.substring(i, i + 1), t.test(s) && (n.push(s.replace(t, "")), s = "");
            return n.push(s), n
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            contextMenuItems: [{
                render: function(e) {
                    return void 0 === e.enterFullScreen ? null : e.isFullScreen ? mejs.i18n.t("Turn off Fullscreen") : mejs.i18n.t("Go Fullscreen")
                },
                click: function(e) {
                    e.isFullScreen ? e.exitFullScreen() : e.enterFullScreen()
                }
            }, {
                render: function(e) {
                    return e.media.muted ? mejs.i18n.t("Unmute") : mejs.i18n.t("Mute")
                },
                click: function(e) {
                    e.media.muted ? e.setMuted(!1) : e.setMuted(!0)
                }
            }, {
                isSeparator: !0
            }, {
                render: function(e) {
                    return mejs.i18n.t("Download Video")
                },
                click: function(e) {
                    window.location.href = e.media.currentSrc
                }
            }]
        }), e.extend(MediaElementPlayer.prototype, {
            buildcontextmenu: function(t, i, n, s) {
                t.contextMenu = e('<div class="mejs-contextmenu"></div>').appendTo(e("body")).hide(), t.container.bind("contextmenu", function(e) {
                    if (t.isContextMenuEnabled) return e.preventDefault(), t.renderContextMenu(e.clientX - 1, e.clientY - 1), !1
                }), t.container.bind("click", function() {
                    t.contextMenu.hide()
                }), t.contextMenu.bind("mouseleave", function() {
                    t.startContextMenuTimer()
                })
            },
            cleancontextmenu: function(e) {
                e.contextMenu.remove()
            },
            isContextMenuEnabled: !0,
            enableContextMenu: function() {
                this.isContextMenuEnabled = !0
            },
            disableContextMenu: function() {
                this.isContextMenuEnabled = !1
            },
            contextMenuTimeout: null,
            startContextMenuTimer: function() {
                var e = this;
                e.killContextMenuTimer(), e.contextMenuTimer = setTimeout(function() {
                    e.hideContextMenu(), e.killContextMenuTimer()
                }, 750)
            },
            killContextMenuTimer: function() {
                var e = this.contextMenuTimer;
                null != e && (clearTimeout(e), delete e, e = null)
            },
            hideContextMenu: function() {
                this.contextMenu.hide()
            },
            renderContextMenu: function(t, i) {
                for (var n = this, s = "", o = n.options.contextMenuItems, a = 0, r = o.length; a < r; a++)
                    if (o[a].isSeparator) s += '<div class="mejs-contextmenu-separator"></div>';
                    else {
                        var l = o[a].render(n);
                        null != l && (s += '<div class="mejs-contextmenu-item" data-itemindex="' + a + '" id="element-' + 1e6 * Math.random() + '">' + l + "</div>")
                    }
                n.contextMenu.empty().append(e(s)).css({
                    top: i,
                    left: t
                }).show(), n.contextMenu.find(".mejs-contextmenu-item").each(function() {
                    var t = e(this),
                        i = parseInt(t.data("itemindex"), 10),
                        s = n.options.contextMenuItems[i];
                    void 0 !== s.show && s.show(t, n), t.click(function() {
                        void 0 !== s.click && s.click(n), n.contextMenu.hide()
                    })
                }), setTimeout(function() {
                    n.killControlsTimer("rev3")
                }, 100)
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            skipBackInterval: 30,
            skipBackText: mejs.i18n.t("Skip back %1 seconds")
        }), e.extend(MediaElementPlayer.prototype, {
            buildskipback: function(t, i, n, s) {
                var o = this,
                    a = o.options.skipBackText.replace("%1", o.options.skipBackInterval);
                e('<div class="mejs-button mejs-skip-back-button"><button type="button" aria-controls="' + o.id + '" title="' + a + '" aria-label="' + a + '">' + o.options.skipBackInterval + "</button></div>").appendTo(i).click(function() {
                    s.setCurrentTime(Math.max(s.currentTime - o.options.skipBackInterval, 0)), e(this).find("button").blur()
                })
            }
        })
    }(mejs.$),
    function(e) {
        e.extend(mejs.MepDefaults, {
            postrollCloseText: mejs.i18n.t("Close")
        }), e.extend(MediaElementPlayer.prototype, {
            buildpostroll: function(t, i, n, s) {
                var o = this,
                    a = o.container.find('link[rel="postroll"]').attr("href");
                void 0 !== a && (t.postroll = e('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + o.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(n).hide(), o.media.addEventListener("ended", function(i) {
                    e.ajax({
                        dataType: "html",
                        url: a,
                        success: function(e, t) {
                            n.find(".mejs-postroll-layer-content").html(e)
                        }
                    }), t.postroll.show()
                }, !1))
            }
        })
    }(mejs.$);
    