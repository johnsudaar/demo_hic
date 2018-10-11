const mosca = require('mosca')
const Influx = require('influx')
const URL = require('url').URL

const port = parseInt(process.env.PORT || "3000")
const influxURL = new URL(process.env.INFLUX_URL || "influxdb://hic:hic@172.17.0.1:8086/test")

const influxClient = new Influx.InfluxDB({
  host: influxURL.hostname,
  port: influxURL.port,
  username: influxURL.username,
  password: influxURL.password,
  database: influxURL.pathname.substr(1),
})

let settings = {
  port: port,
  persistence: {
    factory: mosca.persistence.Memory,
  }
}

const server = new mosca.Server(settings);
server.on('published', (packet, client) => {
  const value = parseFloat(packet.payload.toString())
  if(!isNaN(value)){
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
