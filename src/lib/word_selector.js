import { commonWords } from "./common_words";

const words = commonWords.map((word) => word.toLowerCase());
export const selectRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
};

export const getWordList = () => {
  return words;
};
