const http = require('http')

const {loadPlanetsData} = require('../src/models/planets.models')

const PORT = 8000;

const app = require('./app')

const server = http.createServer(app)

async function startServer()
{
    await loadPlanetsData()

    server.listen(PORT,() => {
        console.log(`Server listening on port ${PORT}`)
    })
}
startServer()
