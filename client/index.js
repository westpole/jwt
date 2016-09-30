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
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider
                .when('/', {
                    templateUrl: './client/form/template.html',
                    controller: 'formCtrl'
                })
                .when('/user', {
                    templateUrl: './client/user/template.html',
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
    require('./helpers/api'),
    require('./helpers/info'),
    require('./form/controller'),
    require('./user/controller')

);