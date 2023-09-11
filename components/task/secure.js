const auth = require('../../auth/index');

module.exports = function checkAth(action) {

    function middleware(req, res, next) {
        let owner;
        switch (action) {
            case 'list':
                owner = req.query.user;
                auth.check.own(req, owner);
                next();
                break;
            case 'create':
                owner = req.body.user;
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