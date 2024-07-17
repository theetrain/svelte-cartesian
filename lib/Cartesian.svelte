<script>
  import { createLabel, getCartesianProduct } from "./cartesian"

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
   * Generate labels under every iteration.
   *
   * - **true**: same as `'short'`.
   * - **short**: display comma-separated values, skip objects.
   * - **long**: display line-separated key-value pairs, represent object values
   * as their type name.
   * - **long-with-objects**: same as `'long'` but with full object definitions.
   * @type {undefined | boolean | 'short' | 'long' | 'long-with-objects'}
   * @default undefined
   */
  export let labels = undefined

  /**
   * Disable built-in CSS.
   * @type {boolean}
   * @default false
   */
  export let unstyled = false

  /**
   * HTML attributes to pass to the wrapping `<div>`.
   */
  export let divAttributes = {}

  const cartesianProps = getCartesianProduct(props)
</script>

<!--
  @component
  A single component that helps render prop combinations
  (the "Cartesian Product") for visual regression testing.
-->

<div class:sc-container={!unstyled} {...divAttributes}>
  {#each cartesianProps as innerProps}
    {@const label = labels && createLabel(innerProps, { verbosity: labels })}
    <div class="sc-group">
      {#if asChild}
        <div>
          <slot {innerProps} />
        </div>
        {#if labels}
          <div>
            <slot name="label" {label} {innerProps}>
              <pre class="sc-label">{label}</pre>
            </slot>
          </div>
        {/if}
      {:else}
        <div>
          <svelte:component this={Component} {...innerProps}>
            <slot />
          </svelte:component>
        </div>
        {#if labels}
          <div>
            <slot name="label" {label} {innerProps}>
              <pre class="sc-label">{label}</pre>
            </slot>
          </div>
        {/if}
      {/if}
    </div>
  {/each}
</div>

<style>
  :where(.sc-container) {
    display: grid;
    grid-template-columns: var(--columns, repeat(2, 1fr));
    gap: 1rem;
    padding: 0.5rem 1rem;
  }
  :where(.sc-group) {
    display: flex;
    flex-direction: column;
  }
  :where(.sc-label) {
    display: inline-block;
    background-color: #fff;
    color: #000;
    padding: 0.25rem;
    margin: 0.25rem;
    border-radius: 3px;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
    font-size: var(--label-font-size, 0.875rem);
  }
</style>
