angular.module('ued')
    .run(function (uConfig) {
        angular.extend(uConfig, {
            name: 'demo'
        })
    })