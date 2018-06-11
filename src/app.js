/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const mongoInit = require('./utils/mongoInit');

const environment = process.argv[2];

const CONF = require('./conf')(environment);

const startEventStreamService = require('./service/eventStreamService')(CONF.app);
const eventHandlerService = require('./service/eventHandlerService')();

async function init() {
  try {
    console.info(`Connecting to mongoDB ${CONF.app.dbUrl} ...`);
    mongoInit(CONF.app).then(async () => {
      console.info('Connected to MongoDB!');

      console.info('Start listening to events...');
      const eventStream = await startEventStreamService();

      eventStream.subscribe(async ({ event, cb }) => {
        console.info('Received New Event:', event);
        console.info('New Event Type:', event.eventType);
        console.info('Event Processing started...:');
        try {
          const res = await eventHandlerService(event);
          console.info(`Event ${event.eventType} Handled Success: `, res);
          cb();
        } catch (error) {
          console.error('Error Handling event : ', error);
        }
      });
    }).catch((error) => {
      console.error(error);
      process.exit(1);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

init();
