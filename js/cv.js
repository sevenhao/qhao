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
            }),
            $("#footer").scrollwatch({
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
        $(window).scroll(function() {
            var a = $(document).scrollTop();
            a > 50 ? $("#intro").addClass("scrolling-out") : $("#intro").removeClass("scrolling-out"),
                e && clearTimeout(e)
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
        })
});