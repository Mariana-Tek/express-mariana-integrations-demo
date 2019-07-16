# Mariana Web Integrations Demonstration

> an application for testing and demonstrating the mariana web integrations

## Setup

In order to run this application locally clone this repository and run the following commands in order from the root directory of the cloned repository.

1. `npm i`
2. `openssl genrsa -out localhost.key 2048`
3. `openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost`

[__source__: [Self-Signed, Trusted Certificates for Node.js & Express.js](https://www.kevinleary.net/self-signed-trusted-certificates-node-js-express-js/)]

## Development

Once you have followed the [setup](#setup) Instructions, run these commands to view and work on the demo site locally.

1. `npx nf start -j Procfile.serve`
2. browse to [https://localhost:5000/](https://localhost:5000/) or whatever port you have set up in your .env file.

### w/Local Web Integrations

If you would like to use this application to work on the [Mariana Integrations](https://github.com/Mariana-Tek/ember-mariana-integrations/) follow the instructions on the [web integrations](https://github.com/Mariana-Tek/ember-mariana-integrations/#running--development) to serve the project locally. Then instead of using the command `npx nf start -j Procfile.serve` use `npx nf start -j Procfile.serve.local`

### w/For Device Testing

If you would like to use this application to test on a device while serving the [Mariana Integrations](https://github.com/Mariana-Tek/ember-mariana-integrations/) locally. Then instead of using the command `npx nf start -j Procfile.serve` use `npx nf start -j Procfile.serve.ngrok`
