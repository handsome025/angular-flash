angular.module('ued').factory('uWeixin', function (uRequest) {
    var uWeixin = {}

    /**
     * 调试模式
     * @type {Boolean}
     */
    uWeixin.debug = false

    /**
     * 初始化微信配置
     * @param {Boolean} [isJSONP] 指定域名跨域请求,留空为同域请求
     */
    uWeixin.init = function (isJSONP) {
        uWeixin.call('hideOptionMenu')

        var def = $.Deferred()

        var url = '/weixin/index/get-jsapi-ticket'
        var req = null
        if (isJSONP) {
            req = uRequest.jsonp('http://weixinoauth.umaman.com/weixin/index/get-jssdk-info', {
                url: window.location.href.split("#")[0]
            })
        } else {
            req = uRequest.get(url)
        }
        req.then(function (res) {

            if (isJSONP) {
                uWeixin.config(res.result)

            } else {
                var result = res.result
                var appId = result.appid
                var jsapi_ticket = result.jsapi_ticket
                var timestamp = result.expire_time
                var nonceStr = uWeixin.getNonceStr()
                var url = window.location.href.split('#')[0]

                var signature = window.hex_sha1(
                    "jsapi_ticket=" + jsapi_ticket +
                    "&noncestr=" + nonceStr +
                    "&timestamp=" + timestamp +
                    "&url=" + url
                )

                var options = {
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature
                }
                uWeixin.config(options)
            }


            def.resolve()

        }, function () {
            console.error('services/Weixin.init() error.')
            def.reject()
        })

        return def.promise()
    }

    /**
     * 执行配置
     * @param {Object} options
     */
    uWeixin.config = function (options) {
        options.debug = uWeixin.debug

        options.jsApiList = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'translateVoice',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'closeWindow',
            'scanQRCode'
        ]

        wx.config(options)
    }

    /**
     * 老版API，调用微信JS接口
     * @param method method 方法名
     */
    uWeixin.call = function (method) {
        try {
            function onBridgeReady() {
                WeixinJSBridge.call(method);
            }

            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady();
            }
        } catch (e) {
        }
    }

    /**
     * 老版API，调用微信JS接口
     * @param method 方法名
     * @param data 参数
     * @param fn 回调
     */
    uWeixin.invoke = function (method, data, fn) {
        try {
            function onBridgeReady() {
                WeixinJSBridge.invoke(method, data, fn);
            }

            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady();
            }
        } catch (e) {
        }
    }

    /**
     * 配置微信分享
     *
     * @param {Object} appMessage 分享给好友
     *  title 分享标题
     *  desc 分享内容
     *  link 分享链接
     *  imgUrl 分享图标
     *  success 分享成功回调
     *  cancel 取消分享回调
     *
     * @param {Object} [timeline] 分享到朋友圈,留空则使用appMessage的配置
     *  title 分享标题
     *  link 分享链接
     *  imgUrl 分享图标
     *  success 分享成功回调
     *  cancel 取消分享回调
     */
    uWeixin.share = function (appMessage, timeline) {
        wx.ready(function () {
            wx.showOptionMenu()
            wx.onMenuShareAppMessage(appMessage)
            wx.onMenuShareTimeline(timeline || appMessage)
        })
    }

    /**
     * 获取nonceStr
     * @returns {string}
     */
    uWeixin.getNonceStr = function () {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        var str = ""
        var length = 16
        for (var i = 0; i < length; i++) {
            str += chars.substr(Math.floor(Math.random() * (chars.length - 1)), 1)
        }
        return str
    }

    /**
     * 获取微信共享收货地址
     * @param data 参数
     * @param callback 回调
     if (res.err_msg == "edit_address:ok") {
        province = res.proviceFirstStageName;//省
        city = res.addressCitySecondStageName;//市
        area = res.addressCountiesThirdStageName;//区
        userName = res.userName;//收货人
        zipcode = res.addressPostalCode;//邮编
        address = res.addressDetailInfo;//地址
        tel = res.telNumber;//手机或电话
     }
     */
    uWeixin.editAddress = function (data, callback) {
        uWeixin.invoke('editAddress', {
            appId: data.appId,
            scope: 'jsapi_address',
            signType: 'sha1',
            addrSign: data.addrSign,
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr
        }, callback);
    }

    /**
     * 发起微信支付
     * @param data
     * @param callback 回调
     *
     wx.chooseWXPay({
        timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: '', // 支付签名随机串，不长于 32 位
        package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: '', // 支付签名
        success: function (res) {
            // 支付成功后的回调函数
        }
    });
     */

    uWeixin.chooseWXpay = function (data, callback) {
        if (uRequest.isLocal()) {
            typeof callback === 'function' && callback({
                err_msg: 'get_brand_wcpay_request:ok'
            });
            return;
        }

        data.timestamp = data.timestamp || data.timeStamp;

        uWeixin.invoke('getBrandWCPayRequest', data, function (res) {
            typeof callback === 'function' && callback(res);
        });
    }

    return uWeixin
})
