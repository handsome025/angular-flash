angular.module('ued').filter('uHtml', function ($sce) {
    return function (source) {
        return $sce.trustAsHtml(source)
    }
})