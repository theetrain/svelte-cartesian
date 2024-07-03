<script>
  import { CartesianWithRunes as Cartesian } from "svelte-cartesian"
  import Button from "$lib/Button.svelte"

  const props = {
    props: {
      size: ["small", "medium", "large"],
      variant: ["primary", "secondary"],
      children: [children]
    },
    Component: Button,
  }
</script>

{#snippet children()}
  Make popcorn
{/snippet}

<Cartesian {...props}></Cartesian>
