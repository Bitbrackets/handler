/*
 * @author Douglas Molina <doug.molina@bitbrackets.io>
 * @author Guillermo Salazar <guillermo@bitbrackets.io>
 * @author Daniel Tutila <daniel@bitbrackets.io>
 */
const DataRepo = require('../data/dataRepo')({});

const myContractEventHandler = require('./myContractEventHandler');

const handlerDefinitionMap = new Map();

/** MyContract.sol */
handlerDefinitionMap.set('MyContractEvent', myContractEventHandler(DataRepo));

module.exports = handlerDefinitionMap;
