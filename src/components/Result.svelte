<script>
  import Modal from "./Modal.svelte";
  import { currentAttempt, haveWon, maxGuesses, word } from "../lib/store";
  const winnerMessage = "Congratulations! You win! 🎉";
</script>

<!-- {#if $haveWon}
  <Modal />
{:else if !$haveWon && $currentAttempt === $maxGuesses}
  <h1>Oops! The word is {$word}</h1>
{/if} -->
<Modal message={winnerMessage} />
