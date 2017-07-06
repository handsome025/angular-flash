;(function () {
    var MsgBox = {};

    (function () {
        var css = {
            box: {
                'position': 'fixed',
                'left': 0,
                'top': 0,
                'width': '100%',
                'height': '100%',
                'z-index': 90000,
                'background': 'rgba(0,0,0,.5)'
            },
            table: {
                'border-spacing': 0,
                'border': 0,
                'width': '100%',
                'height': '100%'
            },

            content: {
                'position': 'relative',
                'margin': '0 auto',
                'width': '90%',
                'max-width': '576px',
                'background': '#fff',
                'border-radius': '5px',
                'overflow': 'hidden'
            },

            word: {
                'padding': '15px 7px',
                'font-size': '14px',
                'color': '#000',
                'text-align': 'center'
            },

            btns: {
                'border-top': '1px solid #ccc',
                'overflow': 'hidden',
                'color': '#333'
            },

            btn: {
                'font-size': '16px',
                'padding': '12px 0',
                'border': 0,
                'width': '50%',
                'background': 'none',
                'float': 'left',
                'border-right': '1px solid #ccc',
                'border-radius': 0
            },

            btn2: {
                'font-weight': 'bold',
                'border-right': 0
            }
        };

        var lastBox = $();

        function create(html, isConfirm, callback) {
            lastBox.remove();
            if (typeof callback !== 'function') {
                callback = $.noop;
            }
            var box = $('<div class="__message-box__">').css(css.box);
            var table = $('<table><tr><td style="vertical-align:middle;"></td></tr></table>').css(css.table);
            var content = $('<div>').css(css.content);
            var word = $('<div>').css(css.word);
            word.html(html);

            var btns = $('<div>').css(css.btns);
            var btn1;
            var btn2 = $('<button>').css(css.btn).css(css.btn2);

            if (isConfirm) {
                btn1 = $('<button>').css(css.btn);
                btn1.html('取消');
                btn1.one('click', function (e) {
                    box.remove();
                    callback(false);
                    return false;
                });
                btns.append(btn1);
            } else {
                btn2.css('width', '100%');
            }

            btn2.html('确定');
            btn2.one('click', function (e) {
                box.remove();
                callback(true);
                return false;
            });

            btns.append(btn2);
            content.append(word);
            content.append(btns);
            table.find('td').append(content);
            box.append(table);
            $('body').append(box);

            lastBox = box;
        }

        MsgBox.alert = function (text, callback) {
            create(text, false, callback);
        };

        MsgBox.confirm = function (text, callback) {
            create(text, true, callback);
        };

        MsgBox.close = function () {
            lastBox.remove();
        };
    })()


    var Site = {};

    Site.onAlways = function () {
        Site.loading(false)
    }

    Site.onError = function (res) {
        Site.loading(false);
        Site.alert(res.errorMsg);
    };

    /**
     * @function 显示隐藏loading
     * @param isVisible 是否显示
     */
    Site.loading = function (isVisible) {
        var selector = '.loading';
        if (0 == $(selector).size()) {
            $('body').append('<div class="loading loading-overlay loading-hide"></div>');
        }
        if (isVisible) {
            $(selector).show();
        } else {
            $(selector).hide();
        }
    };

    /**
     * @function 显示隐藏pop
     * @param selector 选择器
     * @param isVisible 是否显示
     * @description 关闭弹层，将自动触发该元素的close事件，外部可监听
     */
    Site.popup = function (selector, isVisible) {
        if (arguments.length === 1) {
            isVisible = true;
        }
        if (isVisible) {
            $(selector).show()
                .find('.close')
                .off('click', onClose)
                .on('click', onClose);
        } else {
            onClose();
        }

        function onClose() {
            $(selector).hide().trigger('close');
            return false;
        }
    };

    /**
     * @function 弹出alert
     * @param text 文本消息
     * @param callback 回调函数
     */
    Site.alert = function (text, callback) {
        MsgBox.alert(text, callback);
    };

    /**
     * @function 弹出confirm
     * @param text 文本消息
     * @param callback 回调函数
     */
    Site.confirm = function (text, callback) {
        MsgBox.confirm(text, callback);
    };

    /**
     * 手动关闭alert 或者 confirm
     */
    Site.closeMsg = function () {
        MsgBox.close();
    };

    /**
     * 滚动到底部
     * @param callback
     */
    Site.loadMore = function (callback) {
        $(window).on('scroll', function () {
            // 滚到距离底部30px，就继续加载
            if ($(window).height() + $(document).scrollTop() > $(document).height() - 30) {
                callback();
            }
        });
    };

    /**
     DIV元素滚动到底部
     * @param callback
     */
    Site.loadMoreElement = function (e,callback) {
        $(e).on('scroll', function () {
            // 滚到距离底部30px，就继续加载
            if ($(e).height() + $(e).scrollTop() > $(e).children().height() - 30) {
                callback();
            }
        });
    };
    
    Site.removeLoadMore = function () {
        $(window).off('scroll')
    }

    window.Site = Site

})()