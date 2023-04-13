<script>
  import { currentAttempt, haveWon, maxGuesses, word } from "../lib/store";
  $: haveLost = $currentAttempt == $maxGuesses ? true : false;
  $: gameOver = $haveWon || haveLost;
  $: modalActive = gameOver;

  let winMessage = "Congratulations! You won! 🎉";
  let lostMessage = `Oops! The word is ${$word}`;
</script>

<div class="my-modal" class:active={modalActive}>
  <div class="my-modal-body">
    {#if $haveWon}
      {winMessage}
    {:else if haveLost}
      {lostMessage}
    {/if}
  </div>
</div>
<div id="overlay" class:active={modalActive} />

<style>
  .my-modal {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: 400ms ease-in-out;
    border: 1px black solid;
    border-radius: 10px;
    z-index: 10;
    background-color: white;
    width: 500px;
    max-width: 80%;
  }
  .my-modal.active {
    transform: translate(-50%, -50%) scale(1);
  }
  .my-modal-body {
    font-size: 20px;
    text-align: center;
    padding: 50px;
  }
  #overlay {
    position: fixed;
    opacity: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: 300ms ease-in-out;
    pointer-events: none;
  }
  #overlay.active {
    pointer-events: all;
    opacity: 1;
  }
</style>
