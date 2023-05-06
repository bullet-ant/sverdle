<script>
  // Imports
  import {
    currentAttempt,
    currentGuess,
    guesses,
    haveLost,
    haveWon,
    invalidGuess,
    keyboardLetterClass,
    maxGuesses,
    showHelp,
    word,
  } from "../store/store";

  import { validWords } from "../utils/words_list";

  // Variable Declarations
  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  // Keypress Functions
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
      // $guesses[$currentAttempt] += String.fromCharCode(key);
      $currentGuess += String.fromCharCode(key);
    }

    // Backspace key pressed
    if (key == 8) {
      // $guesses[$currentAttempt] = $guesses[$currentAttempt].slice(0, -1);
      $currentGuess = $currentGuess.slice(0, -1);
    }

    // Enter key pressed
    if (e.keyCode === 13) {
      console.log($currentGuess);
      const isGuessValid =
        $currentGuess.length === 5 &&
        validWords.includes($currentGuess.toLowerCase());
      // if (isGuessValid) {
      if (isGuessValid) {
        $guesses[$currentAttempt] = $currentGuess;
        $currentAttempt += 1;

        if ($currentGuess.toLowerCase() === $word.toLowerCase())
          haveWon.set(true);

        if ($currentAttempt === $maxGuesses) haveLost.set(true);

        $currentGuess = "";
      } else {
        if ($currentGuess.length === 5) $invalidGuess = true;
        setTimeout(() => {
          $invalidGuess = false;
        }, 800);
      }
      console.log($guesses);
    }
  };
  // Click Functions

  $: getKeyboardLetterClass = (letter) => {
    return $keyboardLetterClass[letter.toLowerCase()];
  };

  const handleClick = (letter) => {
    if ($haveWon || $haveLost) return;

    if ($currentGuess.length < 5) {
      $currentGuess += letter.toUpperCase();
    }
  };

  const handleSave = () => {
    if ($haveWon || $haveLost) return;

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
      $invalidGuess = true;
      setTimeout(() => {
        $invalidGuess = false;
      }, 800);
    }
  };

  const handleBackspace = () => {
    if ($haveWon || $haveLost) return;

    $currentGuess = $currentGuess.slice(0, -1);
  };
</script>

{#each keyboardRows as keyboardRow, rowNumber}
  <div class={`keyboard__row--${rowNumber}`}>
    {#if rowNumber == 2}
      <button
        on:click={handleBackspace}
        class="keyboard__button keyboard__button--backspace"
      >
        <i class="fa fa-backspace" />
      </button>
    {/if}
    {#each keyboardRow.split("") as key, keyIndex}
      <button on:click={() => handleClick(key)} class="keyboard__button">
        {key}
      </button>
    {/each}
    {#if rowNumber == 2}
      <button
        on:click={handleSave}
        class="keyboard__button keyboard__button--enter"
      >
        <i class="fa fa-check" />
      </button>
    {/if}
  </div>
{/each}

<svelte:window on:keydown|preventDefault={handleKeydown} />
