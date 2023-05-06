<script>
  import { showHelp } from "../store/store";

  const helpGuess1 = "WEARY";
  const helpGuess2 = "PILLS";
  const helpGuess3 = "VAGUE";
</script>

{#if $showHelp}
  <div class="help__header">
    <div class="help__header-heading">How to Play?</div>
    <button
      on:click={() => ($showHelp = false)}
      class="help__header-close-button">&times;</button
    >
  </div>

  <div class="help__body">
    <div class="help__body-objective">Guess the Wordle in 6 tries.</div>
    <ul>
      <li>Each guess must be a valid 5-letter word.</li>
      <li>
        The color of the tiles will change to show how close your guess was to
        the word.
      </li>
    </ul>
    <div class="help__body-examples">
      <b>Examples</b>
      <div class="help__body-example">
        {#each helpGuess1.split("") as letter, letter_index}
          <div
            class="help__body-example--letter"
            class:letter-correct={letter === "W"}
          >
            {letter}
          </div>
        {/each}
      </div>
      <b>W</b> is in the word and in the correct spot.
      <div class="help__body-example">
        {#each helpGuess2.split("") as letter, letter_index}
          <div
            class="help__body-example--letter"
            class:letter-present={letter === "I"}
          >
            {letter}
          </div>
        {/each}
      </div>
      <b>I</b> is in the word but in the wrong spot.
      <div class="help__body-example">
        {#each helpGuess3.split("") as letter, letter_index}
          <div
            class="help__body-example--letter"
            class:letter-incorrect={letter === "U"}
          >
            {letter}
          </div>
        {/each}
      </div>
      <b>U</b> is not in the word in any spot.
    </div>
  </div>
{/if}
