const camelCase = require('lodash.camelcase');
const reqProm = require('request-promise-native');
const sortBy = require('lodash.sortby');

module.exports = function (req, res, next) {
    const marianaApiHost = process.env.MARIANA_API_HOST || '';
    const marianaApiHostExists = !!marianaApiHost && marianaApiHost !== undefined;

    const setUriForRequests = path => (
        marianaApiHostExists ?
            `${marianaApiHost}/api/${path}` :
            `https://${res.locals.endpoint}.marianatek.com/api/${path}`
    );

    const reqOptions = (path) => {
        return {
            uri: setUriForRequests(path),
            headers: {
                Accept: 'application/vnd.api+json'
            },
            json: true
        };
    };

    const reqImage = (id, relationship) => {
        return reqProm(reqOptions(`public_images/${id}`))
            .then(response => {
                res.locals[relationship] = response.data.attributes.image;
            })
            .catch(error => {
                console.error(error);
            });
    };

    const reqLocations = reqProm(reqOptions('locations?page_size=100'))
        .then(response => {
            const locationsInfo = response.data.map(location => {
                return {
                    locationId: location.id,
                    name: location.attributes.name,
                    regionId: location.relationships.region.data.id
                };
            });

            res.locals.locations = sortBy(locationsInfo, ['name']);
        })
        .catch(error => {
            console.error(error);
        });

    const reqTenant = reqProm(reqOptions('tenants'))
        .then(response => {
            res.locals.siteTitle = response.data[0].attributes.name;
        })
        .catch(error => {
            res.locals.siteTitle = '';
            console.error(error);
        });

    const reqTenantBrand = reqProm(reqOptions('tenant_brands'))
        .then(response => {
            return response.data[0].relationships;
        })
        .catch(error => {
            console.error(error);
            return [];
        });

    Promise.all([reqTenantBrand, reqTenant, reqLocations])
        .then((results) => {
            // after tenant brand information is returned retrieve tenant brand assets

            const relationships = results[0];

            const relationshipPromises = Object.keys(relationships).map(relationship => {
                return reqImage(relationships[relationship].data.id, camelCase(relationship));
            });

            return Promise.all(relationshipPromises);
        })
        .then(() => {
            next();
        });
};
