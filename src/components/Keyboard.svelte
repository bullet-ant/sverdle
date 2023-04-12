<script>
  import { keyboardLetterClass } from "../lib/store";
  let keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  const getKeyboardLetterClass = (letter) => {
    return $keyboardLetterClass[letter.toLowerCase()];
  };
</script>

{#each keys as key}
  <div class="keyboard">
    {#each key.split("") as letter}
      <button class={`${getKeyboardLetterClass(letter)}`}>
        {letter}
      </button>
    {/each}
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
