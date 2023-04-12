import { writable } from "svelte/store";

export const haveWon = writable(false);
export const boardState = writable([]);
export const maxGuesses = writable(6);
export const guesses = writable(["", "", "", "", "", ""]);
export const word = writable("APPLE");
export const currentAttempt = writable(0);
export const keyboardLetterClass = writable(Object.fromEntries([...new Set("abcdefghijklmnopqrstuvwxyz")].map(char => [char, ""])))
