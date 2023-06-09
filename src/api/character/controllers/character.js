'use strict';

/**
 * character controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::character.character', ({ strapi }) => ({
  async generateCharacter(ctx) {
    try {
      const character = await strapi.service('api::character.character').generateCharacter(ctx);
      console.log(character);
      console.log("########### DONE GENERATING CHARACTER ##########")
      ctx.body = { data: character };
    } catch (err) {
      ctx.body = err;
    }
  },
}));
