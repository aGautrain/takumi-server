/**
 * Price.js
 *
 * @description :: Price represents a snapshot of a Cryptocurrency price
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
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

    circulating_supply: {
      type: 'number'
    },

    cmc_rank: {
      type: 'number'
    },

    last_updated: {
      type: 'string'
    },

    max_supply: {
      type: 'number'
    },

    // price infos

    fully_diluted_market_cap: {
      type: 'number'
    },

    market_cap: {
      type: 'number'
    },

    market_cap_dominance: {
      type: 'number'
    },

    percent_change_1h: {
      type: 'number'
    },

    percent_change_7d: {
      type: 'number'
    },

    percent_change_24h: {
      type: 'number'
    },

    percent_change_30d: {
      type: 'number'
    },

    percent_change_60d: {
      type: 'number'
    },

    percent_change_90d: {
      type: 'number'
    },

    price: {
      type: 'number'
    },

    volume_24h: {
      type: 'number'
    },

    volume_change_24h: {
      type: 'number'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    crypto: {
      model: 'Cryptocurrency'
    },

  },

};

