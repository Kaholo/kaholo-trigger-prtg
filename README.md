# kaholo-trigger-prtg
Kaholo trigger for integeration with PRTG HTTP Notifications(Webhook).

## How to use:
After installing the plugin on Kaholo,
on the PRTG website, go to Setup -> Notification Templates -> Add new notification template
On the notification template menu add an 'Execute HTTP Action' Action.
In the URL field enter the URL of the Kaholo Webhook. 
In Payload you must include thid fields: comments=%comments&device=%device&deviceid=%deviceid&name=%name&message=%message&priority=%priority&sensor=%sensor&sensorid=%sensorid
You can also add new fields in the format of `&Field-Name=%Field-Placeholder`.
You can see more on notifactions in [here](https://www.paessler.com/manuals/prtg/notifications)

## PRTG HTTP Notification:
Triggers whenever PRTG sends an HTTP notification to the method's Webhook.

### Webhook URL:
**POST {KAHOLO_URL}/webhook/prtg/notification**

### Parameters:
1. Sensor Pattern (String) **Optional** - The sensor's ID or name or name [micromatch pattern](https://github.com/micromatch/micromatch#micromatch----).
2. Device Pattern (String) **Optional** - The decice's ID or name or name [micromatch pattern](https://github.com/micromatch/micromatch#micromatch----).
3. Priority (Options) **Optional** - The priority of notifications to accept. If specified accept only notifiactions with matching priority. Possible Values are Any/1-5. 5 Is the highest priority and 1 is the lowest. Default Value is Any.
4. Include Higher Priority (Boolean) **Optional** - If true, accept also any notification with a higher priority than the priority specified. If false accept notifications only with exactly the same priority. Default value is false.
