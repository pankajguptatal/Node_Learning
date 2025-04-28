const launchesDb = require("./launches.mongo");
const planets = require("./planets.mongo");

async function initializeLaunches() {
  const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  };
  await saveLaunch(launch);
}

async function existLaunchByLaunchId(launchId) {
  return await launchesDb.countDocuments({ flightNumber: launchId });
}

async function getAllLaunches() {
  return await launchesDb.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });
  if (!planet) {
    throw new Error("No matching planets was found");
  }
  await launchesDb.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function addNewLaunches(launch) {
  let latestFlightNumber = await getLatestFlightNumber();
  latestFlightNumber++;
  const newLaunch = Object.assign(launch, {
    customers: ["Zero to mastery", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: latestFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunch(launchId) {
  const abortedLaunch = await launchesDb.findOneAndUpdate(
    { flightNumber: launchId }, //filter
    {
      upcoming: false,
      success: false,
    }, //update the fields
    { new: true } //return the updated document
  );

  return abortedLaunch;
}

async function getLatestFlightNumber() {
  const latestlaunch = await launchesDb.findOne().sort("-flightNumber");
  if (!latestlaunch) {
    return 100; //If there is no flight
  }
  return latestlaunch.flightNumber;
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
  existLaunchByLaunchId,
  abortLaunch,
  initializeLaunches
};
