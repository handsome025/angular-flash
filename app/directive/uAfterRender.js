/**
 * Created by user on 2016/9/21.
 */
angular.module('ued').directive('uAfterRender',function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                scope.$eval(attrs.ngBindHtml)
            }, function (value) {
                $timeout(function () {
                    scope.$eval(attrs.uAfterRender, {$element: element})
                })
            })
        }
    }
}
)
