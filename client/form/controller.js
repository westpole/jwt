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

        api('auth')
            .save({}, $scope.form)
            .$promise
                .then((data) => {
                    info.token = data.token;

                    $location.path('/user');
                })
                .catch((error) => {
                    displayMessage(`${error.status}: ${error.data.status}`, error.data.message);
                });
    };

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