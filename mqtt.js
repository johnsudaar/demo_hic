const mosca = require('mosca')
const Influx = require('influx')
const URL = require('url').URL

const port = parseInt(process.env.PORT || "3000")
const influxURL = new URL(process.env.INFLUX_URL || "influxdb://hic:hic@172.17.0.1:8086/test")

// Build the InfluxDB client based on the INFLUX_URL given in the process environment.
//
// The URL has the following form:
// influxdb://username:password@host:port/database_name
const influxClient = new Influx.InfluxDB({
  host: influxURL.hostname,
  port: influxURL.port,
  username: influxURL.username,
  password: influxURL.password,
  database: influxURL.pathname.substr(1), // pathname will contain: /database_name, we just want database_name, so remove the first char
})

let settings = {
  port: port,
  persistence: {
    // Here we're using in-memory presistency.
    // A real app should use a different backend if it needs a cluster, see:
    // https://github.com/mcollina/mosca/wiki#does-it-scale
    factory: mosca.persistence.Memory,
  }
}

const server = new mosca.Server(settings);
server.on('published', (packet, client) => {
  // When we receive a new packet
  const value = parseFloat(packet.payload.toString())

  // It it's a float
  if(!isNaN(value)){
    // Write it
    influxClient.writePoints([
      {
        measurement: "hic_demo",
        tags: { source: "MQTT" },
        fields: { value: value },
      }
    ])
    console.log(`Value: ${value} saved`)
  }

})
