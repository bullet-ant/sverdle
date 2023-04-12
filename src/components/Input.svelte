<script>
  import { currentAttempt, guesses, haveWon, word } from "../lib/store";
  let currentGuess = "";
  const handleKeydown = (e) => {
    const key = e.keyCode;

    // Alphabet key pressed
    if (currentGuess.length < 5 && key >= 65 && key <= 90) {
      currentGuess += String.fromCharCode(key);
    }

    // Backspace key pressed
    if (key == 8) {
      currentGuess = currentGuess.slice(0, -1);
    }

    // Enter key pressed
    if (e.keyCode === 13) {
      if (currentGuess.length === 5) {
        $guesses[$currentAttempt] = currentGuess;
        currentAttempt.update((attempt) => attempt + 1);

        if (currentGuess.toLowerCase() === $word.toLowerCase())
          haveWon.set(true);
      }
      currentGuess = "";
    }
    guesses.update((obj) => obj);
    console.log(
      `Current Guess - ${currentGuess} Have Won - ${$haveWon} Guesses - ${$guesses}`
    );
  };
</script>

<svelte:window on:keydown|preventDefault={handleKeydown} />
