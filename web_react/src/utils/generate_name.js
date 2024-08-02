
const adjectives = [
  "magnificent", "exquisite", "stupendous", "extraordinary", "spectacular", "astonishing", 
  "formidable", "phenomenal", "breathtaking", "marvelous", "impeccable", "unparalleled", 
  "sublime", "resplendent", "transcendent", "incredible", "unbelievable", "remarkable", 
  "astounding", "fabulous", "dazzling", "prodigious", "sensational", "impressive", 
  "splendid", "majestic", "glorious", "radiant", "stunning", "majestic", "enchanting", 
  "bewildering", "spellbinding", "awe-inspiring", "towering", "imposing", "colossal", 
  "gargantuan", "tremendous", "fantastic", "fascinating", "magnanimous", "eminent", 
  "renowned", "illustrious", "distinguished", "noteworthy", "unforgettable", 
  "unmistakable", "unimaginable", "inimitable", "incomparable", "exceptional", 
  "distinguished", "legendary", "monumental", "prestigious", "brilliant", "radiant", 
  "sublime", "pristine", "sparkling", "vibrant", "luminous", "effulgent", "scintillating", 
  "resplendent", "exhilarating", "electrifying", "mesmerizing", "captivating", 
  "entrancing", "hypnotic", "magnanimous", "outstanding", "praiseworthy", "commendable", 
  "laudable", "meritorious", "illustrious", "estimable", "eminent", "prestigious", 
  "exalted", "noble", "venerable", "imposing", "grandiose", "heroic", "valiant", 
  "dignified", "honorable", "statuesque", "exalted", "superlative", "peerless", 
  "supreme", "unmatched"
]


const nouns = 
[
  "lion", "eagle", "tiger", "unicorn", "phoenix", "dragon", "griffin", "pegasus", 
  "mermaid", "sphinx", "kraken", "centaur", "yeti", "dinosaur", "robot", "ninja", 
  "samurai", "knight", "wizard", "sorcerer", "witch", "giant", "genie", "fairy", 
  "elf", "dwarf", "ogre", "troll", "goblin", "alien", "monster", "pirate", "vampire", 
  "werewolf", "zombie", "ghost", "skeleton", "cyborg", "superhero", "villain", 
  "princess", "prince", "king", "queen", "jester", "knave", "warrior", "archer", 
  "assassin", "gladiator", "champion", "cheetah", "panther", "cougar", "falcon", 
  "hawk", "raven", "sparrow", "hawk", "shark", "whale", "dolphin", "octopus", 
  "jellyfish", "penguin", "polar bear", "gorilla", "chimpanzee", "orangutan", 
  "kangaroo", "koala", "platypus", "alligator", "crocodile", "hippopotamus", 
  "rhinoceros", "giraffe", "elephant", "camel", "antelope", "buffalo", "bison", 
  "moose", "caribou", "reindeer", "wolverine", "badger", "mongoose", "meerkat", 
  "lemur", "sloth", "armadillo", "porcupine", "hedgehog", "weasel"
]


function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

export const generateName = () =>{
    const randomAdjective = getRandomElement(adjectives);
    const randomNoun = getRandomElement(nouns);
  
    return `${randomAdjective} ${randomNoun}`;
}