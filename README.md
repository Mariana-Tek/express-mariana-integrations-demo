# Mariana Web Integrations Demonstration

> an application for testing and demonstrating the Mariana Web Integrations, V3

## About

This application acts as our demo site for Mariana Web Integrations, V3. Think of this site as a representation of how integrators can integrate Web Integration into their website.

This application is also an essential part of developing and testing the Web Integrations locally and is intended to run alongside [Mariana Web Integrations, V3](https://github.com/Mariana-Tek/ember-mariana-integrations/). The Web Integrations application generates a CSS and JS file that is referenced in this project. **Both applications must be configured properly and must run at the same time to develop locally.**

## Setup

First, Clone this repository.

Next, create SSL certificates, `localhost.key` and `localhost.cert`, in the root directory of this project. If you don't have a preferred method of doing this, I highly recommend following the process defined here: [Configure local, self-signed SSL certificates](https://marianatek.atlassian.net/wiki/spaces/EN/pages/493944834/Configure+local+self-signed+SSL+certificates). Another option is to run the following commands, assuming you have `openssl` installed on your computer:

```bash
$ openssl genrsa -out localhost.key 2048
$ openssl req -new -x509 -key localhost.key -out localhost.cert -days 3650 -subj /CN=localhost`
```

[__source__: [Self-Signed, Trusted Certificates for Node.js & Express.js](https://www.kevinleary.net/self-signed-trusted-certificates-node-js-express-js/)]

Finally, install the node dependancies: `npm i`.

## Running the Application

### w/Local Web Integrations

To use this application to work on the [Mariana Integrations, V3](https://github.com/Mariana-Tek/ember-mariana-integrations/), [follow the instructions here](https://github.com/Mariana-Tek/ember-mariana-integrations/#running--development) to serve the project locally. **This is required.**

Next, clone `.env.example` and create `.env`:

```bash
$ cp .env.example .env
```

Then, configure `.env` with the endpoint you want to access. There are two possible settings to achieve this: `MARIANA_ENDPOINT` and `MARIANA_API_HOST`. **Either use one or the other.**

If you are accessing an existing tenant on marianatek.com, like `https://cousteau-r45kxk.marianatek.com`, set `MARIANA_ENDPOINT` to the intended tenant: `MARIANA_ENDPOINT=cousteau-r45kxk`.

If you are access our api from a URL that is not on marianatek.com, like if you're testing a local API or a review application hosted on heroku, set `MARIANA_API_HOST` to the origin of the api: `MARIANA_API_HOST=http://localhost:5000`.

Then run the following command:

```bash
$ npx nf start -j Procfile.serve.local
```

Note: This application checks both `MARIANA_API_HOST` and the value of `NODE_ENV` to determine if the app should run over https or http. Be sure that `NODE_ENV` is set to `development` and `MARIANA_API_HOST` has a value that doesn't include `https` to run this app unsecurely.

### With the Production CSS & JS

Run the following command to view the demo site with the CSS and JS in production:

```bash
$ npx nf start -j Procfile.serve
```

Then, browse to [https://localhost:5000/](https://localhost:5000/) or whatever port you have set up in your .env file.

### w/For Device Testing

If you would like to use this application to test on a device while serving the [Mariana Integrations](https://github.com/Mariana-Tek/ember-mariana-integrations/) locally. Then instead of using the command `npx nf start -j Procfile.serve` use `npx nf start -j Procfile.serve.ngrok`
