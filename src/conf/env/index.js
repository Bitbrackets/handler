/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
require('dotenv').config();
const defaultConf = require('./default');

module.exports = (environment) => {
  const currentEnv = {};

  if (typeof currentEnv === 'undefined') {
    throw new Error('Current environment is not defined.', environment);
  }

  return {
    dbUrl: currentEnv.dbUrl || defaultConf.dbUrl,
    queueUrl: currentEnv.queueUrl || defaultConf.queueUrl,
    verbose: currentEnv.verbose || defaultConf.verbose,
    startBlockNumber: currentEnv.startBlockNumber || defaultConf.startBlockNumber,
  };
};
