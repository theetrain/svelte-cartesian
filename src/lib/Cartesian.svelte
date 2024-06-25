<script>
  import { getCartesianProduct } from "./cartesian"

  export let component
  export let props
  export let asChild = false

  const cartesianProps = getCartesianProduct(props)
</script>

<div class="container">
  {#each cartesianProps as innerProps}
    <div>
      {#if asChild}
        <slot {innerProps} />
      {:else}
        <svelte:component this={component} {...innerProps}>
          <slot />
        </svelte:component>
      {/if}
    </div>
  {/each}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
