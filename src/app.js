const micromatch = require("micromatch");

function postNotification(req, res, settings, triggerControllers) {
  try { 
    const body = req.body;
    const {sensor, device, deviceid, sensorid, priority, message} = body;
    if (!sensor || !device || !deviceid || !sensorid || !priority || !message){
      return res.status(400).send("Bad Kahoko Notification Format");
    }
    triggerControllers.forEach(trigger => {
        const {sensorPat, devicePat, priority: trigPrior, includeHigher} = trigger.params;
        if (sensorPat && sensorid !== sensorPat && !micromatch.isMatch(sensor, sensorPat)) return;
        if (devicePat && deviceid !== devicePat && !micromatch.isMatch(device, devicePat)) return;
        if (trigPrior && trigPrior !== "Any"){
          if (!includeHigher && trigPrior != priority) return;
          if (parseInt(trigPrior) > priority) return;
        }
        trigger.execute(`${sensor} Notification - ${message}`, body);
    });
    res.status(200).send("OK");
  }
  catch (err){
      res.status(422).send(err.message);
  }
}

module.exports = { 
  postNotification
};