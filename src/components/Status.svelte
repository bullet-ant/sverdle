<script>
  import { currentAttempt, haveWon, haveLost, word, invalidGuess } from "../store/store";

  $: gameOver = $haveWon || $haveLost;

  $: lostMessage = `${$word}`;
  $: winMessage =
    $currentAttempt == 1
      ? "Wizard!"
      : $currentAttempt == 2
      ? "Genius!"
      : $currentAttempt == 3
      ? "Excellent!"
      : $currentAttempt == 4
      ? "Good!"
      : $currentAttempt == 5
      ? "Phew!"
      : "That was close!";
</script>

{#if gameOver}
  <div class="status__message">
    {#if $haveWon}
      {winMessage}
    {:else if haveLost}
      {lostMessage}
    {/if}
  </div>
{/if}
{#if $invalidGuess}
  <div class="status__message">
    Not in word list!
  </div>
{/if}
