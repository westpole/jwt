/**
 * @module client/form/controller
 *
 * @param   {Object}   $scope Angular scope object
 * @param   {Object}   api    Angular location object
 * @param   {Function} api    RESTful API constructor
 * @param   {Object}   info   application data storage
 *
 * @returns {Undefined}
 */
module.exports = function formCtrl($scope, $location, api, info) {
    $scope.form = {};
    $scope.message = {};

    const authApi = api('auth');

    /**
     * Sign user in the application
     *
     * @param   {Object}    event Angular element event object
     *
     * @returns {Undefined}
     */
    $scope.auth = function (event) {
        event.preventDefault();

        $scope.message = {};

        authApi.save({}, $scope.form, onSuccess, onError);
    };

    /**
     * On successful user authorization
     *
     * @param   {Object}    data response
     *
     * @returns {Undefined}
     */
    function onSuccess(data) {
        info.token = data.token;

        $location.path('/user');
    }

    /**
     * On failed user authorization
     *
     * @param   {Object}    error response
     *
     * @returns {Undefined}
     */
    function onError(error) {
        displayMessage(`${error.status}: ${error.data.status}`, error.data.message);
    }

    /**
     * Update message scope
     *
     * @param   {String}    title
     * @param   {String}    content
     *
     * @returns {Undefined}
     */
    function displayMessage(title, content) {
        $scope.message.title = title;
        $scope.message.content = content;
    }
};