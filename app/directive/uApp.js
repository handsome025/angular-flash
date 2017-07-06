angular.module('ued').directive('uApp', function (uBaidu, uBrowser, uWeixin) {
    return {
        replace: true,
        templateUrl: 'component/uApp/uApp.html',
        link: function (scope, element, attrs) {
            FastClick.attach(document.body)

            scope.$on("$routeChangeStart", onRouteChangeStart)

            scope.$on("$viewContentLoaded", onViewContentLoaded)

            uBrowser.onOrientationChange(onOrientationChange)

            // uWeixin.init().then(onWeixinInit)
            
            function onRouteChangeStart(event, next, current) {
                if (next.$$route) {
                    scope.ctrlName = next.$$route.controllerAs

                    // uBaidu.trackPageView('/html/htamhb/' + window.location.hash)
                }

                $('body :not([ng-view],link,script)').remove()
            }

            function onViewContentLoaded() {
                uBrowser.setTitle('珍藏最好时光 记录长期陪伴')
            }

            function onWeixinInit() {
                uWeixin.share({
                    title: '',
                    desc: '',
                    link: '',
                    imgUrl: ''
                })
            }

            function onOrientationChange(deg, isLandscape) {
                // if (isLandscape) {
                //     $('body').addClass('landscape')
                // } else {
                //     $('body').removeClass('landscape')
                // }
            }
        }
    }
})
