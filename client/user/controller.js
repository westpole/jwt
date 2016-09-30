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

    api('user')
        .get({ token: info.token })
        .$promise
            .then((data) => {
                $scope.user = data.data.varification.user;
            })
            .catch((error) => {
                displayMessage(`${error.status}: ${error.data.status}`, error.data.message);
            });

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