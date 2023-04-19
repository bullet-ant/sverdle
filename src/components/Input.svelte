<script>
  import { createEventDispatcher } from "svelte";
  import { getValidWords } from "../utils/word_selector";
  import {
    currentAttempt,
    currentGuess,
    guesses,
    haveLost,
    haveWon,
    maxGuesses,
    showHelp,
    word,
  } from "../utils/store";
  import { validWords } from "../utils/words_list";

  const dispatch = createEventDispatcher();

  const handleKeydown = (e) => {
    // No input registered if game is over.
    if ($haveWon || $haveLost) return;

    const key = e.keyCode;

    // Escape pressed
    if (key == 27) {
      $showHelp = false;
    }

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
      const isGuessValid =
        $currentGuess.length === 5 &&
        validWords.includes($currentGuess.toLowerCase());
      if (isGuessValid) {
        $guesses[$currentAttempt] = $currentGuess;
        $currentAttempt += 1;

        if ($currentGuess.toLowerCase() === $word.toLowerCase())
          haveWon.set(true);

        if ($currentAttempt === $maxGuesses) haveLost.set(true);

        $currentGuess = "";
      } else {
        dispatch("invalid", { attempt: $currentAttempt });
      }
    }
  };
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />
