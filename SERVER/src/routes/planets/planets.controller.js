const {getAllplanets} = require('../../models/planets.models')

function httpGetAllPlanets(req,res){
   return res.status(200).json(getAllplanets)
}

module.exports = {httpGetAllPlanets}
