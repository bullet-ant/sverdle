<script>
  import { currentGuess, keyboardLetterClass } from "../lib/store";
  let keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  $: getKeyboardLetterClass = (letter) => {
    return $keyboardLetterClass[letter.toLowerCase()];
  };
  const handleClick = (letter) => {
    if ($currentGuess.length < 5) {
      $currentGuess += letter;
    }
  };
</script>

{#each keys as key, index}
  <div class="container-fluid">
    <div class="row justify-content-center keyboard">
      {#if index == 2}
        <div class="col-xs-1">
          <button><i class="fa fa-check" aria-hidden="true" /></button>
        </div>
      {/if}
      {#each key.split("") as letter}
        <div class="col-xs-1">
          <button
            on:click={() => handleClick(letter)}
            class={`${getKeyboardLetterClass(letter)}`}
          >
            {letter}
          </button>
        </div>
      {/each}
      {#if index == 2}
        <div class="col-xs-1">
          <button>
            <i class="fa fa-backspace" />
          </button>
        </div>
      {/if}
    </div>
  </div>
{/each}

<style>
  .letter-correct {
    background-color: #6aaa64;
    color: white;
  }

  .letter-incorrect {
    background-color: #787c7e;
    color: white;
  }

  .letter-present {
    background-color: #c9b458;
    color: white;
  }
</style>
