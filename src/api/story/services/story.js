'use strict';

/**
 * story service
 */

const { createCoreService } = require('@strapi/strapi').factories;

async function generateStory(strapi, ctx) {

  console.log("########### GENERATING STORY ##########")

  if (!ctx.request.body) throw new Error("No request body");

  const { name, gender, description, personaPrompt, imagePrompt } = ctx.request.body.data;

  // Prompt for generating the story
  const SUPER_PROMPT = `
  Create a cyberpunk fantasy story based on cyberpunk 2077 role using the template below and output the story in markdown with headings and subheadings. 
  
  Character Backstory:
  Name: ${name}
  Gender: ${gender}
  Description: ${description}
  Persona: ${personaPrompt}
  Image: ${imagePrompt}

  Writing Prompt:

  Consider what are the underlying reasons that fuel their relentless crusade for justice. Is it a personal vendetta? Or maybe a tragic past? Or perhaps an inherent belief in the potential goodness of mankind despite the bleak surroundings? Delve into their psyche and motivations in and craft a compelling backstory that seamlessly weaves into the narrative. 
  `;

  try {
    const responseStory = await strapi.openai.createCompletion({
      model: "text-davinci-003",
      prompt: SUPER_PROMPT,
      temperature: 0.7,
      max_tokens: 3500,
    });

    const generatedStory = { text: responseStory.data.choices[0].text, prompt: SUPER_PROMPT };

    // Returning the final story object
    return generatedStory;

  } catch (error) {
    throw new Error(error)
  }
}

module.exports = createCoreService('api::story.story', ({ strapi }) => ({
  async generateStory(ctx) {
    const generatedStory = await generateStory(strapi, ctx)
    return generatedStory;
  },
}));
