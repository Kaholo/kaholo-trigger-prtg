const micromatch = require("micromatch");

function postNotification(req, res, settings, triggerControllers) {
  try { 
    const body = req.body;
    const {sensor, device, deviceid, sensorid, priority, message} = body;
    if (!sensor || !device || !deviceid || !sensorid || !priority || !message){
      return res.status(400).send("Bad Kahoko Notification Format");
    }
    triggerControllers.forEach(trigger => {
        const {sensNamePat, sensId, devNamePat, 
               devId, priority: trigPrior, includeHigher} = trigger.params;
        if (devId && deviceid !== devId) return;
        if (!devId && sensNamePat && !micromatch.isMatch(sensor, sensNamePat)) return;
        if (sensId && sensorid !== sensId) return;
        if (!sensId && devNamePat && !micromatch.isMatch(device, devNamePat)) return;
        if (trigPrior && trigPrior !== any){
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