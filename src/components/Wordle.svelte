<script>
  import {
    guesses,
    currentGuess,
    word,
    currentAttempt,
    invalidGuess,
    haveWon,
    keyboardLetterClass,
  } from "../store/store";

  const getAlphabetFrequency = (word, alphabet) => {
    return (word.match(new RegExp(alphabet, "g")) || []).length;
  };

  const getAlphabetIndices = (word, alphabet) => {
    const regex = new RegExp(alphabet, "g");
    const indices = [];
    let result;

    while ((result = regex.exec(word))) {
      indices.push(result.index);
    }
    return indices;
  };

  const verifyCharacter = (guess, guessId, alphabetId) => {
    const alphabet = $guesses[guessId].charAt(alphabetId);

    // No guesses yet #ffffff
    if (alphabet === "") return "letter";

    // Guessed alphabet not in Actual Word #787c7e
    if (!$word.includes(alphabet)) {
      $keyboardLetterClass[alphabet] = "letter-incorrect"
      return "letter-incorrect";
    }
    
    if ($word.includes(alphabet)) {
      // Guessed alphabet present in correct position #6aaa64
      if ($word.charAt(alphabetId) == alphabet) {
        $keyboardLetterClass[alphabet] = "letter-correct";
        return "letter-correct";
      }

      // All previous guesses got their colors #787c7e
      if (
        getAlphabetFrequency($word, alphabet) <=
        getAlphabetFrequency(guess.substring(0, alphabetId), alphabet)
      ) 
        return "letter-incorrect";

      const actualIndices = getAlphabetIndices($word, alphabet);

      const rightSlicedGuess =
        "@".repeat(alphabetId + 1) + guess.slice(alphabetId + 1);
      const rightSlicedIndices = getAlphabetIndices(rightSlicedGuess, alphabet);

      // If all later guesses are at correct position, this should be #787c7e
      if (
        !actualIndices.filter((val) => !rightSlicedIndices.includes(val)).length
      )
        return "letter-incorrect";

      $keyboardLetterClass[alphabet] = "letter-present";
      return "letter-present";
    }

    return "letter";
  };
</script>

<!-- HTML starts here -->

<div class="wordle__guesses">
  {#each new Array(6) as guess, guessId}
    <div class={`wordle__guess--${guessId}`}>
      {#each new Array(5) as alphabet, alphabetId}
        <div
          class:flip={$guesses[guessId]}
          class:jump={guessId === $currentAttempt - 1 && $haveWon}
          class:shake={guessId === $currentAttempt && $invalidGuess}
          class={`wordle__guess--${alphabetId} wordle__guess--alphabet ${verifyCharacter(
            $guesses[guessId],
            guessId,
            alphabetId
          )}`}
        >
          {#if $guesses[guessId].charAt(alphabetId)}
            {$guesses[guessId].charAt(alphabetId)}
          {/if}
          {#if $currentGuess && guessId === $currentAttempt}
            {$currentGuess.charAt(alphabetId)}
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>
