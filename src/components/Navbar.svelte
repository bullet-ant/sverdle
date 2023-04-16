<script>
  import {
    haveWon,
    haveLost,
    boardState,
    maxGuesses,
    guesses,
    word,
    currentAttempt,
    keyboardLetterClass,
    currentGuess,
  } from "../lib/store";
  import { selectGuessWord } from "../lib/word_selector";

  const reset = () => {
    haveWon.set(false);
    haveLost.set(false);
    boardState.set([]);
    maxGuesses.set(6);
    guesses.set(["", "", "", "", "", ""]);
    word.set(selectGuessWord());
    currentAttempt.set(0);
    keyboardLetterClass.set(
      Object.fromEntries(
        [...new Set("abcdefghijklmnopqrstuvwxyz")].map((char) => [char, ""])
      )
    );
    currentGuess.set("");
    localStorage["guessWord"] = $word;
  };
  let showHelp = false;
  const helpGuess1 = "WEARY";
  const helpGuess2 = "PILLS";
  const helpGuess3 = "VAGUE";
  const toggleHelp = () => {
    console.log("show help");
    showHelp = !showHelp;
    return showHelp;
  };
</script>

<div class="container">
  <div class="heading">
    <div class="title">Sverdle</div>
    <div class="restart">
      <button on:click={reset}>
        <i class="fa fa-rotate" />
      </button>
    </div>
    <div class="help">
      <button on:click={toggleHelp}>
        <i class="fa-regular fa-circle-question" />
      </button>
    </div>
    <div class="github">
      <button
        on:click={() =>
          (window.location.href = "https://github.com/bullet-ant/sverdle")}
      >
        <i class="fa fa-github" />
      </button>
    </div>
  </div>
</div>

{#if showHelp}
  <div class="help-modal">
    <div class="help-modal-header">
      <div class="title">How to Play?</div>
      <button on:click={() => (showHelp = false)} class="close-button"
        >&times;</button
      >
    </div>
    <div class="help-modal-body">
      <div class="objective">Guess the Wordle in 6 tries.</div>
      <ul>
        <li>Each guess must be a valid 5-letter word.</li>
        <li>
          The color of the tiles will change to show how close your guess was to
          the word.
        </li>
      </ul>
      <div class="examples">
        <b>Examples</b>
        <div class="example">
          {#each helpGuess1.split("") as letter, letter_index}
            <div class="help-guess" class:letter-correct={letter === "W"}>
              {letter}
            </div>
          {/each}
        </div>
        <b>W</b> is in the word and in the correct spot.
        <div class="example">
          {#each helpGuess2.split("") as letter, letter_index}
            <div class="help-guess" class:letter-present={letter === "I"}>
              {letter}
            </div>
          {/each}
        </div>
        <b>I</b> is in the word but in the wrong spot.
        <div class="example">
          {#each helpGuess3.split("") as letter, letter_index}
            <div class="help-guess" class:letter-incorrect={letter === "U"}>
              {letter}
            </div>
          {/each}
        </div>
        <b>U</b> is not in the word in any spot.
      </div>
    </div>
  </div>
  <div class="overlay" on:click={() => (showHelp = false)} />
{/if}
<hr />

<style>
  .help-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* transition: 200ms ease-in-out; */
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 10;
    background-color: white;
    width: 400px;
    min-height: 80%;
    max-width: 80%;
    font-family: "Prompt", sans-serif;
  }

  .help-modal-header {
    padding: 10px 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border-bottom: 1px solid black; */
  }
  .help-modal-header .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .help-modal-header .close-button {
    font-family: "Courier New", Courier, monospace;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-size: 1.5em;
    font-weight: bold;
  }
  .help-modal-body {
    padding: 10px 15px;
  }
  .help-modal-body .objective {
    font-size: 1.2em;
    font-weight: bold;
  }
  .help-modal-body ul {
    padding: 5px 15px;
  }
  .help-modal-body .examples {
    padding: 0 15px;
  }
  .help-modal-body .example {
    padding: 10px 0px 0px 0px;
  }
  .overlay {
    position: fixed;
    background-color: red;
    opacity: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  hr {
    margin-top: 0px;
  }
  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .heading .title {
    margin: auto;
    text-align: center;
    font-size: 42px;
    font-weight: bold;
    font-family: "Nova Oval", cursive;
  }
  .heading .restart {
    margin-left: -130px;
    margin-right: 10px;
    font-size: x-large;
    text-align: right;
  }
  .heading .help {
    margin-right: 10px;
    font-size: x-large;
    text-align: right;
  }
  .heading .github {
    font-size: x-large;
    text-align: right;
  }
  button {
    border: none;
    background-color: white;
  }

  @media (max-width: 600px) {
    .heading .title {
      margin-left: 0px;
      text-align: left;
    }
    .heading .restart {
      margin-right: 2px;
      font-size: large;
    }
    .heading .help {
      margin-right: 2px;
      font-size: large;
    }
    .heading .github {
      margin-right: 2px;
      font-size: large;
    }
  }
</style>
