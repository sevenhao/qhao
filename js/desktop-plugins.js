/**
 * Created by qhao on 2015/10/12.
 */
function Placeholdem(a) {
    "use strict"; !
        function() {
            for (var a = 0,
                     b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
                window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
                var c = (new Date).getTime(),
                    d = Math.max(0, 16 - (c - a)),
                    e = window.setTimeout(function() {
                            b(c + d)
                        },
                        d);
                return a = c + d,
                    e
            }),
                window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
                clearTimeout(a)
            })
        } ();
    var b = {};
    return b.init = function() {
        if (b.elems = [], a && a.length) for (var c = 0; c < a.length; c++) b.hasPlaceholder(a[c]) && b.elems.push(new b.PlaceholdemElem(a[c]));
        else a && b.hasPlaceholder(a) && b.elems.push(new b.PlaceholdemElem(a))
    },
        b.hasPlaceholder = function(a) {
            return "function" == typeof a.hasAttribute && a.hasAttribute("placeholder")
        },
        b.PlaceholdemElem = function(a) {
            var b = this;
            b.init = function() {
                b.elem = a,
                    b.placeholder = b.elem.getAttribute("placeholder"),
                    b.elem.removeAttribute("placeholder"),
                    b.rAF = null,
                    b.animating = 0,
                    b.elem.value || (b.elem.value = b.placeholder),
                    b.on(b.elem, "focus", b.onFocus),
                    b.on(b.elem, "blur", b.onBlur),
                    b.on(b.elem, "keydown", b.onKeydown)
            },
                b.on = function(a, b, c) {
                    a.addEventListener ? a.addEventListener(b, c) : a.attachEvent("on" + b, c)
                },
                b.onFocus = function() { (b.animating || b.elem.value === b.placeholder) && (b.animating = 1, window.cancelAnimationFrame(b.rAF), b.deletePlaceholder())
                },
                b.onBlur = function() { (b.animating || "" === b.elem.value) && (b.animating = 1, window.cancelAnimationFrame(b.rAF), b.restorePlaceholder())
                },
                b.onKeydown = function() {
                    b.animating && (b.animating = 0, window.cancelAnimationFrame(b.rAF), b.elem.value = "")
                },
                b.deletePlaceholder = function() {
                    b.elem.value.length > 0 ? (b.elem.value = b.elem.value.slice(0, -1), b.rAF = window.requestAnimationFrame(b.deletePlaceholder)) : b.animating = 0
                },
                b.restorePlaceholder = function() {
                    b.elem.value.length < b.placeholder.length ? (b.elem.value += b.placeholder[b.elem.value.length], b.rAF = window.requestAnimationFrame(b.restorePlaceholder)) : b.animating = 0
                },
                b.init()
        },
        b.init(),
        b
}
function countUp(a, b, c, d, e, f) {
    var g, h, i, j;
    for (g = 0, h = ["webkit", "moz", "ms", "o"], i = 0; i < h.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[h[i] + "RequestAnimationFrame"],
        window.cancelAnimationFrame = window[h[i] + "CancelAnimationFrame"] || window[h[i] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(a) {
        var b = (new Date).getTime(),
            c = Math.max(0, 16 - (b - g)),
            d = window.setTimeout(function() {
                    a(b + c)
                },
                c);
        return g = b + c,
            d
    }),
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a)
    }),
        this.options = f || {
            useEasing: !0,
            useGrouping: !0,
            separator: ",",
            decimal: "."
        },
        "" == this.options.separator && (this.options.useGrouping = !1),
        null == this.options.prefix && (this.options.prefix = ""),
        null == this.options.suffix && (this.options.suffix = ""),
        j = this,
        this.d = "string" == typeof a ? document.getElementById(a) : a,
        this.startVal = Number(b),
        this.endVal = Number(c),
        this.countDown = this.startVal > this.endVal ? !0 : !1,
        this.startTime = null,
        this.timestamp = null,
        this.remaining = null,
        this.frameVal = this.startVal,
        this.rAF = null,
        this.decimals = Math.max(0, d || 0),
        this.dec = Math.pow(10, this.decimals),
        this.duration = 1e3 * e || 2e3,
        this.version = function() {
            return "1.3.2"
        },
        this.printValue = function(a) {
            var b = isNaN(a) ? "--": j.formatNumber(a);
            "INPUT" == j.d.tagName ? this.d.value = b: "text" == j.d.tagName ? this.d.textContent = b: this.d.innerHTML = b
        },
        this.easeOutExpo = function(a, b, c, d) {
            return 1024 * c * ( - Math.pow(2, -10 * a / d) + 1) / 1023 + b
        },
        this.count = function(a) {
            var b, c;
            null === j.startTime && (j.startTime = a),
                j.timestamp = a,
                b = a - j.startTime,
                j.remaining = j.duration - b,
                j.options.useEasing ? j.countDown ? (c = j.easeOutExpo(b, 0, j.startVal - j.endVal, j.duration), j.frameVal = j.startVal - c) : j.frameVal = j.easeOutExpo(b, j.startVal, j.endVal - j.startVal, j.duration) : j.countDown ? (c = (j.startVal - j.endVal) * (b / j.duration), j.frameVal = j.startVal - c) : j.frameVal = j.startVal + (j.endVal - j.startVal) * (b / j.duration),
                j.frameVal = j.countDown ? j.frameVal < j.endVal ? j.endVal: j.frameVal: j.frameVal > j.endVal ? j.endVal: j.frameVal,
                j.frameVal = Math.round(j.frameVal * j.dec) / j.dec,
                j.printValue(j.frameVal),
                    b < j.duration ? j.rAF = requestAnimationFrame(j.count) : null != j.callback && j.callback()
        },
        this.start = function(a) {
            return j.callback = a,
                    isNaN(j.endVal) || isNaN(j.startVal) ? (console.log("countUp error: startVal or endVal is not a number"), j.printValue()) : j.rAF = requestAnimationFrame(j.count),
                !1
        },
        this.stop = function() {
            cancelAnimationFrame(j.rAF)
        },
        this.reset = function() {
            j.startTime = null,
                j.startVal = b,
                cancelAnimationFrame(j.rAF),
                j.printValue(j.startVal)
        },
        this.resume = function() {
            j.stop(),
                j.startTime = null,
                j.duration = j.remaining,
                j.startVal = j.frameVal,
                requestAnimationFrame(j.count)
        },
        this.formatNumber = function(a) {
            a = a.toFixed(j.decimals),
                a += "";
            var b, c, d, e;
            if (b = a.split("."), c = b[0], d = b.length > 1 ? j.options.decimal + b[1] : "", e = /(\d+)(\d{3})/, j.options.useGrouping) for (; e.test(c);) c = c.replace(e, "$1" + j.options.separator + "$2");
            return j.options.prefix + c + d + j.options.suffix
        },
        j.printValue(j.startVal)
} !
    function(a, b) {
        "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.NProgress = b()
    } (this,
        function() {
            function a(a, b, c) {
                return b > a ? b: a > c ? c: a
            }
            function b(a) {
                return 100 * ( - 1 + a)
            }
            function c(a, c, d) {
                var e;
                return e = "translate3d" === i.positionUsing ? {
                    transform: "translate3d(" + b(a) + "%,0,0)"
                }: "translate" === i.positionUsing ? {
                    transform: "translate(" + b(a) + "%,0)"
                }: {
                    "margin-left": b(a) + "%"
                },
                    e.transition = "all " + c + "ms " + d,
                    e
            }
            function d(a, b) {
                var c = "string" == typeof a ? a: g(a);
                return c.indexOf(" " + b + " ") >= 0
            }
            function e(a, b) {
                var c = g(a),
                    e = c + b;
                d(c, b) || (a.className = e.substring(1))
            }
            function f(a, b) {
                var c, e = g(a);
                d(a, b) && (c = e.replace(" " + b + " ", " "), a.className = c.substring(1, c.length - 1))
            }
            function g(a) {
                return (" " + (a.className || "") + " ").replace(/\s+/gi, " ")
            }
            function h(a) {
                a && a.parentNode && a.parentNode.removeChild(a)
            }
            var i, j, k, l = {};
            return l.version = "0.1.6",
                i = l.settings = {
                    minimum: .08,
                    easing: "ease",
                    positionUsing: "",
                    speed: 200,
                    trickle: !0,
                    trickleRate: .02,
                    trickleSpeed: 800,
                    showSpinner: !0,
                    barSelector: '[role="bar"]',
                    spinnerSelector: '[role="spinner"]',
                    parent: "body",
                    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                },
                l.configure = function(a) {
                    var b, c;
                    for (b in a) c = a[b],
                        void 0 !== c && a.hasOwnProperty(b) && (i[b] = c);
                    return this
                },
                l.status = null,
                l.set = function(b) {
                    var d, e, f, g, h = l.isStarted();
                    return b = a(b, i.minimum, 1),
                        l.status = 1 === b ? null: b,
                        d = l.render(!h),
                        e = d.querySelector(i.barSelector),
                        f = i.speed,
                        g = i.easing,
                        d.offsetWidth,
                        j(function(a) {
                            "" === i.positionUsing && (i.positionUsing = l.getPositioningCSS()),
                                k(e, c(b, f, g)),
                                    1 === b ? (k(d, {
                                transition: "none",
                                opacity: 1
                            }), d.offsetWidth, setTimeout(function() {
                                    k(d, {
                                        transition: "all " + f + "ms linear",
                                        opacity: 0
                                    }),
                                        setTimeout(function() {
                                                l.remove(),
                                                    a()
                                            },
                                            f)
                                },
                                f)) : setTimeout(a, f)
                        }),
                        this
                },
                l.isStarted = function() {
                    return "number" == typeof l.status
                },
                l.start = function() {
                    l.status || l.set(0);
                    var a = function() {
                        setTimeout(function() {
                                l.status && (l.trickle(), a())
                            },
                            i.trickleSpeed)
                    };
                    return i.trickle && a(),
                        this
                },
                l.done = function(a) {
                    return a || l.status ? l.inc(.3 + .5 * Math.random()).set(1) : this
                },
                l.inc = function(b) {
                    var c = l.status;
                    return c ? ("number" != typeof b && (b = (1 - c) * a(Math.random() * c, .1, .95)), c = a(c + b, 0, .994), l.set(c)) : l.start()
                },
                l.trickle = function() {
                    return l.inc(Math.random() * i.trickleRate)
                },
                function() {
                    var a = 0,
                        b = 0;
                    l.promise = function(c) {
                        return c && "resolved" != c.state() ? (0 == b && l.start(), a++, b++, c.always(function() {
                            b--,
                                    0 == b ? (a = 0, l.done()) : l.set((a - b) / a)
                        }), this) : this
                    }
                } (),
                l.render = function(a) {
                    var c, d, f, g, j;
                    return l.isRendered() ? document.getElementById("nprogress") : (e(document.documentElement, "nprogress-busy"), c = document.createElement("div"), c.id = "nprogress", c.innerHTML = i.template, f = c.querySelector(i.barSelector), g = a ? "-100": b(l.status || 0), j = document.querySelector(i.parent), k(f, {
                        transition: "all 0 linear",
                        transform: "translate3d(" + g + "%,0,0)"
                    }), i.showSpinner || (d = c.querySelector(i.spinnerSelector), d && h(d)), j != document.body && e(j, "nprogress-custom-parent"), j.appendChild(c), c)
                },
                l.remove = function() {
                    f(document.documentElement, "nprogress-busy"),
                        f(document.querySelector(i.parent), "nprogress-custom-parent");
                    var a = document.getElementById("nprogress");
                    a && h(a)
                },
                l.isRendered = function() {
                    return !! document.getElementById("nprogress")
                },
                l.getPositioningCSS = function() {
                    var a = document.body.style,
                        b = "WebkitTransform" in a ? "Webkit": "MozTransform" in a ? "Moz": "msTransform" in a ? "ms": "OTransform" in a ? "O": "";
                    return b + "Perspective" in a ? "translate3d": b + "Transform" in a ? "translate": "margin"
                },
                j = function() {
                    function a() {
                        var c = b.shift();
                        c && c(a)
                    }
                    var b = [];
                    return function(c) {
                        b.push(c),
                            1 == b.length && a()
                    }
                } (),
                k = function() {
                    function a(a) {
                        return a.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi,
                            function(a, b) {
                                return b.toUpperCase()
                            })
                    }
                    function b(a) {
                        var b, c, d, f = document.body.style;
                        if (a in f) return a;
                        for (c = e.length, d = a.charAt(0).toUpperCase() + a.slice(1); c--;) if (b = e[c] + d, b in f) return b;
                        return a
                    }
                    function c(c) {
                        return c = a(c),
                            f[c] || (f[c] = b(c))
                    }
                    function d(a, b, d) {
                        b = c(b),
                            a.style[b] = d
                    }
                    var e = ["Webkit", "O", "Moz", "ms"],
                        f = {};
                    return function(a, b) {
                        var c, e, f = arguments;
                        if (2 == f.length) for (c in b) e = b[c],
                            void 0 !== e && b.hasOwnProperty(c) && d(a, c, e);
                        else d(a, f[1], f[2])
                    }
                } (),
                l
        }),
    !
        function(a) {
            var b = "waitForImages";
            a.waitForImages = {
                hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"]
            },
                a.expr[":"].uncached = function(b) {
                    if (!a(b).is('img[src!=""]')) return ! 1;
                    var c = new Image;
                    return c.src = b.src,
                        !c.complete
                },
                a.fn.waitForImages = function(c, d, e) {
                    var f = 0,
                        g = 0;
                    if (a.isPlainObject(arguments[0]) && (e = arguments[0].waitForAll, d = arguments[0].each, c = arguments[0].finished), c = c || a.noop, d = d || a.noop, e = !!e, !a.isFunction(c) || !a.isFunction(d)) throw new TypeError("An invalid callback was supplied.");
                    return this.each(function() {
                        var h = a(this),
                            i = [],
                            j = a.waitForImages.hasImageProperties || [],
                            k = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
                        e ? h.find("*").addBack().each(function() {
                            var b = a(this);
                            b.is("img:uncached") && i.push({
                                src: b.attr("src"),
                                element: b[0]
                            }),
                                a.each(j,
                                    function(a, c) {
                                        var d, e = b.css(c);
                                        if (!e) return ! 0;
                                        for (; d = k.exec(e);) i.push({
                                            src: d[2],
                                            element: b[0]
                                        })
                                    })
                        }) : h.find("img:uncached").each(function() {
                            i.push({
                                src: this.src,
                                element: this
                            })
                        }),
                            f = i.length,
                            g = 0,
                            0 === f && c.call(h[0]),
                            a.each(i,
                                function(e, i) {
                                    var j = new Image;
                                    a(j).on("load." + b + " error." + b,
                                        function(a) {
                                            return g++,
                                                d.call(i.element, g, f, "load" == a.type),
                                                    g == f ? (c.call(h[0]), !1) : void 0
                                        }),
                                        j.src = i.src
                                })
                    })
                }
        } (jQuery),
    !
        function(a) {
            "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : a(jQuery)
        } (function(a) {
            function b(a) {
                return h.raw ? a: encodeURIComponent(a)
            }
            function c(a) {
                return h.raw ? a: decodeURIComponent(a)
            }
            function d(a) {
                return b(h.json ? JSON.stringify(a) : String(a))
            }
            function e(a) {
                0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
                try {
                    return a = decodeURIComponent(a.replace(g, " ")),
                        h.json ? JSON.parse(a) : a
                } catch(b) {}
            }
            function f(b, c) {
                var d = h.raw ? b: e(b);
                return a.isFunction(c) ? c(d) : d
            }
            var g = /\+/g,
                h = a.cookie = function(e, g, i) {
                    var j, k, l, m, n, o, p, q, r;
                    if (arguments.length > 1 && !a.isFunction(g)) return i = a.extend({},
                        h.defaults, i),
                        "number" == typeof i.expires && (j = i.expires, k = i.expires = new Date, k.setTime( + k + 864e5 * j)),
                        document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path: "", i.domain ? "; domain=" + i.domain: "", i.secure ? "; secure": ""].join("");
                    for (l = e ? void 0 : {},
                             m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
                        if (p = m[n].split("="), q = c(p.shift()), r = p.join("="), e && e === q) {
                            l = f(r, g);
                            break
                        }
                        e || void 0 === (r = f(r)) || (l[q] = r)
                    }
                    return l
                };
            h.defaults = {},
                a.removeCookie = function(b, c) {
                    return void 0 === a.cookie(b) ? !1 : (a.cookie(b, "", a.extend({},
                        c, {
                            expires: -1
                        })), !a.cookie(b))
                }
        }),
    Placeholdem(document.querySelectorAll("[placeholder]")),
    function() {
        function g(a, b) {
            var e, f, d = a.style;
            for (b = b.charAt(0).toUpperCase() + b.slice(1), f = 0; f < c.length; f++) if (e = c[f] + b, void 0 !== d[e]) return e;
            return void 0 !== d[b] ? b: void 0
        }
        function h(a, b) {
            for (var c in b) a.style[g(a, c) || c] = b[c]
        }
        function i(a, b) {
            var c = document.createElement(a || "div");
            return h(c, b),
                c
        }
        function j(a, b, c) {
            var h, d = b.x,
                e = b.y,
                f = a.pageX - d,
                g = a.pageY - e;
            return h = c > f ? 0 : f > 3 * c ? 1 : c > g ? 2 : 3
        }
        function k(b, c, d) {
            var i, e = c.x,
                f = c.y,
                g = b.pageX - e,
                h = b.pageY - f,
                j = d - g,
                k = d - h,
                l = g >> 1,
                m = h >> 1,
                b = j >> 1,
                n = k >> 1;
            return i = 0 == a ? {
                bx: -d,
                by: 0,
                sx: -1,
                sy: 1,
                bs: "shadowL",
                bmx: -d + g,
                bmy: 0,
                bsw: g,
                bsh: d,
                bsx: j,
                bsy: 0,
                cw: d - l,
                ch: d,
                cx: l,
                cy: 0,
                dw: l,
                dh: d,
                dx: l - (l >> 1),
                dy: 0
            }: 1 == a ? {
                bx: d,
                by: 0,
                sx: -1,
                sy: 1,
                bs: "shadowR",
                bmx: g,
                bmy: 0,
                bsw: j,
                bsh: d,
                bsx: 0,
                bsy: 0,
                cw: d - b,
                ch: d,
                cx: 0,
                cy: 0,
                dw: b,
                dh: d,
                dx: d - j + (b >> 1),
                dy: 0
            }: 2 == a ? {
                bx: 0,
                by: -d,
                sx: 1,
                sy: -1,
                bs: "shadowT",
                bmx: 0,
                bmy: -d + h,
                bsw: d,
                bsh: h,
                bsx: 0,
                bsy: k,
                cw: d,
                ch: d - m,
                cx: 0,
                cy: m,
                dw: d,
                dh: m,
                dx: 0,
                dy: m - (m >> 1)
            }: {
                bx: 0,
                by: d,
                sx: 1,
                sy: -1,
                bs: "shadowB",
                bmx: 0,
                bmy: h,
                bsw: d,
                bsh: k,
                bsx: 0,
                bsy: 0,
                cw: d,
                ch: d - n,
                cx: 0,
                cy: 0,
                dw: d,
                dh: n,
                dx: 0,
                dy: d - k + (n >> 1)
            }
        }
        function l(c, d) {
            var i, l, m, n, o, f = d.container.getBoundingClientRect(),
                g = {
                    x: f.left + window.pageXOffset,
                    y: f.top + window.pageYOffset
                };
            a = j(c, g, d.sizeQ),
                b = k(c, g, d.size),
                b.pos = g,
                i = b.bx,
                l = b.by,
                m = b.sx,
                n = b.sy,
                o = b.bs,
                d.backShadow.className = d.depth.className = "sticker-shadow " + o,
                h(d.mask, {
                    transition: e,
                    width: d.size + "px",
                    height: d.size + "px",
                    transform: "translate(0px, 0px)"
                }),
                h(d.move, {
                    transition: e,
                    transform: "translate(0px, 0px)"
                }),
                h(d.back, {
                    transition: e,
                    transform: "translate(" + i + "px, " + l + "px)"
                }),
                h(d.backImg, {
                    transform: "scaleX(" + m + ") scaleY(" + n + ")"
                }),
                h(d.depth, {
                    transform: "translate(-10000px, -10000px)"
                })
        }
        function m(a, c) {
            if (null != b) {
                var e = b.bx,
                    f = b.by;
                h(c.mask, {
                    transition: d,
                    width: c.size + "px",
                    height: c.size + "px",
                    transform: "translate(0px, 0px)"
                }),
                    h(c.move, {
                        transition: d,
                        transform: "translate(0px, 0px)"
                    }),
                    h(c.back, {
                        transition: d,
                        transform: "translate(" + e + "px, " + f + "px)"
                    }),
                    h(c.depth, {
                        transform: "translate(-10000px, -10000px)"
                    }),
                    b = null
            }
        }
        function n(a, c) {
            null == b && (l(a, c), window.document.addEventListener("mouseup",
                function(a) {
                    this.removeEventListener("mouseup", arguments.callee, !1),
                        m(a, c)
                },
                !1));
            var d = k(a, b.pos, c.size),
                e = d.bmx,
                f = d.bmy,
                g = d.bsw,
                i = d.bsh,
                j = d.bsx,
                n = d.bsy,
                o = d.cw,
                p = d.ch,
                q = d.cx,
                r = d.cy,
                s = d.dw,
                t = d.dh,
                u = d.dx,
                v = d.dy;
            h(c.mask, {
                width: o + "px",
                height: p + "px",
                transform: "translate(" + q + "px, " + r + "px)"
            }),
                h(c.move, {
                    transform: "translate(" + -q + "px, " + -r + "px)"
                }),
                h(c.back, {
                    transform: "translate(" + e + "px, " + f + "px)"
                }),
                h(c.backShadow, {
                    width: g + "px",
                    height: i + "px",
                    transform: "translate(" + j + "px, " + n + "px)"
                }),
                h(c.depth, {
                    width: s + "px",
                    height: t + "px",
                    transform: "translate(" + u + "px, " + v + "px)"
                })
        }
        var a, o, b = null,
            c = ["webkit", "Moz", "ms", "O"],
            d = "all 0.6s cubic-bezier(.23,1,.32,1)",
            e = "all 0s",
            f = document.createElement("style");
        f.appendChild(document.createTextNode("    .shadowL {background: -moz-linear-gradient(right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 1%, rgba(0,0,0,0.7) 100%);background: -webkit-gradient(linear, right top, left top, color-stop(0%,rgba(0,0,0,0)), color-stop(1%,rgba(0,0,0,0.01)), color-stop(100%,rgba(0,0,0,0.7)));background: -webkit-linear-gradient(right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: -o-linear-gradient(right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: -ms-linear-gradient(right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);}    .shadowR {background: -moz-linear-gradient(left, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 1%, rgba(0,0,0,0.7) 100%);background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(1%,rgba(0,0,0,0.01)), color-stop(100%,rgba(0,0,0,0.7)));background: -webkit-linear-gradient(left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: -o-linear-gradient(left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: -ms-linear-gradient(left, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);}    .shadowB {background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 1%, rgba(0,0,0,0.7) 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(1%,rgba(0,0,0,0.01)), color-stop(100%,rgba(0,0,0,0.7)));background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: -o-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: -ms-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);}    .shadowT {background: -moz-linear-gradient(bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 1%, rgba(0,0,0,0.7) 100%);background: -webkit-gradient(linear, left bottom, left top, color-stop(0%,rgba(0,0,0,0)), color-stop(1%,rgba(0,0,0,0.01)), color-stop(100%,rgba(0,0,0,0.7)));background: -webkit-linear-gradient(bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: -o-linear-gradient(bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: -ms-linear-gradient(bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);background: linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.01) 1%,rgba(0,0,0,0.7) 100%);}")),
            document.head.appendChild(f),
            o = {
                init: function p(a) {
                    var c, b, d, e, f, g, h, j, k, o, q, r, s, t, u; {
                        if ("string" != typeof a) return f = a.getBoundingClientRect(),
                            g = f.width,
                            h = g >> 2,
                            j = i("div", {
                                position: "relative",
                                width: g + "px",
                                height: g + "px",
                                overflow: "hidden"
                            }),
                            k = i("div", {
                                position: "relative",
                                width: g + "px",
                                height: g + "px",
                                overflow: "hidden"
                            }),
                            o = i("div", {
                                position: "relative",
                                borderRadius: "50%",
                                width: g + "px",
                                height: g + "px",
                                overflow: "hidden"
                            }),
                            q = i("div", {
                                position: "relative",
                                borderRadius: "50%",
                                width: g + "px",
                                height: g + "px",
                                zIndex: 1
                            }),
                            r = i("div", {
                                position: "absolute",
                                borderRadius: "50%",
                                width: g + "px",
                                height: g + "px",
                                left: "0",
                                top: "0",
                                zIndex: 3,
                                backgroundColor: "#ffffff",
                                transform: "translate(" + g + "px, " + 0 + "px)",
                                overflow: "hidden"
                            }),
                            s = i("div", {
                                position: "relative",
                                borderRadius: "50%",
                                width: g + "px",
                                height: g + "px",
                                opacity: "0.4"
                            }),
                            t = i("div", {
                                position: "absolute",
                                width: g + "px",
                                height: g + "px",
                                left: "0",
                                top: "0",
                                zIndex: 4
                            }),
                            u = i("div", {
                                position: "absolute",
                                width: g + "px",
                                height: g + "px",
                                left: "0",
                                top: "0",
                                zIndex: 1
                            }),
                            q.className = "sticker-img sticker-front",
                            s.className = "sticker-img sticker-back",
                            t.className = u.className = "sticker-shadow",
                            a.appendChild(j),
                            j.appendChild(k),
                            k.appendChild(o),
                            o.appendChild(q),
                            o.appendChild(u),
                            o.appendChild(r),
                            r.appendChild(s),
                            r.appendChild(t),
                            e = {
                                container: j,
                                size: g,
                                sizeQ: h,
                                mask: k,
                                move: o,
                                depth: u,
                                back: r,
                                backImg: s,
                                backShadow: t
                            },
                            a.addEventListener("mouseenter",
                                function(a) {
                                    l(a, e)
                                },
                                !1),
                            a.addEventListener("mouseleave",
                                function(a) {
                                    m(a, e)
                                },
                                !1),
                            a.addEventListener("mousemove",
                                function(a) {
                                    n(a, e)
                                },
                                !1),
                            this;
                        for (b = document.querySelectorAll(a), d = b.length, c = 0; d > c; c++) p(b[c])
                    }
                }
            },
                "object" == typeof exports ? module.exports = o: "function" == typeof define && define.amd ? define(function() {
            return o
        }) : this.Sticker = o
    } (),
    !
        function(a) {
            "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a: a(jQuery)
        } (function(a) {
            function b(b) {
                var q, r, s, g = b || window.event,
                    h = i.call(arguments, 1),
                    j = 0,
                    l = 0,
                    m = 0,
                    n = 0,
                    o = 0,
                    p = 0;
                return b = a.event.fix(g),
                    b.type = "mousewheel",
                    "detail" in g && (m = -1 * g.detail),
                    "wheelDelta" in g && (m = g.wheelDelta),
                    "wheelDeltaY" in g && (m = g.wheelDeltaY),
                    "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
                    "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0),
                    j = 0 === m ? l: m,
                    "deltaY" in g && (m = -1 * g.deltaY, j = m),
                    "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)),
                        0 !== m || 0 !== l ? (1 === g.deltaMode ? (q = a.data(this, "mousewheel-line-height"), j *= q, m *= q, l *= q) : 2 === g.deltaMode && (r = a.data(this, "mousewheel-page-height"), j *= r, m *= r, l *= r), n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor": "ceil"](j / f), l = Math[l >= 1 ? "floor": "ceil"](l / f), m = Math[m >= 1 ? "floor": "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect && (s = this.getBoundingClientRect(), o = b.clientX - s.left, p = b.clientY - s.top), b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)) : void 0
            }
            function c() {
                f = null
            }
            function d(a, b) {
                return k.settings.adjustOldDeltas && "mousewheel" === a.type && 0 === b % 120
            }
            var e, f, j, k, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                i = Array.prototype.slice;
            if (a.event.fixHooks) for (j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
            k = a.event.special.mousewheel = {
                version: "3.1.12",
                setup: function() {
                    if (this.addEventListener) for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
                    else this.onmousewheel = b;
                    a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
                        a.data(this, "mousewheel-page-height", k.getPageHeight(this))
                },
                teardown: function() {
                    if (this.removeEventListener) for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
                    else this.onmousewheel = null;
                    a.removeData(this, "mousewheel-line-height"),
                        a.removeData(this, "mousewheel-page-height")
                },
                getLineHeight: function(b) {
                    var c = a(b),
                        d = c["offsetParent" in a.fn ? "offsetParent": "parent"]();
                    return d.length || (d = a("body")),
                        parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
                },
                getPageHeight: function(b) {
                    return a(b).height()
                },
                settings: {
                    adjustOldDeltas: !0,
                    normalizeOffset: !0
                }
            },
                a.fn.extend({
                    mousewheel: function(a) {
                        return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
                    },
                    unmousewheel: function(a) {
                        return this.unbind("mousewheel", a)
                    }
                })
        }),
    jQuery.fn.formerize = function() {
        var a = new Array,
            b = jQuery(this);
        return b.find("input[type=text],textarea").each(function() {
            var a = jQuery(this); ("" == a.val() || a.val() == a.attr("placeholder")) && (a.addClass("formerize-placeholder"), a.val(a.attr("placeholder")))
        }).blur(function() {
            var a = jQuery(this);
            a.attr("name").match(/_fakeformerizefield$/) || "" == a.val() && (a.addClass("formerize-placeholder"), a.val(a.attr("placeholder")))
        }).focus(function() {
            var a = jQuery(this);
            a.attr("name").match(/_fakeformerizefield$/) || a.val() == a.attr("placeholder") && (a.removeClass("formerize-placeholder"), a.val(""))
        }),
            b.find("input[type=password]").each(function() {
                var a = jQuery(this),
                    b = jQuery(jQuery("<div>").append(a.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, "type=text"));
                "" != a.attr("id") && b.attr("id", a.attr("id") + "_fakeformerizefield"),
                    "" != a.attr("name") && b.attr("name", a.attr("name") + "_fakeformerizefield"),
                    b.addClass("formerize-placeholder").val(b.attr("placeholder")).insertAfter(a),
                        "" == a.val() ? a.hide() : b.hide(),
                    a.blur(function(a) {
                        var b, c;
                        a.preventDefault(),
                            b = jQuery(this),
                            c = b.parent().find("input[name=" + b.attr("name") + "_fakeformerizefield]"),
                            "" == b.val() && (b.hide(), c.show())
                    }),
                    b.focus(function(a) {
                        var b, c;
                        a.preventDefault(),
                            b = jQuery(this),
                            c = b.parent().find("input[name=" + b.attr("name").replace("_fakeformerizefield", "") + "]"),
                            b.hide(),
                            c.show().focus()
                    }),
                    b.keypress(function(a) {
                        a.preventDefault(),
                            b.val("")
                    })
            }),
            b.submit(function() {
                jQuery(this).find("input[type=text],input[type=password],textarea").each(function() {
                    var b = jQuery(this);
                    b.attr("name").match(/_fakeformerizefield$/) && b.attr("name", ""),
                        b.val() == b.attr("placeholder") && (b.removeClass("formerize-placeholder"), b.val(""))
                })
            }).bind("reset",
                function(b) {
                    b.preventDefault(),
                        jQuery(this).find("select").val(jQuery("option:first").val()),
                        jQuery(this).find("input,textarea").each(function() {
                            var b, a = jQuery(this);
                            switch (a.removeClass("formerize-placeholder"), this.type) {
                                case "submit":
                                case "reset":
                                    break;
                                case "password":
                                    a.val(a.attr("defaultValue")),
                                        b = a.parent().find("input[name=" + a.attr("name") + "_fakeformerizefield]"),
                                            "" == a.val() ? (a.hide(), b.show()) : (a.show(), b.hide());
                                    break;
                                case "checkbox":
                                case "radio":
                                    a.attr("checked", a.attr("defaultValue"));
                                    break;
                                case "text":
                                case "textarea":
                                    a.val(a.attr("defaultValue")),
                                        "" == a.val() && (a.addClass("formerize-placeholder"), a.val(a.attr("placeholder")));
                                    break;
                                default:
                                    a.val(a.attr("defaultValue"))
                            }
                        }),
                        window.setTimeout(function() {
                                for (x in a) a[x].trigger("formerize_sync")
                            },
                            10)
                }),
            b
    },
    jQuery.fn.scrolly = function(a, b) {
        a || (a = 1e3),
            b || (b = 0),
            jQuery(this).off("click.scrolly").on("click.scrolly",
                function(c) {
                    var f, d = jQuery(this),
                        e = d.attr("href");
                    "#" == e.charAt(0) && 1 < e.length && 0 < (f = jQuery(e)).length && (e = f.offset().top, d.hasClass("scrolly-centered") ? d = e - ($(window).height() - f.outerHeight()) / 2 : (d = Math.max(e, 0), b && (d = "function" == typeof b ? d - b() : d - b)), c.preventDefault(), jQuery("body,html").stop().animate({
                            scrollTop: d
                        },
                        a, "swing"))
                })
    },
    function() {
        var a = "scrollwatch",
            b = "length",
            c = null,
            d = "top",
            e = "rangeMin",
            f = "rangeMax",
            g = "scrollgress",
            h = "data",
            i = "scrollwatch-state",
            j = !1,
            k = "anchor",
            l = "unscrollwatch",
            m = "unscrollgress",
            n = "removeData",
            o = "element",
            p = "-id",
            q = "scroll.",
            r = "height",
            s = "scrollTop",
            t = "center",
            u = "bottom",
            v = $(window),
            w = $(document),
            x = 1e3;
        jQuery.fn[a] = function(l) {
            var m, n, o, p;
            if (this[b] > 1) {
                for (m = 0; m < this[b]; m++) $(this[m])[a](l);
                return this
            }
            return n = jQuery.extend({
                    range: .5,
                    rangeMin: c,
                    rangeMax: c,
                    anchor: d,
                    init: c,
                    on: c,
                    off: c,
                    delay: 0
                },
                l),
                n[e] === c && (n[e] = -1 * n.range),
                n[f] === c && (n[f] = n.range),
                o = $(this),
                n.init && n.init(o),
                o[h](i, -1)[g](function(a) {
                        window.clearTimeout(p),
                            p = window.setTimeout(function() {
                                    var b, c, d = parseInt(o[h](i));
                                    return (0 == d || -1 == d) && (b = n[e] === j || a >= n[e], c = n[f] === j || a <= n[f], b && c) ? (o[h](i, 1), n.on && n.on(o), void 0) : (1 == d || -1 == d) && (b = n[e] !== j && a < n[e], c = n[f] !== j && a > n[f], b || c) ? (o[h](i, 0), n.off && n.off(o), void 0) : void 0
                                },
                                n.delay)
                    },
                    {
                        anchor: n[k]
                    },
                    a),
                o
        },
            jQuery.fn[l] = function() {
                var c, d;
                if (this[b] > 1) {
                    for (c = 0; c < this[b]; c++) $(this[c])[l]();
                    return this
                }
                return d = $(this),
                    d[n](i, 0)[m](a),
                    d
            },
            jQuery.fn[g] = function(a, c, e) {
                var f, i, j, l, m;
                if (0 == this[b]) return $(this);
                if (this[b] > 1) {
                    for (f = 0; f < this[b]; f++) $(this[f])[g](a, c, e);
                    return $(this)
                }
                return e || (e = g),
                    i = jQuery.extend({
                            anchor: d,
                            direction: "both",
                            scope: o,
                            easing: 0
                        },
                        c),
                    j = $(this),
                    j[h](e + p) || j[h](e + p, x++),
                    l = j[h](e + p),
                    m = q + e + "-" + l,
                    v.off(m).on(m,
                        function() {
                            var b, c = j.offset()[d],
                                e = j.outerHeight();
                            switch (w[r](), i.scope) {
                                default:
                                case o:
                                    switch (i[k]) {
                                        default:
                                        case d:
                                            b = -1 * ((c - v[s]()) / e);
                                            break;
                                        case t:
                                            b = -1 * ((c - v[s]() - (v[r]() - e) / 2) / e);
                                            break;
                                        case u:
                                            b = -1 * ((c - v[s]() - (v[r]() - e)) / e)
                                    }
                                    break;
                                case "window":
                                    switch (i[k]) {
                                        default:
                                        case d:
                                            b = -1 * ((c - v[s]()) / v[r]());
                                            break;
                                        case t:
                                            b = -1 * ((c - v[s]() - (v[r]() - e) / 2) / v[r]());
                                            break;
                                        case u:
                                            b = -1 * ((c - v[s]() - (v[r]() - e)) / v[r]())
                                    }
                            }
                            "forwards" == i.direction ? b = Math.max(0, b) : "backwards" == i.direction && (b = Math.min(0, b)),
                                    b > 0 ? b = Math.max(0, b - i.easing / 100) : 0 > b && (b = Math.min(0, b + i.easing / 100)),
                                a(b, j)
                        }).trigger("scroll"),
                    j
            },
            jQuery.fn[m] = function(a) {
                var c, d, e, f;
                if (0 == this[b]) return $(this);
                if (this[b] > 1) {
                    for (c = 0; c < this[b]; c++) $(this[c])[m](a);
                    return $(this)
                }
                return a || (a = g),
                    d = $(this),
                    d[h](a + p) ? (e = d[h](a + p), f = q + a + "-" + e, v.off(f), d[n](a + p), d) : d
            }
    } (),
    function(a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
    } (function(a) {
        var j, k, l, m, n, o, p, q, r, s, t, b = !1,
            c = !1,
            d = 5e3,
            e = 2e3,
            f = 0,
            g = ["ms", "moz", "webkit", "o"],
            h = window.requestAnimationFrame || !1,
            i = window.cancelAnimationFrame || !1;
        if (!h) for (j in g) k = g[j],
            h || (h = window[k + "RequestAnimationFrame"]),
            i || (i = window[k + "CancelAnimationFrame"] || window[k + "CancelRequestAnimationFrame"]);
        l = window.MutationObserver || window.WebKitMutationObserver || !1,
            m = {
                zindex: "auto",
                cursoropacitymin: 0,
                cursoropacitymax: 1,
                cursorcolor: "#424242",
                cursorwidth: "5px",
                cursorborder: "1px solid #fff",
                cursorborderradius: "5px",
                scrollspeed: 60,
                mousescrollstep: 24,
                touchbehavior: !1,
                hwacceleration: !0,
                usetransition: !0,
                boxzoom: !1,
                dblclickzoom: !0,
                gesturezoom: !0,
                grabcursorenabled: !0,
                autohidemode: !0,
                background: "",
                iframeautoresize: !0,
                cursorminheight: 32,
                preservenativescrolling: !0,
                railoffset: !1,
                bouncescroll: !0,
                spacebarenabled: !0,
                railpadding: {
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0
                },
                disableoutline: !0,
                horizrailenabled: !0,
                railalign: "right",
                railvalign: "bottom",
                enabletranslate3d: !0,
                enablemousewheel: !0,
                enablekeyboard: !0,
                smoothscroll: !0,
                sensitiverail: !0,
                enablemouselockapi: !0,
                cursorfixedheight: !1,
                directionlockdeadzone: 6,
                hidecursordelay: 400,
                nativeparentscrolling: !0,
                enablescrollonselection: !0,
                overflowx: !0,
                overflowy: !0,
                cursordragspeed: .3,
                rtlmode: "auto",
                cursordragontouch: !1,
                oneaxismousemode: "auto",
                scriptpath: function() {
                    var a = document.getElementsByTagName("script"),
                        a = a[a.length - 1].src.split("?")[0];
                    return 0 < a.split("/").length ? a.split("/").slice(0, -1).join("/") + "/": ""
                } ()
            },
            n = !1,
            o = function() {
                var a, b, c, d, e, f;
                if (n) return n;
                a = document.createElement("DIV"),
                    b = {
                        haspointerlock: "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document
                    },
                    b.isopera = "opera" in window,
                    b.isopera12 = b.isopera && "getUserMedia" in navigator,
                    b.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini),
                    b.isie = "all" in document && "attachEvent" in a && !b.isopera,
                    b.isieold = b.isie && !("msInterpolationMode" in a.style),
                    b.isie7 = !(!b.isie || b.isieold || "documentMode" in document && 7 != document.documentMode),
                    b.isie8 = b.isie && "documentMode" in document && 8 == document.documentMode,
                    b.isie9 = b.isie && "performance" in window && 9 <= document.documentMode,
                    b.isie10 = b.isie && "performance" in window && 10 <= document.documentMode,
                    b.isie9mobile = /iemobile.9/i.test(navigator.userAgent),
                    b.isie9mobile && (b.isie9 = !1),
                    b.isie7mobile = !b.isie9mobile && b.isie7 && /iemobile/i.test(navigator.userAgent),
                    b.ismozilla = "MozAppearance" in a.style,
                    b.iswebkit = "WebkitAppearance" in a.style,
                    b.ischrome = "chrome" in window,
                    b.ischrome22 = b.ischrome && b.haspointerlock,
                    b.ischrome26 = b.ischrome && "transition" in a.style,
                    b.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window,
                    b.hasmstouch = window.navigator.msPointerEnabled || !1,
                    b.ismac = /^mac$/i.test(navigator.platform),
                    b.isios = b.cantouch && /iphone|ipad|ipod/i.test(navigator.platform),
                    b.isios4 = b.isios && !("seal" in Object),
                    b.isandroid = /android/i.test(navigator.userAgent),
                    b.trstyle = !1,
                    b.hastransform = !1,
                    b.hastranslate3d = !1,
                    b.transitionstyle = !1,
                    b.hastransition = !1,
                    b.transitionend = !1;
                for (c = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"], d = 0; d < c.length; d++) if ("undefined" != typeof a.style[c[d]]) {
                    b.trstyle = c[d];
                    break
                }
                for (b.hastransform = 0 != b.trstyle, b.hastransform && (a.style[b.trstyle] = "translate3d(1px,2px,3px)", b.hastranslate3d = /translate3d/.test(a.style[b.trstyle])), b.transitionstyle = !1, b.prefixstyle = "", b.transitionend = !1, c = "transition webkitTransition MozTransition OTransition OTransition msTransition KhtmlTransition".split(" "), e = " -webkit- -moz- -o- -o -ms- -khtml-".split(" "), f = "transitionend webkitTransitionEnd transitionend otransitionend oTransitionEnd msTransitionEnd KhtmlTransitionEnd".split(" "), d = 0; d < c.length; d++) if (c[d] in a.style) {
                    b.transitionstyle = c[d],
                        b.prefixstyle = e[d],
                        b.transitionend = f[d];
                    break
                }
                b.ischrome26 && (b.prefixstyle = e[1]),
                    b.hastransition = b.transitionstyle;
                a: {
                    for (c = ["-moz-grab", "-webkit-grab", "grab"], (b.ischrome && !b.ischrome22 || b.isie) && (c = []), d = 0; d < c.length; d++) if (e = c[d], a.style.cursor = e, a.style.cursor == e) {
                        c = e;
                        break a
                    }
                    c = "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"
                }
                return b.cursorgrabvalue = c,
                    b.hasmousecapture = "setCapture" in a,
                    b.hasMutationObserver = !1 !== l,
                    n = b
            },
            p = function(g, j) {
                function k() {
                    var b, a = s.win;
                    if ("zIndex" in a) return a.zIndex();
                    for (; 0 < a.length && 9 != a[0].nodeType;) {
                        if (b = a.css("zIndex"), !isNaN(b) && 0 != b) return parseInt(b);
                        a = a.parent()
                    }
                    return ! 1
                }
                function n(a, b, c) {
                    return b = a.css(b),
                        a = parseFloat(b),
                        isNaN(a) ? (a = x[b] || 0, c = 3 == a ? c ? s.win.outerHeight() - s.win.innerHeight() : s.win.outerWidth() - s.win.innerWidth() : 1, s.isie8 && a && (a += 1), c ? a: 0) : a
                }
                function p(a, b, c, d) {
                    s._bind(a, b,
                        function(d) {
                            d = d ? d: window.event;
                            var e = {
                                original: d,
                                target: d.target || d.srcElement,
                                type: "wheel",
                                deltaMode: "MozMousePixelScroll" == d.type ? 0 : 1,
                                deltaX: 0,
                                deltaZ: 0,
                                preventDefault: function() {
                                    return d.preventDefault ? d.preventDefault() : d.returnValue = !1,
                                        !1
                                },
                                stopImmediatePropagation: function() {
                                    d.stopImmediatePropagation ? d.stopImmediatePropagation() : d.cancelBubble = !0
                                }
                            };
                            return "mousewheel" == b ? (e.deltaY = -.025 * d.wheelDelta, d.wheelDeltaX && (e.deltaX = -.025 * d.wheelDeltaX)) : e.deltaY = d.detail,
                                c.call(a, e)
                        },
                        d)
                }
                function r(a, b, c) {
                    var d, e;
                    if (0 == a.deltaMode ? (d = -Math.floor(a.deltaX * (s.opt.mousescrollstep / 54)), e = -Math.floor(a.deltaY * (s.opt.mousescrollstep / 54))) : 1 == a.deltaMode && (d = -Math.floor(a.deltaX * s.opt.mousescrollstep), e = -Math.floor(a.deltaY * s.opt.mousescrollstep)), b && s.opt.oneaxismousemode && 0 == d && e && (d = e, e = 0), d && (s.scrollmom && s.scrollmom.stop(), s.lastdeltax += d, s.debounced("mousewheelx",
                        function() {
                            var a = s.lastdeltax;
                            s.lastdeltax = 0,
                                s.rail.drag || s.doScrollLeftBy(a)
                        },
                        15)), e) {
                        if (s.opt.nativeparentscrolling && c && !s.ispage && !s.zoomactive) if (0 > e) {
                            if (s.getScrollTop() >= s.page.maxh) return ! 0
                        } else if (0 >= s.getScrollTop()) return ! 0;
                        s.scrollmom && s.scrollmom.stop(),
                            s.lastdeltay += e,
                            s.debounced("mousewheely",
                                function() {
                                    var a = s.lastdeltay;
                                    s.lastdeltay = 0,
                                        s.rail.drag || s.doScrollBy(a)
                                },
                                15)
                    }
                    return a.stopImmediatePropagation(),
                        a.preventDefault()
                }
                var t, u, v, w, x, s = this;
                if (this.version = "3.5.4", this.name = "nicescroll", this.me = j, this.opt = {
                    doc: a("body"),
                    win: !1
                },
                    a.extend(this.opt, m), this.opt.snapbackspeed = 80, g) for (t in s.opt)"undefined" != typeof g[t] && (s.opt[t] = g[t]);
                this.iddoc = (this.doc = s.opt.doc) && this.doc[0] ? this.doc[0].id || "": "",
                    this.ispage = /^BODY|HTML/.test(s.opt.win ? s.opt.win[0].nodeName: this.doc[0].nodeName),
                    this.haswrapper = !1 !== s.opt.win,
                    this.win = s.opt.win || (this.ispage ? a(window) : this.doc),
                    this.docscroll = this.ispage && !this.haswrapper ? a(window) : this.win,
                    this.body = a("body"),
                    this.iframe = this.isfixed = this.viewport = !1,
                    this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName,
                    this.istextarea = "TEXTAREA" == this.win[0].nodeName,
                    this.forcescreen = !1,
                    this.canshowonmouseevent = "scroll" != s.opt.autohidemode,
                    this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1,
                    this.scroll = {
                        x: 0,
                        y: 0
                    },
                    this.scrollratio = {
                        x: 0,
                        y: 0
                    },
                    this.cursorheight = 20,
                    this.scrollvaluemax = 0,
                    this.observerremover = this.observer = this.scrollmom = this.scrollrunning = this.isrtlmode = !1;
                do this.id = "ascrail" + e++;
                while (document.getElementById(this.id));
                this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1,
                    this.visibility = !0,
                    this.hidden = this.locked = !1,
                    this.cursoractive = !0,
                    this.wheelprevented = !1,
                    this.overflowx = s.opt.overflowx,
                    this.overflowy = s.opt.overflowy,
                    this.nativescrollingarea = !1,
                    this.checkarea = 0,
                    this.events = [],
                    this.saved = {},
                    this.delaylist = {},
                    this.synclist = {},
                    this.lastdeltay = this.lastdeltax = 0,
                    this.detected = o(),
                    u = a.extend({},
                        this.detected),
                    this.ishwscroll = (this.canhwscroll = u.hastransform && s.opt.hwacceleration) && s.haswrapper,
                    this.istouchcapable = !1,
                    u.cantouch && u.ischrome && !u.isios && !u.isandroid && (this.istouchcapable = !0, u.cantouch = !1),
                    u.cantouch && u.ismozilla && !u.isios && !u.isandroid && (this.istouchcapable = !0, u.cantouch = !1),
                    s.opt.enablemouselockapi || (u.hasmousecapture = !1, u.haspointerlock = !1),
                    this.delayed = function(a, b, c, d) {
                        var e = s.delaylist[a],
                            f = (new Date).getTime();
                        return ! d && e && e.tt ? !1 : (e && e.tt && clearTimeout(e.tt), e && e.last + c > f && !e.tt ? s.delaylist[a] = {
                            last: f + c,
                            tt: setTimeout(function() {
                                    s && (s.delaylist[a].tt = 0, b.call())
                                },
                                c)
                        }: e && e.tt || (s.delaylist[a] = {
                            last: f,
                            tt: 0
                        },
                            setTimeout(function() {
                                    b.call()
                                },
                                0)), void 0)
                    },
                    this.debounced = function(a, b, c) {
                        var d = s.delaylist[a]; (new Date).getTime(),
                            s.delaylist[a] = b,
                            d || setTimeout(function() {
                                var b = s.delaylist[a];
                                s.delaylist[a] = !1,
                                    b.call()
                            },
                            c)
                    },
                    v = !1,
                    this.synched = function(a, b) {
                        return s.synclist[a] = b,
                            function() {
                                v || (h(function() {
                                    v = !1;
                                    for (a in s.synclist) {
                                        var b = s.synclist[a];
                                        b && b.call(s),
                                            s.synclist[a] = !1
                                    }
                                }), v = !0)
                            } (),
                            a
                    },
                    this.unsynched = function(a) {
                        s.synclist[a] && (s.synclist[a] = !1)
                    },
                    this.css = function(a, b) {
                        for (var c in b) s.saved.css.push([a, c, a.css(c)]),
                            a.css(c, b[c])
                    },
                    this.scrollTop = function(a) {
                        return "undefined" == typeof a ? s.getScrollTop() : s.setScrollTop(a)
                    },
                    this.scrollLeft = function(a) {
                        return "undefined" == typeof a ? s.getScrollLeft() : s.setScrollLeft(a)
                    },
                    BezierClass = function(a, b, c, d, e, f, g) {
                        this.st = a,
                            this.ed = b,
                            this.spd = c,
                            this.p1 = d || 0,
                            this.p2 = e || 1,
                            this.p3 = f || 0,
                            this.p4 = g || 1,
                            this.ts = (new Date).getTime(),
                            this.df = this.ed - this.st
                    },
                    BezierClass.prototype = {
                        B2: function(a) {
                            return 3 * a * a * (1 - a)
                        },
                        B3: function(a) {
                            return 3 * a * (1 - a) * (1 - a)
                        },
                        B4: function(a) {
                            return (1 - a) * (1 - a) * (1 - a)
                        },
                        getNow: function() {
                            var a = 1 - ((new Date).getTime() - this.ts) / this.spd,
                                b = this.B2(a) + this.B3(a) + this.B4(a);
                            return 0 > a ? this.ed: this.st + Math.round(this.df * b)
                        },
                        update: function(a, b) {
                            return this.st = this.getNow(),
                                this.ed = a,
                                this.spd = b,
                                this.ts = (new Date).getTime(),
                                this.df = this.ed - this.st,
                                this
                        }
                    },
                    this.ishwscroll ? (this.doc.translate = {
                        x: 0,
                        y: 0,
                        tx: "0px",
                        ty: "0px"
                    },
                        u.hastranslate3d && u.isios && this.doc.css("-webkit-backface-visibility", "hidden"), w = function() {
                        var a = s.doc.css(u.trstyle);
                        return a && "matrix" == a.substr(0, 6) ? a.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
                    },
                        this.getScrollTop = function(a) {
                            if (!a) {
                                if (a = w()) return 16 == a.length ? -a[13] : -a[5];
                                if (s.timerscroll && s.timerscroll.bz) return s.timerscroll.bz.getNow()
                            }
                            return s.doc.translate.y
                        },
                        this.getScrollLeft = function(a) {
                            if (!a) {
                                if (a = w()) return 16 == a.length ? -a[12] : -a[4];
                                if (s.timerscroll && s.timerscroll.bh) return s.timerscroll.bh.getNow()
                            }
                            return s.doc.translate.x
                        },
                        this.notifyScrollEvent = document.createEvent ?
                            function(a) {
                                var b = document.createEvent("UIEvents");
                                b.initUIEvent("scroll", !1, !0, window, 1),
                                    a.dispatchEvent(b)
                            }: document.fireEvent ?
                            function(a) {
                                var b = document.createEventObject();
                                a.fireEvent("onscroll"),
                                    b.cancelBubble = !0
                            }: function() {},
                            u.hastranslate3d && s.opt.enabletranslate3d ? (this.setScrollTop = function(a, b) {
                        s.doc.translate.y = a,
                            s.doc.translate.ty = -1 * a + "px",
                            s.doc.css(u.trstyle, "translate3d(" + s.doc.translate.tx + "," + s.doc.translate.ty + ",0px)"),
                            b || s.notifyScrollEvent(s.win[0])
                    },
                        this.setScrollLeft = function(a, b) {
                            s.doc.translate.x = a,
                                s.doc.translate.tx = -1 * a + "px",
                                s.doc.css(u.trstyle, "translate3d(" + s.doc.translate.tx + "," + s.doc.translate.ty + ",0px)"),
                                b || s.notifyScrollEvent(s.win[0])
                        }) : (this.setScrollTop = function(a, b) {
                        s.doc.translate.y = a,
                            s.doc.translate.ty = -1 * a + "px",
                            s.doc.css(u.trstyle, "translate(" + s.doc.translate.tx + "," + s.doc.translate.ty + ")"),
                            b || s.notifyScrollEvent(s.win[0])
                    },
                        this.setScrollLeft = function(a, b) {
                            s.doc.translate.x = a,
                                s.doc.translate.tx = -1 * a + "px",
                                s.doc.css(u.trstyle, "translate(" + s.doc.translate.tx + "," + s.doc.translate.ty + ")"),
                                b || s.notifyScrollEvent(s.win[0])
                        })) : (this.getScrollTop = function() {
                        return s.docscroll.scrollTop()
                    },
                        this.setScrollTop = function(a) {
                            return s.docscroll.scrollTop(a)
                        },
                        this.getScrollLeft = function() {
                            return s.docscroll.scrollLeft()
                        },
                        this.setScrollLeft = function(a) {
                            return s.docscroll.scrollLeft(a)
                        }),
                    this.getTarget = function(a) {
                        return a ? a.target ? a.target: a.srcElement ? a.srcElement: !1 : !1
                    },
                    this.hasParent = function(a, b) {
                        if (!a) return ! 1;
                        for (var c = a.target || a.srcElement || a || !1; c && c.id != b;) c = c.parentNode || !1;
                        return ! 1 !== c
                    },
                    x = {
                        thin: 1,
                        medium: 3,
                        thick: 5
                    },
                    this.getOffset = function() {
                        if (s.isfixed) return {
                            top: parseFloat(s.win.css("top")),
                            left: parseFloat(s.win.css("left"))
                        };
                        if (!s.viewport) return s.win.offset();
                        var a = s.win.offset(),
                            b = s.viewport.offset();
                        return {
                            top: a.top - b.top + s.viewport.scrollTop(),
                            left: a.left - b.left + s.viewport.scrollLeft()
                        }
                    },
                    this.updateScrollBar = function(a) {
                        var b, c, d, e;
                        s.ishwscroll ? (s.rail.css({
                            height: s.win.innerHeight()
                        }), s.railh && s.railh.css({
                            width: s.win.innerWidth()
                        })) : (b = s.getOffset(), c = b.top, d = b.left, c += n(s.win, "border-top-width", !0), s.win.outerWidth(), s.win.innerWidth(), d += s.rail.align ? s.win.outerWidth() - n(s.win, "border-right-width") - s.rail.width: n(s.win, "border-left-width"), e = s.opt.railoffset, e && (e.top && (c += e.top), s.rail.align && e.left && (d += e.left)), s.locked || s.rail.css({
                            top: c,
                            left: d,
                            height: a ? a.h: s.win.innerHeight()
                        }), s.zoom && s.zoom.css({
                            top: c + 1,
                            left: 1 == s.rail.align ? d - 20 : d + s.rail.width + 4
                        }), s.railh && !s.locked && (c = b.top, d = b.left, a = s.railh.align ? c + n(s.win, "border-top-width", !0) + s.win.innerHeight() - s.railh.height: c + n(s.win, "border-top-width", !0), d += n(s.win, "border-left-width"), s.railh.css({
                            top: a,
                            left: d,
                            width: s.railh.width
                        })))
                    },
                    this.doRailClick = function(a, b, c) {
                        var d;
                        s.locked || (s.cancelEvent(a), b ? (b = c ? s.doScrollLeft: s.doScrollTop, d = c ? (a.pageX - s.railh.offset().left - s.cursorwidth / 2) * s.scrollratio.x: (a.pageY - s.rail.offset().top - s.cursorheight / 2) * s.scrollratio.y, b(d)) : (b = c ? s.doScrollLeftBy: s.doScrollBy, d = c ? s.scroll.x: s.scroll.y, a = c ? a.pageX - s.railh.offset().left: a.pageY - s.rail.offset().top, c = c ? s.view.w: s.view.h, d >= a ? b(c) : b( - c)))
                    },
                    s.hasanimationframe = h,
                    s.hascancelanimationframe = i,
                    s.hasanimationframe ? s.hascancelanimationframe || (i = function() {
                        s.cancelAnimationFrame = !0
                    }) : (h = function(a) {
                        return setTimeout(a, 15 - Math.floor( + new Date / 1e3) % 16)
                    },
                        i = clearInterval),
                    this.init = function() {
                        var e, g, h, i, j, n, m, o, p, r, t, v;
                        if (s.saved.css = [], u.isie7mobile || u.isoperamini) return ! 0;
                        if (u.hasmstouch && s.css(s.ispage ? a("html") : s.win, {
                            "-ms-touch-action": "none"
                        }), s.zindex = "auto", s.zindex = s.ispage || "auto" != s.opt.zindex ? s.opt.zindex: k() || "auto", !s.ispage && "auto" != s.zindex && s.zindex > f && (f = s.zindex), s.isie && 0 == s.zindex && "auto" == s.opt.zindex && (s.zindex = "auto"), !s.ispage || !u.cantouch && !u.isieold && !u.isie9mobile) {
                            e = s.docscroll,
                                s.ispage && (e = s.haswrapper ? s.win: s.doc),
                                u.isie9mobile || s.css(e, {
                                "overflow-y": "hidden"
                            }),
                                s.ispage && u.isie7 && ("BODY" == s.doc[0].nodeName ? s.css(a("html"), {
                                "overflow-y": "hidden"
                            }) : "HTML" == s.doc[0].nodeName && s.css(a("body"), {
                                "overflow-y": "hidden"
                            })),
                                u.isios && !s.ispage && !s.haswrapper && s.css(a("body"), {
                                "-webkit-overflow-scrolling": "touch"
                            }),
                                g = a(document.createElement("div")),
                                g.css({
                                    position: "relative",
                                    top: 0,
                                    "float": "right",
                                    width: s.opt.cursorwidth,
                                    height: "0px",
                                    "background-color": s.opt.cursorcolor,
                                    border: s.opt.cursorborder,
                                    "background-clip": "padding-box",
                                    "-webkit-border-radius": s.opt.cursorborderradius,
                                    "-moz-border-radius": s.opt.cursorborderradius,
                                    "border-radius": s.opt.cursorborderradius
                                }),
                                g.hborder = parseFloat(g.outerHeight() - g.innerHeight()),
                                s.cursor = g,
                                h = a(document.createElement("div")),
                                h.attr("id", s.id),
                                h.addClass("nicescroll-rails"),
                                m = ["left", "right"];
                            for (n in m) j = m[n],
                                (i = s.opt.railpadding[j]) ? h.css("padding-" + j, i + "px") : s.opt.railpadding[j] = 0;
                            h.append(g),
                                h.width = Math.max(parseFloat(s.opt.cursorwidth), g.outerWidth()) + s.opt.railpadding.left + s.opt.railpadding.right,
                                h.css({
                                    width: h.width + "px",
                                    zIndex: s.zindex,
                                    background: s.opt.background,
                                    cursor: "default"
                                }),
                                h.visibility = !0,
                                h.scrollable = !0,
                                h.align = "left" == s.opt.railalign ? 0 : 1,
                                s.rail = h,
                                g = s.rail.drag = !1,
                                s.opt.boxzoom && !s.ispage && !u.isieold && (g = document.createElement("div"), s.bind(g, "click", s.doZoom), s.zoom = a(g), s.zoom.css({
                                cursor: "pointer",
                                "z-index": s.zindex,
                                backgroundImage: "url(" + s.opt.scriptpath + "zoomico.png)",
                                height: 18,
                                width: 18,
                                backgroundPosition: "0px 0px"
                            }), s.opt.dblclickzoom && s.bind(s.win, "dblclick", s.doZoom), u.cantouch && s.opt.gesturezoom && (s.ongesturezoom = function(a) {
                                return 1.5 < a.scale && s.doZoomIn(a),
                                    .8 > a.scale && s.doZoomOut(a),
                                    s.cancelEvent(a)
                            },
                                s.bind(s.win, "gestureend", s.ongesturezoom))),
                                s.railh = !1,
                                s.opt.horizrailenabled && (s.css(e, {
                                "overflow-x": "hidden"
                            }), g = a(document.createElement("div")), g.css({
                                position: "relative",
                                top: 0,
                                height: s.opt.cursorwidth,
                                width: "0px",
                                "background-color": s.opt.cursorcolor,
                                border: s.opt.cursorborder,
                                "background-clip": "padding-box",
                                "-webkit-border-radius": s.opt.cursorborderradius,
                                "-moz-border-radius": s.opt.cursorborderradius,
                                "border-radius": s.opt.cursorborderradius
                            }), g.wborder = parseFloat(g.outerWidth() - g.innerWidth()), s.cursorh = g, o = a(document.createElement("div")), o.attr("id", s.id + "-hr"), o.addClass("nicescroll-rails"), o.height = Math.max(parseFloat(s.opt.cursorwidth), g.outerHeight()), o.css({
                                height: o.height + "px",
                                zIndex: s.zindex,
                                background: s.opt.background
                            }), o.append(g), o.visibility = !0, o.scrollable = !0, o.align = "top" == s.opt.railvalign ? 0 : 1, s.railh = o, s.railh.drag = !1),
                                s.ispage ? (h.css({
                                    position: "fixed",
                                    top: "0px",
                                    height: "100%"
                                }), h.align ? h.css({
                                    right: "0px"
                                }) : h.css({
                                    left: "0px"
                                }), s.body.append(h), s.railh && (o.css({
                                    position: "fixed",
                                    left: "0px",
                                    width: "100%"
                                }), o.align ? o.css({
                                    bottom: "0px"
                                }) : o.css({
                                    top: "0px"
                                }), s.body.append(o))) : (s.ishwscroll ? ("static" == s.win.css("position") && s.css(s.win, {
                                    position: "relative"
                                }), e = "HTML" == s.win[0].nodeName ? s.body: s.win, s.zoom && (s.zoom.css({
                                    position: "absolute",
                                    top: 1,
                                    right: 0,
                                    "margin-right": h.width + 4
                                }), e.append(s.zoom)), h.css({
                                    position: "absolute",
                                    top: 0
                                }), h.align ? h.css({
                                    right: 0
                                }) : h.css({
                                    left: 0
                                }), e.append(h), o && (o.css({
                                    position: "absolute",
                                    left: 0,
                                    bottom: 0
                                }), o.align ? o.css({
                                    bottom: 0
                                }) : o.css({
                                    top: 0
                                }), e.append(o))) : (s.isfixed = "fixed" == s.win.css("position"), e = s.isfixed ? "fixed": "absolute", s.isfixed || (s.viewport = s.getViewport(s.win[0])), s.viewport && (s.body = s.viewport, 0 == /fixed|relative|absolute/.test(s.viewport.css("position")) && s.css(s.viewport, {
                                    position: "relative"
                                })), h.css({
                                    position: e
                                }), s.zoom && s.zoom.css({
                                    position: e
                                }), s.updateScrollBar(), s.body.append(h), s.zoom && s.body.append(s.zoom), s.railh && (o.css({
                                    position: e
                                }), s.body.append(o))), u.isios && s.css(s.win, {
                                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                                    "-webkit-touch-callout": "none"
                                }), u.isie && s.opt.disableoutline && s.win.attr("hideFocus", "true"), u.iswebkit && s.opt.disableoutline && s.win.css({
                                    outline: "none"
                                })),
                                    !1 === s.opt.autohidemode ? (s.autohidedom = !1, s.rail.css({
                                opacity: s.opt.cursoropacitymax
                            }), s.railh && s.railh.css({
                                opacity: s.opt.cursoropacitymax
                            })) : !0 === s.opt.autohidemode || "leave" === s.opt.autohidemode ? (s.autohidedom = a().add(s.rail), u.isie8 && (s.autohidedom = s.autohidedom.add(s.cursor)), s.railh && (s.autohidedom = s.autohidedom.add(s.railh)), s.railh && u.isie8 && (s.autohidedom = s.autohidedom.add(s.cursorh))) : "scroll" == s.opt.autohidemode ? (s.autohidedom = a().add(s.rail), s.railh && (s.autohidedom = s.autohidedom.add(s.railh))) : "cursor" == s.opt.autohidemode ? (s.autohidedom = a().add(s.cursor), s.railh && (s.autohidedom = s.autohidedom.add(s.cursorh))) : "hidden" == s.opt.autohidemode && (s.autohidedom = !1, s.hide(), s.locked = !1),
                                u.isie9mobile ? (s.scrollmom = new q(s), s.onmangotouch = function(a) {
                                    var b, c, d, e, f, g;
                                    return a = s.getScrollTop(),
                                        b = s.getScrollLeft(),
                                            a == s.scrollmom.lastscrolly && b == s.scrollmom.lastscrollx ? !0 : (c = a - s.mangotouch.sy, d = b - s.mangotouch.sx, 0 != Math.round(Math.sqrt(Math.pow(d, 2) + Math.pow(c, 2))) && (e = 0 > c ? -1 : 1, f = 0 > d ? -1 : 1, g = +new Date, s.mangotouch.lazy && clearTimeout(s.mangotouch.lazy), 80 < g - s.mangotouch.tm || s.mangotouch.dry != e || s.mangotouch.drx != f ? (s.scrollmom.stop(), s.scrollmom.reset(b, a), s.mangotouch.sy = a, s.mangotouch.ly = a, s.mangotouch.sx = b, s.mangotouch.lx = b, s.mangotouch.dry = e, s.mangotouch.drx = f, s.mangotouch.tm = g) : (s.scrollmom.stop(), s.scrollmom.update(s.mangotouch.sx - d, s.mangotouch.sy - c), s.mangotouch.tm = g, c = Math.max(Math.abs(s.mangotouch.ly - a), Math.abs(s.mangotouch.lx - b)), s.mangotouch.ly = a, s.mangotouch.lx = b, c > 2 && (s.mangotouch.lazy = setTimeout(function() {
                                            s.mangotouch.lazy = !1,
                                                s.mangotouch.dry = 0,
                                                s.mangotouch.drx = 0,
                                                s.mangotouch.tm = 0,
                                                s.scrollmom.doMomentum(30)
                                        },
                                        100)))), void 0)
                                },
                                    h = s.getScrollTop(), o = s.getScrollLeft(), s.mangotouch = {
                                    sy: h,
                                    ly: h,
                                    dry: 0,
                                    sx: o,
                                    lx: o,
                                    drx: 0,
                                    lazy: !1,
                                    tm: 0
                                },
                                    s.bind(s.docscroll, "scroll", s.onmangotouch)) : ((u.cantouch || s.istouchcapable || s.opt.touchbehavior || u.hasmstouch) && (s.scrollmom = new q(s), s.ontouchstart = function(b) {
                                    var c, d, e, f, g;
                                    if (b.pointerType && 2 != b.pointerType) return ! 1;
                                    if (s.hasmoving = !1, !s.locked) {
                                        if (u.hasmstouch) for (c = b.target ? b.target: !1; c && (d = a(c).getNiceScroll(), !(0 < d.length && d[0].me == s.me));) {
                                            if (0 < d.length) return ! 1;
                                            if ("DIV" == c.nodeName && c.id == s.id) break;
                                            c = c.parentNode ? c.parentNode: !1
                                        }
                                        if (s.cancelScroll(), (c = s.getTarget(b)) && /INPUT/i.test(c.nodeName) && /range/i.test(c.type)) return s.stopPropagation(b);
                                        if (! ("clientX" in b) && "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY), s.forcescreen && (d = b, b = {
                                            original: b.original ? b.original: b
                                        },
                                            b.clientX = d.screenX, b.clientY = d.screenY), s.rail.drag = {
                                            x: b.clientX,
                                            y: b.clientY,
                                            sx: s.scroll.x,
                                            sy: s.scroll.y,
                                            st: s.getScrollTop(),
                                            sl: s.getScrollLeft(),
                                            pt: 2,
                                            dl: !1
                                        },
                                                s.ispage || !s.opt.directionlockdeadzone ? s.rail.drag.dl = "f": (d = a(window).width(), e = a(window).height(), f = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth), g = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), e = Math.max(0, g - e), d = Math.max(0, f - d), s.rail.drag.ck = !s.rail.scrollable && s.railh.scrollable ? e > 0 ? "v": !1 : s.rail.scrollable && !s.railh.scrollable ? d > 0 ? "h": !1 : !1, s.rail.drag.ck || (s.rail.drag.dl = "f")), s.opt.touchbehavior && s.isiframe && u.isie && (d = s.win.position(), s.rail.drag.x += d.left, s.rail.drag.y += d.top), s.hasmoving = !1, s.lastmouseup = !1, s.scrollmom.reset(b.clientX, b.clientY), !u.cantouch && !this.istouchcapable && !u.hasmstouch) {
                                            if (!c || !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName)) return ! s.ispage && u.hasmousecapture && c.setCapture(),
                                                s.opt.touchbehavior ? (c.onclick && !c._onclick && (c._onclick = c.onclick, c.onclick = function(a) {
                                                    return s.hasmoving ? !1 : (c._onclick.call(this, a), void 0)
                                                }), s.cancelEvent(b)) : s.stopPropagation(b);
                                            /SUBMIT|CANCEL|BUTTON/i.test(a(c).attr("type")) && (pc = {
                                                tg: c,
                                                click: !1
                                            },
                                                s.preventclick = pc)
                                        }
                                    }
                                },
                                    s.ontouchend = function(a) {
                                        return a.pointerType && 2 != a.pointerType ? !1 : s.rail.drag && 2 == s.rail.drag.pt && (s.scrollmom.doMomentum(), s.rail.drag = !1, s.hasmoving && (s.lastmouseup = !0, s.hideCursor(), u.hasmousecapture && document.releaseCapture(), !u.cantouch)) ? s.cancelEvent(a) : void 0
                                    },
                                    p = s.opt.touchbehavior && s.isiframe && !u.hasmousecapture, s.ontouchmove = function(b, c) {
                                    var d, e, f, g, h, i, j, k;
                                    if (b.pointerType && 2 != b.pointerType) return ! 1;
                                    if (s.rail.drag && 2 == s.rail.drag.pt) {
                                        if (u.cantouch && "undefined" == typeof b.original) return ! 0;
                                        if (s.hasmoving = !0, s.preventclick && !s.preventclick.click && (s.preventclick.click = s.preventclick.tg.onclick || !1, s.preventclick.tg.onclick = s.onpreventclick), b = a.extend({
                                                original: b
                                            },
                                            b), "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY), s.forcescreen && (d = b, b = {
                                            original: b.original ? b.original: b
                                        },
                                            b.clientX = d.screenX, b.clientY = d.screenY), d = ofy = 0, p && !c && (e = s.win.position(), d = -e.left, ofy = -e.top), f = b.clientY + ofy, e = f - s.rail.drag.y, g = b.clientX + d, h = g - s.rail.drag.x, i = s.rail.drag.st - e, s.ishwscroll && s.opt.bouncescroll ? 0 > i ? i = Math.round(i / 2) : i > s.page.maxh && (i = s.page.maxh + Math.round((i - s.page.maxh) / 2)) : (0 > i && (f = i = 0), i > s.page.maxh && (i = s.page.maxh, f = 0)), s.railh && s.railh.scrollable && (j = s.rail.drag.sl - h, s.ishwscroll && s.opt.bouncescroll ? 0 > j ? j = Math.round(j / 2) : j > s.page.maxw && (j = s.page.maxw + Math.round((j - s.page.maxw) / 2)) : (0 > j && (g = j = 0), j > s.page.maxw && (j = s.page.maxw, g = 0))), d = !1, s.rail.drag.dl) d = !0,
                                                "v" == s.rail.drag.dl ? j = s.rail.drag.sl: "h" == s.rail.drag.dl && (i = s.rail.drag.st);
                                        else if (e = Math.abs(e), h = Math.abs(h), k = s.opt.directionlockdeadzone, "v" == s.rail.drag.ck) {
                                            if (e > k && .3 * e >= h) return s.rail.drag = !1,
                                                !0;
                                            h > k && (s.rail.drag.dl = "f", a("body").scrollTop(a("body").scrollTop()))
                                        } else if ("h" == s.rail.drag.ck) {
                                            if (h > k && .3 * h >= e) return s.rail.drag = !1,
                                                !0;
                                            e > k && (s.rail.drag.dl = "f", a("body").scrollLeft(a("body").scrollLeft()))
                                        }
                                        if (s.synched("touchmove",
                                            function() {
                                                s.rail.drag && 2 == s.rail.drag.pt && (s.prepareTransition && s.prepareTransition(0), s.rail.scrollable && s.setScrollTop(i), s.scrollmom.update(g, f), s.railh && s.railh.scrollable ? (s.setScrollLeft(j), s.showCursor(i, j)) : s.showCursor(i), u.isie10 && document.selection.clear())
                                            }), u.ischrome && s.istouchcapable && (d = !1), d) return s.cancelEvent(b)
                                    }
                                }), s.onmousedown = function(a, b) {
                                    if (!s.rail.drag || 1 == s.rail.drag.pt) {
                                        if (s.locked) return s.cancelEvent(a);
                                        s.cancelScroll(),
                                            s.rail.drag = {
                                                x: a.clientX,
                                                y: a.clientY,
                                                sx: s.scroll.x,
                                                sy: s.scroll.y,
                                                pt: 1,
                                                hr: !!b
                                            };
                                        var c = s.getTarget(a);
                                        return ! s.ispage && u.hasmousecapture && c.setCapture(),
                                            s.isiframe && !u.hasmousecapture && (s.saved.csspointerevents = s.doc.css("pointer-events"), s.css(s.doc, {
                                            "pointer-events": "none"
                                        })),
                                            s.hasmoving = !1,
                                            s.cancelEvent(a)
                                    }
                                },
                                    s.onmouseup = function(a) {
                                        return s.rail.drag && (u.hasmousecapture && document.releaseCapture(), s.isiframe && !u.hasmousecapture && s.doc.css("pointer-events", s.saved.csspointerevents), 1 == s.rail.drag.pt) ? (s.rail.drag = !1, s.hasmoving && s.triggerScrollEnd(), s.cancelEvent(a)) : void 0
                                    },
                                    s.onmousemove = function(a) {
                                        if (s.rail.drag && 1 == s.rail.drag.pt) {
                                            if (u.ischrome && 0 == a.which) return s.onmouseup(a);
                                            if (s.cursorfreezed = !0, s.hasmoving = !0, s.rail.drag.hr) {
                                                s.scroll.x = s.rail.drag.sx + (a.clientX - s.rail.drag.x),
                                                    0 > s.scroll.x && (s.scroll.x = 0);
                                                var b = s.scrollvaluemaxw;
                                                s.scroll.x > b && (s.scroll.x = b)
                                            } else s.scroll.y = s.rail.drag.sy + (a.clientY - s.rail.drag.y),
                                                0 > s.scroll.y && (s.scroll.y = 0),
                                                b = s.scrollvaluemax,
                                                s.scroll.y > b && (s.scroll.y = b);
                                            return s.synched("mousemove",
                                                function() {
                                                    s.rail.drag && 1 == s.rail.drag.pt && (s.showCursor(), s.rail.drag.hr ? s.doScrollLeft(Math.round(s.scroll.x * s.scrollratio.x), s.opt.cursordragspeed) : s.doScrollTop(Math.round(s.scroll.y * s.scrollratio.y), s.opt.cursordragspeed))
                                                }),
                                                s.cancelEvent(a)
                                        }
                                    },
                                        u.cantouch || s.opt.touchbehavior ? (s.onpreventclick = function(a) {
                                    return s.preventclick ? (s.preventclick.tg.onclick = s.preventclick.click, s.preventclick = !1, s.cancelEvent(a)) : void 0
                                },
                                    s.bind(s.win, "mousedown", s.ontouchstart), s.onclick = u.isios ? !1 : function(a) {
                                    return s.lastmouseup ? (s.lastmouseup = !1, s.cancelEvent(a)) : !0
                                },
                                    s.opt.grabcursorenabled && u.cursorgrabvalue && (s.css(s.ispage ? s.doc: s.win, {
                                    cursor: u.cursorgrabvalue
                                }), s.css(s.rail, {
                                    cursor: u.cursorgrabvalue
                                }))) : (r = function(a) {
                                    if (s.selectiondrag) {
                                        if (a) {
                                            var b = s.win.outerHeight();
                                            a = a.pageY - s.selectiondrag.top,
                                                a > 0 && b > a && (a = 0),
                                                a >= b && (a -= b),
                                                s.selectiondrag.df = a
                                        }
                                        0 != s.selectiondrag.df && (s.doScrollBy(2 * -Math.floor(s.selectiondrag.df / 6)), s.debounced("doselectionscroll",
                                            function() {
                                                r()
                                            },
                                            50))
                                    }
                                },
                                    s.hasTextSelected = "getSelection" in document ?
                                        function() {
                                            return 0 < document.getSelection().rangeCount
                                        }: "selection" in document ?
                                        function() {
                                            return "None" != document.selection.type
                                        }: function() {
                                        return ! 1
                                    },
                                    s.onselectionstart = function() {
                                        s.ispage || (s.selectiondrag = s.win.offset())
                                    },
                                    s.onselectionend = function() {
                                        s.selectiondrag = !1
                                    },
                                    s.onselectiondrag = function(a) {
                                        s.selectiondrag && s.hasTextSelected() && s.debounced("selectionscroll",
                                            function() {
                                                r(a)
                                            },
                                            250)
                                    }), u.hasmstouch && (s.css(s.rail, {
                                    "-ms-touch-action": "none"
                                }), s.css(s.cursor, {
                                    "-ms-touch-action": "none"
                                }), s.bind(s.win, "MSPointerDown", s.ontouchstart), s.bind(document, "MSPointerUp", s.ontouchend), s.bind(document, "MSPointerMove", s.ontouchmove), s.bind(s.cursor, "MSGestureHold",
                                    function(a) {
                                        a.preventDefault()
                                    }), s.bind(s.cursor, "contextmenu",
                                    function(a) {
                                        a.preventDefault()
                                    })), this.istouchcapable && (s.bind(s.win, "touchstart", s.ontouchstart), s.bind(document, "touchend", s.ontouchend), s.bind(document, "touchcancel", s.ontouchend), s.bind(document, "touchmove", s.ontouchmove)), s.bind(s.cursor, "mousedown", s.onmousedown), s.bind(s.cursor, "mouseup", s.onmouseup), s.railh && (s.bind(s.cursorh, "mousedown",
                                    function(a) {
                                        s.onmousedown(a, !0)
                                    }), s.bind(s.cursorh, "mouseup", s.onmouseup)), (s.opt.cursordragontouch || !u.cantouch && !s.opt.touchbehavior) && (s.rail.css({
                                    cursor: "default"
                                }), s.railh && s.railh.css({
                                    cursor: "default"
                                }), s.jqbind(s.rail, "mouseenter",
                                    function() {
                                        return s.win.is(":visible") ? (s.canshowonmouseevent && s.showCursor(), s.rail.active = !0, void 0) : !1
                                    }), s.jqbind(s.rail, "mouseleave",
                                    function() {
                                        s.rail.active = !1,
                                            s.rail.drag || s.hideCursor()
                                    }), s.opt.sensitiverail && (s.bind(s.rail, "click",
                                    function(a) {
                                        s.doRailClick(a, !1, !1)
                                    }), s.bind(s.rail, "dblclick",
                                    function(a) {
                                        s.doRailClick(a, !0, !1)
                                    }), s.bind(s.cursor, "click",
                                    function(a) {
                                        s.cancelEvent(a)
                                    }), s.bind(s.cursor, "dblclick",
                                    function(a) {
                                        s.cancelEvent(a)
                                    })), s.railh && (s.jqbind(s.railh, "mouseenter",
                                    function() {
                                        return s.win.is(":visible") ? (s.canshowonmouseevent && s.showCursor(), s.rail.active = !0, void 0) : !1
                                    }), s.jqbind(s.railh, "mouseleave",
                                    function() {
                                        s.rail.active = !1,
                                            s.rail.drag || s.hideCursor()
                                    }), s.opt.sensitiverail && (s.bind(s.railh, "click",
                                    function(a) {
                                        s.doRailClick(a, !1, !0)
                                    }), s.bind(s.railh, "dblclick",
                                    function(a) {
                                        s.doRailClick(a, !0, !0)
                                    }), s.bind(s.cursorh, "click",
                                    function(a) {
                                        s.cancelEvent(a)
                                    }), s.bind(s.cursorh, "dblclick",
                                    function(a) {
                                        s.cancelEvent(a)
                                    })))), u.cantouch || s.opt.touchbehavior ? (s.bind(u.hasmousecapture ? s.win: document, "mouseup", s.ontouchend), s.bind(document, "mousemove", s.ontouchmove), s.onclick && s.bind(document, "click", s.onclick), s.opt.cursordragontouch && (s.bind(s.cursor, "mousedown", s.onmousedown), s.bind(s.cursor, "mousemove", s.onmousemove), s.cursorh && s.bind(s.cursorh, "mousedown",
                                    function(a) {
                                        s.onmousedown(a, !0)
                                    }), s.cursorh && s.bind(s.cursorh, "mousemove", s.onmousemove))) : (s.bind(u.hasmousecapture ? s.win: document, "mouseup", s.onmouseup), s.bind(document, "mousemove", s.onmousemove), s.onclick && s.bind(document, "click", s.onclick), !s.ispage && s.opt.enablescrollonselection && (s.bind(s.win[0], "mousedown", s.onselectionstart), s.bind(document, "mouseup", s.onselectionend), s.bind(s.cursor, "mouseup", s.onselectionend), s.cursorh && s.bind(s.cursorh, "mouseup", s.onselectionend), s.bind(document, "mousemove", s.onselectiondrag)), s.zoom && (s.jqbind(s.zoom, "mouseenter",
                                    function() {
                                        s.canshowonmouseevent && s.showCursor(),
                                            s.rail.active = !0
                                    }), s.jqbind(s.zoom, "mouseleave",
                                    function() {
                                        s.rail.active = !1,
                                            s.rail.drag || s.hideCursor()
                                    }))), s.opt.enablemousewheel && (s.isiframe || s.bind(u.isie && s.ispage ? document: s.win, "mousewheel", s.onmousewheel), s.bind(s.rail, "mousewheel", s.onmousewheel), s.railh && s.bind(s.railh, "mousewheel", s.onmousewheelhr)), !s.ispage && !u.cantouch && !/HTML|^BODY/.test(s.win[0].nodeName) && (s.win.attr("tabindex") || s.win.attr({
                                    tabindex: d++
                                }), s.jqbind(s.win, "focus",
                                    function(a) {
                                        b = s.getTarget(a).id || !0,
                                            s.hasfocus = !0,
                                            s.canshowonmouseevent && s.noticeCursor()
                                    }), s.jqbind(s.win, "blur",
                                    function() {
                                        b = !1,
                                            s.hasfocus = !1
                                    }), s.jqbind(s.win, "mouseenter",
                                    function(a) {
                                        c = s.getTarget(a).id || !0,
                                            s.hasmousefocus = !0,
                                            s.canshowonmouseevent && s.noticeCursor()
                                    }), s.jqbind(s.win, "mouseleave",
                                    function() {
                                        c = !1,
                                            s.hasmousefocus = !1,
                                            s.rail.drag || s.hideCursor()
                                    }))),
                                s.onkeypress = function(d) {
                                    var e, f, g, h;
                                    if (s.locked && 0 == s.page.maxh) return ! 0;
                                    if (d = d ? d: window.e, e = s.getTarget(d), e && /INPUT|TEXTAREA|SELECT|OPTION/.test(e.nodeName) && (!e.getAttribute("type") && !e.type || !/submit|button|cancel/i.tp) || a(e).attr("contenteditable")) return ! 0;
                                    if (s.hasfocus || s.hasmousefocus && !b || s.ispage && !b && !c) {
                                        if (e = d.keyCode, s.locked && 27 != e) return s.cancelEvent(d);
                                        switch (f = d.ctrlKey || !1, g = d.shiftKey || !1, h = !1, e) {
                                            case 38:
                                            case 63233:
                                                s.doScrollBy(72),
                                                    h = !0;
                                                break;
                                            case 40:
                                            case 63235:
                                                s.doScrollBy( - 72),
                                                    h = !0;
                                                break;
                                            case 37:
                                            case 63232:
                                                s.railh && (f ? s.doScrollLeft(0) : s.doScrollLeftBy(72), h = !0);
                                                break;
                                            case 39:
                                            case 63234:
                                                s.railh && (f ? s.doScrollLeft(s.page.maxw) : s.doScrollLeftBy( - 72), h = !0);
                                                break;
                                            case 33:
                                            case 63276:
                                                s.doScrollBy(s.view.h),
                                                    h = !0;
                                                break;
                                            case 34:
                                            case 63277:
                                                s.doScrollBy( - s.view.h),
                                                    h = !0;
                                                break;
                                            case 36:
                                            case 63273:
                                                s.railh && f ? s.doScrollPos(0, 0) : s.doScrollTo(0),
                                                    h = !0;
                                                break;
                                            case 35:
                                            case 63275:
                                                s.railh && f ? s.doScrollPos(s.page.maxw, s.page.maxh) : s.doScrollTo(s.page.maxh),
                                                    h = !0;
                                                break;
                                            case 32:
                                                s.opt.spacebarenabled && (g ? s.doScrollBy(s.view.h) : s.doScrollBy( - s.view.h), h = !0);
                                                break;
                                            case 27:
                                                s.zoomactive && (s.doZoom(), h = !0)
                                        }
                                        if (h) return s.cancelEvent(d)
                                    }
                                },
                                s.opt.enablekeyboard && s.bind(document, u.isopera && !u.isopera12 ? "keypress": "keydown", s.onkeypress),
                                s.bind(document, "keydown",
                                    function(a) {
                                        a.ctrlKey && (s.wheelprevented = !0)
                                    }),
                                s.bind(document, "keyup",
                                    function(a) {
                                        a.ctrlKey || (s.wheelprevented = !1)
                                    }),
                                s.bind(window, "resize", s.lazyResize),
                                s.bind(window, "orientationchange", s.lazyResize),
                                s.bind(window, "load", s.lazyResize),
                                !u.ischrome || s.ispage || s.haswrapper || (t = s.win.attr("style"), h = parseFloat(s.win.css("width")) + 1, s.win.css("width", h), s.synched("chromefix",
                                function() {
                                    s.win.attr("style", t)
                                })),
                                s.onAttributeChange = function() {
                                    s.lazyResize(250)
                                },
                                !s.ispage && !s.haswrapper && (!1 !== l ? (s.observer = new l(function(a) {
                                a.forEach(s.onAttributeChange)
                            }), s.observer.observe(s.win[0], {
                                childList: !0,
                                characterData: !1,
                                attributes: !0,
                                subtree: !1
                            }), s.observerremover = new l(function(a) {
                                a.forEach(function(a) {
                                    if (0 < a.removedNodes.length) for (var b in a.removedNodes) if (a.removedNodes[b] == s.win[0]) return s.remove()
                                })
                            }), s.observerremover.observe(s.win[0].parentNode, {
                                childList: !0,
                                characterData: !1,
                                attributes: !1,
                                subtree: !1
                            })) : (s.bind(s.win, u.isie && !u.isie9 ? "propertychange": "DOMAttrModified", s.onAttributeChange), u.isie9 && s.win[0].attachEvent("onpropertychange", s.onAttributeChange), s.bind(s.win, "DOMNodeRemoved",
                                function(a) {
                                    a.target == s.win[0] && s.remove()
                                }))),
                                !s.ispage && s.opt.boxzoom && s.bind(window, "resize", s.resizeZoom),
                                s.istextarea && s.bind(s.win, "mouseup", s.lazyResize),
                                s.lazyResize(30)
                        }
                        "IFRAME" == this.doc[0].nodeName && (v = function(b) {
                            s.iframexd = !1;
                            try {
                                var c = "contentDocument" in this ? this.contentDocument: this.contentWindow.document
                            } catch(d) {
                                s.iframexd = !0,
                                    c = !1
                            }
                            return s.iframexd ? ("console" in window && console.log("NiceScroll error: policy restriced iframe"), !0) : (s.forcescreen = !0, s.isiframe && (s.iframe = {
                                doc: a(c),
                                html: s.doc.contents().find("html")[0],
                                body: s.doc.contents().find("body")[0]
                            },
                                s.getContentSize = function() {
                                    return {
                                        w: Math.max(s.iframe.html.scrollWidth, s.iframe.body.scrollWidth),
                                        h: Math.max(s.iframe.html.scrollHeight, s.iframe.body.scrollHeight)
                                    }
                                },
                                s.docscroll = a(s.iframe.body)), !u.isios && s.opt.iframeautoresize && !s.isiframe && (s.win.scrollTop(0), s.doc.height(""), b = Math.max(c.getElementsByTagName("html")[0].scrollHeight, c.body.scrollHeight), s.doc.height(b)), s.lazyResize(30), u.isie7 && s.css(a(s.iframe.html), {
                                "overflow-y": "hidden"
                            }), s.css(a(s.iframe.body), {
                                "overflow-y": "hidden"
                            }), u.isios && s.haswrapper && s.css(a(c.body), {
                                "-webkit-transform": "translate3d(0,0,0)"
                            }), "contentWindow" in this ? s.bind(this.contentWindow, "scroll", s.onscroll) : s.bind(c, "scroll", s.onscroll), s.opt.enablemousewheel && s.bind(c, "mousewheel", s.onmousewheel), s.opt.enablekeyboard && s.bind(c, u.isopera ? "keypress": "keydown", s.onkeypress), (u.cantouch || s.opt.touchbehavior) && (s.bind(c, "mousedown", s.ontouchstart), s.bind(c, "mousemove",
                                function(a) {
                                    s.ontouchmove(a, !0)
                                }), s.opt.grabcursorenabled && u.cursorgrabvalue && s.css(a(c.body), {
                                cursor: u.cursorgrabvalue
                            })), s.bind(c, "mouseup", s.ontouchend), s.zoom && (s.opt.dblclickzoom && s.bind(c, "dblclick", s.doZoom), s.ongesturezoom && s.bind(c, "gestureend", s.ongesturezoom)), void 0)
                        },
                            this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
                                v.call(s.doc[0], !1)
                            },
                            500), s.bind(this.doc, "load", v))
                    },
                    this.showCursor = function(a, b) {
                        s.cursortimeout && (clearTimeout(s.cursortimeout), s.cursortimeout = 0),
                            s.rail && (s.autohidedom && (s.autohidedom.stop().css({
                            opacity: s.opt.cursoropacitymax
                        }), s.cursoractive = !0), s.rail.drag && 1 == s.rail.drag.pt || ("undefined" != typeof a && !1 !== a && (s.scroll.y = Math.round(1 * a / s.scrollratio.y)), "undefined" != typeof b && (s.scroll.x = Math.round(1 * b / s.scrollratio.x))), s.cursor.css({
                            height: s.cursorheight,
                            top: s.scroll.y
                        }), s.cursorh && (!s.rail.align && s.rail.visibility ? s.cursorh.css({
                            width: s.cursorwidth,
                            left: s.scroll.x + s.rail.width
                        }) : s.cursorh.css({
                            width: s.cursorwidth,
                            left: s.scroll.x
                        }), s.cursoractive = !0), s.zoom && s.zoom.stop().css({
                            opacity: s.opt.cursoropacitymax
                        }))
                    },
                    this.hideCursor = function(a) { ! s.cursortimeout && s.rail && s.autohidedom && !(s.hasmousefocus && "leave" == s.opt.autohidemode) && (s.cursortimeout = setTimeout(function() {
                            s.rail.active && s.showonmouseevent || (s.autohidedom.stop().animate({
                                opacity: s.opt.cursoropacitymin
                            }), s.zoom && s.zoom.stop().animate({
                                opacity: s.opt.cursoropacitymin
                            }), s.cursoractive = !1),
                                s.cursortimeout = 0
                        },
                            a || s.opt.hidecursordelay))
                    },
                    this.noticeCursor = function(a, b, c) {
                        s.showCursor(b, c),
                            s.rail.active || s.hideCursor(a)
                    },
                    this.getContentSize = s.ispage ?
                        function() {
                            return {
                                w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                                h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                            }
                        }: s.haswrapper ?
                        function() {
                            return {
                                w: s.doc.outerWidth() + parseInt(s.win.css("paddingLeft")) + parseInt(s.win.css("paddingRight")),
                                h: s.doc.outerHeight() + parseInt(s.win.css("paddingTop")) + parseInt(s.win.css("paddingBottom"))
                            }
                        }: function() {
                        return {
                            w: s.docscroll[0].scrollWidth,
                            h: s.docscroll[0].scrollHeight
                        }
                    },
                    this.onResize = function(a, b) {
                        if (!s || !s.win) return ! 1;
                        if (!s.haswrapper && !s.ispage) {
                            if ("none" == s.win.css("display")) return s.visibility && s.hideRail().hideRailHr(),
                                !1; ! s.hidden && !s.visibility && s.showRail().showRailHr()
                        }
                        var c = s.page.maxh,
                            d = s.page.maxw,
                            e = s.view.w;
                        if (s.view = {
                            w: s.ispage ? s.win.width() : parseInt(s.win[0].clientWidth),
                            h: s.ispage ? s.win.height() : parseInt(s.win[0].clientHeight)
                        },
                            s.page = b ? b: s.getContentSize(), s.page.maxh = Math.max(0, s.page.h - s.view.h), s.page.maxw = Math.max(0, s.page.w - s.view.w), s.page.maxh == c && s.page.maxw == d && s.view.w == e) {
                            if (s.ispage) return s;
                            if (c = s.win.offset(), s.lastposition && (d = s.lastposition, d.top == c.top && d.left == c.left)) return s;
                            s.lastposition = c
                        }
                        return 0 == s.page.maxh ? (s.hideRail(), s.scrollvaluemax = 0, s.scroll.y = 0, s.scrollratio.y = 0, s.cursorheight = 0, s.setScrollTop(0), s.rail.scrollable = !1) : s.rail.scrollable = !0,
                                0 == s.page.maxw ? (s.hideRailHr(), s.scrollvaluemaxw = 0, s.scroll.x = 0, s.scrollratio.x = 0, s.cursorwidth = 0, s.setScrollLeft(0), s.railh.scrollable = !1) : s.railh.scrollable = !0,
                            s.locked = 0 == s.page.maxh && 0 == s.page.maxw,
                            s.locked ? (s.ispage || s.updateScrollBar(s.view), !1) : (s.hidden || s.visibility ? !s.hidden && !s.railh.visibility && s.showRailHr() : s.showRail().showRailHr(), s.istextarea && s.win.css("resize") && "none" != s.win.css("resize") && (s.view.h -= 20), s.cursorheight = Math.min(s.view.h, Math.round(s.view.h * (s.view.h / s.page.h))), s.cursorheight = s.opt.cursorfixedheight ? s.opt.cursorfixedheight: Math.max(s.opt.cursorminheight, s.cursorheight), s.cursorwidth = Math.min(s.view.w, Math.round(s.view.w * (s.view.w / s.page.w))), s.cursorwidth = s.opt.cursorfixedheight ? s.opt.cursorfixedheight: Math.max(s.opt.cursorminheight, s.cursorwidth), s.scrollvaluemax = s.view.h - s.cursorheight - s.cursor.hborder, s.railh && (s.railh.width = 0 < s.page.maxh ? s.view.w - s.rail.width: s.view.w, s.scrollvaluemaxw = s.railh.width - s.cursorwidth - s.cursorh.wborder), s.ispage || s.updateScrollBar(s.view), s.scrollratio = {
                                x: s.page.maxw / s.scrollvaluemaxw,
                                y: s.page.maxh / s.scrollvaluemax
                            },
                                    s.getScrollTop() > s.page.maxh ? s.doScrollTop(s.page.maxh) : (s.scroll.y = Math.round(s.getScrollTop() * (1 / s.scrollratio.y)), s.scroll.x = Math.round(s.getScrollLeft() * (1 / s.scrollratio.x)), s.cursoractive && s.noticeCursor()), s.scroll.y && 0 == s.getScrollTop() && s.doScrollTo(Math.floor(s.scroll.y * s.scrollratio.y)), s)
                    },
                    this.resize = s.onResize,
                    this.lazyResize = function(a) {
                        return a = isNaN(a) ? 30 : a,
                            s.delayed("resize", s.resize, a),
                            s
                    },
                    this._bind = function(a, b, c, d) {
                        s.events.push({
                            e: a,
                            n: b,
                            f: c,
                            b: d,
                            q: !1
                        }),
                            a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
                    },
                    this.jqbind = function(b, c, d) {
                        s.events.push({
                            e: b,
                            n: c,
                            f: d,
                            q: !0
                        }),
                            a(b).bind(c, d)
                    },
                    this.bind = function(a, b, c, d) {
                        var e = "jquery" in a ? a[0] : a;
                        "mousewheel" == b ? "onwheel" in s.win ? s._bind(e, "wheel", c, d || !1) : (a = "undefined" != typeof document.onmousewheel ? "mousewheel": "DOMMouseScroll", p(e, a, c, d || !1), "DOMMouseScroll" == a && p(e, "MozMousePixelScroll", c, d || !1)) : e.addEventListener ? (u.cantouch && /mouseup|mousedown|mousemove/.test(b) && s._bind(e, "mousedown" == b ? "touchstart": "mouseup" == b ? "touchend": "touchmove",
                            function(a) {
                                if (a.touches) {
                                    if (2 > a.touches.length) {
                                        var b = a.touches.length ? a.touches[0] : a;
                                        b.original = a,
                                            c.call(this, b)
                                    }
                                } else a.changedTouches && (b = a.changedTouches[0], b.original = a, c.call(this, b))
                            },
                                d || !1), s._bind(e, b, c, d || !1), u.cantouch && "mouseup" == b && s._bind(e, "touchcancel", c, d || !1)) : s._bind(e, b,
                            function(a) {
                                return (a = a || window.event || !1) && a.srcElement && (a.target = a.srcElement),
                                    "pageY" in a || (a.pageX = a.clientX + document.documentElement.scrollLeft, a.pageY = a.clientY + document.documentElement.scrollTop),
                                        !1 === c.call(e, a) || !1 === d ? s.cancelEvent(a) : !0
                            })
                    },
                    this._unbind = function(a, b, c, d) {
                        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = !1
                    },
                    this.unbindAll = function() {
                        var a, b;
                        for (a = 0; a < s.events.length; a++) b = s.events[a],
                            b.q ? b.e.unbind(b.n, b.f) : s._unbind(b.e, b.n, b.f, b.b)
                    },
                    this.cancelEvent = function(a) {
                        return (a = a.original ? a.original: a ? a: window.event || !1) ? (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.preventManipulation && a.preventManipulation(), a.cancelBubble = !0, a.cancel = !0, a.returnValue = !1) : !1
                    },
                    this.stopPropagation = function(a) {
                        return (a = a.original ? a.original: a ? a: window.event || !1) ? a.stopPropagation ? a.stopPropagation() : (a.cancelBubble && (a.cancelBubble = !0), !1) : !1
                    },
                    this.showRail = function() {
                        return 0 == s.page.maxh || !s.ispage && "none" == s.win.css("display") || (s.visibility = !0, s.rail.visibility = !0, s.rail.css("display", "block")),
                            s
                    },
                    this.showRailHr = function() {
                        return s.railh ? (0 == s.page.maxw || !s.ispage && "none" == s.win.css("display") || (s.railh.visibility = !0, s.railh.css("display", "block")), s) : s
                    },
                    this.hideRail = function() {
                        return s.visibility = !1,
                            s.rail.visibility = !1,
                            s.rail.css("display", "none"),
                            s
                    },
                    this.hideRailHr = function() {
                        return s.railh ? (s.railh.visibility = !1, s.railh.css("display", "none"), s) : s
                    },
                    this.show = function() {
                        return s.hidden = !1,
                            s.locked = !1,
                            s.showRail().showRailHr()
                    },
                    this.hide = function() {
                        return s.hidden = !0,
                            s.locked = !0,
                            s.hideRail().hideRailHr()
                    },
                    this.toggle = function() {
                        return s.hidden ? s.show() : s.hide()
                    },
                    this.remove = function() {
                        var b, c, d, e;
                        for (s.stop(), s.cursortimeout && clearTimeout(s.cursortimeout), s.doZoomOut(), s.unbindAll(), u.isie9 && s.win[0].detachEvent("onpropertychange", s.onAttributeChange), !1 !== s.observer && s.observer.disconnect(), !1 !== s.observerremover && s.observerremover.disconnect(), s.events = null, s.cursor && s.cursor.remove(), s.cursorh && s.cursorh.remove(), s.rail && s.rail.remove(), s.railh && s.railh.remove(), s.zoom && s.zoom.remove(), b = 0; b < s.saved.css.length; b++) c = s.saved.css[b],
                            c[0].css(c[1], "undefined" == typeof c[2] ? "": c[2]);
                        s.saved = !1,
                            s.me.data("__nicescroll", ""),
                            d = a.nicescroll,
                            d.each(function(a) {
                                if (this && this.id === s.id) {
                                    delete d[a];
                                    for (var b = ++a; b < d.length; b++, a++) d[a] = d[b];
                                    d.length--,
                                        d.length && delete d[d.length]
                                }
                            });
                        for (e in s) s[e] = null,
                            delete s[e];
                        s = null
                    },
                    this.scrollstart = function(a) {
                        return this.onscrollstart = a,
                            s
                    },
                    this.scrollend = function(a) {
                        return this.onscrollend = a,
                            s
                    },
                    this.scrollcancel = function(a) {
                        return this.onscrollcancel = a,
                            s
                    },
                    this.zoomin = function(a) {
                        return this.onzoomin = a,
                            s
                    },
                    this.zoomout = function(a) {
                        return this.onzoomout = a,
                            s
                    },
                    this.isScrollable = function(b) {
                        if (b = b.target ? b.target: b, "OPTION" == b.nodeName) return ! 0;
                        for (; b && 1 == b.nodeType && !/^BODY|HTML/.test(b.nodeName);) {
                            var c = a(b),
                                c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
                            if (/scroll|auto/.test(c)) return b.clientHeight != b.scrollHeight;
                            b = b.parentNode ? b.parentNode: !1
                        }
                        return ! 1
                    },
                    this.getViewport = function(b) {
                        var c, d;
                        for (b = b && b.parentNode ? b.parentNode: !1; b && 1 == b.nodeType && !/^BODY|HTML/.test(b.nodeName);) {
                            if (c = a(b), /fixed|absolute/.test(c.css("position"))) return c;
                            if (d = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "", /scroll|auto/.test(d) && b.clientHeight != b.scrollHeight || 0 < c.getNiceScroll().length) return c;
                            b = b.parentNode ? b.parentNode: !1
                        }
                        return b ? a(b) : !1
                    },
                    this.triggerScrollEnd = function() {
                        if (s.onscrollend) {
                            var a = s.getScrollLeft(),
                                b = s.getScrollTop();
                            s.onscrollend.call(s, {
                                type: "scrollend",
                                current: {
                                    x: a,
                                    y: b
                                },
                                end: {
                                    x: a,
                                    y: b
                                }
                            })
                        }
                    },
                    this.onmousewheel = function(a) {
                        if (!s.wheelprevented) {
                            if (s.locked) return s.debounced("checkunlock", s.resize, 250),
                                !0;
                            if (s.rail.drag) return s.cancelEvent(a);
                            if ("auto" == s.opt.oneaxismousemode && 0 != a.deltaX && (s.opt.oneaxismousemode = !1), s.opt.oneaxismousemode && 0 == a.deltaX && !s.rail.scrollable) return s.railh && s.railh.scrollable ? s.onmousewheelhr(a) : !0;
                            var b = +new Date,
                                c = !1;
                            return s.opt.preservenativescrolling && s.checkarea + 600 < b && (s.nativescrollingarea = s.isScrollable(a), c = !0),
                                s.checkarea = b,
                                s.nativescrollingarea ? !0 : ((a = r(a, !1, c)) && (s.checkarea = 0), a)
                        }
                    },
                    this.onmousewheelhr = function(a) {
                        if (!s.wheelprevented) {
                            if (s.locked || !s.railh.scrollable) return ! 0;
                            if (s.rail.drag) return s.cancelEvent(a);
                            var b = +new Date,
                                c = !1;
                            return s.opt.preservenativescrolling && s.checkarea + 600 < b && (s.nativescrollingarea = s.isScrollable(a), c = !0),
                                s.checkarea = b,
                                s.nativescrollingarea ? !0 : s.locked ? s.cancelEvent(a) : r(a, !0, c)
                        }
                    },
                    this.stop = function() {
                        return s.cancelScroll(),
                            s.scrollmon && s.scrollmon.stop(),
                            s.cursorfreezed = !1,
                            s.scroll.y = Math.round(s.getScrollTop() * (1 / s.scrollratio.y)),
                            s.noticeCursor(),
                            s
                    },
                    this.getTransitionSpeed = function(a) {
                        var b = Math.round(10 * s.opt.scrollspeed);
                        return a = Math.min(b, Math.round(a / 20 * s.opt.scrollspeed)),
                                a > 20 ? a: 0
                    },
                    s.opt.smoothscroll ? s.ishwscroll && u.hastransition && s.opt.usetransition ? (this.prepareTransition = function(a, b) {
                        var c = b ? a > 20 ? a: 0 : s.getTransitionSpeed(a),
                            d = c ? u.prefixstyle + "transform " + c + "ms ease-out": "";
                        return s.lasttransitionstyle && s.lasttransitionstyle == d || (s.lasttransitionstyle = d, s.doc.css(u.transitionstyle, d)),
                            c
                    },
                        this.doScrollLeft = function(a, b) {
                            var c = s.scrollrunning ? s.newscrolly: s.getScrollTop();
                            s.doScrollPos(a, c, b)
                        },
                        this.doScrollTop = function(a, b) {
                            var c = s.scrollrunning ? s.newscrollx: s.getScrollLeft();
                            s.doScrollPos(c, a, b)
                        },
                        this.doScrollPos = function(a, b, c) {
                            var d = s.getScrollTop(),
                                e = s.getScrollLeft();
                            return (0 > (s.newscrolly - d) * (b - d) || 0 > (s.newscrollx - e) * (a - e)) && s.cancelScroll(),
                                0 == s.opt.bouncescroll && (0 > b ? b = 0 : b > s.page.maxh && (b = s.page.maxh), 0 > a ? a = 0 : a > s.page.maxw && (a = s.page.maxw)),
                                    s.scrollrunning && a == s.newscrollx && b == s.newscrolly ? !1 : (s.newscrolly = b, s.newscrollx = a, s.newscrollspeed = c || !1, s.timer ? !1 : (s.timer = setTimeout(function() {
                                    var e, f, c = s.getScrollTop(),
                                        d = s.getScrollLeft();
                                    e = a - d,
                                        f = b - c,
                                        e = Math.round(Math.sqrt(Math.pow(e, 2) + Math.pow(f, 2))),
                                        e = s.newscrollspeed && 1 < s.newscrollspeed ? s.newscrollspeed: s.getTransitionSpeed(e),
                                        s.newscrollspeed && 1 >= s.newscrollspeed && (e *= s.newscrollspeed),
                                        s.prepareTransition(e, !0),
                                        s.timerscroll && s.timerscroll.tm && clearInterval(s.timerscroll.tm),
                                        e > 0 && (!s.scrollrunning && s.onscrollstart && s.onscrollstart.call(s, {
                                        type: "scrollstart",
                                        current: {
                                            x: d,
                                            y: c
                                        },
                                        request: {
                                            x: a,
                                            y: b
                                        },
                                        end: {
                                            x: s.newscrollx,
                                            y: s.newscrolly
                                        },
                                        speed: e
                                    }), u.transitionend ? s.scrollendtrapped || (s.scrollendtrapped = !0, s.bind(s.doc, u.transitionend, s.onScrollTransitionEnd, !1)) : (s.scrollendtrapped && clearTimeout(s.scrollendtrapped), s.scrollendtrapped = setTimeout(s.onScrollTransitionEnd, e)), s.timerscroll = {
                                        bz: new BezierClass(c, s.newscrolly, e, 0, 0, .58, 1),
                                        bh: new BezierClass(d, s.newscrollx, e, 0, 0, .58, 1)
                                    },
                                        s.cursorfreezed || (s.timerscroll.tm = setInterval(function() {
                                            s.showCursor(s.getScrollTop(), s.getScrollLeft())
                                        },
                                        60))),
                                        s.synched("doScroll-set",
                                            function() {
                                                s.timer = 0,
                                                    s.scrollendtrapped && (s.scrollrunning = !0),
                                                    s.setScrollTop(s.newscrolly),
                                                    s.setScrollLeft(s.newscrollx),
                                                    s.scrollendtrapped || s.onScrollTransitionEnd()
                                            })
                                },
                                50), void 0))
                        },
                        this.cancelScroll = function() {
                            if (!s.scrollendtrapped) return ! 0;
                            var a = s.getScrollTop(),
                                b = s.getScrollLeft();
                            return s.scrollrunning = !1,
                                u.transitionend || clearTimeout(u.transitionend),
                                s.scrollendtrapped = !1,
                                s._unbind(s.doc, u.transitionend, s.onScrollTransitionEnd),
                                s.prepareTransition(0),
                                s.setScrollTop(a),
                                s.railh && s.setScrollLeft(b),
                                s.timerscroll && s.timerscroll.tm && clearInterval(s.timerscroll.tm),
                                s.timerscroll = !1,
                                s.cursorfreezed = !1,
                                s.showCursor(a, b),
                                s
                        },
                        this.onScrollTransitionEnd = function() {
                            s.scrollendtrapped && s._unbind(s.doc, u.transitionend, s.onScrollTransitionEnd),
                                s.scrollendtrapped = !1,
                                s.prepareTransition(0),
                                s.timerscroll && s.timerscroll.tm && clearInterval(s.timerscroll.tm),
                                s.timerscroll = !1;
                            var a = s.getScrollTop(),
                                b = s.getScrollLeft();
                            return s.setScrollTop(a),
                                s.railh && s.setScrollLeft(b),
                                s.noticeCursor(!1, a, b),
                                s.cursorfreezed = !1,
                                    0 > a ? a = 0 : a > s.page.maxh && (a = s.page.maxh),
                                    0 > b ? b = 0 : b > s.page.maxw && (b = s.page.maxw),
                                    a != s.newscrolly || b != s.newscrollx ? s.doScrollPos(b, a, s.opt.snapbackspeed) : (s.onscrollend && s.scrollrunning && s.triggerScrollEnd(), s.scrollrunning = !1, void 0)
                        }) : (this.doScrollLeft = function(a, b) {
                        var c = s.scrollrunning ? s.newscrolly: s.getScrollTop();
                        s.doScrollPos(a, c, b)
                    },
                        this.doScrollTop = function(a, b) {
                            var c = s.scrollrunning ? s.newscrollx: s.getScrollLeft();
                            s.doScrollPos(c, a, b)
                        },
                        this.doScrollPos = function(a, b, c) {
                            function d() {
                                var a, b, c, e;
                                return s.cancelAnimationFrame ? !0 : (s.scrollrunning = !0, (l = 1 - l) ? s.timer = h(d) || 1 : (a = 0, b = sy = s.getScrollTop(), s.dst.ay ? (b = s.bzscroll ? s.dst.py + s.bzscroll.getNow() * s.dst.ay: s.newscrolly, c = b - sy, (0 > c && b < s.newscrolly || c > 0 && b > s.newscrolly) && (b = s.newscrolly), s.setScrollTop(b), b == s.newscrolly && (a = 1)) : a = 1, e = sx = s.getScrollLeft(), s.dst.ax ? (e = s.bzscroll ? s.dst.px + s.bzscroll.getNow() * s.dst.ax: s.newscrollx, c = e - sx, (0 > c && e < s.newscrollx || c > 0 && e > s.newscrollx) && (e = s.newscrollx), s.setScrollLeft(e), e == s.newscrollx && (a += 1)) : a += 1, 2 == a ? (s.timer = 0, s.cursorfreezed = !1, s.bzscroll = !1, s.scrollrunning = !1, 0 > b ? b = 0 : b > s.page.maxh && (b = s.page.maxh), 0 > e ? e = 0 : e > s.page.maxw && (e = s.page.maxw), e != s.newscrollx || b != s.newscrolly ? s.doScrollPos(e, b) : s.onscrollend && s.triggerScrollEnd()) : s.timer = h(d) || 1, void 0))
                            }
                            var e, f, g, j, k, l;
                            return b = "undefined" == typeof b || !1 === b ? s.getScrollTop(!0) : b,
                                    s.timer && s.newscrolly == b && s.newscrollx == a ? !0 : (s.timer && i(s.timer), s.timer = 0, e = s.getScrollTop(), f = s.getScrollLeft(), (0 > (s.newscrolly - e) * (b - e) || 0 > (s.newscrollx - f) * (a - f)) && s.cancelScroll(), s.newscrolly = b, s.newscrollx = a, s.bouncescroll && s.rail.visibility || (0 > s.newscrolly ? s.newscrolly = 0 : s.newscrolly > s.page.maxh && (s.newscrolly = s.page.maxh)), s.bouncescroll && s.railh.visibility || (0 > s.newscrollx ? s.newscrollx = 0 : s.newscrollx > s.page.maxw && (s.newscrollx = s.page.maxw)), s.dst = {},
                                s.dst.x = a - f, s.dst.y = b - e, s.dst.px = f, s.dst.py = e, g = Math.round(Math.sqrt(Math.pow(s.dst.x, 2) + Math.pow(s.dst.y, 2))), s.dst.ax = s.dst.x / g, s.dst.ay = s.dst.y / g, j = 0, k = g, 0 == s.dst.x ? (j = e, k = b, s.dst.ay = 1, s.dst.py = 0) : 0 == s.dst.y && (j = f, k = a, s.dst.ax = 1, s.dst.px = 0), g = s.getTransitionSpeed(g), c && 1 >= c && (g *= c), s.bzscroll = g > 0 ? s.bzscroll ? s.bzscroll.update(k, g) : new BezierClass(j, k, g, 0, 1, 0, 1) : !1, s.timer || ((e == s.page.maxh && b >= s.page.maxh || f == s.page.maxw && a >= s.page.maxw) && s.checkContentSize(), l = 1, s.cancelAnimationFrame = !1, s.timer = 1, s.onscrollstart && !s.scrollrunning && s.onscrollstart.call(s, {
                                type: "scrollstart",
                                current: {
                                    x: f,
                                    y: e
                                },
                                request: {
                                    x: a,
                                    y: b
                                },
                                end: {
                                    x: s.newscrollx,
                                    y: s.newscrolly
                                },
                                speed: g
                            }), d(), (e == s.page.maxh && b >= e || f == s.page.maxw && a >= f) && s.checkContentSize(), s.noticeCursor()), void 0)
                        },
                        this.cancelScroll = function() {
                            return s.timer && i(s.timer),
                                s.timer = 0,
                                s.bzscroll = !1,
                                s.scrollrunning = !1,
                                s
                        }) : (this.doScrollLeft = function(a, b) {
                        var c = s.getScrollTop();
                        s.doScrollPos(a, c, b)
                    },
                        this.doScrollTop = function(a, b) {
                            var c = s.getScrollLeft();
                            s.doScrollPos(c, a, b)
                        },
                        this.doScrollPos = function(a, b) {
                            var e, d = a > s.page.maxw ? s.page.maxw: a;
                            0 > d && (d = 0),
                                e = b > s.page.maxh ? s.page.maxh: b,
                                0 > e && (e = 0),
                                s.synched("scroll",
                                    function() {
                                        s.setScrollTop(e),
                                            s.setScrollLeft(d)
                                    })
                        },
                        this.cancelScroll = function() {}),
                    this.doScrollBy = function(a, b) {
                        var d, c = 0;
                        return c = b ? Math.floor((s.scroll.y - a) * s.scrollratio.y) : (s.timer ? s.newscrolly: s.getScrollTop(!0)) - a,
                            s.bouncescroll && (d = Math.round(s.view.h / 2), -d > c ? c = -d: c > s.page.maxh + d && (c = s.page.maxh + d)),
                            s.cursorfreezed = !1,
                            py = s.getScrollTop(!0),
                                0 > c && 0 >= py ? s.noticeCursor() : c > s.page.maxh && py >= s.page.maxh ? (s.checkContentSize(), s.noticeCursor()) : (s.doScrollTop(c), void 0)
                    },
                    this.doScrollLeftBy = function(a, b) {
                        var d, c = 0;
                        return c = b ? Math.floor((s.scroll.x - a) * s.scrollratio.x) : (s.timer ? s.newscrollx: s.getScrollLeft(!0)) - a,
                            s.bouncescroll && (d = Math.round(s.view.w / 2), -d > c ? c = -d: c > s.page.maxw + d && (c = s.page.maxw + d)),
                            s.cursorfreezed = !1,
                            px = s.getScrollLeft(!0),
                                0 > c && 0 >= px || c > s.page.maxw && px >= s.page.maxw ? s.noticeCursor() : (s.doScrollLeft(c), void 0)
                    },
                    this.doScrollTo = function(a, b) {
                        b && Math.round(a * s.scrollratio.y),
                            s.cursorfreezed = !1,
                            s.doScrollTop(a)
                    },
                    this.checkContentSize = function() {
                        var a = s.getContentSize(); (a.h != s.page.h || a.w != s.page.w) && s.resize(!1, a)
                    },
                    s.onscroll = function() {
                        s.rail.drag || s.cursorfreezed || s.synched("scroll",
                            function() {
                                s.scroll.y = Math.round(s.getScrollTop() * (1 / s.scrollratio.y)),
                                    s.railh && (s.scroll.x = Math.round(s.getScrollLeft() * (1 / s.scrollratio.x))),
                                    s.noticeCursor()
                            })
                    },
                    s.bind(s.docscroll, "scroll", s.onscroll),
                    this.doZoomIn = function(b) {
                        var e, c, d, g;
                        if (!s.zoomactive) {
                            s.zoomactive = !0,
                                s.zoomrestore = {
                                    style: {}
                                },
                                c = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
                                d = s.win[0].style;
                            for (e in c) g = c[e],
                                s.zoomrestore.style[g] = "undefined" != typeof d[g] ? d[g] : "";
                            return s.zoomrestore.style.width = s.win.css("width"),
                                s.zoomrestore.style.height = s.win.css("height"),
                                s.zoomrestore.padding = {
                                    w: s.win.outerWidth() - s.win.width(),
                                    h: s.win.outerHeight() - s.win.height()
                                },
                                u.isios4 && (s.zoomrestore.scrollTop = a(window).scrollTop(), a(window).scrollTop(0)),
                                s.win.css({
                                    position: u.isios4 ? "absolute": "fixed",
                                    top: 0,
                                    left: 0,
                                    "z-index": f + 100,
                                    margin: "0px"
                                }),
                                c = s.win.css("backgroundColor"),
                                ("" == c || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(c)) && s.win.css("backgroundColor", "#fff"),
                                s.rail.css({
                                    "z-index": f + 101
                                }),
                                s.zoom.css({
                                    "z-index": f + 102
                                }),
                                s.zoom.css("backgroundPosition", "0px -18px"),
                                s.resizeZoom(),
                                s.onzoomin && s.onzoomin.call(s),
                                s.cancelEvent(b)
                        }
                    },
                    this.doZoomOut = function(b) {
                        return s.zoomactive ? (s.zoomactive = !1, s.win.css("margin", ""), s.win.css(s.zoomrestore.style), u.isios4 && a(window).scrollTop(s.zoomrestore.scrollTop), s.rail.css({
                            "z-index": s.zindex
                        }), s.zoom.css({
                            "z-index": s.zindex
                        }), s.zoomrestore = !1, s.zoom.css("backgroundPosition", "0px 0px"), s.onResize(), s.onzoomout && s.onzoomout.call(s), s.cancelEvent(b)) : void 0
                    },
                    this.doZoom = function(a) {
                        return s.zoomactive ? s.doZoomOut(a) : s.doZoomIn(a)
                    },
                    this.resizeZoom = function() {
                        if (s.zoomactive) {
                            var b = s.getScrollTop();
                            s.win.css({
                                width: a(window).width() - s.zoomrestore.padding.w + "px",
                                height: a(window).height() - s.zoomrestore.padding.h + "px"
                            }),
                                s.onResize(),
                                s.setScrollTop(Math.min(s.page.maxh, b))
                        }
                    },
                    this.init(),
                    a.nicescroll.push(this)
            },
            q = function(a) {
                var b = this;
                this.nc = a,
                    this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0,
                    this.snapy = this.snapx = !1,
                    this.demuly = this.demulx = 0,
                    this.lastscrolly = this.lastscrollx = -1,
                    this.timer = this.chky = this.chkx = 0,
                    this.time = function() {
                        return + new Date
                    },
                    this.reset = function(a, c) {
                        b.stop();
                        var d = b.time();
                        b.steptime = 0,
                            b.lasttime = d,
                            b.speedx = 0,
                            b.speedy = 0,
                            b.lastx = a,
                            b.lasty = c,
                            b.lastscrollx = -1,
                            b.lastscrolly = -1
                    },
                    this.update = function(a, c) {
                        var e, f, g, d = b.time();
                        b.steptime = d - b.lasttime,
                            b.lasttime = d,
                            d = c - b.lasty,
                            e = a - b.lastx,
                            f = b.nc.getScrollTop(),
                            g = b.nc.getScrollLeft(),
                            f += d,
                            g += e,
                            b.snapx = 0 > g || g > b.nc.page.maxw,
                            b.snapy = 0 > f || f > b.nc.page.maxh,
                            b.speedx = e,
                            b.speedy = d,
                            b.lastx = a,
                            b.lasty = c
                    },
                    this.stop = function() {
                        b.nc.unsynched("domomentum2d"),
                            b.timer && clearTimeout(b.timer),
                            b.timer = 0,
                            b.lastscrollx = -1,
                            b.lastscrolly = -1
                    },
                    this.doSnapy = function(a, c) {
                        var d = !1;
                        0 > c ? (c = 0, d = !0) : c > b.nc.page.maxh && (c = b.nc.page.maxh, d = !0),
                                0 > a ? (a = 0, d = !0) : a > b.nc.page.maxw && (a = b.nc.page.maxw, d = !0),
                            d ? b.nc.doScrollPos(a, c, b.nc.opt.snapbackspeed) : b.nc.triggerScrollEnd()
                    },
                    this.doMomentum = function(a) {
                        var e, f, g, h, i, j, k, c = b.time(),
                            d = a ? c + a: b.lasttime;
                        a = b.nc.getScrollLeft(),
                            e = b.nc.getScrollTop(),
                            f = b.nc.page.maxh,
                            g = b.nc.page.maxw,
                            b.speedx = g > 0 ? Math.min(60, b.speedx) : 0,
                            b.speedy = f > 0 ? Math.min(60, b.speedy) : 0,
                            d = d && 60 >= c - d,
                            (0 > e || e > f || 0 > a || a > g) && (d = !1),
                            a = b.speedx && d ? b.speedx: !1,
                                b.speedy && d && b.speedy || a ? (h = Math.max(16, b.steptime), h > 50 && (a = h / 50, b.speedx *= a, b.speedy *= a, h = 50), b.demulxy = 0, b.lastscrollx = b.nc.getScrollLeft(), b.chkx = b.lastscrollx, b.lastscrolly = b.nc.getScrollTop(), b.chky = b.lastscrolly, i = b.lastscrollx, j = b.lastscrolly, k = function() {
                            var a = 600 < b.time() - c ? .04 : .02;
                            b.speedx && (i = Math.floor(b.lastscrollx - b.speedx * (1 - b.demulxy)), b.lastscrollx = i, 0 > i || i > g) && (a = .1),
                                b.speedy && (j = Math.floor(b.lastscrolly - b.speedy * (1 - b.demulxy)), b.lastscrolly = j, 0 > j || j > f) && (a = .1),
                                b.demulxy = Math.min(1, b.demulxy + a),
                                b.nc.synched("domomentum2d",
                                    function() {
                                        b.speedx && (b.nc.getScrollLeft() != b.chkx && b.stop(), b.chkx = i, b.nc.setScrollLeft(i)),
                                            b.speedy && (b.nc.getScrollTop() != b.chky && b.stop(), b.chky = j, b.nc.setScrollTop(j)),
                                            b.timer || (b.nc.hideCursor(), b.doSnapy(i, j))
                                    }),
                                    1 > b.demulxy ? b.timer = setTimeout(k, h) : (b.stop(), b.nc.hideCursor(), b.doSnapy(i, j))
                        },
                            k()) : b.doSnapy(b.nc.getScrollLeft(), b.nc.getScrollTop())
                    }
            },
            r = a.fn.scrollTop,
            a.cssHooks.pageYOffset = {
                get: function(b, c) {
                    return (c = a.data(b, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollTop() : r.call(b)
                },
                set: function(b, c) {
                    var d = a.data(b, "__nicescroll") || !1;
                    return d && d.ishwscroll ? d.setScrollTop(parseInt(c)) : r.call(b, c),
                        this
                }
            },
            a.fn.scrollTop = function(b) {
                if ("undefined" == typeof b) {
                    var c = this[0] ? a.data(this[0], "__nicescroll") || !1 : !1;
                    return c && c.ishwscroll ? c.getScrollTop() : r.call(this)
                }
                return this.each(function() {
                    var c = a.data(this, "__nicescroll") || !1;
                    c && c.ishwscroll ? c.setScrollTop(parseInt(b)) : r.call(a(this), b)
                })
            },
            s = a.fn.scrollLeft,
            a.cssHooks.pageXOffset = {
                get: function(b, c) {
                    return (c = a.data(b, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollLeft() : s.call(b)
                },
                set: function(b, c) {
                    var d = a.data(b, "__nicescroll") || !1;
                    return d && d.ishwscroll ? d.setScrollLeft(parseInt(c)) : s.call(b, c),
                        this
                }
            },
            a.fn.scrollLeft = function(b) {
                if ("undefined" == typeof b) {
                    var c = this[0] ? a.data(this[0], "__nicescroll") || !1 : !1;
                    return c && c.ishwscroll ? c.getScrollLeft() : s.call(this)
                }
                return this.each(function() {
                    var c = a.data(this, "__nicescroll") || !1;
                    c && c.ishwscroll ? c.setScrollLeft(parseInt(b)) : s.call(a(this), b)
                })
            },
            t = function(b) {
                var d, e, c = this;
                if (this.length = 0, this.name = "nicescrollarray", this.each = function(a) {
                    for (var b = 0,
                             d = 0; b < c.length; b++) a.call(c[b], d++);
                    return c
                },
                    this.push = function(a) {
                        c[c.length] = a,
                            c.length++
                    },
                    this.eq = function(a) {
                        return c[a]
                    },
                    b) for (d = 0; d < b.length; d++) e = a.data(b[d], "__nicescroll") || !1,
                    e && (this[this.length] = e, this.length++);
                return this
            },
            function(a, b, c) {
                for (var d = 0; d < b.length; d++) c(a, b[d])
            } (t.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "),
                function(a, b) {
                    a[b] = function() {
                        var a = arguments;
                        return this.each(function() {
                            this[b].apply(this, a)
                        })
                    }
                }),
            a.fn.getNiceScroll = function(b) {
                return "undefined" == typeof b ? new t(this) : this[b] && a.data(this[b], "__nicescroll") || !1
            },
            a.extend(a.expr[":"], {
                nicescroll: function(b) {
                    return a.data(b, "__nicescroll") ? !0 : !1
                }
            }),
            a.fn.niceScroll = function(b, c) {
                var d, e;
                return "undefined" == typeof c && "object" == typeof b && !("jquery" in b) && (c = b, b = !1),
                    d = new t,
                    "undefined" == typeof c && (c = {}),
                    b && (c.doc = a(b), c.win = a(this)),
                    e = !("doc" in c),
                    !e && !("win" in c) && (c.win = a(this)),
                    this.each(function() {
                        var b = a(this).data("__nicescroll") || !1;
                        b || (c.doc = e ? a(this) : c.doc, b = new p(c, a(this)), a(this).data("__nicescroll", b)),
                            d.push(b)
                    }),
                        1 == d.length ? d[0] : d
            },
            window.NiceScroll = {
                getjQuery: function() {
                    return a
                }
            },
            a.nicescroll || (a.nicescroll = new t, a.nicescroll.options = m)
    }),
    !
        function(a, b, c, d) {
            "use strict";
            function e(b, c) {
                var d, e;
                this.element = b,
                    this.$context = a(b).data("api", this),
                    this.$layers = this.$context.find(".layer"),
                    d = {
                        calibrateX: this.$context.data("calibrate-x") || null,
                        calibrateY: this.$context.data("calibrate-y") || null,
                        invertX: this.$context.data("invert-x") || null,
                        invertY: this.$context.data("invert-y") || null,
                        limitX: parseFloat(this.$context.data("limit-x")) || null,
                        limitY: parseFloat(this.$context.data("limit-y")) || null,
                        scalarX: parseFloat(this.$context.data("scalar-x")) || null,
                        scalarY: parseFloat(this.$context.data("scalar-y")) || null,
                        frictionX: parseFloat(this.$context.data("friction-x")) || null,
                        frictionY: parseFloat(this.$context.data("friction-y")) || null,
                        originX: parseFloat(this.$context.data("origin-x")) || null,
                        originY: parseFloat(this.$context.data("origin-y")) || null
                    };
                for (e in d) null === d[e] && delete d[e];
                a.extend(this, h, c, d),
                    this.calibrationTimer = null,
                    this.calibrationFlag = !0,
                    this.enabled = !1,
                    this.depths = [],
                    this.raf = null,
                    this.bounds = null,
                    this.ex = 0,
                    this.ey = 0,
                    this.ew = 0,
                    this.eh = 0,
                    this.ecx = 0,
                    this.ecy = 0,
                    this.erx = 0,
                    this.ery = 0,
                    this.cx = 0,
                    this.cy = 0,
                    this.ix = 0,
                    this.iy = 0,
                    this.mx = 0,
                    this.my = 0,
                    this.vx = 0,
                    this.vy = 0,
                    this.onMouseMove = this.onMouseMove.bind(this),
                    this.onDeviceOrientation = this.onDeviceOrientation.bind(this),
                    this.onOrientationTimer = this.onOrientationTimer.bind(this),
                    this.onCalibrationTimer = this.onCalibrationTimer.bind(this),
                    this.onAnimationFrame = this.onAnimationFrame.bind(this),
                    this.onWindowResize = this.onWindowResize.bind(this),
                    this.initialise()
            }
            var i, f = "parallax",
                g = 30,
                h = {
                    relativeInput: !1,
                    clipRelativeInput: !1,
                    calibrationThreshold: 100,
                    calibrationDelay: 500,
                    supportDelay: 500,
                    calibrateX: !1,
                    calibrateY: !0,
                    invertX: !0,
                    invertY: !0,
                    limitX: !1,
                    limitY: !1,
                    scalarX: 10,
                    scalarY: 10,
                    frictionX: .1,
                    frictionY: .1,
                    originX: .5,
                    originY: .5
                };
            e.prototype.transformSupport = function(a) {
                var e, f, g, h, i, j, k, l, m, n, o;
                for (e = c.createElement("div"), f = !1, g = null, h = !1, i = null, j = null, k = 0, l = this.vendors.length; l > k; k++) if (null !== this.vendors[k] ? (i = this.vendors[k][0] + "transform", j = this.vendors[k][1] + "Transform") : (i = "transform", j = "transform"), e.style[j] !== d) {
                    f = !0;
                    break
                }
                switch (a) {
                    case "2D":
                        h = f;
                        break;
                    case "3D":
                        f && (m = c.body || c.createElement("body"), n = c.documentElement, o = n.style.overflow, c.body || (n.style.overflow = "hidden", n.appendChild(m), m.style.overflow = "hidden", m.style.background = ""), m.appendChild(e), e.style[j] = "translate3d(1px,1px,1px)", g = b.getComputedStyle(e).getPropertyValue(i), h = g !== d && g.length > 0 && "none" !== g, n.style.overflow = o, m.removeChild(e))
                }
                return h
            },
                e.prototype.ww = null,
                e.prototype.wh = null,
                e.prototype.wcx = null,
                e.prototype.wcy = null,
                e.prototype.wrx = null,
                e.prototype.wry = null,
                e.prototype.portrait = null,
                e.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
                e.prototype.vendors = [null, ["-webkit-", "webkit"], ["-moz-", "Moz"], ["-o-", "O"], ["-ms-", "ms"]],
                e.prototype.motionSupport = !!b.DeviceMotionEvent,
                e.prototype.orientationSupport = !!b.DeviceOrientationEvent,
                e.prototype.orientationStatus = 0,
                e.prototype.transform2DSupport = e.prototype.transformSupport("2D"),
                e.prototype.transform3DSupport = e.prototype.transformSupport("3D"),
                e.prototype.propertyCache = {},
                e.prototype.initialise = function() {
                    "static" === this.$context.css("position") && this.$context.css({
                        position: "relative"
                    }),
                        this.accelerate(this.$context),
                        this.updateLayers(),
                        this.updateDimensions(),
                        this.enable(),
                        this.queueCalibration(this.calibrationDelay)
                },
                e.prototype.updateLayers = function() {
                    this.$layers = this.$context.find(".layer"),
                        this.depths = [],
                        this.$layers.css({
                            position: "absolute",
                            display: "block",
                            left: 0,
                            top: 0
                        }),
                        this.$layers.first().css({
                            position: "relative"
                        }),
                        this.accelerate(this.$layers),
                        this.$layers.each(a.proxy(function(b, c) {
                                this.depths.push(a(c).data("depth") || 0)
                            },
                            this))
                },
                e.prototype.updateDimensions = function() {
                    this.ww = b.innerWidth,
                        this.wh = b.innerHeight,
                        this.wcx = this.ww * this.originX,
                        this.wcy = this.wh * this.originY,
                        this.wrx = Math.max(this.wcx, this.ww - this.wcx),
                        this.wry = Math.max(this.wcy, this.wh - this.wcy)
                },
                e.prototype.updateBounds = function() {
                    this.bounds = this.element.getBoundingClientRect(),
                        this.ex = this.bounds.left,
                        this.ey = this.bounds.top,
                        this.ew = this.bounds.width,
                        this.eh = this.bounds.height,
                        this.ecx = this.ew * this.originX,
                        this.ecy = this.eh * this.originY,
                        this.erx = Math.max(this.ecx, this.ew - this.ecx),
                        this.ery = Math.max(this.ecy, this.eh - this.ecy)
                },
                e.prototype.queueCalibration = function(a) {
                    clearTimeout(this.calibrationTimer),
                        this.calibrationTimer = setTimeout(this.onCalibrationTimer, a)
                },
                e.prototype.enable = function() {
                    this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, b.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0, this.cy = 0, this.portrait = !1, b.addEventListener("mousemove", this.onMouseMove)), b.addEventListener("resize", this.onWindowResize), this.raf = requestAnimationFrame(this.onAnimationFrame))
                },
                e.prototype.disable = function() {
                    this.enabled && (this.enabled = !1, this.orientationSupport ? b.removeEventListener("deviceorientation", this.onDeviceOrientation) : b.removeEventListener("mousemove", this.onMouseMove), b.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf))
                },
                e.prototype.calibrate = function(a, b) {
                    this.calibrateX = a === d ? this.calibrateX: a,
                        this.calibrateY = b === d ? this.calibrateY: b
                },
                e.prototype.invert = function(a, b) {
                    this.invertX = a === d ? this.invertX: a,
                        this.invertY = b === d ? this.invertY: b
                },
                e.prototype.friction = function(a, b) {
                    this.frictionX = a === d ? this.frictionX: a,
                        this.frictionY = b === d ? this.frictionY: b
                },
                e.prototype.scalar = function(a, b) {
                    this.scalarX = a === d ? this.scalarX: a,
                        this.scalarY = b === d ? this.scalarY: b
                },
                e.prototype.limit = function(a, b) {
                    this.limitX = a === d ? this.limitX: a,
                        this.limitY = b === d ? this.limitY: b
                },
                e.prototype.origin = function(a, b) {
                    this.originX = a === d ? this.originX: a,
                        this.originY = b === d ? this.originY: b
                },
                e.prototype.clamp = function(a, b, c) {
                    return a = Math.max(a, b),
                        a = Math.min(a, c)
                },
                e.prototype.css = function(b, c, e) {
                    var g, h, f = this.propertyCache[c];
                    if (!f) for (g = 0, h = this.vendors.length; h > g; g++) if (f = null !== this.vendors[g] ? a.camelCase(this.vendors[g][1] + "-" + c) : c, b.style[f] !== d) {
                        this.propertyCache[c] = f;
                        break
                    }
                    b.style[f] = e
                },
                e.prototype.accelerate = function(a) {
                    var b, c, d;
                    for (b = 0, c = a.length; c > b; b++) d = a[b],
                        this.css(d, "transform", "translate3d(0,0,0)"),
                        this.css(d, "transform-style", "preserve-3d"),
                        this.css(d, "backface-visibility", "hidden")
                },
                e.prototype.setPosition = function(a, b, c) {
                    b += "px",
                        c += "px",
                        this.transform3DSupport ? this.css(a, "transform", "translate3d(" + b + "," + c + ",0)") : this.transform2DSupport ? this.css(a, "transform", "translate(" + b + "," + c + ")") : (a.style.left = b, a.style.top = c)
                },
                e.prototype.onOrientationTimer = function() {
                    this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, this.enable())
                },
                e.prototype.onCalibrationTimer = function() {
                    this.calibrationFlag = !0
                },
                e.prototype.onWindowResize = function() {
                    this.updateDimensions()
                },
                e.prototype.onAnimationFrame = function() {
                    var a, b, c, d, e, f, g, h;
                    for (this.updateBounds(), a = this.ix - this.cx, b = this.iy - this.cy, (Math.abs(a) > this.calibrationThreshold || Math.abs(b) > this.calibrationThreshold) && this.queueCalibration(0), this.portrait ? (this.mx = this.calibrateX ? b: this.iy, this.my = this.calibrateY ? a: this.ix) : (this.mx = this.calibrateX ? a: this.ix, this.my = this.calibrateY ? b: this.iy), this.mx *= this.ew * (this.scalarX / 100), this.my *= this.eh * (this.scalarY / 100), isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)), isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)), this.vx += (this.mx - this.vx) * this.frictionX, this.vy += (this.my - this.vy) * this.frictionY, c = 0, d = this.$layers.length; d > c; c++) e = this.depths[c],
                        f = this.$layers[c],
                        g = this.vx * e * (this.invertX ? -1 : 1),
                        h = this.vy * e * (this.invertY ? -1 : 1),
                        this.setPosition(f, g, h);
                    this.raf = requestAnimationFrame(this.onAnimationFrame)
                },
                e.prototype.onDeviceOrientation = function(a) {
                    if (!this.desktop && null !== a.beta && null !== a.gamma) {
                        this.orientationStatus = 1;
                        var c = (a.beta || 0) / g,
                            d = (a.gamma || 0) / g,
                            e = b.innerHeight > b.innerWidth;
                        this.portrait !== e && (this.portrait = e, this.calibrationFlag = !0),
                            this.calibrationFlag && (this.calibrationFlag = !1, this.cx = c, this.cy = d),
                            this.ix = c,
                            this.iy = d
                    }
                },
                e.prototype.onMouseMove = function(a) {
                    var b = a.clientX,
                        c = a.clientY; ! this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (b = Math.max(b, this.ex), b = Math.min(b, this.ex + this.ew), c = Math.max(c, this.ey), c = Math.min(c, this.ey + this.eh)), this.ix = (b - this.ex - this.ecx) / this.erx, this.iy = (c - this.ey - this.ecy) / this.ery) : (this.ix = (b - this.wcx) / this.wrx, this.iy = (c - this.wcy) / this.wry)
                },
                i = {
                    enable: e.prototype.enable,
                    disable: e.prototype.disable,
                    updateLayers: e.prototype.updateLayers,
                    calibrate: e.prototype.calibrate,
                    friction: e.prototype.friction,
                    invert: e.prototype.invert,
                    scalar: e.prototype.scalar,
                    limit: e.prototype.limit,
                    origin: e.prototype.origin
                },
                a.fn[f] = function(b) {
                    var c = arguments;
                    return this.each(function() {
                        var d = a(this),
                            g = d.data(f);
                        g || (g = new e(this, b), d.data(f, g)),
                            i[b] && g[b].apply(g, Array.prototype.slice.call(c, 1))
                    })
                }
        } (window.jQuery || window.Zepto, window, document),
    function() {
        for (var a = 0,
                 b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
            window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
            var c = (new Date).getTime(),
                d = Math.max(0, 16 - (c - a)),
                e = window.setTimeout(function() {
                        b(c + d)
                    },
                    d);
            return a = c + d,
                e
        }),
            window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        })
    } (),
    function(a) {
        var b = {
            set: {
                colors: 1,
                values: 1,
                backgroundColor: 1,
                scaleColors: 1,
                normalizeFunction: 1,
                focus: 1
            },
            get: {
                selectedRegions: 1,
                selectedMarkers: 1,
                mapObject: 1,
                regionName: 1
            }
        };
        a.fn.vectorMap = function(a) {
            var c, d, c = this.children(".jvectormap-container").data("mapObject");
            if ("addMap" === a) jvm.WorldMap.maps[arguments[1]] = arguments[2];
            else {
                if (("set" === a || "get" === a) && b[a][arguments[1]]) return d = arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1),
                    c[a + d].apply(c, Array.prototype.slice.call(arguments, 2));
                a = a || {},
                    a.container = this,
                    c = new jvm.WorldMap(a)
            }
            return this
        }
    } (jQuery),
    function(a) {
        function b(b) {
            var c = b || window.event,
                d = [].slice.call(arguments, 1),
                e = 0,
                g = 0,
                h = 0;
            return b = a.event.fix(c),
                b.type = "mousewheel",
                c.wheelDelta && (e = c.wheelDelta / 120),
                c.detail && (e = -c.detail / 3),
                h = e,
                void 0 !== c.axis && c.axis === c.HORIZONTAL_AXIS && (h = 0, g = -1 * e),
                void 0 !== c.wheelDeltaY && (h = c.wheelDeltaY / 120),
                void 0 !== c.wheelDeltaX && (g = -1 * c.wheelDeltaX / 120),
                d.unshift(b, e, g, h),
                (a.event.dispatch || a.event.handle).apply(this, d)
        }
        var d, c = ["DOMMouseScroll", "mousewheel"];
        if (a.event.fixHooks) for (d = c.length; d;) a.event.fixHooks[c[--d]] = a.event.mouseHooks;
        a.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener) for (var a = c.length; a;) this.addEventListener(c[--a], b, !1);
                else this.onmousewheel = b
            },
            teardown: function() {
                if (this.removeEventListener) for (var a = c.length; a;) this.removeEventListener(c[--a], b, !1);
                else this.onmousewheel = null
            }
        },
            a.fn.extend({
                mousewheel: function(a) {
                    return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
                },
                unmousewheel: function(a) {
                    return this.unbind("mousewheel", a)
                }
            })
    } (jQuery);
var jvm = {
    inherits: function(a, b) {
        function c() {}
        c.prototype = b.prototype,
            a.prototype = new c,
            a.prototype.constructor = a,
            a.parentClass = b
    },
    mixin: function(a, b) {
        var c;
        for (c in b.prototype) b.prototype.hasOwnProperty(c) && (a.prototype[c] = b.prototype[c])
    },
    min: function(a) {
        var c, b = Number.MAX_VALUE;
        if (a instanceof Array) for (c = 0; c < a.length; c++) a[c] < b && (b = a[c]);
        else for (c in a) a[c] < b && (b = a[c]);
        return b
    },
    max: function(a) {
        var c, b = Number.MIN_VALUE;
        if (a instanceof Array) for (c = 0; c < a.length; c++) a[c] > b && (b = a[c]);
        else for (c in a) a[c] > b && (b = a[c]);
        return b
    },
    keys: function(a) {
        var c, b = [];
        for (c in a) b.push(c);
        return b
    },
    values: function(a) {
        var c, d, b = [];
        for (d = 0; d < arguments.length; d++) {
            a = arguments[d];
            for (c in a) b.push(a[c])
        }
        return b
    }
};
jvm.$ = jQuery,
    jvm.AbstractElement = function(a, b) {
        this.node = this.createElement(a),
            this.name = a,
            this.properties = {},
            b && this.set(b)
    },
    jvm.AbstractElement.prototype.set = function(a, b) {
        var c;
        if ("object" == typeof a) for (c in a) this.properties[c] = a[c],
            this.applyAttr(c, a[c]);
        else this.properties[a] = b,
            this.applyAttr(a, b)
    },
    jvm.AbstractElement.prototype.get = function(a) {
        return this.properties[a]
    },
    jvm.AbstractElement.prototype.applyAttr = function(a, b) {
        this.node.setAttribute(a, b)
    },
    jvm.AbstractElement.prototype.remove = function() {
        jvm.$(this.node).remove()
    },
    jvm.AbstractCanvasElement = function(a, b, c) {
        this.container = a,
            this.setSize(b, c),
            this.rootElement = new jvm[this.classPrefix + "GroupElement"],
            this.node.appendChild(this.rootElement.node),
            this.container.appendChild(this.node)
    },
    jvm.AbstractCanvasElement.prototype.add = function(a, b) {
        b = b || this.rootElement,
            b.add(a),
            a.canvas = this
    },
    jvm.AbstractCanvasElement.prototype.addPath = function(a, b, c) {
        var d = new jvm[this.classPrefix + "PathElement"](a, b);
        return this.add(d, c),
            d
    },
    jvm.AbstractCanvasElement.prototype.addCircle = function(a, b, c) {
        var d = new jvm[this.classPrefix + "CircleElement"](a, b);
        return this.add(d, c),
            d
    },
    jvm.AbstractCanvasElement.prototype.addGroup = function(a) {
        var b = new jvm[this.classPrefix + "GroupElement"];
        return a ? a.node.appendChild(b.node) : this.node.appendChild(b.node),
            b.canvas = this,
            b
    },
    jvm.AbstractShapeElement = function(a, b, c) {
        this.style = c || {},
            this.style.current = {},
            this.isHovered = !1,
            this.isSelected = !1,
            this.updateStyle()
    },
    jvm.AbstractShapeElement.prototype.setHovered = function(a) {
        this.isHovered !== a && (this.isHovered = a, this.updateStyle())
    },
    jvm.AbstractShapeElement.prototype.setSelected = function(a) {
        this.isSelected !== a && (this.isSelected = a, this.updateStyle(), jvm.$(this.node).trigger("selected", [a]))
    },
    jvm.AbstractShapeElement.prototype.setStyle = function(a, b) {
        var c = {};
        "object" == typeof a ? c = a: c[a] = b,
            jvm.$.extend(this.style.current, c),
            this.updateStyle()
    },
    jvm.AbstractShapeElement.prototype.updateStyle = function() {
        var a = {};
        jvm.AbstractShapeElement.mergeStyles(a, this.style.initial),
            jvm.AbstractShapeElement.mergeStyles(a, this.style.current),
            this.isHovered && jvm.AbstractShapeElement.mergeStyles(a, this.style.hover),
            this.isSelected && (jvm.AbstractShapeElement.mergeStyles(a, this.style.selected), this.isHovered && jvm.AbstractShapeElement.mergeStyles(a, this.style.selectedHover)),
            this.set(a)
    },
    jvm.AbstractShapeElement.mergeStyles = function(a, b) {
        var c;
        b = b || {};
        for (c in b) null === b[c] ? delete a[c] : a[c] = b[c]
    },
    jvm.SVGElement = function() {
        jvm.SVGElement.parentClass.apply(this, arguments)
    },
    jvm.inherits(jvm.SVGElement, jvm.AbstractElement),
    jvm.SVGElement.svgns = "http://www.w3.org/2000/svg",
    jvm.SVGElement.prototype.createElement = function(a) {
        return document.createElementNS(jvm.SVGElement.svgns, a)
    },
    jvm.SVGElement.prototype.addClass = function(a) {
        this.node.setAttribute("class", a)
    },
    jvm.SVGElement.prototype.getElementCtr = function(a) {
        return jvm["SVG" + a]
    },
    jvm.SVGElement.prototype.getBBox = function() {
        return this.node.getBBox()
    },
    jvm.SVGGroupElement = function() {
        jvm.SVGGroupElement.parentClass.call(this, "g")
    },
    jvm.inherits(jvm.SVGGroupElement, jvm.SVGElement),
    jvm.SVGGroupElement.prototype.add = function(a) {
        this.node.appendChild(a.node)
    },
    jvm.SVGCanvasElement = function() {
        this.classPrefix = "SVG",
            jvm.SVGCanvasElement.parentClass.call(this, "svg"),
            jvm.AbstractCanvasElement.apply(this, arguments)
    },
    jvm.inherits(jvm.SVGCanvasElement, jvm.SVGElement),
    jvm.mixin(jvm.SVGCanvasElement, jvm.AbstractCanvasElement),
    jvm.SVGCanvasElement.prototype.setSize = function(a, b) {
        this.width = a,
            this.height = b,
            this.node.setAttribute("width", a),
            this.node.setAttribute("height", b)
    },
    jvm.SVGCanvasElement.prototype.applyTransformParams = function(a, b, c) {
        this.scale = a,
            this.transX = b,
            this.transY = c,
            this.rootElement.node.setAttribute("transform", "scale(" + a + ") translate(" + b + ", " + c + ")")
    },
    jvm.SVGShapeElement = function(a, b) {
        jvm.SVGShapeElement.parentClass.call(this, a, b),
            jvm.AbstractShapeElement.apply(this, arguments)
    },
    jvm.inherits(jvm.SVGShapeElement, jvm.SVGElement),
    jvm.mixin(jvm.SVGShapeElement, jvm.AbstractShapeElement),
    jvm.SVGPathElement = function(a, b) {
        jvm.SVGPathElement.parentClass.call(this, "path", a, b),
            this.node.setAttribute("fill-rule", "evenodd")
    },
    jvm.inherits(jvm.SVGPathElement, jvm.SVGShapeElement),
    jvm.SVGCircleElement = function(a, b) {
        jvm.SVGCircleElement.parentClass.call(this, "circle", a, b)
    },
    jvm.inherits(jvm.SVGCircleElement, jvm.SVGShapeElement),
    jvm.VMLElement = function() {
        jvm.VMLElement.VMLInitialized || jvm.VMLElement.initializeVML(),
            jvm.VMLElement.parentClass.apply(this, arguments)
    },
    jvm.inherits(jvm.VMLElement, jvm.AbstractElement),
    jvm.VMLElement.VMLInitialized = !1,
    jvm.VMLElement.initializeVML = function() {
        try {
            document.namespaces.rvml || document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                jvm.VMLElement.prototype.createElement = function(a) {
                    return document.createElement("<rvml:" + a + ' class="rvml">')
                }
        } catch(a) {
            jvm.VMLElement.prototype.createElement = function(a) {
                return document.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)"),
            jvm.VMLElement.VMLInitialized = !0
    },
    jvm.VMLElement.prototype.getElementCtr = function(a) {
        return jvm["VML" + a]
    },
    jvm.VMLElement.prototype.addClass = function(a) {
        jvm.$(this.node).addClass(a)
    },
    jvm.VMLElement.prototype.applyAttr = function(a, b) {
        this.node[a] = b
    },
    jvm.VMLElement.prototype.getBBox = function() {
        var a = jvm.$(this.node);
        return {
            x: a.position().left / this.canvas.scale,
            y: a.position().top / this.canvas.scale,
            width: a.width() / this.canvas.scale,
            height: a.height() / this.canvas.scale
        }
    },
    jvm.VMLGroupElement = function() {
        jvm.VMLGroupElement.parentClass.call(this, "group"),
            this.node.style.left = "0px",
            this.node.style.top = "0px",
            this.node.coordorigin = "0 0"
    },
    jvm.inherits(jvm.VMLGroupElement, jvm.VMLElement),
    jvm.VMLGroupElement.prototype.add = function(a) {
        this.node.appendChild(a.node)
    },
    jvm.VMLCanvasElement = function() {
        this.classPrefix = "VML",
            jvm.VMLCanvasElement.parentClass.call(this, "group"),
            jvm.AbstractCanvasElement.apply(this, arguments),
            this.node.style.position = "absolute"
    },
    jvm.inherits(jvm.VMLCanvasElement, jvm.VMLElement),
    jvm.mixin(jvm.VMLCanvasElement, jvm.AbstractCanvasElement),
    jvm.VMLCanvasElement.prototype.setSize = function(a, b) {
        var c, d, e, f;
        if (this.width = a, this.height = b, this.node.style.width = a + "px", this.node.style.height = b + "px", this.node.coordsize = a + " " + b, this.node.coordorigin = "0 0", this.rootElement) {
            for (c = this.rootElement.node.getElementsByTagName("shape"), e = 0, f = c.length; f > e; e++) c[e].coordsize = a + " " + b,
                c[e].style.width = a + "px",
                c[e].style.height = b + "px";
            for (d = this.node.getElementsByTagName("group"), e = 0, f = d.length; f > e; e++) d[e].coordsize = a + " " + b,
                d[e].style.width = a + "px",
                d[e].style.height = b + "px"
        }
    },
    jvm.VMLCanvasElement.prototype.applyTransformParams = function(a, b, c) {
        this.scale = a,
            this.transX = b,
            this.transY = c,
            this.rootElement.node.coordorigin = this.width - b - this.width / 100 + "," + (this.height - c - this.height / 100),
            this.rootElement.node.coordsize = this.width / a + "," + this.height / a
    },
    jvm.VMLShapeElement = function(a, b) {
        jvm.VMLShapeElement.parentClass.call(this, a, b),
            this.fillElement = new jvm.VMLElement("fill"),
            this.strokeElement = new jvm.VMLElement("stroke"),
            this.node.appendChild(this.fillElement.node),
            this.node.appendChild(this.strokeElement.node),
            this.node.stroked = !1,
            jvm.AbstractShapeElement.apply(this, arguments)
    },
    jvm.inherits(jvm.VMLShapeElement, jvm.VMLElement),
    jvm.mixin(jvm.VMLShapeElement, jvm.AbstractShapeElement),
    jvm.VMLShapeElement.prototype.applyAttr = function(a, b) {
        switch (a) {
            case "fill":
                this.node.fillcolor = b;
                break;
            case "fill-opacity":
                this.fillElement.node.opacity = Math.round(100 * b) + "%";
                break;
            case "stroke":
                this.node.stroked = "none" === b ? !1 : !0,
                    this.node.strokecolor = b;
                break;
            case "stroke-opacity":
                this.strokeElement.node.opacity = Math.round(100 * b) + "%";
                break;
            case "stroke-width":
                this.node.stroked = 0 === parseInt(b, 10) ? !1 : !0,
                    this.node.strokeweight = b;
                break;
            case "d":
                this.node.path = jvm.VMLPathElement.pathSvgToVml(b);
                break;
            default:
                jvm.VMLShapeElement.parentClass.prototype.applyAttr.apply(this, arguments)
        }
    },
    jvm.VMLPathElement = function(a, b) {
        var c = new jvm.VMLElement("skew");
        jvm.VMLPathElement.parentClass.call(this, "shape", a, b),
            this.node.coordorigin = "0 0",
            c.node.on = !0,
            c.node.matrix = "0.01,0,0,0.01,0,0",
            c.node.offset = "0,0",
            this.node.appendChild(c.node)
    },
    jvm.inherits(jvm.VMLPathElement, jvm.VMLShapeElement),
    jvm.VMLPathElement.prototype.applyAttr = function(a, b) {
        "d" === a ? this.node.path = jvm.VMLPathElement.pathSvgToVml(b) : jvm.VMLShapeElement.prototype.applyAttr.call(this, a, b)
    },
    jvm.VMLPathElement.pathSvgToVml = function(a) {
        var e, f, c = 0,
            d = 0;
        return a = a.replace(/(-?\d+)e(-?\d+)/g, "0"),
            a.replace(/([MmLlHhVvCcSs])\s*((?:-?\d*(?:\.\d+)?\s*,?\s*)+)/g,
                function(a, b, g) {
                    g = g.replace(/(\d)-/g, "$1,-").replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, ",").split(","),
                        g[0] || g.shift();
                    for (var i = 0,
                             j = g.length; j > i; i++) g[i] = Math.round(100 * g[i]);
                    switch (b) {
                        case "m":
                            return c += g[0],
                                d += g[1],
                                "t" + g.join(",");
                        case "M":
                            return c = g[0],
                                d = g[1],
                                "m" + g.join(",");
                        case "l":
                            return c += g[0],
                                d += g[1],
                                "r" + g.join(",");
                        case "L":
                            return c = g[0],
                                d = g[1],
                                "l" + g.join(",");
                        case "h":
                            return c += g[0],
                                "r" + g[0] + ",0";
                        case "H":
                            return c = g[0],
                                "l" + c + "," + d;
                        case "v":
                            return d += g[0],
                                "r0," + g[0];
                        case "V":
                            return d = g[0],
                                "l" + c + "," + d;
                        case "c":
                            return e = c + g[g.length - 4],
                                f = d + g[g.length - 3],
                                c += g[g.length - 2],
                                d += g[g.length - 1],
                                "v" + g.join(",");
                        case "C":
                            return e = g[g.length - 4],
                                f = g[g.length - 3],
                                c = g[g.length - 2],
                                d = g[g.length - 1],
                                "c" + g.join(",");
                        case "s":
                            return g.unshift(d - f),
                                g.unshift(c - e),
                                e = c + g[g.length - 4],
                                f = d + g[g.length - 3],
                                c += g[g.length - 2],
                                d += g[g.length - 1],
                                "v" + g.join(",");
                        case "S":
                            return g.unshift(d + d - f),
                                g.unshift(c + c - e),
                                e = g[g.length - 4],
                                f = g[g.length - 3],
                                c = g[g.length - 2],
                                d = g[g.length - 1],
                                "c" + g.join(",")
                    }
                    return ""
                }).replace(/z/g, "e")
    },
    jvm.VMLCircleElement = function(a, b) {
        jvm.VMLCircleElement.parentClass.call(this, "oval", a, b)
    },
    jvm.inherits(jvm.VMLCircleElement, jvm.VMLShapeElement),
    jvm.VMLCircleElement.prototype.applyAttr = function(a, b) {
        switch (a) {
            case "r":
                this.node.style.width = 2 * b + "px",
                    this.node.style.height = 2 * b + "px",
                    this.applyAttr("cx", this.get("cx") || 0),
                    this.applyAttr("cy", this.get("cy") || 0);
                break;
            case "cx":
                if (!b) return;
                this.node.style.left = b - (this.get("r") || 0) + "px";
                break;
            case "cy":
                if (!b) return;
                this.node.style.top = b - (this.get("r") || 0) + "px";
                break;
            default:
                jvm.VMLCircleElement.parentClass.prototype.applyAttr.call(this, a, b)
        }
    },
    jvm.VectorCanvas = function(a, b, c) {
        return this.mode = window.SVGAngle ? "svg": "vml",
            this.impl = "svg" == this.mode ? new jvm.SVGCanvasElement(a, b, c) : new jvm.VMLCanvasElement(a, b, c),
            this.impl
    },
    jvm.SimpleScale = function(a) {
        this.scale = a
    },
    jvm.SimpleScale.prototype.getValue = function(a) {
        return a
    },
    jvm.OrdinalScale = function(a) {
        this.scale = a
    },
    jvm.OrdinalScale.prototype.getValue = function(a) {
        return this.scale[a]
    },
    jvm.NumericScale = function(a, b, c, d) {
        this.scale = [],
            b = b || "linear",
            a && this.setScale(a),
            b && this.setNormalizeFunction(b),
            c && this.setMin(c),
            d && this.setMax(d)
    },
    jvm.NumericScale.prototype = {
        setMin: function(a) {
            this.clearMinValue = a,
                this.minValue = "function" == typeof this.normalize ? this.normalize(a) : a
        },
        setMax: function(a) {
            this.clearMaxValue = a,
                this.maxValue = "function" == typeof this.normalize ? this.normalize(a) : a
        },
        setScale: function(a) {
            var b;
            for (b = 0; b < a.length; b++) this.scale[b] = [a[b]]
        },
        setNormalizeFunction: function(a) {
            "polynomial" === a ? this.normalize = function(a) {
                return Math.pow(a, .2)
            }: "linear" === a ? delete this.normalize: this.normalize = a,
                this.setMin(this.clearMinValue),
                this.setMax(this.clearMaxValue)
        },
        getValue: function(a) {
            var d, f, b = [],
                c = 0,
                e = 0;
            for ("function" == typeof this.normalize && (a = this.normalize(a)), e = 0; e < this.scale.length - 1; e++) d = this.vectorLength(this.vectorSubtract(this.scale[e + 1], this.scale[e])),
                b.push(d),
                c += d;
            for (f = (this.maxValue - this.minValue) / c, e = 0; e < b.length; e++) b[e] *= f;
            for (e = 0, a -= this.minValue; a - b[e] >= 0;) a -= b[e],
                e++;
            return a = e == this.scale.length - 1 ? this.vectorToNum(this.scale[e]) : this.vectorToNum(this.vectorAdd(this.scale[e], this.vectorMult(this.vectorSubtract(this.scale[e + 1], this.scale[e]), a / b[e])))
        },
        vectorToNum: function(a) {
            var c, b = 0;
            for (c = 0; c < a.length; c++) b += Math.round(a[c]) * Math.pow(256, a.length - c - 1);
            return b
        },
        vectorSubtract: function(a, b) {
            var d, c = [];
            for (d = 0; d < a.length; d++) c[d] = a[d] - b[d];
            return c
        },
        vectorAdd: function(a, b) {
            var d, c = [];
            for (d = 0; d < a.length; d++) c[d] = a[d] + b[d];
            return c
        },
        vectorMult: function(a, b) {
            var d, c = [];
            for (d = 0; d < a.length; d++) c[d] = a[d] * b;
            return c
        },
        vectorLength: function(a) {
            var c, b = 0;
            for (c = 0; c < a.length; c++) b += a[c] * a[c];
            return Math.sqrt(b)
        }
    },
    jvm.ColorScale = function() {
        jvm.ColorScale.parentClass.apply(this, arguments)
    },
    jvm.inherits(jvm.ColorScale, jvm.NumericScale),
    jvm.ColorScale.prototype.setScale = function(a) {
        var b;
        for (b = 0; b < a.length; b++) this.scale[b] = jvm.ColorScale.rgbToArray(a[b])
    },
    jvm.ColorScale.prototype.getValue = function(a) {
        return jvm.ColorScale.numToRgb(jvm.ColorScale.parentClass.prototype.getValue.call(this, a))
    },
    jvm.ColorScale.arrayToRgb = function(a) {
        var c, d, b = "#";
        for (d = 0; d < a.length; d++) c = a[d].toString(16),
            b += 1 == c.length ? "0" + c: c;
        return b
    },
    jvm.ColorScale.numToRgb = function(a) {
        for (a = a.toString(16); a.length < 6;) a = "0" + a;
        return "#" + a
    },
    jvm.ColorScale.rgbToArray = function(a) {
        return a = a.substr(1),
            [parseInt(a.substr(0, 2), 16), parseInt(a.substr(2, 2), 16), parseInt(a.substr(4, 2), 16)]
    },
    jvm.DataSeries = function(a, b) {
        var c;
        a = a || {},
            a.attribute = a.attribute || "fill",
            this.elements = b,
            this.params = a,
            a.attributes && this.setAttributes(a.attributes),
            jvm.$.isArray(a.scale) ? (c = "fill" === a.attribute || "stroke" === a.attribute ? jvm.ColorScale: jvm.NumericScale, this.scale = new c(a.scale, a.normalizeFunction, a.min, a.max)) : this.scale = a.scale ? new jvm.OrdinalScale(a.scale) : new jvm.SimpleScale(a.scale),
            this.values = a.values || {},
            this.setValues(this.values)
    },
    jvm.DataSeries.prototype = {
        setAttributes: function(a, b) {
            var d, c = a;
            if ("string" == typeof a) this.elements[a] && this.elements[a].setStyle(this.params.attribute, b);
            else for (d in c) this.elements[d] && this.elements[d].element.setStyle(this.params.attribute, c[d])
        },
        setValues: function(a) {
            var d, e, b = Number.MIN_VALUE,
                c = Number.MAX_VALUE,
                f = {};
            if (this.scale instanceof jvm.OrdinalScale || this.scale instanceof jvm.SimpleScale) for (e in a) f[e] = a[e] ? this.scale.getValue(a[e]) : this.elements[e].element.style.initial[this.params.attribute];
            else {
                if (!this.params.min || !this.params.max) {
                    for (e in a) d = parseFloat(a[e]),
                        d > b && (b = a[e]),
                        c > d && (c = d);
                    this.params.min || this.scale.setMin(c),
                        this.params.max || this.scale.setMax(b),
                        this.params.min = c,
                        this.params.max = b
                }
                for (e in a) d = parseFloat(a[e]),
                    f[e] = isNaN(d) ? this.elements[e].element.style.initial[this.params.attribute] : this.scale.getValue(d)
            }
            this.setAttributes(f),
                jvm.$.extend(this.values, a)
        },
        clear: function() {
            var a, b = {};
            for (a in this.values) this.elements[a] && (b[a] = this.elements[a].element.style.initial[this.params.attribute]);
            this.setAttributes(b),
                this.values = {}
        },
        setScale: function(a) {
            this.scale.setScale(a),
                this.values && this.setValues(this.values)
        },
        setNormalizeFunction: function(a) {
            this.scale.setNormalizeFunction(a),
                this.values && this.setValues(this.values)
        }
    },
    jvm.Proj = {
        degRad: 180 / Math.PI,
        radDeg: Math.PI / 180,
        radius: 6381372,
        sgn: function(a) {
            return a > 0 ? 1 : 0 > a ? -1 : a
        },
        mill: function(a, b, c) {
            return {
                x: this.radius * (b - c) * this.radDeg,
                y: -this.radius * Math.log(Math.tan((45 + .4 * a) * this.radDeg)) / .8
            }
        },
        mill_inv: function(a, b, c) {
            return {
                lat: (2.5 * Math.atan(Math.exp(.8 * b / this.radius)) - 5 * Math.PI / 8) * this.degRad,
                lng: (c * this.radDeg + a / this.radius) * this.degRad
            }
        },
        merc: function(a, b, c) {
            return {
                x: this.radius * (b - c) * this.radDeg,
                y: -this.radius * Math.log(Math.tan(Math.PI / 4 + a * Math.PI / 360))
            }
        },
        merc_inv: function(a, b, c) {
            return {
                lat: (2 * Math.atan(Math.exp(b / this.radius)) - Math.PI / 2) * this.degRad,
                lng: (c * this.radDeg + a / this.radius) * this.degRad
            }
        },
        aea: function(a, b, c) {
            var d = 0,
                e = c * this.radDeg,
                f = 29.5 * this.radDeg,
                g = 45.5 * this.radDeg,
                h = a * this.radDeg,
                i = b * this.radDeg,
                j = (Math.sin(f) + Math.sin(g)) / 2,
                k = Math.cos(f) * Math.cos(f) + 2 * j * Math.sin(f),
                l = j * (i - e),
                m = Math.sqrt(k - 2 * j * Math.sin(h)) / j,
                n = Math.sqrt(k - 2 * j * Math.sin(d)) / j;
            return {
                x: m * Math.sin(l) * this.radius,
                y: -(n - m * Math.cos(l)) * this.radius
            }
        },
        aea_inv: function(a, b, c) {
            var d = a / this.radius,
                e = b / this.radius,
                f = 0,
                g = c * this.radDeg,
                h = 29.5 * this.radDeg,
                i = 45.5 * this.radDeg,
                j = (Math.sin(h) + Math.sin(i)) / 2,
                k = Math.cos(h) * Math.cos(h) + 2 * j * Math.sin(h),
                l = Math.sqrt(k - 2 * j * Math.sin(f)) / j,
                m = Math.sqrt(d * d + (l - e) * (l - e)),
                n = Math.atan(d / (l - e));
            return {
                lat: Math.asin((k - m * m * j * j) / (2 * j)) * this.degRad,
                lng: (g + n / j) * this.degRad
            }
        },
        lcc: function(a, b, c) {
            var d = 0,
                e = c * this.radDeg,
                f = b * this.radDeg,
                g = 33 * this.radDeg,
                h = 45 * this.radDeg,
                i = a * this.radDeg,
                j = Math.log(Math.cos(g) * (1 / Math.cos(h))) / Math.log(Math.tan(Math.PI / 4 + h / 2) * (1 / Math.tan(Math.PI / 4 + g / 2))),
                k = Math.cos(g) * Math.pow(Math.tan(Math.PI / 4 + g / 2), j) / j,
                l = k * Math.pow(1 / Math.tan(Math.PI / 4 + i / 2), j),
                m = k * Math.pow(1 / Math.tan(Math.PI / 4 + d / 2), j);
            return {
                x: l * Math.sin(j * (f - e)) * this.radius,
                y: -(m - l * Math.cos(j * (f - e))) * this.radius
            }
        },
        lcc_inv: function(a, b, c) {
            var d = a / this.radius,
                e = b / this.radius,
                f = 0,
                g = c * this.radDeg,
                h = 33 * this.radDeg,
                i = 45 * this.radDeg,
                j = Math.log(Math.cos(h) * (1 / Math.cos(i))) / Math.log(Math.tan(Math.PI / 4 + i / 2) * (1 / Math.tan(Math.PI / 4 + h / 2))),
                k = Math.cos(h) * Math.pow(Math.tan(Math.PI / 4 + h / 2), j) / j,
                l = k * Math.pow(1 / Math.tan(Math.PI / 4 + f / 2), j),
                m = this.sgn(j) * Math.sqrt(d * d + (l - e) * (l - e)),
                n = Math.atan(d / (l - e));
            return {
                lat: (2 * Math.atan(Math.pow(k / m, 1 / j)) - Math.PI / 2) * this.degRad,
                lng: (g + n / j) * this.degRad
            }
        }
    },
    jvm.WorldMap = function(a) {
        var c, b = this;
        if (this.params = jvm.$.extend(!0, {},
            jvm.WorldMap.defaultParams, a), !jvm.WorldMap.maps[this.params.map]) throw new Error("Attempt to use map which was not loaded: " + this.params.map);
        this.mapData = jvm.WorldMap.maps[this.params.map],
            this.markers = {},
            this.regions = {},
            this.regionsColors = {},
            this.regionsData = {},
            this.container = jvm.$("<div>").css({
                width: "100%",
                height: "100%"
            }).addClass("jvectormap-container"),
            this.params.container.append(this.container),
            this.container.data("mapObject", this),
            this.container.css({
                position: "relative",
                overflow: "hidden"
            }),
            this.defaultWidth = this.mapData.width,
            this.defaultHeight = this.mapData.height,
            this.setBackgroundColor(this.params.backgroundColor),
            this.onResize = function() {
                b.setSize()
            },
            jvm.$(window).resize(this.onResize);
        for (c in jvm.WorldMap.apiEvents) this.params[c] && this.container.bind(jvm.WorldMap.apiEvents[c] + ".jvectormap", this.params[c]);
        this.canvas = new jvm.VectorCanvas(this.container[0], this.width, this.height),
                "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? this.params.bindTouchEvents && this.bindContainerTouchEvents() : this.bindContainerEvents(),
            this.bindElementEvents(),
            this.createLabel(),
            this.params.zoomButtons && this.bindZoomButtons(),
            this.createRegions(),
            this.createMarkers(this.params.markers || {}),
            this.setSize(),
            this.params.focusOn && ("object" == typeof this.params.focusOn ? this.setFocus.call(this, this.params.focusOn.scale, this.params.focusOn.x, this.params.focusOn.y) : this.setFocus.call(this, this.params.focusOn)),
            this.params.selectedRegions && this.setSelectedRegions(this.params.selectedRegions),
            this.params.selectedMarkers && this.setSelectedMarkers(this.params.selectedMarkers),
            this.params.series && this.createSeries()
    },
    jvm.WorldMap.prototype = {
        transX: 0,
        transY: 0,
        scale: 1,
        baseTransX: 0,
        baseTransY: 0,
        baseScale: 1,
        width: 0,
        height: 0,
        setBackgroundColor: function(a) {
            this.container.css("background-color", a)
        },
        resize: function() {
            var a = this.baseScale;
            this.width / this.height > this.defaultWidth / this.defaultHeight ? (this.baseScale = this.height / this.defaultHeight, this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale)) : (this.baseScale = this.width / this.defaultWidth, this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale)),
                this.scale *= this.baseScale / a,
                this.transX *= this.baseScale / a,
                this.transY *= this.baseScale / a
        },
        setSize: function() {
            this.width = this.container.width(),
                this.height = this.container.height(),
                this.resize(),
                this.canvas.setSize(this.width, this.height),
                this.applyTransform()
        },
        reset: function() {
            var a, b;
            for (a in this.series) for (b = 0; b < this.series[a].length; b++) this.series[a][b].clear();
            this.scale = this.baseScale,
                this.transX = this.baseTransX,
                this.transY = this.baseTransY,
                this.applyTransform()
        },
        applyTransform: function() {
            var a, b, c, d;
            this.defaultWidth * this.scale <= this.width ? (a = (this.width - this.defaultWidth * this.scale) / (2 * this.scale), c = (this.width - this.defaultWidth * this.scale) / (2 * this.scale)) : (a = 0, c = (this.width - this.defaultWidth * this.scale) / this.scale),
                    this.defaultHeight * this.scale <= this.height ? (b = (this.height - this.defaultHeight * this.scale) / (2 * this.scale), d = (this.height - this.defaultHeight * this.scale) / (2 * this.scale)) : (b = 0, d = (this.height - this.defaultHeight * this.scale) / this.scale),
                    this.transY > b ? this.transY = b: this.transY < d && (this.transY = d),
                    this.transX > a ? this.transX = a: this.transX < c && (this.transX = c),
                this.canvas.applyTransformParams(this.scale, this.transX, this.transY),
                this.markers && this.repositionMarkers(),
                this.container.trigger("viewportChange", [this.scale / this.baseScale, this.transX, this.transY])
        },
        bindContainerEvents: function() {
            var b, c, a = !1,
                d = this;
            this.container.mousemove(function(e) {
                return a && (d.transX -= (b - e.pageX) / d.scale, d.transY -= (c - e.pageY) / d.scale, d.applyTransform(), b = e.pageX, c = e.pageY),
                    !1
            }).mousedown(function(d) {
                return a = !0,
                    b = d.pageX,
                    c = d.pageY,
                    !1
            }),
                jvm.$("body").mouseup(function() {
                    a = !1
                }),
                this.params.zoomOnScroll && this.container.mousewheel(function(a, b, c, e) {
                var f = jvm.$(d.container).offset(),
                    g = a.pageX - f.left,
                    h = a.pageY - f.top,
                    i = Math.pow(1.3, e);
                d.label.hide(),
                    d.setScale(d.scale * i, g, h),
                    a.preventDefault()
            })
        },
        bindContainerTouchEvents: function() {
            var a, b, d, e, f, g, h, c = this,
                i = function(i) {
                    var k, l, m, n, j = i.originalEvent.touches;
                    "touchstart" == i.type && (h = 0),
                            1 == j.length ? (1 == h && (m = c.transX, n = c.transY, c.transX -= (d - j[0].pageX) / c.scale, c.transY -= (e - j[0].pageY) / c.scale, c.applyTransform(), c.label.hide(), (m != c.transX || n != c.transY) && i.preventDefault()), d = j[0].pageX, e = j[0].pageY) : 2 == j.length && (2 == h ? (l = Math.sqrt(Math.pow(j[0].pageX - j[1].pageX, 2) + Math.pow(j[0].pageY - j[1].pageY, 2)) / b, c.setScale(a * l, f, g), c.label.hide(), i.preventDefault()) : (k = jvm.$(c.container).offset(), f = j[0].pageX > j[1].pageX ? j[1].pageX + (j[0].pageX - j[1].pageX) / 2 : j[0].pageX + (j[1].pageX - j[0].pageX) / 2, g = j[0].pageY > j[1].pageY ? j[1].pageY + (j[0].pageY - j[1].pageY) / 2 : j[0].pageY + (j[1].pageY - j[0].pageY) / 2, f -= k.left, g -= k.top, a = c.scale, b = Math.sqrt(Math.pow(j[0].pageX - j[1].pageX, 2) + Math.pow(j[0].pageY - j[1].pageY, 2)))),
                        h = j.length
                };
            jvm.$(this.container).bind("touchstart", i),
                jvm.$(this.container).bind("touchmove", i)
        },
        bindElementEvents: function() {
            var b, a = this;
            this.container.mousemove(function() {
                b = !0
            }),
                this.container.delegate("[class~='jvectormap-element']", "mouseover mouseout",
                    function(b) {
                        var d = jvm.$(this).attr("class").baseVal ? jvm.$(this).attr("class").baseVal: jvm.$(this).attr("class"),
                            e = -1 === d.indexOf("jvectormap-region") ? "marker": "region",
                            f = "region" == e ? jvm.$(this).attr("data-code") : jvm.$(this).attr("data-index"),
                            g = "region" == e ? a.regions[f].element: a.markers[f].element,
                            h = "region" == e ? a.mapData.paths[f].name: a.markers[f].config.name || "",
                            i = jvm.$.Event(e + "LabelShow.jvectormap"),
                            j = jvm.$.Event(e + "Over.jvectormap");
                        "mouseover" == b.type ? (a.container.trigger(j, [f]), j.isDefaultPrevented() || g.setHovered(!0), a.label.text(h), a.container.trigger(i, [a.label, f]), i.isDefaultPrevented() || (a.label.show(), a.labelWidth = a.label.width(), a.labelHeight = a.label.height())) : (g.setHovered(!1), a.label.hide(), a.container.trigger(e + "Out.jvectormap", [f]))
                    }),
                this.container.delegate("[class~='jvectormap-element']", "mousedown",
                    function() {
                        b = !1
                    }),
                this.container.delegate("[class~='jvectormap-element']", "mouseup",
                    function() {
                        var e = jvm.$(this).attr("class").baseVal ? jvm.$(this).attr("class").baseVal: jvm.$(this).attr("class"),
                            f = -1 === e.indexOf("jvectormap-region") ? "marker": "region",
                            g = "region" == f ? jvm.$(this).attr("data-code") : jvm.$(this).attr("data-index"),
                            h = jvm.$.Event(f + "Click.jvectormap"),
                            i = "region" == f ? a.regions[g].element: a.markers[g].element;
                        b || (a.container.trigger(h, [g]), ("region" === f && a.params.regionsSelectable || "marker" === f && a.params.markersSelectable) && (h.isDefaultPrevented() || (a.params[f + "sSelectableOne"] && a.clearSelected(f + "s"), i.setSelected(!i.isSelected))))
                    })
        },
        bindZoomButtons: function() {
            var a = this;
            jvm.$("<div/>").addClass("jvectormap-zoomin").text("+").appendTo(this.container),
                jvm.$("<div/>").addClass("jvectormap-zoomout").html("&#x2212;").appendTo(this.container),
                this.container.find(".jvectormap-zoomin").click(function() {
                    a.setScale(a.scale * a.params.zoomStep, a.width / 2, a.height / 2)
                }),
                this.container.find(".jvectormap-zoomout").click(function() {
                    a.setScale(a.scale / a.params.zoomStep, a.width / 2, a.height / 2)
                })
        },
        createLabel: function() {
            var a = this;
            this.label = jvm.$("<div/>").addClass("jvectormap-label").appendTo(jvm.$("body")),
                this.container.mousemove(function(b) {
                    var c = b.pageX - 15 - a.labelWidth,
                        d = b.pageY - 15 - a.labelHeight;
                    5 > c && (c = b.pageX + 15),
                        5 > d && (d = b.pageY + 15),
                        a.label.is(":visible") && a.label.css({
                        left: c,
                        top: d
                    })
                })
        },
        setScale: function(a, b, c, d) {
            var e, f = jvm.$.Event("zoom.jvectormap");
            a > this.params.zoomMax * this.baseScale ? a = this.params.zoomMax * this.baseScale: a < this.params.zoomMin * this.baseScale && (a = this.params.zoomMin * this.baseScale),
                "undefined" != typeof b && "undefined" != typeof c && (e = a / this.scale, d ? (this.transX = b + this.defaultWidth * (this.width / (this.defaultWidth * a)) / 2, this.transY = c + this.defaultHeight * (this.height / (this.defaultHeight * a)) / 2) : (this.transX -= (e - 1) / a * b, this.transY -= (e - 1) / a * c)),
                this.scale = a,
                this.applyTransform(),
                this.container.trigger(f, [a / this.baseScale])
        },
        setFocus: function(a, b, c) {
            var d, e, f, g, h;
            if (jvm.$.isArray(a) || this.regions[a]) {
                for (g = jvm.$.isArray(a) ? a: [a], h = 0; h < g.length; h++) this.regions[g[h]] && (e = this.regions[g[h]].element.getBBox(), e && ("undefined" == typeof d ? d = e: (f = {
                    x: Math.min(d.x, e.x),
                    y: Math.min(d.y, e.y),
                    width: Math.max(d.x + d.width, e.x + e.width) - Math.min(d.x, e.x),
                    height: Math.max(d.y + d.height, e.y + e.height) - Math.min(d.y, e.y)
                },
                    d = f)));
                this.setScale(Math.min(this.width / d.width, this.height / d.height), -(d.x + d.width / 2), -(d.y + d.height / 2), !0)
            } else a *= this.baseScale,
                this.setScale(a, -b * this.defaultWidth, -c * this.defaultHeight, !0)
        },
        getSelected: function(a) {
            var b, c = [];
            for (b in this[a]) this[a][b].element.isSelected && c.push(b);
            return c
        },
        getSelectedRegions: function() {
            return this.getSelected("regions")
        },
        getSelectedMarkers: function() {
            return this.getSelected("markers")
        },
        setSelected: function(a, b) {
            var c;
            if ("object" != typeof b && (b = [b]), jvm.$.isArray(b)) for (c = 0; c < b.length; c++) this[a][b[c]].element.setSelected(!0);
            else for (c in b) this[a][c].element.setSelected( !! b[c])
        },
        setSelectedRegions: function(a) {
            this.setSelected("regions", a)
        },
        setSelectedMarkers: function(a) {
            this.setSelected("markers", a)
        },
        clearSelected: function(a) {
            var d, b = {},
                c = this.getSelected(a);
            for (d = 0; d < c.length; d++) b[c[d]] = !1;
            this.setSelected(a, b)
        },
        clearSelectedRegions: function() {
            this.clearSelected("regions")
        },
        clearSelectedMarkers: function() {
            this.clearSelected("markers")
        },
        getMapObject: function() {
            return this
        },
        getRegionName: function(a) {
            return this.mapData.paths[a].name
        },
        createRegions: function() {
            var a, b, c = this;
            for (a in this.mapData.paths) b = this.canvas.addPath({
                    d: this.mapData.paths[a].path,
                    "data-code": a
                },
                jvm.$.extend(!0, {},
                    this.params.regionStyle)),
                jvm.$(b.node).bind("selected",
                    function(a, b) {
                        c.container.trigger("regionSelected.jvectormap", [jvm.$(this).attr("data-code"), b, c.getSelectedRegions()])
                    }),
                b.addClass("jvectormap-region jvectormap-element"),
                this.regions[a] = {
                    element: b,
                    config: this.mapData.paths[a]
                }
        },
        createMarkers: function(a) {
            var b, c, d, e, f, g = this;
            if (this.markersGroup = this.markersGroup || this.canvas.addGroup(), jvm.$.isArray(a)) for (f = a.slice(), a = {},
                                                                                                            b = 0; b < f.length; b++) a[b] = f[b];
            for (b in a) e = a[b] instanceof Array ? {
                latLng: a[b]
            }: a[b],
                d = this.getMarkerPosition(e),
                d !== !1 && (c = this.canvas.addCircle({
                    "data-index": b,
                    cx: d.x,
                    cy: d.y
                },
                jvm.$.extend(!0, {},
                    this.params.markerStyle, {
                        initial: e.style || {}
                    }), this.markersGroup), c.addClass("jvectormap-marker jvectormap-element"), jvm.$(c.node).bind("selected",
                function(a, b) {
                    g.container.trigger("markerSelected.jvectormap", [jvm.$(this).attr("data-index"), b, g.getSelectedMarkers()])
                }), this.markers[b] && this.removeMarkers([b]), this.markers[b] = {
                element: c,
                config: e
            })
        },
        repositionMarkers: function() {
            var a, b;
            for (a in this.markers) b = this.getMarkerPosition(this.markers[a].config),
                b !== !1 && this.markers[a].element.setStyle({
                cx: b.x,
                cy: b.y
            })
        },
        getMarkerPosition: function(a) {
            return jvm.WorldMap.maps[this.params.map].projection ? this.latLngToPoint.apply(this, a.latLng || [0, 0]) : {
                x: a.coords[0] * this.scale + this.transX * this.scale,
                y: a.coords[1] * this.scale + this.transY * this.scale
            }
        },
        addMarker: function(a, b, c) {
            var f, g, d = {},
                e = [],
                c = c || [];
            for (d[a] = b, g = 0; g < c.length; g++) f = {},
                f[a] = c[g],
                e.push(f);
            this.addMarkers(d, e)
        },
        addMarkers: function(a, b) {
            var c;
            for (b = b || [], this.createMarkers(a), c = 0; c < b.length; c++) this.series.markers[c].setValues(b[c] || {})
        },
        removeMarkers: function(a) {
            var b;
            for (b = 0; b < a.length; b++) this.markers[a[b]].element.remove(),
                delete this.markers[a[b]]
        },
        removeAllMarkers: function() {
            var a, b = [];
            for (a in this.markers) b.push(a);
            this.removeMarkers(b)
        },
        latLngToPoint: function(a, b) {
            var c, h, i, d = jvm.WorldMap.maps[this.params.map].projection,
                e = d.centralMeridian;
            return this.width - 2 * this.baseTransX * this.baseScale,
                this.height - 2 * this.baseTransY * this.baseScale,
                this.scale / this.baseScale,
                -180 + e > b && (b += 360),
                c = jvm.Proj[d.type](a, b, e),
                h = this.getInsetForPoint(c.x, c.y),
                h ? (i = h.bbox, c.x = (c.x - i[0].x) / (i[1].x - i[0].x) * h.width * this.scale, c.y = (c.y - i[0].y) / (i[1].y - i[0].y) * h.height * this.scale, {
                    x: c.x + this.transX * this.scale + h.left * this.scale,
                    y: c.y + this.transY * this.scale + h.top * this.scale
                }) : !1
        },
        pointToLatLng: function(a, b) {
            var f, g, h, i, j, c = jvm.WorldMap.maps[this.params.map].projection,
                d = c.centralMeridian,
                e = jvm.WorldMap.maps[this.params.map].insets;
            for (f = 0; f < e.length; f++) if (g = e[f], h = g.bbox, i = a - (this.transX * this.scale + g.left * this.scale), j = b - (this.transY * this.scale + g.top * this.scale), i = i / (g.width * this.scale) * (h[1].x - h[0].x) + h[0].x, j = j / (g.height * this.scale) * (h[1].y - h[0].y) + h[0].y, i > h[0].x && i < h[1].x && j > h[0].y && j < h[1].y) return jvm.Proj[c.type + "_inv"](i, -j, d);
            return ! 1
        },
        getInsetForPoint: function(a, b) {
            var d, e, c = jvm.WorldMap.maps[this.params.map].insets;
            for (d = 0; d < c.length; d++) if (e = c[d].bbox, a > e[0].x && a < e[1].x && b > e[0].y && b < e[1].y) return c[d]
        },
        createSeries: function() {
            var a, b;
            this.series = {
                markers: [],
                regions: []
            };
            for (b in this.params.series) for (a = 0; a < this.params.series[b].length; a++) this.series[b][a] = new jvm.DataSeries(this.params.series[b][a], this[b])
        },
        remove: function() {
            this.label.remove(),
                this.container.remove(),
                jvm.$(window).unbind("resize", this.onResize)
        }
    },
    jvm.WorldMap.maps = {},
    jvm.WorldMap.defaultParams = {
        map: "world_mill_en",
        backgroundColor: "#505050",
        zoomButtons: !0,
        zoomOnScroll: !0,
        zoomMax: 8,
        zoomMin: 1,
        zoomStep: 1.6,
        regionsSelectable: !1,
        markersSelectable: !1,
        bindTouchEvents: !0,
        regionStyle: {
            initial: {
                fill: "white",
                "fill-opacity": 1,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 1
            },
            hover: {
                "fill-opacity": .8
            },
            selected: {
                fill: "yellow"
            },
            selectedHover: {}
        },
        markerStyle: {
            initial: {
                fill: "grey",
                stroke: "#505050",
                "fill-opacity": 1,
                "stroke-width": 1,
                "stroke-opacity": 1,
                r: 5
            },
            hover: {
                stroke: "black",
                "stroke-width": 2
            },
            selected: {
                fill: "blue"
            },
            selectedHover: {}
        }
    },
    jvm.WorldMap.apiEvents = {
        onRegionLabelShow: "regionLabelShow",
        onRegionOver: "regionOver",
        onRegionOut: "regionOut",
        onRegionClick: "regionClick",
        onRegionSelected: "regionSelected",
        onMarkerLabelShow: "markerLabelShow",
        onMarkerOver: "markerOver",
        onMarkerOut: "markerOut",
        onMarkerClick: "markerClick",
        onMarkerSelected: "markerSelected",
        onViewportChange: "viewportChange"
    };