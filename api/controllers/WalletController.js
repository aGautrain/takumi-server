/**
 * WalletController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

// if we fetched wallet content 5 minutes ago or more, we will refresh stored data
const WALLET_CACHE_MAX_DELAY = 5 * 60;

const getBalance = async(endpoint) => {
  return axios
      .get(endpoint)
      .then(async res => {
        if (res?.data?.status === '1') {
          return convertWUnitToUnit(parseInt(res.data.result, 10));
        } else return 0;
      });
};

const getEtherBalance = async(address) => {
  return await getBalance(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${sails.config.apiKeys.etherscan}`)
};

const getAvaxBalance = async(address) => {
  return await getBalance(`https://api.snowtrace.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${sails.config.apiKeys.snowtrace}`)
};

const getFantomBalance = async(address) => {
  return await getBalance(`https://api.ftmscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=${sails.config.apiKeys.ftmscan}`)
};

const getBinanceBalance = async(address) => {
  return await getBalance(`https://api.bscscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=${sails.config.apiKeys.bscscan}`)
};

const getPolygonBalance = async(address) => {
  return await getBalance(`https://api.polygonscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=${sails.config.apiKeys.polygon}`)
};

const convertWUnitToUnit = (w) => {
  return w / 1000000000000000000;
};

module.exports = {


  getWallet: async function(req, res) {

    const address = req.param('address');
    sails.log.info(address);

    if (!address) sails.log.error('cannot return wallet without an address');

    let cachedWallet = await Wallet.findOne({ address });

    if (cachedWallet) {

        const latestDateWeFetchedWallet = new Date(cachedWallet.timestamp);

        const delay = Date.now() / 1000 - latestDateWeFetchedWallet.getTime() / 1000;

        sails.log.info('Fetched wallet with address ' + address + ' ' + Math.round(delay) + ' seconds ago');

        if (delay < WALLET_CACHE_MAX_DELAY) {

            await Wallet.updateOne({ address }).set({ totalSearchFromCache: cachedWallet.totalSearchFromCache + 1 });

            cachedWallet = { ...cachedWallet, totalSearchFromCache: cachedWallet.totalSearchFromCache + 1 };
            sails.log.info('Returning cached wallet', cachedWallet);

            return res.json(cachedWallet);
        }
    }



    sails.log.info('Trying to fetch wallet combining multiple APIs');

    const ETH = await getEtherBalance(address).catch(() => 0);
    const FTM = await getFantomBalance(address).catch(() => 0);
    const AVAX = await getAvaxBalance(address).catch(() => 0);
    const BNB = await getBinanceBalance(address).catch(() => 0);
    const MATIC = await getPolygonBalance(address).catch(() => 0);

    if (cachedWallet) {
      sails.log.info('updating wallet');
      await Wallet.update({ address }).set({
        ETH, FTM, AVAX, BNB, MATIC,
        totalSearch: cachedWallet.totalSearch + 1,
        timestamp: Date.now()
      });
    } else {
      const walletToStore = {
        address,
        ETH,
        FTM,
        AVAX,
        BNB,
        MATIC,
        totalSearch: 1,
        totalSearchFromCache: 0,
        timestamp: Date.now()
      };

      sails.log.info('creating wallet');
      await Wallet.create(walletToStore);
    }


    const walletUpdatedOrCreated = await Wallet.findOne({ address });
    sails.log.info(walletUpdatedOrCreated);

    return res.json(walletUpdatedOrCreated);
/*
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

            await Wallet.create(gasToStore);

            // sails.log.info('Returning latest gas', gasToStore);


            return res.json(gasToStore);
        })
        .catch(error => {
            sails.log.error(error);
            sails.log.error('Error fetching wallet with address', address);
            return res.badRequest();
        });*/

  },

};
