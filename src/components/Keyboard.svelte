<script>
  import {
    currentAttempt,
    currentGuess,
    guesses,
    haveWon,
    keyboardLetterClass,
    word,
  } from "../lib/store";
  import { getWordList } from "../lib/word_selector";
  let keys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  $: getKeyboardLetterClass = (letter) => {
    return $keyboardLetterClass[letter.toLowerCase()];
  };
  const handleClick = (letter) => {
    if ($currentGuess.length < 5) {
      $currentGuess += letter;
    }
  };
  const handleEnter = () => {
    if ($currentGuess.length === 5) {
      if (getWordList().indexOf($currentGuess.toLowerCase()) != -1) {
        $guesses[$currentAttempt] = $currentGuess;
        currentAttempt.update((attempt) => attempt + 1);

        if ($currentGuess.toLowerCase() === $word.toLowerCase())
          haveWon.set(true);
        $currentGuess = "";
      } else {
        // console.log(getWordList().includes('apple'));
        console.log(getWordList());
      }
    }
  };

  const handleDelete = () => {
    $currentGuess = $currentGuess.slice(0, -1);
  };
</script>

{#each keys as key, index}
  <div class="container-fluid">
    <div class="row justify-content-center keyboard">
      {#if index == 2}
        <div class="col-xs-1">
          <button on:click={handleDelete} class="action-button">
            <i class="fa fa-backspace" />
          </button>
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
          <button on:click={handleEnter} class="action-button"
            ><i class="fa fa-check" aria-hidden="true" /></button
          >
        </div>
      {/if}
    </div>
  </div>
{/each}

<style>
  .action-button {
    background-color: rgb(169, 170, 255);
    color: white;
  }
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
