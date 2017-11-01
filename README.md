# express mariana bindings demo

> an application for testing and demonstarting mariana web components

## Setup

In order to run this application locally clone this repository and run the following commands in order from the root directory of the cloned repository.

1. `npm i`
* `openssl genrsa -out localhost.key 2048`
* `openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost`

[__source__: [Self-Signed, Trusted Certificates for Node.js & Express.js](https://www.kevinleary.net/self-signed-trusted-certificates-node-js-express-js/)]

## Development

Once you have followed the [setup](#setup) Instructions, run these commands to view and work on the demo site locally.

1. `npm run serve`
* browse to [http://localhost:3000/](http://localhost:3000/)

### w/Local Web Components

If you would like to use this application to work on the [Mariana web components](https://github.com/Mariana-Tek/mariana-web-binding-framework/) follow the instructions on the [web components repository](https://github.com/Mariana-Tek/mariana-web-binding-framework/#running--development) to serve the project locally. Then instead of using the command `npm run serve` use `npm run serve:local`
