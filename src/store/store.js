import { writable } from "svelte/store";
import { getGuessWord } from "../utils/word_selector";

export const haveWon = writable(false);
export const haveLost = writable(false);
export const showHelp = writable(false);
export const boardState = writable([]);
export const maxGuesses = writable(6);
export const guesses = writable(["", "", "", "", "", ""]);
export const word = writable(getGuessWord());
export const currentAttempt = writable(0);
export const invalidGuess = writable(false);
export const keyboardLetterClass = writable(
  Object.fromEntries(
    [...new Set("abcdefghijklmnopqrstuvwxyz")].map((char) => [char, ""])
  )
);
export const currentGuess = writable("");
