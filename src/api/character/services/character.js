'use strict';

/**
 * character service
 */

const { createCoreService } = require('@strapi/strapi').factories;

async function generateRandomCharacter(strapi) {

  // Prompt for generating the character
  const SUPER_PROMPT = `
    Create a random cyberpunk fantasy character. The character can be male or female. Output the character data in JSON format with the following attributes: 
      1. name: Name of the character.
      2. gender: Sex of the character.
      3. description: A detailed description of the character.
      4. personaPrompt: A persona prompt that could be used to set the character's persona for a following conversation with an AI model.
      5. imagePrompt: An image prompt that could be used to generate a visual representation of the character with a generative AI model.
  `;

  // Generating the character description using OpenAI's text-davinci-003 model
  const responseCharacter = await strapi.openai.createCompletion({
    model: "text-davinci-003",
    prompt: SUPER_PROMPT,
    temperature: 0.7,
    max_tokens: 3500,
  });

  // Parsing the generated character data from the API response
  const characterObject = JSON.parse(responseCharacter.data.choices[0].text);

  // Generating an image representation of the character using OpenAI's image model
  const responseImage = await strapi.openai.createImage({
    prompt: characterObject.imagePrompt,
    n: 1,
    size: "512x512",
    response_format: "b64_json",
  });

  // Creating the final character object with the generated data and image URL
  const finalCharacter = {
    ...characterObject,
    imageUrl: responseImage.data.data[0].b64_json
  }

  // Returning the final character object
  return finalCharacter;
}

module.exports = createCoreService('api::character.character', ({ strapi }) => ({
  async generateCharacter(...args) {
    const generatedCharacter = await generateRandomCharacter(strapi)
    return generatedCharacter;
  },
}));
