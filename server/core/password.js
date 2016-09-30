const crypto = require('crypto');

const saltLength = 9;

function createHash(password) {
    const salt = generateSalt();

    return salt + md5(password + salt);
}

function validateHash(hash, password) {
    const salt = hash.substr(0, saltLength);
    const validHash = salt + md5(password + salt);

    return (hash === validHash);
}

function generateSalt() {
    const set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    const setLen = set.length;
    let salt = '';
    let i;

    for (i = 0; i < saltLength; i += 1) {
        const p = Math.floor(Math.random() * setLen);

        salt += set[p];
    }

    return salt;
}

function md5(string) {
    return crypto
        .createHash('md5')
        .update(string)
        .digest('hex');
}

module.exports = {
    hash: createHash,
    validate: validateHash
};