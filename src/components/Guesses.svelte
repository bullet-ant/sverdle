<script>
  import Input from "./Input.svelte";
  import Keyboard from "./Keyboard.svelte";
  import {
    guesses,
    currentGuess,
    word,
    haveWon,
    keyboardLetterClass,
    currentAttempt,
  } from "../utils/store";

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
    // word   - HELLO
    // guess  - EAGLE
    const guessPreMatch = (guess.slice(0, index + 1).match(re) || []).length;
    const guessPostMatch = (guess.slice(index + 1).match(re) || []).length;
    const wordPreMatch = ($word.match(re) || []).length;
    const wordPostMatch = $word.slice(index + 1).indexOf(letter);

    if (guessPostMatch && wordPostMatch != -1) return false;
    if (guessPreMatch > wordPreMatch) return false;
    return true;
  };
  let invalidGuess = false;
  const handleInvalid = (event) => {
    invalidGuess = true;
    setTimeout(() => {
      invalidGuess = false;
    }, 1000);
  };
</script>

{#if invalidGuess}
  <div class="my-modal active">
    <div class="my-modal-body">Not in word list</div>
  </div>
{/if}
<div class="guess-area">
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
            )} guess-animation`}
            class:won-animation={index == $currentAttempt - 1 && $haveWon}
          >
            {letter}
          </div>
        {/each}
        <!-- Current Guess: ["W", "O"] (as the user inputs) -->
      {:else if $currentAttempt == index}
        {#each getCurrentGuess().split("") as letter, letterIndex}
          <div class="letter" class:invalid-animation={invalidGuess}>
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
</div>
<Input on:invalid={handleInvalid} />
<Keyboard on:invalid={handleInvalid} />

<style>
  .guess-area {
    /* display: flex; */
  }
  .guess-animation {
    animation: flip 600ms linear;
  }
  .invalid-animation {
    animation: shake 500ms 1;
  }
  .won-animation {
    animation: jump 600ms infinite;
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

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
  @keyframes jump {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
</style>
