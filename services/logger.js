const log4js = require('log4js');
const morgan = require('morgan');
let log = log4js.getLogger();
log.level = 'all';
let morganInstance = morgan('dev', {
    stream: {
        write: (str) => {
            log.debug(str)
        }
    }
});
module.exports = {
    log: log,
    morgan: morganInstance
};