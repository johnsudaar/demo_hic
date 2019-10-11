# Hacking Industry Camp 2019 - Node.js/InfluxDB/Mosca boilerplate

This boilerplate is here to help you bootstrap a minimal project using Node.JS/Express, InfluxDB and Mosca to store and retrieve time based measurements.

## What does this boilerplate do?

It provide an HTTP server that have two endpoint:

`GET /`: List all points saved

`POST /?value=<number>`: Save `<number>` in a time series database (here InfluxDB)

The HTTP server source can be found in the `app.js` file.


## Running it locally

To run it locally, install the project dependencies by launching:

```bash
yarn install
```

Once started, you can start the HTTP server by running:

```bash
PORT=3001 INFLUX_URL=REPLACE_ME yarn run start
```

Replace `REPLACE_ME` string with a valid URL pointing to an InfluxDB server.

## Deploying it on Scalingo

To deploy it on Scalingo, run the following commands:

```bash
scalingo create MY_APP                  # Create a new app on Scalingo
scalingo addons-add influxdb free       # Add the Influx addon

git push scalingo master
```

