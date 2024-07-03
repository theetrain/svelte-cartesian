<script>
  import { Cartesian } from "svelte-cartesian"
  import Button from "$lib/Button.svelte"

  const props = {
    props: {
      size: ["small", "medium", "large"],
      variant: ["primary", "secondary"],
      style: ["--bg: limegreen;", undefined],
    },
    Component: Button,
  }
</script>

<Cartesian {...props} asChild --columns="repeat(4, 1fr)" let:innerProps>
  <Button {...innerProps}>
    <svelte:fragment slot="left">Left stuff</svelte:fragment>
    Make popcorn
  </Button>
</Cartesian>

<Cartesian
  {...props}
  asChild
  divAttributes={{ style: "--columns: repeat(4, 1fr)" }}
  let:innerProps
>
  <Button {...innerProps}>
    <svelte:fragment slot="left">Left stuff</svelte:fragment>
    Make popcorn
    <svelte:fragment slot="right">Right stuff</svelte:fragment>
  </Button>
</Cartesian>
