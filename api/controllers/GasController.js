/**
 * GasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

const symbolConverterForOwlracle = {
    FTM: 'ftm',
    MATIC: 'poly',
    AVAX: 'avax',
    ETH: 'eth',
    BNB: 'bsc',
};

// if we fetched gas from owlracle more than 15 minutes ago, we will refresh stored data
const GAS_CACHE_MAX_DELAY = 15 * 60;

module.exports = {

    getGas: async function (req, res) {

        const symbol = req.param('symbol');
        const owlracleSymbol = symbolConverterForOwlracle[symbol];
        sails.log.info(owlracleSymbol);

        if (!owlracleSymbol) sails.log.error('unsupported symbol, cannot return gas');

        const apiEndpoint = 'https://owlracle.info/' + owlracleSymbol + '/gas';

        const cachedGas = await Gas.findOne({ symbol });

        if (cachedGas) {
            sails.log.info(cachedGas);

            const latestDateWeFetchedGas = new Date(cachedGas.timestamp);

            const delay = Date.now() / 1000 - latestDateWeFetchedGas.getTime() / 1000;

            sails.log.info('Fetched gas for ' + symbol + ' ' + Math.round(delay) + ' seconds ago');

            if (delay < GAS_CACHE_MAX_DELAY) {
                sails.log.info('Returning cached gas', cachedGas);
                return res.json(cachedGas);
            }
        }

        sails.log.info('Trying to fetch gas from Owlracle API');
        return axios
            .get(apiEndpoint, { params: { apikey: '' } })
            .then(async owlracleResponse => {
                if (owlracleResponse?.data) {
                  // sails.log.info(owlracleResponse.data);
                } else return res.badRequest();

                const gasToStore = {
                    ...owlracleResponse.data,
                    symbol
                };

                await Gas.create(gasToStore);

                // sails.log.info('Returning latest gas', gasToStore);


                return res.json(gasToStore);
            })
            .catch(error => {
                sails.log.error(error);
                sails.log.error('Error fetching gas for symbol', symbol);
                return res.badRequest();
            });
    }


};
