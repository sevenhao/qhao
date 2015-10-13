/**
 * Designed and developed by qhao on 2015/9/30.
 * Copyright (c) 2009 qhao
 */
var _options = {
enableAnimations: !0,
skel: {
    reset: "full",
    viewport: {
        width: 1440,
        height: 900
    }
},
NProgress: {
    showSpinner: !1
},
niceScroll: {
    cursorcolor: "#333",
    cursoropacitymin: ".1",
    cursoropacitymax: ".9",
    cursorborder: "1px solid rgba(255, 255, 255, 0.5)",
    mousescrollstep: "50",
    horizrailenabled: !1
},
niceScrollLectures: {
    cursorcolor: "#bbb",
    cursorwidth: "8",
    cursoropacitymin: ".3",
    cursoropacitymax: ".9",
    cursorborder: "1px solid rgba(255, 255, 255, 0.5)",
    mousescrollstep: "30",
    bouncescroll: !0,
    touchbehavior: !0
},
parallax: {
    calibrateX: !0,
    calibrateY: !0,
    invertX: !0,
    invertY: !0,
    limitX: 10,
    limitY: 8,
    scalarX: 3,
    scalarY: 5,
    frictionX: .1,
    frictionY: .1,
    originX: .5,
    originY: .5
},
countUp: {
    useEasing: !0,
    useGrouping: !0,
    separator: ","
}
};
skel.init(_options.skel),
jQuery(function() {

    var e, h, i, a = $(window),
        b = window.opera ? "CSS1Compat" == document.compatMode ? $("html") : $("body") : $("html, body"),
        c = $("body").children("section"),
        d = $("html").attr("lang").substr(0, 2);
    sectionTransitionState = !1,
        a.load(function() {
            window.setTimeout(function() {
                    $("body").removeClass("initializing")
                },
                1e3),
                "firefox" == skel.vars.browser && Sticker.init("#portait")
        }),
        NProgress.configure(_options.NProgress),
        NProgress.start(),
        skel.vars.IEVersion <= 9 && (_options.enableAnimations = !1),
        "firefox" != skel.vars.browser && Sticker.init("#portait"),
        "chrome" != skel.vars.browser && $("[data-scene]").parallax(_options.parallax),
        skel.vars.IEVersion < 10 && $("form").formerize(),
        "mac" != skel.vars.deviceType && ($("html").niceScroll(_options.niceScroll), $("#lectures-inner").mouseover(function() {
        b.bind("DOMMouseScroll mousewheel",
            function() {
                return ! 1
            })
    }).mouseout(function() {
        b.unbind("DOMMouseScroll mousewheel")
    }).mousewheel(function(a, c) {
        $(this).scrollLeft() + $("#lectures-inner article").outerWidth(!0),
            0 > c && $(this).scrollLeft() + $(this).innerWidth() >= $(this).get(0).scrollWidth && 0 > c && b.animate({
                scrollTop: $(document).scrollTop() + 150
            },
            300),
            0 == $(this).scrollLeft() && c > 0 && b.animate({
                scrollTop: $(document).scrollTop() - 150
            },
            300)
    }).niceScroll(_options.niceScrollLectures)),
        skel.change(function() {
            _options.enableAnimations ? sectionTransitionState || (sectionTransitionState = !0, c.scrollwatch({
                delay: 15,
                range: .5,
                anchor: "center",
                init: function(a) {
                    a.addClass("inactive")
                },
                on: function(a) {
                    a.removeClass("inactive")
                },
                off: function(a) {
                    a.addClass("inactive")
                }
            }), $("#travel").scrollwatch({
                delay: 20,
                range: .8,
                anchor: "center",
                init: function(a) {
                    a.addClass("inactive")
                },
                on: function(a) {
                    a.removeClass("inactive"),
                        $("#trypophobia").fadeIn(),
                        $("#map g").children("circle").css("opacity", 0).each(function(a) {
                            var b = $(this);
                            setTimeout(function() {
                                    b.css("opacity", .8)
                                },
                                    50 * a)
                        })
                },
                off: function(a) {
                    a.addClass("inactive"),
                        $("#map g").children("circle").css("opacity", 0)
                }
            }), $("#photography").scrollwatch({
                delay: 25,
                range: .6,
                anchor: "center",
                init: function(a) {
                    a.addClass("inactive")
                },
                on: function(a) {
                    a.removeClass("inactive"),
                        $("#montage a").children("img").css("transition", "none").addClass("flipping").each(function(a) {
                            var b = $(this);
                            setTimeout(function() {
                                    b.removeAttr("style").removeClass("flipping")
                                },
                                    100 * a)
                        })
                },
                off: function(a) {
                    a.addClass("inactive")
                }
            }), $("#speech").scrollwatch({
                delay: 20,
                range: .8,
                anchor: "center",
                init: function(a) {
                    a.addClass("inactive")
                },
                on: function(a) {
                    a.removeClass("inactive"),
                        "firefox" == skel.vars.browser && $("#lectures-inner").getNiceScroll().resize()
                },
                off: function(a) {
                    a.addClass("inactive")
                }
            }), $("#contact").scrollwatch({
                delay: 20,
                range: .4,
                anchor: "center",
                init: function(a) {
                    a.addClass("inactive"),
                        a.find("li").addClass("hidden")
                },
                on: function(a) {
                    a.removeClass("inactive"),
                        a.find("li").each(function(a) {
                            var b = $(this);
                            setTimeout(function() {
                                    b.removeClass("hidden")
                                },
                                    200 * a)
                        })
                },
                off: function(a) {
                    a.addClass("inactive"),
                        a.find("li").each(function(a) {
                            var b = $(this);
                            setTimeout(function() {
                                    b.addClass("hidden")
                                },
                                    100 * a)
                        })
                }
            }), $("#footer").scrollwatch({
                delay: 20,
                range: .8,
                anchor: "center",
                init: function(a) {
                    a.addClass("inactive")
                },
                on: function(a) {
                    var b, c;
                    a.removeClass("inactive"),
                        b = $("#count").data("count"),
                        c = new countUp("count", 111111, b, 0, 5, _options.countUp),
                        c.start()
                },
                off: function(a) {
                    a.addClass("inactive")
                }
            }), window.setTimeout(function() {
                    a.trigger("resize").trigger("scroll")
                },
                0)) : (sectionTransitionState = !1, c.unscrollwatch().removeClass("inactive"))
        }),
        a.resize(function() {
            window.setTimeout(function() {
                    $("a[href^=#]").scrolly(1500),
                        $("body").children("section:not(#contact)").each(function() {
                            var b = $(this),
                                c = b.children(".content"),
                                d = Math.max(100, Math.round((a.height() - c.outerHeight()) / 2) + 1);
                            b.css("padding-top", d).css("padding-bottom", d)
                        }),
                        window.setTimeout(function() {
                                b.removeClass("initializing"),
                                    a.trigger("scroll")
                            },
                            1e3)
                },
                100)
        }),
        a.load(function() {
            $("#loading-spinner").fadeOut(function() {
                $(this).remove(),
                    NProgress.done()
            }),
                a.trigger("resize").trigger("scroll")
        }),
        request_count = $("#montage").data("count"),
        $("html").addClass(skel.vars.deviceType),
        function() {
            var a = new Image;
            a.onload = a.onerror = function() {
                2 != a.height ? ($("body").addClass("no-webp"), $.cookie("webp-supported", !1, {
                    expires: 14
                }), $.get("http://v5.res.dandyweng.com/styles/desktop-nowebp.css",
                    function(a) {
                        $('<style type="text/css"></style>').html(a).appendTo("head")
                    })) : $.cookie("webp-supported", !0, {
                    expires: 14
                })
            },
                a.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"
        } (),
        "mac" == skel.vars.deviceType && skel.vars.deviceVersion >= 10.99 && (alert("Flat design detected!"), $.get("http://v5.res.dandyweng.com/styles/desktop-flat.css",
        function(a) {
            $('<style type="text/css"></style>').html(a).appendTo("head")
        })),
        e = !1,
        $(window).scroll(function() {
            var a = $(document).scrollTop();
            a > 50 ? $("#intro").addClass("scrolling-out") : $("#intro").removeClass("scrolling-out"),
                e && clearTimeout(e)
        }),
        $(window).resize(function() {
            $("map").resize()
        }),
        $.getScript("http://v5.res.dandyweng.com/scripts/maps." + d + ".js",
            function() {
                $.getJSON("http://api.dandyweng.com/map-data.php?lang=" + d + "&show-years=true&jsoncallback=?",
                    function(a) {
                        var b = a["items"];
                        $("#map").vectorMap({
                            map: "chinaMerc",
                            markers: b,
                            backgroundColor: "transparent",
                            zoomOnScroll: !1,
                            zoomMin: .95,
                            focusOn: {
                                x: .5,
                                y: .5,
                                scale: .95
                            },
                            regionStyle: {
                                initial: {
                                    fill: "#e5e5e5",
                                    "fill-opacity": 1,
                                    stroke: "none",
                                    "stroke-width": 0,
                                    "stroke-opacity": 1
                                },
                                hover: {
                                    fill: "#ccc",
                                    "fill-opacity": .8
                                }
                            },
                            markerStyle: {
                                initial: {
                                    fill: "#fd8888",
                                    stroke: "#fff"
                                },
                                hover: {
                                    fill: "#fd3838",
                                    stroke: "#fff",
                                    "fill-opacity": .8
                                }
                            }
                        })
                    })
            }),
        $("#share-to-wechat").click(function() {
            $("#instructions").fadeIn()
        }),
        $("#instructions").mouseleave(function() {
            $(this).fadeOut()
        }),
        $("#trypophobia").click(function() {
            $(this).css("transition", "none").fadeOut(1e3),
                $("#map circle").each(function() {
                    $(this).fadeTo(100, .1)
                })
        }),
        $("#montage-controller").hover(function() {
            var a = $(this),
                c = 200,
                b = setInterval(function() {
                        a.css("-webkit-mask", "-webkit-gradient(radial, 16 16, " + c + ", 16 16, " + (c + 80) + ", from(rgb(0, 0, 0)), color-stop(0.5, rgba(0, 0, 0, 0.1)), to(rgb(0, 0, 0)))"),
                            c++,
                            800 === c && (c = 200, clearInterval(b))
                    },
                    5)
        }),
        $("#btn-lang").click(function() {
            "zh" == d ? $.cookie("lang", "en", {
                expires: 30
            }) : "en" == d && $.cookie("lang", "zh", {
                expires: 30
            }),
                location.reload(!0),
                a.trigger("resize").trigger("scroll")
        }),
        $("#btn-fullscreen").click(function() {
            l()
        }),
        $("#enter-fullscreen").click(function() {
            l(),
                $(this).remove()
        }),
        $(".notification i.fa-times").click(function() {
            var a = $(this).closest(".notification"),
                b = a.attr("id"),
                c = parseInt($.cookie(b + "-dismissed"));
            c ? (c++, $.cookie(b + "-dismissed", c, {
                expires: 7
            })) : $.cookie(b + "-dismissed", 1, {
                expires: 7
            }),
                a.remove()
        }),
        $(window).keydown(function(a) {
            122 == a.which && "body".find("#enter-fullscreen").remove()
        }),
        $("#back-to-top").click(function() {
            var a = $(this),
                c = $(this).find("svg"),
                d = c.offset(),
                e = $(document).scrollTop();
            c.css({
                top: d.top - e + "px",
                left: d.left + "px"
            }),
                a.addClass("flying"),
                $("body").children("section").fadeTo(300, .3),
                c.animate({
                        top: -50
                    },
                    3e3,
                    function() {
                        a.removeClass("flying"),
                            c.removeAttr("style")
                    }),
                b.animate({
                        scrollTop: 0
                    },
                    2800,
                    function() {
                        $("body").children("section").fadeTo(1e3, 1)
                    })
        }),
        $("#lectures-inner").bind("scroll",
            function() {
                var a = $(this);
                a.scrollLeft() > 100 ? $("#lectures").find(".left").fadeIn() : $("#lectures").find(".left").fadeOut(),
                        a.children("article").length * a.children("article").outerWidth(!0) - (a.scrollLeft() + a.innerWidth()) < 0 ? $("#lectures").find(".right").fadeOut() : $("#lectures").find(".right").fadeIn()
            }).children("article").each(function() {
                var b = $(this),
                    c = b.find("img"),
                    d = $("<img/>").attr("src", c.attr("src").replace("-original", "-blurred"));
                c.before(d),
                    b.hasClass("video-available") && $("<i/>").appendTo(b).addClass("fa fa-play-circle")
            }),
        h = $("#lectures-inner").children("article").outerWidth(!0),
        i = !1,
        $("#lectures").find(".left").bind("click",
            function(a) {
                a.preventDefault(),
                    $("#lectures-inner").animate({
                        scrollLeft: "-=" + h + "px"
                    })
            }).bind("mouseover",
            function() {
                i = !0,
                    j("left")
            }).bind("mouseout",
            function() {
                i = !1
            }),
        $("#lectures").find(".right").bind("click",
            function(a) {
                a.preventDefault(),
                    $("#lectures-inner").animate({
                        scrollLeft: "+=" + h + "px"
                    })
            }).bind("mouseover",
            function() {
                i = !0,
                    j("right")
            }).bind("mouseout",
            function() {
                i = !1
            }),
        $("#lectures article.video-available").click(function() {
            var a = $(this).data("youku"),
                b = $(this).data("youtube");
            $("#player").removeClass("standby playing").find("iframe").remove(),
                console.log("Detecting GFW..."),
                $.ajax({
                    url: "http://gdata.youtube.com/feeds/api/videos/" + b + "?v=2&alt=jsonc",
                    type: "GET",
                    timeout: 2e3,
                    error: function() {
                        console.log("GFW Detected. //wqnmlgb"),
                            console.log("Loading video from Youku..."),
                            $("#player").addClass("playing"),
                            $('<iframe src="http://player.youku.com/embed/' + a + '" frameborder="0" quality="high" allowfullscreen></iframe>').prependTo("#player")
                    },
                    success: function() {
                        console.log("GFW Not Detected."),
                            console.log("Loading video from YouTube..."),
                            $("#player").addClass("playing"),
                            $('<iframe src="//www.youtube.com/embed/' + b + '?rel=0" frameborder="0" allowfullscreen></iframe>').prependTo("#player")
                    }
                })
        }),
        $("#montage-controller .reload").click(function() {
            n()
        }),
        $("#showcase .6u").click(function() {
            var a = $(this).data("version");
            window.open("http://www.dandyweng.com/versions/" + a)
        }),
        $("#intro").find("e").dblclick(function() {
            console.log("Easter Egg is Found!");
            var a = $(this);
            a.hasClass("loaded") ? $("#e-panel").fadeIn() : ($('<div id="e-panel" />').appendTo("#intro"), $("#e-panel").load("e." + d + ".php",
                function() {
                    console.log("Easter Egg Loaded.");
                    var a = $("#e-count").text();
                    $.cookie("e-count", a, {
                        expires: 999
                    }),
                        $(window).scroll(function() {
                            var a = $(document).scrollTop();
                            a > 10 && $("#e-panel").fadeOut()
                        })
                }).fadeIn(), $('<div id="e-canvas" />').appendTo("#intro"), $.getScript("http://cdn.dandyweng.com/js/matter.min.js",
                function() {
                    var e, g, h, k, l, n, o, p, r, s, q;
                    a.addClass("loaded"),
                        e = Matter.Engine,
                        Matter.Gui,
                        g = Matter.World,
                        h = Matter.Bodies,
                        Matter.Body,
                        Matter.Composite,
                        k = Matter.Composites,
                        l = Matter.Common,
                        Matter.Constraint,
                        n = Matter.MouseConstraint,
                        o = {},
                        q = "mixed",
                        o.init = function() {
                            var a = document.getElementById("e-canvas");
                            $("#e-start").click(function() {
                                $("#e-panel").fadeOut(),
                                    p = e.create(a, {
                                        render: {
                                            options: {
                                                wireframes: !1,
                                                isStatic: !0,
                                                render: {
                                                    visible: !1
                                                }
                                            }
                                        }
                                    }),
                                    setTimeout(function() {
                                            $("#e-canvas").fadeIn(function() {
                                                $('<div id="e-exit"><i class="fa fa-times"></i></div>').appendTo("#intro").fadeIn(),
                                                    e.run(p),
                                                    o.updateScene()
                                            })
                                        },
                                        800)
                            }),
                                $(window).scroll(function() {
                                    var a = $(document).scrollTop();
                                    a > 10 && o.hide()
                                }),
                                $(window).resize(function() {
                                    o.updateScene()
                                }),
                                $("#intro").on("click", "#e-exit",
                                    function() {
                                        o.hide()
                                    })
                        },
                        window.addEventListener("deviceorientation", o.updateGravity, !0),
                        window.addEventListener("orientationchange",
                            function() {
                                o.updateGravity(),
                                    o.updateScene()
                            },
                            !1),
                        o.init(),
                        o.mixed = function() {
                            var b, c, a = p.world;
                            o.reset(),
                                g.add(a, n.create(p)),
                                b = k.stack(canvasCenterX - 300, canvasCenterY, 9, 1, 0, 0,
                                    function(a, b) {
                                        return h.circle(a, b, 50, {
                                            density: .05,
                                            frictionAir: .03,
                                            restitution: 1,
                                            friction: .03,
                                            render: {
                                                sprite: {
                                                    texture: "http://v5.res.dandyweng.com/images/portaits/c" + Math.round(l.random(1, 12)) + ".png"
                                                }
                                            }
                                        })
                                    }),
                                g.add(a, b),
                                c = p.render.options,
                                c.showAngleIndicator = !1,
                                c.wireframes = !1
                        },
                        o.updateScene = function() {
                            if (p) {
                                r = document.documentElement.clientWidth,
                                    s = document.documentElement.clientHeight - 4;
                                var a = p.world.bounds.max,
                                    b = p.render.options,
                                    c = p.render.canvas;
                                a.x = r,
                                    a.y = s,
                                    canvasCenterX = r / 2,
                                    canvasCenterY = s / 2,
                                    c.width = b.width = r,
                                    c.height = b.height = s,
                                    o[q]()
                            }
                        },
                        o.updateGravity = function() {
                            if (p) {
                                var a = window.orientation,
                                    b = p.world.gravity;
                                0 === a ? (b.x = l.clamp(event.gamma, -90, 90) / 90, b.y = l.clamp(event.beta, -90, 90) / 90) : 180 === a ? (b.x = l.clamp(event.gamma, -90, 90) / 90, b.y = l.clamp( - event.beta, -90, 90) / 90) : 90 === a ? (b.x = l.clamp(event.beta, -90, 90) / 90, b.y = l.clamp( - event.gamma, -90, 90) / 90) : -90 === a && (b.x = l.clamp( - event.beta, -90, 90) / 90, b.y = l.clamp(event.gamma, -90, 90) / 90)
                            }
                        },
                        o.reset = function() {
                            var b, a = p.world;
                            l._seed = 2,
                                g.clear(a),
                                e.clear(p),
                                b = 5,
                                g.addBody(a, h.rectangle(.5 * r, -b, r + .5, 50.5, {
                                    isStatic: !0,
                                    render: {
                                        visible: !1
                                    }
                                })),
                                g.addBody(a, h.rectangle(.5 * r, s + b, r + .5, 50.5, {
                                    isStatic: !0,
                                    render: {
                                        visible: !1
                                    }
                                })),
                                g.addBody(a, h.rectangle(r + b, .5 * s, 50.5, s + .5, {
                                    isStatic: !0,
                                    render: {
                                        visible: !1
                                    }
                                })),
                                g.addBody(a, h.rectangle( - b, .5 * s, 50.5, s + .5, {
                                    isStatic: !0,
                                    render: {
                                        visible: !1
                                    }
                                }))
                        },
                        o.hide = function() {
                            $("#e-exit").fadeOut(function() {
                                $(this).remove()
                            }),
                                $("#e-canvas").fadeOut(function() {
                                    $(this).find("canvas").remove()
                                })
                        }
                }))
        }),
        $(document).on("submit", "#commentform",
            function() {
                var a, b;
                return NProgress.start(),
                    a = $("#commentform").find("textarea").val(),
                    b = $("#commentform").find("textarea").data("default"),
                    $("#commentform input").each(function() {
                        var c = $(this);
                        c.val() == c.data("default") && c.val("")
                    }),
                    $.ajax({
                        url: "comment.php",
                        data: $(this).serialize() + "&action=ajax_comment",
                        type: "post",
                        beforeSend: function() {
                            return $("#comment").hasClass("completed") ? !1 : $.trim(a) ? a == b ? !1 : ($("#submit").html('<i class="fa fa-circle-o-notch fa-spin"></i>'), void 0) : !1
                        },
                        error: function(a) {
                            console.log("Comment Failed to Post: " + a.responseText),
                                NProgress.done()
                        },
                        success: function(a) {
                            console.log("Comment Posted: " + a),
                                $("#comment").addClass("completed"),
                                $("#submit").html('<i class="fa fa-check"></i>'),
                                NProgress.done()
                        }
                    }),
                    !1
            })
});