const reqProm = require('request-promise');

module.exports = function (req, res, next) {
    // https://cousteau-r45kxk.marianatek.com/api/tenants

    const reqOptions = (path) => {
        return {
            uri: `https://${res.locals.endpoint}.marianatek.com/api/${path}`,
            headers: {
                Accept: 'application/vnd.api+json'
            },
            json: true
        };
    };

    const reqTenant = reqProm(reqOptions('tenants'))
        .then(response => {
            res.locals.siteTitle = response.data[0].attributes.name;
        })
        .catch(error => {
            console.error(error);
        });

    const reqLocations = reqProm(reqOptions('locations?page_size=100'))
        .then(response => {
            const locationsInfo = response.data.map((location) => {
                return {
                    locationId: location.id,
                    name: location.attributes.name,
                    regionId: location.relationships.region.data.id
                };
            });

            res.locals.locations = locationsInfo;
        })
        .catch(error => {
            console.error(error);
        });

    Promise.all([reqTenant, reqLocations]).then(() => {
        next();
    });
};
