<script>
  import {
    guesses,
    currentGuess,
    word,
    currentAttempt,
    invalidGuess,
    haveWon,
  } from "../store/store";
  console.log($word);

  const getAlphabetFrequency = (word, alphabet) => {
    (word.match(new RegExp(alphabet, "g")) || []).length;
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
    if ($guesses[guessId].charAt(alphabetId) === "") return "letter";

    if (!$word.includes($guesses[guessId].charAt(alphabetId)))
      return "letter-incorrect";

    if ($word[alphabetId] == $guesses[guessId].charAt(alphabetId))
      return "letter-correct";

    if ($word.includes($guesses[guessId].charAt(alphabetId))) {
      const currentAlphabet = guess.charAt(alphabetId);
      const actualIndices = getAlphabetIndices($word, currentAlphabet);
      const actualFrequency = actualIndices.length;

      const slicedGuess = guess.slice(0, alphabetId);
      const slicedIndices = getAlphabetIndices(slicedGuess, currentAlphabet);
      const slicedFrequency = slicedIndices.length;

      console.log(slicedIndices, actualIndices, currentAlphabet);
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
