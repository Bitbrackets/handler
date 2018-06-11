/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const APP = {
  dbUrl: process.env.DB_URL,
  queueUrl: process.env.QUEUE_URL,
  verbose: false,
  startBlockNumber: 0,
};

module.exports = APP;
