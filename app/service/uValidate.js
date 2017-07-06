angular.module('ued').factory('uValidate', function () {
    var uValidate = {}

    /**
     * 是否为空
     * @param value
     */
    uValidate.isEmpty = function (value) {
        return value == null || !String(value).trim()
    }

    /**
     * 是否为手机号码
     * @param value
     */
    uValidate.isPhoneNumber = function (value) {
        return /^\d{11}$/.test(value)
    }

    return uValidate
})
