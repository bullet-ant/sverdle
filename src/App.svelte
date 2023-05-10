<script>
  import Wordle from "./components/Wordle.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Keyboard from "./components/Keyboard.svelte";
  import Help from "./components/Help.svelte";
  import Overlay from "./components/Overlay.svelte";
  import { haveWon, keyboardLetterClass, showHelp } from "./store/store";
  import Status from "./components/Status.svelte";
  import Confetti from "./components/Confetti.svelte";
</script>

<div class="fullscreen">
  {#if $showHelp}
    <Overlay />
  {/if}
  {#if $haveWon}
    <Confetti />
  {/if}

  <header class="header">
    <Navbar />
  </header>
  <main>
    <section class="help">
      <Help />
    </section>
    <div class="guessarea">
      <section class="status">
        <Status />
      </section>
      <section class="wordle">
        <Wordle />
      </section>
    </div>
    <section class="keyboard">
      <Keyboard />
    </section>
  </main>
</div>
