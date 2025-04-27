<script>
  import { getCartesianProduct } from "./cartesian"

  /**
   * @import { Component as ComponentType } from "svelte"
   * @import { SvelteHTMLElements } from "svelte/elements"
   */

  /**
   * A Svelte component.
   * @typedef {ComponentType} Component
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
   * @typedef {Omit<SvelteHTMLElements["div"], "class" | "hidden"> & {class?:
   * string; hidden?: boolean}} DivAttributes
   * @default {}
   */

  /** @type {{
   * Component: Component
   * props: props
   * unstyled?: unstyled
   * divAttributes?: DivAttributes
   * }} */
  let { Component, props, unstyled = false, divAttributes = {} } = $props()

  const cartesianProps = getCartesianProduct(props)
</script>

<div class:container={!unstyled} {...divAttributes}>
  {#each cartesianProps as innerProps}
    <div>
      <Component {...innerProps} />
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
