const jsonWebToken = require('jsonwebtoken');
const Logger = require('../services/logger');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Config = require('../config');

module.exports = (req, res, next) => {
    let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (req.method === 'OPTIONS')
        next();
    else if (req.headers.authorization) {
        jsonWebToken.verify(req.headers.authorization, Config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    status: 'ERROR',
                    error: 'AUTH_FAIL',
                    description: 'Authentication failed. Error in decoding auth-token.'
                });
                Logger.log.warn("JWT - Authentication failed. Error in decoding auth-token. ip:" + ipAddress);
            }
            else {
                User.findOne({_id: decoded._id})
                    .exec()
                    .then(user => {
                        if (user) {
                            req.user = user;
                            /*if (decoded.time < Date.now()) {
                                res.status(401).json({
                                    status: 'ERROR',
                                    error: 'AUTH_TIMEOUT',
                                    description: 'Auth-Token expired.'
                                });
                                Logger.log.info('AUTH - user id:' + user._id + ' token expired.');
                            }
                            else {
                                Logger.log.info('AUTH - user id:' + user._id +
                                    ' ip address:' + ipAddress);
                                next();
                            }*/
                            next();
                        }
                    })
                    .catch(err => {
                        Logger.log.error('DATABASE - ' + err);
                        res.status(500).json({
                            status: 'ERROR',
                            error: 'DATABASE_ERROR',
                            description: 'Error in database while retrieving user'
                        });
                    });
            }
        });
    }
    else {
        Logger.log.warn("JWT - Auth-Token not set in header ip:" + ipAddress);
        res.status(401).json({
            status: 'ERROR',
            error: 'AUTH_FAIL',
            description: 'Auth-Token not set in header.'
        });
    }
};