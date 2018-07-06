(function (legend) {
    function require(e) {
        return modules[e]
    }

    function define() {
        var e = arguments[0],
            r = arguments[arguments.length - 1];
        if ("function" != typeof r) return void(modules[e] = r);
        var o = {
            exports: {}
        };
        o.exports = r(require, o.exports, o) || o.exports, modules[e] = o.exports
    }
    var modules = {};
    define.amd = define.cmd = !0;
    define("362115b8e6793630355a9fcf90549cea", function (e, n, t) {
        $.legendEvent = {}, t.exports = {
            setCookie: function (e, n, t) {
                t = t || {};
                var i = e + "=" + n;
                if (t.domain && (i += "; domain=" + t.domain), t.path && (i += "; path=" + t.path), t.expired) {
                    var r = new Date;
                    r.setTime(r.getTime() + t.expired), i += "; expires=" + r.toGMTString()
                }
                t.secure && (i += "; secure"), document.cookie = i
            },
            getCookie: function (e) {
                return (e = new RegExp("(^| )" + e + "=([^;]*)(;|$)").exec(document.cookie)) ? e[2] : null
            },
            guid: function () {
                for (var e = "", n = 0; n < 4; n++) e += function () {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }();
                return e
            },
            parseQueryString: function (e) {
                for (var n = {}, t = new RegExp("([\\?|&])(.+?)=([^&?]*)", "ig"), i = t.exec(e); i;) n[i[2]] = i[3], i = t.exec(e);
                return n
            },
            parseHash: function (e) {
                e = e.replace(/^.*?#/, "");
                var n = {};
                return e.split("&").forEach(function (e) {
                    if (e.length > 0 && e.indexOf("=") > -1) {
                        var t = e.split("=");
                        /\d+/.test(t[1]) && (t[1] = parseInt(t[1], 10)), n[t[0]] = t[1]
                    }
                }), n
            },
            extend: function (e, n) {
                for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t])
            },
            makeUrl: function (e, n) {
                return e + "?" + Object.keys(n).map(function (e) {
                    return e + "=" + n[e]
                }).join("&")
            },
            getUid: function () {
                var e = this.getCookie("st_uid") || this.getCookie("BAIDUID");
                return null === e && (e = this.guid(), this.setCookie("st_uid", e, {
                    domain: window.location.hostname,
                    path: "/",
                    expired: 63072e6
                })), e
            },
            trigger: $($.legendEvent).trigger.bind($($.legendEvent)),
            on: $($.legendEvent).on.bind($($.legendEvent))
        }
    });
    define("0a4a2d1f3827aacaab37cafbf37d4632", function (e, n, o) {
        function i(e, n) {
            if ("object" == typeof e)
                for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
            else t[e] = n
        }
        var t = {};
        i({
            version: "1.0.0",
            enterTime: +new Date,
            id: legend.id
        }), ["business", "layoutMode", "checkDomain", "publishDomain"].forEach(function (e) {
            legend.hasOwnProperty(e) && (i(e, legend[e]), delete legend[e])
        }), o.exports = t
    });
    define("45fa7b43c6eff8a5526f44fc033f62d7", function (t, e, r) {
        "use strict";
        return r.exports = function () {
            return function (t, e, r, i) {
                if (!t) return {};
                i = i || 1, r = (r || 325) / i;
                var n = {
                    left: t.x * i + "px",
                    width: t.width * i + "px",
                    height: t.height * i + "px"
                };
                switch (t.coordinate) {
                    case "bottom":
                        n.bottom = -t.height * i - t.y * i + "px";
                        break;
                    case "central":
                        n.top = (t.y + r) * i + "px";
                        break;
                    default:
                        n.top = t.y * i + "px"
                }
                return n
            }
        }()
    });
    define("e0adcf525b211ecf4bf3aeacbd2f40ee", function (e, a, i) {
        var t = e("0a4a2d1f3827aacaab37cafbf37d4632"),
            o = navigator.userAgent,
            n = document.body.clientWidth || 400,
            r = {
                app: "browser",
                terminal: "phone",
                present: "mobile",
                ratio: n / 400
            },
            d = e("362115b8e6793630355a9fcf90549cea"),
            p = d.parseQueryString(window.location.search);
        r.mode = "expand" === p.mode ? "expand" : t.layoutMode, r.list = "single" === p.list ? "single" : "all", r.phone = 1 === Number(p.phone) ? 1 : 0, r.anim = 0 === Number(p.anim) ? 0 : 1, r.load = 0 === Number(p.load) ? 0 : 1, /micromessenger/i.test(o) ? r.app = "weixin" : /lite baiduboxapp/i.test(o) ? r.app = "baiduLite" : /baiduboxapp/i.test(o) ? r.app = "baidu" : /tieba/i.test(o) && (r.app = "tieba"), /windows|macintosh/gi.test(o) && (r.terminal = "pc", r.present = "pc", r.phone || (r.ratio = 1)), "expand" === r.mode && (r.ratio = 1), ("object" == typeof _global_ || document.querySelector(".sfa-view") && document.querySelector(".sfa-body")) && (r.present = "superframe");
        var s = $(".lg-container");
        s.addClass(r.mode).addClass(r.terminal), 0 === r.anim && s.addClass("no-anim"), i.exports = r
    });
    define("31912afebdf99d5ae8f8b75ceec29c81", function (r, e, o) {
        "use strict";
        return o.exports = function () {
            return function (r, e, o) {
                if (!r) return {};
                o = o || 1;
                var d = {
                        width: (r.width || 1) * o + "px",
                        height: (r.height || 1) * o + "px"
                    },
                    t = "",
                    a = 0,
                    i = 0;
                return r.border && "none" !== r.border && (a = i = -r.borderSize * o, d.borderWidth = r.borderSize * o + "px"), "dx" in r && (a += r.dx * o, i += r.dy * o), (a || i) && (t += " translate3d(" + a + "px, " + i + "px, 0)"), r.rotate && (t += "rotate(" + r.rotate + "deg)"), d.webkitTransform = d.transform = t, "simple" === e ? d : (r.opacity < 1 && (d.opacity = r.opacity), r.background && (d.background = r.background), "ellipse" === r.shape ? d.borderRadius = "50%" : "rect" === r.shape && r.borderRadius && (d.borderRadius = r.borderRadius + "px"), "none" !== r.border && (d.borderStyle = r.border, d.borderWidth = r.borderSize * o + "px", d.borderColor = r.borderColor), "true" === r.shadow && (d.boxShadow = [r.shadowOffsetX + "px", r.shadowOffsetY + "px", r.shadowBlur + "px", r.shadowSpread + "px", r.shadowColor].join(" ")), d)
            }
        }()
    });
    define("9faa448afa58be2b1e37bf2d2bf6edcd", function (e, a) {
        function t(e) {
            for (var a in o) void 0 === e[a] && (e[a] = o[a])
        }

        function r(e, a, o, s) {
            var c = this,
                l = this.classes[a.type];
            if (l) {
                var d = a.surface || {};
                t(d);
                var f = document.createElement("div");
                f.className = "lg-trailer";
                var u = document.createElement("div");
                u.className = "lg-surface lg-surface-" + a.type, f.appendChild(u), e.appendChild(f);
                var b = i(d, "none", o.ratio);
                for (var p in b) u.style[p] = b[p];
                var v = n(d, "none", 0, o.ratio);
                for (var p in v) f.style[p] = v[p];
                "gravity" in d && 0 !== d.gravity && (u.classList.add("layer"), u.setAttribute("data-depth", d.gravity)), a.hidden && (f.style.display = "none", f.setAttribute("hidden", 1));
                var h = {
                    data: a,
                    base: o,
                    trailerElement: f,
                    surfaceElement: u,
                    show: function () {
                        h.trailerElement.style.display = "block"
                    },
                    hide: function () {
                        h.trailerElement.style.display = "none"
                    }
                };
                h.instance = l.create(u, a.attributes, d.width * o.ratio, d.height * o.ratio, o);
                var y = h.instance.interfaces;
                if (y && y.forEach(function (e) {
                        h[e.id] = e.act
                    }), s && s(h), "panel" === a.type && a.attributes) {
                    var m = u.querySelector(".lg-component-panel"),
                        g = [];
                    (a.attributes.components || []).forEach(function (e) {
                        r.call(c, m, e, o, s)
                    }), h.components = g
                }
                return h
            }
        }
        var i = e("31912afebdf99d5ae8f8b75ceec29c81"),
            n = e("45fa7b43c6eff8a5526f44fc033f62d7"),
            o = (e("e0adcf525b211ecf4bf3aeacbd2f40ee"), {
                coordinate: "top",
                rotate: 0,
                opacity: 1,
                gravity: 0,
                locked: !1,
                visibility: "visible",
                shape: "rect",
                background: "",
                borderRadius: 0,
                border: "none",
                borderSize: 1,
                borderColor: "black",
                fill: "transparent",
                shadow: "false",
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowBlur: 0,
                shadowSpread: 0,
                shadowColor: "black"
            });
        a.createComponent = r
    });
    define("47ef722850d957a71ae2fd87d5a60949", function (e, n, t) {
        var a = e("45fa7b43c6eff8a5526f44fc033f62d7"),
            i = e("e0adcf525b211ecf4bf3aeacbd2f40ee");
        t.exports = {
            classes: {},
            instances: [],
            init: function () {
                var e = document.querySelector(".lg-container");
                this.centralize(e.clientHeight);
                var n = this;
                this.resizer = function () {
                    n.centralize(e.clientHeight)
                }, window.addEventListener("resize", this.resizer, !1)
            },
            createSingleInstance: e("9faa448afa58be2b1e37bf2d2bf6edcd").createComponent,
            getComponentsByName: function (e) {
                var n = [];
                return this.instances.forEach(function (t) {
                    (t.data.name === e || e instanceof RegExp && e.test(t.data.name) || e instanceof Array && e.indexOf(t.data.name) >= 0) && n.push(t)
                }), n
            },
            add: function (e) {
                this.instances.push(e)
            },
            centralize: function (e) {
                this.instances.forEach(function (n) {
                    if ("central" === n.data.surface.coordinate) {
                        var t = a(n.data.surface, "none", e / 2, i.ratio);
                        for (var c in t) t.hasOwnProperty(c) && (n.trailerElement.style[c] = t[c])
                    }
                })
            }
        }
    });
    define("a9d713b04d67f52c6920505722cf53bf", function (n, t, i) {
        var e;
        i.exports = {
            init: function (n) {
                e = n
            },
            get: function () {
                return e || {}
            }
        }
    });
    define("e7d7b58f3f1a05b6b6ef42dd56d4bf8c", function (e, t, o) {
        function a(e, t) {
            if (e && (t = t || "info", /^(success|info|error|warning)$/.test(t))) {
                i || (i = $('<div class="lg-toast-container lg-toast-top-center"></div>').appendTo("pc" === n.terminal ? ".lg-container" : "body"));
                var o = $('<div class="lg-toast lg-toast-' + t + '" style="display: block;"><div class="lg-toast-' + t + '">' + e + "</div></div>").appendTo(i);
                setTimeout(function () {
                    o.remove()
                }, 3e3)
            }
        }
        var i, n = e("e0adcf525b211ecf4bf3aeacbd2f40ee");
        o.exports = a
    });
    define("501e6dfedf4274bd61ad75e9ef65d5fc", function (n, a, i) {
        function t(n) {
            if (e(n)) {
                n.animationIndex = n.animationIndex || 0;
                var a = n.data.animations[n.animationIndex],
                    i = n.trailerElement;
                if (a && i && "none" !== a.name) {
                    i.style["-webkit-animation-duration"] = i.style["animation-duration"] = (a.duration || 1) + "s", i.style["-webkit-animation-delay"] = i.style["animation-delay"] = (a.delay || 0) + .1 + "s", i.style["-webkit-animation-iteration-count"] = i.style["animation-iteration-count"] = a.repeat || 1, i.style["-webkit-animation-direction"] = i.style["animation-direction"] = a.direction || "normal", i.className = "lg-trailer";
                    var o = n.data.animations.map(function (n) {
                            return n.name
                        }),
                        m = i.classList;
                    m.remove.apply(m, o), m.add(a.name, "animated"), $(i).one("webkitAnimationEnd animationend", function () {
                        n.animationIndex + 1 < n.data.animations.length && (n.animationIndex++, t(n))
                    })
                }
            }
        }

        function e(n) {
            return n.data.animations instanceof Array
        }
        i.exports = {
            render: t,
            hasAnimation: e
        }
    });
    define("8f8621aa3777ae10e8c449191c202257", function (o, n, i) {
        function e() {
            l(1, 1)
        }

        function r() {
            l(0, 1)
        }

        function l(o, n) {
            if (window.Box && window.Box.os) {
                var i = {
                    fullscreen: o,
                    disablerefresh: n
                };
                window.Box.os.android ? window.Box.android.invokeApp("Bdbox_android_searchFrame", "config", [JSON.stringify(i)]) : window.Box.os.ios && window.Box.ios.invokeApp("searchFrame", {
                    action: "config",
                    params: JSON.stringify(i),
                    minver: "7.5.0.0"
                }, "")
            }
        }

        function d(o) {
            if (window.Box) {
                var n = {
                    title: o.title,
                    content: o.desc,
                    iconUrl: o.imgUrl,
                    linkUrl: o.link,
                    mediaType: "all"
                };
                window.Box.os.android ? window.Box.android.invokeApp("Bdbox_android_utils", "callShare", [JSON.stringify(n), "console.log", "console.log"]) : window.Box.os.ios && window.Box.ios.invokeApp("callShare", {
                    options: encodeURIComponent(JSON.stringify(n)),
                    errorcallback: "console.log",
                    successcallback: "console.log"
                })
            }
        }
        i.exports = {
            invokeShare: d,
            enterFullScreen: e,
            exitFullScreen: r
        }
    });
    define("d3e895087f05583a0ba9d10b2544b99c", function (o, i, n) {
        function e() {
            if (window.Box && window.Box.os) {
                var o = {
                    fullscreen: 0,
                    disablerefresh: 1
                };
                window.Box.os.android ? window.Box.android.invokeLiteApp("Bdbox_android_searchFrame", "config", [JSON.stringify(o)]) : window.Box.os.ios && window.Box.ios.invokeLiteApp("searchFrame", {
                    action: "config",
                    params: JSON.stringify(o),
                    minver: "7.5.0.0"
                }, "")
            }
        }

        function r(o) {
            if (window.Box) {
                var i = {
                    title: o.title,
                    content: o.desc,
                    iconUrl: o.imgUrl,
                    linkUrl: o.link,
                    mediaType: "all"
                };
                window.Box.os.android ? window.Box.android.invokeLiteApp("Bdbox_android_utils", "callShare", [JSON.stringify(i), "console.log", "console.log"]) : window.Box.os.ios && window.Box.ios.invokeLiteApp("callShare", {
                    options: encodeURIComponent(JSON.stringify(i)),
                    errorcallback: "console.log",
                    successcallback: "console.log"
                })
            }
        }
        n.exports = {
            invokeShare: r,
            exitFullScreen: e
        }
    });
    define("7beeb16a1ae3f98453f5107fe23925ff", function (e, n, t) {
        function a(e) {
            var n = "ontouchstart" in document ? "tap" : "click",
                t = $("#default-share");
            t && 0 !== t.length || (t = $('<div id="default-share"><div>').css({
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5) url(//fex.bdstatic.com/h5static/h5jscss/e988ceb436c96d014e3caee558938493_aaa.png) no-repeat 90% 3%",
                "background-size": "80px",
                left: 0,
                top: 0,
                display: "none",
                "z-index": 10
            }).appendTo($(".lg-container")).on(n, function () {
                t.hide()
            })), t.show()
        }
        t.exports = {
            invokeShare: a
        }
    });
    define("d5b665e6a780bb5874a087bea49d5b18", function (e, i, a) {
        function r(i) {
            var a = !1,
                r = navigator.userAgent,
                t = r.indexOf("tieba") + 6;
            if (r.substr(t) >= "7.2.0" && (a = !0), a) {
                if (window.TiebaJsBridge && "complete" === window.TiebaJsBridge.readyState) {
                    var n = {
                        title: i.title,
                        desc: i.desc,
                        img: i.imgUrl,
                        url: i.link
                    };
                    window.tb.TBHY_COMMON_Share.share(n)
                }
            } else e("7beeb16a1ae3f98453f5107fe23925ff").invokeShare(i)
        }
        a.exports = {
            invokeShare: r
        }
    });
    define("7b741e66552c90cc551fb7d40aeedc92", function (e, a, b) {
        function f(a) {
            switch (a) {
                case "baidu":
                    return e("8f8621aa3777ae10e8c449191c202257");
                case "baiduLite":
                    return e("d3e895087f05583a0ba9d10b2544b99c");
                case "tieba":
                    return e("d5b665e6a780bb5874a087bea49d5b18");
                default:
                    return e("7beeb16a1ae3f98453f5107fe23925ff")
            }
        }
        b.exports = f
    });
    define("8bc88e3276b492c7ab751d0eb5497104", function (e, i, t) {
        var a = e("e0adcf525b211ecf4bf3aeacbd2f40ee"),
            c = e("7b741e66552c90cc551fb7d40aeedc92")(a.app),
            n = {
                title: "\u6211\u7684H5",
                desc: "\u767e\u5ea6H5\u5e73\u53f0\u652f\u6301",
                imgUrl: "https://gss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/doc/pic/item/ac345982b2b7d0a25e4d29d8cdef76094a369aea.jpg",
                link: window.location.href.split("#")[0]
            };
        t.exports = {
            invoke: function () {
                c.invokeShare(n)
            },
            setShareData: function (e) {
                n.title = e.title || n.title, n.desc = e.desc || n.desc, n.imgUrl = e.imgUrl || n.imgUrl, n.link = e.link || n.link
            },
            getShareData: function () {
                return n
            }
        }
    });
    define("48273ab2ced952eb7872a35708303784", function (e, a, t) {
        var n = !1,
            i = e("47ef722850d957a71ae2fd87d5a60949"),
            c = e("501e6dfedf4274bd61ad75e9ef65d5fc"),
            d = (e("0a4a2d1f3827aacaab37cafbf37d4632"), e("e7d7b58f3f1a05b6b6ef42dd56d4bf8c")),
            s = e("362115b8e6793630355a9fcf90549cea"),
            r = e("8bc88e3276b492c7ab751d0eb5497104");
        t.exports = {
            create: function (a) {
                var t = a.data,
                    n = a.container,
                    d = a.stageIndex,
                    s = [t.loadingPage, t.backStage, t.frontStage][d + 3] || t.pages[d],
                    r = s.attributes || {},
                    o = document.createElement("div");
                o.classList.add("lg-backface"), r.background && (o.style.background = r.background), o.style.opacity = Math.min(r.backgroundOpacity || 0, 1), n.appendChild(o);
                var f = e("e0adcf525b211ecf4bf3aeacbd2f40ee").ratio,
                    b = t.pages.length;
                (s.components || []).forEach(function (e, a) {
                    i.createSingleInstance(n, e, {
                        pageIndex: d,
                        pageCount: b,
                        stageType: ["back", "front"][d + 2] || "page",
                        stageIndex: d,
                        ratio: f
                    }, function (e) {
                        d < 0 && c.render(e), i.add(e)
                    })
                })
            },
            prepare: function (e, a) {
                a = void 0 === a ? 1 : a, i.instances.forEach(function (t) {
                    t.base.stageIndex > -1 && Math.abs(t.base.stageIndex - e) === a && (t.animationIndex = 0)
                })
            },
            enter: function (e, a, t) {
                if (!(e < 0)) {
                    t = void 0 === t || t;
                    var r = s.parseQueryString(window.location.search);
                    i.instances.forEach(function (i) {
                        if (i.instance.pageChange && i.instance.pageChange(e, a), (i.base.stageIndex < 0 || i.base.stageIndex === e) && i.instance.start && !i.instance.$started && (i.instance.start(), i.instance.$started = !0), i.base.stageIndex === e && (!0 === t && void 0 !== i.animationIndex && (i.animationIndex = 0, c.render(i)), !n && ["input", "text"].indexOf(i.data.type) >= 0)) {
                            if (-1 !== location.hostname.indexOf("baidu.com") || "quick" === r.mode) return;
                            d("\u8bf7\u4e0d\u8981\u8f93\u5165\u94f6\u884c\u5361\u53f7\u548c\u4efb\u4f55\u5bc6\u7801!", "warning"), n = !0
                        }
                    })
                }
            },
            clear: function () {},
            setShareInfo: function (e) {
                e.attributes && e.attributes.usePageShare && r.setShareData({
                    title: e.attributes.shareTitle,
                    desc: e.attributes.shareDescription,
                    imgUrl: e.attributes.shareIcon,
                    link: e.attributes.shareLink
                })
            }
        }
    });
    define("f660898851dbe3763f348700ef54e803", function (e, a, t) {
        function n(e, a, t) {
            var n = document.createElement("div");
            return n.className = "lg-page", g.create({
                data: e,
                container: n,
                stageIndex: t
            }), n
        }

        function c(a, t) {
            var c = [],
                r = e("a9d713b04d67f52c6920505722cf53bf"),
                g = r.get();
            g.backStage && (c[-2] = n(g, g.backStage, -2)), g.frontStage && (c[-1] = n(g, g.frontStage, -1));
            var o = g.pages;
            return "single" === a && (o = [], o[t] = g.pages[t]), o.forEach(function (e, a) {
                c[a] = n(g, e, a)
            }), c
        }

        function r(e) {
            var a = e[-2],
                t = e[-1];
            a && document.querySelector(".lg-back-stage").appendChild(a), t && document.querySelector(".lg-front-stage").appendChild(t)
        }
        var g = e("48273ab2ced952eb7872a35708303784");
        t.exports = {
            createAllPageElements: c,
            buildFrontAndBackStage: r
        }
    });
    define("2ac91c170a29c13480ec596aab5591ca", function (e, t, n) {
        var r, o = e("a9d713b04d67f52c6920505722cf53bf"),
            a = e("48273ab2ced952eb7872a35708303784"),
            i = e("f660898851dbe3763f348700ef54e803"),
            c = e("e0adcf525b211ecf4bf3aeacbd2f40ee"),
            l = e("47ef722850d957a71ae2fd87d5a60949"),
            s = e("501e6dfedf4274bd61ad75e9ef65d5fc"),
            d = e("362115b8e6793630355a9fcf90549cea"),
            h = (document.querySelector(".lg-container"), document.querySelector(".lg-page-container"));
        n.exports = {
            build: function (e) {
                var t = o.get();
                i.buildFrontAndBackStage(e), r = (t.pages[0].attributes.pageHeight ? t.pages[0].attributes.pageHeight : 650) * c.ratio;
                var n = document.createElement("div");
                n.className = "lg-page", n.style.height = r + "px", n.appendChild(e[0]), h.appendChild(n), a.prepare(0, 0), a.enter(0, t.pages.length, !1), a.setShareInfo(t.pages[0]), this.resetHeight(t)
            },
            getScreenHeight: function () {
                return this.scrollContainer === window ? document.body.clientHeight : this.scrollContainer.clientHeight
            },
            getScrollTop: function () {
                return this.scrollContainer === window ? document.body.scrollTop : this.scrollContainer.scrollTop
            },
            runAnimation: function (e) {
                var t = this;
                l.instances.forEach(function (n) {
                    if (!n.playedOnceInStrip) {
                        var o = t.getScreenHeight(),
                            a = Math.max(e + .5 * o, o);
                        (n.data.surface.y * c.ratio < a || r <= o + e) && (s.render(n), n.playedOnceInStrip = !0)
                    }
                })
            },
            resetHeight: function (e) {
                function t(e) {
                    var t = Math.round((o + e) / r * 100);
                    t <= a || (t = Math.min(100, t), a = t, d.trigger("scrollReach", t))
                }
                e.pages[0];
                h.firstChild.style.height = r + "px";
                var n, o = this.getScreenHeight(),
                    a = -1;
                t(0);
                var i = this;
                i.runAnimation(0), this.scroller = function (e) {
                    var r = i.getScrollTop();
                    i.runAnimation(r), clearTimeout(n), n = setTimeout(function () {
                        t(r)
                    }, 600)
                }, i.scrollContainer.addEventListener("scroll", this.scroller, !1)
            },
            scrollTo: function (e) {
                var t = /^(\d+)px$/,
                    n = /^(\d+)%$/;
                e = e.replace(/\s/g, "");
                var o, a;
                if (t.test(e)) a = e.match(t), 2 === a.length ? o = parseInt(a[1], 10) : console.warn("\u4f60\u586b\u5199\u7684\u6eda\u52a8\u4f4d\u7f6e\u683c\u5f0f\u4e0d\u5bf9\uff0c\u683c\u5f0f\u5982\uff1a1200px.");
                else {
                    if (!n.test(e)) return console.warn("\u4f60\u586b\u5199\u7684\u6eda\u52a8\u4f4d\u7f6e\u683c\u5f0f\u4e0d\u5bf9\uff0c\u683c\u5f0f\u5982\uff1a1200px \u6216\u8005 50%.");
                    a = e.match(n), 2 === a.length ? o = Math.round(parseInt(a[1], 10) * r / 100) : console.warn("\u4f60\u586b\u5199\u7684\u6eda\u52a8\u4f4d\u7f6e\u683c\u5f0f\u4e0d\u5bf9\uff0c\u683c\u5f0f\u5982\uff1a50%.")
                }
                var i = this.scrollContainer === window ? document.body : this.scrollContainer;
                try {
                    i.scrollTop = o
                } catch (e) {
                    console.warn(e)
                }
            },
            destroy: function () {
                this.scrollContainer.removeEventListener("scroll", this.scroller, !1)
            }
        }
    });
    define("43d523f0c6af1f8c1c42ed96b66434a5", function (e, t, i) {
        function a(e) {
            e.target && /^(input|textarea|a|select)$/i.test(e.target.tagName) || e.target && /keep-default/g.test(e.target.className) || e.preventDefault()
        }
        var n = e("a9d713b04d67f52c6920505722cf53bf"),
            r = e("48273ab2ced952eb7872a35708303784"),
            s = e("e0adcf525b211ecf4bf3aeacbd2f40ee"),
            o = e("f660898851dbe3763f348700ef54e803"),
            p = e("362115b8e6793630355a9fcf90549cea"),
            g = {
                prev: 1,
                next: -1,
                all: 0
            };
        i.exports = {
            build: function (e, t) {
                var i = n.get();
                o.buildFrontAndBackStage(e);
                var c = [];
                i.pages.forEach(function (t, i) {
                    var a = t.attributes || {},
                        n = e[i];
                    n && c.push({
                        content: n,
                        transition: {
                            name: a.swipeEffect || "slide",
                            duration: void 0 === a.swipeDuration ? 800 : 1e3 * a.swipeDuration,
                            direction: g[a.swipeForbidden]
                        }
                    })
                });
                var d = i.attributes,
                    ≈ = new window.Swiper({
                        container: document.querySelector(".lg-page-container"),
                        isVertical: "horizontal" !== d.swipeDirection,
                        data: c,
                        initIndex: "single" === s.list ? 0 : t,
                        isLoop: d.loop,
                        keepDefaultClasses: ["keep-default"]
                    });
                u.on("activePageChanged", function (e) {
                    var t = u.currentPage.index,
                        a = u.activePage.index;
                    r.prepare(a, 0), r.enter(a, i.pages.length), p.trigger("pageChangeStart", t + "_" + i.pages.length)
                }), u.on("swipeChanged", function () {
                    setTimeout(function () {
                        var e = u.currentPage.index;
                        r.setShareInfo(i.pages[e]), p.trigger("pageChangeEnd", e + "_" + i.pages.length), p.trigger("pageReach", e + 1 + "_" + i.pages.length)
                    }, 0)
                }), r.prepare(t, 0), r.enter(t, i.pages.length), r.setShareInfo(i.pages[t]), p.trigger("pageReach", t + 1 + "_" + i.pages.length);
                var f = document.querySelector(".lg-container");
                f.addEventListener("touchstart", a, !1), f.addEventListener("touchmove", a, !1), this.swiper = u
            },
            gotoPage: function (e, t) {
                if (this.swiper) switch (e) {
                    case "next":
                        this.swiper.swipeNext(t);
                        break;
                    case "prev":
                        this.swiper.swipePrev(t);
                        break;
                    default:
                        r.prepare(e, 0), this.swiper.swipeTo(e, t)
                }
            },
            getSwipeForbidDirection: function () {
                if (!this.swiper) return "none";
                var e = this.swiper.getCurrentIndex(),
                    t = n.get(),
                    i = t.pages[e].attributes;
                return i && i.swipeForbidden ? i.swipeForbidden : "none"
            },
            onresize: function () {
                this.swiper.reinit()
            },
            destroy: function () {
                this.swiper.destroy()
            }
        }
    });
    define("228f3008e52a6d4e9672bd2ef75f7b52", function (o, a, e) {
        o("a9d713b04d67f52c6920505722cf53bf"), o("48273ab2ced952eb7872a35708303784"), o("e0adcf525b211ecf4bf3aeacbd2f40ee"), o("362115b8e6793630355a9fcf90549cea");
        e.exports = {
            build: function (o, a) {
                var e = $("<div></div>").css({
                    "padding-top": "5px",
                    "padding-bottom": "30px"
                });
                o.forEach(function (o) {
                    var a = $(o.outerHTML).css({
                        margin: "10px",
                        width: "400px",
                        height: "650px",
                        "background-color": "#FFF",
                        display: "inline-block",
                        float: "left",
                        zoom: "0.6"
                    })[0];
                    e.append(a)
                }), $(".lg-container").append(e).css({
                    "background-color": "rgba(0,0,0,.5)",
                    overflow: "auto"
                }).find(".lg-back-stage, .lg-page-container, .lg-front-stage, .lg-loading-page").hide(), $("html, body").css({
                    height: "100%",
                    overflow: "auto"
                })
            },
            destroy: function () {}
        }
    });
    define("422f430e2afcab7b65225c58a5c5558a", function (a, c, e) {
        a("e0adcf525b211ecf4bf3aeacbd2f40ee"), a("0a4a2d1f3827aacaab37cafbf37d4632");
        e.exports = function (c, e) {
            var f = {
                    strip: a("2ac91c170a29c13480ec596aab5591ca"),
                    multi: a("43d523f0c6af1f8c1c42ed96b66434a5"),
                    expand: a("228f3008e52a6d4e9672bd2ef75f7b52")
                },
                n = f[c];
            return e && "strip" === c && (n.scrollContainer = e.scrollContainer), n
        }
    });
    define("0e96a41e910fafde1ce688118bc085da", function (a, e, t) {
        function i(a) {
            var e, t = {},
                i = [];
            u.instances.forEach(function (e) {
                e.instance.getValue && (a ? e.data.name === a && i.push(e) : i.push(e))
            });
            var c = 0;
            if (i.forEach(function (a) {
                    if (!e && a.instance.getValue) {
                        var i = a.instance.getValue();
                        if ("true" === a.data.attributes.required && !i) return void(e = a);
                        var n = a.data.attributes.id || c++;
                        t[n] ? t[n] = {
                            t: a.data.attributes.name,
                            v: t[n].v + "," + i
                        } : t[n] = {
                            t: a.data.attributes.name,
                            v: i
                        }
                    }
                }), e) {
                n && clearTimeout(n);
                var m = e.surfaceElement.style;
                return m["-webkit-animation-duration"] = m["animation-duration"] = "0.5s", m["-webkit-animation-name"] = m["animation-name"] = "shake", n = setTimeout(function () {
                    n = null, m["-webkit-animation-duration"] = m["animation-duration"] = "", m["-webkit-animation-name"] = m["animation-name"] = ""
                }, 510), void o("\u5b58\u5728\u5fc5\u586b\u9879.", "error")
            }
            if (Object.keys(t).length <= 0) return void o("\u6ca1\u6709\u5185\u5bb9.", "error");
            var b = d.getUid();
            return t = JSON.stringify(t), r === t ? void o("\u5df2\u7ecf\u63d0\u4ea4.", "info") : t.length > 1e3 ? void o("\u63d0\u4ea4\u7684\u5185\u5bb9\u8d85\u8fc7\u4e86\u4e00\u5343\u5b57\u7b26\uff0c\u65e0\u6cd5\u63d0\u4ea4.", "warning") : void $.ajax({
                type: "POST",
                url: "//h5.baidu.com/runtime/api/form",
                data: {
                    legendId: f.id,
                    fields: t,
                    page: s.swiper ? s.swiper.getCurrentIndex() : 0,
                    user: b
                },
                success: function () {
                    r = t, o("\u63d0\u4ea4\u6210\u529f.", "success"), d.trigger("form", t)
                },
                error: function () {
                    o("\u63d0\u4ea4\u5931\u8d25.", "error")
                }
            })
        }
        var n, r, o = a("e7d7b58f3f1a05b6b6ef42dd56d4bf8c"),
            u = a("47ef722850d957a71ae2fd87d5a60949"),
            d = a("362115b8e6793630355a9fcf90549cea"),
            f = a("0a4a2d1f3827aacaab37cafbf37d4632"),
            s = a("422f430e2afcab7b65225c58a5c5558a")(f.layoutMode);
        t.exports = {
            submit: i
        }
    });
    define("405531d898f50b8c6ee600d2dfddf4c1", function (e, n, a) {
        function t() {
            b = e("422f430e2afcab7b65225c58a5c5558a")(w.layoutMode);
            var n = "tap",
                a = "touchstart",
                t = "touchend";
            "pc" === v.terminal && (n = "click", a = "mousedown", t = "mouseup");
            var o;
            $("body").on(n, function (e) {
                r(e.target, "tap")
            }).on(a, function (e) {
                o = e.target, r(o, "touchdown")
            }).on(t, function (e) {
                r(o, "touchup")
            }), l()
        }

        function o(e) {
            var n = $(e).parents(".lg-surface-panel"),
                a = n.length;
            return a > 0 && (e = $(n[a - 1]).parent()[0]), e
        }

        function r(e, n) {
            for (var a, t = x.instances; e && e.getAttribute;) {
                if (e.classList.contains("lg-trailer")) {
                    e = o(e);
                    break
                }
                e = e.parentNode
            }
            t.every(function (n) {
                return n.trailerElement !== e || (a = n, !1)
            }), a && i(a.data.events, n)
        }

        function i(e, n) {
            e.forEach(function (e) {
                e.type === n && ("control" === e.actionType ? c(e) : "link" === e.actionType ? d(e) : "download" === e.actionType && s(e))
            })
        }

        function c(e) {
            x.getComponentsByName(e.control.target).forEach(function (n) {
                var a = n[e.control.action.id];
                if (a) {
                    var t = e.control.action.args,
                        o = [];
                    t.forEach(function (e) {
                        o.push(e.val)
                    }), a.apply(this, o)
                }
            })
        }

        function s(e) {
            if ("weixin" === v.app) {
                var n = $("<div></div>");
                n.css({
                    width: "400px",
                    height: "700px",
                    position: "fixed",
                    backgroundColor: "rgba(0, 0 , 0 ,.5)",
                    left: 0,
                    top: 0,
                    zIndex: 1e3,
                    backgroundImage: "url(https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/fex/pic/item/2934349b033b5bb5335b46643fd3d539b700bc98.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right top",
                    backgroundSize: "300px"
                }), $(".lg-container").append(n), n.on("tap", function () {
                    n.remove(), n = null
                })
            } else {
                var a, t, o = navigator.userAgent; - 1 !== o.indexOf("iPhone") || -1 !== o.indexOf("iPad") || -1 !== o.indexOf("iPod") ? (t = e.download.ios.trim(), a = t.toLowerCase()) : (t = e.download.android.trim(), a = e.download.android.toLowerCase()), 0 !== a.indexOf("javascript:") && t ? "pc" === v.terminal ? window.open(t) : window.location.href = t : alert("\u8bf7\u586b\u5199\u5408\u6cd5\u7684\u4e0b\u8f7d\u94fe\u63a5\uff01")
            }
        }

        function d(e) {
            var n, a, t = g.get().pages;
            switch (e.link.prefix) {
                case "http://":
                case "https://":
                    n || (n = "url");
                case "mailto:":
                    n || (n = "mail");
                case "tel:":
                    var o = e.link.url,
                        r = o.indexOf("://");
                    r >= 0 && (o = o.substr(r + 3)), "pc" === v.terminal ? window.open(e.link.prefix + o, "_blank") : ("baidu" !== v.app && "baiduLite" !== v.app || "superframe" !== v.present || y.exitFullScreen(), window.location = e.link.prefix + o), n || (n = "phone"), a = e.link.prefix + o;
                    break;
                case "#page":
                    var i = f(e.link.url) - 1;
                    b.gotoPage(i), n = "page", a = i + 1 + "_" + t.length;
                    break;
                case "#scroll":
                    var c = e.link.url;
                    b.scrollTo(c);
                    break;
                case "@submit":
                    h.submit(e.link.url);
                    break;
                case "@share":
                    n = "share", k.invoke()
            }
            n && m.trigger("event", {
                action: "link",
                type: n,
                content: a
            })
        }

        function f(e) {
            if (!e) return -1;
            if (/^\d+$/.test(e)) return parseInt(e, 10);
            for (var n = e.replace(/\s|[^,\-\d]/g, "").split(","), a = [], t = 0; t < n.length; t++) {
                var o = n[t];
                if (o)
                    if (/^\d+$/.test(o)) a.push(parseInt(o, 10));
                    else {
                        var r = o.split("-");
                        if (r.length < 2) continue;
                        var i = parseInt(r[0], 10),
                            c = parseInt(r[1], 10);
                        if (!i || !c || i > c) continue;
                        for (var s = i; s <= c;) a.push(s), s++
                    }
            }
            return a[Math.floor(Math.random() * a.length)]
        }

        function p() {
            var e = g.get(),
                n = b.swiper ? b.swiper.getCurrentIndex() : 0;
            i(e.pages[n].events, "shake"), m.trigger("shake")
        }

        function l() {
            if (window.Shake) {
                new window.Shake({
                    threshold: 15
                }).start(), window.addEventListener("shake", p, !1)
            }
        }

        function u() {
            window.removeEventListener("shake", p, !1)
        }
        var b, g = e("a9d713b04d67f52c6920505722cf53bf"),
            h = e("0e96a41e910fafde1ce688118bc085da"),
            v = e("e0adcf525b211ecf4bf3aeacbd2f40ee"),
            w = e("0a4a2d1f3827aacaab37cafbf37d4632"),
            k = e("8bc88e3276b492c7ab751d0eb5497104"),
            m = e("362115b8e6793630355a9fcf90549cea"),
            x = e("47ef722850d957a71ae2fd87d5a60949"),
            y = e("7b741e66552c90cc551fb7d40aeedc92")(v.app);
        m.on("form", function () {
            var e = g.get(),
                n = b.swiper ? b.swiper.getCurrentIndex() : 0;
            i(e.pages[n].events, "formSubmit")
        }), a.exports = {
            init: t,
            eventDeal: i,
            destroy: u
        }
    });
    define("66996ea3aa51e29f6a6cbf1e6d277a06", function (e, n, i) {
        function t(e) {
            return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }

        function a(e, n) {
            var i = $("head")[0],
                t = document.createElement("script");
            t.type = "text/javascript", t.src = e, t.onload = t.onreadystatechange = function () {
                this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || n && n()
            }, i.appendChild(t)
        }

        function o(e, n) {
            n && (e ? $(".use-template-btn").show() : $(".login-btn").show())
        }

        function c(e, n) {
            e && a("//fex.bdstatic.com/h5static/h5jscss/ZeroClipboard.min.js", function () {
                var e = $(".copy-url-btn").show();
                window.ZeroClipboard.config({
                    swfPath: "//fex.bdstatic.com/h5static/h5jscss/ZeroClipboard.swf"
                }), new window.ZeroClipboard(e[0]).on("copy", function (i) {
                    var t = i.clipboardData,
                        a = location.pathname.split("/").pop().split(".").shift(),
                        o = "store";
                    0 === window.location.pathname.indexOf("/h5") && (o = "user"), t.setData("text/plain", n + "/" + o + "/" + a), e.text("\u94fe\u63a5\u5df2\u590d\u5236"), setTimeout(function () {
                        e.text("\u590d\u5236 H5 \u94fe\u63a5")
                    }, 3e3)
                })
            })
        }

        function d(e) {
            for (var n = "", i = 0, t = e.length; i < t; i++) {
                var a = e[i],
                    o = a.active || "";
                n += '<div class="item ' + a.phone + " " + a.app + " " + o + '" data-height="' + a.height + '"><div class="phone-type"><span class="apple"></span>' + a.name + '</div><div class="phone-app"><span class="app"></span></div></div>'
            }
            return n
        }

        function s() {
            function n() {
                var e = $(document).height() / 850;
                0 !== e && (e > 1 && (e = 1), x.css("transform", "scale(" + e + ")"))
            }

            function i() {
                var e = C.getSwipeForbidDirection();
                "none" !== e && "next" !== e || C.gotoPage("prev")
            }

            function s() {
                var e = C.getSwipeForbidDirection();
                "none" !== e && "prev" !== e || C.gotoPage("next")
            }
            var p = v.parseQueryString(location.search),
                r = document.title || "",
                w = $("#description").attr("content") || "",
                f = $('<div class="phone-container"></div>'),
                m = $('<div class="phone"></div>').append($(".lg-container")),
                b = $('<div class="arrow"><div class="up"></div><div class="down"></div></div>');
            f.append(m), "multi" === l.layoutMode && f.append(b);
            var g = u ? "\u6709\u6548\u671f50\u5206\u949f\uff0c\u53d1\u5e03\u4e4b\u540e\u6c38\u4e45\u6709\u6548" : "",
                y = $('<div class="right"><div class="qrcode-container"><div class="qrcode"></div></div><div class="text">' + g + '</div><div class="text title">' + t(r) + '</div><div class="text creater"></div><div class="text desc">' + t(w) + '</div><div id="btn-block" class="btn-block"><div class="login-btn">\u767b\u5f55\u4f7f\u7528\u6a21\u677f</div><div class="use-template-btn">\u4f7f\u7528\u6a21\u677f</div><div class="copy-url-btn">\u590d\u5236 H5 \u94fe\u63a5</div><div class="open-new-window">\u65b0\u7a97\u53e3\u6253\u5f00<div></div></div>'),
                x = $('<div class="mid-content"></div>').append(f).append(y);
            $("body").append($('<div class="outer-container"></div>').append(x)), n(), window.onresize = n, u && (f.append($('<div class="phone-size">' + d([{
                phone: "p5",
                app: "weixin",
                height: 630,
                name: "5"
            }, {
                phone: "p6",
                app: "weixin",
                height: 644,
                name: "6"
            }, {
                phone: "p6p",
                app: "weixin",
                height: 650,
                name: "6+",
                active: "active"
            }]) + "</div>")), $(".mid-content").on("click", ".phone-size .item", function (e) {
                $(".mid-content .phone")[0].style.height = $(this).data("height") + "px", $(".phone-size .item").removeClass("active"), $(this).addClass("active");
                var n = document.querySelector(".lg-container");
                h.centralize(n.clientHeight), C && C.onresize && C.onresize()
            })), 1 === Number(p.channel) && (o(Number(p.isLogin), Number(p.useTemplate)), c(Number(p.copyUrl), decodeURIComponent(p.origin))), "preview" === p.scene && $(".open-new-window").show();
            var k = window.location.href.replace("scene=preview", "");
            if (p && p.ip && (k = k.replace(window.location.host, p.ip).replace("&ip=" + p.ip, "")), a("//tb1.bdstatic.com/legend/517b55d3688ce9ef1085a3d9632bcb97_qrcode.js", function () {
                    new window.QRCode($(".qrcode")[0], {
                        width: 320,
                        height: 320
                    }).makeCode(k)
                }), $("body").on("click", ".open-new-window", function () {
                    window.open(k, "_blank")
                }).on("click", ".use-template-btn", function () {
                    var e = {
                        templateId: location.pathname.split("/").pop().split(".").shift(),
                        channel: 2
                    };
                    console.log(e)
                }).on("click", ".login-btn", function () {
                    var e = {
                        redirect: "login",
                        channel: 3
                    };
                    window.parent.postMessage(JSON.stringify(e), "*")
                }), "multi" === l.layoutMode) {
                var C = e("422f430e2afcab7b65225c58a5c5558a")("multi");
                $("body").on("click", ".arrow .up", i).on("click", ".arrow .down", s), window.addEventListener("keydown", function (e) {
                    38 === e.keyCode || 37 === e.keyCode ? (i(), e.preventDefault()) : 40 !== e.keyCode && 39 !== e.keyCode || (s(), e.preventDefault())
                }, !1)
            }
        }

        function p() {
            r.phone || s()
        }
        var r = e("e0adcf525b211ecf4bf3aeacbd2f40ee"),
            l = e("0a4a2d1f3827aacaab37cafbf37d4632"),
            v = e("362115b8e6793630355a9fcf90549cea"),
            h = e("47ef722850d957a71ae2fd87d5a60949"),
            u = 0 === window.location.pathname.indexOf("/preview"),
            w = document.querySelector(".lg-page-container");
        i.exports = {
            install: p,
            scrollContainer: w
        }
    });
    define("7a778a72515f27afe3a2ce5d5d67664c", function (n, e, t) {
        function i() {
            var n = [80, 443, "", 0].indexOf(Number(location.port || 0)) >= 0;
            if ("baidu" !== o.app || n || l.enterFullScreen(), "multi" === c.layoutMode && $(".lg-container").parents().each(function (n, e) {
                    e.styleHeight = e.style.height
                }).css({
                    height: "100%"
                }), window._SF_ && window._SF_.vw) {
                var e = window._SF_.vw,
                    t = this;
                e.on("detach", function () {
                    a(), t.onUninstall && t.onUninstall()
                }), $($.legendEvent).on("loadingEnd", function () {
                    e.emit("resourceLoaded")
                })
            }
        }

        function a() {
            $(".lg-container").parents().each(function (n, e) {
                "styleHeight" in e && (e.style.height = e.styleHeight || "")
            })
        }
        var o = n("e0adcf525b211ecf4bf3aeacbd2f40ee"),
            c = n("0a4a2d1f3827aacaab37cafbf37d4632"),
            l = n("7b741e66552c90cc551fb7d40aeedc92")(o.app);
        t.exports = {
            install: i,
            scrollContainer: window
        }
    });
    define("82abded57f8d99dfff9fe2b163bffef8", function (n, i, o) {
        o.exports = {
            install: function () {},
            scrollContainer: window
        }
    });
    define("25fe81bc50a3d7a29c0107e18f60dbba", function (e, f, a) {
        var d = e("e0adcf525b211ecf4bf3aeacbd2f40ee"),
            b = {
                pc: e("66996ea3aa51e29f6a6cbf1e6d277a06"),
                superframe: e("7a778a72515f27afe3a2ce5d5d67664c"),
                mobile: e("82abded57f8d99dfff9fe2b163bffef8")
            };
        a.exports = b[d.present]
    });
    define("dd7447925ffccce9f1b07008c9d2c163", function (e, t, o) {
        function n(e, t) {
            var o = JSON.parse(JSON.stringify(s));
            return e && e.components ? (e.components.forEach(function (e) {
                "audio" === e.type && e.attributes && "true" === e.attributes.auto && t < 1 && (o.audios.push(e.attributes.url), e.attributes.aid = l++), "panel" === e.type && e.attributes && e.attributes.components && (o = a(o, i(e.attributes, t)))
            }), o) : o
        }

        function a(e, t) {
            var o = {};
            e = e || {};
            for (var n in e) e.hasOwnProperty(n) && (e[n] = e[n] || [], o[n] = e[n].slice());
            t = t || {};
            for (n in t) t.hasOwnProperty(n) && (t[n] = t[n] || [], o[n] = o[n] || [], o[n] = o[n].concat(t[n].slice()));
            return o
        }

        function i(e, t) {
            return n(e.attributes, t)
        }

        function r(e) {
            e.forEach(function (e) {
                var t = document.createElement("audio"),
                    o = document.createElement("source");
                t.className = "lg-component-audio-core", o.src = e, t.appendChild(o), document.querySelector(".lg-container").parentNode.appendChild(t), t.play(), document.addEventListener("WeixinJSBridgeReady", function () {
                    t.play()
                }), legend.loading.audios.push(t)
            })
        }

        function u() {
            u.booted || (u.booted = !0, setTimeout(function () {
                p && p(), c()
            }), clearTimeout(u.timer))
        }

        function c() {
            document.querySelector("body .lg-container").classList.add("ready");
            var e = document.querySelector(".lg-loading-page");
            e.parentNode.removeChild(e)
        }

        function d(e) {
            if (p = this.onLoad, this.audio) {
                var t = n(e.frontStage, -1);
                t = a(t, n(e.backStage, -2)), e.pages.forEach(function (e, o) {
                    t = a(t, n(e, o))
                }), r(t.audios)
            }
            u()
        }
        var s = {
            audios: []
        };
        legend.loading = {
            audios: []
        };
        var l = 0,
            p = null;
        u.booted = !1, o.exports = {
            audio: !0,
            onLoad: null,
            load: d
        }
    });
    define("1ba06e86d48c07dbb262bae52f09c364", function (o, e, n) {
        function d() {
            document.querySelector("body .lg-container").classList.add("ready");
            var o = document.querySelector(".lg-loading-page");
            o.parentNode.removeChild(o)
        }

        function a(o) {
            this.onLoad && this.onLoad(), d()
        }
        n.exports = {
            audio: !1,
            onLoad: null,
            load: a
        }
    });
    define("21162ae9b3436380b6d05de737638efb", function (t, e, a) {
        function n(t, e) {
            var a = JSON.parse(JSON.stringify(P));
            return t && t.components ? (t.components.forEach(function (t) {
                if ("image" === t.type && t.attributes && t.attributes.src) {
                    var n = t.attributes.src;
                    a.images.push(n)
                }
                if ("album" === t.type && t.attributes && t.attributes.images) {
                    var o = t.attributes.images;
                    a.images = a.images.concat(o)
                }
                if ("panorama" === t.type && t.attributes && t.attributes.src) {
                    var n = t.attributes.src;
                    a.images.push(n)
                }
                if ("frame" === t.type && t.attributes && t.attributes.frames) {
                    t.attributes.frames.forEach(function (t) {
                        a.images.push(t)
                    })
                }
                "label" === t.type && t.attributes && t.attributes.fonts && (a.fonts = a.fonts.concat(t.attributes.fonts.map(function (t) {
                    return t.fontName
                }))), "counter" === t.type && t.attributes && t.attributes.fontFamily && a.fonts.push(t.attributes.fontFamily), "loadingprogress" === t.type && t.attributes && t.attributes.fontFamily && a.fonts.push(t.attributes.fontFamily), "audio" === t.type && t.attributes && "true" === t.attributes.auto && e < 1 && x && (a.audios.push({
                    src: t.attributes.url,
                    loop: "true" === t.attributes.loop
                }), t.attributes.aid = E++), "panel" === t.type && t.attributes && t.attributes.components && (a = i(a, s(t.attributes, e)))
            }), a) : a
        }

        function i(t, e) {
            var a = {};
            t = t || {};
            for (var n in t) t.hasOwnProperty(n) && (t[n] = t[n] || [], a[n] = t[n].slice());
            e = e || {};
            for (n in e) e.hasOwnProperty(n) && (e[n] = e[n] || [], a[n] = a[n] || [], a[n] = a[n].concat(e[n].slice()));
            return a
        }

        function o(t) {
            for (var e = t.concat(), a = 0; a < e.length; ++a)
                for (var n = a + 1; n < e.length; ++n) e[a] === e[n] && e.splice(n--, 1);
            return e
        }

        function r(t, e) {
            var a = JSON.parse(JSON.stringify(t)),
                n = {};
            for (var i in a) a.hasOwnProperty(i) && (n[i] = -1 === e.indexOf(i) ? o(a[i]) : a[i]);
            return n
        }

        function s(t, e) {
            return n(t.attributes, e)
        }

        function u(t, e) {
            if (t) {
                var a = new Image;
                a.onload = a.onerror = e, a.src = t
            }
        }

        function c(t, e, a) {
            if (t) {
                if (0 === t.length) return void e();
                var n = t.shift();
                a = a || function () {}, u(n, function () {
                    a(n, this), c(t, e, a)
                })
            }
        }

        function d(t) {
            var e = "";
            if (t.forEach(function (t) {
                    e += '<span style="font-family: ' + t + ';"></span>'
                }), 0 !== e.length) {
                var a = document.createElement("div");
                a.innerHTML = e, a.style.cssText = "position: absolute; top: -99999px", document.querySelector(".lg-container").parentNode.appendChild(a)
            }
        }

        function f(t, e) {
            c(t, l, function (t, a) {
                w++, p(w, e)
            })
        }

        function l() {
            l.booted || (l.booted = !0, setTimeout(function () {
                N && N(), b()
            }), clearTimeout(l.timer))
        }

        function g() {
            for (var e = t("47ef722850d957a71ae2fd87d5a60949").instances, a = [], n = 0, i = e.length; n < i; n++) {
                var o = e[n];
                "loadingprogress" === o.data.type && a.push(o)
            }
            return a
        }

        function p(t, e) {
            var a = S;
            if (a && a.length) {
                t > e && (t = e);
                for (var n = parseInt(t / e * 100, 10), i = 0, o = a.length; i < o; i++) {
                    var r = a[i];
                    r.instance && r.instance.progress && r.instance.progress(n, t, e)
                }
            }
            t >= e && l()
        }

        function m(t) {
            var e = document.querySelector(".lg-loading-page");
            t.loadingPage || (t.loadingPage = {}), t.loadingPage && h.create({
                data: t,
                container: e,
                stageIndex: -3
            });
            var a = document.querySelector("body .lg-container");
            if (window.Parallax) {
                var n = t.loadingPage.attributes.gravityLock,
                    i = {};
                "horizon" === n ? i = {
                    limitY: 0
                } : "vertical" === n && (i = {
                    limitX: 0
                }), new window.Parallax(a, i)
            }
            a.classList.add("ready")
        }

        function b() {
            document.querySelector("body .lg-container").classList.add("ready");
            var t = document.querySelector(".lg-loading-page");
            t.parentNode.removeChild(t)
        }

        function v(t) {
            t.forEach(function (t) {
                var e = document.createElement("audio"),
                    a = document.createElement("source");
                e.className = "lg-component-audio-core", a.src = t.src, t.loop && (e.loop = !0), e.appendChild(a), document.querySelector(".lg-container").parentNode.appendChild(e), e.play(), document.addEventListener("WeixinJSBridgeReady", function () {
                    e.play()
                }), legend.loading.audios.push(e)
            })
        }

        function y(t) {
            var e = this;
            N = this.onLoad, x = this.audio;
            var a = n(t.loadingPage, -3);
            a = r(a, ["audios"]), d(a.fonts), e.audio && v(a.audios), c(a.images, function () {
                m(t), S = g();
                var a = n(t.frontStage, -1);
                a = i(a, n(t.backStage, -2)), t.pages.forEach(function (t, e) {
                    a = i(a, n(t, e))
                }), a = r(a, ["audios"]), d(a.fonts), e.audio && v(a.audios);
                var o = a.images.length;
                o ? (setTimeout(function () {
                    f(a.images, o)
                }, 100), setTimeout(function () {
                    f(a.images, o)
                }, 200), setTimeout(function () {
                    f(a.images, o)
                }, 300), l.timer = setTimeout(l, 5e4)) : l()
            })
        }
        var h = t("48273ab2ced952eb7872a35708303784"),
            S = [],
            P = {
                images: [],
                fonts: [],
                audios: []
            };
        legend.loading = {
            audios: []
        };
        var w = 0,
            E = 0,
            N = null,
            x = !0;
        l.booted = !1, a.exports = {
            audio: !0,
            onLoad: null,
            load: y
        }
    });
    define("adc08d9e4977029ee3880424b6e4dfa1", function (e, c, d) {
        function a(c) {
            switch (c) {
                case "lazyload":
                    return e("dd7447925ffccce9f1b07008c9d2c163");
                case "blank":
                    return e("1ba06e86d48c07dbb262bae52f09c364");
                default:
                    return e("21162ae9b3436380b6d05de737638efb")
            }
        }
        d.exports = a
    });
    define("9e35d3ef33eb0222ff33f92540abee14", function (e, n, t) {
        function a() {
            return +new Date - E.enterTime
        }

        function i() {
            v.trigger("beforeUnload", a())
        }

        function o() {
            v.trigger("unload", a())
        }

        function r() {
            v.trigger("blur", a())
        }

        function d() {
            document.hidden && v.trigger("visibilityHidden", a())
        }

        function c() {
            window.addEventListener("beforeunload", i, !1), window.addEventListener("unload", o, !1), window.addEventListener("blur", r, !1), document.addEventListener("visibilitychange", d, !1)
        }

        function f() {
            window.removeEventListener("beforeunload", i, !1), window.removeEventListener("unload", o, !1), window.removeEventListener("blur", r, !1), document.removeEventListener("visibilitychange", d, !1)
        }

        function l(n, t, i) {
            function o() {
                var t = +new Date - E.enterTime,
                    i = e("f660898851dbe3763f348700ef54e803").createAllPageElements(m.list, r);
                g.build(i, r), b.init(), document.querySelector(".lg-container").setAttribute("data-limit-x", 0);
                var o = document.querySelectorAll(".lg-page"),
                    d = [n.backStage].concat(n.pages).concat([n.frontStage]);
                window.Parallax && d.forEach(function (e, n) {
                    var t = {};
                    "horizon" === e.attributes.gravityLock ? t = {
                        limitY: 0
                    } : "vertical" === e.attributes.gravityLock && (t = {
                        limitX: 0
                    }), new window.Parallax(o[n], t)
                }), y = !0, v.trigger("loadTime", t), v.trigger("loadingEnd", a())
            }
            w.init(n), p.install(s), p.onUninstall = function () {
                s()
            };
            var r = 0;
            if (0 === window.location.pathname.indexOf("/preview")) {
                var d = v.parseHash(window.location.hash);
                d.page && (r = d.page)
            }
            g = e("422f430e2afcab7b65225c58a5c5558a")(m.mode, p), v.trigger("loadingStart", a());
            var f = n.attributes.loadingMode || "preload";
            0 === m.load && (f = "blank");
            var l = e("adc08d9e4977029ee3880424b6e4dfa1")(f);
            0 === m.load ? (l.audio = !1, l.onLoad = function () {
                o()
            }) : l.onLoad = function () {
                o(), h.init(), legend.onApiReady && legend.onApiReady(), L.forEach(function (e) {
                    e()
                })
            }, l.load(n), c()
        }

        function u(e) {
            y ? e() : L.push(e)
        }

        function s() {
            b.instances.forEach(function (e) {
                e.instance && e.instance.free && e.instance.free();
                var n = e.trailerElement;
                n && n.parentNode.removeChild(n)
            }), window.removeEventListener("resize", b.resizer, !1), g.destroy();
            var e = document.querySelector(".lg-container");
            e.parentNode.removeChild(e), f(), h.destroy(), v.trigger("leave", a())
        }
        var g, v = e("362115b8e6793630355a9fcf90549cea"),
            b = e("47ef722850d957a71ae2fd87d5a60949"),
            w = e("a9d713b04d67f52c6920505722cf53bf"),
            m = e("e0adcf525b211ecf4bf3aeacbd2f40ee"),
            E = e("0a4a2d1f3827aacaab37cafbf37d4632"),
            h = e("405531d898f50b8c6ee600d2dfddf4c1"),
            p = e("25fe81bc50a3d7a29c0107e18f60dbba"),
            y = !1,
            L = [];
        t.exports = {
            init: l,
            ready: u,
            destroy: s
        }
    });
    define("c646f87001be732ac707b54a48a08a22", function (e, a, f) {
        var d = e("362115b8e6793630355a9fcf90549cea"),
            b = e("0a4a2d1f3827aacaab37cafbf37d4632"),
            c = e("47ef722850d957a71ae2fd87d5a60949");
        d.extend(legend, {
            ready: e("9e35d3ef33eb0222ff33f92540abee14").ready,
            init: e("9e35d3ef33eb0222ff33f92540abee14").init,
            toast: e("e7d7b58f3f1a05b6b6ef42dd56d4bf8c"),
            info: e("0a4a2d1f3827aacaab37cafbf37d4632"),
            share: e("8bc88e3276b492c7ab751d0eb5497104"),
            render: e("422f430e2afcab7b65225c58a5c5558a")(b.layoutMode),
            getData: e("a9d713b04d67f52c6920505722cf53bf").get,
            getComponentsByName: c.getComponentsByName.bind(c)
        })
    });
    define("53560cbbded75b913188669798569206", function (e, n, t) {
        function a(e, n) {
            e = i[e], "component" === e && (e = "component:" + n.name, n = n.content), "object" == typeof n && (n = JSON.stringify(n)), n = encodeURIComponent(n);
            var t = c.parseQueryString(window.location.search),
                a = t.channelid || "",
                f = (new Date).getTime(),
                r = c.getUid(),
                d = {
                    q: f,
                    i: o.id,
                    u: r
                };
            return null !== a && "" !== a && (d.c = a), d.v = e, d.t = n || "", c.makeUrl("//h5.baidu.com/runtime/api/st", d)
        }
        var c = e("362115b8e6793630355a9fcf90549cea"),
            o = (e("e0adcf525b211ecf4bf3aeacbd2f40ee"), e("0a4a2d1f3827aacaab37cafbf37d4632")),
            i = {
                pv: "pv",
                beforeUnload: "leave"
            };
        t.exports = {
            condition: function () {
                return !0
            },
            act: function (e, n) {
                return Object.keys(i).indexOf(e) >= 0 ? a(e, n) : ""
            }
        }
    });
    define("4d323d52036ce33c9ea693af96afecd1", function (e, a, n) {
        function t(e, a) {
            var n = "";
            e = d[e], "component" === e ? f.indexOf(a.name) >= 0 && (e = a.name, n = a.content) : "event" === e ? (e = a.type, n = a.content) : n = "object" == typeof a ? JSON.stringify(a) : a, n = encodeURIComponent(n);
            var t = c.getCookie("BAIDUID"),
                p = {
                    tag: "fc_h5",
                    param: r.param || "",
                    type: e,
                    timestamp: +new Date,
                    h5id: i.id,
                    source: "superframe" === o.present ? 0 : 1
                };
            return t && (p.baiduid = t), n && (p.content = n), [c.makeUrl("https://sp0.baidu.com/-rU_dTmfKgQFm2e88IuM_a/w.gif", p), c.makeUrl(" https://ada.baidu.com/nclick/index", p)]
        }
        var i = e("0a4a2d1f3827aacaab37cafbf37d4632"),
            o = e("e0adcf525b211ecf4bf3aeacbd2f40ee"),
            c = e("362115b8e6793630355a9fcf90549cea"),
            r = c.parseQueryString(window.location.search),
            d = {
                pv: "pv",
                loadTime: "loadtime",
                form: "submit",
                event: "event",
                shake: "shake",
                pageReach: "page",
                component: "component",
                beforeUnload: "beforeunload",
                unload: "unload",
                blur: "blur",
                visibilityHidden: "visibility_hidden",
                scrollReach: "reach"
            },
            f = ["video"];
        n.exports = {
            condition: function () {
                var e = location.search;
                return "superframe" === o.present || e.indexOf("fc") > -1 && e.indexOf("param") > -1
            },
            act: function (e, a) {
                return Object.keys(d).indexOf(e) >= 0 ? t(e, a) : ""
            }
        }
    });
    define("f6863e1fc9b68b511e09f4f51ddcfc85", function (e, n, t) {
        function o(e, n) {
            "event" === e && (e = n.type, n = n.content), "object" == typeof n && (n = JSON.stringify(n)), n = encodeURIComponent(n || "");
            var t = {
                q: +new Date,
                i: i.id,
                u: a.getCookie("BAIDUID"),
                h: encodeURIComponent(window.location.href),
                v: e,
                t: n
            };
            return a.makeUrl(c, t)
        }
        var a = e("362115b8e6793630355a9fcf90549cea"),
            i = (e("e0adcf525b211ecf4bf3aeacbd2f40ee"), e("0a4a2d1f3827aacaab37cafbf37d4632")),
            c = "http://marketing.baidu.com/web/h5/feedback.json",
            f = ["pv", "pageReach", "scrollReach", "event", "beforeUnload", "unload", "blur", "visibilityHidden", "form"];
        t.exports = {
            condition: function () {
                return i.business && "mkt" === i.business.type
            },
            act: function (e, n) {
                return f.indexOf(e) >= 0 ? o(e, n) : ""
            }
        }
    });
    define("e1aaf7ca8d3a0a9a62cc1665276be5b3", function (e, n, o) {
        function a(e, n) {
            var o = "log_" + (new Date).getTime(),
                a = new window.Image;
            window[o] = a, a.src = e, a.onload = a.onerror = function (e) {
                n && n(a, e), this.onload = this.onerror = null, delete window[o], a = null
            }
        }
        var i = e("362115b8e6793630355a9fcf90549cea"),
            t = [e("53560cbbded75b913188669798569206"), e("4d323d52036ce33c9ea693af96afecd1"), e("f6863e1fc9b68b511e09f4f51ddcfc85")],
            c = ["pv", "loadingStart", "loadingEnd", "loadTime", "pageChangeStart", "pageChangeEnd", "pageReach", "scrollReach", "component", "event", "beforeUnload", "unload", "blur", "visibilityHidden", "leave", "shake", "form"];
        i.on(c.join(" "), function (e, n) {
            setTimeout(function () {
                t.forEach(function (o) {
                    if (o.condition())
                        for (var i = o.act(e.type, n), t = [].concat(i), c = 0; c < t.length; c++) t[c] && a(t[c])
                })
            }, 30)
        }), o.exports = {}
    });
    define("2b42bf30c83ac665b290a159f626bfd3", function (a, e, c) {
        a("362115b8e6793630355a9fcf90549cea").trigger("pv", {
            ua: navigator.userAgent,
            url: window.location.href
        }), a("c646f87001be732ac707b54a48a08a22"), a("e1aaf7ca8d3a0a9a62cc1665276be5b3")
    });

    define("9ec46718664b017aa151633f717d57cc", function (e, t) {
        function r(e, t, r, a) {
            function n() {
                s.style.webkitTransform = "translate(" + t.translateX + "px, " + t.translateY + "px) scale(" + t.scale + ")", "true" == t.playAudio && t.audio && t.audioEl && t.audioEl.play()
            }

            function o() {
                s.style.webkitTransform = d
            }
            var s = document.createElement("img");
            s.classList.add("lg-component-img");
            var i = {},
                l = "ontouchend" in document;
            if ("true" == t.touchevent) {
                var d = s.style.webkitTransform;
                l ? ($(s).on("touchstart", n), $(s).on("touchend", o)) : ($(s).on("mousedown", n), $(s).on("mouseup", o))
            }
            var u = {
                name: "\u56fe\u7247",
                attributeChange: function (e) {
                    e = e || {};
                    for (var t in e) i[t] = e[t];
                    var r = "src";
                    i.lazy && (r = "data-src", s.classList.add("swiper-lazy")), s.setAttribute(r, e.src), "none" === i.stroke ? s.style.borderStyle = "none" : s.style.borderStyle = i.strokeType, "true" == e.keepDefault && s.classList.add("keep-default"), s.style.borderRadius = i.cornerRadius + "px", s.style.borderColor = i.stroke, s.style.borderWidth = (i.strokeWidth || 0) + "px"
                },
                sizeChange: function (e, t) {
                    s.style.width = e + "px", s.style.height = t + "px"
                }
            };
            return u.sizeChange(r, a), u.attributeChange(t), e.appendChild(s), u
        }
        t.create = r
    });
    require("47ef722850d957a71ae2fd87d5a60949").classes.image = require("9ec46718664b017aa151633f717d57cc");
    define("68b03a34bcbde243fb7b1a301815e0ce", function (t, e) {
        function n(t, e, n, o, i) {
            var a = document.createElement("div");
            a.classList.add("lg-component-loading-progress"), a.textContent = "0%";
            var r = {
                name: "\u52a0\u8f7d\u8fdb\u5ea6",
                attributeChange: function (t) {
                    var e = i.inEditor ? t.fontSize : Math.floor(t.fontSize * i.ratio);
                    a.style.fontFamily = t.fontFamily, a.style.fontSize = e + "px", a.style.color = t.color
                },
                progress: function (t, e, n) {
                    a.textContent = t + "%"
                },
                sizeChange: function (t, e) {
                    a.style.width = t + "px", a.style.height = e + "px"
                }
            };
            return r.attributeChange(e), r.sizeChange(n, o), t.appendChild(a), r
        }
        e.create = n
    });
    require("47ef722850d957a71ae2fd87d5a60949").classes.loadingprogress = require("68b03a34bcbde243fb7b1a301815e0ce");
    define("628a6074fac61aa0c3b4bc2538b9c7ca", function (e, t) {
        function r(e, t, r, n) {
            var o = document.createElement("div");
            o.classList.add("lg-component-rect");
            var i = {},
                s = {
                    name: "\u77e9\u5f62",
                    attributeChange: function (e) {
                        for (var t in e) i[t] = e[t];
                        "none" === i.fill ? o.style.backgroundColor = "" : o.style.backgroundColor = i.fill, "none" === i.stroke ? o.style.borderStyle = "none" : o.style.borderStyle = i.strokeType, o.style.borderRadius = i.cornerRadius + "px", o.style.borderColor = i.stroke, o.style.borderWidth = (i.strokeWidth || 0) + "px", i.cornerRadius ? this.name = "\u5706\u89d2\u77e9\u5f62" : this.name = "\u77e9\u5f62"
                    },
                    sizeChange: function (e, t) {
                        o.style.width = e + "px", o.style.height = t + "px"
                    }
                };
            return s.attributeChange(t), s.sizeChange(r, n), e.appendChild(o), s
        }
        t.create = r
    });
    require("47ef722850d957a71ae2fd87d5a60949").classes.rect = require("628a6074fac61aa0c3b4bc2538b9c7ca");
    define("557eda6f2ffb0e27ee424e7ac100d438", function (e, t) {
        function r(e, t, r, o, i) {
            var n = document.createElement("input");
            n.id = t.id, n.classList.add("lg-component-input");
            var a = {},
                l = {
                    name: "\u5355\u884c\u6587\u672c\u6846",
                    attributeChange: function (e) {
                        for (var t in e) a[t] = e[t];
                        var r = a.fontsize || 0,
                            o = a.lineheight || 0;
                        r = i.inEditor ? r : Math.floor(r * i.ratio), o = i.inEditor ? o : Math.floor(o * i.ratio * 10) / 10, n.setAttribute("type", a.type || "text"), n.setAttribute("placeholder", a.placeholder || ""), n.style.lineHeight = o + "em", n.style.fontSize = r + "px", n.style.color = a.color, n.style.background = a.background, n.style.borderRadius = (a.borderradius || 0) + "px", n.style.borderWidth = (a.borderwidth || 0) + "px", n.style.borderColor = a.bordercolor
                    },
                    sizeChange: function (e, t) {
                        n.style.width = e + "px", n.style.height = t + "px"
                    },
                    getValue: function () {
                        return n.value
                    },
                    focus: function () {
                        n.focus()
                    }
                };
            return l.attributeChange(t), l.sizeChange(r, o), e.appendChild(n), l
        }
        t.create = r
    });
    require("47ef722850d957a71ae2fd87d5a60949").classes.input = require("557eda6f2ffb0e27ee424e7ac100d438");
}(typeof _global_ === "object" ? _global_.legend : window.legend))