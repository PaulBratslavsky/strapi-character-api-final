module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'POST',
      path: '/characters/generateCharacter', 
      handler: 'character.generateCharacter',
    },
  ]
}