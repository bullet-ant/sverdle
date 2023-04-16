<script>
  import { createEventDispatcher } from "svelte";
  import { getWordList } from "../lib/word_selector";
  import {
    currentAttempt,
    currentGuess,
    guesses,
    haveLost,
    haveWon,
    word,
  } from "../lib/store";

  const dispatch = createEventDispatcher();

  const handleKeydown = (e) => {
    // No input if game is over.
    if ($haveWon || $haveLost) return;

    const key = e.keyCode;

    // Alphabet key pressed
    if ($currentGuess.length < 5 && key >= 65 && key <= 90) {
      $currentGuess += String.fromCharCode(key);
    }

    // Backspace key pressed
    if (key == 8) {
      $currentGuess = $currentGuess.slice(0, -1);
    }

    // Enter key pressed
    if (e.keyCode === 13) {
      if ($currentGuess.length === 5) {
        if (getWordList().indexOf($currentGuess.toLowerCase()) != -1) {
          $guesses[$currentAttempt] = $currentGuess;
          currentAttempt.update((attempt) => attempt + 1);

          if ($currentGuess.toLowerCase() === $word.toLowerCase()) {
            haveWon.set(true);
            dispatch("won", { attempt: $currentAttempt });
          }
          $currentGuess = "";
        } else {
          dispatch("invalid", { attempt: $currentAttempt });
        }
      }
    }
  };
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />
