'use strict';

/**
 * story controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::story.story', ({ strapi }) => ({
  async generateStory(ctx) {
    try {
      const story = await strapi.service('api::story.story').generateStory(ctx);
      console.log("########### DONE GENERATING STORY ##########")
      ctx.body = { data: story };
    } catch (err) {
      ctx.body = err;
    }
  },
}));
