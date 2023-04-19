<script>
  import { word } from "../utils/store";
  import Guesses from "./Guesses.svelte";
  import Navbar from "./Navbar.svelte";
  import Result from "./Result.svelte";
  import Help from "./Help.svelte";
  localStorage["guessWord"] = $word;
</script>

<main>
  <Navbar />
  <Result />
  <Guesses />
  <Help />
</main>
