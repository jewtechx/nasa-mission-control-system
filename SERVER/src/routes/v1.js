const express = require('express')

const {planetsRouter} = require('./planets/planets.router')
const {launchesRouter} = require('./launches/launches.router')

const v1Api = express.Router()

v1Api.use('/planets', planetsRouter)
v1Api.use('/launches', launchesRouter)

module.exports = v1Api