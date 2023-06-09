'use strict';
const { Configuration, OpenAIApi } = require("openai");

function configureOpenAi(apiKey) {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  return new OpenAIApi(configuration);
}

module.exports = {
  register({ strapi }) {
    const openai = configureOpenAi(process.env.OPEN_AI_KEY);
    strapi.openai = openai;
  },
  
  bootstrap(/*{ strapi }*/) {},
};
