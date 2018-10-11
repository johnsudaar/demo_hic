const express = require('express')
const Influx = require('influx')
const URL = require('url').URL

const port = process.env.PORT || 3000
const influxURL = new URL(process.env.INFLUX_URL || "influxdb://hic:hic@172.17.0.1:8086/test")

const influxClient = new Influx.InfluxDB({
  host: influxURL.hostname,
  port: influxURL.port,
  username: influxURL.username,
  password: influxURL.password,
  database: influxURL.pathname.substr(1),
})

const app = express()

app.post('/', (req, res) => {
  const value = parseFloat(req.query.value || "10")
  influxClient.writePoints([
    {
      measurement: "hic_demo",
      tags: { source: "HTTP" },
      fields: { value: value },
    }
  ])
  res.send(`Value ${value} saved!`)
})

app.listen(port, () => console.log(`Listening on :${port}`))
