<script>
  import { createEventDispatcher } from "svelte";
  import {
    currentAttempt,
    currentGuess,
    guesses,
    haveLost,
    haveWon,
    keyboardLetterClass,
    maxGuesses,
    word,
  } from "../utils/store";
  import { getValidWords } from "../utils/word_selector";
  import { validWords } from "../utils/words_list";

  const dispatch = createEventDispatcher();

  const keyboardRows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  $: getKeyboardLetterClass = (letter) => {
    return $keyboardLetterClass[letter.toLowerCase()];
  };

  const handleClick = (letter) => {
    if ($haveWon || $haveLost) return;

    if ($currentGuess.length < 5) {
      $currentGuess += letter.toUpperCase();
    }
  };

  const handleSave = () => {
    if ($haveWon || $haveLost) return;

    const isGuessValid =
      $currentGuess.length === 5 &&
      validWords.includes($currentGuess.toLowerCase());
    if (isGuessValid) {
      $guesses[$currentAttempt] = $currentGuess;
      $currentAttempt += 1;

      if ($currentGuess.toLowerCase() === $word.toLowerCase())
        haveWon.set(true);

      if ($currentAttempt === $maxGuesses) haveLost.set(true);

      $currentGuess = "";
    } else {
      dispatch("invalid", { attempt: $currentAttempt });
    }
  };

  const handleBackspace = () => {
    if ($haveWon || $haveLost) return;

    $currentGuess = $currentGuess.slice(0, -1);
  };
</script>

<div class="footer">
  <div class="container-fluid">
    <div class="center">
      <table>
        {#each keyboardRows as keyboardRow, rowNumber}
          {#if rowNumber == 2 || rowNumber == 1 || rowNumber == 0}
            <tr class="center">
              {#if rowNumber == 2}
                <div class="col-xs-1">
                  <td
                    ><button on:click={handleBackspace} class="action-button">
                      <i class="fa fa-backspace" />
                    </button>
                  </td>
                </div>
              {/if}
              {#each keyboardRow.split("") as key, keyIndex}
                <td
                  ><button
                    on:click={() => handleClick(key)}
                    class={`${getKeyboardLetterClass(key)}`}
                  >
                    {key}
                  </button></td
                >
              {/each}

              {#if rowNumber == 2}
                <div class="col-xs-1">
                  <td
                    ><button on:click={handleSave} class="action-button"
                      ><i class="fa fa-check" aria-hidden="true" /></button
                    ></td
                  >
                </div>
              {/if}
            </tr>
          {/if}
        {/each}
      </table>
    </div>
  </div>
</div>

<style>
  .footer {
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: auto;
  }

  .center {
    display: flex;
    justify-content: center;
  }
  td {
    padding: 2px;
  }

  button {
    background-color: #eeeeee;
    color: grey;
    font-family: "Prompt", sans-serif;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    padding: 15px 8px;
    margin: 1px;
    width: 3rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    button {
      width: 2rem;
      height: 3rem;
      margin: 0;
    }
  }

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
