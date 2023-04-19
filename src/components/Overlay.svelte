<script>
  import { showHelp } from "../utils/store";
</script>

{#if $showHelp}
  <div
    class="overlay"
    on:keydown={(e) => console.log(e)}
    on:click={() => ($showHelp = false)}
  />
{/if}

<style>
  .overlay {
    position: fixed;
    background: rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
