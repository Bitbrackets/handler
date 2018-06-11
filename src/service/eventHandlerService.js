/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const _ = require('lodash');
const handlerDefinitionMap = require('../handlers/');

function isNotValidEvent(event) {
  if (event === undefined) {
    return true;
  }
  if (!_.has(event, 'eventType')) {
    return true;
  }

  return false;
}

module.exports = (handlerDefinitions) => {
  const handlers = handlerDefinitions || handlerDefinitionMap;
  return async (event) => {
    if (isNotValidEvent(event)) {
      console.error('System Error: unexpected invalid event: ', event);
      return Promise.reject(new Error(`System Error: unexpected invalid event: ${JSON.stringify(event)}`));
    }
    const { eventType } = event;
    console.info(`Processing event: ${eventType}`);

    if (!handlers.has(eventType)) {
      return Promise.resolve({
        message: `Event type ${eventType} not found.`
      });
    }

    // TODO: check if event has been handler already with blockNumber or other timestamp
    const handler = handlers.get(eventType);
    try {
      const res = await handler(event);
      return Promise.resolve(res);
    } catch (error) {
      console.error('System Error: could not process event: ', event, ', Error', error);
      return Promise.reject(error);
    }
  };
};

