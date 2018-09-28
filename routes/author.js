const Logger = require('../services/logger');

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Author = mongoose.model('author');

/* GET auther listing. */
router.get('/', function (req, res, next) {
    Author.find({})
        .exec()
        .then(authors => res.json(authors))
        .catch(err => {
            Logger.log.error('DATABASE ERROR');
            Logger.log.error(err);
            res.status(500).json({
                status: 'ERROR',
                error: 'DATABASE_ERROR',
                description: 'Error while Getting list of authors'
            });
        })
});

module.exports = router;
