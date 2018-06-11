/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const initAppEnv = require('./env');

module.exports = (environment) => {
  const app = initAppEnv(environment);
  return {
    app,
  };
};
