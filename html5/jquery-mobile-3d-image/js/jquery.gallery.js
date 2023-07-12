/**
 * jquery.gallery.js
 * http://www.codrops.com
 *
 * Copyright 2011, Pedro Botelho / Codrops
 * Free to use under the MIT license.
 *
 * Date: Mon Jan 30 2012
 */

(function ($, undefined) {

    /*
     * Gallery object.
     */
    $.Gallery = function (options, element) {
        this.$el = $(element);
        this._init(options);
    };

    // 默认值
    $.Gallery.defaults = {
        current: 0,	// index of current item      处在中间的item的索引号
        autoplay: false,// slideshow on / off       是否自动播放
        interval: 2000  // time between transitions  轮播间隔时间
    };

    // 插件对象成员
    $.Gallery.prototype = {
        _init: function (options) {
            this.options = $.extend(true, {}, $.Gallery.defaults, options); // 自定义参数，覆盖默认参数

            // support for 3d / 2d transforms and transitions
            this.support3d = Modernizr.csstransforms3d;
            this.support2d = Modernizr.csstransforms;
            this.supportTrans = Modernizr.csstransitions;

            this.$wrapper = this.$el.find('.dg_wrapper');

            this.$items = this.$wrapper.children(); // 轮播项
            this.itemsCount = this.$items.length;

            this.$nav = this.$el.find('nav');
            this.$navPrev = this.$nav.find('.dg_prev'); // 前翻按钮
            this.$navNext = this.$nav.find('.dg_next'); // 后翻按钮

            this.$floatLayer = $('#dgContainer .float_layer'); // 中间图片上的浮动层

            // minimum of 3 items
            if (this.itemsCount < 3) {
                this.$nav.remove();
                return false;
            }

            this.current = this.options.current;
            this.isAnim = false;

            this.$items.css({
                'opacity': 0,
                'visibility': 'hidden'
            });

            this._validate(); // 处在中间的item的索引号校验
            this._layout(); // 布局幻灯片
            this._loadEvents(); // load the events 加载事件

            // slideshow 幻灯片显示开始
            if (this.options.autoplay) {
                this._startSlideshow();
            }

            this.$dgfloats = $('.dg_float'); // 所有文字块
            this._showDgfloat(); // 当前文字块显示，其他文字块隐藏
        },
        // 当前文字块显示，其他文字块隐藏
        _showDgfloat: function(){
            this.$dgfloats.hide().eq(this.current).show();
        },
        // 处在中间的item的索引号校验
        _validate: function () {
            if (this.options.current < 0 || this.options.current > this.itemsCount - 1) {
                this.current = 0;
            }
        },
        // 布局幻灯片
        _layout: function () {
            // current, left and right items
            this._setItems();

            // current item is not changed
            // left and right one are rotated and translated
            var leftCSS, rightCSS, currentCSS;

            if (this.support3d && this.supportTrans) {
                leftCSS = {
                    '-webkit-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                    '-moz-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                    '-o-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                    '-ms-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                    'transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)'
                };
                rightCSS = {
                    '-webkit-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                    '-moz-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                    '-o-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                    '-ms-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                    'transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)'
                };
                leftCSS.opacity = 1;
                leftCSS.visibility = 'visible';
                rightCSS.opacity = 1;
                rightCSS.visibility = 'visible';
            }
            else if (this.support2d && this.supportTrans) {
                leftCSS = {
                    '-webkit-transform': 'translate(-422px) scale(0.8)',
                    '-moz-transform': 'translate(-422px) scale(0.8)',
                    '-o-transform': 'translate(-422px) scale(0.8)',
                    '-ms-transform': 'translate(-422px) scale(0.8)',
                    'transform': 'translate(-422px) scale(0.8)'
                };
                rightCSS = {
                    '-webkit-transform': 'translate(422px) scale(0.8)',
                    '-moz-transform': 'translate(422px) scale(0.8)',
                    '-o-transform': 'translate(422px) scale(0.8)',
                    '-ms-transform': 'translate(422px) scale(0.8)',
                    'transform': 'translate(422px) scale(0.8)'
                };
                currentCSS = {
                    'z-index': 999
                };

                leftCSS.opacity = 1;
                leftCSS.visibility = 'visible';
                rightCSS.opacity = 1;
                rightCSS.visibility = 'visible';
            }

            this.$leftItm.css(leftCSS || {});
            this.$rightItm.css(rightCSS || {});

            this.$currentItm.css(currentCSS || {}).css({
                'opacity': 1,
                'visibility': 'visible'
            }).addClass('dg-center');

        },
        _setItems: function () {
            this.$items.removeClass('dg-center');

            this.$currentItm = this.$items.eq(this.current);
            this.$leftItm = ( this.current === 0 ) ? this.$items.eq(this.itemsCount - 1) : this.$items.eq(this.current - 1);
            this.$rightItm = ( this.current === this.itemsCount - 1 ) ? this.$items.eq(0) : this.$items.eq(this.current + 1);

            if (!this.support3d && this.support2d && this.supportTrans) {
                this.$items.css('z-index', 1);
                this.$currentItm.css('z-index', 999);
            }

            // next & previous items
            if (this.itemsCount > 3) {
                // next item
                this.$nextItm = ( this.$rightItm.index() === this.itemsCount - 1 ) ? this.$items.eq(0) : this.$rightItm.next();
                this.$nextItm.css(this._getCoordinates('outright'));

                // previous item
                this.$prevItm = ( this.$leftItm.index() === 0 ) ? this.$items.eq(this.itemsCount - 1) : this.$leftItm.prev();
                this.$prevItm.css(this._getCoordinates('outleft'));
            }
        },
        // 后翻事件定义
        _nextEvent: function(_self,event){
            if (_self.options.autoplay) {

                clearTimeout(_self.slideshow);
                _self.options.autoplay = false;

                setTimeout(function(){
                    _self.options.autoplay = true;
                    _self._startSlideshow();
                },5000);
            }
            _self._navigate('next');
            _self._showDgfloat();
            return false;
        },
        // 前翻事件定义
        _prevEvent: function(_self,event){
            if (_self.options.autoplay) {

                clearTimeout(_self.slideshow);
                _self.options.autoplay = false;

                setTimeout(function(){
                    _self.options.autoplay = true;
                    _self._startSlideshow();
                },5000);
            }
            _self._navigate('prev');
            _self._showDgfloat();
            return false;
        },
        // 加载事件
        _loadEvents: function () {
            var _self = this;
            // 前翻按钮点击
            this.$navPrev.on('click.gallery', function (event) {
                return _self._prevEvent(_self,event);
            });
            // 后翻按钮点击
            this.$navNext.on('click.gallery', function (event) {
                return _self._nextEvent(_self,event);
            });
            // 前翻按钮右滑动
            this.$navPrev.on('swiperight.gallery', function (event) {
                return _self._prevEvent(_self,event);
            });
            // 后翻按钮点左滑动
            this.$navNext.on('swipeleft.gallery', function (event) {
                return _self._nextEvent(_self,event);
            });
            // 居中图片上的按钮右滑动
            this.$floatLayer.on('swiperight.gallery', function (event) {
                return _self._prevEvent(_self,event);
            });
            // 居中图片上的按钮左滑动
            this.$floatLayer.on('swipeleft.gallery', function (event) {
                return _self._nextEvent(_self,event);
            });
            this.$wrapper.on('webkitTransitionEnd.gallery transitionend.gallery OTransitionEnd.gallery', function (event) {
                _self.$currentItm.addClass('dg-center');
                _self.$items.removeClass('dg-transition');
                _self.isAnim = false;
            });
        },
        // 获取坐标
        _getCoordinates: function (position) {
            if (this.support3d && this.supportTrans) {
                switch (position) {
                    case 'outleft':
                        return {
                            '-webkit-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            '-moz-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            '-o-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            '-ms-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            'transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            'opacity': 0,
                            'visibility': 'hidden'
                        };
                        break;
                    case 'outright':
                        return {
                            '-webkit-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            '-moz-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            '-o-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            '-ms-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            'transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            'opacity': 0,
                            'visibility': 'hidden'
                        };
                        break;
                    case 'left':
                        return {
                            '-webkit-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            '-moz-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            '-o-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            '-ms-transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            'transform': 'translateX(-422px) translateZ(-100px) rotateY(25deg)',
                            'opacity': 1,
                            'visibility': 'visible'
                        };
                        break;
                    case 'right':
                        return {
                            '-webkit-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            '-moz-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            '-o-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            '-ms-transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            'transform': 'translateX(422px) translateZ(-100px) rotateY(-25deg)',
                            'opacity': 1,
                            'visibility': 'visible'
                        };
                        break;
                    case 'center':
                        return {
                            '-webkit-transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
                            '-moz-transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
                            '-o-transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
                            '-ms-transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
                            'transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
                            'opacity': 1,
                            'visibility': 'visible'
                        };
                        break;
                };
            }
            else if (this.support2d && this.supportTrans) {
                switch (position) {
                    case 'outleft':
                        return {
                            '-webkit-transform': 'translate(-650px) scale(0.7)',
                            '-moz-transform': 'translate(-650px) scale(0.7)',
                            '-o-transform': 'translate(-650px) scale(0.7)',
                            '-ms-transform': 'translate(-650px) scale(0.7)',
                            'transform': 'translate(-650px) scale(0.7)',
                            'opacity': 0,
                            'visibility': 'hidden'
                        };
                        break;
                    case 'outright':
                        return {
                            '-webkit-transform': 'translate(650px) scale(0.7)',
                            '-moz-transform': 'translate(650px) scale(0.7)',
                            '-o-transform': 'translate(650px) scale(0.7)',
                            '-ms-transform': 'translate(650px) scale(0.7)',
                            'transform': 'translate(650px) scale(0.7)',
                            'opacity': 0,
                            'visibility': 'hidden'
                        };
                        break;
                    case 'left':
                        return {
                            '-webkit-transform': 'translate(-650px) scale(0.8)',
                            '-moz-transform': 'translate(-650px) scale(0.8)',
                            '-o-transform': 'translate(-650px) scale(0.8)',
                            '-ms-transform': 'translate(-650px) scale(0.8)',
                            'transform': 'translate(-650px) scale(0.8)',
                            'opacity': 1,
                            'visibility': 'visible'
                        };
                        break;
                    case 'right':
                        return {
                            '-webkit-transform': 'translate(650px) scale(0.8)',
                            '-moz-transform': 'translate(650px) scale(0.8)',
                            '-o-transform': 'translate(650px) scale(0.8)',
                            '-ms-transform': 'translate(650px) scale(0.8)',
                            'transform': 'translate(650px) scale(0.8)',
                            'opacity': 1,
                            'visibility': 'visible'
                        };
                        break;
                    case 'center':
                        return {
                            '-webkit-transform': 'translate(0px) scale(1)',
                            '-moz-transform': 'translate(0px) scale(1)',
                            '-o-transform': 'translate(0px) scale(1)',
                            '-ms-transform': 'translate(0px) scale(1)',
                            'transform': 'translate(0px) scale(1)',
                            'opacity': 1,
                            'visibility': 'visible'
                        };
                        break;
                };
            }
            else {
                switch (position) {
                    case 'outleft'    :
                    case 'outright'    :
                    case 'left'        :
                    case 'right'    :
                        return {
                            'opacity': 0,
                            'visibility': 'hidden'
                        };
                        break;
                    case 'center'    :
                        return {
                            'opacity': 1,
                            'visibility': 'visible'
                        };
                        break;
                };
            }
        },
        // 导航到前翻或者后翻的状态
        _navigate: function (dir) {
            if (this.supportTrans && this.isAnim)
                return false;

            this.isAnim = true;

            switch (dir) {
                case 'next' :
                    this.current = this.$rightItm.index();

                    // current item moves left
                    this.$currentItm.addClass('dg-transition').css(this._getCoordinates('left'));

                    // right item moves to the center
                    this.$rightItm.addClass('dg-transition').css(this._getCoordinates('center'));

                    // next item moves to the right
                    if (this.$nextItm) {

                        // left item moves out
                        this.$leftItm.addClass('dg-transition').css(this._getCoordinates('outleft'));

                        this.$nextItm.addClass('dg-transition').css(this._getCoordinates('right'));
                    }
                    else {
                        // left item moves right
                        this.$leftItm.addClass('dg-transition').css(this._getCoordinates('right'));
                    }
                    break;

                case 'prev' :
                    this.current = this.$leftItm.index();

                    // current item moves right
                    this.$currentItm.addClass('dg-transition').css(this._getCoordinates('right'));

                    // left item moves to the center
                    this.$leftItm.addClass('dg-transition').css(this._getCoordinates('center'));

                    // prev item moves to the left
                    if (this.$prevItm) {
                        // right item moves out
                        this.$rightItm.addClass('dg-transition').css(this._getCoordinates('outright'));
                        this.$prevItm.addClass('dg-transition').css(this._getCoordinates('left'));
                    }
                    else {
                        // right item moves left
                        this.$rightItm.addClass('dg-transition').css(this._getCoordinates('left'));
                    }
                    break;
            };

            this._setItems();

            if (!this.supportTrans){
                this.$currentItm.addClass('dg-center');
            }
        },
        // 开始幻灯片播放
        _startSlideshow: function () {
            var _self = this;

            this.slideshow = setTimeout(function () {
                _self._navigate('next');
                if (_self.options.autoplay) {
                    _self._startSlideshow();
                    _self._showDgfloat();
                }
            }, this.options.interval);
        },
        // 销毁事件
        destroy: function () {
            this.$navPrev.off('.gallery');
            this.$navNext.off('.gallery');
            this.$floatLayer.off('.gallery');
            this.$wrapper.off('.gallery');
        }
    };

    // 控制台输出错误信息
    var logError = function (message) {
        if (this.console) {
            console.error(message);
        }
    };

    // 插件定义
    $.fn.gallery = function (options) {
        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var instance = $.data(this, 'gallery');
                if (!instance) {
                    logError("cannot call methods on gallery prior to initialization; " +
                        "attempted to call method '" + options + "'");
                    return;
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    logError("no such method '" + options + "' for gallery instance");
                    return;
                }
                instance[ options ].apply(instance, args);
            });
        }
        else {
            this.each(function () {
                var instance = $.data(this, 'gallery');
                if (!instance) {
                    $.data(this, 'gallery', new $.Gallery(options, this));
                }
            });

        }
        return this;
    };

})(jQuery);