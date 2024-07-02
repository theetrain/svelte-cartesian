<script>
  import { getCartesianProduct } from "./cartesian"

  /**
   * A Svelte component.
   * @typedef {import('svelte').Component} Component
   */
  /**
   * An object containing prop names and array of potential values.
   * @typedef {Record<string, any[]>} props
   */
  /**
   * Disable built-in CSS.
   * @typedef {boolean} unstyled
   * @default false
   */
  /**
   * HTML attributes to pass to the wrapping `<div>`.
   * @typedef {import('svelte/elements').SvelteHTMLElements["div"]} divAttributes
   * @default {}
   */

  /** @type {{
   * Component: Component
   * props: props
   * unstyled: unstyled
   * divAttributes: divAttributes
   * }} */
  let { Component, props, unstyled, divAttributes = {} } = $props()

  const cartesianProps = getCartesianProduct(props)
</script>

<div class:container={!unstyled} {...divAttributes}>
  {#each cartesianProps as innerProps}
    <div>
      <svelte:component this={Component} {...innerProps}></svelte:component>
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
