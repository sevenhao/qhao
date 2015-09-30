/**
 * Designed and developed by qhao on 2015/9/30.
 * Copyright (c) 2009 qhao
 */


var skel = function() {
    var e = "breakpoints",
        t = "config",
        n = "iterate",
        r = "elements",
        i = "stateId",
        s = "stateElements",
        o = "getElementsByClassName",
        u = !1,
        a = "getElementsByTagName",
        f = "length",
        l = null,
        c = "getCachedElement",
        h = "viewport",
        p = " 0 -1px ",
        d = "cacheNewElement",
        v = "config_breakpoint",
        m = !0,
        g = "createElement",
        y = "gutters",
        b = "vars",
        w = "insertBefore",
        E = "newInline",
        S = "}",
        x = "cache",
        T = "parentNode",
        N = "orientationChange",
        C = "substring",
        k = "locations",
        L = "deviceType",
        A = "className",
        O = " 0 0 ",
        M = "object",
        _ = "isArray",
        D = "match",
        P = "+*,",
        H = "replace",
        B = "head",
        j = "newElement",
        F = "canUseProperty_element",
        I = "indexOf",
        q = "_skel_isReversed",
        R = "push",
        U = "extend",
        z = "grid",
        W = "matchesMedia",
        X = "containers",
        V = "maxGridZoom",
        $ = "onorientationchange",
        J = "defaults",
        K = "DOMReady",
        Q = "lock",
        G = "getComputedStyle",
        Y = "addEventListener",
        Z = "^head",
        et = "{display:none!important}",
        tt = "registerLocation",
        nt = "parseMeasurement",
        rt = "documentElement",
        it = "placeholder",
        st = "events",
        ot = "IEVersion",
        ut = "attachElements",
        at = "charAt",
        ft = "plugins",
        lt = "attachElement",
        ct = "isActive",
        ht = "DOMContentLoaded",
        pt = "text/css",
        dt = "device-width",
        vt = "states",
        mt = "_skel_attach",
        gt = "initial-scale=1",
        yt = "trigger",
        bt = "removeEventListener",
        wt = "previousSibling",
        Et = "media",
        St = "resize",
        xt = "attached",
        Tt = "normalize",
        Nt = "applyRowTransforms",
        Ct = "collapse",
        kt = "change",
        Lt = "location",
        At = "(min-width: ",
        Ot = "split",
        Mt = "forceDefaultState",
        _t = "style",
        Dt = "html",
        Pt = "_skel_placeholder",
        Ht = "firstChild",
        Bt = "querySelectorAll",
        jt = "min-height",
        Ft = "max-height",
        It = "innerHTML",
        qt = "min-width",
        Rt = "prototype",
        Ut = "max-width",
        zt = "domready",
        Wt = "hasOwnProperty",
        Xt = "nextSibling",
        Vt = "height=",
        $t = "zoom",
        Jt = "href",
        Kt = "isStatic",
        Qt = "android",
        Gt = "readyState",
        Yt = ".\\3$1 ",
        Zt = "onresize",
        en = "priority",
        tn = {
            breakpoints: [],
            breakpointList: [],
            cache: {
                elements: {},
                states: {},
                stateElements: {}
            },
            config: {
                breakpoints: {
                    "*": {
                        href: u,
                        media: ""
                    }
                },
                containers: 1140,
                defaultState: l,
                events: {},
                grid: {
                    zoom: 1,
                    collapse: u,
                    gutters: [40, 0]
                },
                lock: {
                    path: u,
                    permanent: m
                },
                plugins: {},
                pollOnce: u,
                preload: u,
                reset: Tt,
                RTL: u,
                viewport: {
                    width: dt,
                    height: "",
                    scalable: m
                }
            },
            css: {
                bm: "*,*:before,*:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}",
                n: "html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}",
                r: "html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}body{-webkit-text-size-adjust:none}",
                gc: function(e) {
                    return ".\\31 2u" + e + ",.\\31 2u\\24" + e + "{width:100%;clear:none;margin-left:0}" + ".\\31 1u" + e + ",.\\31 1u\\24" + e + "{width:91.6666666667%;clear:none;margin-left:0}" + ".\\31 0u" + e + ",.\\31 0u\\24" + e + "{width:83.3333333333%;clear:none;margin-left:0}" + ".\\39 u" + e + ",.\\39 u\\24" + e + "{width:75%;clear:none;margin-left:0}" + ".\\38 u" + e + ",.\\38 u\\24" + e + "{width:66.6666666667%;clear:none;margin-left:0}" + ".\\37 u" + e + ",.\\37 u\\24" + e + "{width:58.3333333333%;clear:none;margin-left:0}" + ".\\36 u" + e + ",.\\36 u\\24" + e + "{width:50%;clear:none;margin-left:0}" + ".\\35 u" + e + ",.\\35 u\\24" + e + "{width:41.6666666667%;clear:none;margin-left:0}" + ".\\34 u" + e + ",.\\34 u\\24" + e + "{width:33.3333333333%;clear:none;margin-left:0}" + ".\\33 u" + e + ",.\\33 u\\24" + e + "{width:25%;clear:none;margin-left:0}" + ".\\32 u" + e + ",.\\32 u\\24" + e + "{width:16.6666666667%;clear:none;margin-left:0}" + ".\\31 u" + e + ",.\\31 u\\24" + e + "{width:8.3333333333%;clear:none;margin-left:0}" + ".\\31 2u\\24" + e + P + ".\\31 1u\\24" + e + P + ".\\31 0u\\24" + e + P + ".\\39 u\\24" + e + P + ".\\38 u\\24" + e + P + ".\\37 u\\24" + e + P + ".\\36 u\\24" + e + P + ".\\35 u\\24" + e + P + ".\\34 u\\24" + e + P + ".\\33 u\\24" + e + P + ".\\32 u\\24" + e + P + ".\\31 u\\24" + e + "+*{" + "clear:left;" + S + ".\\-11u" + e + "{margin-left:91.6666666667%}" + ".\\-10u" + e + "{margin-left:83.3333333333%}" + ".\\-9u" + e + "{margin-left:75%}" + ".\\-8u" + e + "{margin-left:66.6666666667%}" + ".\\-7u" + e + "{margin-left:58.3333333333%}" + ".\\-6u" + e + "{margin-left:50%}" + ".\\-5u" + e + "{margin-left:41.6666666667%}" + ".\\-4u" + e + "{margin-left:33.3333333333%}" + ".\\-3u" + e + "{margin-left:25%}" + ".\\-2u" + e + "{margin-left:16.6666666667%}" + ".\\-1u" + e + "{margin-left:8.3333333333%}"
                }
            },
            defaults: {
                breakpoint: {
                    config: l,
                    elements: l,
                    test: l
                },
                config_breakpoint: {
                    containers: "100%",
                    grid: {},
                    href: u,
                    media: "",
                    viewport: {}
                }
            },
            events: [],
            forceDefaultState: u,
            isInit: u,
            isStatic: u,
            locations: {
                body: l,
                head: l,
                html: l
            },
            lcn: "_skel_lock",
            maxGridZoom: 1,
            me: l,
            plugins: {},
            sd: "/",
            stateId: "",
            vars: {},
            DOMReady: l,
            getElementsByClassName: l,
            indexOf: l,
            isArray: l,
            iterate: l,
            matchesMedia: l,
            canUseProperty_element: l,
            canUseProperty: function(e) {
                tn[F] || (tn[F] = document[g]("div"));
                var t = tn[F][_t],
                    n = e[at](0).toUpperCase() + e.slice(1);
                return e in t || "Moz" + n in t || "Webkit" + n in t || "O" + n in t || "ms" + n in t
            },
            extend: function(e, t) {
                var r;
                tn[n](t,
                    function(n) {
                        tn[_](t[n]) ? (tn[_](e[n]) || (e[n] = []), tn[U](e[n], t[n])) : typeof t[n] == M ? (typeof e[n] != M && (e[n] = {}), tn[U](e[n], t[n])) : e[n] = t[n]
                    })
            },
            getArray: function(e) {
                return tn[_](e) ? e: [e]
            },
            parseMeasurement: function(e) {
                var t, n;
                if (typeof e != "string") t = [e, "px"];
                else if (e == "fluid") t = [100, "%"];
                else {
                    var n;
                    n = e[D](/([0-9\.]+)([^\s]*)/),
                            n[f] < 3 || !n[2] ? t = [parseFloat(e), "px"] : t = [parseFloat(n[1]), n[2]]
                }
                return t
            },
            canUse: function(t) {
                return tn[e][t] && tn[e][t].test()
            },
            hasActive: function(e) {
                var t = u;
                return tn[n](e,
                    function(n) {
                        t = t || tn[ct](e[n])
                    }),
                    t
            },
            isActive: function(e) {
                return tn[I](tn[i], tn.sd + e) !== -1
            },
            isLocked: function() {
                return !! tn[b][Q] && tn[_](tn[b][Q])
            },
            lock: function(e, n) {
                tn[b][Q] = [e, n],
                    document.cookie = tn.lcn + "=" + tn[b][Q].join("_") + (tn[t][Q].path ? ";path=" + tn[t][Q].path: "") + (tn[t][Q].permanent ? ";expires=Tue, 19 Jan 2038 03:14:07 GMT": ""),
                    window[Lt].reload()
            },
            unlock: function() {
                tn[b][Q] = l,
                    document.cookie = tn.lcn + "=" + (tn[t][Q].path ? ";path=" + tn[t][Q].path: "") + ";expires=Thu, 01 Jan 1970 01:02:03 GMT",
                    window[Lt].reload()
            },
            useActive: function(e) {
                if (typeof e !== M) return e;
                var t = l;
                return tn[n](e,
                    function(n) {
                        if (t !== l) return;
                        tn[ct](n) && (t = e[n])
                    }),
                    t
            },
            wasActive: function(e) {
                return tn[I](tn[b].lastStateId, tn.sd + e) !== -1
            },
            applyRowTransforms: function(e) {
                tn[t].RTL && (tn.unreverseRows(), e[t][z][Ct] && tn.reverseRows());
                var r = "_skel_important",
                    i = [],
                    s,
                    a;
                for (s = 1; s <= tn[V]; s++) a = tn[o]("important(" + s + ")"),
                    tn[n](a,
                        function(e) {
                            i[R](a[e])
                        });
                a = tn[o]("important(collapse)"),
                    tn[n](a,
                        function(e) {
                            i[R](a[e])
                        }),
                    tn[n](i,
                        function(n) {
                            if (n === f) return;
                            var s = i[n],
                                o = s[T],
                                a,
                                l = u,
                                c,
                                h;
                            if (!o) return;
                            if (!s[Wt](r) || s[r] === u) {
                                e[t][z][Ct] && s[A][D](/important\(collapse\)/) ? l = "c": s[A][D](/important\(([0-9])\)/) && (h = parseInt(RegExp.$1)) <= e[t][z][$t] && (l = "z");
                                if (!l) return;
                                c = tn[t].RTL ? Xt: wt,
                                    a = s[c];
                                while (a && a.nodeName == "#text") a = a[c];
                                if (!a) return;
                                o[w](s, tn[t].RTL && l == "z" ? o.lastChild: o[Ht]),
                                    s[r] = {
                                        placeholder: a,
                                        mode: l,
                                        zoom: h
                                    }
                            } else {
                                a = s[r][it],
                                    l = s[r].mode;
                                if (l == "c" && e[t][z][Ct] || l == "z" && s[r][$t] <= e[t][z][$t]) return;
                                o[w](s, tn[t].RTL && l == "z" ? a[wt] : a[Xt]),
                                    s[r] = u
                            }
                        })
            },
            reverseRows: function() {
                var e = tn[o]("row");
                tn[n](e,
                    function(t) {
                        if (t === f) return;
                        var n = e[t];
                        if (n[q]) return;
                        var r = n.children,
                            i;
                        for (i = 1; i < r[f]; i++) n[w](r[i], r[0]);
                        n[q] = m
                    })
            },
            unreverseRows: function() {
                var e = tn[o]("row");
                tn[n](e,
                    function(t) {
                        if (t === f) return;
                        var n = e[t];
                        if (!n[q]) return;
                        var r = n.children,
                            i;
                        for (i = 1; i < r[f]; i++) n[w](r[i], r[0]);
                        n[q] = u
                    })
            },
            bind: function(e, t) {
                return tn.on(e, t)
            },
            on: function(e, t) {
                tn[st][e] || (tn[st][e] = []),
                    tn[st][e][R](t),
                    tn.isInit && (e == kt ? t() : e[at](0) == "+" && tn[ct](e[C](1)) && t())
            },
            change: function(e) {
                tn.on(kt, e)
            },
            trigger: function(e) {
                if (!tn[st][e] || tn[st][e][f] == 0) return;
                var t;
                tn[n](tn[st][e],
                    function(t) {
                        tn[st][e][t]()
                    })
            },
            registerLocation: function(e, t) {
                e == B ? t[mt] = function(e, t) {
                    t ? this[w](e, this[Ht]) : this === tn.me[T] ? this[w](e, tn.me) : this.appendChild(e)
                }: t[mt] = function(e, t) {
                    t ? this[w](e, this[Ht]) : this.appendChild(e)
                },
                    tn[k][e] = t
            },
            addCachedElementToBreakpoint: function(t, n) {
                tn[e][t] && tn[e][t][r][R](n)
            },
            addCachedElementToState: function(e, t) {
                tn[x][s][e] ? tn[x][s][e][R](t) : tn[x][s][e] = [t]
            },
            attachElement: function(e) {
                var t, n = e[Lt],
                    r = u;
                return e[xt] ? m: (n[0] == "^" && (n = n[C](1), r = m), n in tn[k] ? (t = tn[k][n], t[mt](e[M], r), e[xt] = m, e.onAttach && e.onAttach(), m) : u)
            },
            attachElements: function(e) {
                var t = [],
                    r = [],
                    i,
                    s,
                    o;
                tn[n](e,
                    function(n) {
                        t[e[n][en]] || (t[e[n][en]] = []),
                            t[e[n][en]][R](e[n])
                    }),
                    tn[n](t,
                        function(e) {
                            if (t[e][f] == 0) return;
                            tn[n](t[e],
                                function(n) {
                                    tn[lt](t[e][n]) || r[R](t[e][n])
                                })
                        }),
                    r[f] > 0 && tn[K](function() {
                    tn[n](r,
                        function(e) {
                            tn[lt](r[e])
                        })
                })
            },
            cacheElement: function(e) {
                return tn[x][r][e.id] = e,
                    e
            },
            cacheNewElement: function(e, t, n, r) {
                var i;
                return t[T] && t[T].removeChild(t),
                    i = tn[j](e, t, n, r),
                    tn.cacheElement(i)
            },
            detachAllElements: function(e) {
                var t, i, s = {};
                tn[n](e,
                    function(t) {
                        s[e[t].id] = m
                    }),
                    tn[n](tn[x][r],
                        function(e) {
                            if (e in s) return;
                            tn.detachElement(e)
                        })
            },
            detachElement: function(e) {
                var t = tn[x][r][e],
                    n;
                if (!t[xt]) return;
                n = t[M];
                if (!n[T] || n[T] && !n[T].tagName) return;
                n[T].removeChild(n),
                    t[xt] = u,
                    t.onDetach && t.onDetach()
            },
            getCachedElement: function(e) {
                return tn[x][r][e] ? tn[x][r][e] : l
            },
            newElement: function(e, t, n, r) {
                return {
                    id: e,
                    object: t,
                    location: n,
                    priority: r,
                    attached: u
                }
            },
            removeCachedElementFromBreakpoint: function(t, i) {
                return tn[n](tn[e][t][r],
                    function(n) {
                        tn[e][t][r][n].id == i && delete tn[e][t][r][n]
                    }),
                    m
            },
            removeCachedElementFromState: function(e, t) {
                return tn[n](tn[x][s][e],
                    function(n) {
                        tn[x][s][e][n].id == t && delete tn[x][s][e][n]
                    }),
                    m
            },
            uncacheElement: function(e) {
                return e in tn[x][r] ? (delete tn[x][r][e], m) : u
            },
            changeState: function(o) {
                var a, l, g, w, T, N, k, L, A;
                tn[b].lastStateId = tn[i],
                    tn[i] = o;
                if (!tn[x][vt][tn[i]]) {
                    tn[x][vt][tn[i]] = {
                        config: {},
                        elements: [],
                        values: {}
                    },
                        g = tn[x][vt][tn[i]],
                            tn[i] === tn.sd ? a = [] : a = tn[i][C](1)[Ot](tn.sd),
                        tn[U](g[t], tn[J][v]),
                        tn[n](a,
                            function(n) {
                                tn[U](g[t], tn[e][a[n]][t])
                            }),
                        k = "mV" + tn[i],
                        g[t][h].content ? L = g[t][h].content: tn.isLocked() ? (w = [], w[R]("user-scalable=yes"), tn[b][Q][0] && w[R]("width=" + tn[b][Q][0]), tn[b][Q][1] && w[R](Vt + tn[b][Q][1]), L = w.join(","), window.setTimeout(function() {
                                tn.poll()
                            },
                            0)) : (w = [], w[R]("user-scalable=" + (g[t][h].scalable ? "yes": "no")), g[t][h].width && w[R]("width=" + g[t][h].width), g[t][h].height && w[R](Vt + g[t][h].height), g[t][h].width == dt && w[R](gt), L = w.join(",")),
                        (T = tn[c](k)) || (T = tn[d](k, tn.newMeta(h, L), Z, 4)),
                        g[r][R](T);
                    var M, _, D = u;
                    w = tn[nt](g[t][X]),
                        M = w[0],
                        _ = w[1],
                        g.values[X] = M + _,
                        k = "iC" + g.values[X],
                        _.substr( - 1) == "!" && (D = m, _ = _.substr(0, _[f] - 1)),
                        (T = tn[c](k)) || (T = tn[d](k, tn[E](".container{margin-left:auto;margin-right:auto;width:" + M * 1 + _ + (D ? "!important;max-width:none!important;min-width:0!important" + S: S + ".container.\\31 25\\25{width:100%;max-width:" + M * 1.25 + _ + ";min-width:" + M + S + ".container.\\37 5\\25{width:" + M * .75 + _ + S + ".container.\\35 0\\25{width:" + M * .5 + _ + S + ".container.\\32 5\\25{width:" + M * .25 + _ + S)), B, 3)),
                        g[r][R](T),
                        k = "iGG" + g[t][z][y][0] + "_" + g[t][z][y][1];
                    if (! (T = tn[c](k))) {
                        var P, j;
                        w = tn[nt](g[t][z][y][0]),
                            P = w[0],
                            j = w[1];
                        var F, q;
                        w = tn[nt](g[t][z][y][1]),
                            F = w[0],
                            q = w[1],
                            T = tn[d]("iGG" + g[t][z][y][0] + "_" + g[t][z][y][1], tn[E](".row>*{padding:" + F * 1 + q + O + P * 1 + j + S + ".row{margin:" + F * -1 + q + p + P * -1 + j + S + ".row.uniform>*{padding:" + P * 1 + j + O + P * 1 + j + S + ".row.uniform{margin:" + P * -1 + j + p + P * -1 + j + S + ".row.\\32 00\\25>*{padding:" + F * 2 + q + O + P * 2 + j + S + ".row.\\32 00\\25{margin:" + F * -2 + q + p + P * -2 + j + S + ".row.uniform.\\32 00\\25>*{padding:" + P * 2 + j + O + P * 2 + j + S + ".row.uniform.\\32 00\\25{margin:" + P * -2 + j + p + P * -2 + j + S + ".row.\\31 50\\25>*{padding:" + F * 1.5 + q + O + P * 1.5 + j + S + ".row.\\31 50\\25{margin:" + F * -1.5 + q + p + P * -1.5 + j + S + ".row.uniform.\\31 50\\25>*{padding:" + P * 1.5 + j + O + P * 1.5 + j + S + ".row.uniform.\\31 50\\25{margin:" + P * -1.5 + j + p + P * -1.5 + j + S + ".row.\\35 0\\25>*{padding:" + F * .5 + q + O + P * .5 + j + S + ".row.\\35 0\\25{margin:" + F * -0.5 + q + p + P * -0.5 + j + S + ".row.uniform.\\35 0\\25>*{padding:" + P * .5 + j + O + P * .5 + j + S + ".row.uniform.\\35 0\\25{margin:" + P * -0.5 + j + p + P * -0.5 + j + S + ".row.\\32 5\\25>*{padding:" + F * .25 + q + O + P * .25 + j + S + ".row.\\32 5\\25{margin:" + F * -0.25 + q + p + P * -0.25 + j + S + ".row.uniform.\\32 5\\25>*{padding:" + P * .25 + j + O + P * .25 + j + S + ".row.uniform.\\32 5\\25{margin:" + P * -0.25 + j + p + P * -0.25 + j + S + ".row.\\30 \\25>*{padding:0}" + ".row.\\30 \\25{margin:0 0 -1px 0}"), B, 3)
                    }
                    g[r][R](T),
                        k = "igZ" + g[t][z][$t];
                    if (! (T = tn[c](k))) {
                        L = "";
                        for (N = 1; N <= g[t][z][$t]; N++) L += tn.css.gc("\\28 " + N + "\\29");
                        T = tn[d](k, tn[E](L), B, 3)
                    }
                    g[r][R](T),
                        g[t][z][Ct] && (k = "igC" + g[t][X], (T = tn[c](k)) || (T = tn[d](k, tn[E](".row:not(.no-collapse)>*{width:100%!important;margin-left:0!important" + S), B, 3)), g[r][R](T)),
                        k = "iCd" + tn[i];
                    if (! (T = tn[c](k))) {
                        L = [],
                            A = [],
                            tn[n](tn[e],
                                function(e) {
                                    tn[I](a, e) !== -1 ? L[R](".not-" + e) : A[R](".only-" + e)
                                });
                        var W = (L[f] > 0 ? L.join(",") + et: "") + (A[f] > 0 ? A.join(",") + et: "");
                        T = tn[d](k, tn[E](W[H](/\.([0-9])/, Yt)), B, 3),
                            g[r][R](T)
                    }
                    tn[n](a,
                        function(i) {
                            tn[e][a[i]][t][Jt] && (k = "ss" + a[i], (T = tn[c](k)) || (T = tn[d](k, tn.newStyleSheet(tn[e][a[i]][t][Jt]), B, 5)), g[r][R](T)),
                                tn[e][a[i]][r][f] > 0 && tn[n](tn[e][a[i]][r],
                                function(t) {
                                    g[r][R](tn[e][a[i]][r][t])
                                })
                        }),
                        tn[x][s][tn[i]] && (tn[n](tn[x][s][tn[i]],
                        function(e) {
                            g[r][R](tn[x][s][tn[i]][e])
                        }), tn[x][s][tn[i]] = [])
                } else g = tn[x][vt][tn[i]];
                tn.detachAllElements(g[r]),
                    tn[ut](g[r]),
                    tn[K](function() {
                        tn[Nt](g)
                    }),
                    tn[b].state = tn[x][vt][tn[i]],
                    tn[b][i] = tn[i],
                    tn[yt](kt),
                    tn[n](tn[e],
                        function(e) {
                            tn[ct](e) ? tn.wasActive(e) || tn[yt]("+" + e) : tn.wasActive(e) && tn[yt]("-" + e)
                        })
            },
            getStateId: function() {
                if (tn[Mt] && tn[t].defaultState) return tn[t].defaultState;
                var r = "";
                return tn[n](tn[e],
                    function(t) {
                        tn[e][t].test() && (r += tn.sd + t)
                    }),
                    r
            },
            poll: function() {
                var e = "";
                e = tn.getStateId(),
                    e === "" && (e = tn.sd),
                    e !== tn[i] && (tn[Kt] ? tn.changeState(e) : (tn[k][Dt][A] = tn[k][Dt][A][H](tn[i][C](1)[H](new RegExp(tn.sd, "g"), " "), ""), tn.changeState(e), tn[k][Dt][A] = tn[k][Dt][A] + " " + tn[i][C](1)[H](new RegExp(tn.sd, "g"), " "), tn[k][Dt][A][at](0) == " " && (tn[k][Dt][A] = tn[k][Dt][A][C](1))))
            },
            updateState: function() {
                var t, o, u, a, l = [];
                if (tn[i] == tn.sd) return;
                t = tn[i][C](1)[Ot](tn.sd),
                    tn[n](t,
                        function(s) {
                            o = tn[e][t[s]];
                            if (o[r][f] == 0) return;
                            tn[n](o[r],
                                function(e) {
                                    tn[x][vt][tn[i]][r][R](o[r][e]),
                                        l[R](o[r][e])
                                })
                        }),
                    tn[x][s][tn[i]] && (tn[n](tn[x][s][tn[i]],
                    function(e) {
                        tn[x][vt][tn[i]][r][R](tn[x][s][tn[i]][e]),
                            l[R](tn[x][s][tn[i]][e])
                    }), tn[x][s][tn[i]] = []),
                    l[f] > 0 && tn[ut](l)
            },
            newDiv: function(e) {
                var t = document[g]("div");
                return t[It] = e,
                    t
            },
            newInline: function(e) {
                var t;
                return t = document[g](_t),
                    t.type = pt,
                    t[It] = e,
                    t
            },
            newMeta: function(e, t) {
                var n = document[g]("meta");
                return n.name = e,
                    n.content = t,
                    n
            },
            newStyleSheet: function(e) {
                var t = document[g]("link");
                return t.rel = "stylesheet",
                    t.type = pt,
                    t[Jt] = e,
                    t
            },
            initPlugin: function(e, n) {
                typeof n == M && tn[U](e[t], n),
                    e.init && e.init()
            },
            registerPlugin: function(e, t) {
                if (!t) return u;
                tn[ft][e] = t,
                    t._ = this,
                    t.register && t.register()
            },
            init: function(e, r) {
                tn.initConfig(e),
                    tn.initElements(),
                    tn.initEvents(),
                    tn.poll(),
                    r && typeof r == M && (tn[t][ft] = r),
                    tn[n](tn[ft],
                        function(e) {
                            tn.initPlugin(tn[ft][e], e in tn[t][ft] ? tn[t][ft][e] : l)
                        }),
                    tn.isInit = m
            },
            initAPI: function() {
                var e, t, r = navigator.userAgent;
                tn[b][ot] = 99,
                    e = "other",
                    r[D](/Firefox/) ? e = "firefox": r[D](/Chrome/) ? e = "chrome": r[D](/Safari/) && !r[D](/Chrome/) ? e = "safari": r[D](/(OPR|Opera)/) ? e = "opera": r[D](/MSIE ([0-9]+)/) ? (e = "ie", tn[b][ot] = RegExp.$1) : r[D](/Trident\/.+rv:([0-9]+)/) && (e = "ie", tn[b][ot] = RegExp.$1),
                    tn[b].browser = e,
                    tn[b][L] = "other",
                    t = {
                        ios: "(iPad|iPhone|iPod)",
                        android: "Android",
                        mac: "Macintosh",
                        wp: "Windows Phone",
                        windows: "Windows NT"
                    },
                    tn[n](t,
                        function(e) {
                            r[D](new RegExp(t[e], "g")) && (tn[b][L] = e)
                        });
                switch (tn[b][L]) {
                    case "ios":
                        r[D](/([0-9_]+) like Mac OS X/),
                            e = parseFloat(RegExp.$1[H]("_", ".")[H]("_", ""));
                        break;
                    case Qt:
                        r[D](/Android ([0-9\.]+)/),
                            e = parseFloat(RegExp.$1);
                        break;
                    case "mac":
                        r[D](/Mac OS X ([0-9_]+)/),
                            e = parseFloat(RegExp.$1[H]("_", ".")[H]("_", ""));
                        break;
                    case "wp":
                        r[D](/IEMobile\/([0-9\.]+)/),
                            e = parseFloat(RegExp.$1);
                        break;
                    case "windows":
                        r[D](/Windows NT ([0-9\.]+)/),
                            e = parseFloat(RegExp.$1);
                        break;
                    default:
                        e = 99
                }
                tn[b].deviceVersion = e,
                    tn[b].isTouch = tn[b][L] == "wp" ? navigator.msMaxTouchPoints > 0 : "ontouchstart" in window,
                    tn[b].isMobile = tn[b][L] == "wp" || tn[b][L] == Qt || tn[b][L] == "ios",
                    e = document.cookie[Ot](";"),
                    tn[n](e,
                        function(t) {
                            var n = e[t][Ot]("=");
                            if (n[0][H](/^\s+|\s+$/g, "") == tn.lcn && n[1][f] > 0) {
                                tn[b][Q] = n[1][Ot]("_");
                                return
                            }
                        })
            },
            initConfig: function(i) {
                var s = [],
                    o = [];
                if (!i || !(e in i)) tn[Kt] = m,
                    tn[t][h].width = "",
                    tn[t][h].height = "",
                    tn[t][h].scalable = m;
                typeof i == M && (i[e] && (tn[t][e] = {}), tn[U](tn[t], i)),
                    z in tn[t] && y in tn[t][z] && !tn[_](tn[t][z][y]) && (tn[t][z][y] = [tn[t][z][y], tn[t][z][y]]),
                    tn[U](tn[J][v][z], tn[t][z]),
                    tn[V] = Math.max(tn[V], tn[t][z][$t]),
                    tn[U](tn[J][v][h], tn[t][h]),
                    tn[J][v][X] = tn[t][X],
                    tn[n](tn[t][e],
                        function(n) {
                            var i, s = {},
                                u, a;
                            tn[U](s, tn[t][e][n]),
                                Jt in s || (s[Jt] = tn[J][v][Jt]),
                                Et in s || (s[Et] = tn[J][v][Et]),
                                "range" in s && (u = s.range, u == "*" ? a = "": u[at](0) == "-" ? a = "(max-width: " + parseInt(u[C](1)) + "px)": u[at](u[f] - 1) == "-" ? a = At + parseInt(u[C](0, u[f] - 1)) + "px)": tn[I](u, "-") != -1 && (u = u[Ot]("-"), a = At + parseInt(u[0]) + "px) and (max-width: " + parseInt(u[1]) + "px)"), s[Et] = a),
                                z in s && (y in s[z] && !tn[_](s[z][y]) && (s[z][y] = [s[z][y], s[z][y]]), $t in s[z] && (tn[V] = Math.max(tn[V], s[z][$t]))),
                                tn[t][e][n] = s,
                                i = {},
                                tn[U](i, tn[J].breakpoint),
                                i[t] = tn[t][e][n],
                                i.test = function() {
                                    return tn[W](s[Et])
                                },
                                i[r] = [],
                                tn[t].preload && i[t][Jt] && o[R](i[t][Jt]),
                                tn[e][n] = i,
                                tn.breakpointList[R](n)
                        }),
                    tn[n](tn[t][st],
                        function(e) {
                            tn.on(e, tn[t][st][e])
                        }),
                    o[f] > 0 && window[Lt].protocol != "file:" && tn[K](function() {
                    var e, t = document[a](B)[0],
                        r = new XMLHttpRequest;
                    tn[n](o,
                        function(e) {
                            r.open("GET", o[e], u),
                                r.send("")
                        })
                })
            },
            initElements: function() {
                var e = [];
                e[R](tn[j]("mV", tn.newMeta(h, gt), Z, 1));
                switch (tn[t].reset) {
                    case "full":
                        e[R](tn[j]("iR", tn[E](tn.css.r), Z, 2));
                        break;
                    case Tt:
                        e[R](tn[j]("iN", tn[E](tn.css.n), Z, 2))
                }
                e[R](tn[j]("iBM", tn[E](tn.css.bm), Z, 1)),
                    e[R](tn[j]("iG", tn[E]('.row{border-bottom:solid 1px transparent}.row>*{float:left}.row:after,.row:before{content:"";display:block;clear:both;height:0}.row.uniform>*>:first-child{margin-top:0}.row.uniform>*>:last-child{margin-bottom:0}' + tn.css.gc("")), B, 3)),
                    tn[ut](e)
            },
            initEvents: function() {
                var e; ! tn[t].pollOnce && !tn[Kt] && (tn.on(St,
                    function() {
                        tn.poll()
                    }), tn.on(N,
                    function() {
                        tn.poll()
                    })),
                    tn[b][L] == "ios" && tn[K](function() {
                    tn.on(N,
                        function() {
                            var e = document[a]("input");
                            tn[n](e,
                                function(t) {
                                    e[t][Pt] = e[t][it],
                                        e[t][it] = ""
                                }),
                                window.setTimeout(function() {
                                        tn[n](e,
                                            function(t) {
                                                e[t][it] = e[t][Pt]
                                            })
                                    },
                                    100)
                        })
                }),
                    window[Zt] && tn.on(St, window[Zt]),
                    window[Zt] = function() {
                        tn[yt](St)
                    },
                    window[$] && tn.on(N, window[$]),
                    window[$] = function() {
                        tn[yt](N)
                    }
            },
            initUtilityMethods: function() {
                document[Y] ? !
                    function(e, t) {
                        tn[K] = t()
                    } (zt,
                        function() {
                            function e(e) {
                                s = 1;
                                while (e = t.shift()) e()
                            }
                            var t = [],
                                n,
                                r = document,
                                i = ht,
                                s = /^loaded|^c/.test(r[Gt]);
                            return r[Y](i, n = function() {
                                r[bt](i, n),
                                    e()
                            }),
                                function(e) {
                                    s ? e() : t[R](e)
                                }
                        }) : !
                    function(e, t) {
                        tn[K] = t()
                    } (zt,
                        function(e) {
                            function t(e) {
                                p = 1;
                                while (e = n.shift()) e()
                            }
                            var n = [],
                                r,
                                i = !1,
                                s = document,
                                o = s[rt],
                                u = o.doScroll,
                                a = ht,
                                f = Y,
                                l = "onreadystatechange",
                                c = Gt,
                                h = u ? /^loaded|^c/: /^loaded|c/,
                                p = h.test(s[c]);
                            return s[f] && s[f](a, r = function() {
                                    s[bt](a, r, i),
                                        t()
                                },
                                i),
                                u && s.attachEvent(l, r = function() { / ^c / .test(s[c]) && (s.detachEvent(l, r), t())
                            }),
                                e = u ?
                                    function(t) {
                                        self != top ? p ? t() : n[R](t) : function() {
                                            try {
                                                o.doScroll("left")
                                            } catch(n) {
                                                return setTimeout(function() {
                                                        e(t)
                                                    },
                                                    50)
                                            }
                                            t()
                                        } ()
                                    }: function(e) {
                                    p ? e() : n[R](e)
                                }
                        }),
                    document[o] ? tn[o] = function(e) {
                        return document[o](e)
                    }: tn[o] = function(e) {
                        var t = document;
                        return t[Bt] ? t[Bt](("." + e[H](" ", " ."))[H](/\.([0-9])/, Yt)) : []
                    },
                    Array[Rt][I] ? tn[I] = function(e, t) {
                        return e[I](t)
                    }: tn[I] = function(e, t) {
                        if (typeof e == "string") return e[I](t);
                        var n, r = t ? t: 0,
                            i;
                        if (!this) throw new TypeError;
                        i = this[f];
                        if (i === 0 || r >= i) return - 1;
                        r < 0 && (r = i - Math.abs(r));
                        for (n = r; n < i; n++) if (this[n] === e) return n;
                        return - 1
                    },
                    Array[_] ? tn[_] = function(e) {
                        return Array[_](e)
                    }: tn[_] = function(e) {
                        return Object[Rt].toString.call(e) === "[object Array]"
                    },
                    Object.keys ? tn[n] = function(e, t) {
                        if (!e) return [];
                        var n, r = Object.keys(e);
                        for (n = 0; r[n]; n++) t(r[n])
                    }: tn[n] = function(e, t) {
                        if (!e) return [];
                        var n;
                        for (n in e) Object[Rt][Wt].call(e, n) && t(n)
                    },
                    window.matchMedia ? tn[W] = function(e) {
                        return e == "" ? m: window.matchMedia(e).matches
                    }: window.styleMedia || window[Et] ? tn[W] = function(e) {
                        if (e == "") return m;
                        var t = window.styleMedia || window[Et];
                        return t.matchMedium(e || "all")
                    }: window[G] ? tn[W] = function(e) {
                        if (e == "") return m;
                        var t = document[g](_t),
                            n = document[a]("script")[0],
                            r = l;
                        t.type = pt,
                            t.id = "matchmediajs-test",
                            n[T][w](t, n),
                            r = G in window && window[G](t, l) || t.currentStyle;
                        var i = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                        return t.styleSheet ? t.styleSheet.cssText = i: t.textContent = i,
                            r.width === "1px"
                    }: (tn[Mt] = m, tn[W] = function(e) {
                        if (e == "") return m;
                        var t, n, r, i, s = {
                                "min-width": l,
                                "max-width": l
                            },
                            o = u;
                        n = e[Ot](/\s+and\s+/);
                        for (i in n) t = n[i],
                            t[at](0) == "(" && (t = t[C](1, t[f] - 1), r = t[Ot](/:\s+/), r[f] == 2 && (s[r[0][H](/^\s+|\s+$/g, "")] = parseInt(r[1]), o = m));
                        if (!o) return u;
                        var a = document[rt].clientWidth,
                            c = document[rt].clientHeight;
                        return s[qt] !== l && a < s[qt] || s[Ut] !== l && a > s[Ut] || s[jt] !== l && c < s[jt] || s[Ft] !== l && c > s[Ft] ? u: m
                    })
            },
            preInit: function() {
                var e = document[a]("script");
                tn.me = e[e[f] - 1],
                    tn.initUtilityMethods(),
                    tn.initAPI(),
                    tn[tt](Dt, document[a](Dt)[0]),
                    tn[tt](B, document[a](B)[0]),
                    tn[K](function() {
                        tn[tt]("body", document[a]("body")[0])
                    }),
                    tn[b].browser == "ie" && tn[b][ot] >= 10 && tn[lt](tn[j]("msie-viewport-fix", tn[E]("@-ms-viewport{width:device-width}"), Z, 1))
            }
        };
    return tn.preInit(),
        tn[b][ot] < 9 && (tn[Nt] = function(e) {},
        tn[E] = function(e) {
            var t;
            return t = document[g]("span"),
                t[It] = '&nbsp;<style type="text/css">' + e + "</style>",
                t
        }),
        tn
} (); (function(e, t) {
    typeof define == "function" && define.amd ? define([], t) : typeof exports == "object" ? module.exports = t() : e.skel = t()
})(this,
    function() {
        return skel
    });