/**
 * @module client/helpers/api
 *
 * @param   {Function} $resource
 *
 * @returns {Function}           RESTful API constructor
 */
module.exports = function api($resource) {
    /**
     * Generate RESTful API based on provided end point
     *
     * @param   {String} path end point to the source
     *
     * @returns {Object}      API interface
     */
    return function (path) {
        return $resource(
            `http://localhost\\:8081/api/${path}`
        );
    };
};