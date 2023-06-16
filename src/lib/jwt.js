const jsonwebtoken = require('jsonwebtoken');

const sign = (payload, secret, options) => {
    const promise = new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, secret, options, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
    return promise;
};

const verify = (token, secret) => {
    const promise = new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, secret, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
    return promise;
};

const jwt = {
    sign,
    verify,
};

module.exports = jwt;