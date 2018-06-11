/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
module.exports = (config) => {
  return {
    async createData(data) {
      console.log('Processing data...', data);
      //Do business logic.
      return true;
    }
  };
};
