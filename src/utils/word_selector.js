import { guessWords } from "./words_list";
import { validWords } from "./words_list";

export const getGuessWord = () => {
  // selects a random word to guess
  return guessWords[
    Math.floor(Math.random() * guessWords.length)
  ].toUpperCase();
};

export const getValidWords = () => {
  // returns a list of valid 5 letter words
  // return validWords.map((word) => word.toUpperCase());
  return validWords
};
