# express mariana bindings demo

> an application for testing and demonstarting mariana web components

## Instructions

_from root directory_

1. `npm i`
* `openssl genrsa -out localhost.key 2048`
* `openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost`
* `npm run serve`
* browse to [http://localhost:3000/](http://localhost:3000/)

### Notes:

* [https://www.kevinleary.net/self-signed-trusted-certificates-node-js-express-js/](Self-Signed, Trusted Certificates for Node.js & Express.js)
