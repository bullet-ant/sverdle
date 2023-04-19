<script>
  import { currentAttempt, haveWon, haveLost, word } from "../utils/store";

  $: gameOver = $haveWon || $haveLost;

  $: lostMessage = `${$word}`;
  $: winMessage =
    $currentAttempt == 1
      ? "Wizard"
      : $currentAttempt == 2
      ? "Genius"
      : $currentAttempt == 3
      ? "Excellent"
      : $currentAttempt == 4
      ? "Good"
      : $currentAttempt == 5
      ? "Phew"
      : "That was close!";
</script>

{#if gameOver}
  <div class="result">
    <div class="result-body">
      {#if $haveWon}
        {winMessage}
      {:else if haveLost}
        {lostMessage}
      {/if}
    </div>
  </div>
{/if}

<style>
  .result {
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    border: none;
    z-index: 1;
    color: white;
    background-color: rgb(0, 0, 0);
    max-width: 80%;
  }
  .result-body {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 2px 10px;
  }
</style>
