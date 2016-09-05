/**
 * home
 */
define(function(require){
    var $ = require('jquery');
    var util = require('util');
    var cookie = require('./main');
    cookie.remove('__curBgImg__');
    cookie.set('__curBgImg__', 'url(/images/index/chenxi.jpg)' , {
        encode: false
    });

    var view = {};
    view.$cityBg = $('#city-bg');
    view.$cityList = $('#city-list');

    var oldBgName = view.$cityBg.css('background-image');

    var timer;

    function resizeBg() {
        var height = $(document).height();
        view.$cityBg.css('height', height+'px');
    }
    resizeBg();

    $(window).on('resize', function () {
        resizeBg();
    });

    view.$cityList.delegate(
        '[action-type=change-bg]',
        'mouseenter',
        function(e) {
            var curTarget = e.currentTarget;
            var $curTarget = $(curTarget);

            var args = util.json.queryToJson($curTarget.attr('action-data'));
            timer = setTimeout(function(){
                if (args.img) {
                    oldBgName = oldBgName.substring(oldBgName.lastIndexOf('/') + 1);
                    oldBgName = oldBgName.substring(0, oldBgName.lastIndexOf('.'));
                    var newBgNameStr = 'url(' + args.img + ')';
                    var newBgName = newBgNameStr.substring(newBgNameStr.lastIndexOf('/') + 1);
                    newBgName = newBgName.substring(0, newBgName.lastIndexOf('.'));
                    if (oldBgName != newBgName) {
                        view.$cityBg.animate({
                            opacity: 0.7
                        }, {
                            duration: 300,
                            queue: false,
                            complete: function () {
                                view.$cityBg.css('background-image', newBgNameStr);
                                cookie.set('__curBgImg__', newBgNameStr, {
                                    encode: false
                                });
                                view.$cityBg.animate({
                                    opacity: 1
                                }, {
                                    duration: 300,
                                    queue: false,
                                    complete: function () {
                                    }
                                });
                            }
                        });
                    }
                }
            }, 300);
            e.stopPropagation();
            e.preventDefault();
        }
    );

    view.$cityList.delegate(
        '[action-type=change-bg]',
        'mouseleave',
        function(e) {
            timer && clearTimeout(timer);
        }
    );
});