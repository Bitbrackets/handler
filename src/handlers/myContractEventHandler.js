/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
module.exports = (Repo) => {
  const dataRepo = Repo;
  return async (event) => {
    try {
      const { payload } = event.data;
      const {
        value1,
        value2
      } = payload;
      return await dataRepo.createData({
        value1,
        value2
      });
    } catch (error) {
      return error;
    }
  };
};
