var routes = [
    'index'
]

angular.module('ued').config(function ($routeProvider) {
    routes.forEach(function (name) {
        $routeProvider.when('/' + name, {
            controller: name,
            controllerAs: name,
            templateUrl: 'page/' + name + '/' + name + '.html'
        })
    })

    $routeProvider.otherwise({
        redirectTo: '/index'
    })
})
