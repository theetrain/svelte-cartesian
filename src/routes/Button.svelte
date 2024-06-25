<script>
  export let size = "medium"
  export let variant = "primary"
</script>

<button class="{variant} {size}">
  <slot name="left" />
  <slot />
  <slot name="right" />
</button>

<style>
  button {
    border: 1px solid transparent;
  }
  .primary {
    background-color: yellow;
    border-color: black;
    color: black;
  }
  .secondary {
    background-color: black;
    color: white;
  }
  .small {
    min-height: 1rem;
  }
  .medium {
    min-height: 2rem;
  }
  .large {
    min-height: 3rem;
  }
</style>
