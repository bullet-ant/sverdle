<script>
  import { guesses, word, keyboardLetterClass } from "../lib/store";

  const trasposeGuesses = (guesses) => {
    const transposedGuesses = [];
    guesses.forEach((guess) => {
      // If guess is empty, replace it with 5 char long whitespace char
      guess === ""
        ? transposedGuesses.push("     ")
        : transposedGuesses.push(guess);
    });
    return transposedGuesses;
  };

  $: transposedGuesses = trasposeGuesses($guesses);

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

{#each transposedGuesses as guess}
  <div class="guesses">
    {#each guess.split("") as letter, index}
      <div class={`letter ${getLetterClass(guess, letter, index)}`}>
        {letter}
      </div>
    {/each}
  </div>
{/each}
<br />
