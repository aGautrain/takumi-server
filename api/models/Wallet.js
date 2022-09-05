/**
 * Wallet.js
 *
 * @description :: Wallet allows us to memorize owned assets
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    address: {
      type: 'string',
      unique: true,
      required: true,
    },

    label: {
      type: 'string'
    },

    totalSearch: {
      type: 'number',
      defaultsTo: 0
    },

    totalSearchFromCache: {
      type: 'number',
      defaultsTo: 0
    },

    FTM: {
      type: 'number',
      defaultsTo: 0
    },

    MATIC: {
      type: 'number',
      defaultsTo: 0
    },

    AVAX: {
      type: 'number',
      defaultsTo: 0
    },

    ETH: {
      type: 'number',
      defaultsTo: 0
    },

    BNB: {
      type: 'number',
      defaultsTo: 0
    },

    timestamp: {
      type: 'number'
    },




    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};
