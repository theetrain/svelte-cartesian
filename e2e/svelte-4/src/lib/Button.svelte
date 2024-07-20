<script>
  export let size = "medium"
  export let variant = "primary"
  export let disabled = false

  /** @type {{ [key: string]: string }} */
  export let definitions
</script>

<button {...$$restProps} {disabled} class="{variant} {size}">
  <slot name="left" />
  <slot />
  {#if definitions}
    <dl>
      {#each Object.entries(definitions) as [term, definition]}
        <dt>{term}</dt>
        <dd>{definition}</dd>
      {/each}
    </dl>
  {/if}
  <slot name="right" />
</button>

<style>
  button {
    border: 1px solid transparent;

    &:hover {
      background-color: transparent;
    }
  }
  .primary {
    background-color: var(--bg, yellow);
    border-color: black;
    color: black;
  }
  .secondary {
    background-color: black;
    color: white;

    &:hover {
      color: black;
      border-color: black;
    }
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
