  <script>
    import {
      maxGuesses,
      word,
      haveWon,
      haveLost,
      currentAttempt,
      currentGuess,
      guesses,
      boardState,
      keyboardLetterClass,
      showHelp,
    } from "../utils/store";
    import { getGuessWord } from "../utils/word_selector";

    const reset = () => {
      haveWon.set(false);
      haveLost.set(false);
      boardState.set([]);
      maxGuesses.set(6);
      guesses.set(["", "", "", "", "", ""]);
      word.set(getGuessWord());
      currentAttempt.set(0);
      keyboardLetterClass.set(
        Object.fromEntries(
          [...new Set("abcdefghijklmnopqrstuvwxyz")].map((char) => [char, ""])
        )
      );
      currentGuess.set("");
      localStorage["guessWord"] = $word;
    };
  </script>

  <div class="container">
    <div class="heading">
      <div class="title">Sverdle</div>
      <div class="buttons">
        <button on:click={reset}>
          <i class="fa fa-rotate" />
        </button>
        <button on:click={() => ($showHelp = !$showHelp)}>
          <i class="fa-regular fa-circle-question" />
        </button>
        <button
          on:click={() => window.open("https://github.com/bullet-ant/sverdle")}
        >
          <i class="fa fa-github" />
        </button>
      </div>
    </div>
  </div>
  <hr />

  <style>
    hr {
      margin-top: 0px;
    }
    .heading {
      display: grid;
      grid-template-columns: 1fr repeat(1, auto) 1fr;
      grid-column-gap: 5px;
      justify-items: center;
    }
    .title {
      grid-column-start: 2;
      font-size: 42px;
      font-weight: bold;
      font-family: "Nova Oval", cursive;
    }
    .buttons {
      font-size: 20px;
      margin-left: auto;
      margin-top: auto;
      margin-bottom: auto;
      text-align: center;
    }

    button {
      border: none;
      background-color: white;
    }

    @media (max-width: 768px) {
      .heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
      }
      .title {
        font-size: 38px;
      }
      .buttons {
        font-size: 18px;
      }
    }
  </style>
