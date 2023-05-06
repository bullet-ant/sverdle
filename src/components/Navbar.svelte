<script>
  import { onMount } from "svelte";
  import {
    maxGuesses,
    word,
    haveWon,
    haveLost,
    currentAttempt,
    currentGuess,
    guesses,
    boardState,
    keyboardLetterClass,
    showHelp,
  } from "../store/store";
  import { getGuessWord } from "../utils/word_selector";

  onMount(() => {
    localStorage["guessWord"] = $word;
  });

  const reset = () => {
    haveWon.set(false);
    haveLost.set(false);
    boardState.set([]);
    maxGuesses.set(6);
    guesses.set(["", "", "", "", "", ""]);
    word.set(getGuessWord());
    currentAttempt.set(0);
    keyboardLetterClass.set(
      Object.fromEntries(
        [...new Set("abcdefghijklmnopqrstuvwxyz")].map((char) => [char, ""])
      )
    );
    currentGuess.set("");
    localStorage["guessWord"] = $word;
  };
</script>

<div class="header__text-box">
  <h1 class="heading-primary">Sverdle</h1>
</div>
<div class="header__navigation">
  <button
    class="header__navigation-button header__navigation-button--restart"
    on:click={reset}
  >
    <i class="fa fa-rotate" />
  </button>
  <button
    class="header__navigation-button header__navigation-button--help"
    on:click={() => ($showHelp = !$showHelp)}
  >
    <i class="fa-regular fa-circle-question" />
  </button>
  <button
    class="header__navigation-button header__navigation-button--github"
    on:click={() => window.open("https://github.com/bullet-ant/sverdle")}
  >
    <i class="fa fa-github" />
  </button>
</div>
