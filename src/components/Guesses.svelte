<script>
  import {
    guesses,
    currentGuess,
    word,
    keyboardLetterClass,
    currentAttempt,
  } from "../lib/store";

  // const trasposeGuesses = (guesses) => {
  //   const transposedGuesses = [];
  //   guesses.forEach((guess) => {
  //     // If guess is empty, replace it with 5 char long whitespace char
  //     guess === ""
  //       ? transposedGuesses.push("     ")
  //       : transposedGuesses.push(guess);
  //   });
  //   return transposedGuesses;
  // };

  // $: transposedGuesses = trasposeGuesses($guesses);

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

<p>{$currentGuess}</p>
{#each $guesses as guess, index}
  <div class="guesses">
    {#if guess}
      {#each guess.split("") as letter, letterIndex}
        <div class={`letter ${getLetterClass(guess, letter, letterIndex)}`}>
          {letter}
        </div>
      {/each}
    {:else if $currentAttempt == index}
      {#each $currentGuess.split("") as letter, letterIndex}
        <div class="letter">
          {letter}
        </div>
      {/each}
    {:else}
      {#each new Array(5).fill(" ") as letter}
        <div class="letter">
          {letter}
        </div>
      {/each}
    {/if}
  </div>
{/each}
<br />
