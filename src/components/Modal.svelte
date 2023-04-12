<script>
  import { haveWon } from "../lib/store";
  $: modalActive = $haveWon;
  export let message = "";
</script>

<div class="my-modal" class:active={modalActive}>
  <div class="my-modal-body">
    {message}
  </div>
</div>
<div id="overlay" class:active={modalActive} />

<style>
  .my-modal {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: 400ms ease-in-out;
    border: 1px black solid;
    border-radius: 10px;
    z-index: 10;
    background-color: white;
    width: 500px;
    max-width: 80%;
  }
  .my-modal.active {
    transform: translate(-50%, -50%) scale(1);
  }
  .my-modal-body {
    padding: 10px;
  }
  #overlay {
    position: fixed;
    opacity: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: 300ms ease-in-out;
    pointer-events: none;
  }
  #overlay.active {
    pointer-events: all;
    opacity: 1;
  }
</style>
