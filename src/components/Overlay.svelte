<script>
  import { showHelp } from "../store/store";
</script>

<div
  class="overlay"
  on:keydown={(e) => console.log(e)}
  on:click={() => ($showHelp = false)}
/>
