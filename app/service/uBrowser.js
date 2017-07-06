angular.module('ued').factory('uBrowser', function () {
    var uBrowser = {}

    /**
     * 是否微信
     * @returns {Boolean}
     */
    uBrowser.isWeixin = function () {
        return /MicroMessenger/i.test(navigator.userAgent)
    }

    /**
     * 是否安卓
     * @returns {Boolean}
     */
    uBrowser.isAndroid = function () {
        return /Android/i.test(navigator.userAgent)
    }

    /**
     * 是否苹果
     * @returns {boolean}
     */
    uBrowser.isIOS = function () {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent)
    }

    /**
     * 是否移动设备
     * @returns {boolean}
     */
    uBrowser.isMobile = function () {
        return /Android|BlackBerry|iPhone|iPad|iPod|IEMobile/i.test(navigator.userAgent)
    }

    /**
     * 监听设备旋转
     * @param {Function} callback (旋转角度, 是否横屏)
     */
    uBrowser.onOrientationChange = function (callback) {
        if (typeof callback === 'function') {
            window.removeEventListener('orientationchange', orientationchange)
            window.addEventListener('orientationchange', orientationchange)
        }
        
        function orientationchange() {
            var orientation = window.orientation
            if (orientation) {
                callback(orientation, Math.abs(orientation) === 90)
            }
        }
    }

    /**
     * 设置标题(hack在微信等webview中无法修改document.title的情况)
     * @param title
     */
    uBrowser.setTitle = function (title) {
        document.title = title

        if (uBrowser.isWeixin()) {
            var $iframe = $('<iframe style="display: none;" src="/favicon.ico"></iframe>')
                .on('load', function () {
                    setTimeout(function () {
                        $iframe.off('load').remove()
                    }, 0)
                })
                .appendTo('body')
        }
    }

    return uBrowser
})