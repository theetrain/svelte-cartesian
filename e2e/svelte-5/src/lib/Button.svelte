<script>
  /** @typedef {{
   *  size: 'small' | 'medium' | 'large'
   *  variant: 'primary' | 'secondary'
   *  leftSnippet: import('svelte').Snippet
   *  rightSnippet: import('svelte').Snippet
   *  children: import('svelte').Snippet
   * }} Props */

  /** @type {Props} */
  let { size, variant, leftSnippet, rightSnippet, children, ...rest } = $props()
</script>

<button {...rest} class="{variant} {size}">
  {@render leftSnippet?.()}
  {@render children()}
  {@render rightSnippet?.()}
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
