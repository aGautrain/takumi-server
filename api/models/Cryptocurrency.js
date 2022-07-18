/**
 * Cryptocurrency.js
 *
 * @description :: Cryptocurrency informations and relations (includes Gas and Prices)
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

/*
  This model will be a merged from :
  https://pro-api.coinmarketcap.com/v2/cryptocurrency/info
  https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest
  => this will be stored in a distinct model: Price
*/

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    id: {
      type: 'number',
      unique: true,
      required: true
    },

    // coin, token, etc.
    category: {
      type: 'string'
    },

    date_added: {
      type: 'string'
    },

    date_launched: {
      type: 'string'
    },

    description: {
      type: 'string'
    },

    is_hidden: {
      type: 'number'
    },

    logo: {
      type: 'string'
    },

    name: {
      type: 'string'
    },

    notice: {
      type: 'string'
    },

    slug: {
      type: 'string'
    },

    status: {
      type: 'string'
    },

    self_reported_tags: {
      type: 'json'
    },

    symbol: {
      type: 'string'
    },

    tags: {
      type: 'json'
    },

    urls: {
      type: 'json'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    gas: {
      collection: 'Gas',
      via: 'crypto'
    },

    prices: {
      collection: 'Price',
      via: 'crypto'
    }

  },

};

