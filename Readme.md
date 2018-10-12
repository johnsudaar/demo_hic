# Hacking Industry Camp 2018 - Node.js/InfluxDB/Mosca boilerplate

This boilerplate is here to help you bootstrap a minimal project using Node.JS/Express, InfluxDB and Mosca to store and retrieve time based measurements.

## What does this boilerplate do?

It provide an HTTP server that have two endpoint:

`GET /`: List all points saved

`POST /?value=<number>`: Save `<number>` in a time series database (here InfluxDB)

The HTTP server source can be found in the `app.js` file.


It also provide a MQTT server that will store any number sent to him in this time series database.

The MQTT server source can be found in the `mqtt.js` file.

## Running it locally

To run it locally, install the project dependencies by launching:

```bash
yarn install
```

Once started, you can start the HTTP server by running:

```bash
PORT=3001 INFLUX_URL=REPLACE_ME yarn run start
```

And the MQTT server by running:

```bash
PORT=3002 INFLUX_URL=REPLACE_ME yarn run mqtt
```

Replace `REPLACE_ME` string with a valid URL pointing to an InfluxDB server.

## Deploying it on Scalingo

To deploy it on Scalingo, run the following commands:

```bash
scalingo create MY_APP                  # Create a new app on Scalingo
scalingo addons-add influxdb free       # Add the Influx addon
scalingo addons-add tcp-gateway tcplb   # Add the TCP Gateway addon (needed for MQTT)

git push scalingo master

scalingo scale tcp:1                    # Start the TCP container (the web one is started automatically)
```

