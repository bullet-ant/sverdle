<script>
  import { currentAttempt, haveWon, maxGuesses, word } from "../lib/store";
  $: haveLost = $currentAttempt == $maxGuesses ? true : false;
  $: gameOver = $haveWon || haveLost;
  $: modalActive = gameOver;

  $: winMessage =
    $currentAttempt == 1
      ? "Wizard"
      : $currentAttempt == 2
      ? "Genius"
      : $currentAttempt == 3
      ? "Excellent"
      : $currentAttempt == 4
      ? "Great"
      : $currentAttempt == 5
      ? "Good"
      : "Phew";
  let lostMessage = `${$word}`;
</script>

{#if gameOver}
  <div class="my-modal" class:active={modalActive}>
    <div class="my-modal-body">
      {#if $haveWon}
        {winMessage}
      {:else if haveLost}
        {lostMessage}
      {/if}
    </div>
  </div>
{/if}

<!-- <div id="overlay" class:active={modalActive} /> -->

<style>
</style>
