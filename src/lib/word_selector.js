import { guessWords } from "./guess_words";
import { commonWords } from "./common_words";

export const selectGuessWord = () => {
  const words = guessWords.map((word) => word.toLowerCase());
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
};

export const getWordList = () => {
  const words = commonWords.map((word) => word.toLowerCase());
  return words;
};
