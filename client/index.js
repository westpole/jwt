require('./assets/form.css');

(function (
    angular,
    ngRoute,
    ngResource,
    api,
    info,
    formCtrl,
    userCtrl
) {
    angular
        .module('formApp', [
            ngRoute,
            ngResource
        ])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: './client/app/form/template.html',
                    controller: 'formCtrl'
                })
                .when('/user', {
                    templateUrl: './client/app/user/template.html',
                    controller: 'userCtrl'
                })
                .otherwise('/');
        }])
        .factory('api', ['$resource', api])
        .service('info', info)
        .controller('formCtrl', ['$scope', '$location', 'api', 'info', formCtrl])
        .controller('userCtrl', ['$scope', 'api', 'info', userCtrl]);
})(
    require('angular'),
    require('angular-route'),
    require('angular-resource'),
    require('./app/helpers/api'),
    require('./app/helpers/info'),
    require('./app/form/controller'),
    require('./app/user/controller')
);