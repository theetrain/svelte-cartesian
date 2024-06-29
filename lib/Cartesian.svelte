<script>
  import { getCartesianProduct } from "./cartesian"

  /** A Svelte component. */
  export let Component

  /**
   * An object containing prop names and an array of potential values.
   * @type {Record<string, any[]>}
   */
  export let props

  /**
   * Renders the default slot's contents.
   * Each Cartesian's iteration will pass`innerProps` as slot props.
   * @type {boolean}
   * @default false
   */
  export let asChild = false

  /**
   * Disable built-in CSS.
   * @type {boolean}
   */
  export let unstyled = false

  /**
   * HTML attributes to pass to the wrapping `<div>`.
   */
  export let divAttributes = {}

  const cartesianProps = getCartesianProduct(props)
</script>

<div class:container={!unstyled} {...divAttributes}>
  {#each cartesianProps as innerProps}
    <div>
      {#if asChild}
        <slot {innerProps} />
      {:else}
        <svelte:component this={Component} {...innerProps}>
          <slot />
        </svelte:component>
      {/if}
    </div>
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: var(--columns, repeat(2, 1fr));
    gap: 1rem;
    padding: 0.5rem 1rem;
  }
</style>
