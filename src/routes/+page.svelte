<script>
  import Cartesian from "$lib/Cartesian.svelte"
  import Button from "./Button.svelte"

  const props = {
    props: {
      size: ["small", "medium", "large"],
      variant: ["primary", "secondary"],
    },
    Component: Button,
  }
</script>

<Cartesian {...props}>Make popcorn</Cartesian>

<!-- (3/3) Define all prop combinations -->
<Cartesian {...props} asChild let:innerProps>
  <Button {...innerProps}>
    <svelte:fragment slot="left">Left stuff</svelte:fragment>
    Make popcorn
  </Button>
</Cartesian>

<Cartesian {...props} asChild let:innerProps>
  <Button {...innerProps}>
    <svelte:fragment slot="left">Left stuff</svelte:fragment>
    Make popcorn
    <svelte:fragment slot="right">Right stuff</svelte:fragment>
  </Button>
</Cartesian>

<Cartesian {...props} asChild let:innerProps>
  <Button {...innerProps}>
    Make popcorn<svelte:fragment slot="right">Right stuff</svelte:fragment>
  </Button>
</Cartesian>
