/**
 * util
 * 包含一些常用的方法以及一些jquery未实现的常用方法
 */
define(function(require){

    var $ = require('jquery');

    var result = {};

    function _is(type, obj){
        var cls = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && cls === type;
    }

    result = {
        isArray: function(obj){
            return _is('Array', obj);
        },

        isObject: function(obj){
            return _is('Object', obj);
        },

        isString: function(obj){
            return _is('String', obj);
        },

        isFunction: function(obj){
            return _is('Function', obj);
        },

        getUniqueKey: (function(){
            var _loadTime = (new Date()).getTime().toString(), _i = 1;
            return function () {
                return _loadTime + (_i++);
            };
        })(),

        indexOf: function(item, arr){
            if (arr.indexOf) {
                return arr.indexOf(item);
            }
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === item) {
                    return i;
                }
            }
            return -1;
        },

        inArray: function(oElement, aSource){
            return result.indexOf(oElement, aSource) > -1;
        },

        easyTemplate: (function(){
            var easyTemplate = function(s,d){
                if(!s){
                    return '';
                }
                if (s!==easyTemplate.template) {
                    easyTemplate.template = s;
                    easyTemplate.aStatement =
                        easyTemplate.parsing(easyTemplate.separate(s));
                }
                var aST = easyTemplate.aStatement;
                var process = function(d2){
                    if(d2){d = d2;}
                    return arguments.callee;
                };
                process.toString = function(){
                    return (new Function(aST[0],aST[1]))(d);
                };
                return process;
            };
            easyTemplate.separate = function(s){
                var r = /\\'/g;
                var sRet =
                    s.replace(
                        /(<(\/?)#(.*?(?:\(.*?\))*)>)|(')|([\r\n\t])|(\$\{([^\}]*?)\})/g,
                        function(a,b,c,d,e,f,g,h){
                            if (b) {
                                return '{|}'+(c?'-':'+')+d+'{|}';
                            }
                            if (e) {
                                return '\\\'';
                            }
                            if (f) {
                                return '';
                            }
                            if (g) {
                                return '\'+('+h.replace(r,'\'')+')+\'';
                            }
                        }
                    );
                return sRet;
            };
            easyTemplate.parsing = function(s){
                var mName;
                var vName;
                var sTmp;
                var aTmp;
                var sFL;
                var sEl;
                var aList;
                var aStm = ['var aRet = [];'];
                aList = s.split(/\{\|\}/);
                var r = /\s/;
                while (aList.length) {
                    sTmp = aList.shift();
                    if (!sTmp) {
                        continue;
                    }
                    sFL = sTmp.charAt(0);
                    if (sFL !== '+' && sFL !== '-') {
                        sTmp = '\''+sTmp+'\'';
                        aStm.push('aRet.push('+sTmp+');');
                        continue;
                    }
                    aTmp = sTmp.split(r);
                    switch(aTmp[0]){
                        case '+et':mName = aTmp[1];vName = aTmp[2];aStm.push('aRet.push("<!--'+mName+' start--\>");');break;
                        case '-et':aStm.push('aRet.push("<!--'+mName+' end--\>");');break;
                        case '+if':aTmp.splice(0,1);aStm.push('if'+aTmp.join(' ')+'{');break;
                        case '+elseif':aTmp.splice(0,1);aStm.push('}else if'+aTmp.join(' ')+'{');break;
                        case '-if':aStm.push('}');break;
                        case '+else':aStm.push('}else{');break;
                        case '+list':aStm.push('if('+aTmp[1]+'.constructor === Array){with({i:0,l:'+aTmp[1]+'.length,'+aTmp[3]+'_index:0,'+aTmp[3]+':null}){for(i=l;i--;){'+aTmp[3]+'_index=(l-i-1);'+aTmp[3]+'='+aTmp[1]+'['+aTmp[3]+'_index];');break;
                        case '-list':aStm.push('}}}');break;
                        default:break;
                    }
                }
                aStm.push('return aRet.join("");');
                return [vName,aStm.join('')];
            };

            return easyTemplate;
        })(),

        // 字符串
        str: {
            trim: function(str){
                if (typeof str !== 'string') {
                    throw 'trim need a string as parameter';
                }
                var len = str.length;
                var s = 0;
                var reg = /(\u3000|\s|\t|\u00A0)/;
                while (s < len) {
                    if (!reg.test(str.charAt(s))) {
                        break;
                    }
                    s += 1;
                }
                while (len > s) {
                    if (!reg.test(str.charAt(len - 1))) {
                        break;
                    }
                    len -= 1;
                }
                return str.slice(s, len);
            },

            decodeHTML: function (str) {
                if (typeof str !== 'string') {
                    throw 'decodeHTML need a string as parameter';
                }
                return str.replace(/&quot;/g, '"').
                    replace(/&lt;/g, '<').
                    replace(/&gt;/g, '>').
                    replace(/&#39/g, '\'').
                    replace(/&nbsp;/g, '\u00A0').
                    replace(/&#32/g, '\u0020').
                    replace(/&amp;/g, '\&');
            },

            encodeHTML: function (str) {
                if (typeof str !== 'string') {
                    throw 'encodeHTML need a string as parameter';
                }
                return str.replace(/\&/g, '&amp;').
                    replace(/"/g, '&quot;').
                    replace(/\</g, '&lt;').
                    replace(/\>/g, '&gt;').
                    replace(/\'/g, '&#39;').
                    replace(/\u00A0/g, '&nbsp;').
                    replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, '&#32;');
            },

            bLength: function(str){
                if (!str) {
                    return 0;
                }
                var aMatch = str.match(/[^\x00-\xff]/g);
                return (str.length + (!aMatch ? 0 : aMatch.length));
            }
        },

        obj: {
            objSup: function (obj, fList) {
                var that = {};
                for (var i = 0, len = fList.length; i < len; i += 1) {
                    if (typeof obj[fList[i]] !== 'function') {
                        throw 'super need function list '
                                + ' as the second paramsters';
                    }
                    that[fList[i]] = (function (fun) {
                        return function () {
                            return fun.apply(obj, arguments);
                        };
                    })(obj[fList[i]]);
                }
                return that;
            },

            cut: function(obj, list){
                var ret = {};
                if (!result.isArray(list)) {
                    throw 'Lilac.cut need array as second parameter';
                }
                for (var k in obj) {
                    if (!result.inArray(k, list)) {
                        ret[k] = obj[k];
                    }
                }
                return ret;
            }
        },

        // json
        json: {
            jsonToQuery: function(JSON, isEncode) {
                var _fdata = function (data, isEncode) {
                    data = data == null? '': data;
                    data = result.str.trim(data.toString());
                    if (isEncode) {
                        return encodeURIComponent(data);
                    }
                    return data;

                };

                var _Qstring = [];
                if (typeof JSON == 'object') {
                    for (var k in JSON) {
                        if (k === '$nullName') {
                            _Qstring = _Qstring.concat(JSON[k]);
                            continue;
                        }
                        if (JSON[k] instanceof Array) {
                            for(var i = 0, len = JSON[k].length; i < len; i++){
                                _Qstring.push(k + '=' + _fdata(JSON[k][i],isEncode));
                            }
                        }
                        else {
                            if (typeof JSON[k] != 'function') {
                                _Qstring.push(k + '=' +_fdata(JSON[k],isEncode));
                            }
                        }
                    }
                }
                if(_Qstring.length) {
                    return _Qstring.join('&');
                }
                return '';
            },

            queryToJson: function(QS, isDecode) {
                var _Qlist = result.str.trim(QS).split('&');
                var _json = {};
                var _fData = function (data) {
                    if (isDecode) {
                        return decodeURIComponent(data);
                    }
                    else {
                        return data;
                    }
                };
                for (var i = 0, len = _Qlist.length; i < len; i++) {
                    if (_Qlist[i]) {
                        var _hsh = _Qlist[i].split('=');
                        var _key = _hsh[0];
                        var _value = _hsh[1];
                        // 如果只有key没有value, 那么将全部丢入一个$nullName数组中
                        if (_hsh.length < 2) {
                            _value = _key;
                            _key = '$nullName';
                        }
                        // 如果缓存堆栈中没有这个数据
                        if (!_json[_key]) {
                            _json[_key] = _fData(_value);
                        }
                        // 如果堆栈中已经存在这个数据，则转换成数组存储
                        else {
                            if (result.isArray(_json[_key]) != true) {
                                _json[_key] = [_json[_key]];
                            }
                            _json[_key].push(_fData(_value));
                        }
                    }
                }
                return _json;
            }
        },

        dom: {
            parseDOM: function(list){
                for (var a in list) {
                    if (list[a] && (list[a].length == 1)) {
                        list[a] = list[a][0];
                    }
                }
                return list;
            },

            builder: function (sHTML, oSelector) {
                var isHTML = (typeof (sHTML) === 'string');

                // 写入HTML
                var container = sHTML;

                if (isHTML) {
                    container = document.createElement('div');
                    container.innerHTML = sHTML;
                }

                var domList = {};
                var totalList;

                if (oSelector) {
                    for (key in selectorList) {
                        domList[key] = $(oSelector[key].toString(), container);
                    }
                } else {
                    totalList = $('[node-type]', container);
                    for (var i = 0, len = totalList.length; i < len; i += 1) {
                        var key = totalList[i].getAttribute('node-type');
                        if (!domList[key]) {
                            domList[key] = [];
                        }
                        domList[key].push(totalList[i]);
                    }
                }

                // 把结果放入到文档碎片中
                var domBox = sHTML;

                if (isHTML) {
                    domBox = document.createDocumentFragment();
                    while (container.childNodes[0]) {
                        domBox.appendChild(container.childNodes[0]);
                    }
                }

                // 返回文档碎片跟节点列表
                return {
                    'box': domBox,
                    'list': domList
                };
            },

            contains:function (parent, node) {
                if (parent === node) {
                    return false;
                } else if (parent.compareDocumentPosition) {
                    return ((parent.compareDocumentPosition(node) & 16) === 16);

                } else if (parent.contains && node.nodeType === 1) {
                    return parent.contains(node);

                } else {
                    while (node = node.parentNode) {
                        if (parent === node) {
                            return true;
                        }
                    }
                }
                return false;
            },

            isNode: function(elem) {
                return (elem != undefined)
                            && Boolean(elem.nodeName)
                            && Boolean(elem.nodeType);
            }
        },

        // 事件
        evt: {
            custEvent: (function(){
                var custEventAttribute = '__custEventKey__';
                var custEventKey = 1;
                var custEventCache = {};
                /**
                 * 从缓存中查找相关对象
                 * 当已经定义时
                 *     有type时返回缓存中的列表 没有时返回缓存中的对象
                 * 没有定义时返回false
                 * @param {Object|number} obj 对象引用或获取的key
                 * @param {String} type 自定义事件名称
                 */
                var findCache = function (obj, type) {
                    var _key =
                        (typeof obj == 'number')
                        ?
                        obj
                        :
                        obj[custEventAttribute];

                    return (_key && custEventCache[_key])
                        &&
                        {
                            obj:
                                (
                                    typeof type == 'string'
                                    ?
                                    custEventCache[_key][type]
                                    :
                                    custEventCache[_key]
                                ),
                            key:_key
                        };
                };

                //事件迁移相关
                var hookCache = {};//arr key -> {origtype-> {fn, desttype}}

                var add = function (obj, type, fn, data, once) {
                    if (obj && typeof type == 'string' && fn) {
                        var _cache = findCache(obj, type);
                        if (!_cache || !_cache.obj) {
                            throw 'custEvent (' + type + ') is undefined !';
                        }
                        _cache.obj.push({fn:fn, data:data, once:once});
                        return _cache.key;
                    }
                };

                var fire = function (obj, type, args, defaultAction) {
                    //事件默认行为阻止
                    var preventDefaultFlag = true;
                    var preventDefault = function () {
                        preventDefaultFlag = false;
                    };
                    if (obj && typeof type == 'string') {
                        var _cache = findCache(obj, type), _obj;
                        if (_cache && (_obj = _cache.obj)) {
                            args = typeof args != 'undefined'
                                        && [].concat(args) || [];
                            for (
                                var i = _obj.length - 1;
                                i > -1 && _obj[i];
                                i--
                            ) {
                                var fn = _obj[i].fn;
                                var isOnce = _obj[i].once;
                                if (fn && fn.apply) {
                                    try {
                                        fn.apply(
                                            obj,
                                            [
                                                {
                                                    obj:obj,
                                                    type:type,
                                                    data:_obj[i].data,
                                                    preventDefault:preventDefault
                                                }
                                            ].concat(args)
                                        );
                                        if (isOnce) {
                                            _obj.splice(i, 1);
                                        }
                                    } catch (e) {
                                        console.log(e.message);
                                        throw ('[error][custEvent]' + e.message,
                                                e, e.stack);
                                    }
                                }
                            }

                            if (
                                preventDefaultFlag
                                &&
                                typeof (defaultAction) === 'function'
                            ) {
                                defaultAction();
                            }
                            return _cache.key;
                        }
                    }
                };

                var that = {
                    /**
                     * 对象自定义事件的定义 未定义的事件不得绑定
                     * @method define
                     * @static
                     * @param {Object|number} obj 对象引用或获取的下标(key); 必选
                     * @param {String|Array} type 自定义事件名称; 必选
                     * @return {number} key 下标
                     */
                    define:function (obj, type) {
                        if (obj && type) {
                            var _key =
                                (typeof obj == 'number')
                                ?
                                obj
                                :
                                obj[custEventAttribute]
                                    || (obj[custEventAttribute] = custEventKey++);
                            var _cache =
                                custEventCache[_key] || (custEventCache[_key] = {});
                            type = [].concat(type);
                            for (var i = 0; i < type.length; i++) {
                                _cache[type[i]] || (_cache[type[i]] = []);
                            }
                            return _key;
                        }
                    },

                    /**
                     * 对象自定义事件的取消定义
                     * 当对象的所有事件定义都被取消时 删除对对象的引用
                     * @method define
                     * @static
                     * @param {Object|number} obj 对象引用或获取的(key); 必选
                     * @param {String} type 自定义事件名称; 可选 不填可取消所有事件的定义
                     */
                    undefine: function (obj, type) {
                        if (obj) {
                            var _key =
                                (typeof obj == 'number')
                                ?
                                obj
                                :
                                obj[custEventAttribute];
                            if (_key && custEventCache[_key]) {
                                if (type) {
                                    type = [].concat(type);
                                    for (var i = 0; i < type.length; i++) {
                                        if (type[i] in custEventCache[_key]) {
                                            delete custEventCache[_key][type[i]];
                                        }
                                    }
                                } else {
                                    delete custEventCache[_key];
                                }
                            }
                        }
                    },

                    /**
                     * 事件添加或绑定
                     * @method add
                     * @static
                     * @param {Object|number} obj 对象引用或获取的(key); 必选
                     * @param {String} type 自定义事件名称; 必选
                     * @param {Function} fn 事件处理方法; 必选
                     * @param {Any} data 扩展数据任意类型; 可选
                     * @return {number} key 下标
                     */
                    add:function (obj, type, fn, data) {
                        return add(obj, type, fn, data, false);
                    },

                    /**
                     * 单次事件绑定
                     * @method once
                     * @static
                     * @param {Object|number} obj 对象引用或获取的(key); 必选
                     * @param {String} type 自定义事件名称; 必选
                     * @param {Function} fn 事件处理方法; 必选
                     * @param {Any} data 扩展数据任意类型; 可选
                     * @return {number} key 下标
                     */
                    once:function (obj, type, fn, data) {
                        return add(obj, type, fn, data, true);
                    },

                    /**
                     * 事件删除或解绑
                     * @method remove
                     * @static
                     * @param {Object|number} obj 对象引用或获取的(key); 必选
                     * @param {String} type 自定义事件名称; 可选; 为空时删除对象下的所有事件绑定
                     * @param {Function} fn 事件处理方法; 可选; 为空且type不为空时 删除对象下type事件相关的所有处理方法
                     * @return {number} key 下标
                     */
                    remove:function (obj, type, fn) {
                        if (obj) {
                            var _cache = findCache(obj, type), _obj, index;
                            if (_cache && (_obj = _cache.obj)) {
                                if (result.isArray(_obj)) {
                                    if (fn) {
                                        //for (var i = 0; i < _obj.length && _obj[i].fn !== fn; i++);
                                        var i = 0;
                                        while (_obj[i]) {
                                            if (_obj[i].fn === fn) {
                                                break;
                                            }
                                            i++;
                                        }
                                        _obj.splice(i, 1);
                                    } else {
                                        _obj.splice(0, _obj.length);
                                    }
                                } else {
                                    for (var i in _obj) {
                                        _obj[i] = [];
                                    }
                                }
                                return _cache.key;
                            }
                        }
                    },

                    /**
                     * 事件触发
                     * @method fire
                     * @static
                     * @param {Object|number} obj 对象引用或获取的(key); 必选
                     * @param {String} type 自定义事件名称; 必选
                     * @param {Any|Array} args 参数数组或单个的其他数据; 可选
                     * @param {Function} defaultAction 触发事件列表结束后的默认Function; 可选 注：当args不需要时请用undefined/null填充,以保证该参数为第四个参数
                     * @return {number} key 下标
                     */
                    fire:function (obj, type, args, defaultAction) {
                        return fire(obj, type, args, defaultAction);
                    },

                    /**
                     * 事件由源对象迁移到目标对象
                     * @method hook
                     * @static
                     * @param {Object} orig 源对象
                     * @param {Object} dest 目标对象
                     * @param {Object} typeMap 事件名称对照表
                     * {
                     *      源事件名->目标事件名
                     * }
                     */
                    hook:function (orig, dest, typeMap) {
                        if (!orig || !dest || !typeMap) {
                            return;
                        }
                        var destTypes = [];
                        var origKey = orig[custEventAttribute];
                        var origKeyCache = origKey && custEventCache[origKey];
                        var origTypeCache;
                        var destKey =
                            dest[custEventAttribute]
                                || (dest[custEventAttribute] = custEventKey++);
                        var keyHookCache;
                        if (origKeyCache) {
                            keyHookCache =
                                hookCache[origKey + '_' + destKey]
                                   || (hookCache[origKey + '_' + destKey] = {});
                            var fn = function (event) {
                                var preventDefaultFlag = true;
                                fire(
                                    dest,
                                    keyHookCache[event.type].type,
                                    Array.prototype.slice.apply(
                                        arguments,
                                        [1, arguments.length]
                                    ),
                                    function () {
                                        preventDefaultFlag = false
                                    }
                                );
                                preventDefaultFlag && event.preventDefault();
                            };
                            for (var origType in typeMap) {
                                var destType = typeMap[origType];
                                if (!keyHookCache[origType]) {
                                    if (origTypeCache = origKeyCache[origType]) {
                                        origTypeCache.push({fn:fn, data:undefined});
                                        keyHookCache[origType] = {
                                            fn:fn,
                                            type:destType
                                        };
                                        destTypes.push(destType);
                                    }
                                }
                            }
                            that.define(dest, destTypes);
                        }
                    },

                    /**
                     * 取消事件迁移
                     * @method unhook
                     * @static
                     * @param {Object} orig 源对象
                     * @param {Object} dest 目标对象
                     * @param {Object} typeMap 事件名称对照表
                     * {
                             *  源事件名->目标事件名
                             * }
                     */
                    unhook:function (orig, dest, typeMap) {
                        if (!orig || !dest || !typeMap) {
                            return;
                        }
                        var origKey = orig[custEventAttribute];
                        var destKey = dest[custEventAttribute];
                        var keyHookCache = hookCache[origKey + '_' + destKey];
                        if (keyHookCache) {
                            for (var origType in typeMap) {
                                var destType = typeMap[origType];
                                if (keyHookCache[origType]) {
                                    that.remove(
                                        orig,
                                        origType,
                                        keyHookCache[origType].fn
                                    );
                                }
                            }
                        }
                    },
                    /**
                     * 销毁
                     * @method destroy
                     * @static
                     */
                    destroy:function () {
                        custEventCache = {};
                        custEventKey = 1;
                        hookCache = {};
                    }
                }
                return that;
            })(),

            getEvent: (function () {
                if (document.addEventListener) {
                    return function () {
                        var o = arguments.callee;
                        var e;
                        do {
                            e = o.arguments[0];
                            if (e && (e.constructor == Event || e.constructor == MouseEvent || e.constructor == KeyboardEvent)) {
                                return e;
                            }
                        } while (o = o.caller);
                        return e;
                    };
                } else {
                    return function (el, type, fn) {
                        return window.event;
                    };
                }
            })(),

            hitTest: function(oNode, oEvent){
                function getNodeInfo(oNode) {
                    var node = $(oNode)[0];
                    var pos = $(node).position();
                    var area = {
                        left: pos.left,
                        top: pos.top,
                        right: pos.left + node.offsetWidth,
                        bottom: pos.top + node.offsetHeight
                    };
                    return area;
                }
                var node1Area = getNodeInfo(oNode);
                if (oEvent == null) {
                    oEvent = result.evt.getEvent();
                }else if (oEvent.nodeType == 1) {
                    var node2Area = getNodeInfo(oEvent);

                    if (node1Area.right > node2Area.left && node1Area.left < node2Area.right &&
                        node1Area.bottom > node2Area.top && node1Area.top < node2Area.bottom) {
                        return true;
                    }
                    return false;
                }
                else if (oEvent.clientX == null) {
                    throw 'evt.hitTest: [' + oEvent + ':oEvent] is not a valid value';
                }

                var evtX = oEvent.clientX + $(document).scrollLeft();
                var evtY = oEvent.clientY + $(document).scrollTop();


                return (evtX >= node1Area.left && evtX <= node1Area.right) && (evtY >= node1Area.top && evtY <= node1Area.bottom);
            }
        }
    }

    return result;
});