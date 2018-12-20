module.exports = function (req, res, next) {
    res.locals.baseUrl = req.baseUrl;
    res.locals.endpoint = req.params.endpoint ? req.params.endpoint : 'mtdemostable-is7hfd';

    if (req.params.versionOrBranch) {
        if (req.params.versionOrBranch.split('.').length === 3) {
            res.locals.version = req.params.versionOrBranch;
        } else {
            res.locals.branch = req.params.versionOrBranch;
        }
    } else {
        res.locals.branch = req.params.branch ? req.params.branch : null;
        res.locals.version = req.params.version ? req.params.version : '*.*.*';
    }

    next();
};
