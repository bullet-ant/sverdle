<script>
  import { word } from "../lib/store";
  import Guesses from "./Guesses.svelte";
  import Keyboard from "./Keyboard.svelte";
  import Input from "./Input.svelte";
  import Navbar from "./Navbar.svelte";
  import Result from "./Result.svelte";
  localStorage["guessWord"] = $word;
</script>

<main>
  <Navbar />
  <Result />
  <Guesses />
</main>
