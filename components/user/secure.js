const auth = require('../../auth/index');

module.exports = function checkAth(action) {

    function middleware(req, res, next) {

        switch (action) {
            case 'update':
                const owner = req.params.id;
                auth.check.own(req, owner);
                next();
                break;
            case 'logged':
                auth.check.logged(req, res, next);
                next();
                break;
            default:
                next();
        }

    }


    return middleware;

}