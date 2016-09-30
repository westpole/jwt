/**
 * @module client/form/controller
 *
 * @param   {Object}   $scope Angular scope object
 * @param   {Function} api    RESTful API constructor
 * @param   {Object}   info   application data storage
 *
 * @returns {Undefined}
 */
module.exports = function userHandler($scope, api, info) {
    $scope.token = info.token;
    $scope.message = {};

    const authApi = api('user');

    authApi.get({ token: info.token }, onSuccess, onError);

    /**
     * On successful user authorization
     *
     * @param   {Object}    data response
     *
     * @returns {Undefined}
     */
    function onSuccess(data) {
        $scope.user = data.data.varification.user;
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