<script>
  import { quintOut } from "svelte/easing";
  import {
    guesses,
    currentGuess,
    word,
    keyboardLetterClass,
    currentAttempt,
  } from "../lib/store";
  import { fade, fly, slide } from "svelte/transition";
  import { flip } from "svelte/animate";

  const invisibleChar = `‎`;
  $: getCurrentGuess = () => {
    let currGuess = $currentGuess;
    while (currGuess.length < 5) {
      currGuess += invisibleChar;
    }
    return currGuess;
  };
  const getLetterClass = (guess, letter, index) => {
    keyboardLetterClass.update((obj) => obj);
    if (letter === " ") {
      // if empty
      return "";
    } else if ($word[index] === letter) {
      // if correct letter
      $keyboardLetterClass[letter.toLowerCase()] = "letter-correct";

      return "letter-correct";
    } else if (
      // if letter included
      $word.includes(letter) &&
      verifyOccurrences(guess, letter, index)
    ) {
      $keyboardLetterClass[letter.toLowerCase()] = "letter-present";

      return "letter-present";
    } else {
      // if letter not present
      if (
        !$keyboardLetterClass[letter.toLowerCase()].includes("letter-present")
      )
        $keyboardLetterClass[letter.toLowerCase()] = "letter-incorrect";

      return "letter-incorrect";
    }
  };

  const verifyOccurrences = (guess, letter, index) => {
    const re = new RegExp(letter, "g");
    const guessPreMatch = (guess.slice(0, index + 1).match(re) || []).length;
    const guessPostMatch = (guess.slice(index + 1).match(re) || []).length;
    const wordPreMatch = ($word.match(re) || []).length;
    const wordPostMatch = $word.slice(index + 1).indexOf(letter);

    if (guessPostMatch && wordPostMatch != -1) return false;
    if (guessPreMatch > wordPreMatch) return false;
    return true;
  };
</script>

<!-- Guesses: ["WORD1", "WORD2", "", "", ""] -->
{#each $guesses as guess, index}
  <div class="guesses">
    {#if guess}
      <!-- Splitted Guess: ["W" ,"O", "R", "D", "1"] -->
      {#each guess.split("") as letter, letterIndex}
        <div
          class={`letter ${getLetterClass(
            guess,
            letter,
            letterIndex
          )} guess-${index}-${letterIndex}`}
        >
          {letter}
        </div>
      {/each}
      <!-- Current Guess: ["W", "O"] (as the user inputs) -->
    {:else if $currentAttempt == index}
      {#each getCurrentGuess().split("") as letter, letterIndex}
        <div class="letter">
          {letter}
        </div>
      {/each}
      <!-- Fill empty guesses with invisible character -->
    {:else}
      {#each new Array(5).fill(invisibleChar) as letter}
        <div class="letter">
          {letter}
        </div>
      {/each}
    {/if}
  </div>
{/each}
<br />

<style>
  .guess-0-0,
  .guess-1-0,
  .guess-2-0,
  .guess-3-0,
  .guess-4-0,
  .guess-5-0 {
    animation: flip 600ms linear;
  }
  .guess-0-1,
  .guess-1-1,
  .guess-2-1,
  .guess-3-1,
  .guess-4-1,
  .guess-5-1 {
    animation: flip 600ms linear;
  }
  .guess-0-2,
  .guess-1-2,
  .guess-2-2,
  .guess-3-2,
  .guess-4-2,
  .guess-5-2 {
    animation: flip 600ms linear;
  }
  .guess-0-3,
  .guess-1-3,
  .guess-2-3,
  .guess-3-3,
  .guess-4-3,
  .guess-5-3 {
    animation: flip 600ms linear;
  }
  .guess-0-4,
  .guess-1-4,
  .guess-2-4,
  .guess-3-4,
  .guess-4-4,
  .guess-5-4 {
    animation: flip 600ms linear;
  }
  @keyframes flip {
    0% {
      background-color: white;
      color: black;
      border: #d3d6da solid;
    }
    50% {
      transform: rotateX(90deg);
      background-color: white;
      color: black;
      border: #d3d6da solid;
    }
  }
</style>
