/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const jackrabbit = require('jackrabbit');
const Rx = require('rxjs/Rx');

function makeObservable(rabbit) {
  return Rx.Observable.create((observer) => {
    const exchange = rabbit.default();
    const events = exchange.queue({ name: 'myqueue', durable: true });

    events.consume((event, ack) => {
      console.log('receive event from queue', event);
      observer.next({ event, cb: ack });
    });
  });
}

module.exports = (config) => {
  console.info('config', config);
  const { queueUrl } = config;
  return () => new Promise((resolve, reject) => {
    try {
      const rabbit = jackrabbit(queueUrl);
      console.info(`Listening to queue events in host ${queueUrl}`);
      const observable = makeObservable(rabbit);
      resolve(observable);
    } catch (error) {
      reject(error);
    }
  });
};

