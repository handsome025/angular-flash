angular.module('ued').factory('uBaidu', function () {
    var uBaidu = {}

    /**
     * 事件统计
     * @param {String} message
     * @param {String} [eventName='click']
     */
    uBaidu.trackEvent = function (message, eventName) {
        if (window._hmt) {
            _hmt.push(['_trackEvent', message, eventName || 'click', message])
        }
    }

    /**
     * 页面统计
     * @param {String} uri
     */
    uBaidu.trackPageView = function (uri) {
        if (window._hmt) {
            _hmt.push(['_trackPageview', uri])
        }
    }

    return uBaidu
})