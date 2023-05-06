<script>
  import { Confetti } from "svelte-confetti";
</script>

<div class="confetti">
  <Confetti
    x={[-5, 5]}
    y={[0, 0.1]}
    delay={[500, 2000]}
    infinite
    size=15
    duration=5000
    amount=400
    fallDistance="100vh"
  />
</div>
