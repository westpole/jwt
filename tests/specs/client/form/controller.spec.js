const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

describe('Form module: controller', () => {
    let $controller;
    let controller;
    let api;
    let $scope;
    let $httpBackend;
    let authRequestHandler;
    let redirectPath;

    const $location = {
        path(path) {
            redirectPath = path;
        }
    };
    let info = {};

    const eventMock = {
        preventDefault() {}
    };

    beforeEach(angular.mock.module('formApp'));

    beforeEach(inject((_$controller_, _api_, $rootScope, _$httpBackend_) => {
        $controller = _$controller_;
        api = _api_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;

        authRequestHandler = $httpBackend.when('POST', 'http://localhost:8081/api/auth');

        controller = $controller('formCtrl', { $scope, $location, _api_, info });
    }));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

        info = {};
    });

    describe('Authentication', () => {
        it('should use POST method to authenticate user with provided credentials', () => {
            $scope.form = {
                test: 1
            };

            authRequestHandler.respond(function(method, url, data, headers, params) {
                expect(method).to.equal('POST');
                expect(data).to.equal(JSON.stringify($scope.form));

                return data;
            })

            $scope.auth(eventMock);

            $httpBackend.flush();
        });

        it('should save token on successful response', () => {
            $scope.form = {
                test: 1
            };

            const respMock = { token: 'frwerawer' };

            authRequestHandler.respond(200, respMock);

            $scope.auth(eventMock);

            $httpBackend.flush();

            expect(info.token).to.equal('frwerawer');
        });

        it('should display message if response failed', () => {
            $scope.form = {
                test: 1
            };

            const respMock = { status: 'error', message: 'test' };

            authRequestHandler.respond(404, respMock);

            $scope.auth(eventMock);

            $httpBackend.flush();

            expect(info.token).not.to.be.defined;
            expect($scope.message).to.deep.equal({
                title: '404: error',
                content: 'test'
            });
        });
    });
});