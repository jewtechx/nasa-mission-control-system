const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const launches = new Map();
let DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber:launchId
  })
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne({
    flightNumber:launchId
  },{
    upcoming:false,
    success:false,
  })
  return aborted.ok === 1 && aborted.nModified === 1
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
      .findOne()
      .sort('-flightNumber');
  
    if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
    }
  
    return latestLaunch.flightNumber;
  }
  
  async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });
  
    if (!planet) {
      throw new Error('No matching planet found');
    }
  
    const newFlightNumber = await getLatestFlightNumber() + 1;
  
    const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ['Zero to Mastery', 'NASA'],
      flightNumber: newFlightNumber,
    });
  
    await saveLaunch(newLaunch);
  }

async function getAllLaunches() {
  // Return the result of the database query using `await`
  return await launchesDatabase.find({}, {
    '__v': 0,
    '_id': 0,
  });
}

async function saveLaunch(launchData) {
    const planet = await planets.findOne({
      keplerName: launchData.target,
    });
  
    if (!planet) {
      throw new Error('No matching planet found');
    }
  
    await launchesDatabase.findOneAndUpdate(
      {
        flightNumber: launchData.flightNumber,
      },
      launchData,
      {
        upsert: true,
      }
    );
  }
  

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
