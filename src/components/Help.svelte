<script>
  import { showHelp } from "../utils/store";
  import Overlay from "./Overlay.svelte";

  const helpGuess1 = "WEARY";
  const helpGuess2 = "PILLS";
  const helpGuess3 = "VAGUE";
</script>

{#if $showHelp}
  <div class="help">
    <div class="help-header">
      <div class="title">How to Play?</div>
      <button on:click={() => ($showHelp = false)} class="close-button"
        >&times;</button
      >
    </div>
    <div class="help-body">
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
{/if}

<Overlay />

<style>
  .help {
    font-family: "Prompt", sans-serif;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 10;
    background-color: white;
    width: 400px;
    min-height: 80%;
    max-width: 80%;
  }

  .help-header {
    padding: 10px 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .help-header .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .help-header .close-button {
    font-family: "Courier New", Courier, monospace;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-size: 1.5em;
    font-weight: bold;
  }
  .help-body {
    padding: 10px 15px;
  }
  .help-body .objective {
    font-size: 1.2em;
    font-weight: bold;
  }
  .help-body ul {
    padding: 5px 20px;
  }
  .help-body .examples {
    padding: 0 20px;
  }
  .help-body .example {
    padding: 18px 0px 0px 0px;
  }
</style>
