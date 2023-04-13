<script>
  import Wordle from "./components/Wordle.svelte";
  import { selectRandomWord } from "./lib/wordSelector"; 
  import { word } from "./lib/store"; 

  // word.set(selectRandomWord())
  // console.log($word)
</script>

<Wordle />
