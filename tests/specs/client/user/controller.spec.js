const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

describe('User module: controller', () => {
    let $controller;
    let api;
    let $scope;
    let $httpBackend;
    let authRequestHandler;
    let info = {
        token: '1234234'
    };

    const eventMock = {
        preventDefault() {}
    };

    beforeEach(angular.mock.module('formApp'));

    beforeEach(inject((_$controller_, _api_, $rootScope, _$httpBackend_) => {
        $controller = _$controller_;
        api = _api_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
    }));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

        info = {
            token: '1234234'
        };
    });

    describe('Get user data', () => {
        it('should use GET method to retrieve user data', () => {
            $httpBackend
                .when('GET', `http://localhost:8081/api/user?token=${info.token}`)
                .respond(function(method, url, data, headers, params) {
                    expect(method).to.equal('GET');
                    expect(params).to.deep.equal(info);

                    return [ 200, { data: { varification: { user: 'truck' } } } ];
                });

            $controller('userCtrl', { $scope, api, info });

            $httpBackend.flush();
        });

        it('should set user data on successful response', () => {
            $httpBackend
                .when('GET', `http://localhost:8081/api/user?token=${info.token}`)
                .respond(200, { data: { varification: { user: 'truck' } } } );

            $controller('userCtrl', { $scope, api, info });

            $httpBackend.flush();

            expect($scope.user).to.equal('truck');
        });

        it('should display message on failed response', () => {
            $httpBackend
                .when('GET', `http://localhost:8081/api/user?token=${info.token}`)
                .respond(401, { status: 'error', message: 'test' } );

            $controller('userCtrl', { $scope, api, info });

            $httpBackend.flush();

            expect($scope.message).to.deep.equal({
                title: '401: error',
                content: 'test'
            });
        });
    });
});