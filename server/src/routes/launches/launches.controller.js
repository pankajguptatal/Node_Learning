const {
  getAllLaunches,
  addNewLaunches,
  existLaunchByLaunchId,
  abortLaunch,
  initializeLaunches
} = require("../../models/launches.model");

initializeLaunches();
async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required field launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch Date",
    });
  }
  addNewLaunches(launch);
  return res.status(201).json(await getAllLaunches());
}

async function httpDeleteLaunch(req, res) {
  const launchId = +req.params.id;
  if (!await existLaunchByLaunchId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = await abortLaunch(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpDeleteLaunch,
};
