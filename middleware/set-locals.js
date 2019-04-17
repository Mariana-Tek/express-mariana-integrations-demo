const setEndpoint = endpointArg => {
    const marianaEndpoint = process.env.MARIANA_ENDPOINT;
    const marianaEndpointExists = !!marianaEndpoint;

    return marianaEndpointExists ? marianaEndpoint : (endpointArg || 'mtdemostable-is7hfd');
};

module.exports = function (req, res, next) {
    res.locals.baseUrl = req.baseUrl;
    res.locals.endpoint = setEndpoint(req.params.endpoint);

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
