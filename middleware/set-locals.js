module.exports = function (req, res, next) {
    res.locals.baseUrl = req.baseUrl;
    res.locals.endpoint = req.params.endpoint ? req.params.endpoint : 'cousteau-r45kxk';
    res.locals.version = req.params.version ? req.params.version : '*.*.*';

    next();
};
