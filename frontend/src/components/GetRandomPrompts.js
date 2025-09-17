import RandomPrompts from './RandomPrompts.js';

function getRandomPrompts(prompt){
    const randomIndex = Math.floor(Math.random()*RandomPrompts.length);
    const randomPrompt = RandomPrompts[randomIndex];
    //Preventing generated random is not same as the previous random
    if(randomPrompt===prompt) return getRandomPrompts(prompt);
    return randomPrompt;
}

export default getRandomPrompts;